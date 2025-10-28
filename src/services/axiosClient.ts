import axios from "axios";
import { logout } from "../shared/store/service/userSlice";
import { store } from "../shared/store/store";
// import { config } from "process";


export const api = axios.create({
    baseURL:import.meta.env.VITE_API_URL || "http://localhost:8000",
    withCredentials:false, //true si utilizo cookies
    timeout:1000*10,
    headers:{
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

//Interceptor de request, añade token
api.interceptors.request.use(
    config=>{
        try{
            const token=store.getState().user.token;
            // const token=localStorage.getItem("token");
            if(token && config.headers){
                config.headers.Authorization=`Bearer ${token}`;
            }
            return config;
        } catch (err){
            return config;
        }
    },
    error=>Promise.reject(error)
);

//Manejo general de errores
api.interceptors.response.use(
    (response)=>response,
    async (error)=>{
        const status=error.response?.status?? 500;

        if(status===401){
            localStorage.removeItem("token"); //lipio session
            store.dispatch(logout());
            window.location.href="/login";
        }
        
        //Mapear errores
        const customError={
            message:error?.response?.data?.message ??error.message,
            status:status,
            origin:error,
        };

        return Promise.reject(customError);

    }
)
