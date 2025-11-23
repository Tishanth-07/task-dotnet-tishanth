import React from "react";

export default function Sidebar({
  collapsed,
  setCollapsed,
  onNavigate,
  active,
}) {
  return (
    <div
      className={`bg-gradient-to-b from-slate-800 to-slate-900 text-white h-screen sticky top-0 shadow-2xl ${
        collapsed ? "w-20" : "w-72"
      } transition-all duration-300 ease-in-out flex flex-col`}
    >
      <div className="p-5 flex items-center justify-between border-b border-slate-700">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg">
              IM
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight">Inventory</div>
              <div className="text-xs text-slate-400">Management System</div>
            </div>
          </div>
        )}
        <button
          className="p-2 hover:bg-slate-700 rounded-lg transition-all duration-200 active:scale-95"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
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
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
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
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          )}
        </button>
      </div>

      <nav className="mt-6 flex-1 px-3">
        {[
          {
            key: "dashboard",
            label: "Dashboard",
            icon: (
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            ),
          },
          {
            key: "products",
            label: "Products",
            icon: (
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
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            ),
          },
          {
            key: "categories",
            label: "Categories",
            icon: (
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
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
            ),
          },
        ].map((i) => (
          <button
            key={i.key}
            onClick={() => onNavigate(i.key)}
            className={`flex items-center gap-4 w-full px-4 py-3.5 rounded-xl mb-2 transition-all duration-200 ${
              active === i.key
                ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/50 scale-105"
                : "hover:bg-slate-700/50 hover:translate-x-1"
            }`}
          >
            <span className={`${collapsed ? "mx-auto" : ""}`}>{i.icon}</span>
            {!collapsed && (
              <span
                className={`font-medium ${
                  active === i.key ? "text-white" : "text-slate-300"
                }`}
              >
                {i.label}
              </span>
            )}
          </button>
        ))}
      </nav>

      {!collapsed && (
        <div className="p-4 m-3 bg-slate-700/50 rounded-xl border border-slate-600">
          <div className="text-xs text-slate-400 mb-1">System Status</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">All Systems Online</span>
          </div>
        </div>
      )}
    </div>
  );
}
