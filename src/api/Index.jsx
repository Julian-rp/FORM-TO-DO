import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4001",
});

const STORAGE_KEY = "team-todo-tasks";

// Funciones para localStorage
const getTasksFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveTasksToStorage = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error guardando en localStorage:", error);
  }
};

// Obtener todas las tareas
export const getTasks = async () => {
  try {
    const response = await api.get("/tasks");
    // Sincronizar con localStorage cuando el servidor está disponible
    saveTasksToStorage(response.data);
    return response.data;
  } catch {
    // Si el servidor no está disponible, usar localStorage
    return getTasksFromStorage();
  }
};

// Crear nueva tarea
export const createTask = async (task) => {
  try {
    const response = await api.post("/tasks", task);
    // Sincronizar: obtener todas las tareas del servidor y guardar en localStorage
    const allTasks = await api.get("/tasks").then((r) => r.data);
    saveTasksToStorage(allTasks);
    return response.data;
  } catch {
    // Si el servidor no está disponible, usar localStorage
    const tasks = getTasksFromStorage();
    const newTask = {
      ...task,
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
    };
    tasks.push(newTask);
    saveTasksToStorage(tasks);
    return newTask;
  }
};

// Actualizar tarea (PUT para reemplazarla completa)
export const updateTask = async (id, updatedTask) => {
  try {
    const response = await api.put(`/tasks/${id}`, updatedTask);
    // Sincronizar: obtener todas las tareas del servidor y guardar en localStorage
    const allTasks = await api.get("/tasks").then((r) => r.data);
    saveTasksToStorage(allTasks);
    return response.data;
  } catch {
    // Si el servidor no está disponible, usar localStorage
    const tasks = getTasksFromStorage();
    const index = tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      saveTasksToStorage(tasks);
      return updatedTask;
    }
    throw new Error("Tarea no encontrada");
  }
};

// Eliminar tarea
export const deleteTask = async (id) => {
  try {
    await api.delete(`/tasks/${id}`);
    // Sincronizar: obtener todas las tareas del servidor y guardar en localStorage
    const allTasks = await api.get("/tasks").then((r) => r.data);
    saveTasksToStorage(allTasks);
  } catch {
    // Si el servidor no está disponible, usar localStorage
    const tasks = getTasksFromStorage();
    const filtered = tasks.filter((t) => t.id !== id);
    saveTasksToStorage(filtered);
  }
};

// ========== FUNCIONES PARA USUARIOS ==========

const USERS_STORAGE_KEY = "team-todo-users";

// Funciones para localStorage de usuarios
const getUsersFromStorage = () => {
  try {
    // Primero intentar la nueva clave
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    
    // Si no existe, intentar la clave antigua para compatibilidad
    const oldStored = localStorage.getItem("users_db");
    if (oldStored) {
      const oldUsers = JSON.parse(oldStored);
      // Migrar a la nueva clave
      saveUsersToStorage(oldUsers);
      return oldUsers;
    }
    
    return [];
  } catch {
    return [];
  }
};

const saveUsersToStorage = (users) => {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Error guardando usuarios en localStorage:", error);
  }
};

// Obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    // Sincronizar con localStorage cuando el servidor está disponible
    saveUsersToStorage(response.data);
    return response.data;
  } catch {
    // Si el servidor no está disponible, usar localStorage
    return getUsersFromStorage();
  }
};

// Crear nuevo usuario
export const createUser = async (user) => {
  try {
    const response = await api.post("/users", user);
    // Sincronizar: obtener todos los usuarios del servidor y guardar en localStorage
    const allUsers = await api.get("/users").then((r) => r.data);
    saveUsersToStorage(allUsers);
    return response.data;
  } catch (error) {
    console.error("Error creando usuario en servidor:", error);
    // Si el servidor no está disponible, usar localStorage
    const users = getUsersFromStorage();
    const newUser = {
      ...user,
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
    };
    users.push(newUser);
    saveUsersToStorage(users);
    return newUser;
  }
};

// Buscar usuario por nombre
export const findUserByName = async (name) => {
  try {
    const cleanName = name.trim();
    console.log("Buscando usuario:", cleanName);
    
    // Primero buscar en el servidor
    const serverUsers = await getUsers();
    console.log("Usuarios en servidor:", serverUsers);
    const found = serverUsers.find((u) => u.name && u.name.trim() === cleanName);
    if (found) {
      console.log("Usuario encontrado en servidor:", found);
      return found;
    }
    
    // Si no se encuentra en el servidor, buscar en localStorage
    const localUsers = getUsersFromStorage();
    console.log("Usuarios en localStorage:", localUsers);
    const localFound = localUsers.find((u) => u.name && u.name.trim() === cleanName);
    
    if (localFound) {
      console.log("Usuario encontrado en localStorage:", localFound);
    } else {
      console.log("Usuario NO encontrado en ninguna ubicación");
    }
    
    return localFound || null;
  } catch (error) {
    console.error("Error buscando usuario:", error);
    // En caso de error, buscar solo en localStorage
    const users = getUsersFromStorage();
    const cleanName = name.trim();
    return users.find((u) => u.name && u.name.trim() === cleanName) || null;
  }
};
