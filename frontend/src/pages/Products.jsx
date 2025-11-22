import React, { useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../services/productService";
import { getCategories } from "../services/categoryService";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import ProductForm from "../components/ProductForm";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [confirm, setConfirm] = useState({ open: false, id: null });
  const [toast, setToast] = useState({ msg: "", type: "success" });

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const cats = await getCategories();
      setCategories(cats);
      const data = await getProducts(); // returns array
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); setToast({ msg: "Failed to load data", type: "error" }); }
    setLoading(false);
  };

  const onSearch = (e) => { setSearch(e.target.value); setPage(1); };

  // derived list: filter, search, sort
  const filtered = products
    .filter(p => (!categoryFilter || +p.categoryId === +categoryFilter))
    .filter(p => {
      if (!search) return true;
      const s = search.toLowerCase();
      return p.productName.toLowerCase().includes(s) || p.productCode.toLowerCase().includes(s);
    });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortBy) return 0;
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "stock-asc") return a.stockQuantity - b.stockQuantity;
    if (sortBy === "stock-desc") return b.stockQuantity - a.stockQuantity;
    return 0;
  });

  // pagination
  const total = sorted.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const paged = sorted.slice((page - 1) * perPage, (page - 1) * perPage + perPage);

  const openCreate = () => { setEditing(null); setShowForm(true); };
  const openEdit = (p) => { setEditing(p); setShowForm(true); };

  const handleSave = async (data) => {
    try {
      if (editing) {
        await updateProduct(editing.id, data);
        setToast({ msg: "Product updated", type: "success" });
      } else {
        await createProduct(data);
        setToast({ msg: "Product created", type: "success" });
      }
      setShowForm(false);
      loadAll();
    } catch (err) {
      console.error(err); setToast({ msg: "Failed to save product", type: "error" });
    }
  };

  const confirmDelete = (id) => setConfirm({ open: true, id });
  const doDelete = async () => {
    try {
      await deleteProduct(confirm.id);
      setToast({ msg: "Product deleted", type: "success" });
      setConfirm({ open: false, id: null });
      loadAll();
    } catch (err) {
      console.error(err); setToast({ msg: "Delete failed", type: "error" });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border rounded" onClick={loadAll}>Refresh</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={openCreate}>Add Product</button>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <input value={search} onChange={onSearch} placeholder="Search name or code" className="border px-3 py-2 rounded w-full sm:w-80" />
          <select value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value); setPage(1); }} className="border px-3 py-2 rounded">
            <option value="">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border px-3 py-2 rounded">
            <option value="">Sort</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="stock-asc">Stock ↑</option>
            <option value="stock-desc">Stock ↓</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-right">Price</th>
              <th className="p-3 text-right">Stock</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="p-4 text-center">Loading...</td></tr>
            ) : paged.length ? paged.map(p => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.productName}</td>
                <td className="p-3">{p.productCode}</td>
                <td className="p-3">{(categories.find(c=>c.id===p.categoryId) || {}).name || "-"}</td>
                <td className="p-3 text-right">${Number(p.price).toFixed(2)}</td>
                <td className={`p-3 text-right ${p.stockQuantity < 5 ? "text-red-600 font-semibold" : ""}`}>{p.stockQuantity}</td>
                <td className="p-3">
                  <StatusDot active={p.isActive} />
                </td>
                <td className="p-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => openEdit(p)} className="px-2 py-1 border rounded text-sm">Edit</button>
                    <button onClick={() => confirmDelete(p.id)} className="px-2 py-1 border rounded text-sm text-red-600">Delete</button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="7" className="p-4 text-center">No products found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div>Showing {((page-1)*perPage)+1} - {Math.min(page*perPage, total)} of {total}</div>
        <div className="flex items-center gap-2">
          <button disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-1 border rounded">Prev</button>
          <div>Page {page} / {pages}</div>
          <button disabled={page>=pages} onClick={()=>setPage(p=>Math.min(p+1,pages))} className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>

      <ConfirmModal open={confirm.open} title="Delete Product" message="Are you sure you want to delete this product?" onCancel={()=>setConfirm({open:false,id:null})} onConfirm={doDelete} />
      <Toast message={toast.msg} type={toast.type} onClose={()=>setToast({msg:"",type:"success"})} />
      <ProductForm open={showForm} categories={categories} product={editing} onClose={()=>setShowForm(false)} onSave={handleSave} />
    </div>
  );
}

function StatusDot({ active }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`inline-block w-3 h-3 rounded-full ${active ? "bg-green-500" : "bg-red-500"}`} />
      <span className="text-sm">{active ? "Active" : "Inactive"}</span>
    </div>
  );
}
