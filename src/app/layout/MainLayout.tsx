import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white/80 border-r border-slate-200 px-4 py-6">
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8 bg-[color:var(--bg)] flex-1">
          <div className="max-w-[1200px] w-full mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
