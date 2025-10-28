import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiBox, FiShoppingCart, FiTag } from "react-icons/fi";

const items = [
  { to: "/dashboard", label: "Panel de control", icon: <FiHome size={18} /> },
  { to: "/products", label: "Productos", icon: <FiBox size={18} /> },
  { to: "/orders", label: "Ordenes", icon: <FiShoppingCart size={18} /> },
  { to: "/promotions", label: "Promociones", icon: <FiTag size={18} /> },
];

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-8 pl-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">
            Mi
          </div>
          <div>
            <h1 className="text-lg font-semibold">Mi odisea</h1>
            <p className="text-xs text-slate-400">Panel de administración</p>
          </div>
        </div>
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
          {items.map((it) => (
            <li key={it.to}>
              <NavLink
                to={it.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                    isActive
                      ? "bg-slate-100 text-slate-900 font-medium"
                      : "text-slate-600 hover:bg-slate-50"
                  }`
                }
              >
                <span className="text-slate-400">{it.icon}</span>
                <span>{it.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        <div className="text-xs text-slate-400 px-3">v1.0.0</div>
      </div>
    </div>
  );
};

export default Sidebar;
