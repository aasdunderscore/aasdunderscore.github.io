document.addEventListener('click', function(e) {
  const btn = e.target.closest('.copy-btn');
  if (!btn) return;

  const text = btn.dataset.text || btn.dataset.link || btn.textContent.trim();
  if (!text) return;

  const originalHTML = btn.innerHTML;

  navigator.clipboard.writeText(text)
    .then(() => {
      btn.innerHTML = '✅';
      btn.classList.add('copy-btn--success');

      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.classList.remove('copy-btn--success');
      }, 1400);
    })
    .catch(err => {
      console.error('Copy failed', err);
      btn.innerHTML = '❌';
      setTimeout(() => btn.innerHTML = originalHTML, 1800);
    });

  e.preventDefault();
}, { passive: false });