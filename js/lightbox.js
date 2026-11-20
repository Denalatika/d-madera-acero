/* ==========================================================================
   LIGHTBOX MODULE — D' MADERA & ACERO
   Accessible Architectural Project Inspector
   ========================================================================== */

class Lightbox {
  constructor(items) {
    this.items = items || [];
    this.currentIndex = 0;
    this.modalEl = document.getElementById('lightboxModal');
    this.imgEl = document.getElementById('lightboxImage');
    this.titleEl = document.getElementById('lightboxTitle');
    this.descEl = document.getElementById('lightboxDesc');
    this.catEl = document.getElementById('lightboxCategory');
    this.counterEl = document.getElementById('lightboxCounter');
    this.specTypeEl = document.getElementById('lightboxSpecType');
    this.specDimEl = document.getElementById('lightboxSpecDim');
    this.whatsappBtn = document.getElementById('lightboxWhatsappBtn');
    this.quoteFormBtn = document.getElementById('lightboxQuoteFormBtn');
    this.closeBtn = document.getElementById('lightboxCloseBtn');
    this.prevBtn = document.getElementById('lightboxPrevBtn');
    this.nextBtn = document.getElementById('lightboxNextBtn');

    this.lastFocusedEl = null;

    if (this.modalEl) {
      this.initEvents();
    }
  }

  initEvents() {
    // Close on button click
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Prev / Next buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.prev();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.next();
      });
    }

    // Close on click outside the dialog
    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) {
        this.close();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.modalEl.classList.contains('is-open')) return;

      if (e.key === 'Escape') {
        this.close();
      } else if (e.key === 'ArrowLeft') {
        this.prev();
      } else if (e.key === 'ArrowRight') {
        this.next();
      }
    });

    // Quote form button within modal: close modal & fill reference in quote form
    if (this.quoteFormBtn) {
      this.quoteFormBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const item = this.items[this.currentIndex];
        this.close();

        // Trigger reference set on the quote builder
        if (window.QuoteForm && item) {
          window.QuoteForm.setReference(item);
        }

        const quoteSection = document.getElementById('cotizar');
        if (quoteSection) {
          quoteSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Direct WhatsApp quote from lightbox
    if (this.whatsappBtn) {
      this.whatsappBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const item = this.items[this.currentIndex];
        if (!item) return;

        const message = [
          `Hola D' Madera & Acero, estuve viendo su portafolio en línea y me gustaría solicitar una cotización para un trabajo similar a:`,
          `• Proyecto: ${item.title}`,
          `• Categoría: ${item.categoryLabel}`,
          `• Referencia: ${item.id}`,
          ``,
          `¿Podrían orientarme sobre tiempos y detalles para coordinar una cotización en Nogales? Muchas gracias.`
        ].join('\n');

        const url = `https://wa.me/526311819094?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    }
  }

  open(indexOrId) {
    let index = 0;
    if (typeof indexOrId === 'string') {
      index = this.items.findIndex(i => i.id === indexOrId);
      if (index === -1) index = 0;
    } else if (typeof indexOrId === 'number') {
      index = indexOrId;
    }

    this.currentIndex = index;
    this.lastFocusedEl = document.activeElement;
    this.render();

    this.modalEl.classList.add('is-open');
    this.modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    setTimeout(() => {
      if (this.closeBtn) this.closeBtn.focus();
    }, 100);
  }

  close() {
    this.modalEl.classList.remove('is-open');
    this.modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (this.lastFocusedEl) {
      this.lastFocusedEl.focus();
    }
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.render();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.render();
  }

  render() {
    const item = this.items[this.currentIndex];
    if (!item) return;

    // Fade out briefly for smooth switch
    this.imgEl.style.opacity = '0.3';

    setTimeout(() => {
      this.imgEl.src = item.file;
      this.imgEl.alt = item.title;
      this.imgEl.width = item.width || 1600;
      this.imgEl.height = item.height || 1200;
      this.imgEl.style.opacity = '1';
    }, 120);

    if (this.titleEl) this.titleEl.textContent = item.title;
    if (this.descEl) this.descEl.textContent = item.desc;
    if (this.catEl) this.catEl.textContent = item.categoryLabel;
    if (this.counterEl) this.counterEl.textContent = `${this.currentIndex + 1} / ${this.items.length}`;
    if (this.specTypeEl) this.specTypeEl.textContent = item.tag || item.categoryLabel;
    if (this.specDimEl) this.specDimEl.textContent = `${item.width} × ${item.height} px`;
  }
}

window.Lightbox = Lightbox;
