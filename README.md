# D' MADERA & ACERO — EXPERIENCIA WEB ARQUITECTÓNICA

> **"THE ART OF WOOD & STEEL"**  
> Sitio web editorial y comercial de alto impacto para **D' Madera & Acero**, taller especializado en carpintería fina a medida y herrería arquitectónica en **Nogales, Sonora, México**.

---

## 1. Visión & Dirección de Arte

El proyecto fue concebido bajo una dirección de arte editorial inspirada en estudios de arquitectura contemporánea y publicaciones de interiorismo:
- **Equilibrio de materiales:** Contraste armónico entre la calidez de la madera (nogal, roble, acabados naturales) y la resistencia geométrica del acero (perfiles negros, herrería estructural).
- **Fotografía 100% auténtica:** Curaduría de 26 proyectos reales extraídos del catálogo verificado del taller. Sin renders artificiales, sin fotos de stock ni afirmaciones no verificables.
- **Enfoque de conversión directa:** Cada fotografía, especialidad y formulario está enlazado a la API oficial de WhatsApp (`+52 631 181 9094`) con mensajes preformateados y codificados para facilitar cotizaciones inmediatas.

---

## 2. Stack Tecnológico

Desarrollado bajo los más altos estándares de rendimiento nativo:
- **HTML5 Semántico:** Jerarquía estricta de encabezados (`H1`-`H4`), roles ARIA, accesibilidad auditada, metadatos Open Graph, Twitter Cards y Schema.org JSON-LD para SEO local en Nogales, Sonora.
- **CSS3 Moderno Modular:**
  - `css/variables.css`: Design tokens, paleta cromática de materiales, tipografías y escalas.
  - `css/base.css`: Resets modernos, link de salto para lectores de pantalla y soporte de `prefers-reduced-motion`.
  - `css/layout.css`: Contenedores fluidos, sistema de grillas, cabecera fija inteligente y cajón de menú móvil.
  - `css/components.css`: Botones arquitectónicos, micro-interacciones, píldora flotante de WhatsApp y estados de hover.
  - `css/sections.css`: Portada Hero asimétrica, editorial de filosofía, especialidades, momento destacado y cotizador.
  - `css/lightbox.css`: Modal interactivo accesible para visualización de alta resolución.
  - `css/responsive.css`: Breakpoints optimizados para **390px (iPhone)**, **768px (Tablet)**, **1440px (Desktop)** y **1920px (Ultra-wide)**.
- **JavaScript Vanilla Modular:**
  - `js/portfolio-data.js`: Catálogo de 26 obras con dimensiones, categorías y textos descriptivos.
  - `js/lightbox.js`: Navegación con teclado (Esc, Flechas), trampa de foco y enlace directo a cotización.
  - `js/portfolio.js`: Motor de filtrado sin layout shifts y layout editorial con proporciones dinámicas.
  - `js/quote-form.js`: Cotizador interactivo con vista previa en vivo del mensaje de WhatsApp.
  - `js/main.js`: Orquestación, scroll suave con offset de cabecera, acordeón FAQ y notificaciones toast.
- **Cero dependencias externas pesadas:** Sin React, sin Next.js, sin Vue, sin Tailwind, sin Bootstrap. Carga instantánea.

---

## 3. Estructura del Proyecto

