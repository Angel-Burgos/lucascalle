# lucascalle — Guía de configuración

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
firebase deploy --only hosting:lucascalle
```

