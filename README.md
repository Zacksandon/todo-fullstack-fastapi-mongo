# 📘 Todo List FullStack – FastAPI + React + MongoDB

Este proyecto es una aplicación **FullStack completa** diseñada para gestionar tareas mediante operaciones CRUD, interfaz moderna y backend asincrónico. Incluye conexión en la nube, documentación automática, arquitectura limpia y despliegue profesional.

---

# ✨ Características principales

✔ CRUD completo (Crear, Leer, Actualizar, Eliminar)  
✔ Backend con **FastAPI + MongoDB Atlas**  
✔ Frontend con **React + Vite**  
✔ Estilos modernos  
✔ Axios para peticiones  
✔ Código modular  
✔ Despliegue real (Render + Vercel)

---

# 🧱 Arquitectura del Proyecto

```
todo-fullstack-fastapi-mongo/
│
├── backend/
│   ├── app.py
│   ├── database.py
│   ├── models.py
│   ├── routes.py
│   ├── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── TodoForm.jsx
│   │   │   ├── TodoList.jsx
│   │   │   └── TodoItem.jsx
│
└── README.md
```

---

# 🚀 Tecnologías empleadas

### 🔹 Backend
- FastAPI  
- Uvicorn  
- Motor (MongoDB async)  
- Pydantic  

### 🔹 Base de datos
- MongoDB Atlas  
- Colección: `todos`

### 🔹 Frontend
- React  
- Vite  
- Axios  
- Hooks  
- CSS / Tailwind opcional

### 🔹 Despliegue
- Render (Backend)  
- Vercel (Frontend)  

---

# ⚙️ Instalación y ejecución en local

## 🖥️ Backend – FastAPI

### 1️⃣ Entrar al backend
```sh
cd backend
```

### 2️⃣ Crear entorno virtual
```sh
python -m venv venv
```

### 3️⃣ Activarlo
Windows:
```sh
venv\Scriptsctivate
```

Linux/Mac:
```sh
source venv/bin/activate
```

### 4️⃣ Instalar dependencias
```sh
pip install -r requirements.txt
```

### 5️⃣ Crear archivo `.env`
```
MONGO_URL=mongodb+srv://<usuario>:<pass>@cluster.mongodb.net/
```

### 6️⃣ Ejecutar el servidor
```sh
uvicorn app:app --reload --port 3000
```

### 7️⃣ Documentación automática
Swagger:
```
http://localhost:3000/docs
```

ReDoc:
```
http://localhost:3000/redoc
```

---

# 📚 Documentación de la API

## 🟩 GET /
Verifica el estado del servidor.

**Respuesta:**
```json
{ "message": "Backend Todo List funcionando con MongoDB Atlas" }
```

---

## 🟩 GET /todos
Obtiene todas las tareas.

---

## 🟨 POST /todos
Crea una nueva tarea.

**Body:**
```json
{
  "title": "Estudiar",
  "completed": false
}
```

---

## 🟦 PUT /todos/{id}
Actualiza una tarea.

**Body:**
```json
{
  "title": "Tarea actualizada",
  "completed": true
}
```

---

## 🟥 DELETE /todos/{id}
Elimina una tarea.

---

# 🌐 Frontend – React + Vite

## 1️⃣ Entrar al frontend
```sh
cd frontend
```

## 2️⃣ Instalar dependencias
```sh
npm install
```

## 3️⃣ Crear archivo `.env`
```
VITE_API_URL=http://localhost:3000
```

## 4️⃣ Ejecutar la app
```sh
npm run dev
```

App:
```
http://localhost:5173
```

---

# 🧱 Estructura del Frontend

### 📌 `TodoForm.jsx`
Formulario para crear tareas.

### 📌 `TodoList.jsx`
Lista todas las tareas desde la API.

### 📌 `TodoItem.jsx`
Permite:
- editar
- eliminar
- marcar como completada

### 📌 `App.jsx`
Controla el estado principal.

---

# 🛰️ Despliegue

## 🔵 Backend — Render

**Configuración:**
```
Runtime: Python
Build Command: pip install -r requirements.txt
Start Command: uvicorn app:app --host 0.0.0.0 --port $PORT
```

**Variables de entorno:**
```
MONGO_URL=...
```

---

## 🔵 Frontend — Vercel

**Configuración:**

Root:
```
frontend
```

Build:
```
npm run build
```

Output:
```
dist
```

Environment:
```
VITE_API_URL=https://<backend>.onrender.com
```

---

# 🧪 Pruebas del Sistema

✔ CRUD completo probado  
✔ CORS funcionando  
✔ Respuestas JSON  
✔ Validación de errores  
✔ Prueba total en online + local  

---

# 🔒 Seguridad aplicada

- Variables ocultas con `.env`
- MongoDB Atlas protegido
- CORS configurado
- Código separado por capas

---

# 📈 Mejoras futuras

- Login & JWT  
- Prioridad de tareas  
- Filtros  
- Dark mode  
- Docker  

---

# 👨‍💻 Autor

**Zack Sandon** y **Nicolas Sanchez**  
📍 Colombia  
GitHub: https://github.com/Zacksandon  

---


