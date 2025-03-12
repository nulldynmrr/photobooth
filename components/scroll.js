window.addEventListener("load", function () {
  let scrollPosition = localStorage.getItem("scrollPosition");

  if (scrollPosition) {
    let section1 = document.getElementById("section1");
    if (section1) {
      section1.scrollIntoView({ behavior: "smooth" });
    }
  }
});
