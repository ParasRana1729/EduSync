import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import Home from "@/pages/Home";
import Attendance from "@/pages/Attendance";
import Performance from "@/pages/Performance";
import MyInfo from "@/pages/MyInfo";
import Circular from "@/pages/Circular";
import IndexBox from "@/pages/IndexBox";
import Login from "@/pages/Login";

import { useAuth } from "@/context/AuthContext";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Protected dashboard routes */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/my-info" element={<MyInfo />} />
            <Route path="/circulars" element={<Circular />} />
            <Route path="/messages" element={<IndexBox />} />
          </Route>

          {/* Redirect root to login or home based on auth status */}
          <Route path="*" element={user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
