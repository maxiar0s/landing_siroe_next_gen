# SIROE Next-Gen - Angular

Migracion de la landing a Angular (standalone components) para publicar en `siroe.cl/staffing`.

## Ejecutar local

```bash
npm install
npm start
```

## Build

```bash
npm run build
```

Build para carpeta `/staffing`:

```bash
npm run build:staffing
```

El output queda en `dist/siroe-staffing/`.

## Estructura

- `src/app/components/hero-section.component.ts`
- `src/app/components/adn-ia-section.component.ts`
- `src/app/components/staffing-section.component.ts`
- `src/app/components/profiles-section.component.ts`
- `src/app/components/toolkit-section.component.ts`
- `src/app/components/contact-section.component.ts`
- `src/app/components/footer-section.component.ts`
- `src/app/components/whatsapp-float.component.ts`
- `src/app/analytics.service.ts`
- `src/app/reveal.directive.ts`

## Notas

- WhatsApp configurado: `+56988375496`
- Formulario envia a: `comercial@siroe.cl`
- Eventos analiticos implementados:
  - `cta_staffing_click`
  - `cta_adn_ia_click`
  - `whatsapp_button_click`
  - `form_submit_success`
  - `form_submit_error`

La carpeta `staffing/` se mantiene como referencia de la version HTML inicial.
