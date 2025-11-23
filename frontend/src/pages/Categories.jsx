import React, { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import CategoryForm from "../components/CategoryForm";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const [toast, setToast] = useState({ msg: "", type: "success" });

  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (e) {
      setToast({ msg: "Load failed", type: "error" });
    }
    setLoading(false);
  };

  const openCreate = () => {
    setEdit(null);
    setShowForm(true);
  };
  const openEdit = (c) => {
    setEdit(c);
    setShowForm(true);
  };

  const save = async (payload) => {
    try {
      if (edit) await updateCategory(edit.id, payload);
      else await createCategory(payload);
      setToast({ msg: "Saved", type: "success" });
      setShowForm(false);
      load();
    } catch (e) {
      setToast({ msg: "Save failed", type: "error" });
    }
  };

  const confirmDelete = (id) => setConfirm({ open: true, id });
  const doDelete = async () => {
    try {
      await deleteCategory(confirm.id);
      setToast({ msg: "Deleted", type: "success" });
      setConfirm({ open: false, id: null });
      load();
    } catch (e) {
      setToast({ msg: "Delete failed (maybe category in use)", type: "error" });
      setConfirm({ open: false, id: null });
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
            Categories
          </h1>
          <p className="text-gray-500 mt-1">
            Organize your products efficiently
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="px-5 py-2.5 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md active:scale-95 flex items-center gap-2"
            onClick={load}
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
            Add Category
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600 font-medium">
                Loading categories...
              </span>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {categories.map((c, index) => (
              <div
                key={c.id}
                className="p-5 hover:bg-gray-50 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-lg">
                        {c.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Category #{index + 1}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(c)}
                      className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium transition-all active:scale-95 flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(c.id)}
                      className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition-all active:scale-95 flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {!categories.length && (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                </div>
                <div className="text-gray-600 font-medium mb-1">
                  No categories yet
                </div>
                <div className="text-sm text-gray-500">
                  Start by creating your first category
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <ConfirmModal
        open={confirm.open}
        title="Delete Category"
        message="Delete this category? Cannot delete if products use it."
        onCancel={() => setConfirm({ open: false, id: null })}
        onConfirm={doDelete}
      />
      <Toast
        message={toast.msg}
        type={toast.type}
        onClose={() => setToast({ msg: "", type: "success" })}
      />
      <CategoryForm
        open={showForm}
        onClose={() => setShowForm(false)}
        onSave={save}
        category={edit}
      />
    </div>
  );
}
