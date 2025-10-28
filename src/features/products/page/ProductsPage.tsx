import React from "react";

const ProductsPage: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold">Productos</h3>
        <p className="text-sm text-slate-400">Maneja tu catalogo de productos (solo visual)</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* simple placeholders */}
        {[1,2,3,4,5,6].map((i) => (
          <div key={i} className="bg-white p-4 rounded-lg border border-slate-100">
            <div className="h-36 bg-slate-50 rounded-md mb-3 flex items-center justify-center text-slate-400">Image</div>
            <div className="font-medium">Product {i}</div>
            <div className="text-sm text-slate-500 mt-1">$ {10 * i}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
