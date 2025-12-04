# 📱 Frontend - TODO List

Frontend desarrollado con React + Vite para la aplicación TODO List.

## 🚀 Tecnologías

- **React 19** - Biblioteca UI
- **Vite** - Build tool
- **Tailwind CSS** - Estilos
- **Axios** - Cliente HTTP
- **React Router** - Routing
- **React Toastify** - Notificaciones

## 📦 Instalación

```bash
npm install
```

## 🛠️ Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Build

```bash
npm run build
```

El build se generará en la carpeta `dist/`

## 🌐 Despliegue

### Netlify

1. Conecta tu repositorio a Netlify
2. Configura:
   - **Base directory**: `FORM-TO-DO`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Agrega variable de entorno:
   - `VITE_API_URL`: URL de tu backend

### Vercel

1. Conecta tu repositorio a Vercel
2. Configura:
   - **Root Directory**: `FORM-TO-DO`
   - **Framework Preset**: `Vite`
3. Agrega variable de entorno:
   - `VITE_API_URL`: URL de tu backend

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000
```

Para producción, configura esta variable en Netlify o Vercel.

## 📁 Estructura

```
src/
├── api/              # Configuración API
├── components/       # Componentes React
├── context/          # Context API
├── hooks/            # Custom hooks
└── pages/            # Páginas
```

## 🔗 API

El frontend se conecta al backend a través de la variable `VITE_API_URL`.

Endpoints utilizados:
- `GET /tasks` - Obtener tareas
- `POST /tasks` - Crear tarea
- `PUT /tasks/:id` - Actualizar tarea
- `DELETE /tasks/:id` - Eliminar tarea

## 📚 Documentación

- [Guía de Despliegue](../docs/deployment.md)
- [Arquitectura](../docs/architecture.md)
