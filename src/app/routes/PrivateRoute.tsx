import { useSelector } from "react-redux"
import type { RootState } from "../../shared/store/store"
// import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PrivateProps{
    children:React.ReactNode;
}

const PrivateRoute=({children}: PrivateProps)=>{
    const token= useSelector((state:RootState)=>state.user.token);

    if(!token){
        return <Navigate to="/login" replace/>;
    }

    return <>{children}</>;
};
 
export default PrivateRoute; 