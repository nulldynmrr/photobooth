function checkMobile() {
  if (window.innerWidth < 768) {
    document.getElementById("warningPopup").style.display = "flex";
  }
}

function closeWarning() {
  document.getElementById("warningPopup").style.display = "none";
}

document.addEventListener("DOMContentLoaded", checkMobile);
