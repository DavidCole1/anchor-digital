// Fieldcraft — scroll reveal + mobile nav
(function () {
  // Scroll reveal
  var reveals = document.querySelectorAll('[data-reveal]');
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(function (el) { obs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Safety net: if anything is still hidden after load, show it.
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) el.classList.add('is-visible');
      });
    }, 400);
  });

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.main-nav');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();
