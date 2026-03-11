import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import Home from "@/pages/Home";
import Attendance from "@/pages/Attendance";
import Performance from "@/pages/Performance";
import MyInfo from "@/pages/MyInfo";
import Circular from "@/pages/Circular";
import IndexBox from "@/pages/IndexBox";
import Login from "@/pages/Login";

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
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

      <Route path="*" element={user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
