# Sistema de Checklist SMT

Sistema de control de checklist para equipos de líneas de producción SMT.

## Características

- ✅ Selección de línea (1-4 o Lavado)
- ✅ Selección de equipo por línea
- ✅ Formulario paso a paso para Screen Printer
- ✅ Opción "NP" (No Produce)
- ✅ Validación con unidades de medida (Mpa, °C)
- ✅ Guardado en base de datos MySQL

## Instalación

### 1. Instalar Dependencias

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configurar Base de Datos

```bash
# Script automático
setup-db.bat
```

O manualmente:
1. Crear la base de datos ejecutando `init.sql` en MySQL
2. Configurar conexión en `backend/.env`

### 3. Iniciar el Sistema

```bash
# Producción (con Nginx)
start.bat

# Desarrollo
start-dev.bat

# Solo build
build.bat
```

## Uso del Sistema

### 1. Selección Inicial
- Seleccionar línea (1-4 o Lavado)
- Seleccionar equipo disponible
- Completar datos del operador
- Elegir entre "Iniciar Checklist" o "NP (No Produce)"

### 2. Formulario Screen Printer
El sistema incluye 8 verificaciones paso a paso con validaciones específicas.

## Tecnologías

- **Backend:** Node.js, Express, MySQL2 (Puerto 8600)
- **Frontend:** React, Tailwind CSS, Vite (Puerto 3006)
- **Nginx:** Proxy reverso (Puerto 8501)

## Acceso

- **Producción:** http://localhost:8501 (via Nginx)
- **Desarrollo:** http://localhost:3006 (Vite dev server)
- **API:** http://localhost:8600 (Backend directo)