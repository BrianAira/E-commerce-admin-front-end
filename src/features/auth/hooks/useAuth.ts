import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { RootState } from "../../../store/store";
// import { authService } from "../services/authService";
// import { loginSuccess, logout, authStart, authFailure } from "../userSlice";
import type { RootState } from "../../../store/store";
import type { LoginPayload } from "../types/Auth";
import { authService } from "../api/authService";
import { authFailure, authStart, loginSuccess, logout } from "../redux/userSlice";
import { api } from "../../../api/axiosClient";
// import { LoginPayload } from "../types/auth.types";
export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isLoading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const login = useMutation({
    mutationFn: async (credentials: LoginPayload) => {
      // Usamos tus reducers exactos
      dispatch(authStart());
      
      try {
        // 1. Obtener token (OAuth2 format)
        const authData = await authService.login(credentials);
        
        // 2. Sincronización manual inmediata para evitar el 401 en el siguiente paso
        api.defaults.headers.common["Authorization"] = `Bearer ${authData.access_token}`;

        // 3. Obtener perfil completo
        const userProfile = await authService.getMe();

        // 4. Éxito: El slice se encarga de persistir en localStorage (user y token)
        dispatch(loginSuccess({ 
          token: authData.access_token, 
          user: userProfile 
        }));

        return { userProfile, token: authData.access_token };
      } catch (err: any) {
        const message = err.response?.data?.detail || "Error de credenciales";
        dispatch(authFailure(message));
        throw err;
      }
    }
  });

  const logoutUser = () => {
    // Limpiamos headers de axios y ejecutamos tu logout del slice
    delete api.defaults.headers.common["Authorization"];
    dispatch(logout());
  };

  return {
    user,
    token,
    isLoading: login.isPending || isLoading,
    error,
    isAuthenticated,
    login: (data: LoginPayload) => login.mutateAsync(data),
    logoutUser,
  };
};