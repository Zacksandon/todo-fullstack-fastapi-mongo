📘 Todo List FullStack – FastAPI + React + MongoDB
Este proyecto es una aplicación FullStack completa diseñada para gestionar tareas mediante operaciones CRUD, con una interfaz moderna y un backend asincrónico. Incluye conexión en la nube a MongoDB Atlas, documentación automática de la API, arquitectura limpia y despliegue profesional.

✨ Características principales

✅ CRUD completo (Crear, Leer, Actualizar, Eliminar)
✅ Backend con FastAPI + MongoDB Atlas
✅ Frontend con React + Vite
✅ Peticiones HTTP con Axios
✅ Código modular y bien organizado
✅ Despliegue real en producción (Render + Vercel)
✅ Documentación automática (Swagger / ReDoc)


🧱 Arquitectura del Proyecto
texttodo-fullstack-fastapi-mongo/
│
├── backend/
│   ├── app.py
│   ├── database.py
│   ├── models.py
│   ├── routes.py
│   ├── requirements.txt
│   └── .env (ejemplo)
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
│   │   └── ...
│   └── .env (ejemplo)
│
└── README.md

🚀 Tecnologías empleadas
🔹 Backend

FastAPI
Uvicorn
Motor (driver asíncrono para MongoDB)
Pydantic

🔹 Base de datos

MongoDB Atlas
Colección principal: todos

🔹 Frontend

React 18
Vite
Axios
React Hooks
CSS / TailwindCSS (opcional)

🔹 Despliegue

Render (Backend)
Vercel (Frontend)


⚙️ Instalación y ejecución en local
🖥️ Backend – FastAPI
Bashcd backend

Crear entorno virtualBashpython -m venv venv
Activar entorno
Windows:Bashvenv\Scripts\activate
Linux/Mac:Bashsource venv/bin/activate

Instalar dependenciasBashpip install -r requirements.txt
Crear archivo .envenvMONGO_URL=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
Ejecutar el servidorBashuvicorn app:app --reload --port 3000

📚 Documentación automática de la API

Swagger UI: http://localhost:3000/docs
ReDoc: http://localhost:3000/redoc


🌐 Frontend – React + Vite
Bashcd ../frontend

Instalar dependenciasBashnpm install
Crear archivo .envenvVITE_API_URL=http://localhost:3000
Ejecutar la aplicaciónBashnpm run devAbre tu navegador en: http://localhost:5173


📌 Endpoints de la API

MétodoEndpointDescripciónEjemplo de BodyGET/Verifica el estado del servidor-GET/todosObtiene todas las tareas-POST/todosCrea una nueva tarea{"title": "Estudiar", "completed": false}PUT/todos/{id}Actualiza una tarea{"title": "Tarea actualizada", "completed": true}DELETE/todos/{id}Elimina una tarea-
Respuesta de raíz (GET /):
JSON{
  "message": "Backend Todo List funcionando con MongoDB Atlas"
}

🛰️ Despliegue en producción
🔵 Backend — Render

Runtime: Python
Build Command: pip install -r requirements.txt
Start Command: uvicorn app:app --host 0.0.0.0 --port $PORT
Variables de entorno:envMONGO_URL=tu_url_de_mongodb_atlas

🔵 Frontend — Vercel

Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Variable de entorno:envVITE_API_URL=https://<tu-backend>.onrender.com


🧪 Pruebas del sistema

✅ CRUD completo probado (local y producción)
✅ CORS configurado correctamente
✅ Respuestas en formato JSON
✅ Manejo de errores
✅ Funcionamiento total en entorno online

🔒 Seguridad aplicada

Variables de entorno con .env
Conexión segura a MongoDB Atlas
Configuración de CORS
Separación clara de capas (backend/frontend)


📈 Mejoras futuras

Autenticación con Login + JWT
Prioridades y categorías en tareas
Filtros y búsqueda avanzada
Modo oscuro (Dark Mode)
Contenerización con Docker


👨‍💻 Autores
Zack Sandon y Nicolas Sanchez
📍 Colombia
GitHub: https://github.com/Zacksandon