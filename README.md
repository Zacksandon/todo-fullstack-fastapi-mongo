📘 DOCUMENTACIÓN COMPLETA — Todo List Fullstack (FastAPI + React + MongoDB)
# 1. Descripción General del Proyecto

Este proyecto es una aplicación Fullstack que permite gestionar tareas (CRUD completo).
Está dividida en:

Frontend: React + Vite

Backend: FastAPI

Base de Datos: MongoDB Atlas

Despliegue:

Frontend: Vercel

Backend: Render

El sistema permite:

✔ Crear tareas
✔ Listarlas
✔ Editar título y descripción
✔ Completar / marcar como pendiente
✔ Eliminar
✔ Ver fecha de creación
✔ Cargar datos desde MongoDB

# 2. Arquitectura del Proyecto (C4 — Nivel 1)
Usuario
   │
   ▼
Frontend (Vercel - React)
   │  Fetch / Axios
   ▼
Backend (Render - FastAPI)
   │  Motor / Async
   ▼
Base de Datos (MongoDB Atlas)

Componentes
🔵 Frontend (React + Vite)

Hooks: useState, useEffect

Cliente HTTP: axios

TailwindCSS para estilos

Funcionalidades:

Formulario para crear tareas

Vista de tarjetas de tareas

Edición en línea

Confirmación de eliminación

Gestión de estados (pendiente/completada)

🟣 Backend (FastAPI)

Motor (MongoDB Async)

Validación con Pydantic

Rutas RESTful

Manejo de CORS

Modelo asincrónico

🟢 Base de Datos (MongoDB Atlas)

Colección: todos

Documentos:

{
  "_id": ObjectId,
  "title": "string",
  "description": "string | null",
  "status": "pendiente | completada",
  "created_at": ISODate
}

# 3. Instalación y Ejecución Local
🔧 Backend (FastAPI)

Entrar al backend:

cd backend


Instalar dependencias:

pip install -r requirements.txt


Crear archivo .env:

MONGO_URI=mongodb+srv://...


Ejecutar el servidor:

uvicorn app.main:app --reload


API local:

➡ http://127.0.0.1:8000/docs

💻 Frontend (React)

Entrar al frontend:

cd frontend


Instalar dependencias:

npm install


Crear archivo .env:

VITE_API_URL=http://127.0.0.1:8000


Ejecutar el proyecto:

npm run dev


Frontend local:

➡ http://127.0.0.1:5173

# 4. Estructura del Repositorio
/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/
│   │   │   └── todos.py
│   │   ├── models/
│   │   │   └── todo.py
│   │   └── config.py
│   ├── requirements.txt
│   └── .env (ignorado)
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── vite.config.js
│
├── README.md
# 5. Documentación de la API (Backend)

Base URL producción Render:

https://todo-fullstack-fastapi-mongo.onrender.com/

## GET /api/todos

Obtiene todas las tareas.

📌 Respuesta:

[
  {
    "id": "676e8d...",
    "title": "Comprar leche",
    "description": "urgente",
    "status": "pendiente",
    "created_at": "2024-12-10T18:20:11.000Z"
  }
]

## POST /api/todos

Crea una nueva tarea.

📌 Body requerido:

{
  "title": "Mi tarea",
  "description": "Opcional",
  "status": "pendiente"
}


✔ Responde con la tarea creada.

## PUT /api/todos/{id}

Actualiza título, descripción o estado.

📌 Body ejemplo:

{
  "title": "Título editado",
  "description": "Nueva descripción"
}


✔ Devuelve la tarea actualizada.

## DELETE /api/todos/{id}

Elimina una tarea.

✔ Responde status 204.

# 6. Documentación Técnica del Backend
📌 Archivo: app/main.py
Configura:

FastAPI

CORS

Conexión a MongoDB

Enrutadores

📌 Archivo: routers/todos.py

Contiene el CRUD completo.
Trabaja de forma asíncrona usando motor.

Crea documentos:
new_todo["created_at"] = datetime.utcnow()

Convierte el _id:
doc["id"] = str(doc["_id"])

📌 Archivo: models/todo.py

Modelos Pydantic:

TodoCreate → para POST

TodoUpdate → para PUT

Todo → para respuestas

# 7. Documentación Técnica del Frontend
📌 Peticiones HTTP con axios
const res = await axios.get(`${API_URL}/api/todos`);

📌 Crear tarea
await axios.post(`${API_URL}/api/todos`, {
  title,
  description,
  status: "pendiente"
})

📌 Editar
await axios.put(`${API_URL}/api/todos/${id}`, {
  title: editTitle,
  description: editDescription
})

📌 Cambiar estado
await axios.put(`${API_URL}/api/todos/${todo.id}`, {
  status: todo.status === 'pendiente' ? 'completada' : 'pendiente'
})

📌 Eliminar
await axios.delete(`${API_URL}/api/todos/${id}`)

# 8. Funcionalidades del Frontend
✔ Crear tareas
✔ Listar tareas
✔ Editar tareas en línea
✔ Completar con un click
✔ Eliminar con confirmación
✔ Alertas de error
✔ Loading
✔ Vista responsiva
✔ Tarjetas con estilos modernos
# 9. Despliegue
🔵 Backend — Render

Runtime: Python

Build: pip install -r requirements.txt

Start:

uvicorn app.main:app --host 0.0.0.0 --port $PORT


Var:

MONGO_URI = mongodb+srv://...

🔵 Frontend — Vercel

Root: /frontend

Build: npm run build

Output: dist

Env:

VITE_API_URL=https://todo-fullstack-fastapi-mongo.vercel.app/

# 10. Conclusiones

Este proyecto implementa una arquitectura moderna con:

✔ UI profesional
✔ Backend asincrónico
✔ Base de datos en la nube
✔ CRUD completo
✔ Despliegue real en producción

Es totalmente funcional para entregar como:

📌 Proyecto final
📌 Evaluación de programación
📌 Evidencia de desarrollo fullstack

Autores

Nicolas Sanchez y Zack Sandon