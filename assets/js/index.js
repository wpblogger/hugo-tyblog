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
  var doc = parser.parseFromString(xmlHttp.responseText, "text/html");
  return doc.querySelector("main").innerHTML;
}

function showMenu() {
  var data = document.querySelector(".slot-r.full").innerHTML;
  addContent(data);
  document.getElementById("menu-main-menu").innerHTML += '<li class="menu-item"><a href="#" onclick="searchPanel(event)">' + menuSearchName + '</a></li>';
}

function addContent(data) {
  var el = document.getElementById("popupOverlay");
  el.classList.add("active");
  el = document.getElementById("popupContent");
  el.classList.add("active");
  el = document.getElementById("popupData");
  el.innerHTML = data;
  var head = el.querySelector('h1');
  if (el.contains(head)) {
    document.getElementById("popupHead").innerHTML = "<h1>"+head.innerHTML+"</h1><span class=\"close\" onclick=\"removeContent()\"></span>";
  } else {
    document.getElementById("popupHead").innerHTML = "<h1>Menu</h1><span class=\"close\" onclick=\"removeContent()\"></span>";
  }
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

var fuse;
var timeout = null;
var loadSearchData = false;

function searchPanel(event) {
  event.preventDefault();
  var data = "<h1>" + menuSearchName + "</h1><div class=\"search-string\"><input type=\"string\" onkeyup=\"startSearch(this.value)\" id=\"searchInput\" /></div><div id=\"searchResult\" class=\"search-result\"></div>";
  addContent(data);
  if (!loadSearchData) loadSearch();
  document.getElementById("searchInput").focus();
}

function startSearch(value) {
  clearTimeout(timeout);
  timeout = setTimeout(function() {
    executeSearch(value);
  }, 500);
}

function fetchJSONFile(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var data = JSON.parse(httpRequest.responseText);
          if (callback) callback(data);
      }
    }
  };
  httpRequest.open('GET', path);
  httpRequest.send(); 
}

function loadSearch() { 
  fetchJSONFile('/index.json', function(data){

    var options = {
      shouldSort: true,
      location: 0,
      distance: 100,
      threshold: 0.4,
      minMatchCharLength: 2,
      keys: [
        'title',
        'contents'
        ]
    };

    fuse = new Fuse(data, options);
    loadSearchData = true;
  });
}

function executeSearch(term) {
  if (!loadSearchData) return;
  let results = fuse.search(term);
  let searchitems = '';

  if (results.length > 0) {
    searchitems = '<ul>';
    for (let item in results.slice(0,5)) {
      let data = results[item].item;
      if (data.contents.length > 200) data.contents = data.contents.slice(0,200) + '...';
      searchitems = searchitems + '<li><a href="' + data.permalink + '" class="title h3">' + data.title + '</a><p class="sc">'+ data.contents +'</p></li>';
    }
    searchitems = searchitems + '</ul>';
  } else {
    searchitems = '<h5>Nothing found for your request</h5>';
  }

  document.getElementById("searchResult").innerHTML = searchitems;
}