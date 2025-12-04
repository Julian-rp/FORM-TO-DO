import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register as registerAPI, login as loginAPI } from "../api/Index";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar usuario guardado al iniciar
    const raw = localStorage.getItem("auth_user");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch (error) {
        console.error("Error cargando usuario:", error);
        localStorage.removeItem("auth_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (name, password) => {
    try {
      setLoading(true);
      
      // Primero intentamos iniciar sesión
      try {
        const userData = await loginAPI(name, password);
        setUser(userData);
        localStorage.setItem("auth_user", JSON.stringify(userData));
        toast.success(`Welcome ${name}`);
        navigate("/");
        return;
      } catch (loginError) {
        // Si el usuario no existe, intentamos registrarlo
        if (loginError.response?.status === 401 || loginError.response?.status === 404) {
          try {
            const userData = await registerAPI(name, password);
            setUser(userData);
            localStorage.setItem("auth_user", JSON.stringify(userData));
            toast.success(`User created: ${name}`);
            navigate("/");
            return;
          } catch (registerError) {
            // Si ya existe, mostramos error de contraseña incorrecta
            if (registerError.response?.status === 409) {
              toast.error("User already exists. Please check your password.");
            } else {
              toast.error(registerError.response?.data?.error || "Error creating user");
            }
            return;
          }
        } else {
          // Error de contraseña incorrecta
          toast.error(loginError.response?.data?.error || "Incorrect password");
          return;
        }
      }
    } catch (error) {
      console.error("Error en autenticación:", error);
      
      // Si el error es de conexión, mostrar mensaje más claro
      if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error') || !error.response) {
        toast.error("No se puede conectar al servidor. Verifica que el backend esté corriendo en http://localhost:3000");
      } else {
        toast.error(error.response?.data?.error || "Error de autenticación");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
    toast.info("Session closed");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
