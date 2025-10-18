## ALUMNO

1. FRANCISCO ALEXANDER CHIC BARRIOS, CARNET: 9490-22-2513, SECCION: "B"



# API REST con Autenticación JWT

API REST desarrollada con Node.js y Express.js que implementa autenticación mediante JSON Web Tokens (JWT).

## 🚀 URL de la API Desplegada

**URL:** https://tu-api.onrender.com

## 📋 Requisitos

- Node.js v14 o superior
- npm

## 🔧 Instalación Local

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo `.env`:
```env
PORT=3000
JWT_SECRET=tu_clave_secreta_super_segura
JWT_EXPIRES_IN=30s
```

4. Ejecutar el servidor:
```bash
node server.js
```

El servidor estará disponible en `http://localhost:3000`

## 🔐 Autenticación

### Login

**Endpoint:** `POST /login`

**Body:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Respuesta exitosa:**
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "30 segundos"
}
```

**Nota:** El token expira en 30 segundos.

## 📌 Endpoints

### Usuarios

#### Crear Usuario (No requiere autenticación)

**Endpoint:** `POST /users`

**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com"
}
```

**Respuesta:**
```json
{
  "id": 3,
  "name": "Juan Pérez",
  "email": "juan@example.com"
}
```

---

#### Listar Usuarios (Requiere autenticación)

**Endpoint:** `GET /users`

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
]
```

---

#### Actualizar Usuario (Requiere autenticación)

**Endpoint:** `PUT /users/:id`

**Headers:**
```
Authorization: Bearer <tu_token>
```

**Body:**
```json
{
  "name": "Juan Carlos Pérez"
}
```

**Respuesta:**
```json
{
  "id": 1,
  "name": "Juan Carlos Pérez",
  "email": "juan@example.com"
}
```

---

#### Eliminar Usuario (Requiere autenticación)

**Endpoint:** `DELETE /users/:id`

**Headers:**
```
Authorization: Bearer <tu_token>
```

**Respuesta:** `204 No Content`

## ⚠️ Errores Comunes

- **401 Unauthorized:** No se proporcionó token
- **403 Forbidden:** Token inválido o expirado
- **404 Not Found:** Recurso no encontrado

## 👨‍💻 Autor

FRANCISCO ALEXANDER CHIC BARRIOS - Hoja de Trabajo 6