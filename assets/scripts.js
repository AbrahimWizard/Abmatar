// Toggle mobile navigation menu
const toggleButton = document.getElementById("toggle-button");
const navLinks = document.getElementById("nav-links");

if (toggleButton) {
  toggleButton.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// Dark mode toggle
const darkToggle = document.getElementById("dark-mode");
if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    document.body.dataset.theme = document.body.dataset.theme === "dark" ? "light" : "dark";
}

// Optional: typed hero text effect (requires TypewriterJS)
if (window.Typewriter) {
  const heroText = document.getElementById("hero-text");
  const typewriter = new Typewriter(heroText, {
    loop: true,
    delay: 75,
  });
  typewriter
    .typeString("developer.")
    .pauseFor(1000)
    .deleteAll()
    .typeString("creator.")
    .pauseFor(1000)
    .deleteAll()
    .typeString("tech enthusiast.")
    .pauseFor(1500)
    .start();
}
