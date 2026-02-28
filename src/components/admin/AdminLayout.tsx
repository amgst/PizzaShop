import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Users, ShoppingBag, LogOut, Pizza } from 'lucide-react';

export const AdminLayout: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b border-gray-200 flex items-center gap-3">
                    <div className="bg-brand-orange text-white p-2 rounded-xl">
                        <Pizza size={24} />
                    </div>
                    <span className="font-display text-xl">Admin Panel</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        to="/admin"
                        className="flex items-center gap-3 px-4 py-3 text-brand-dark/70 hover:bg-brand-light hover:text-brand-orange rounded-xl transition-colors font-medium"
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link
                        to="/admin/products"
                        className="flex items-center gap-3 px-4 py-3 text-brand-dark/70 hover:bg-brand-light hover:text-brand-orange rounded-xl transition-colors font-medium"
                    >
                        <ShoppingBag size={20} />
                        Products
                    </Link>
                    <Link
                        to="/admin/orders"
                        className="flex items-center gap-3 px-4 py-3 text-brand-dark/70 hover:bg-brand-light hover:text-brand-orange rounded-xl transition-colors font-medium"
                    >
                        <Users size={20} />
                        Orders
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="flex flex-row items-center justify-center gap-2 w-full py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
};
