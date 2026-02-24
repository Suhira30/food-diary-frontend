import { createContext, useState, useEffect } from 'react';
import { login as loginApi, register as registerApi } from '../api/authApi';
import { TOKEN_KEY, USER_KEY } from '../utils/constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_KEY);

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }

        setIsLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const response = await loginApi(credentials);

            if (response.token && response.user) {
                localStorage.setItem(TOKEN_KEY, response.token);
                localStorage.setItem(USER_KEY, JSON.stringify(response.user));
                setToken(response.token);
                setUser(response.user);
            }

            return response;
        } catch (error) {
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const response = await registerApi(userData);

            if (response.token && response.user) {
                localStorage.setItem(TOKEN_KEY, response.token);
                localStorage.setItem(USER_KEY, JSON.stringify(response.user));
                setToken(response.token);
                setUser(response.user);
            }

            return response;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    };

    const value = {
        user,
        token,
        isLoading,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
