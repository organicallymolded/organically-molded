
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
