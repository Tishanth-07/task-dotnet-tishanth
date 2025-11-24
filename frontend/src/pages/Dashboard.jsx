import React, { useEffect, useState, useCallback } from "react";
import api from "../api";

export default function Dashboard({ onRefresh }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchSummary = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/Dashboard");
      setSummary(res.data);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [onRefresh]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Overview of your inventory system
          </p>
        </div>
        <button
          className="px-5 py-2.5 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md active:scale-95 flex items-center gap-2 self-start sm:self-auto disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={fetchSummary}
          disabled={loading}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          ) : (
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
          )}
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card
          title="Total Products"
          value={summary ? summary.totalProducts : "..."}
          icon={
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          }
          gradient="from-blue-500 to-blue-600"
          bgGradient="from-blue-50 to-blue-100"
        />
        <Card
          title="Total Categories"
          value={summary ? summary.totalCategories : "..."}
          icon={
            <svg
              className="w-8 h-8"
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
          }
          gradient="from-purple-500 to-purple-600"
          bgGradient="from-purple-50 to-purple-100"
        />
        <Card
          title="Low Stock (<5)"
          value={summary ? summary.lowStock : "..."}
          icon={
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          }
          gradient="from-red-500 to-red-600"
          bgGradient="from-red-50 to-red-100"
        />
        <Card
          title="Active Products"
          value={summary ? summary.activeProducts : "..."}
          icon={
            <svg
              className="w-8 h-8"
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
          }
          gradient="from-green-500 to-green-600"
          bgGradient="from-green-50 to-green-100"
        />
      </div>
    </div>
  );
}

function Card({ title, value, icon, gradient, bgGradient }) {
  return (
    <div
      className={`bg-gradient-to-br ${bgGradient} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:scale-105 group`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3 bg-gradient-to-br ${gradient} text-white rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
      </div>
      <div className="text-sm font-medium text-gray-600 mb-1">{title}</div>
      <div className="text-3xl md:text-4xl font-bold text-gray-800">
        {value}
      </div>
    </div>
  );
}
