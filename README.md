Todo List Fullstack — FastAPI + React + MongoDB

Proyecto Fullstack moderno con CRUD completo, despliegue en producción y arquitectura profesional.

📘 1. Descripción General del Proyecto

Este proyecto es una aplicación Fullstack para gestionar tareas con un CRUD completo.
Incluye:

Frontend: React + Vite + TailwindCSS

Backend: FastAPI (Python)

Base de Datos: MongoDB Atlas

Despliegue:

Frontend: Vercel

Backend: Render

✔ Funcionalidades principales

Crear tareas

Listarlas en tarjetas

Editar (inline editing)

Cambiar estado pendiente/completada

Eliminar con confirmación

Ver fecha de creación

Conexión real a MongoDB Atlas

UI moderna y responsiva

🏗️ 2. Arquitectura del Proyecto

Usuario
   │
   ▼
Frontend (React + Vite + Tailwind) — Vercel
   │   Axios / Fetch
   ▼
Backend (FastAPI — Render)
   │   Async Motor
   ▼
Base de Datos (MongoDB Atlas)

🔵 Frontend (React)

React + Vite

Axios

Hooks (useState, useEffect)

TailwindCSS

Componentes limpios y responsivos

🟣 Backend (FastAPI)

Motor (async MongoDB driver)

Pydantic para validación

CORS habilitado

API RESTful profesional

🟢 MongoDB Atlas

Colección: todos

{
  "_id": "ObjectId",
  "title": "string",
  "description": "string | null",
  "status": "pendiente | completada",
  "created_at": "ISODate"
}
⚙️ 3. Instalación y Ejecución en Local
🔧 Backend (FastAPI)

1. Ir al backend

cd backend

Instalar dependencias

pip install -r requirements.txt


Crear archivo .env

MONGO_URI=mongodb+srv://...


Ejecutar servidor

uvicorn app.main:app --reload


📌 Documentación automática (Swagger):
➡ http://127.0.0.1:8000/docs

💻 Frontend (React)

Ir al frontend

cd frontend


Instalar dependencias

npm install


Crear .env

VITE_API_URL=http://127.0.0.1:8000


Ejecutar

npm run dev


Frontend local:
➡ http://127.0.0.1:5173

📂 4. Estructura del Repositorio

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
│   └── .env 
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── vite.config.js
│
└── README.md


📡 5. Documentación de la API (Backend)
🔗 Base URL (producción Render)

https://todo-fullstack-fastapi-mongo.onrender.com/

🟦 GET /api/todos

Obtiene todas las tareas.

Respuesta ejemplo:
[
  {
    "id": "676e8d...",
    "title": "Comprar leche",
    "description": "urgente",
    "status": "pendiente",
    "created_at": "2024-12-10T18:20:11.000Z"
  }
]

🟩 POST /api/todos

Crea una nueva tarea.

Body ejemplo:
{
  "title": "Mi tarea",
  "description": "Opcional",
  "status": "pendiente"
}
🟨 PUT /api/todos/{id}

Actualiza título, descripción o estado.

Body ejemplo:
{
  "title": "Título editado",
  "description": "Nueva descripción"
}
🟥 DELETE /api/todos/{id}

Elimina una tarea.
Status: 204 No Content

🛠️ 6. Documentación Técnica del Backend
📌 app/main.py

Configura FastAPI

CORS

Conexión a MongoDB

Routers

📌 routers/todos.py — CRUD completo

Asíncrono (async/await)

Validación de títulos vacíos

Conversión de _id a id (string)

created_at automático

📌 models/todo.py — Modelos Pydantic

TodoCreate → POST

TodoUpdate → PUT

Todo → respuesta

Manejo de opcionales

🎨 7. Documentación Técnica del Frontend
📌 Peticiones HTTP

Obtener tareas
axios.get(`${API_URL}/api/todos`)
Crear

axios.post(`${API_URL}/api/todos`, { title, description })


Editar

axios.put(`${API_URL}/api/todos/${id}`, { title, description })


Cambiar estado

axios.put(`${API_URL}/api/todos/${todo.id}`, {
  status: todo.status === "pendiente" ? "completada" : "pendiente"
})


Eliminar

axios.delete(`${API_URL}/api/todos/${id}`)

💻 8. Funcionalidades del Frontend

✔ UI moderna y responsiva
✔ Tarjetas con sombras y animaciones
✔ Edición en línea
✔ Confirmación al eliminar
✔ Alertas de error
✔ Indicadores de carga
✔ Cambios de estado con un click
✔ Diseño profesional

🚀 9. Despliegue
🔵 Backend — Render

Runtime: Python 3.11

Build:

pip install -r requirements.txt


Start:

uvicorn app.main:app --host 0.0.0.0 --port $PORT


Env:

MONGO_URI=mongodb+srv://...

🟣 Frontend — Vercel

Root: /frontend

Build: npm run build

Output: dist

Env:

VITE_API_URL=https://todo-fullstack-fastapi-mongo.onrender.com/

📝 10. Conclusiones

Este proyecto implementa tecnologías modernas y despliegue real:

✔ UI profesional

✔ Backend asincrónico

✔ Base de datos en la nube

✔ CRUD completo

✔ Arquitectura escalable

✔ Proyecto listo para entregar como evidencia final

👨‍💻 Autores

Nicolás Sanchez

Zack Sandon