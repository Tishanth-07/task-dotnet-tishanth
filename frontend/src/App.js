import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [view, setView] = useState("dashboard");

  const render = () => {
    if (view === "dashboard") return <Dashboard />;
    return <Dashboard />;
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} onNavigate={setView} active={view} />
      <div className="flex-1">
        {render()}
      </div>
    </div>
  );
}

export default App;
