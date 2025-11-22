import React, { useEffect, useState } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../services/categoryService";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import CategoryForm from "../components/CategoryForm";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [confirm, setConfirm] = useState({ open:false, id:null });
  const [toast, setToast] = useState({ msg: "", type: "success" });
  
  useEffect(() => { load(); }, []);
  const load = async () => {
    setLoading(true);
    try { const data = await getCategories(); setCategories(data); } catch(e){ setToast({msg:"Load failed",type:"error"}); }
    setLoading(false);
  };

  const openCreate = () => { setEdit(null); setShowForm(true); };
  const openEdit = (c) => { setEdit(c); setShowForm(true); };

  const save = async (payload) => {
    try {
      if (edit) await updateCategory(edit.id, payload);
      else await createCategory(payload);
      setToast({msg:"Saved", type:"success"});
      setShowForm(false);
      load();
    } catch(e) { setToast({msg:"Save failed", type:"error"}) }
  };

  const confirmDelete = (id) => setConfirm({open:true, id});
  const doDelete = async () => {
    try {
      await deleteCategory(confirm.id);
      setToast({msg:"Deleted", type:"success"});
      setConfirm({open:false, id:null});
      load();
    } catch(e) {
      setToast({msg:"Delete failed (maybe category in use)", type:"error"});
      setConfirm({open:false, id:null});
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <div>
          <button className="px-3 py-1 border rounded" onClick={load}>Refresh</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded ml-2" onClick={openCreate}>Add Category</button>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4">
        {loading ? <div>Loading...</div> : (
          <ul>
            {categories.map(c => (
              <li key={c.id} className="flex justify-between items-center border-b last:border-b-0 py-2">
                <div>{c.name}</div>
                <div className="flex gap-2">
                  <button onClick={()=>openEdit(c)} className="px-2 py-1 border rounded text-sm">Edit</button>
                  <button onClick={()=>confirmDelete(c.id)} className="px-2 py-1 border rounded text-sm text-red-600">Delete</button>
                </div>
              </li>
            ))}
            {!categories.length && <li className="text-sm text-gray-500">No categories yet</li>}
          </ul>
        )}
      </div>

      <ConfirmModal open={confirm.open} title="Delete Category" message="Delete this category? Cannot delete if products use it." onCancel={()=>setConfirm({open:false,id:null})} onConfirm={doDelete} />
      <Toast message={toast.msg} type={toast.type} onClose={()=>setToast({msg:"",type:"success"})} />
      <CategoryForm open={showForm} onClose={()=>setShowForm(false)} onSave={save} category={edit} />
    </div>
  );
}
