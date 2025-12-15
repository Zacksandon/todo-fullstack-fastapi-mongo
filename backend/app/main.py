from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(
    title="Todo List Fullstack - MongoDB Atlas"
)

# 🔥 CORS — ASÍ, SIN CAMBIAR NADA
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://todo-fullstack-fastapi-mongo.vercel.app",
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔗 MongoDB
MONGO_URI = os.getenv("MONGO_URI")
client = AsyncIOMotorClient(MONGO_URI)
db = client.todoapp
collection = db.todos

# 👇 IMPORTAR ROUTERS DESPUÉS DE TODO
from app.routers import todos
app.include_router(todos.router)

@app.get("/")
def home():
    return {"message": "Backend funcionando correctamente"}
