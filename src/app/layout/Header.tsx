import React from "react";
import { FiBell } from "react-icons/fi";

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-slate-800">Panel de control</h2>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="relative p-2 rounded-md hover:bg-slate-50"
            aria-label="notifications"
          >
            <FiBell size={18} className="text-slate-600" />
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center text-xs bg-red-500 text-white rounded-full w-5 h-5">
              2
            </span>
          </button>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-medium">Brian</div>
              <div className="text-xs text-slate-400">Propietario</div>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
              {/* simple avatar placeholder */}
              <svg
                viewBox="0 0 36 36"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#7c3aed" />
                    <stop offset="1" stopColor="#60a5fa" />
                  </linearGradient>
                </defs>
                <rect width="36" height="36" rx="8" fill="url(#g)" />
                <text
                  x="50%"
                  y="56%"
                  textAnchor="middle"
                  fontSize="14"
                  fill="white"
                  fontWeight="700"
                  fontFamily="Inter, sans-serif"
                >
                  BA
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
