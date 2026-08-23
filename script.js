// Small interaction layer.
// The project viewer uses URL hash links, so it works without a framework
// and remains compatible with static hosting such as GitHub Pages.

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && window.location.hash.startsWith("#project-")) {
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }
});

// Prevent the fixed header from covering anchor targets.
const header = document.querySelector(".site-header");

function offsetAnchor() {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (!target) return;
  const offset = header ? header.offsetHeight + 20 : 20;
  window.scrollTo({
    top: target.getBoundingClientRect().top + window.scrollY - offset,
    behavior: "smooth"
  });
}

window.addEventListener("hashchange", () => {
  if (!window.location.hash.startsWith("#project-")) offsetAnchor();
});
