hljs.highlightAll();

function reveal() {
  var rev = document.querySelectorAll(".theme-section");
  var hd = document.querySelectorAll(".theme-header");

  for (var i = 0; i < rev.length; i++) {
    var elementTop = rev[i].getBoundingClientRect().top;
    if (elementTop < 0) {
      hd[i].classList.add("theme-header-stycky");
    } else {
      hd[i].classList.remove("theme-header-stycky");
    }
  }
}

window.addEventListener("scroll", reveal);

window.onload=function(){
  var popupBtn = document.getElementById("popup-btn");
  if(popupBtn){
    popupBtn.addEventListener("click", function(event) {
      event.preventDefault();
      var data = httpGet(event.target.getAttribute("href"));
      addContent(data);
    });
  }
}

function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false );
  xmlHttp.send( null );
  var parser = new DOMParser();
  var doc = parser.parseFromString(xmlHttp.responseText, 'text/html');
  return doc.querySelector('main').innerHTML;
}

function addContent(data) {
  var el = document.getElementById("popupOverlay");
  el.classList.add("active");
  el = document.getElementById("popupContent");
  el.classList.add("active");
  el = document.getElementById("popupData");
  el.innerHTML = data;
  var head = el.querySelector('h1');
  document.getElementById("popupHead").innerHTML = "<h1>"+head.innerHTML+"</h1><span class=\"close\" onclick=\"removeContent()\"></span>";
  el = document.getElementById("popupOverlay");
  document.body.classList.add("lock");
}

function removeContent() {
  var el = document.getElementById("popupOverlay");
  el.classList.remove("active");
  el = document.getElementById("popupContent");
  el.classList.remove("active");
  el = document.getElementById("popupData");
  el.innerHTML = "";
  document.body.classList.remove("lock");
}
