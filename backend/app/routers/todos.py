from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from bson import ObjectId
from datetime import datetime
from app.main import collection

router = APIRouter(
    prefix="/api/todos",
    tags=["Todos"]
)

class Todo(BaseModel):
    id: str | None = None
    title: str
    description: str | None = None
    status: str = "pendiente"
    created_at: datetime | None = None


# ----------- GET TODOS (SLASH) ----------------
@router.get("/", response_model=list[Todo])
async def get_todos():
    todos = []
    async for t in collection.find():
        t["id"] = str(t["_id"])
        t["created_at"] = t.get("created_at", datetime.utcnow())
        todos.append(Todo(**t))
    return todos


# ----------- GET SIN SLASH (FIX DE REDIRECCIÓN) ------------
@router.get("", response_model=list[Todo])
async def get_todos_no_slash():
    return await get_todos()


# ----------- CREAR -----------------------------------------
@router.post("/", response_model=Todo)
async def create(todo: Todo):
    todo.created_at = datetime.utcnow()
    doc = todo.dict(exclude={"id"})
    result = await collection.insert_one(doc)
    todo.id = str(result.inserted_id)
    return todo


# ----------- ACTUALIZAR -----------------------------------
@router.put("/{todo_id}")
async def update(todo_id: str, todo: Todo):
    update_data = {k: v for k, v in todo.dict().items() if v is not None}

    result = await collection.update_one(
        {"_id": ObjectId(todo_id)}, {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")

    return {"message": "Tarea actualizada"}


# ----------- ELIMINAR --------------------------------------
@router.delete("/{todo_id}")
async def delete(todo_id: str):
    result = await collection.delete_one({"_id": ObjectId(todo_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")

    return {"message": "Tarea eliminada"}
