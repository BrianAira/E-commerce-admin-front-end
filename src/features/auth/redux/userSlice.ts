import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, UserMeResponse } from "../types/Auth";

export type UserRole="admin"|"customer"|null;

// Función auxiliar para persistencia limpia
const getSafeStorage = <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
        return JSON.parse(item) as T;
    } catch {
        return null;
    }
};

const initialState: AuthState = {
    user: getSafeStorage<UserMeResponse>("user"),
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
    isLoading: false,
    error: null,
};

// 

export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        authStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        // Login exitoso: Guardamos todo
        loginSuccess: (state, action: PayloadAction<{ user: UserMeResponse; token: string }>) => {
            const { user, token } = action.payload;
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = user;
            state.token = token;
            state.error = null;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
        },
        // Error en login o perfil
        authFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // Logout total
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;

            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
        // Útil para cuando el admin edita su propio perfil
        updateUser: (state, action: PayloadAction<Partial<UserMeResponse>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
                localStorage.setItem("user", JSON.stringify(state.user));
            }
        }
    },
});

export const { authStart, loginSuccess, authFailure, logout, updateUser } = authSlice.actions;
export default authSlice.reducer