import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Package, ShoppingBag, DollarSign } from 'lucide-react';
import { getProducts } from '../../services/products';

export const AdminDashboard: React.FC = () => {
    const { user } = useAuth();
    const [productCount, setProductCount] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const products = await getProducts();
                setProductCount(products.length);
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-display mb-2">Welcome back!</h1>
                <p className="text-gray-500">Here's what's happening at your shop today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="bg-blue-50 text-blue-600 p-4 rounded-xl">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                        <p className="text-2xl font-bold">Rs. 0</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="bg-green-50 text-green-600 p-4 rounded-xl">
                        <ShoppingBag size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">New Orders</p>
                        <p className="text-2xl font-bold">2</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="bg-orange-50 text-brand-orange p-4 rounded-xl">
                        <Package size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Products</p>
                        <p className="text-2xl font-bold">{productCount}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
                <div className="text-center py-12 text-gray-500">
                    Check the orders page for full details.
                </div>
            </div>
        </div>
    );
};
