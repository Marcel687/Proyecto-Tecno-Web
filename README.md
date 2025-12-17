# Proyecto Tecnologías Web I — Aplicación Web con Vue 3 + Vite

**Autores:**

- Luis Marcel Murillo Ulloa
- Luis Ruben Zelaya Rivera
- Ricardo Tomas Camacho Montalvo

Este proyecto es una aplicación web desarrollada con Vue 3, JavaScript y Vite como herramienta de construcción. Incluye una arquitectura modular basada en componentes, vistas y enrutamiento, orientada a la creación de un sistema de gestión de locales, productos y acceso de usuarios.

El objetivo del proyecto es demostrar un flujo completo de frontend moderno utilizando Vue, integrando componentes reutilizables y una navegación organizada.

---

## Estructura del Proyecto

La estructura principal del proyecto es la siguiente:

```text
PROYECTO-TEC-WEB
│── .vscode/
│── node_modules/
│── public/
│── src/
│   ├── assets/
│   ├── components/
│   │   ├── ListaComentario.vue
│   │   ├── AdvertenciaPopup.vue
│   │   ├── Footer.vue
│   │   ├── LocalesTable.vue
│   │   ├── LocalModal.vue
│   │   ├── Navbar.vue
│   │   ├── PrecioPopup.vue
│   │   ├── Productos.vue
│   │   └── SearchBar.vue
│   ├── data/
│   │   └── locales.js
│   ├── router/
│   ├── services/
│   │   └── jsonPlaceholder.js
│   ├── views/
│   │   ├── Comentario.vue
│   │   ├── Contacto.vue
│   │   ├── Locales.vue
│   │   ├── Login.vue
│   │   └── Principal.vue
│   ├── App.vue
│   ├── main.js
│   └── style.css
│── .gitignore
│── index.html
│── package-lock.json
│── package.json
│── README.md
│── vite.config.js
```
````

---

## Descripción de Carpetas y Archivos

### src

Carpeta raíz del código fuente.

### components

Contiene todos los componentes reutilizables de la aplicación:

- **AdvertenciaPopup.vue**: Popup para mostrar advertencias o mensajes al usuario.
- **Footer.vue**: Pie de página global.
- **LocalesTable.vue**: Tabla dinámica para mostrar la lista de locales.
- **LocalModal.vue**: Modal para registrar/editar información de locales.
- **Navbar.vue**: Barra de navegación principal.
- **PrecioPopup.vue**: Popup para mostrar o editar precios.
- **Productos.vue**: Sección mostrada dentro de locales para gestionar productos.
- **SearchBar.vue**: Barra de búsqueda integrada para filtrado dinámico.
- **ListaComentarios.vue**: Lista que permite ver los comentarios dejados por los usuarios.

### data

Contiene datos locales estáticos o simulados.

- **locales.js**: Archivo con datos de ejemplo para locales.

### router

Carpeta destinada a almacenar el sistema de enrutamiento con Vue Router. Usualmente contiene `index.js` o `router.js`.

### views

Vistas principales de la aplicación (pantallas completas):

- **Comentario.vue**: Vista donde se muestran los comentarios.
- **Contacto.vue**: Página de contacto.
- **Locales.vue**: Vista donde se muestran y gestionan los locales.
- **Login.vue**: Página de inicio de sesión.
- **Principal.vue**: Pantalla principal del sistema.

### Archivos Raíz de src

- **App.vue**: Componente base de toda la aplicación. Actúa como layout general.
- **main.js**: Punto de entrada donde se monta la aplicación Vue y se configuran los plugins globales.
- **style.css**: Archivo con estilos globales.

### Archivos de Configuración

- **index.html**: Archivo HTML principal donde Vite inyecta la aplicación.
- **vite.config.js**: Configuración de Vite para el entorno de desarrollo y producción.

---

## Instalación y Ejecución

**Requisitos Previos:**
Asegúrate de tener instalado:

- **Node.js** (versión recomendada: 18+)
- **npm** o **yarn**

### 1. Dirigirse a carpeta del proyecto

```bash
cd proyecto-tec-web

```

### 2. Instalar dependencias

```bash
npm install
npm install leaflet --save

```

### 3. Ejecutar en desarrollo

```bash
npm run dev

```

La aplicación estará disponible usualmente en: http://localhost:5173/

### 4. Generar build de producción

```bash
npm run build

```

---

## Tecnologías Utilizadas

| Tecnología                  | Propósito                        |
| --------------------------- | -------------------------------- |
| **Vue 3 (Composition API)** | Framework principal del proyecto |
| **Vite**                    | Compilador rápido y ligero       |
| **JavaScript ES6+**         | Lógica del frontend              |
| **Vue Router**              | Navegación entre vistas          |
| **CSS**                     | Estilos globales                 |
| **HTML + Vite Templating**  | Estructura base                  |

---

## Funcionalidades Principales del Proyecto

- Sistema de navegación con múltiples vistas.
- Gestión de locales mediante tablas y modales.
- Búsqueda dinámica de elementos.
- Componentes reutilizables (Navbar, Footer, Popups).
- Integración con datos locales (simulados).
- Página de inicio de sesión.
- Uso de popups para advertencias y edición de precios.
- Vista principal con acceso a las secciones relevantes.

---

## Scripts Disponibles

Desde `package.json`:

| Comando           | Descripción                            |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Ejecuta el proyecto en modo desarrollo |
| `npm run build`   | Genera los archivos para producción    |
| `npm run preview` | Previsualiza el build                  |

---

## Buenas Prácticas Recomendadas

- Mantener componentes pequeños y reutilizables.
- Utilizar Vue Router para dividir la aplicación en vistas organizadas.
- Separar datos en `/data` o consumir API externas.
- Mantener estilos globales en `style.css`.
- Validar datos en formularios antes de enviarlos.
- Describir cada componente en comentarios internos.

---

## Posibles Mejoras Futuras

- Integrar autenticación real con JWT.
- Conectar con API backend (Node/Express, Laravel, Spring, etc).
- Implementar Vuex o Pinia para gestión de estado global.
- Añadir paginación y ordenamiento a tablas.
- Mejorar responsive design.

```

```
