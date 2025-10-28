import React from "react";

const OrdersPage: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold">Orders</h3>
        <p className="text-sm text-slate-400">Visual list of orders (mock)</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-100">
        <table className="w-full text-left">
          <thead className="text-slate-500 text-sm">
            <tr>
              <th className="px-6 py-3">Order</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {[1,2,3].map(i => (
              <tr key={i} className="border-t">
                <td className="px-6 py-4">#{1000 + i}</td>
                <td className="px-6 py-4">Customer {i}</td>
                <td className="px-6 py-4">$ {25 * i}</td>
                <td className="px-6 py-4 text-slate-600">Pending</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
