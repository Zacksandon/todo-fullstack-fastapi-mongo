from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from config.settings import settings

# Inicializar app
app = FastAPI(title="Todo List Fullstack - FastAPI + MongoDB")

# CORS (DEBE IR ARRIBA)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],         # Puedes limitar solo tu dominio si quieres
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conexión a MongoDB
client = AsyncIOMotorClient(settings.DATABASE_URL)
db = client.todoapp
collection = db.todos

# Importar routers
from app.routers import todos
app.include_router(todos.router)

@app.get("/")
def home():
    return {"message": "Backend Todo List funcionando con MongoDB Atlas 🚀"}
