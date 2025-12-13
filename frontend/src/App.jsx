import { useState, useEffect } from "react"
import axios from "axios"

const API_URL = "https://todo-fullstack-fastapi-mongo.onrender.com/api/todos";

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")

  /* =========================
     OBTENER TODAS LAS TAREAS
     ========================= */
  const fetchTodos = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_URL}/api/todos/`)
      setTodos(res.data)
      setError("")
    } catch (err) {
      console.error(err)
      setError("No se pudo conectar al backend")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  /* =========================
     CREAR TAREA
     ========================= */
  const addTodo = async (e) => {
    e.preventDefault()

    if (!title.trim()) {
      setError("El título es obligatorio")
      return
    }

    try {
      await axios.post(`${API_URL}/api/todos/`, {
        title: title.trim(),
        description: description.trim() || null,
        status: "pendiente",
      })

      setTitle("")
      setDescription("")
      setError("")
      fetchTodos()
    } catch (err) {
      console.error(err)
      setError("Error al crear la tarea")
    }
  }

  /* =========================
     CAMBIAR ESTADO
     ========================= */
  const toggleComplete = async (todo) => {
    try {
      await axios.put(`${API_URL}/api/todos/${todo.id}`, {
        status: todo.status === "pendiente" ? "completada" : "pendiente",
      })
      fetchTodos()
    } catch (err) {
      console.error(err)
      setError("Error al actualizar estado")
    }
  }

  /* =========================
     EDITAR
     ========================= */
  const startEdit = (todo) => {
    setEditingId(todo.id)
    setEditTitle(todo.title)
    setEditDescription(todo.description || "")
  }

  const saveEdit = async () => {
    if (!editTitle.trim()) {
      setError("El título no puede estar vacío")
      return
    }

    try {
      await axios.put(`${API_URL}/api/todos/${editingId}`, {
        title: editTitle.trim(),
        description: editDescription.trim() || null,
      })

      setEditingId(null)
      setEditTitle("")
      setEditDescription("")
      fetchTodos()
    } catch (err) {
      console.error(err)
      setError("Error al guardar cambios")
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditTitle("")
    setEditDescription("")
  }

  /* =========================
     ELIMINAR
     ========================= */
  const deleteTodo = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar esta tarea?")) return

    try {
      await axios.delete(`${API_URL}/api/todos/${id}`)
      fetchTodos()
    } catch (err) {
      console.error(err)
      setError("Error al eliminar")
    }
  }

  /* =========================
     UI
     ========================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-10">
          Mis Tareas
        </h1>

        <form onSubmit={addTodo} className="bg-white rounded-2xl shadow-xl p-8 mb-10">
          <input
            type="text"
            placeholder="Título de la tarea *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-6 py-4 text-lg border rounded-xl mb-4"
            required
          />

          <textarea
            placeholder="Descripción (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-6 py-4 text-lg border rounded-xl mb-6"
            rows="3"
          />

          <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl">
            + Agregar Tarea
          </button>
        </form>

        {error && (
          <div className="bg-red-100 text-red-700 px-6 py-4 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        {loading && <p className="text-center">Cargando tareas...</p>}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {todos.map((todo) => (
            <div key={todo.id} className="bg-white rounded-2xl shadow p-6">
              {editingId === todo.id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full mb-2 border p-2 rounded"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full mb-4 border p-2 rounded"
                  />
                  <div className="flex gap-2">
                    <button onClick={saveEdit} className="bg-green-600 text-white px-4 py-2 rounded">
                      Guardar
                    </button>
                    <button onClick={cancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded">
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className={`text-xl font-bold mb-2 ${todo.status === "completada" && "line-through text-gray-500"}`}>
                    {todo.title}
                  </h3>

                  {todo.description && <p className="mb-3">{todo.description}</p>}

                  <div className="flex justify-between">
                    <button onClick={() => toggleComplete(todo)}>
                      {todo.status === "pendiente" ? "○" : "✓"}
                    </button>
                    <div>
                      <button onClick={() => startEdit(todo)} className="mr-4 text-blue-600">
                        Editar
                      </button>
                      <button onClick={() => deleteTodo(todo.id)} className="text-red-600">
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
    </div>
  )
}

export default App
