import { api } from "../../../services/axiosClient";
import type { AuthReponse, LoginPayload, RegisterPayload } from "../types/Auth";

export const authApi = {
  login: async (data: LoginPayload): Promise<AuthReponse> => {
    const response = await api.post<AuthReponse>("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterPayload): Promise<AuthReponse> => {
    const response = await api.post<AuthReponse>("/auth/register", data);
    return response.data;
  },
};
