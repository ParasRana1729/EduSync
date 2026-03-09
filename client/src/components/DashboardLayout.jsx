import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState("Jan - Jun 2025");

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar
        currentSession={currentSession}
        setCurrentSession={setCurrentSession}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />
      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
