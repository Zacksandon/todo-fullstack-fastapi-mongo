from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.todos import router as todos_router

app = FastAPI(
    title="Todo API",
    version="1.0.0"
)

# CORS (necesario para frontend en Vercel)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # luego puedes cambiarlo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ruta raíz (OBLIGATORIA para Railway)
@app.get("/")
def root():
    return {
        "status": "ok",
        "message": "API Todo funcionando correctamente 🚀"
    }

# Rutas del módulo todos
app.include_router(
    todos_router,
    prefix="/api",
    tags=["Todos"]
)
