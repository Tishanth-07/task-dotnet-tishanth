// Products page: list, filter, sort, CRUD
import React, { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
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
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setToast({ msg: "Failed to load data", type: "error" });
    }
    setLoading(false);
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const filtered = products
    .filter((p) => !categoryFilter || +p.categoryId === +categoryFilter)
    .filter((p) => {
      if (!search) return true;
      const s = search.toLowerCase();
      return (
        p.productName.toLowerCase().includes(s) ||
        p.productCode.toLowerCase().includes(s)
      );
    });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortBy) return 0;
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "stock-asc") return a.stockQuantity - b.stockQuantity;
    if (sortBy === "stock-desc") return b.stockQuantity - a.stockQuantity;
    return 0;
  });

  const total = sorted.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const paged = sorted.slice(
    (page - 1) * perPage,
    (page - 1) * perPage + perPage
  );

  const openCreate = () => {
    setEditing(null);
    setShowForm(true);
  };
  const openEdit = (p) => {
    setEditing(p);
    setShowForm(true);
  };

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
      console.error(err);
      setToast({ msg: "Failed to save product", type: "error" });
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
      console.error(err);
      setToast({ msg: "Delete failed", type: "error" });
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
            Products
          </h1>
          <p className="text-gray-500 mt-1">Manage your product inventory</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="px-5 py-2.5 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md active:scale-95 flex items-center gap-2"
            onClick={loadAll}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg shadow-blue-500/50 hover:shadow-xl active:scale-95 flex items-center gap-2"
            onClick={openCreate}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-200 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              value={search}
              onChange={onSearch}
              placeholder="Search by name or code..."
              className="border-2 border-gray-200 pl-10 pr-4 py-3 rounded-xl w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
            className="border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none cursor-pointer"
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="stock-asc">Stock: Low to High</option>
            <option value="stock-desc">Stock: High to Low</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Code
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Category
                </th>
                <th className="p-4 text-right text-sm font-semibold text-gray-700">
                  Price
                </th>
                <th className="p-4 text-right text-sm font-semibold text-gray-700">
                  Stock
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="p-4 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-gray-600">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : paged.length ? (
                paged.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-800">
                      {p.productName}
                    </td>
                    <td className="p-4 text-gray-600 font-mono text-sm">
                      {p.productCode}
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {(categories.find((c) => c.id === p.categoryId) || {})
                          .name || "-"}
                      </span>
                    </td>
                    <td className="p-4 text-right font-semibold text-gray-800">
                      ${Number(p.price).toFixed(2)}
                    </td>
                    <td
                      className={`p-4 text-right font-semibold ${
                        p.stockQuantity < 5 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {p.stockQuantity}
                    </td>
                    <td className="p-4">
                      <StatusDot
                        active={
                          Boolean(p.isActive) && Number(p.stockQuantity) >= 5
                        }
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium transition-all active:scale-95"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => confirmDelete(p.id)}
                          className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition-all active:scale-95"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-800">
            {(page - 1) * perPage + 1}
          </span>{" "}
          -{" "}
          <span className="font-semibold text-gray-800">
            {Math.min(page * perPage, total)}
          </span>{" "}
          of <span className="font-semibold text-gray-800">{total}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
          >
            Previous
          </button>
          <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium shadow-lg">
            {page} / {pages}
          </div>
          <button
            disabled={page >= pages}
            onClick={() => setPage((p) => Math.min(p + 1, pages))}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
          >
            Next
          </button>
        </div>
      </div>

      <ConfirmModal
        open={confirm.open}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        onCancel={() => setConfirm({ open: false, id: null })}
        onConfirm={doDelete}
      />
      <Toast
        message={toast.msg}
        type={toast.type}
        onClose={() => setToast({ msg: "", type: "success" })}
      />
      <ProductForm
        open={showForm}
        categories={categories}
        product={editing}
        onClose={() => setShowForm(false)}
        onSave={handleSave}
      />
    </div>
  );
}

function StatusDot({ active }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-block w-3 h-3 rounded-full ${
          active ? "bg-green-500 animate-pulse" : "bg-red-500"
        }`}
      />
      <span
        className={`text-sm font-medium ${
          active ? "text-green-700" : "text-red-700"
        }`}
      >
        {active ? "Active" : "Inactive"}
      </span>
    </div>
  );
}
