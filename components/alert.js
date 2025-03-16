function checkMobile() {
  if (window.innerWidth < 768) {
    document.getElementById("warningOverlay").style.display = "flex";
  }
}

function closeWarning() {
  document.getElementById("warningOverlay").style.display = "none";
}

document.addEventListener("DOMContentLoaded", checkMobile);
