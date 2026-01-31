// Simple fade-in on scroll
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Modal for gallery items
  const modal = document.getElementById('mediaModal');
  const modalContent = document.querySelector('.modal-content');
  const modalClose = document.querySelector('.modal-close');

  document.querySelectorAll('[data-modal]').forEach(item => {
    item.addEventListener('click', () => {
      const mediaType = item.dataset.mediaType;
      const mediaPath = item.dataset.mediaPath;

      if (mediaType === 'video') {
        modalContent.innerHTML = `<video controls style="width: 100%; height: auto; max-height: 80vh;"><source src="${mediaPath}" type="video/mp4"></video><button class="modal-close">✕</button>`;
      } else if (mediaType === 'image') {
        modalContent.innerHTML = `<img src="${mediaPath}" style="width: 100%; height: auto; max-height: 80vh;"><button class="modal-close">✕</button>`;
      }

      modal.classList.add('active');
      document.querySelector('.modal-close').addEventListener('click', closeModal);
    });
  });

  function closeModal() {
    modal.classList.remove('active');
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Simple fade-in on scroll (panels)
  const panels = document.querySelectorAll('.panel, .card, .gallery-item');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  panels.forEach(panel => {
    panel.style.opacity = 0;
    panel.style.transform = 'translateY(24px)';
    panel.style.transition = '0.7s cubic-bezier(.2,.9,.2,1)';
    observer.observe(panel);
  });
});
