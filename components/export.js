document.addEventListener("DOMContentLoaded", function () {
  function simpanGambar(format, isHD = false) {
    const previewContainer = document.querySelector(
      ".container-frame-preview-canvas.canvas1"
    );
    const allFrames = previewContainer.querySelectorAll("img");

    const originalFrame = { border: previewContainer.style.border };
    const frameDesign = Array.from(allFrames).map((frame) => ({
      borderRadius: frame.style.borderRadius,
    }));

    // Hapus border dan border-radius sementara
    previewContainer.style.border = "none";
    allFrames.forEach((frame) =>
      frame.style.setProperty("border-radius", "0", "important")
    );

    // Terapkan filter
    const appliedFilter = previewContainer.dataset.filter || "none";
    // Terapkan filter pada container
    previewContainer.style.filter = appliedFilter;

    setTimeout(() => {
      html2canvas(previewContainer, {
        backgroundColor: null,
        scale: isHD ? 8 : 3,
      }).then((canvas) => {
        const ctx = canvas.getContext("2d");

        // Terapkan filter langsung pada canvas
        ctx.filter = appliedFilter;

        previewContainer.style.border = originalFrame.border;
        allFrames.forEach(
          (frame, index) =>
            (frame.style.borderRadius = frameDesign[index].borderRadius)
        );

        const imgData = canvas.toDataURL(`image/${format}`, isHD ? 1.0 : 0.92);

        createImageBitmap(canvas).then(() => {
          const link = document.createElement("a");
          link.href = imgData;
          link.download = `chambooth${isHD ? "_HD" : ""}.${format}`;
          link.click();
        });
      });
    }, 100);
  }

  function setupButtonEvents(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container
      .querySelector(".btn-simpan-jpg")
      .addEventListener("click", () => simpanGambar("jpeg"));

    container
      .querySelector(".btn-simpan-png")
      .addEventListener("click", () => simpanGambar("png"));

    container
      .querySelector(".btn-simpan-png-hd")
      .addEventListener("click", () => simpanGambar("png", true));

    container
      .querySelector(".btn-foto-kembali")
      .addEventListener("click", () => {
        console.log("Kembali mengambil foto!");
      });
  }

  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const selectedFilter = event.target.classList[1];
      const previewContainer = document.querySelector(
        ".container-frame-preview-canvas.canvas1"
      );
      previewContainer.dataset.filter = selectedFilter;

      previewContainer.style.filter = selectedFilter;
    });
  });

  // add kedua container tombol
  setupButtonEvents(".section-button-author.md");
  setupButtonEvents(".section-button-author.sm");
});
  