
document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("site-audio");
  const button = document.querySelector(".site-audio-toggle");

  if (!audio) return;

  let musicStarted = false;

  function updateButton() {
    if (!button) return;
    button.textContent = audio.paused ? "▶" : "Ⅱ";
    button.setAttribute("aria-label", audio.paused ? "play music" : "pause music");
  }

  function startMusic() {
    if (musicStarted || !audio.paused) return;

    audio.play().then(function () {
      musicStarted = true;
      updateButton();
    }).catch(function (error) {
      console.log("Music could not start yet:", error);
    });
  }

  // Browser-safe: the first real interaction starts the music.
  document.addEventListener("click", startMusic, { once: true });
  document.addEventListener("touchend", startMusic, { once: true });
  document.addEventListener("keydown", startMusic, { once: true });

  if (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (audio.paused) {
        audio.play().then(function () {
          musicStarted = true;
          updateButton();
        }).catch(function (error) {
          console.log("Music could not start:", error);
        });
      } else {
        audio.pause();
        updateButton();
      }
    });
  }

  audio.addEventListener("play", updateButton);
  audio.addEventListener("pause", updateButton);
  updateButton();
});


/* vhs fullscreen viewer */
document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("vhs-lightbox");
  const viewer = document.getElementById("vhs-lightbox-video");
  const closeButton = document.querySelector(".vhs-lightbox-close");

  if (!lightbox || !viewer) return;

  const clips = document.querySelectorAll(".vhs-clip");

  function getVideoSource(video) {
    const source = video.querySelector("source");
    return video.currentSrc || video.src || (source ? source.src : "");
  }

  function openViewer(video) {
    const src = getVideoSource(video);
    if (!src) return;

    viewer.pause();
    viewer.src = src;
    viewer.muted = true;
    viewer.setAttribute("muted", "");
    viewer.setAttribute("playsinline", "");
    viewer.setAttribute("webkit-playsinline", "");

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("vhs-viewer-open");

    viewer.load();
    viewer.play().catch(function () {});
  }

  function closeViewer() {
    viewer.pause();
    viewer.removeAttribute("src");
    viewer.load();

    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("vhs-viewer-open");
  }

  clips.forEach(function (clip) {
    const video = clip.querySelector("video");
    if (!video) return;

    // Use the container as the tap target — more reliable on iOS Safari.
    clip.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      openViewer(video);
    });

    clip.addEventListener("touchend", function (event) {
      event.preventDefault();
      event.stopPropagation();
      openViewer(video);
    }, { passive: false });
  });

  if (closeButton) {
    closeButton.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      closeViewer();
    });

    closeButton.addEventListener("touchend", function (event) {
      event.preventDefault();
      event.stopPropagation();
      closeViewer();
    }, { passive: false });
  }

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) closeViewer();
  });

  lightbox.addEventListener("touchend", function (event) {
    if (event.target === lightbox) {
      event.preventDefault();
      closeViewer();
    }
  }, { passive: false });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeViewer();
    }
  });
});

/* film photo fullscreen viewer */
document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("photo-lightbox");
  const viewer = document.getElementById("photo-lightbox-image");
  const closeButton = document.querySelector(".photo-lightbox-close");

  if (!lightbox || !viewer) return;

  const photos = document.querySelectorAll(".film-square img");

  function openPhoto(image) {
    viewer.src = image.currentSrc || image.src;
    viewer.alt = image.alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("photo-viewer-open");
  }

  function closePhoto() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("photo-viewer-open");
    viewer.removeAttribute("src");
  }

  photos.forEach(function (image) {
    const square = image.closest(".film-square") || image;

    square.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      openPhoto(image);
    });

    square.addEventListener("touchend", function (event) {
      event.preventDefault();
      event.stopPropagation();
      openPhoto(image);
    }, { passive: false });
  });

  if (closeButton) {
    closeButton.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      closePhoto();
    });

    closeButton.addEventListener("touchend", function (event) {
      event.preventDefault();
      event.stopPropagation();
      closePhoto();
    }, { passive: false });
  }

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) closePhoto();
  });

  lightbox.addEventListener("touchend", function (event) {
    if (event.target === lightbox) {
      event.preventDefault();
      closePhoto();
    }
  }, { passive: false });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closePhoto();
    }
  });
});
