from fastapi import APIRouter, HTTPException
from datetime import datetime
from bson import ObjectId

from app.database import collection
from app.models.todo import Todo, TodoCreate, TodoUpdate

router = APIRouter(prefix="/api/todos", tags=["Todos"])


def serialize_todo(doc):
    return {
        "id": str(doc["_id"]),
        "title": doc["title"],
        "description": doc.get("description"),
        "status": doc.get("status", "pendiente"),
        "created_at": doc["created_at"],
    }


@router.get("/", response_model=list[Todo])
async def get_todos():
    todos = []
    async for doc in collection.find():
        todos.append(serialize_todo(doc))
    return todos


@router.post("/", response_model=Todo, status_code=201)
async def create_todo(todo: TodoCreate):
    if not todo.title.strip():
        raise HTTPException(status_code=400, detail="El título es obligatorio")

    new_todo = todo.dict()
    new_todo["created_at"] = datetime.utcnow()

    result = await collection.insert_one(new_todo)
    created = await collection.find_one({"_id": result.inserted_id})

    return serialize_todo(created)


@router.put("/{todo_id}", response_model=Todo)
async def update_todo(todo_id: str, todo_update: TodoUpdate):
    if not ObjectId.is_valid(todo_id):
        raise HTTPException(status_code=400, detail="ID inválido")

    data = todo_update.dict(exclude_unset=True)

    await collection.update_one(
        {"_id": ObjectId(todo_id)},
        {"$set": data}
    )

    updated = await collection.find_one({"_id": ObjectId(todo_id)})
    if not updated:
        raise HTTPException(status_code=404, detail="Todo no encontrado")

    return serialize_todo(updated)


@router.delete("/{todo_id}", status_code=204)
async def delete_todo(todo_id: str):
    if not ObjectId.is_valid(todo_id):
        raise HTTPException(status_code=400, detail="ID inválido")

    result = await collection.delete_one({"_id": ObjectId(todo_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Todo no encontrado")
