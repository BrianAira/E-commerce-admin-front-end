// src/components/AdminSidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiBox, FiShoppingCart, FiTag, FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useAuth } from "../features/auth/hooks/useAuth";
import type { RootState } from "../store/store";
import { Button, Divider, User } from "@heroui/react";

const menuItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: <FiHome size={20} /> },
  { to: "/admin/products", label: "Productos", icon: <FiBox size={20} /> },
  { to: "/admin/orders", label: "Órdenes", icon: <FiShoppingCart size={20} /> },
  { to: "/admin/statistics", label: "Estadisticas", icon: <FiTag size={20} /> },
];

export const AdminSidebar = () => {
  const { pathname } = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);
  const { logoutUser } = useAuth();

  return (
    // bg-white / bg-neutral-900: asegura que el sidebar sea un bloque sólido
    // border-divider: usa el color de borde de HeroUI que se adapta al tema
    <aside className="w-64 h-screen flex flex-col bg-white dark:bg-[#121212] border-r border-divider transition-all duration-300">
      
      {/* 1. Brand Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 font-bold">
          M
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-foreground leading-none">MiOdisea</span>
          <span className="text-[10px] uppercase text-primary font-bold tracking-widest">Admin</span>
        </div>
      </div>

      <Divider className="mx-4 w-auto opacity-50" />

      {/* 2. Navigation Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200
                ${isActive 
                  ? "bg-primary text-white shadow-md shadow-primary/30 font-semibold" 
                  : "text-default-500 hover:bg-default-100 dark:hover:bg-neutral-800 hover:text-default-900 dark:hover:text-white"}
              `}
            >
              <span className={isActive ? "text-white" : "text-default-400 dark:text-default-500"}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* 3. Footer: User & Logout */}
      <div className="p-4 mt-auto">
        {/* El fondo del footer ahora usa clases de HeroUI para evitar el 'negro absoluto' */}
        <div className="bg-default-50 dark:bg-default-100 rounded-2xl p-4 border border-default-200 dark:border-default-100 transition-colors">
          <User
            name={user?.username || "Admin"}
            description={user?.role || "Manager"}
            avatarProps={{
              // src: "https://i.pravatar.cc/150?u=brian",
              size: "sm",
              className: "flex-shrink-0"
            }}
            classNames={{
              name: "text-xs font-bold text-foreground",
              description: "text-[10px] text-primary font-medium"
            }}
          />
          
          <Button
            onPress={logoutUser}
            variant="flat" // 'flat' queda más elegante que 'light' en el sidebar
            color="danger"
            size="sm"
            fullWidth
            startContent={<FiLogOut size={14} />}
            className="mt-3 font-semibold text-[11px] h-8 bg-danger-50 dark:bg-danger-500/10 hover:bg-danger-100"
          >
            Cerrar Sesión
          </Button>
        </div>
        <p className="text-[9px] text-center text-default-400 mt-4 font-mono tracking-widest uppercase opacity-70">
          Educart Engine v1.0
        </p>
      </div>
    </aside>
  );
};