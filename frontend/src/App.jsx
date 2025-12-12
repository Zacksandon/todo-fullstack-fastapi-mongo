import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const API_URL = "http://127.0.0.1:8000/todos"; // URL del backend

export default function App() {
  const [todos, setTodos] = useState([]);

  // Obtener todos
  const fetchTodos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Error cargando tareas:", error);
    }
  };

  // Crear una tarea
  const addTodo = async (text) => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      fetchTodos();
    } catch (error) {
      console.error("Error creando tarea:", error);
    }
  };

  // Eliminar una tarea
  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      fetchTodos();
    } catch (error) {
      console.error("Error eliminando tarea:", error);
    }
  };

  // Marcar completado / no completado
  const toggleComplete = async (id, completed) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      fetchTodos();
    } catch (error) {
      console.error("Error actualizando tarea:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app-container">
      <h1>Todo List Fullstack</h1>

      <TodoForm addTodo={addTodo} />

      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleComplete={toggleComplete}
      />
    </div>
  );
}
