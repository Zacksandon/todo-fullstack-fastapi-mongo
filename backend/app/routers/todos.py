from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime
from bson import ObjectId
from config.db import collection

router = APIRouter(prefix="/api/todos", tags=["todos"])


class Todo(BaseModel):
    id: str | None = None
    title: str
    description: str | None = None
    status: str = "pendiente"
    created_at: datetime | None = None


# ------------------------
# GET TODOS (con slash)
# ------------------------
@router.get("/", response_model=list[Todo])
async def get_todos():
    todos = []
    async for doc in collection.find():
        doc["id"] = str(doc["_id"])
        doc["created_at"] = doc.get("created_at", datetime.utcnow())
        todos.append(Todo(**doc))

    return todos


# ------------------------
# GET SIN SLASH (FIX CORS)
# ------------------------
@router.get("", response_model=list[Todo])
async def get_todos_no_slash():
    return await get_todos()


# ------------------------
# CREATE
# ------------------------
@router.post("/", response_model=Todo)
async def create_todo(todo: Todo):
    todo.created_at = datetime.utcnow()
    result = await collection.insert_one(todo.dict(exclude={"id"}))
    todo.id = str(result.inserted_id)
    return todo


# ------------------------
# UPDATE
# ------------------------
@router.put("/{todo_id}")
async def update_todo(todo_id: str, todo: Todo):
    update_data = {k: v for k, v in todo.dict().items() if v is not None}

    result = await collection.update_one(
        {"_id": ObjectId(todo_id)}, {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")

    return {"message": "Tarea actualizada"}


# ------------------------
# DELETE
# ------------------------
@router.delete("/{todo_id}")
async def delete_todo(todo_id: str):
    result = await collection.delete_one({"_id": ObjectId(todo_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")

    return {"message": "Tarea eliminada"}
