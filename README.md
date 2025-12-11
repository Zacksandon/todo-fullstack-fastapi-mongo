📘 Todo Fullstack FastAPI + MongoDB + React (Vite)

Proyecto fullstack con:

Frontend: React + Vite → Vercel

Backend: FastAPI → Render

Base de Datos: MongoDB Atlas

🚀 Despliegues
🔵 Frontend

https://tu-frontend.vercel.app

🟣 Backend (API + Swagger)

https://tu-backend.onrender.com

https://tu-backend.onrender.com/docs
 ← Documentación interactiva

📚 Documentación Completa

👉 API.md

👉 ARQUITECTURA.md

👉 Manual de despliegue
 (opcional)

🛠️ Tecnologías
Capa	Tecnología
Frontend	React + Vite + Fetch API
Backend	FastAPI + Pydantic
Base de Datos	MongoDB Atlas
Despliegue	Vercel + Render
📌 Endpoints principales
GET /api/todos

Lista todas las tareas.

POST /api/todos

Crea una tarea.

Body:

{
  "title": "Comprar leche",
  "description": "Urgente",
  "status": "pendiente"
}

PUT /api/todos/{id}

Actualiza una tarea.

DELETE /api/todos/{id}

Elimina una tarea.

⚙️ Cómo ejecutar localmente
🔧 Backend (FastAPI)
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload


API local:

http://localhost:8000/docs

💻 Frontend (React + Vite)
cd frontend
npm install
npm run dev


Frontend local:

http://localhost:5173

🧱 Arquitectura (C4 Nivel 1)
Usuario → Frontend (Vercel) → Backend (Render) → MongoDB Atlas


Componentes:

Frontend
Rutas, componentes, servicios API.

Backend
Rutas REST, controladores, validación.

DB
Colección todos con:
id, title, description, status, created_at

🧪 Pipeline CI

Vercel build automático en cada push.

🎯 Estado del proyecto

✔ Backend funcionando en Render
✔ Frontend funcionando en Vercel
✔ API documentada
✔ Conexión Mongo estable
✔ CRUD completo

✨ Autores

Zack Sandon y Nicolas Sanchez