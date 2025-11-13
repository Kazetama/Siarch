import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import { AuthProvider, useAuth } from "../src/context/AuthContext.jsx";
import { TransactionProvider } from "../src/context/TransactionContext.jsx";

import Login from "./Login.jsx";
import Home from "./Home.jsx";
import Input from "./components/atoms/Input.jsx";
import Create from "./Create.jsx";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TransactionProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/input" element={<PrivateRoute><Input /></PrivateRoute>} />
            <Route path="/create" element={<PrivateRoute><Create /></PrivateRoute>} />
          </Routes>
        </TransactionProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
