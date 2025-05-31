import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
      const payload = parseJwt(token);
      setUserId(payload?.userId || null);
    }
  }, []);

  const setAuth = (token) => {
    if (token) {
      localStorage.setItem("token", token);
      const payload = parseJwt(token);
      setUserId(payload?.userId || null);
    }
    setIsAuth(true);
  };

  const unAuth = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setUserId(null);
  };

  return (
    <ThemeContext.Provider value={{ isAuth, setAuth, unAuth, userId }}>
      {children}
    </ThemeContext.Provider>
  );
};

function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch (e) {
    console.error("Invalid token:", e);
    return null;
  }
}