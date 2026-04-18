import { api } from "../../../api/axiosClient";
import type {  AuthResponse, LoginPayload, UserMeResponse } from "../types/Auth";

export const authService = {
  login: async (data: LoginPayload): Promise<AuthResponse> => {
        const params = new URLSearchParams();
    params.append("username", data.username);
    params.append("password", data.password);
    console.log("Enviando al servidor:", params.toString());
    const response = await api.post("/users/login", params
      ,{
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    
    // return response.data
        // const response = await api.post<AuthResponse>("/users/login", data);
        return response.data;
    },
  getMe: async (): Promise<UserMeResponse> => {
        const response = await api.get<UserMeResponse>("/users/me");
        return response.data;
    }

  // register: async (data: RegisterPayload): Promise<AuthReponse> => {
  //   const response = await api.post<AuthReponse>("/auth/register", data);
  //   return response.data;
  // },
};
