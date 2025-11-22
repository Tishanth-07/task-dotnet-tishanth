import React, { useEffect, useState } from "react";

export default function ProductForm({ open, onClose, onSave, categories = [], product }) {
  const [model, setModel] = useState({
    productName: "", productCode: "", categoryId: "", price: 0, stockQuantity: 0, isActive: true
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setModel({
        productName: product.productName,
        productCode: product.productCode,
        categoryId: product.categoryId,
        price: product.price,
        stockQuantity: product.stockQuantity,
        isActive: product.isActive
      });
    } else {
      setModel({ productName: "", productCode: "", categoryId: "", price: 0, stockQuantity: 0, isActive: true });
    }
    setErrors({});
  }, [product, open]);

  if (!open) return null;

  const validate = () => {
    const e = {};
    if (!model.productName) e.productName = "Product name is required";
    if (!model.productCode) e.productCode = "Product code is required";
    if (!model.categoryId) e.categoryId = "Category required";
    if (model.price < 0) e.price = "Price must be >= 0";
    if (model.stockQuantity < 0) e.stockQuantity = "Stock must be >= 0";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    // prepare payload matching backend model
    const payload = {
      productName: model.productName,
      productCode: model.productCode,
      categoryId: Number(model.categoryId),
      price: Number(model.price),
      stockQuantity: Number(model.stockQuantity),
      isActive: Boolean(model.isActive)
    };
    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white p-5 rounded w-11/12 max-w-xl">
        <h3 className="text-lg font-semibold mb-3">{product ? "Edit Product" : "Add Product"}</h3>
        <div className="grid grid-cols-1 gap-3">
          <label>
            <div className="text-sm">Product Name</div>
            <input className="border px-3 py-2 w-full" value={model.productName} onChange={e=>setModel({...model,productName:e.target.value})} />
            {errors.productName && <div className="text-red-600 text-sm">{errors.productName}</div>}
          </label>

          <label>
            <div className="text-sm">Product Code</div>
            <input className="border px-3 py-2 w-full" value={model.productCode} onChange={e=>setModel({...model,productCode:e.target.value})} />
            {errors.productCode && <div className="text-red-600 text-sm">{errors.productCode}</div>}
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label>
              <div className="text-sm">Category</div>
              <select className="border px-3 py-2 w-full" value={model.categoryId} onChange={e=>setModel({...model,categoryId:e.target.value})}>
                <option value="">Select</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              {errors.categoryId && <div className="text-red-600 text-sm">{errors.categoryId}</div>}
            </label>

            <label>
              <div className="text-sm">Price</div>
              <input type="number" className="border px-3 py-2 w-full" value={model.price} onChange={e=>setModel({...model,price:e.target.value})} />
              {errors.price && <div className="text-red-600 text-sm">{errors.price}</div>}
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label>
              <div className="text-sm">Stock Quantity</div>
              <input type="number" className="border px-3 py-2 w-full" value={model.stockQuantity} onChange={e=>setModel({...model,stockQuantity:e.target.value})} />
              {errors.stockQuantity && <div className="text-red-600 text-sm">{errors.stockQuantity}</div>}
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" checked={model.isActive} onChange={e=>setModel({...model,isActive:e.target.checked})} />
              <span>Active</span>
            </label>
          </div>

          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
            <button onClick={submit} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
