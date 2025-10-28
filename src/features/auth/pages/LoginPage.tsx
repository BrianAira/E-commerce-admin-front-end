import React, { useState } from "react"
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";


export const LoginPage=()=>{
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    
    const loginMutation=useLogin();

    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        loginMutation.mutate({email, password});
    };

    return (
        <div 
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 p-4">

        
        <div
        className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl overflow-y-auto max-h-[90vh]" 
        // className="max-w-md mx-auto mt-10 p-6 border rounded shadow"
        >
            <h2 
            className="text-3xl font-extrabold text-gray-900 mb-8 text-center"
            // className="text-3xl font-bold mb-4"
            >
                Login
            </h2>
            <form onSubmit={handleSubmit} 
            // className="flex flex-col gap-4"
            className="space-y-6"
            >
                <label htmlFor="email" className="block font-medium mb-2 text-gray-700">Email</label>
                <input type="email" 
                placeholder="usuario@gmail.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 transition "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"
              }`}
                // className="border p-2 rounded"
                />
                <label htmlFor="password" className="block font-medium mb-2 text-gray-700">Contraseña</label>
                <input type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 transition  ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"
                }`}

                />
                <button 
                type="submit"
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    {loginMutation.isPending? "Cargando...": "Login"}
                </button>
            </form>

            {loginMutation.isError && (
                <p className="text-red-500 mt-2">{loginMutation.error.message}</p>
            )}

            <div>
                <p className="mt-4 text-center">¿No tienes cuenta?{""}</p>

                <Link to={"/auth/register"} className="text-blue-500 hover:underline">Crear una</Link>
            </div>
        </div>
        </div>
    )
}