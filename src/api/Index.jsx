import axios from "axios";

// Usar variable de entorno o fallback a localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Obtener todas las tareas
export const getTasks = () => api.get("/tasks").then((r) => r.data);

// Crear nueva tarea
export const createTask = (task) => api.post("/tasks", task).then((r) => r.data);

// Actualizar tarea (PUT para reemplazarla completa)
export const updateTask = (id, updatedTask) =>
  api.put(`/tasks/${id}`, updatedTask).then((r) => r.data);

// Eliminar tarea
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

// Autenticación
// Registrar nuevo usuario
export const register = (name, password) =>
  api.post("/auth/register", { name, password }).then((r) => r.data);

// Iniciar sesión
export const login = (name, password) =>
  api.post("/auth/login", { name, password }).then((r) => r.data);
