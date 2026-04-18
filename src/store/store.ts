import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/redux/userSlice'


export const store=configureStore({
    reducer:{
        auth:authReducer,

    },

  },
    // // Middleware opcional para evitar errores de serialización si guardas fechas
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: false,
    //     }),
)

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch;

