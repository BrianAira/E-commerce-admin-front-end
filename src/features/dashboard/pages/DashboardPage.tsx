import { FiPackage, FiShoppingCart, FiAlertTriangle } from "react-icons/fi";

const statCards = [
  { title: "Productos totales", value: 6, subtitle: "Diferentes articulos en el inventario", icon: <FiPackage /> },
  { title: "Ordenes pendientes", value: 1, subtitle: "Pedidos en espera de envio", icon: <FiShoppingCart /> },
  { title: "Alerta de stock", value: 2, subtitle: "Articulos con bajo stock", icon: <FiAlertTriangle /> },
];

const lowStock = [
  { id: 1, name: "Campera de lluvia -The North Face", stock: 8, category: "Hombre", img: "https://mmgrim2.azureedge.net/MediaFiles/Grimoldi/2025/8/29/11125307_800.jpg" },
  { id: 2, name: "Campera de lluvia - The North Face", stock: 5, category: "Hombre", img: "https://mmgrim2.azureedge.net/MediaFiles/Grimoldi/2025/7/16/11021955_800.jpg" },
];

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-3 gap-4">
        {statCards.map((c) => (
          <div key={c.title} className="bg-white rounded-lg shadow-sm p-5 border border-slate-100">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-slate-500">{c.title}</div>
                <div className="mt-2 text-2xl font-semibold">{c.value}</div>
                <div className="text-xs mt-1 text-slate-400">{c.subtitle}</div>
              </div>
              <div className="text-slate-300 text-2xl">{c.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Low Stock Section */}
      <div className="bg-white rounded-lg border border-slate-100 p-6">
        <div className="mb-4">
          <h3 className="text-2xl font-semibold">Productos con bajo stock</h3>
          <p className="text-sm text-slate-400">Estos productos se estan agotando. Considere reabastecerse pronto.</p>
        </div>

        <div className="divide-y">
          {lowStock.map((p) => (
            <div key={p.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={p.img} alt={p.name} className="w-14 h-14 rounded-md object-cover border" />
                <div>
                  <div className="font-medium">{p.name}</div>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-semibold">
                    {p.stock}
                  </div>
                </div>

                <div className="text-slate-500">{p.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
