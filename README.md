# 📝 Gestor de Tareas Profesional

Una aplicación web moderna y completa para la gestión de tareas, diseñada especialmente para estudiantes universitarios y uso personal.
Desarrollado con: React, Next.js y Tailwind CSS. CDN

# Extraer el archivo ZIP
unzip gestor-tareas-profesional.zip

# Navegar al directorio del proyecto
cd gestor-tareas-profesional

# Verificar versión de Node.js (debe ser 18+)
node --version

# Si no tienes Node.js, descárgalo de: https://nodejs.org/

# Instalar todas las dependencias del proyecto
npm install

# Inicializar shadcn/ui (si es necesario)
npx shadcn@latest init

# Instalar componentes específicos que podrían faltar
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add select
npx shadcn@latest add checkbox
npx shadcn@latest add badge
npx shadcn@latest add alert
npx shadcn@latest add label
npx shadcn@latest add textarea
npx shadcn@latest add toast
npx shadcn@latest add sonner

# Iniciar servidor de desarrollo
npm run dev

# El proyecto estará disponible en:
# http://localhost:3000

# Si el puerto 3000 está ocupado, Next.js usará automáticamente 3001, 3002, etc.

# Construir para producción
npm run build

# Ejecutar versión de producción
npm run start

# Reinstalar shadcn desde cero
npx shadcn@latest init --force
npx shadcn@latest add button input card dialog select checkbox badge alert label textarea

- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

