// filter camera
document.addEventListener("DOMContentLoaded", () => {
  const btnFilter = document.getElementById("btn-filter");
  const filterOptions = document.getElementById("filter-options");

  btnFilter.addEventListener("click", () => {
    filterOptions.classList.toggle("hidden");
    btnFilter.classList.toggle("hidden");
  });
});

//Pemilihan filter
document.addEventListener("DOMContentLoaded", function () {
  const previewContainers = document.querySelectorAll(
    ".container-frame-preview-canvas"
  );
  const colorButtons = document.querySelectorAll(".button-color .btn");
  const template1 = document.querySelectorAll(
    ".container-img-cover-template img.template1"
  );
  const template2 = document.querySelectorAll(
    ".container-img-cover-template img.template2"
  );
  const template3 = document.querySelectorAll(
    ".container-img-cover-template img.template3"
  );
  const filterButtons = document.querySelectorAll(".button-filter .btn");

  let templateActive = false;
  let currentTemplateSrc = "";
  let currentFilter = "";

  function changeBackgroundColor(color) {
    previewContainers.forEach((container) => {
      container.style.backgroundColor = color;
      container.style.border = color === "black" ? "0.8px solid white" : "none";
      container.style.opacity = color === "black" ? "0.5" : "none";

      let template = container.querySelector(".template-overlay");
      if (template) {
        template.remove();
      }
    });

    templateActive = false;
  }

  colorButtons.forEach((button) => {
    button.addEventListener("click", function () {
      changeBackgroundColor(this.textContent.toLowerCase());
    });
  });

  function applyTemplate(templateSrc) {
    previewContainers.forEach((container) => {
      let template = container.querySelector(".template-overlay");

      if (!template) {
        const templateOverlay = document.createElement("img");
        templateOverlay.src = templateSrc;
        templateOverlay.classList.add("template-overlay");
        templateOverlay.style.position = "absolute";
        templateOverlay.style.top = "0";
        templateOverlay.style.left = "0";
        templateOverlay.style.width = "100%";
        templateOverlay.style.height = "100%";
        templateOverlay.style.zIndex = "1";

        container.style.position = "relative";
        container.appendChild(templateOverlay);
      } else {
        template.src = templateSrc;
      }
    });

    templateActive = true;
    currentTemplateSrc = templateSrc;
  }

  template1.forEach((img) => {
    img.addEventListener("click", function () {
      applyTemplate("../img/frame-template1.svg");
    });
  });

  template2.forEach((img) => {
    img.addEventListener("click", function () {
      applyTemplate("../img/frame-template2.svg");
    });
  });

  template3.forEach((img) => {
    img.addEventListener("click", function () {
      applyTemplate("../img/frame-template3.svg");
    });
  });

  colorButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (templateActive && currentTemplateSrc) {
        setTimeout(() => {
          applyTemplate(currentTemplateSrc);
        }, 100);
      }
    });
  });

  function applyFilter(filterType) {
    currentFilter = filterType;
    let filterSrc = "";
    let filterStyle = "";

    switch (filterType) {
      case "vintage":
        filterSrc = "../img/frame-vintage.svg";
        filterStyle = "sepia(80%) contrast(90%) brightness(80%)";
        break;
      case "sepia":
        filterSrc = "../img/frame-sepia.svg";
        filterStyle = "saturate(120%) contrast(110%)";
        break;
      case "b/w":
        filterSrc = "../img/frame-b/w.svg";
        filterStyle = "grayscale(50%) contrast(95%)";
        break;
      default:
        filterSrc = "../img/frame-template1.svg";
        filterStyle = "none";
    }

    const frameElement = document.getElementById("frame");
    frameElement.src = filterSrc;
    frameElement.style.filter = filterStyle;
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      applyFilter(this.dataset.filter);
    });
  });

  const section2Canvas = document.querySelectorAll(
    "#section2 .container-frame-preview-canvas img"
  );
  const section3Canvas = document.querySelectorAll(
    "#section3 .container-frame-preview-canvas img"
  );
  const section3Canvas2 = document.querySelectorAll(
    "#section3 .container-frame-preview-canvas.canvas2 img"
  );

  function syncImages() {
    section2Canvas.forEach((img, index) => {
      if (section3Canvas[index]) {
        section3Canvas[index].src = img.src;
      }
    });

    section2Canvas.forEach((img, index) => {
      if (section3Canvas2[index]) {
        section3Canvas2[index].src = img.src;
      }
    });
  }

  section2Canvas.forEach((img) => {
    img.addEventListener("load", syncImages);
  });

  syncImages();

  function resetSection2() {
    section2Canvas.forEach((img) => {
      if (img.parentElement.querySelector(".template-overlay")) {
        img.parentElement.querySelector(".template-overlay").remove();
      }
      img.style.position = "relative";
      img.style.top = "0";
      img.style.left = "0";
    });
  }

  window.addEventListener("focus", function () {
    resetSection2();
  });
});

