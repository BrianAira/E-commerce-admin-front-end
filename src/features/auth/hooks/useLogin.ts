import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login } from "../../../shared/store/service/userSlice";
import { authApi } from "../api/auth.api";
import type { AuthReponse, LoginPayload } from "../types/Auth";
import { useNavigate } from "react-router-dom";
 
export const useLogin = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();

  return useMutation<AuthReponse, Error, LoginPayload>({
    mutationFn: async (data: LoginPayload) => {
      const response = await authApi.login(data);
      return response;
    },
    onSuccess: (data) => {
      dispatch(login({ token: data.access_token, name: data.token_type }));
      navigate("/dashboard");
    },
    onError:(error)=>{
        console.error("Error al logear" + error.message);
        
    }
  });

};
