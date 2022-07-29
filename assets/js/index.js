hljs.highlightAll();

function reveal() {
  var rev = document.querySelectorAll(".theme-section");
  var hd = document.querySelectorAll(".theme-header");

  for (var i = 0; i < rev.length; i++) {
    var elementTop = rev[i].getBoundingClientRect().top;
    console.log('top = ', elementTop);
    if (elementTop < 0) {
      hd[i].classList.add("theme-header-stycky");
    } else {
      hd[i].classList.remove("theme-header-stycky");
    }
  }
}

window.addEventListener("scroll", reveal);