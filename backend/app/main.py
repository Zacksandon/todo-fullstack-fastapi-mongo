from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os

app = FastAPI(
    title="Todo List Fullstack - MongoDB Atlas",
    redirect_slashes=False
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://todo-fullstack-fastapi-mongo.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_URI = os.getenv("MONGO_URI")

client = AsyncIOMotorClient(MONGO_URI)
db = client.todoapp
collection = db.todos

from app.routers import todos
app.include_router(todos.router)


@app.get("/")
def home():
    return {"message": "Backend Todo List funcionando con MongoDB Atlas"}
