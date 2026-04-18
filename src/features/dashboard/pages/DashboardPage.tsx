import { useMemo } from "react";
import { Card, CardBody, Image, Divider } from "@heroui/react";
import { FiPackage, FiShoppingCart, FiAlertTriangle } from "react-icons/fi";
import { useProducts } from "../../products/hooks/useProducts";
import { useAdminOrders } from "../../orders/hooks/useOrders";

const colorMap = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  danger: "bg-danger/10 text-danger",
};

export const DashboardPage = () => {
  const { data: products, isLoading: loadingProducts, refetch: refetchProducts } = useProducts();
  const { data: orders, isLoading: loadingOrders } = useAdminOrders();

  const statsData = useMemo(() => {
    if (!products || !orders) return null;

    const pendingOrders = orders.filter(o => o.status === "pending").length;
    const lowStockProducts = products.filter(p => p.totalStock < 10);
    


    return {
      totalProducts: products.length,
      pendingOrders,
      criticalStockCount: lowStockProducts.length,
      lowStockList: lowStockProducts.slice(0, 5)
    };
  }, [products, orders]);

  // Si loading es false pero no hay datos, algo falla en el fetch
  if (!loadingProducts && (!products || products.length === 0)) {
    return (
      <div className="p-10 text-center">
        <p className="text-danger">Error: No se recibieron productos del servidor.</p>
        <button onClick={() => refetchProducts()} className="mt-4 px-4 py-2 bg-primary text-white rounded">
           Reintentar Carga Forzada
        </button>
      </div>
    );
  }

  const statCards = [
    { 
      title: "Productos totales", 
      value: statsData?.totalProducts || 0, 
      subtitle: "Artículos en inventario", 
      icon: <FiPackage />, 
      color: "primary" as const 
    },
    { 
      title: "Órdenes pendientes", 
      value: statsData?.pendingOrders || 0, 
      subtitle: "Pedidos por procesar", 
      icon: <FiShoppingCart />, 
      color: "secondary" as const 
    },
    { 
      title: "Alerta de stock", 
      value: statsData?.criticalStockCount || 0, 
      subtitle: "Bajo stock crítico", 
      icon: <FiAlertTriangle />, 
      color: "danger" as const 
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold text-foreground tracking-tight">Vista General</h2>
        <p className="text-default-500">Estado actual de la plataforma Educart</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((c) => (
          <Card key={c.title} shadow="sm" className="border-none bg-content1">
            <CardBody className="flex flex-row items-center justify-between p-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-default-400 uppercase tracking-widest">{c.title}</p>
                <h3 className="text-3xl font-bold text-foreground">{c.value}</h3>
                <p className="text-xs text-default-500 font-medium">{c.subtitle}</p>
              </div>
              <div className={`p-4 rounded-2xl text-2xl shadow-inner ${colorMap[c.color]}`}>
                {c.icon}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card shadow="sm" className="border-none bg-content1">
        <CardBody className="p-0">
          <div className="p-6 flex items-center gap-3">
            <div className="p-2 bg-danger-50 dark:bg-danger-500/10 rounded-lg">
              <FiAlertTriangle className="text-danger" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Stock Crítico (menos de 10 u.)</h3>
              <p className="text-xs text-default-500">Priorice el reabastecimiento de estos productos.</p>
            </div>
          </div>
          
          <Divider />

          <div className="divide-y divide-default-100 dark:divide-neutral-800">
            {statsData?.lowStockList.length === 0 ? (
              <div className="p-10 text-center text-default-400 text-sm">
                 🎉 No hay productos con bajo stock actualmente.
              </div>
            ) : (
              statsData?.lowStockList.map((p) => (
                <div key={p.id} className="p-6 flex items-center justify-between hover:bg-default-50 transition-all">
                  <div className="flex items-center gap-4">
                    <Image
                      alt={p.name}
                      className="object-cover rounded-xl shadow-md"
                      height={64}
                      src={p.imageUrl}
                      width={64}
                    />
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-foreground text-sm leading-tight">{p.name}</p>
                      <p className="text-xs text-default-400">ID: {p.id} | SKU: {p.skuBase}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[10px] uppercase font-bold text-default-400 tracking-tighter">Total Stock</span>
                    <div className="flex items-center gap-2 px-3 py-1 bg-danger-50 text-danger rounded-full text-sm font-black border border-danger-100">
                      {p.totalStock} UDS
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default DashboardPage;