import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Storefront components
import Storefront from './pages/Storefront';

// Admin components
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminOrders } from './pages/admin/AdminOrders';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import { CheckoutPage } from './components/CheckoutPage';
import { AccountPage } from './pages/AccountPage';

const CheckoutRoute: React.FC = () => {
  const navigate = useNavigate();
  return <CheckoutPage onBack={() => navigate('/')} />;
};

export default function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Storefront */}
              <Route path="/" element={<Storefront />} />

              {/* Checkout */}
              <Route path="/checkout" element={<CheckoutRoute />} />
              <Route path="/account" element={<AccountPage />} />

              {/* Admin Login */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="orders" element={<AdminOrders />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  );
}
