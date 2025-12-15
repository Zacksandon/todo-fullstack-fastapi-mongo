from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(
    title="Todo List Fullstack - MongoDB Atlas"
)

# ======================
# CORS (OBLIGATORIO)
# ======================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://todo-fullstack-fastapi-mongo.vercel.app",
        "https://todo-fullstack-fastapi-mongo-cffoxhagm-zacks-projects-d7211b18.vercel.app",
        "http://localhost:5173",
        "*"
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ======================
# MongoDB
# ======================
MONGO_URI = os.getenv("MONGO_URI")

client = AsyncIOMotorClient(MONGO_URI)
db = client.todoapp
collection = db.todos

# ======================
# Routers
# ======================
from app.routers import todos
app.include_router(todos.router)

# ======================
# Root
# ======================
@app.get("/")
def root():
    return {"message": "Backend Todo List funcionando con MongoDB Atlas"}
