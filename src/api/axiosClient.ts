import axios from "axios";
import { logout } from "../features/auth/redux/userSlice";
import { store } from "../store/store";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const api = axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "ngrok-skip-browser-warning": "true", // Crucial para tu entorno ngrok
    },
});

api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        
  if (token && !config.url?.includes("/users/login")) {
    config.headers.Authorization = `Bearer ${token}`;
  }
        return config;
    },
    (error) => Promise.reject(error)
);

// 3. Interceptor de Respuestas (Manejo de Resiliencia)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        // Caso A: El servidor rechaza el token (Sesión expirada)
        if (status === 401) {
            console.error("No autorizado: Cerrando sesión...");
            store.dispatch(logout());
            
        }

        if (!error.response) {
            return Promise.reject({
                message: "No se pudo conectar con el servidor. Revisa tu conexión.",
                status: 0
            });
        }

       
        const customError = {
            message: error.response?.data?.detail || "Ocurrió un error inesperado",
            status: status,
            data: error.response?.data
        };

        return Promise.reject(customError);
    }
);