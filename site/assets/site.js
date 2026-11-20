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
