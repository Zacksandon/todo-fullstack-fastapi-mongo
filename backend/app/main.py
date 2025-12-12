from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Todo List Fullstack - MongoDB Atlas")

# Lista de dominios permitidos (tu frontend)
origins = [
    "https://todo-fullstack-fastapi-mongo.vercel.app",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,         # NO usar "*"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_URI = os.getenv("MONGO_URI")
client = AsyncIOMotorClient(MONGO_URI)
db = client.todoapp
collection = db.todos

from app.routers import todos
app.include_router(todos.router, prefix="/api")  # <-- IMPORTANTE

@app.get("/")
def home():
    return {"message": "Backend Todo List funcionando con MongoDB Atlas"}