```text
D'Madera & Acero/
├── index.html                  # Documento principal semántico y accesible
├── favicon.svg                 # Isotipo vectorial arquitectónico
├── robots.txt                  # Directivas de indexación para buscadores
├── sitemap.xml                 # Mapa de sitio XML
├── vercel.json                 # Configuración de despliegue y cabeceras de seguridad
├── README.md                   # Documentación técnica completa
├── css/
│   ├── variables.css           # Tokens de diseño y paleta de materiales
│   ├── base.css                # Resets, tipografía y accesibilidad
│   ├── layout.css              # Estructura, cabecera, menú móvil y footer
│   ├── components.css          # Botones, badges, chips y flotante WhatsApp
│   ├── sections.css            # Estilos de cada bloque temático
│   ├── lightbox.css            # Modal visualizador de proyectos
│   └── responsive.css          # Adaptabilidad 390px a 1920px
├── js/
│   ├── portfolio-data.js       # Base de datos local de 26 proyectos reales
│   ├── lightbox.js             # Lógica de visualización y navegación accesible
│   ├── portfolio.js            # Motor de render y filtrado por disciplina
│   ├── quote-form.js           # Generador de mensajes inteligentes para WhatsApp
│   └── main.js                 # Comportamiento general de navegación y UI
└── assets/
    ├── icons/
    │   └── favicon.svg         # Monograma arquitectónico
    └── images/
        ├── hero/               # Imágenes principales de portada
        ├── carpinteria/        # Cocinas, clósets, vestidores, puertas
        ├── herreria/           # Portones, barandales, escaleras, celosías
        └── madera-y-acero/     # Mobiliario combinado y piezas estructurales
```

---

## 4. Ejecución en Servidor Local (Mac / PC)

El proyecto es 100% estático y portátil, no requiere pasos de compilación (`build`).

### Opción A — Con Python 3 (Recomendado):
Abre la terminal en la carpeta del proyecto y ejecuta:
```bash
python3 -m http.server 3000
```
Luego abre tu navegador en:
`http://localhost:3000`

### Opción B — Con Node.js / npx serve:
```bash
npx serve .
```

### Opción C — Apertura directa:
Haz doble clic sobre el archivo `index.html` o ábrelo directamente en Google Chrome o Safari.

---

## 5. Publicación en Vercel

El proyecto incluye el archivo `vercel.json` preconfigurado con reglas de caché inmutable para imágenes y cabeceras de seguridad HTTP (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`).

### Vía Vercel CLI:
```bash
# 1. Instalar o ejecutar vercel CLI
npx vercel

# 2. Para desplegar directamente a producción:
npx vercel --prod
```

### Vía GitHub + Vercel Dashboard:
1. Sube este repositorio a tu cuenta de GitHub / GitLab.
2. Ingresa a [vercel.com](https://vercel.com) y selecciona **Add New Project**.
3. Importa el repositorio.
4. Framework Preset: **Other** (HTML estático).
5. Haz clic en **Deploy**. El sitio quedará publicado globalmente en segundos.

---

## 6. Integración Comercial con WhatsApp

- **Número oficial de contacto:** `+52 631 181 9094`
- **Enlace directo:** `https://wa.me/526311819094`
- **Cotizador inteligente:** Permite seleccionar la disciplina (Carpintería, Herrería, Madera & Acero, No estoy seguro), describir el proyecto deseado, ingresar medidas aproximadas y ubicación.
- **Referencia del portafolio:** Cuando un usuario explora la galería o abre el Lightbox de un proyecto específico (ej. *Cocina Integral con Isla Central* o *Portón Horizontal en Acero Negro*), puede presionar **"Cotizar este trabajo"**, y el sistema inyecta automáticamente el nombre y referencia de la fotografía en el mensaje de WhatsApp.
- **Transparencia:** El usuario ve en tiempo real la vista previa exacta del texto que enviará y el navegador abre la aplicación oficial de WhatsApp con el mensaje codificado mediante `encodeURIComponent`.

---

## 7. Verificación de Calidad y Accesibilidad

- **LCP (Largest Contentful Paint):** Pre-carga de imagen de portada (`fetchpriority="high"`), reserva explícita de `width` y `height` en todas las etiquetas `<img>` para evitar Cumulative Layout Shift (CLS = 0).
- **Cero errores de consola:** Scripts estructurados en clases con validación defensiva de elementos DOM.
- **Diseño Mobile-First:** Verificado minuciosamente en pantallas verticales de smartphones (390px) con áreas táctiles generosas (mínimo 44x44px) y navegación móvil fluida.
- **Cumplimiento WCAG:** Contrastes tipográficos revisados, soporte de navegación con teclado (Tab, Enter, Espacio, Esc, Flechas), atributos `aria-expanded`, `aria-modal`, `aria-label` y `role="dialog"`.
