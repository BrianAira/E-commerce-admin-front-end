// // import { useForm } from "react-hook-form";
// // import { useRegister } from "../hooks/useRegister";
// // import { useNavigate } from "react-router-dom";
// // import { useAuthStore } from "../../../shared/store/useAuthStore";
// // import { useEffect } from "react";
// // import toast, { Toaster } from "react-hot-toast";
// // import { error as errors } from "node:console";
// // import { error } from "console";


// type RegisterFormInputs={
//     first_name:string;
//     last_name:string;
//     email:string;
//     phone:string;
//     address:string;
//     password:string;
//     // role:string;
// }

// export const RegisterPage=()=>{
//     const {register, handleSubmit, formState:{errors}}=useForm<RegisterFormInputs>();
//     const {mutate, isPending}=useRegister();
//     const navigate=useNavigate();
//     const token=useAuthStore((state)=>state.token);

//     useEffect(()=>{
//         if(token)navigate("/");
//     }, [token]);

//     const onSubmit=(data:RegisterFormInputs)=>{
//         mutate(
//             {
//                 ...data, role:"customer"
//             },

//             {onSuccess:()=>{
//                 toast.success("Registro exitoro, bienvenido");
//                 navigate("/products")
//             },
//             onError:(error:any)=>{
//                 toast.error(error.message||"Error al registrar")
//             }
//         }
//         )
//     }

//     return(
//         <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
//             <Toaster position="top-right"/>
//             <h1 className="text-2xl font-bold mb-4">Crear cuenta</h1>
        
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <input type="text" {...register("first_name", {required:"Nombre es obligatorio"})} placeholder="Nombre" className="w-full p-2 border rounded"/>
//             {errors.first_name&& <p>{errors.first_name.message}</p>}

//             <input type="text" {...register("last_name", {required:"Apellido es obligatorio"})} placeholder="Apellido"className="w-full p-2 border rounded" />
//             {errors.last_name && <p>{errors.last_name.message}</p>}

//             <input {...register("email", { required: "Email requerido", pattern: { value: /^\S+@\S+$/i, message: "Email inválido" } })} placeholder="Email" className="w-full p-2 border rounded" />
//             {errors.email && <p>{errors.email.message}</p>}

//             <input {...register("phone", { required: "Teléfono requerido" })} placeholder="Teléfono"  className="w-full p-2 border rounded"/>
//             {errors.phone && <p>{errors.phone.message}</p>}

//             <input {...register("address", { required: "Dirección requerida" })} placeholder="Dirección"  className="w-full p-2 border rounded"/>
//             {errors.address && <p>{errors.address.message}</p>}

//             <input type="password" {...register("password", { required: "Contraseña requerida", minLength: { value: 6, message: "Mínimo 6 caracteres" } })} placeholder="Contraseña" className="w-full p-2 border rounded"/>
//             {errors.password && <p>{errors.password.message}</p>}

//             <button disabled={isPending} type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bgblue600">
//                 {isPending? "Registrando...": "Registrarse"}
//             </button>
//         </form>
//         </div>
//     )


// }