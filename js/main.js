// Simple fade-in on scroll
const panels = document.querySelectorAll('.panel');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.2 });

panels.forEach(panel => {
  panel.style.opacity = 0;
  panel.style.transform = 'translateY(40px)';
  panel.style.transition = '0.8s ease';
  observer.observe(panel);
});