/* Node Cash · sitio público
   Una sola cosa: revelar las ilustraciones al entrar en pantalla. */

(function () {
  'use strict';

  var reducido = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revelables = document.querySelectorAll('[data-revelar]');

  if (reducido || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revelables, function (el) { el.classList.add('revelado'); });
    return;
  }

  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('revelado');
      observador.unobserve(entrada.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.2 });

  Array.prototype.forEach.call(revelables, function (el) { observador.observe(el); });
})();
