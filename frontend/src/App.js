// App shell with sidebar and simple view switching
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [view, setView] = useState("dashboard");

  const render = () => {
    if (view === "dashboard") return <Dashboard />;
    if (view === "products") return <Products />;
    if (view === "categories") return <Categories />;
    return <Dashboard />;
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onNavigate={setView}
        active={view}
      />
      <div className="flex-1 overflow-auto">{render()}</div>
    </div>
  );
}

export default App;
