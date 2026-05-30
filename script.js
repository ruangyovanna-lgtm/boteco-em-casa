(function () {
  'use strict';

  // === Checkout URL montada em runtime (anti-scrape simples) ===
  // Pieces separados pra grep por "kiwify" ou pelo ID do produto não achar nada.
  // Não é segurança real — é fricção pra clonadores preguiçosos.
  const _h = ['p','a','y','.','k','i','w','i','f','y','.','c','o','m','.','b','r'].join('');
  const _i = ['I','X','T','0','o','9','p'].join('');
  const CHECKOUT_URL = 'https://' + _h + '/' + _i;

  // === UTM forwarding ===
  const KEEP = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid', 'ttclid'];
  const incoming = new URLSearchParams(window.location.search);
  const passthrough = new URLSearchParams();
  KEEP.forEach(k => { if (incoming.has(k)) passthrough.set(k, incoming.get(k)); });

  function buildCheckoutUrl() {
    if (!passthrough.toString()) return CHECKOUT_URL;
    const sep = CHECKOUT_URL.includes('?') ? '&' : '?';
    return CHECKOUT_URL + sep + passthrough.toString();
  }

  // === Click handler centralizado ===
  // Quem clonar o HTML+JS sem mexer aqui acaba mandando as vendas pra esta Kiwify.
  document.addEventListener('click', function (e) {
    const cta = e.target.closest('[data-cta="buy"]');
    if (!cta) return;
    e.preventDefault();
    window.location.href = buildCheckoutUrl();
  });

  // Suporte a middle-click / Ctrl+click (abrir em nova aba)
  document.addEventListener('auxclick', function (e) {
    const cta = e.target.closest('[data-cta="buy"]');
    if (!cta || e.button !== 1) return;
    e.preventDefault();
    window.open(buildCheckoutUrl(), '_blank');
  });

  // === Countdown até estreia do Brasil — 13/06/2026 19h00 (BRT, UTC-3) ===
  const TARGET = new Date('2026-06-13T19:00:00-03:00').getTime();
  const cdEl = document.getElementById('countdown');
  const dEl = document.getElementById('cd-d');
  const hEl = document.getElementById('cd-h');
  const mEl = document.getElementById('cd-m');

  function tick() {
    const diff = TARGET - Date.now();
    if (diff <= 0) {
      if (cdEl) cdEl.style.display = 'none';
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    if (dEl) dEl.textContent = d;
    if (hEl) hEl.textContent = h;
    if (mEl) mEl.textContent = m;
  }

  if (cdEl) {
    tick();
    setInterval(tick, 30000);
  }
})();
