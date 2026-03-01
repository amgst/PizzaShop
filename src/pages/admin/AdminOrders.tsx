import React, { useState } from 'react';
import { Search, Filter, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Order {
    id: string;
    customer: string;
    items: string;
    total: number;
    status: 'pending' | 'completed' | 'cancelled';
    date: string;
}

const MOCK_ORDERS: Order[] = [
    { id: 'ORD-001', customer: 'Ali Khan', items: '2x Pepperoni Pizza, 1x Coke', total: 4500, status: 'pending', date: '2024-03-20 14:30' },
    { id: 'ORD-002', customer: 'Sara Ahmed', items: '1x Margherita Pizza', total: 1800, status: 'completed', date: '2024-03-20 13:15' },
    { id: 'ORD-003', customer: 'Zainab Bibi', items: '3x Wings, 2x Garlic Bread', total: 3200, status: 'cancelled', date: '2024-03-20 12:45' },
];

export const AdminOrders: React.FC = () => {
    const [orders] = useState<Order[]>(MOCK_ORDERS);
    const [searchQuery, setSearchQuery] = useState('');

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'completed': return 'bg-green-100 text-green-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusIcon = (status: Order['status']) => {
        switch (status) {
            case 'pending': return <Clock size={14} />;
            case 'completed': return <CheckCircle size={14} />;
            case 'cancelled': return <XCircle size={14} />;
        }
    };

    const filteredOrders = orders.filter(o =>
        o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-display mb-2">Orders Management</h1>
                <p className="text-gray-500">Track and manage incoming orders from your customers.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by Order ID or Customer..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-brand-orange/50 transition-all text-sm font-medium"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Items</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500">No orders found.</td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="p-4 font-bold text-brand-dark">{order.id}</td>
                                        <td className="p-4">
                                            <div className="font-medium text-gray-900">{order.customer}</div>
                                            <div className="text-xs text-gray-500">{order.date}</div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600 max-w-xs truncate">{order.items}</td>
                                        <td className="p-4 font-bold">Rs. {order.total.toLocaleString()}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="p-2 hover:bg-brand-dark/5 text-gray-400 hover:text-brand-dark rounded-lg transition-colors">
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
