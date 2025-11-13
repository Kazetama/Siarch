import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    // Ambil status login dari sessionStorage
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return sessionStorage.getItem("isLoggedIn") === "true";
    });

    // Update sessionStorage setiap isLoggedIn berubah
    useEffect(() => {
        sessionStorage.setItem("isLoggedIn", isLoggedIn);
    }, [isLoggedIn]);

    const login = (username, password) => {
        if (username === "taci" && password === "taciadmin") {
            setIsLoggedIn(true);
            navigate("/home");
        } else {
            alert("Username atau password salah!");
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        sessionStorage.removeItem("isLoggedIn"); // bersihin session
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
