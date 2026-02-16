# SIROE Next-Gen Landing (/staffing)

## Publicacion

- Esta carpeta esta preparada para publicar en `siroe.cl/staffing`.
- Si tu hosting usa raiz de sitio, sube todo el contenido de `staffing/` dentro de la carpeta publica `/staffing`.

## Edicion rapida

- Texto principal y secciones: `staffing/index.html`
- Estilos y diseno: `staffing/styles.css`
- Eventos, WhatsApp y formulario: `staffing/script.js`

## Datos clave configurados

- WhatsApp: `+56988375496`
- Mensaje de WhatsApp: `Hola, me interesa conocer mas sobre Staffing IA de SIROE`
- Email de leads: `comercial@siroe.cl`

## Cambiar email o WhatsApp

- Email formulario:
  - Busca `formsubmit.co/ajax/comercial@siroe.cl` en `staffing/script.js` y reemplaza el correo.
- WhatsApp:
  - Busca `wa.me/56988375496` en `staffing/index.html`.
  - Si cambias el mensaje, codificalo en URL.

## Badges de tecnologias y toolkit

- Hero badges: bloque `div.badges` en `staffing/index.html`
- Toolkit badges: bloque `div.toolkit-badges` en `staffing/index.html`

## Analitica

- Eventos implementados:
  - `cta_staffing_click`
  - `cta_adn_ia_click`
  - `whatsapp_button_click`
  - `form_submit_success`
  - `form_submit_error`
- Si instalas GA4 con `gtag`, los eventos se enviaran automaticamente.

## Nota anti-spam

- Esta version usa anti-spam equivalente: honeypot + validaciones + bloqueo de envio demasiado rapido.
- Si deseas reCAPTCHA/hCaptcha, se puede integrar con tu clave del proveedor.
