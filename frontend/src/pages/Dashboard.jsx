import React, { useEffect, useState, useCallback } from "react";
import api from "../api";

export default function Dashboard({ onRefresh }) {
  const [summary, setSummary] = useState(null);
  const fetchSummary = useCallback(async () => {
    try {
      const res = await api.get("/Dashboard");
      setSummary(res.data);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error(err);
    }
  }, [onRefresh]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button className="px-3 py-1 border rounded" onClick={fetchSummary}>Refresh</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Total Products" value={summary ? summary.totalProducts : "..."} />
        <Card title="Total Categories" value={summary ? summary.totalCategories : "..."} />
        <Card title="Low Stock (<5)" value={summary ? summary.lowStock : "..."} />
        <Card title="Active Products" value={summary ? summary.activeProducts : "..."} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="text-sm text-gray-600">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
