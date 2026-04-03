import { useState, useEffect } from 'react';
import { getMe, login as apiLogin, logout as apiLogout } from '../api/auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setLoading(false);
      return;
    }
    getMe(token)
      .then((u) => setUser(u))
      .catch(() => localStorage.removeItem('auth_token'))
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const { token, user: u } = await apiLogin(email, password);
    localStorage.setItem('auth_token', token);
    setUser(u);
  }

  async function logout() {
    await apiLogout();
    localStorage.removeItem('auth_token');
    setUser(null);
  }

  return { user, loading, login, logout };
}
