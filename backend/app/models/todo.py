from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TodoCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: str = "pendiente"

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None

class Todo(TodoCreate):
    id: str
    created_at: datetime