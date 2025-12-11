import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_URL}/api/todos`)
      setTodos(res.data)
      setError('')
    } catch (err) {
      setError('No se pudo conectar al backend. Verifica que esté corriendo.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const addTodo = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('El título es obligatorio')
      return
    }

    try {
      await axios.post(`${API_URL}/api/todos`, {
        title: title.trim(),
        description: description.trim() || null,
        status: "pendiente"
      })
      setTitle('')
      setDescription('')
      setError('')
      fetchTodos()
    } catch (err) {
      setError('Error al crear la tarea')
    }
  }

  const toggleComplete = async (todo) => {
    try {
      await axios.put(`${API_URL}/api/todos/${todo.id}`, {
        status: todo.status === 'pendiente' ? 'completada' : 'pendiente'
      })
      fetchTodos()
    } catch (err) {
      setError('Error al actualizar estado')
    }
  }

  const startEdit = (todo) => {
    setEditingId(todo.id)
    setEditTitle(todo.title)
    setEditDescription(todo.description || '')
  }

  const saveEdit = async () => {
    if (!editTitle.trim()) {
      setError('El título no puede estar vacío')
      return
    }

    try {
      await axios.put(`${API_URL}/api/todos/${editingId}`, {
        title: editTitle.trim(),
        description: editDescription.trim() || null
      })
      setEditingId(null)
      setEditTitle('')
      setEditDescription('')
      fetchTodos()
    } catch (err) {
      setError('Error al guardar cambios')
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditTitle('')
    setEditDescription('')
  }

  const deleteTodo = async (id) => {
    if (!confirm('¿Seguro que quieres eliminar esta tarea?')) return

    try {
      await axios.delete(`${API_URL}/api/todos/${id}`)
      fetchTodos()
    } catch (err) {
      setError('Error al eliminar')
    }
  }

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
            className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 mb-4"
            required
          />
          <textarea
            placeholder="Descripción (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 mb-6"
            rows="3"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition transform hover:scale-105"
          >
            + Agregar Tarea
          </button>
        </form>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl mb-6 text-center font-semibold">
            {error}
          </div>
        )}

        {loading && <p className="text-center text-gray-600 text-xl">Cargando tareas...</p>}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-1 ${
                todo.status === 'completada' ? 'opacity-75' : ''
              }`}
            >
              {editingId === todo.id ? (
                <div>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full p-2 border rounded mb-2 font-bold text-xl"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    rows="3"
                  />
                  <div className="flex gap-2">
                    <button onClick={saveEdit} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                      Guardar
                    </button>
                    <button onClick={cancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={`text-2xl font-bold ${
                      todo.status === 'completada' ? 'line-through text-gray-500' : 'text-gray-800'
                    }`}>
                      {todo.title}
                    </h3>
                    <button onClick={() => toggleComplete(todo)} className="text-3xl">
                      {todo.status === 'completada' ? '✓' : '○'}
                    </button>
                  </div>

                  {todo.description && (
                    <p className="text-gray-600 mb-4">{todo.description}</p>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(todo.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </span>
                    <div>
                      <button
                        onClick={() => startEdit(todo)}
                        className="text-blue-600 hover:text-blue-800 font-bold mr-4"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-600 hover:text-red-800 font-bold"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {todos.length === 0 && !loading && !error && (
          <p className="text-center text-gray-500 text-2xl mt-20">
            ¡No hay tareas aún! Agrega una para empezar
          </p>
        )}
      </div>
    </div>
  )
}

export default App