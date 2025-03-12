let videoStream;
let photoCount = 0;
const maxPhotos = 4;
const countdownDuration = 3;

const cameraContainer = document.querySelector(".container-frame-kamera");
const startButton = document.querySelector(".btn-start");
const retakeButton = document.querySelector(".btn-retake");
const previewContainer = document.querySelector(
  ".container-frame-preview-canvas"
);
const countdownText = document.createElement("p");

// Menangkap elemen tombol filter
const filterButtons = document.querySelectorAll(".filter-btn");

// Setup video element untuk kamera
const video = document.createElement("video");
video.autoplay = true;
video.style.width = "100%";
video.style.height = "100%";
cameraContainer.appendChild(video);

// Style untuk countdown
countdownText.style.position = "absolute";
countdownText.style.fontSize = "32px";
countdownText.style.fontWeight = "bold";
countdownText.style.color = "white";
countdownText.style.padding = "15px 20px";
countdownText.style.borderRadius = "10px";
countdownText.style.left = "50%";
countdownText.style.top = "50%";
countdownText.style.transform = "translate(-50%, -50%)";
countdownText.style.display = "none";
countdownText.style.background = "rgba(0,0,0,0.7)";
cameraContainer.appendChild(countdownText);

// Setup open camera
async function openCamera() {
  try {
    videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = videoStream;
  } catch (error) {
    console.error("Gagal mengakses kamera:", error);
  }
}

function startCountdown(callback) {
  let count = countdownDuration;
  countdownText.style.display = "block";
  countdownText.textContent = count;

  const interval = setInterval(() => {
    count--;

    if (count === 0) {
      countdownText.style.display = "none";
      clearInterval(interval);
      callback();
    } else {
      countdownText.textContent = count;
    }
  }, 1000);
}

// Mengambil foto dengan rasio tetap
function takePhotoSequence() {
  if (photoCount >= maxPhotos) return;

  startCountdown(() => {
    const imgElement = document.getElementById(`canvas${photoCount + 1}`);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const videoRatio = video.videoWidth / video.videoHeight;
    const targetWidth = 211;
    const targetHeight = 116;

    let drawWidth, drawHeight, offsetX, offsetY;
    if (targetWidth / targetHeight > videoRatio) {
      drawWidth = video.videoWidth;
      drawHeight = video.videoWidth * (targetHeight / targetWidth);
      offsetX = 0;
      offsetY = (video.videoHeight - drawHeight) / 2;
    } else {
      drawHeight = video.videoHeight;
      drawWidth = video.videoHeight * (targetWidth / targetHeight);
      offsetY = 0;
      offsetX = (video.videoWidth - drawWidth) / 2;
    }

    // Set ukuran canvas
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    // Gambar video ke dalam canvas dengan crop
    context.drawImage(
      video,
      offsetX,
      offsetY,
      drawWidth,
      drawHeight,
      0,
      0,
      targetWidth,
      targetHeight
    );

    // Convert src
    imgElement.src = canvas.toDataURL("image/png");

    photoCount++;

    if (photoCount < maxPhotos) {
      takePhotoSequence();
    } else {
      startButton.style.display = "none";
      retakeButton.style.display = "block";
    }
  });
}

function retakePhotos() {
  photoCount = 0;
  previewContainer.querySelectorAll("img").forEach((img) => {
    img.src = "../img/img-default-frame.svg";
  });
  startButton.style.display = "block";
  retakeButton.style.display = "none";
}

// tombol filter
filterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const filterType = event.target.textContent.toLowerCase();
    applyFilter(filterType);
    updatePreviewFilter(filterType); // Menambahkan pembaruan filter pada preview gambar
  });
});

// mengubah filter kamera
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

// untuk tombol filter
filterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const filterType = event.target.textContent.toLowerCase();
    applyFilter(filterType);
    updatePreviewFilter(filterType); // Menambahkan pembaruan filter pada preview gambar
  });
});

// mengubah filter kamera
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

startButton.addEventListener("click", takePhotoSequence);
retakeButton.addEventListener("click", retakePhotos);

openCamera();
