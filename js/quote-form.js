/* ==========================================================================
   SMART QUOTE BUILDER — D' MADERA & ACERO
   Interactive WhatsApp Estimator & Real-Time Preview
   ========================================================================== */

class QuoteFormManager {
  constructor() {
    this.form = document.getElementById('quoteForm');
    this.previewBox = document.getElementById('previewMessageBox');
    this.referenceBanner = document.getElementById('referenceBanner');
    this.referenceText = document.getElementById('referenceText');
    this.clearRefBtn = document.getElementById('clearRefBtn');
    this.submitBtn = document.getElementById('submitQuoteBtn');

    this.activeReference = null;

    if (this.form) {
      this.init();
    }
  }

  init() {
    // Form inputs change listener for live preview
    this.form.querySelectorAll('input, select, textarea').forEach(el => {
      el.addEventListener('input', () => this.updatePreview());
      el.addEventListener('change', () => this.updatePreview());
    });

    // Clear reference button
    if (this.clearRefBtn) {
      this.clearRefBtn.addEventListener('click', () => {
        this.clearReference();
      });
    }

    // Submit handler
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Initial preview render
    this.updatePreview();
  }

  setReference(item) {
    if (!item) return;
    this.activeReference = item;

    if (this.referenceBanner && this.referenceText) {
      this.referenceText.textContent = `${item.title} (Ref: ${item.id})`;
      this.referenceBanner.classList.add('is-active');
    }

    // Auto-select corresponding service chip
    const serviceMap = {
      'carpinteria': 'Carpintería',
      'herreria': 'Herrería',
      'madera-acero': 'Madera y acero'
    };

    const targetService = serviceMap[item.category];
    if (targetService) {
      const radio = this.form.querySelector(`input[name="serviceType"][value="${targetService}"]`);
      if (radio) {
        radio.checked = true;
      }
    }

    // Auto-fill project type if currently empty
    const projectSelect = document.getElementById('quoteProject');
    if (projectSelect && !projectSelect.value) {
      projectSelect.value = item.title;
    }

    this.updatePreview();
  }

  clearReference() {
    this.activeReference = null;
    if (this.referenceBanner) {
      this.referenceBanner.classList.remove('is-active');
    }
    this.updatePreview();
  }

  getFormData() {
    const serviceRadio = this.form.querySelector('input[name="serviceType"]:checked');
    const service = serviceRadio ? serviceRadio.value : 'No especificado';
    const project = document.getElementById('quoteProject')?.value.trim() || '';
    const dimensions = document.getElementById('quoteDimensions')?.value.trim() || '';
    const location = document.getElementById('quoteLocation')?.value.trim() || 'Nogales, Sonora';
    const notes = document.getElementById('quoteNotes')?.value.trim() || '';

    return {
      service,
      project,
      dimensions,
      location,
      notes,
      reference: this.activeReference
    };
  }

  buildMessage(data) {
    const lines = [
      `*SOLICITUD DE COTIZACIÓN — D' MADERA & ACERO*`,
      `Hola, me gustaría cotizar un proyecto a medida en Nogales:`,
      ``,
      `• *Servicio:* ${data.service}`,
      `• *Proyecto deseado:* ${data.project || '(Por especificar con ustedes)'}`,
      `• *Dimensiones / Medidas:* ${data.dimensions || 'Pendientes de verificar en visita'}`,
      `• *Ubicación:* ${data.location}`
    ];

    if (data.notes) {
      lines.push(`• *Detalles adicionales:* ${data.notes}`);
    }

    if (data.reference) {
      lines.push(`• *Referencia del portafolio:* ${data.reference.title} [Ref: ${data.reference.id}]`);
    }

    lines.push(``);
    lines.push(`¿Podrían orientarme sobre tiempos estimados o coordinar una visita para tomar medidas? Quedo al pendiente. ¡Muchas gracias!`);

    return lines.join('\n');
  }

  updatePreview() {
    if (!this.previewBox) return;
    const data = this.getFormData();
    const formatted = this.buildMessage(data);
    this.previewBox.textContent = formatted;
  }

  validate() {
    let isValid = true;
    const projectInput = document.getElementById('quoteProject');
    const projectGroup = projectInput?.closest('.form-group');

    if (!projectInput || !projectInput.value.trim()) {
      if (projectGroup) projectGroup.classList.add('has-error');
      isValid = false;
      projectInput.focus();
    } else {
      if (projectGroup) projectGroup.classList.remove('has-error');
    }

    return isValid;
  }

  handleSubmit() {
    if (!this.validate()) {
      return;
    }

    const data = this.getFormData();
    const message = this.buildMessage(data);
    const whatsappUrl = `https://wa.me/526311819094?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Notify user
    if (window.showToast) {
      window.showToast('Abriendo WhatsApp con tu cotización redactada...');
    }
  }
}

window.QuoteFormManager = QuoteFormManager;
