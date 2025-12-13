from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import todos

app = FastAPI(title="Todo List Fullstack - MongoDB Atlas")

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

app.include_router(todos.router)

@app.get("/")
def home():
    return {"message": "Backend Todo List funcionando con MongoDB Atlas"}
