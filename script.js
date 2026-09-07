// Organically Molded — static site.


document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("site-audio");
  const button = document.querySelector(".site-audio-toggle");
  if (!audio || !button) return;

  let started = false;

  const update = () => {
    button.textContent = audio.paused ? "▶" : "Ⅱ";
    button.setAttribute("aria-label", audio.paused ? "play music" : "pause music");
  };

  const startMusic = () => {
    if (started || !audio.paused) return;

    audio.play().then(() => {
      started = true;
      update();
    }).catch(() => {});
  };

  // The visitor's first tap/click/key interaction starts the music.
  document.addEventListener("pointerdown", startMusic, { once: true, passive: true });
  document.addEventListener("touchstart", startMusic, { once: true, passive: true });
  document.addEventListener("keydown", startMusic, { once: true });

  // The player button remains available for pause/play.
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (audio.paused) {
      audio.play().then(() => {
        started = true;
        update();
      }).catch(() => {});
    } else {
      audio.pause();
      update();
    }
  });

  audio.addEventListener("play", update);
  audio.addEventListener("pause", update);
  audio.addEventListener("ended", update);
  audio.load();
  update();
});
