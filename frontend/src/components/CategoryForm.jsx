import React, { useEffect, useState } from "react";

export default function CategoryForm({ open, onClose, onSave, category }) {
  const [name, setName] = useState("");

  useEffect(()=> {
    if (category) setName(category.name);
    else setName("");
  }, [category, open]);

  if (!open) return null;

  const submit = () => {
    if (!name.trim()) return alert("Name required");
    onSave({ name: name.trim() });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white p-5 rounded w-96">
        <h3 className="mb-3 text-lg font-semibold">{category ? "Edit" : "Add"} Category</h3>
        <input value={name} onChange={e=>setName(e.target.value)} className="border w-full px-3 py-2 mb-3" />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
          <button onClick={submit} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
