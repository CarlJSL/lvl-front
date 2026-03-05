import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuthStore } from '../features/auth/store/authStore';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import ProductosPage from '../features/productos/pages/ProductosPage';
import AppsPage from '../features/apps/pages/AppsPage';
import PaginasWebsPage from '../features/paginas-webs/pages/PaginasWebsPage';
import AdminFormPage from '../features/admin-form/pages/AdminFormPage';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/productos" element={<ProtectedRoute><ProductosPage /></ProtectedRoute>} />
        <Route path="/apps" element={<ProtectedRoute><AppsPage /></ProtectedRoute>} />
        <Route path="/paginas-webs" element={<ProtectedRoute><PaginasWebsPage /></ProtectedRoute>} />
        <Route path="/admin-form" element={<ProtectedRoute><AdminFormPage /></ProtectedRoute>} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
