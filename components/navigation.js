//button Mulai untuk ke section 2
document.addEventListener("DOMContentLoaded", function () {
  let buttonMulai = document.getElementById("btn-mulai");
  let section2 = document.getElementById("section2");

  buttonMulai.addEventListener("click", function () {
    section2.scrollIntoView({ behavior: "smooth" });
  });
});

//button next ke section 3
document.addEventListener("DOMContentLoaded", function () {
  let buttonNext = document.getElementById("btn-arrow");
  let containerFrame = document.querySelector(".container-frame");
  let containerFilter = document.querySelector(".container-filter");
  let section3 = document.getElementById("section3");
  let isFilterShow = false;

  buttonNext.addEventListener("click", function () {
    if (!isFilterShow) {
      containerFrame.style.opacity = "0";
      setTimeout(() => {
        containerFrame.style.display = "none";
        containerFilter.style.display = "block";
        containerFilter.style.opacity = "0";

        setTimeout(() => {
          containerFilter.style.opacity = "1";
        }, 50);
      }, 300);

      isFilterShow = true;
    } else {
      section3.scrollIntoView({ behavior: "smooth" });
      isFilterShow = false;

      setTimeout(() => {
        containerFilter.style.opacity = "0";
        setTimeout(() => {
          containerFilter.style.display = "none";
          containerFrame.style.display = "block";
          containerFrame.style.opacity = "0";

          setTimeout(() => {
            containerFrame.style.opacity = "1";
          }, 50);
        }, 300);
      }, 600);
    }
  });
});

// button kembali ke section 2
document.addEventListener("DOMContentLoaded", function () {
  let buttonKembali = document.querySelector(".btn-foto-kembali");
  let section2 = document.getElementById("section2");
  let section3 = document.getElementById("section3");

  buttonKembali.addEventListener("click", function () {
    gsap.to(section3, {
      opacity: 1,
      duration: 0.3,
      onComplete: function () {
        section2.scrollIntoView({ behavior: "smooth" });
      },
    });
  });
});

// button kembali ke section 2 versi mobile
document.addEventListener("DOMContentLoaded", function () {
  let buttonKembali = document.querySelector(
    "#section3 .container-content .section-button-author.sm .button .btn-foto-kembali"
  );
  let section2 = document.getElementById("section2");
  let section3 = document.getElementById("section3");

  buttonKembali.addEventListener("click", function () {
    gsap.to(section3, {
      opacity: 1,
      duration: 0.3,
      onComplete: function () {
        section2.scrollIntoView({ behavior: "smooth" });
      },
    });
  });
});
