from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.todos import router as todos_router

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# RUTAS
app.include_router(todos_router)

@app.get("/")
def root():
    return {"message": "API Todo funcionando correctamente"}
