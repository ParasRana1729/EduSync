import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("edusync_token");
    const saved = localStorage.getItem("edusync_user");
    
    if (token && saved) {
      fetch('/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          if (res.ok) return res.json();
          throw new Error('Invalid token');
        })
        .then(data => {
          setUser(data);
        })
        .catch(() => {
          localStorage.removeItem("edusync_token");
          localStorage.removeItem("edusync_user");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  async function login(email, password) {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setUser(data.user);
        localStorage.setItem("edusync_token", data.token);
        localStorage.setItem("edusync_user", JSON.stringify(data.user));
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch {
      return { success: false, message: "Server error. Please try again." };
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("edusync_token");
    localStorage.removeItem("edusync_user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
