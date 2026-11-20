/* ==========================================================================
   3D TILT & SPECULAR GLARE PHYSICS ENGINE — D' MADERA & ACERO
   High-performance spring physics with dynamic architectural light
   Inspired by 21st.dev interactive cards — Pure Vanilla JS (0 dependencies)
   ========================================================================== */

class Tilt3D {
  constructor(element, options = {}) {
    this.el = element;
    this.options = Object.assign({
      maxRotationX: 12,       // Max vertical tilt angle (degrees)
      maxRotationY: 14,       // Max horizontal tilt angle (degrees)
      perspective: 1100,      // 3D perspective depth in px
      scale: 1.035,           // Lift scale
      liftZ: 30,              // Z-axis displacement in px
      stiffness: 0.12,        // Spring responsiveness
      glareType: element.dataset.tilt || 'neutral' // 'wood', 'steel', 'neutral'
    }, options);

    this.glareEl = this.el.querySelector('.stage-glare');
    this.isHovered = false;

    // Animated values (lerped for spring smoothness)
    this.current = { rotX: 0, rotY: 0, scale: 1, liftZ: 0, glareX: 50, glareY: 50, glareOpacity: 0 };
    this.target = { rotX: 0, rotY: 0, scale: 1, liftZ: 0, glareX: 50, glareY: 50, glareOpacity: 0 };
    this.rafId = null;

    this.init();
  }

  init() {
    // Accessibility check: disable if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (prefersReducedMotion || !canHover) return;

    this.onMouseMove = this.handleMouseMove.bind(this);
    this.onMouseEnter = this.handleMouseEnter.bind(this);
    this.onMouseLeave = this.handleMouseLeave.bind(this);

    this.el.addEventListener('mousemove', this.onMouseMove, { passive: true });
    this.el.addEventListener('mouseenter', this.onMouseEnter);
    this.el.addEventListener('mouseleave', this.onMouseLeave);
  }

  handleMouseEnter() {
    this.isHovered = true;
    this.target.scale = this.options.scale;
    this.target.liftZ = this.options.liftZ;
    this.target.glareOpacity = 1;
    this.startLoop();
  }

  handleMouseMove(e) {
    const rect = this.el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize from -0.5 to +0.5 relative to center
    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;

    // Calculate natural 3D tilt angles
    this.target.rotX = -normY * this.options.maxRotationX * 2;
    this.target.rotY = normX * this.options.maxRotationY * 2;

    // Glare coordinates
    this.target.glareX = (x / rect.width) * 100;
    this.target.glareY = (y / rect.height) * 100;
  }

  handleMouseLeave() {
    this.isHovered = false;
    this.target.rotX = 0;
    this.target.rotY = 0;
    this.target.scale = 1;
    this.target.liftZ = 0;
    this.target.glareOpacity = 0;
  }

  startLoop() {
    if (this.rafId) return;

    const loop = () => {
      // Spring interpolation (lerp)
      const k = this.options.stiffness;
      this.current.rotX += (this.target.rotX - this.current.rotX) * k;
      this.current.rotY += (this.target.rotY - this.current.rotY) * k;
      this.current.scale += (this.target.scale - this.current.scale) * k;
      this.current.liftZ += (this.target.liftZ - this.current.liftZ) * k;
      this.current.glareX += (this.target.glareX - this.current.glareX) * 0.16;
      this.current.glareY += (this.target.glareY - this.current.glareY) * 0.16;
      this.current.glareOpacity += (this.target.glareOpacity - this.current.glareOpacity) * 0.12;

      // Apply 3D matrix transform
      this.el.style.transform = `
        perspective(${this.options.perspective}px)
        rotateX(${this.current.rotX.toFixed(2)}deg)
        rotateY(${this.current.rotY.toFixed(2)}deg)
        translateZ(${this.current.liftZ.toFixed(1)}px)
        scale3d(${this.current.scale.toFixed(3)}, ${this.current.scale.toFixed(3)}, 1)
      `;

      // Apply dynamic specular light reflection
      if (this.glareEl) {
        let lightSheen = 'rgba(255, 255, 255, 0.35)';
        if (this.options.glareType === 'wood') {
          // Warm golden specular glow matching natural oak / walnut
          lightSheen = 'rgba(245, 205, 150, 0.36)';
        } else if (this.options.glareType === 'steel') {
          // Cold zinc / brushed steel sheen
          lightSheen = 'rgba(200, 220, 245, 0.32)';
        }

        this.glareEl.style.opacity = this.current.glareOpacity.toFixed(2);
        this.glareEl.style.background = `radial-gradient(280px circle at ${this.current.glareX.toFixed(1)}% ${this.current.glareY.toFixed(1)}%, ${lightSheen}, transparent 65%)`;
      }

      // Check if settled to gracefully terminate RAF loop
      const settled = !this.isHovered &&
        Math.abs(this.current.rotX) < 0.05 &&
        Math.abs(this.current.rotY) < 0.05 &&
        Math.abs(this.current.scale - 1) < 0.002 &&
        this.current.glareOpacity < 0.02;

      if (settled) {
        this.el.style.transform = '';
        if (this.glareEl) {
          this.glareEl.style.opacity = '0';
        }
        this.rafId = null;
      } else {
        this.rafId = requestAnimationFrame(loop);
      }
    };

    this.rafId = requestAnimationFrame(loop);
  }
}

// Auto-initialize on all elements tagged with data-tilt
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-tilt]').forEach(el => {
    new Tilt3D(el);
  });
});

window.Tilt3D = Tilt3D;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Tilt3D;
}
