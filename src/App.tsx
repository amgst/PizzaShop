import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Storefront components
import Storefront from './pages/Storefront';

// Admin components
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';

export default function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Storefront */}
              <Route path="/" element={<Storefront />} />

              {/* Admin Login */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="orders" element={<div className="p-8 text-2xl font-bold text-gray-400">Orders Content Here</div>} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  );
}
