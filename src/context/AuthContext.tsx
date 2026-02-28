import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    user: { email: string } | null;
    isAdmin: boolean;
    loading: boolean;
    login: (password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAdmin: false,
    loading: true,
    login: () => false,
    logout: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<{ email: string } | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const savedAuth = localStorage.getItem('admin_auth');
        if (savedAuth === 'true') {
            setUser({ email: 'admin' });
            setIsAdmin(true);
        }
        setLoading(false);
    }, []);

    const login = (password: string) => {
        if (password === 'admin123') {
            localStorage.setItem('admin_auth', 'true');
            setUser({ email: 'admin' });
            setIsAdmin(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('admin_auth');
        setUser(null);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAdmin, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
