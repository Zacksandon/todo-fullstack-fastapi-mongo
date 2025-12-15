from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os

from app.routers.todos import router as todos_router

app = FastAPI()

# =========================
# CORS (OBLIGATORIO)
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # <- PARA PRESENTAR, luego se puede restringir
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# MONGODB
# =========================
MONGO_URI = os.getenv("MONGO_URI")

client = AsyncIOMotorClient(MONGO_URI)
db = client.todoapp
collection = db.todos

# =========================
# RUTAS
# =========================
app.include_router(todos_router)

# =========================
# ROOT (IMPORTANTE)
# =========================
@app.get("/")
def root():
    return {"status": "API Todo funcionando correctamente"}