//HASIL
document.addEventListener("DOMContentLoaded", function () {
  const previewContainers = document.querySelectorAll(
    ".container-frame-preview-canvas"
  );
  const colorButtons = document.querySelectorAll(".button-color .btn");

  function changeBackgroundColor(color) {
    previewContainers.forEach((container) => {
      container.style.backgroundColor = color;
      container.style.border = color === "black" ? "0.8px solid white" : "none";
      container.style.opacity = color === "black" ? "0.5" : "none";
    });
  }

  colorButtons.forEach((button) => {
    button.addEventListener("click", function () {
      changeBackgroundColor(this.textContent.toLowerCase());
    });
  });

  const section2Canvas = document.querySelectorAll(
    "#section2 .container-frame-preview-canvas img"
  );
  const section3Canvas = document.querySelectorAll(
    "#section3 .container-frame-preview-canvas img"
  );
  const section3Canvas2 = document.querySelectorAll(
    "#section3 .container-frame-preview-canvas.canvas2 img"
  );

  // mengubungkan canvas 2 dengan canvas 3
  function syncImages() {
    section2Canvas.forEach((img, index) => {
      if (section3Canvas[index]) {
        section3Canvas[index].src = img.src;
      }
    });
    section2Canvas.forEach((img, index) => {
      if (section3Canvas2[index]) {
        section3Canvas2[index].src = img.src;
      }
    });
  }

  // tombol filter
  filterButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const filterType = event.target.textContent.toLowerCase();
      applyFilter(filterType);
      updatePreviewFilter(filterType); // Menambahkan pembaruan filter pada preview gambar
    });
  });

  //mengubah filter kamera
  function applyFilter(filterType) {
    switch (filterType) {
      case "vintage":
        video.style.filter = "sepia(0.8) contrast(1.2) saturate(0.8)";
        break;
      case "sepia":
        video.style.filter = "sepia(1)";
        break;
      case "b/w":
        video.style.filter = "grayscale(1) contrast(1.2)";
        break;
      case "invert":
        video.style.filter = "invert(1)";
        break;
      case "blur":
        video.style.filter = "blur(5px)";
        break;
      default:
        video.style.filter = "none";
    }
  }

  // memperbarui preview gambar sesuai filter
  function updatePreviewFilter(filterType) {
    // preview dari container template
    const previewImages = document.querySelectorAll(
      ".container-frame-preview-canvas img"
    );
    previewImages.forEach((img) => {
      switch (filterType) {
        case "vintage":
          img.style.filter = "sepia(0.8) contrast(1.2) saturate(0.8)";
          break;
        case "sepia":
          img.style.filter = "sepia(1)";
          break;
        case "b/w":
          img.style.filter = "grayscale(1) contrast(1.2)";
          break;
        default:
          img.style.filter = "none";
      }
    });
  }

  section2Canvas.forEach((img) => {
    img.addEventListener("load", syncImages);
  });

  syncImages();
});
