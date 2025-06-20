/**
 * Throttle function to limit the frequency of event callbacks.
 * @param {Function} func The function to throttle.
 * @param {number} limit Time in milliseconds.
 * @returns {Function} Throttled function.
 */
function throttle(func, limit) {
    let lastCall = 0;
    return function(...args) {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        func.apply(this, args);
      }
    };
}

/**
 * BioLuminescence Module:
 * Creates a dynamic particle system on the hero canvas.
 */
class BioLuminescence {
    /**
     * @param {HTMLCanvasElement} canvas The canvas for the particle animation.
     */
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
          hue: Math.random() * 50 + 180
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
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 5
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

/**
 * NeuralWeb Module:
 * Dynamically creates SVG connections between designated "neuron" elements.
 */
class NeuralWeb {
    /**
     * @param {HTMLElement} container The container element with neuron nodes.
     */
    constructor(container) {
      if (!container) return;
      this.container = container;
      this.nodes = Array.from(container.querySelectorAll(".neuron-node"));
      if (this.nodes.length < 2) return;
      this.initConnections();
    }

    initConnections() {
      this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      this.svg.classList.add("synapse-web");
      this.container.appendChild(this.svg);
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = i + 1; j < this.nodes.length; j++) {
          this.createConnection(this.nodes[i], this.nodes[j]);
        }
      }
    }

    createConnection(a, b) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      this.svg.appendChild(line);
      const updatePosition = () => {
        const rectA = a.getBoundingClientRect();
        const rectB = b.getBoundingClientRect();
        line.setAttribute("x1", rectA.left + rectA.width / 2);
        line.setAttribute("y1", rectA.top + rectA.height / 2);
        line.setAttribute("x2", rectB.left + rectB.width / 2);
        line.setAttribute("y2", rectB.top + rectB.height / 2);
        line.setAttribute("stroke", "url(#neural-gradient)");
        line.setAttribute("stroke-width", "0.5");
      };
      window.addEventListener("scroll", throttle(updatePosition, 16));
      window.addEventListener("resize", throttle(updatePosition, 16));
      updatePosition();
    }
}

/**
 * SingularityEngine Module:
 * Adds drag-and-drop functionality to portfolio project items.
 */
class SingularityEngine {
    /**
     * @param {HTMLElement} container The container with portfolio items.
     */
    constructor(container) {
      if (!container) return;
      this.container = container;
      this.items = Array.from(container.querySelectorAll(".portfolio-item"));
      this.dragging = null;
      this.initDrag();
    }

    initDrag() {
      this.items.forEach(item => {
        item.addEventListener("mousedown", e => this.startDrag(item, e));
        item.addEventListener("touchstart", e => this.startDrag(item, e));
      });
      document.addEventListener("mousemove", e => this.onDrag(e));
      document.addEventListener("touchmove", e => this.onDrag(e), { passive: false });
      document.addEventListener("mouseup", () => this.endDrag());
      document.addEventListener("touchend", () => this.endDrag());
    }

    startDrag(item, event) {
      event.preventDefault();
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      this.dragging = { item, offsetX: clientX - item.getBoundingClientRect().left, offsetY: clientY - item.getBoundingClientRect().top };
      item.style.transition = "none";
    }

    onDrag(event) {
      if (!this.dragging) return;
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      const { item, offsetX, offsetY } = this.dragging;
      const newX = clientX - offsetX;
      const newY = clientY - offsetY;
      item.style.transform = `translate(${newX}px, ${newY}px)`;
    }

    endDrag() {
      if (this.dragging) {
        this.dragging.item.style.transition = "transform 0.3s";
      }
      this.dragging = null;
    }
}

/**
 * MatrixTerminal Module:
 * Renders a digital rain animation in the footer.
 */
class MatrixTerminal {
    /**
     * @param {HTMLElement} container The container for the digital rain effect.
     */
    constructor(container) {
      if (!container) return;
      this.container = container;
      this.canvas = document.createElement("canvas");
      this.ctx = this.canvas.getContext("2d");
      container.appendChild(this.canvas);
      this.chars = "NEURAL01";
      this.init();
    }

    init() {
      this.resize();
      window.addEventListener("resize", () => this.resize());
      this.columns = Math.floor(this.canvas.width / 20);
      this.drops = Array(this.columns).fill(0);
      this.animate();
    }

    resize() {
      this.canvas.width = this.container.offsetWidth;
      this.canvas.height = this.container.offsetHeight;
    }

    animate() {
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = "#0F0";
      this.ctx.font = "15px monospace";
      this.drops.forEach((drop, i) => {
        const text = this.chars[Math.floor(Math.random() * this.chars.length)];
        this.ctx.fillText(text, i * 20, drop * 20);
        if (drop * 20 > this.canvas.height && Math.random() > 0.975) {
          this.drops[i] = 0;
        }
        this.drops[i]++;
      });
      requestAnimationFrame(() => this.animate());
    }
}

/**
 * ThemeToggle Module:
 * Toggles between available themes.
 */
class ThemeToggle {
    /**
     * @param {HTMLElement} button The button that triggers the theme toggle.
     */
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
      const currentTheme = root.getAttribute("data-theme");
      root.setAttribute("data-theme", currentTheme === "neural-future" ? "neural-dark" : "neural-future");
    }
}

/**
 * AIDialog Module:
 * Manages the AI Core dialog interactions.
 */
class AIDialog {
    /**
     * @param {HTMLDialogElement} dialog The AI Core dialog element.
     */
    constructor(dialog) {
      if (!dialog) return;
      this.dialog = dialog;
      this.init();
    }

    init() {
      const closeButton = this.dialog.querySelector(".dialog-close");
      if (closeButton) {
        closeButton.addEventListener("click", () => this.closeDialog());
      }
    }

    closeDialog() {
      if (this.dialog.close) this.dialog.close();
    }
}

/**
 * Global Initialization:
 */
document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.classList.add("fade-out");
      setTimeout(() => (loader.style.display = "none"), 300);
    }
    const heroCanvas = document.getElementById("hero-canvas");
    if (heroCanvas) new BioLuminescence(heroCanvas);
    const knowledgeWebContainer = document.getElementById("knowledge-web");
    if (knowledgeWebContainer) new NeuralWeb(knowledgeWebContainer);
    const portfolioSection = document.querySelector(".portfolio-section");
    if (portfolioSection) new SingularityEngine(portfolioSection);
    const digitalRainContainer = document.querySelector(".digital-rain");
    if (digitalRainContainer) new MatrixTerminal(digitalRainContainer);
    const themeButton = document.getElementById("theme-toggle");
    if (themeButton) new ThemeToggle(themeButton);
    const aiDialog = document.getElementById("ai-core");
    if (aiDialog) new AIDialog(aiDialog);
    window.addEventListener("scroll", throttle(() => {
      document.documentElement.style.setProperty("--scroll", window.scrollY);
    }, 16));
});
