// src/layouts/AdminLayout.tsx
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./Sidebar";
import { AdminHeader } from "./AdminHeader";

export const AdminLayout = () => {
  return (
    // 'bg-background' asegura que en Dark Mode use el negro de HeroUI 
    // y en Light Mode un blanco puro o grisáceo sutil.
    <div className="flex h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* Sidebar: Estática a la izquierda */}
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header: Sticky con z-index para que nada pase por encima */}
        <AdminHeader />

        {/* Main Content: 
           Cambiamos 'bg-default-50/50' a 'bg-default-50' sólido en Light Mode
           y un tono muy sutil en Dark Mode para dar profundidad.
        */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-default-50/50 dark:bg-neutral-950/50 p-4 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto w-full h-full">
            {/* Outlet renderizará Dashboard, Products, etc. 
               Aquí es donde tus Cards blancas resaltarán sobre el fondo grisáceo.
            */}
            <Outlet /> 
          </div>
        </main>
      </div>
    </div>
  );
};