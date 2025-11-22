import React from "react";

export default function Sidebar({ collapsed, setCollapsed, onNavigate, active }) {
  return (
    <div className={`bg-white border-r h-full ${collapsed ? "w-16" : "w-64"} transition-width duration-200`}>
      <div className="p-4 flex items-center justify-between">
        {!collapsed && <div className="text-xl font-bold">Inventory</div>}
        <button className="p-2" onClick={() => setCollapsed(!collapsed)}>{collapsed ? "➤" : "◀"}</button>
      </div>
      <nav className="mt-4">
        {[
          { key: "dashboard", label: "Dashboard" },
        ].map(i => (
          <button
            key={i.key}
            onClick={() => onNavigate(i.key)}
            className={`flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100 ${active === i.key ? "bg-gray-100 font-semibold" : ""}`}
          >
            {!collapsed && <span>{i.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}
