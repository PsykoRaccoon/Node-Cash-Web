/* Node Cash · sitio público
   1. Revela las ilustraciones al entrar en pantalla.
   2. Pone los meses relativos al mes actual, para que la página no envejezca.
      El HTML trae meses fijos como respaldo si no hay JS.
   3. El control 6 m / 12 m / 18 m de la curva.
   4. El saludo del iPhone según la hora. */

(function () {
  'use strict';

  var cada = function (sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); };

  /* ── meses relativos ─────────────────────────────────────── */

  var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
    'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var hoy = new Date();
  var mes0 = hoy.getMonth();
  var anio0 = hoy.getFullYear();

  function mesDesde(n) {
    var total = mes0 + n;
    return { mes: ((total % 12) + 12) % 12, anio: anio0 + Math.floor(total / 12) };
  }
  function mayuscula(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  cada('[data-mes]', function (el) {
    var m = mesDesde(parseInt(el.getAttribute('data-mes'), 10) || 0);
    var nombre = MESES[m.mes];
    var formato = el.getAttribute('data-formato') || 'largo';
    var texto;
    switch (formato.toLowerCase()) {
      case 'corto': texto = nombre.slice(0, 3); break;
      case 'largo-anio': texto = nombre + ' de ' + m.anio; break;
      default: texto = nombre;
    }
    if (formato.charAt(0) === 'L') texto = mayuscula(texto);
    el.textContent = texto;
  });

  // En la curva, la línea del año va antes de cada enero (menos el primero).
  cada('.cv-col', function (col, i) {
    var m = mesDesde(i);
    var esEnero = m.mes === 0 && i > 0;
    col.classList.toggle('cv-enero', esEnero);
    if (esEnero) col.setAttribute('data-anio', m.anio);
    else col.removeAttribute('data-anio');
  });

  /* ── 6 m / 12 m / 18 m ───────────────────────────────────── */

  var grafica = document.querySelector('.cv');
  cada('.segmentos button', function (boton, _, lista) {
    boton.addEventListener('click', function () {
      if (!grafica) return;
      grafica.setAttribute('data-rango', boton.getAttribute('data-rango'));
      cada('.segmentos button', function (b) { b.setAttribute('aria-pressed', String(b === boton)); });
    });
  });

  /* ── saludo ──────────────────────────────────────────────── */

  var h = hoy.getHours();
  var saludo = h >= 5 && h < 12 ? 'Buenos días' : h >= 12 && h < 19 ? 'Buenas tardes' : 'Buenas noches';
  cada('[data-saludo]', function (el) { el.textContent = saludo; });

  /* ── revelados ───────────────────────────────────────────── */

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
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

  Array.prototype.forEach.call(revelables, function (el) { observador.observe(el); });
})();
