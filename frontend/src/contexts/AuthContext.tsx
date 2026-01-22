import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: any) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Silent login on mount
    useEffect(() => {
        const initializeAuth = async () => {
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) {
                setIsLoading(false);
                return;
            }

            try {
                // Try to refresh token immediately
                const response = await api.post('/auth/refresh', { refresh_token: refreshToken });
                const { access_token, refresh_token: newRefreshToken, user } = response.data;
                window.auth_token = access_token;
                localStorage.setItem('refresh_token', newRefreshToken);
                setUser(user);
            } catch (error) {
                // Not authenticated or refresh failed
                window.auth_token = null;
                localStorage.removeItem('refresh_token');
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = async (credentials: any) => {
        const response = await api.post('/auth/login', credentials);
        const { access_token, refresh_token, user } = response.data;
        window.auth_token = access_token;
        localStorage.setItem('refresh_token', refresh_token);
        setUser(user);
    };

    const register = async (data: any) => {
        const response = await api.post('/auth/register', data);
        const { access_token, refresh_token, user } = response.data;
        window.auth_token = access_token;
        localStorage.setItem('refresh_token', refresh_token);
        setUser(user);
    };

    const logout = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            await api.post('/auth/logout', { refresh_token: refreshToken });
        } finally {
            window.auth_token = null;
            localStorage.removeItem('refresh_token');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
