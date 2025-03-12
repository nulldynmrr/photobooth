//animasi frame
document.addEventListener("DOMContentLoaded", function () {
  gsap.fromTo(
    ".img-frame1",
    { opacity: 0, scale: 0.38 },
    { opacity: 1, scale: 1, duration: 3, ease: "power3.out", delay: 0.4 }
  );

  gsap.fromTo(
    ".img-frame2",
    { opacity: 0, scale: 0.55 },
    { opacity: 1, scale: 1, duration: 3.2, ease: "power3.out", delay: 0.6 }
  );

  gsap.fromTo(
    ".img-frame3",
    { opacity: 0, scale: 0.45 },
    { opacity: 1, scale: 1, duration: 3.5, ease: "power3.out", delay: 0.9 }
  );
});

//animasi slogan
document.addEventListener("DOMContentLoaded", function () {
  const title = document.getElementById("animated-title");
  const text = title.innerText;
  title.innerText = "";

  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.innerText = char;
    span.classList.add("letter");
    title.appendChild(span);
  });

  function startAnimation() {
    gsap.to(".letter", {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power3.out",
    });

    setTimeout(() => {
      gsap.to(".letter", {
        opacity: 0,
        y: -10,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.in",
      });
    }, 3000);
    setTimeout(startAnimation, 6000);
  }

  startAnimation();
});
