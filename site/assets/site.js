const copyButton = document.querySelector('[data-copy-citation]');
if (copyButton && navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    const status = document.querySelector('[data-copy-status]');
    try {
      await navigator.clipboard.writeText(document.querySelector('#bibtex').textContent.trim());
      status.textContent = 'Citation copied.';
    } catch {
      status.textContent = 'Please select and copy the citation below.';
    }
  });
}

const revealTargets = document.querySelectorAll('[data-reveal]');
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if (revealTargets.length && !motionQuery.matches && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('scroll-motion-ready');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.01, rootMargin: '0px' });
  revealTargets.forEach(target => revealObserver.observe(target));
}
