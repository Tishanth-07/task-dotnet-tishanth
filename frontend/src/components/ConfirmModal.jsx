import React from "react";

export default function ConfirmModal({ open, title = "Confirm", message, onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="mb-4 text-sm text-gray-700">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 rounded border">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded bg-red-600 text-white">Delete</button>
        </div>
      </div>
    </div>
  );
}
