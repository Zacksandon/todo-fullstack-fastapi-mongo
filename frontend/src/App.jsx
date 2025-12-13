import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://todo-fullstack-fastapi-mongo.onrender.com/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // =========================
  // FETCH TODOS
  // =========================
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setTodos(res.data);
      setError("");
    } catch (err) {
      setError("No se pudo conectar al backend");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // =========================
  // CREATE TODO
  // =========================
  const addTodo = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("El título es obligatorio");
      return;
    }

    try {
      await axios.post(API_URL, {
        title: title.trim(),
        description: description.trim() || null,
        status: "pendiente",
      });

      setTitle("");
      setDescription("");
      fetchTodos();
    } catch (err) {
      setError("Error al crear la tarea");
    }
  };

  // =========================
  // TOGGLE STATUS
  // =========================
  const toggleComplete = async (todo) => {
    try {
      await axios.put(`${API_URL}/${todo.id}`, {
        status: todo.status === "pendiente" ? "completada" : "pendiente",
      });
      fetchTodos();
    } catch {
      setError("Error al actualizar estado");
    }
  };

  // =========================
  // EDIT
  // =========================
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
  };

  const saveEdit = async () => {
    if (!editTitle.trim()) {
      setError("El título no puede estar vacío");
      return;
    }

    try {
      await axios.put(`${API_URL}/${editingId}`, {
        title: editTitle.trim(),
        description: editDescription.trim() || null,
      });

      setEditingId(null);
      setEditTitle("");
      setEditDescription("");
      fetchTodos();
    } catch {
      setError("Error al guardar cambios");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  // =========================
  // DELETE
  // =========================
  const deleteTodo = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar esta tarea?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos();
    } catch {
      setError("Error al eliminar la tarea");
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-10">
          Todo List
        </h1>

        <form
          onSubmit={addTodo}
          className="bg-white rounded-2xl shadow-xl p-8 mb-10"
        >
          <input
            type="text"
            placeholder="Título *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 border rounded-xl mb-4"
            required
          />

          <textarea
            placeholder="Descripción (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 border rounded-xl mb-6"
            rows="3"
          />

          <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700">
            Agregar tarea
          </button>
        </form>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6 text-center font-bold">
            {error}
          </div>
        )}

        {loading && (
          <p className="text-center text-gray-600 text-xl">
            Cargando tareas...
          </p>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`bg-white rounded-xl shadow p-6 ${
                todo.status === "completada" ? "opacity-70" : ""
              }`}
            >
              {editingId === todo.id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <h3
                      className={`text-xl font-bold ${
                        todo.status === "completada"
                          ? "line-through text-gray-500"
                          : ""
                      }`}
                    >
                      {todo.title}
                    </h3>

                    <button
                      onClick={() => toggleComplete(todo)}
                      className="text-2xl"
                    >
                      {todo.status === "completada" ? "✓" : "○"}
                    </button>
                  </div>

                  {todo.description && (
                    <p className="text-gray-600 mb-4">{todo.description}</p>
                  )}

                  <div className="flex justify-between">
                    <button
                      onClick={() => startEdit(todo)}
                      className="text-blue-600 font-bold"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-600 font-bold"
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {todos.length === 0 && !loading && !error && (
          <p className="text-center text-gray-500 mt-20 text-xl">
            No hay tareas aún
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
