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

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
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

          {/* Redirect root to home */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
