/* Node Cash · hoja de identidad — cambio de tema.
   Sin preferencia guardada manda el sistema, que es el comportamiento
   de la app: `UITraitCollection` resuelve claro/oscuro solo. El botón
   solo existe para poder revisar las dos versiones de la paleta sin
   cambiar los ajustes del dispositivo.
   Este archivo se carga en <head> sin defer a propósito: aplicar el
   tema antes del primer pintado evita el parpadeo. */

(function () {
  'use strict';

  var LLAVE = 'nodecash-tema';
  var raiz = document.documentElement;

  function guardado() {
    try {
      var valor = localStorage.getItem(LLAVE);
      return valor === 'claro' || valor === 'oscuro' ? valor : null;
    } catch (e) {
      return null;
    }
  }

  function sistemaEsOscuro() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function efectivo() {
    return guardado() || (sistemaEsOscuro() ? 'oscuro' : 'claro');
  }

  function aplicar(tema) {
    if (tema) {
      raiz.setAttribute('data-tema', tema);
    } else {
      raiz.removeAttribute('data-tema');
    }
  }

  // Antes del primer pintado.
  aplicar(guardado());

  function rotular() {
    var boton = document.querySelector('[data-tema-toggle]');
    if (!boton) return;
    var contrario = efectivo() === 'oscuro' ? 'claro' : 'oscuro';
    var texto = boton.querySelector('[data-tema-texto]');
    if (texto) texto.textContent = contrario === 'oscuro' ? 'Oscuro' : 'Claro';
    boton.setAttribute('aria-label', 'Cambiar a modo ' + contrario);
  }

  function iniciar() {
    var boton = document.querySelector('[data-tema-toggle]');
    if (!boton) return;

    boton.addEventListener('click', function () {
      var nuevo = efectivo() === 'oscuro' ? 'claro' : 'oscuro';
      try {
        localStorage.setItem(LLAVE, nuevo);
      } catch (e) { /* modo privado: el tema dura lo que la sesión */ }
      aplicar(nuevo);
      rotular();
    });

    rotular();

    // Sin preferencia guardada, el sistema sigue mandando.
    if (window.matchMedia) {
      var consulta = window.matchMedia('(prefers-color-scheme: dark)');
      var alCambiar = function () { if (!guardado()) rotular(); };
      if (consulta.addEventListener) {
        consulta.addEventListener('change', alCambiar);
      } else if (consulta.addListener) {
        consulta.addListener(alCambiar);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
