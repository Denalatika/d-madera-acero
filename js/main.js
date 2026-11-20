/* ==========================================================================
   MAIN APPLICATION SCRIPT — D' MADERA & ACERO
   Navigation, Micro-interactions, Accessibility & Orchestration
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Toast Notification Utility
  const toastEl = document.getElementById('toastNotice');
  let toastTimer = null;

  window.showToast = function(message) {
    if (!toastEl) return;
    const textEl = toastEl.querySelector('.toast-text');
    if (textEl) textEl.textContent = message;
    toastEl.classList.add('is-active');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('is-active');
    }, 4000);
  };

  // 2. Sticky Header Behavior
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 3. Mobile Navigation Drawer
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openDrawer = () => {
    menuToggle?.setAttribute('aria-expanded', 'true');
    mobileDrawer?.classList.add('is-open');
    drawerBackdrop?.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    mobileDrawer?.classList.remove('is-open');
    drawerBackdrop?.classList.remove('is-visible');
    document.body.style.overflow = '';
  };

  menuToggle?.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  drawerBackdrop?.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  // 4. Smooth Anchor Scrolling with Header Offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 70;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // 5. Initialize Portfolio Manager
  if (typeof PORTFOLIO_ITEMS !== 'undefined' && window.PortfolioManager) {
    window.Portfolio = new window.PortfolioManager(PORTFOLIO_ITEMS);
  }

  // 6. Initialize Quote Form Manager
  if (window.QuoteFormManager) {
    window.QuoteForm = new window.QuoteFormManager();
  }

  // 7. Specialty Action Buttons (filtering portfolio directly from specialties)
  document.querySelectorAll('[data-filter-jump]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const filterCat = btn.getAttribute('data-filter-jump');
      if (window.Portfolio && filterCat) {
        window.Portfolio.setFilter(filterCat);
      }
    });
  });

  // 8. FAQ Accordion
  document.querySelectorAll('.faq-question-btn').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      // Close other open FAQ items
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) {
          other.classList.remove('is-active');
          other.querySelector('.faq-question-btn')?.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isExpanded) {
        item.classList.remove('is-active');
        button.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 9. Current Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
