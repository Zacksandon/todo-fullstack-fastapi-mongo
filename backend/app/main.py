from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from routers.todos import router as todos_router

app = FastAPI()

# CORS – dejarlo arriba SIEMPRE
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # en producción puedes especificar solo tu dominio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar routers
app.include_router(todos_router)

@app.get("/")
def root():
    return {"message": "API funcionando 🚀"}