![Gestor de Tareas](https://img.shields.io/badge/React-18+-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15+-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-38B2AC.svg)

## 🚀 Características Principales

### ✅ Funcionalidades Básicas
- **Agregar tareas** con formulario completo y validaciones
- **Marcar como completadas/pendientes** con un solo clic
- **Eliminar tareas** con confirmación visual
- **Filtrar por estado** (todas, pendientes, completadas)
- **Validaciones robustas** para evitar tareas vacías
- **Ordenamiento inteligente** por prioridad, fecha o título

### 🎯 Características Avanzadas
- **Sistema de prioridades** (baja, media, alta) con códigos de color
- **Categorías personalizables** para organizar por materias/proyectos
- **Fechas de vencimiento** con alertas visuales para tareas vencidas
- **Búsqueda en tiempo real** por título, descripción o categoría
- **Estadísticas dinámicas** (total, completadas, pendientes, alta prioridad, vencidas)
- **Persistencia automática** con localStorage

### 🎨 Diseño y UX
- **Interfaz moderna y limpia** con componentes shadcn/ui
- **Completamente responsiva** - funciona en móviles, tablets y desktop
- **Notificaciones inmediatas** para feedback del usuario
- **Alertas visuales** para tareas vencidas y validaciones
- **Animaciones suaves** para una experiencia fluida
- **Iconografía consistente** con Lucide React

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18+ con hooks modernos
- **Framework**: Next.js 15+ (App Router)
- **Lenguaje**: TypeScript para tipado seguro
- **Estilos**: Tailwind CSS para diseño responsivo
- **Componentes**: shadcn/ui para componentes de alta calidad
- **Iconos**: Lucide React para iconografía consistente
- **Persistencia**: localStorage para almacenamiento local

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de instalación

1. **Clonar o descargar el proyecto**
\`\`\`bash
# Si usaste el comando de shadcn
npx shadcn@latest add "https://v0.dev/chat/..."

# O si tienes el código fuente
git clone <repository-url>
cd gestor-tareas
\`\`\`

2. **Instalar dependencias**
\`\`\`bash
npm install
# o
yarn install
\`\`\`

3. **Ejecutar en modo desarrollo**
\`\`\`bash
npm run dev
# o
yarn dev
\`\`\`

4. **Abrir en el navegador**
\`\`\`
http://localhost:3000
\`\`\`

## 🎮 Uso de la Aplicación

### Agregar una Nueva Tarea
1. Haz clic en el botón **"Nueva Tarea"**
2. Completa el formulario:
   - **Título**: Obligatorio (máximo 100 caracteres)
   - **Descripción**: Opcional, para detalles adicionales
   - **Prioridad**: Baja, Media o Alta
   - **Categoría**: Para organizar (ej: "Universidad", "Personal")
   - **Fecha de vencimiento**: Opcional, para recordatorios
3. Haz clic en **"Agregar Tarea"**

### Gestionar Tareas Existentes
- **Completar**: Marca el checkbox junto a la tarea
- **Editar**: Haz clic en el ícono de lápiz
- **Eliminar**: Haz clic en el ícono de papelera
- **Buscar**: Usa la barra de búsqueda para encontrar tareas específicas
- **Filtrar**: Selecciona "Todas", "Pendientes" o "Completadas"
- **Ordenar**: Por fecha, prioridad o título (ascendente/descendente)

### Interpretar las Estadísticas
- **Total**: Número total de tareas creadas
- **Completadas**: Tareas marcadas como terminadas
- **Pendientes**: Tareas aún por completar
- **Alta Prioridad**: Tareas urgentes sin completar
- **Vencidas**: Tareas pendientes que pasaron su fecha límite

## 📱 Casos de Uso Ideales

### Para Estudiantes Universitarios
- **Tareas por materia**: Organiza assignments por categorías
- **Proyectos con fechas**: Gestiona entregas importantes
- **Estudios por prioridad**: Enfócate en lo más urgente
- **Seguimiento de progreso**: Ve tu productividad en tiempo real

### Para Uso Personal
- **Tareas domésticas**: Organiza quehaceres del hogar
- **Proyectos personales**: Gestiona hobbies y metas
- **Recordatorios importantes**: No olvides fechas clave
- **Planificación diaria**: Estructura tu día a día

## 🔧 Estructura del Proyecto

\`\`\`
gestor-tareas/
├── app/
│   ├── page.tsx              # Componente principal de la aplicación
│   ├── layout.tsx            # Layout base de Next.js
│   ├── globals.css           # Estilos globales con Tailwind
│   └── loading.tsx           # Componente de carga
├── components/
│   └── ui/                   # Componentes de shadcn/ui
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── select.tsx
│       ├── checkbox.tsx
│       ├── badge.tsx
│       ├── alert.tsx
│       ├── label.tsx
│       └── textarea.tsx
├── hooks/
│   └── use-toast.ts          # Hook personalizado para notificaciones
├── lib/
│   └── utils.ts              # Utilidades y helpers
├── README.md                 # Documentación del proyecto
├── package.json              # Dependencias y scripts
├── tailwind.config.ts        # Configuración de Tailwind CSS
├── tsconfig.json             # Configuración de TypeScript
└── next.config.mjs           # Configuración de Next.js
\`\`\`

## 🧪 Testing y Calidad

### Scripts Disponibles
\`\`\`bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Construir para producción
npm run start        # Ejecutar versión de producción
npm run lint         # Verificar código con ESLint

# Testing (si se implementa)
npm test             # Ejecutar pruebas
npm run test:watch   # Pruebas en modo watch
npm run test:coverage # Cobertura de pruebas
\`\`\`

### Validaciones Implementadas
- **Título obligatorio**: No se pueden crear tareas sin título
- **Límite de caracteres**: Máximo 100 caracteres para el título
- **Fechas válidas**: Validación de formato de fechas
- **Persistencia segura**: Manejo de errores en localStorage

## 🔒 Privacidad y Datos

### Almacenamiento Local
- **Todos los datos se guardan localmente** en tu navegador
- **No se envía información** a servidores externos
- **Privacidad total**: Tus tareas permanecen en tu dispositivo
- **Backup manual**: Puedes exportar/importar datos si es necesario

### Compatibilidad de Navegadores
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🚀 Deployment

### Vercel (Recomendado)
\`\`\`bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Build command
npm run build

### Otros Proveedores
La aplicación es compatible con cualquier proveedor que soporte Next.js estático.

## 🔮 Roadmap y Mejoras Futuras

### Versión 2.0 (Planificada)
- [ ] **Autenticación de usuarios** con NextAuth.js
- [ ] **Sincronización en la nube** con base de datos
- [ ] **Modo oscuro/claro** toggle
- [ ] **Exportación de datos** a PDF/CSV
- [ ] **Notificaciones push** para recordatorios
- [ ] **Colaboración** en tareas compartidas
- [ ] **Aplicación móvil** (PWA)
- [ ] **Integración con calendarios** (Google Calendar, Outlook)

### Mejoras de UX
- [ ] **Drag & drop** para reordenar tareas
- [ ] **Atajos de teclado** para acciones rápidas
- [ ] **Temas personalizables** 
- [ ] **Widgets de escritorio**
- [ ] **Modo offline** completo

---

*Hecho con React, Next.js y mucho café xd ☕*