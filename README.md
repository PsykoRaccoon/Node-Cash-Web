# Node Cash — hoja de identidad de marca

Sitio estático de una sola página con la identidad de marca de Node Cash: el monograma N
como grafo convergente, la paleta *Deep sea + teal*, la tipografía, la voz y las reglas de uso.

Sin dependencias, sin build, sin frameworks. Se abre con doble clic y se publica tal cual.

---

## Publicar en GitHub Pages

1. Crea un repositorio nuevo y sube el contenido de esta carpeta **en la raíz**
   (que `index.html` quede en la raíz del repo, no dentro de otra carpeta).
2. En el repo: **Settings → Pages**.
3. En *Source*, elige **Deploy from a branch**.
4. Branch: **`main`**, carpeta: **`/ (root)`**. Guarda.
5. En un minuto queda en `https://<usuario>.github.io/<repo>/`.

Si más adelante quieres dominio propio, agrega un archivo `CNAME` en la raíz con el dominio
(una línea, sin `https://`) y apunta el DNS a GitHub Pages.

---

## Estructura

```
.
├── index.html                  ← toda la hoja: contenido + los SVG de la marca en línea
├── .nojekyll                   ← publica los archivos tal cual, sin pasar por Jekyll
├── README.md
└── assets/
    ├── css/identidad.css       ← los tokens de color, uno a uno como en Colores.swift
    ├── js/tema.js              ← cambio claro/oscuro (sin preferencia guardada manda el sistema)
    └── img/favicon.svg         ← el monograma con su fondo, para la pestaña
```

Las rutas son relativas, así que funciona igual en la raíz de un dominio, en un subdirectorio
de GitHub Pages o abierto desde el disco.

---

## De dónde sale cada cosa

| En la página | Fuente en el repo de la app |
|---|---|
| Todos los valores de color | `NodeCash/NodeCash/Utilidades/Colores.swift` |
| El argumento de la marca (convergencia) | `Docs/07curva.md` §1 |
| Tagline, activos de marca y tono | `Docs/06plandesalida.md` §2 y §10 |
| Principios de la voz | `Docs/12decisiones.md` §5 |
| Formato de dinero y fechas | `Utilidades/Dinero+Formato.swift`, `Utilidades/FormatoDeFecha.swift` |

**Regla:** esta página es documentación, no una copia decorativa. Si un token cambia en
`Colores.swift`, se cambia aquí también — en `assets/css/identidad.css` (bloque `:root` para
claro, los dos bloques de oscuro) y en las tablas de `index.html`.

---

## La marca

El monograma vive una sola vez, como `<symbol id="marca">` al inicio de `index.html`, y se
reusa con `<use>` en cada tamaño y apariencia. Los colores entran por `var(--linea)` y
`var(--nodo)` en atributo de presentación, que es lo único que hereda de forma confiable
dentro de `<use>`: una apariencia nueva son dos variables y un fondo, no un dibujo nuevo.

Geometría sobre lienzo de 1024 × 1024:

- Aristas: `300,264 → 300,760`, `300,264 → 724,760`, `724,264 → 724,760`. Grosor 56, terminaciones redondas.
- Nodos: radio 64 en los cuatro vértices.
- **El nodo de llegada (`724,760`) es el único en acento.** Es el punto al que todo converge.

Para exportar un SVG suelto (para Icon Composer, prensa o redes), el `<symbol>` de
`index.html` se copia tal cual dentro de un `<svg viewBox="0 0 1024 1024">` reemplazando
`var(--linea)` y `var(--nodo)` por los hex de la tabla de capas.
