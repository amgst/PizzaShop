import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pizza } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLogin: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, isAdmin, loading: authLoading, login } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (user && isAdmin) {
            navigate('/admin');
        }
    }, [user, isAdmin, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (username === 'admin' && login(password)) {
            // Navigation handled by useEffect
        } else {
            setError('Invalid username or password');
            setLoading(false);
        }
    };

    const displayError = error || (user && !isAdmin && !authLoading ? "You do not have admin privileges. Please contact the administrator." : "");

    return (
        <div className="min-h-screen bg-brand-light flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                <div className="flex justify-center mb-8">
                    <div className="bg-brand-orange text-white p-4 rounded-full">
                        <Pizza size={48} />
                    </div>
                </div>
                <h2 className="text-3xl font-display text-center mb-8">Admin Panel</h2>

                {displayError && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">
                        {displayError}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-dark text-white py-4 rounded-xl font-bold hover:bg-black transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};
