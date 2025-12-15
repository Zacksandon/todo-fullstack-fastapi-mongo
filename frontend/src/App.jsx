import { useEffect, useState } from "react";
import axios from "axios";

// 🔥 URL directa del backend en Railway
const API_URL = "https://todo-fullstack-fastapi-mongo-production.up.railway.app";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // 🔹 OBTENER TAREAS
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/todos/`);
      setTodos(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el backend");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 🔹 CREAR TAREA
  const addTodo = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("El título es obligatorio");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/todos/`, {
        title: title.trim(),
        description: description.trim() || null,
        status: "pendiente",
      });

      setTitle("");
      setDescription("");
      fetchTodos();
    } catch {
      setError("Error al crear la tarea");
    }
  };

  // 🔹 CAMBIAR ESTADO
  const toggleStatus = async (todo) => {
    try {
      await axios.put(`${API_URL}/api/todos/${todo.id}`, {
        status: todo.status === "pendiente" ? "completada" : "pendiente",
      });
      fetchTodos();
    } catch {
      setError("Error al actualizar el estado");
    }
  };

  // 🔹 INICIAR EDICIÓN
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
  };

  // 🔹 GUARDAR EDICIÓN
  const saveEdit = async () => {
    if (!editTitle.trim()) {
      setError("El título no puede estar vacío");
      return;
    }

    try {
      await axios.put(`${API_URL}/api/todos/${editingId}`, {
        title: editTitle.trim(),
        description: editDescription.trim() || null,
      });
      setEditingId(null);
      fetchTodos();
    } catch {
      setError("Error al guardar cambios");
    }
  };

  // 🔹 ELIMINAR TAREA
  const deleteTodo = async (id) => {
    if (!confirm("¿Eliminar esta tarea?")) return;

    try {
      await axios.delete(`${API_URL}/api/todos/${id}`);
      fetchTodos();
    } catch {
      setError("Error al eliminar la tarea");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">
          Todo List Fullstack
        </h1>

        {/* FORMULARIO */}
        <form onSubmit={addTodo} className="bg-white p-6 rounded shadow mb-6">
          <input
            type="text"
            placeholder="Título *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />
          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Agregar tarea
          </button>
        </form>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-center">
            {error}
          </div>
        )}

        {/* LOADING */}
        {loading && <p className="text-center">Cargando...</p>}

        {/* LISTA DE TAREAS */}
        {todos.map((todo) => (
          <div key={todo.id} className="bg-white p-4 rounded shadow mb-3">
            {editingId === todo.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2 border mb-2"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full p-2 border mb-2"
                />
                <button
                  onClick={saveEdit}
                  className="bg-green-600 text-white px-3 py-1 mr-2 rounded"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <h3
                  className={`text-xl font-bold ${
                    todo.status === "completada"
                      ? "line-through text-gray-500"
                      : ""
                  }`}
                >
                  {todo.title}
                </h3>
                {todo.description && (
                  <p className="text-gray-600">{todo.description}</p>
                )}

                <div className="mt-3 flex justify-between">
                  <button
                    onClick={() => toggleStatus(todo)}
                    className="text-blue-600"
                  >
                    {todo.status === "pendiente" ? "Completar" : "Reabrir"}
                  </button>

                  <div>
                    <button
                      onClick={() => startEdit(todo)}
                      className="text-yellow-600 mr-3"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

