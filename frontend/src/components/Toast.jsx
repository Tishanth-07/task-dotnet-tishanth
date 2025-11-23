import React from "react";

export default function Toast({ message, type = "success", onClose }) {
  if (!message) return null;

  const config = {
    success: {
      bg: "bg-gradient-to-r from-green-500 to-emerald-600",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    error: {
      bg: "bg-gradient-to-r from-red-500 to-rose-600",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  };

  const { bg, icon } = config[type];

  return (
    <div
      className={`fixed top-6 right-6 z-50 ${bg} text-white px-6 py-4 rounded-xl shadow-2xl animate-slideInRight flex items-center gap-4 max-w-md`}
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 font-medium">{message}</div>
      <button
        className="flex-shrink-0 hover:bg-white/20 rounded-lg p-1.5 transition-all active:scale-95"
        onClick={onClose}
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
