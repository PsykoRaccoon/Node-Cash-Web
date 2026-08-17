# Node Cash — sitio público

Página de una sola vista para enseñar la marca y juntar la lista de espera. Sin dependencias,
sin build, sin frameworks: HTML, una hoja de estilos y treinta líneas de JavaScript.

Está en oscuro a propósito, sin interruptor de tema: la app se diseñó en oscuro y así es como se
ve el producto.

---

## Publicar en GitHub Pages

1. Sube el contenido de esta carpeta **a la raíz** de un repositorio nuevo (que `index.html`
   quede en la raíz, no dentro de otra carpeta).
2. **Settings → Pages**.
3. *Source*: **Deploy from a branch**. Branch **`main`**, carpeta **`/ (root)`**. Guarda.
4. En un minuto queda en `https://<usuario>.github.io/<repo>/`.

**Dominio propio:** agrega un archivo `CNAME` en la raíz con el dominio en una sola línea (sin
`https://`) y apunta el DNS a GitHub Pages.

---

## Conectar la lista de espera

GitHub Pages es estático: no procesa envíos. Mientras no conectes un servicio, el formulario
avisa que falta conectarlo en lugar de fingir que guardó el correo.

Para dejarlo funcionando, en `index.html` busca `<form class="formulario"`:

1. Pon la URL de tu servicio en `action`.
2. Borra el atributo `data-sin-conectar`.

```html
<form class="formulario" action="https://formspree.io/f/TU-ID" method="post">
```

Sirve cualquiera que acepte un POST de formulario:

| Servicio | Plan gratis | Nota |
|---|---|---|
| **Formspree** | 50 envíos al mes | Lo más rápido de conectar; te llegan por correo |
| **Buttondown** | 100 suscriptores | Es lista de correo de verdad, con newsletter incluida |
| **Mailchimp / MailerLite** | ~500–1,000 contactos | El campo se llama distinto: revisa el `name` que pide el formulario embebido |

El campo se manda como `email`. Si tu servicio espera otro nombre, cambia el `name` del
`<input class="campo">`.

---

## Estructura

```
.
├── index.html                ← toda la página, con el símbolo y las ilustraciones en SVG
├── .nojekyll                 ← publica los archivos tal cual, sin pasar por Jekyll
├── README.md
└── assets/
    ├── css/estilo.css        ← un solo archivo, ordenado por secciones
    ├── js/pagina.js          ← revela las ilustraciones y avisa si el formulario no está conectado
    └── img/marca.svg         ← el símbolo (favicon y descarga del kit de marca)
```

Rutas relativas: funciona igual en la raíz de un dominio, en un subdirectorio de Pages o abierta
desde el disco.

---

## Qué cambiar cuando cambie el producto

- **La fecha de salida.** «Sale este año» está en la sección de la lista de espera; cuando haya
  fecha, ponla.
- **Los números de ejemplo.** La curva usa un caso de $22,000 de ingreso con un excedente de $950
  en octubre. Si cambias las cifras, cámbialas en los tres lugares donde aparecen: la gráfica, la
  píldora de aviso y la sección del muro.
- **Las capturas.** Hoy no hay ninguna: las ilustraciones son SVG dibujados para la página, así que
  no prometen pantallas que todavía pueden cambiar. Cuando la app esté lista, el lugar natural
  para meterlas es después de la sección «La curva».

## Detalles que conviene no romper

- **El símbolo se usa siempre con su fondo.** Vive una sola vez, como `<symbol id="marca">` al
  inicio de `index.html`, y se reusa con `<use>` en cada tamaño.
- **Un solo acento.** El verde `#00A896` es de la marca; el ámbar `#FFA92E` es del muro y de nada
  más. Si el ámbar empieza a usarse para botones, el muro deja de destacar.
- **La animación es una sola.** Las doce columnas al cargar y las barras de la curva al entrar en
  pantalla. Ambas respetan «reducir movimiento» del sistema.
- **El tono.** La página informa y no regaña: dice el número y se calla. Es la misma regla que
  sigue la app.
