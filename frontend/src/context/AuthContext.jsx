import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api';


const AuthContext = createContext();

// Removed mock users

const CURRENT_USER_KEY = 'furnhaus_user';
const TOKEN_KEY = 'furnhaus_token';


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      // Set API token if needed
      API.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []); 



  const signup = async (name, email, password) => {
    try {
      const res = await API.post('auth/register/', { name, email, password });
      const safeUser = res.data.user;
      const token = res.data.token;
      setUser(safeUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
      localStorage.setItem(TOKEN_KEY, token);
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Signup failed' };
    }
  };

  const login = async (email, password) => {
    try {
      const res = await API.post('auth/login/', { email, password });
      const safeUser = res.data.user;
      const token = res.data.token;
      setUser(safeUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
      localStorage.setItem(TOKEN_KEY, token);
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Invalid credentials' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    delete API.defaults.headers.common['Authorization'];
  };

  const addOrder = async (order) => {
    try {
      await API.post('orders/', order);
      // Optionally refetch user orders
    } catch (err) {
      console.error('Add order failed', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, addOrder, isLoggedIn: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
