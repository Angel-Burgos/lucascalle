# lucascalle — Guía de configuración

## 1. Crear el proyecto desde cero (VSCode + Vite)

```bash
# En la terminal de VSCode (Ctrl+`)
npm create vite@latest lucascalle -- --template react
cd lucascalle
npm install
npm install react-router-dom
```

## 2. Copiar los archivos de este proyecto

Reemplaza / añade los siguientes archivos en tu proyecto Vite:

```
src/
  App.jsx                          ← reemplazar
  App.css                          ← reemplazar
  main.jsx                         ← reemplazar
  config/
    projects.js                    ← nuevo
  components/
    ProjectCard.jsx                ← nuevo
    ProjectCard.module.css         ← nuevo
  assets/
    projects/                      ← carpeta nueva con tus imágenes
index.html                         ← reemplazar
vite.config.js                     ← reemplazar
firebase.json                      ← nuevo
```

## 3. Añadir tus imágenes

Pon tus imágenes en `src/assets/projects/`.
Formatos recomendados: `.jpg` o `.webp` para mejor rendimiento.

## 4. Editar los proyectos

Abre `src/config/projects.js` y edita el array `projects`:

```js
import miImagen from '../assets/projects/mi-proyecto.jpg'

const projects = [
  {
    id: 'mi-proyecto',        // se usa en la URL: /project/mi-proyecto
    title: 'Nombre proyecto',
    year: 2024,
    image: miImagen,
    size: 'lg',               // 'sm' | 'md' | 'lg'
  },
  // ...más proyectos
]
```

## 5. Desarrollo local

```bash
npm run dev
# Abre http://localhost:5173
```

## 6. Publicar en Firebase

```bash
# Instalar Firebase CLI (solo la primera vez)
npm install -g firebase-tools

# Login
firebase login

# Inicializar hosting (solo la primera vez)
firebase init hosting
# → Public directory: dist
# → Single-page app: Yes
# → Overwrite index.html: No

# Build + deploy
npm run build
firebase deploy
```

## Personalización

| Qué cambiar | Dónde |
|---|---|
| Colores y tipografía | `src/App.css` — variables `:root` |
| Tamaños de tarjetas | `src/components/ProjectCard.module.css` — `SIZE_MAP` |
| Texto firma inferior | `src/App.jsx` — `<div className="site-name">` |
| Contenido página proyecto | `src/App.jsx` — componente `ProjectPage` |
