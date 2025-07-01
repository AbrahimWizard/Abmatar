/**
 * Throttle function to limit the frequency of event callbacks.
 */
function throttle(func, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

/** BioLuminescence: Hero canvas particle background */
class BioLuminescence {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener("resize", () => this.resize());
    for (let i = 0; i < 500; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        hue: Math.random() * 50 + 180,
      });
    }
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const time = Date.now() * 0.001;
    for (let particle of this.particles) {
      particle.x += particle.vx + Math.sin(time);
      particle.y += particle.vy + Math.cos(time);
      if (particle.x > this.width) particle.x = 0;
      if (particle.x < 0) particle.x = this.width;
      if (particle.y > this.height) particle.y = 0;
      if (particle.y < 0) particle.y = this.height;
      const gradient = this.ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.radius * 5
      );
      gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 50%, 1)`);
      gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 50%, 0)`);
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
    requestAnimationFrame(() => this.animate());
  }
}

/** ThemeToggle: toggles between future/dark modes */
class ThemeToggle {
  constructor(button) {
    if (!button) return;
    this.button = button;
    this.init();
  }

  init() {
    this.button.addEventListener("click", () => this.toggleTheme());
  }

  toggleTheme() {
    const root = document.documentElement;
    const current = root.getAttribute("data-theme");
    root.setAttribute("data-theme", current === "neural-future" ? "neural-dark" : "neural-future");
  }
}

/** BurgerMenu: handles mobile nav toggle */
class BurgerMenu {
  constructor(button, navList) {
    if (!button || !navList) return;
    this.button = button;
    this.navList = navList;
    this.init();
  }

  init() {
    this.button.addEventListener("click", () => {
      this.navList.classList.toggle("active");
    });
  }
}

/** Global init */
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.add("fade-out");
    setTimeout(() => (loader.style.display = "none"), 300);
  }

  const heroCanvas = document.getElementById("hero-canvas");
  if (heroCanvas) new BioLuminescence(heroCanvas);

  const themeButton = document.getElementById("theme-toggle");
  if (themeButton) new ThemeToggle(themeButton);

  const burger = document.getElementById("burger-toggle");
  const navList = document.querySelector(".nav-list");
  if (burger && navList) new BurgerMenu(burger, navList);

  window.addEventListener("scroll", throttle(() => {
    document.documentElement.style.setProperty("--scroll", window.scrollY);
  }, 16));
});
