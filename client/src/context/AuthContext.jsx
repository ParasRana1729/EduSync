import { createContext, useContext, useState, useEffect } from "react";
import students from "../data/students";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("edusync_user");
    if (saved) {
      setUser(JSON.parse(saved));
    } else {
      // Auto-login as first student for development (remove this when login page is built)
      const defaultUser = students[0];
      const { password: _, ...safeUser } = defaultUser;
      setUser(safeUser);
      localStorage.setItem("edusync_user", JSON.stringify(safeUser));
    }
  }, []);

  function login(email, password) {
    const found = students.find(
      (s) => s.email === email && s.password === password
    );
    if (found) {
      const { password: _, ...safeUser } = found;
      setUser(safeUser);
      localStorage.setItem("edusync_user", JSON.stringify(safeUser));
      return { success: true };
    }
    return { success: false, message: "Invalid email or password" };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("edusync_user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
