import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();
import { Navigate } from 'react-router-dom';

export const AuthProvider = ({ children }) => {
    
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const login = (token) => {
        
        localStorage.setItem('token', token);
        setToken(token);
        
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};