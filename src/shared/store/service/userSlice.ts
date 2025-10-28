import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState{
    token:string|null;
    name?:string;

}

const initialState: UserState={
    token:localStorage.getItem("token"),
    name:undefined,

};

export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        login:(state, action:PayloadAction<{token:string; name?:string}>)=>{
            state.token=action.payload.token;
            state.name=action.payload.name;
            localStorage.setItem("token", action.payload.token);
        },
        logout:(state)=>{
            state.token=null;
            state.name=undefined;
            localStorage.removeItem("token");
        },
        
    },
});

export const {login, logout} =userSlice.actions;

export default userSlice.reducer