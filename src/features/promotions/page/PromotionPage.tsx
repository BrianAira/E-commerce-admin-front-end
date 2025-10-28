import React from "react";

const PromotionsPage: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold">Promotions</h3>
        <p className="text-sm text-slate-400">Create and manage promotions (visual)</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-100">
          <div className="font-medium">Summer Sale</div>
          <div className="text-sm text-slate-500 mt-1">10% off</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-100">
          <div className="font-medium">Free Shipping</div>
          <div className="text-sm text-slate-500 mt-1">On orders over $50</div>
        </div>
      </div>
    </div>
  );
};

export default PromotionsPage;
