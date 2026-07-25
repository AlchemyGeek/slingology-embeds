// AirVenture 2026 Countdown – JavaScript
// Paste into: Simple Custom CSS and JS plugin → Add JS Code → Footer

(function () {
  var OPEN  = new Date('2026-07-20T07:00:00-05:00');
  var CLOSE = new Date('2026-07-26T23:59:59-05:00');

  function pad(n) { return String(n).padStart(2, '0'); }

  function showMessage(text, sub) {
    var cd = document.querySelector('.av-countdown');
    if (!cd) return;
    cd.style.display = 'none';
    var msg = document.createElement('div');
    msg.className = 'av-msg';
    msg.style.display = 'block';
    msg.textContent = text;
    cd.insertAdjacentElement('afterend', msg);
    var subEl = document.getElementById('av-cta-sub');
    if (subEl && sub) subEl.textContent = sub;
  }

  function flip(el, val) {
    if (!el || el.textContent === val) return;
    el.classList.remove('av-flip');
    void el.offsetWidth;
    el.classList.add('av-flip');
    el.textContent = val;
  }

  function tick() {
    var now = new Date();
    if (now >= CLOSE) {
      showMessage('Until next year.', 'OSH27 · July 26 – Aug 1, 2027');
      return;
    }
    if (now >= OPEN) {
      showMessage("We're at Oshkosh!", 'July 20 – 26 · See you on the flight line.');
      return;
    }
    var s = Math.floor((OPEN - now) / 1000);
    flip(document.getElementById('av-days'),  pad(Math.floor(s / 86400)));
    flip(document.getElementById('av-hours'), pad(Math.floor((s % 86400) / 3600)));
    flip(document.getElementById('av-mins'),  pad(Math.floor((s % 3600) / 60)));
    flip(document.getElementById('av-secs'),  pad(s % 60));
    setTimeout(tick, 1000);
  }

  // Wait for the element to exist before starting
  if (document.getElementById('av-days')) {
    tick();
  } else {
    document.addEventListener('DOMContentLoaded', tick);
  }
})();
