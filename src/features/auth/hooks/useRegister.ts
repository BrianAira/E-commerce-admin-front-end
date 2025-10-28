import { useMutation } from "@tanstack/react-query"
import type { AuthReponse, RegisterPayload } from "../types/Auth"
import { authApi } from "../api/auth.api"
import { useDispatch } from "react-redux"
import { login } from "../../../shared/store/service/userSlice"
// import { Navigate, useNavigate } from "react-router-dom"
// import { useAuthStore } from "../../../shared/store/useAuthStore"


export const useRegister=(navigate:(path:string)=>void)=>{
    const dispatch=useDispatch();

    return useMutation<AuthReponse, Error, RegisterPayload>({
        mutationFn:async(data:RegisterPayload)=>{
            const newPayload={...data, role:"admin"};
            return await authApi.register(newPayload);

        },
        
        onSuccess:(data)=>{
            dispatch(login({token:data.access_token, name:data.token_type}));
            navigate("/dashboard");
            
        },
        
        onError:(error)=>{
            console.error("Error al registrar :"+error.message );
        }
    })
}

// export const useRegister=()=>{
//     return useMutation<AuthReponse, Error, RegisterPayload>({
//         mutationFn:async(data:RegisterPayload)=>{
//             const response=await authApi.register({...data, role:"customer"});

//             localStorage.setItem("token", response.access_token);
//             // useAuthStore.getState().setToken(response.access_token)
//             return response;
//         }
//     })
// }