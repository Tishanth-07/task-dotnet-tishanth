import React from "react";

export default function Toast({ message, type = "success", onClose }) {
  if (!message) return null;
  const bg = type === "error" ? "bg-red-600" : "bg-green-600";
  return (
    <div className={`fixed top-5 right-5 z-50 ${bg} text-white px-4 py-2 rounded shadow-lg`}>
      <div className="flex items-center gap-4">
        <div>{message}</div>
        <button className="text-white opacity-80" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}
