import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import ProductsPage from "../../features/products/page/ProductsPage";
import OrdersPage from "../../features/orders/pages/OrdersPage";
import PromotionsPage from "../../features/promotions/page/PromotionPage";
import PrivateRoute from "./PrivateRoute";
import { LoginPage } from "../../features/auth/pages/LoginPage";

const AppRouter= () => {
  return (
    <Routes>

      <Route path="/login" element={<LoginPage />}/>
      
      <Route 
      path="/" 
      element={
        <PrivateRoute>
          <MainLayout />
        </PrivateRoute>
      }>
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="promotions" element={<PromotionsPage />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
