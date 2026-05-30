(function () {
  'use strict';

  // === UTM forwarding pro checkout Kiwify ===
  // Captura UTMs e click IDs da URL atual e anexa em todos os links que vão pro Kiwify.
  const KIWIFY_HOST = 'pay.kiwify.com.br';
  const KEEP = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid', 'ttclid'];

  const incoming = new URLSearchParams(window.location.search);
  const passthrough = new URLSearchParams();
  KEEP.forEach(k => { if (incoming.has(k)) passthrough.set(k, incoming.get(k)); });

  if (passthrough.toString()) {
    document.querySelectorAll('a[href*="' + KIWIFY_HOST + '"]').forEach(a => {
      const sep = a.href.includes('?') ? '&' : '?';
      a.href = a.href + sep + passthrough.toString();
    });
  }

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
