from fastapi import APIRouter, HTTPException
from app.main import collection
from app.models.todo import Todo, TodoCreate, TodoUpdate
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/api/todos", tags=["todos"])


@router.get("", response_model=list[Todo])
async def get_todos():
    todos = []
    async for doc in collection.find():
        doc["id"] = str(doc["_id"])
        doc.pop("_id")  # 🔥 CLAVE
        doc["created_at"] = doc.get("created_at", datetime.utcnow())
        todos.append(doc)  # 👈 NO crear modelo aquí
    return todos


@router.post("", response_model=Todo, status_code=201)
async def create_todo(todo: TodoCreate):
    if not todo.title.strip():
        raise HTTPException(400, "El título es obligatorio")

    new_todo = todo.dict()
    new_todo["created_at"] = datetime.utcnow()

    result = await collection.insert_one(new_todo)
    created = await collection.find_one({"_id": result.inserted_id})

    created["id"] = str(created["_id"])
    created.pop("_id")

    return created


@router.put("/{todo_id}", response_model=Todo)
async def update_todo(todo_id: str, todo_update: TodoUpdate):
    if not ObjectId.is_valid(todo_id):
        raise HTTPException(404, "ID inválido")

    update_data = todo_update.dict(exclude_unset=True)

    await collection.update_one(
        {"_id": ObjectId(todo_id)},
        {"$set": update_data}
    )

    updated = await collection.find_one({"_id": ObjectId(todo_id)})

    if not updated:
        raise HTTPException(404, "No encontrado")

    updated["id"] = str(updated["_id"])
    updated.pop("_id")

    return updated


@router.delete("/{todo_id}", status_code=204)
async def delete_todo(todo_id: str):
    if not ObjectId.is_valid(todo_id):
        raise HTTPException(404)

    result = await collection.delete_one({"_id": ObjectId(todo_id)})

    if result.deleted_count == 0:
        raise HTTPException(404)

    return None
