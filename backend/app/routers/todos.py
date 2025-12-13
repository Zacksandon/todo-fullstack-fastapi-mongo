from fastapi import APIRouter, HTTPException
from bson import ObjectId
from datetime import datetime
from app.main import collection

router = APIRouter(prefix="/api/todos", tags=["todos"])


@router.get("/")
async def get_todos():
    todos = []
    async for doc in collection.find():
        doc["id"] = str(doc["_id"])
        doc["created_at"] = doc.get("created_at", datetime.utcnow())
        todos.append(doc)
    return todos


@router.get("")
async def get_todos_no_slash():
    return await get_todos()


@router.post("/")
async def create_todo(todo: dict):
    todo["created_at"] = datetime.utcnow()
    result = await collection.insert_one(todo)
    todo["id"] = str(result.inserted_id)
    return todo


@router.put("/{todo_id}")
async def update_todo(todo_id: str, todo: dict):
    if not ObjectId.is_valid(todo_id):
        raise HTTPException(404)

    await collection.update_one(
        {"_id": ObjectId(todo_id)},
        {"$set": todo}
    )
    return {"ok": True}


@router.delete("/{todo_id}")
async def delete_todo(todo_id: str):
    if not ObjectId.is_valid(todo_id):
        raise HTTPException(404)

    await collection.delete_one({"_id": ObjectId(todo_id)})
    return {"ok": True}
