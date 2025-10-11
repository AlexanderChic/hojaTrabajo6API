# 🧩 Hoja de Trabajo 6 - API REST con Node.js y Express

## 📖 Descripción del Proyecto

Esta API fue desarrollada como parte de la **Hoja de Trabajo 6** del curso de **Desarrollo Web**. El objetivo principal es implementar una **API REST** que permita realizar operaciones **CRUD (Crear, Leer, Actualizar y Eliminar)** sobre una colección de **usuarios**.

La API está desarrollada en **Node.js** utilizando **Express** como framework principal.

---

## 👥 Integrantes del Grupo

- **Francisco Alexander Chic Barrios** - 📘 Carnet: 9490-22-2513
- **Herbert Daniel Jocol Morataya** - 📘 Carnet: 9490-22-423

### 📚 Curso
**Desarrollo Web**, Sección: **B**

---

## 🚀 URL de la API Desplegada en Render

🔗 **API Render URL:** 👉 [https://hojatrabajo6api.onrender.com/users](https://hojatrabajo6api.onrender.com/users)

---

## ⚙️ Instrucciones para Ejecutar la API Localmente

### 1️⃣ Clonar el repositorio desde GitHub
```bash
git clone https://github.com/tuUsuario/hojatrabajo6api.git
cd hojatrabajo6api
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Ejecutar el servidor
```bash
node index.js
```

### 4️⃣ Acceder a la API localmente
Una vez ejecutado, puedes acceder a la ruta base de usuarios a través de:

👉 http://localhost:3000/users

---

## 🏗️ Configuración de Despliegue (Render)

| Configuración | Valor |
| :--- | :--- |
| Build Command | npm install |
| Start Command | node index.js |
| Runtime | Node 18+ |
| Environment Variables | (no requeridas para este ejercicio) |

---

## 📘 Descripción de los Endpoints (CRUD de Usuarios)

### 1️⃣ POST /users
👉 Crear un nuevo usuario

**Ejemplo de Solicitud (Body JSON):**
```json
{
  "dpi": "1234567890122",
  "name": "Alexander Chic",
  "email": "alexchicf@example.com",
  "password": "Alex123!"
}
```

**Respuestas Posibles:**

| Código | Descripción |
| :--- | :--- |
| 201 | Usuario creado correctamente |
| 400 | Faltan datos o formato inválido |
| 409 | DPI o email ya registrados |

---

### 2️⃣ GET /users
👉 Obtener todos los usuarios

**Ejemplo de Solicitud:**
```
GET https://hojatrabajo6api.onrender.com/users
```

**Respuesta Exitosa (Ejemplo):**
```json
[
  {
    "dpi": "1234567890122",
    "name": "Alexander Chic",
    "email": "alexchicf@example.com"
  }
]
```

**Parámetros Opcionales (Query Params):**

| Parámetro | Descripción |
| :--- | :--- |
| name | Filtrar por nombre parcial |
| email | Filtrar por email exacto |
| limit | Límite de resultados (número) |
| offset | Desde qué posición iniciar (número) |

---

### 3️⃣ PUT /users/:dpi
👉 Actualizar un usuario existente

**Ejemplo de Solicitud:**
```
PUT https://hojatrabajo6api.onrender.com/users/1234567890122
```

**Body JSON:**
```json
{
  "name": "Alexander C. Barrios",
  "email": "alexcb@example.com",
  "password": "NuevoPass123!",
  "newDpi": "1234567890999"
}
```

**Respuestas Posibles:**

| Código | Descripción |
| :--- | :--- |
| 200 | Usuario actualizado correctamente |
| 400 | Datos inválidos |
| 404 | Usuario no encontrado |
| 409 | Email o nuevo DPI ya registrados |

---

### 4️⃣ DELETE /users/:dpi
👉 Eliminar un usuario

**Ejemplo de Solicitud:**
```
DELETE https://hojatrabajo6api.onrender.com/users/1234567890122
```

**Respuesta Exitosa:**
```json
{ 
  "message": "Usuario eliminado correctamente" 
}
```

**Errores Posibles:**

| Código | Descripción |
| :--- | :--- |
| 404 | Usuario no encontrado |

---

## 🧠 Validaciones Incluidas

La API aplica las siguientes reglas de validación en la creación y actualización de usuarios:

- **DPI:** Debe contener exactamente 13 dígitos numéricos.
- **Email:** Debe tener formato válido (usuario@dominio.com).
- **Contraseña:** Debe incluir al menos una mayúscula, un número y un símbolo especial.
- **Campos requeridos:** dpi, name, email, password.

---

## 📦 Dependencias del Proyecto

El proyecto utiliza las siguientes dependencias principales (extraídas de package.json):

```json
"dependencies": {
  "cors": "^2.8.5",
  "express": "^4.19.2",
  "morgan": "^1.10.0"
}
```

| Paquete | Función |
| :--- | :--- |
| express | Framework para manejar las rutas y solicitudes HTTP. |
| cors | Permite solicitudes desde distintos orígenes (CORS). |
| morgan | Middleware para registrar las peticiones HTTP en la consola. |

---

## 💾 Estructura del Proyecto

```
📁 hojatrabajo6api
├── 📄 index.js         # Archivo principal de la aplicación
├── 📄 package.json     # Metadatos y dependencias del proyecto
└── 📄 README.md        # Documentación (este archivo)
```

---

## 📎 Repositorio en GitHub

El código fuente del proyecto se encuentra disponible en:

👉 https://github.com/tuUsuario/hojatrabajo6api