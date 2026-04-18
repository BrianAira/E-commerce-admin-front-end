// Lo que enviamos al backend
export interface LoginPayload {
    username: string; // El email del usuario
    password: string;
}

// La respuesta del login (Estándar OAuth2 de FastAPI)
export interface AuthResponse {
    access_token: string;
    token_type: string;
}

// La respuesta de /users/me
export interface UserMeResponse {
    id: number;
    username: string;
    email: string;
    role: 'admin' // Definimos los roles literales
    // directions: any[]; // Puedes tipar esto más adelante si lo usas
}

// El estado completo que guardaremos en Redux
export interface AuthState {
    user: UserMeResponse | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading:boolean;
    error:string|null;
}