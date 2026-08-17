/* Node Cash · sitio público
   Dos cosas nada más: revelar las ilustraciones al entrar en pantalla
   y avisar si el formulario todavía no está conectado a un servicio. */

(function () {
  'use strict';

  var reducido = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── revelar ilustraciones ───────────────────────────────── */

  var revelables = document.querySelectorAll('[data-revelar]');

  if (reducido || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revelables, function (el) { el.classList.add('revelado'); });
  } else {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add('revelado');
        observador.unobserve(entrada.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.2 });

    Array.prototype.forEach.call(revelables, function (el) { observador.observe(el); });
  }

  /* ── formulario de la lista de espera ────────────────────── */

  var formulario = document.querySelector('.formulario');
  if (!formulario) return;

  var aviso = formulario.querySelector('[data-aviso]');

  formulario.addEventListener('submit', function (evento) {
    // Mientras no haya un servicio en `action`, el envío no va a ningún lado:
    // más vale decirlo que fingir que se guardó.
    if (formulario.hasAttribute('data-sin-conectar') || !formulario.getAttribute('action')) {
      evento.preventDefault();
      if (aviso) {
        aviso.textContent = 'Falta conectar el formulario a un servicio de correo. Ver el README.';
      }
      return;
    }

    var boton = formulario.querySelector('button[type="submit"]');
    if (boton) {
      boton.disabled = true;
      boton.textContent = 'Enviando…';
    }
  });
})();
