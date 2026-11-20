/* ==========================================================================
   PORTFOLIO MODULE — D' MADERA & ACERO
   Editorial Masonry Rendering & Filter Engine
   ========================================================================== */

class PortfolioManager {
  constructor(items) {
    this.items = items || [];
    this.currentFilter = 'all';
    this.gridEl = document.getElementById('portfolioGrid');
    this.filterContainer = document.getElementById('portfolioFilters');
    this.lightbox = null;

    if (this.gridEl && this.items.length > 0) {
      this.init();
    }
  }

  init() {
    // Instantiate lightbox
    if (window.Lightbox) {
      this.lightbox = new window.Lightbox(this.items);
      window.portfolioLightbox = this.lightbox;
    }

    this.renderFilters();
    this.renderGrid();
  }

  renderFilters() {
    if (!this.filterContainer) return;

    const counts = {
      all: this.items.length,
      carpinteria: this.items.filter(i => i.category === 'carpinteria').length,
      herreria: this.items.filter(i => i.category === 'herreria').length,
      'madera-acero': this.items.filter(i => i.category === 'madera-acero').length
    };

    const filters = [
      { id: 'all', label: 'Todos', count: counts.all },
      { id: 'carpinteria', label: 'Carpintería', count: counts.carpinteria },
      { id: 'herreria', label: 'Herrería', count: counts.herreria },
      { id: 'madera-acero', label: 'Madera & Acero', count: counts['madera-acero'] }
    ];

    this.filterContainer.innerHTML = filters.map(f => `
      <button type="button" 
              class="filter-btn ${f.id === this.currentFilter ? 'is-active' : ''}" 
              data-filter="${f.id}"
              aria-pressed="${f.id === this.currentFilter ? 'true' : 'false'}">
        <span>${f.label}</span>
        <span class="filter-count">(${f.count})</span>
      </button>
    `).join('');

    // Bind filter clicks
    this.filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetFilter = btn.dataset.filter;
        this.setFilter(targetFilter);
      });
    });
  }

  setFilter(filterId) {
    this.currentFilter = filterId;

    // Update active class on filter buttons
    if (this.filterContainer) {
      this.filterContainer.querySelectorAll('.filter-btn').forEach(b => {
        const isActive = b.dataset.filter === filterId;
        b.classList.toggle('is-active', isActive);
        b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    }

    this.renderGrid();
  }

  renderGrid() {
    if (!this.gridEl) return;

    const filtered = this.currentFilter === 'all'
      ? this.items
      : this.items.filter(i => i.category === this.currentFilter);

    // Update lightbox items subset for synchronized navigation
    if (this.lightbox) {
      this.lightbox.items = filtered;
    }

    this.gridEl.innerHTML = filtered.map((item, idx) => {
      return `
        <article class="gallery-card" data-id="${item.id}" data-index="${idx}" tabindex="0" role="button" aria-label="Ver proyecto: ${item.title}">
          <div class="gallery-image-container">
            <img class="gallery-image" 
                 src="${item.file}" 
                 alt="${item.title} — D' Madera & Acero en Nogales, Sonora" 
                 loading="lazy" 
                 decoding="async"
                 width="${item.width}" 
                 height="${item.height}">
            <div class="gallery-card-badge">${item.categoryLabel}</div>
            <div class="gallery-card-overlay">
              <h3 class="gallery-card-title">${item.title}</h3>
              <p class="gallery-card-desc">${item.desc}</p>
              <div class="gallery-card-actions">
                <span class="gallery-btn-action">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                  Ver Proyecto
                </span>
                <button type="button" class="gallery-btn-action btn-quote-direct" data-quote-id="${item.id}" title="Cotizar este trabajo por WhatsApp">
                  Cotizar similar
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Bind card clicks to open Lightbox
    this.gridEl.querySelectorAll('.gallery-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // If user clicked direct quote button, open quote logic
        const quoteBtn = e.target.closest('.btn-quote-direct');
        if (quoteBtn) {
          e.stopPropagation();
          const qId = quoteBtn.dataset.quoteId;
          const found = this.items.find(i => i.id === qId);
          if (found && window.QuoteForm) {
            window.QuoteForm.setReference(found);
            const quoteSection = document.getElementById('cotizar');
            if (quoteSection) {
              quoteSection.scrollIntoView({ behavior: 'smooth' });
            }
          }
          return;
        }

        const index = parseInt(card.dataset.index, 10);
        if (this.lightbox) {
          this.lightbox.open(index);
        }
      });

      // Accessible keyboard trigger
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const index = parseInt(card.dataset.index, 10);
          if (this.lightbox) {
            this.lightbox.open(index);
          }
        }
      });
    });
  }
}

window.PortfolioManager = PortfolioManager;
