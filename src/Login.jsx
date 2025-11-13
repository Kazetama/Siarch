import { useState } from "react";
import { useAuth } from "../src/context/AuthContext.jsx";
import Button from "../src/components/atoms/Button.jsx";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50 font-sans">
      <div className="w-11/12 max-w-sm p-8 bg-white shadow-xl rounded-3xl shadow-pink-100/50 md:p-10">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl">
            Admin Login
          </h2>
          <p className="mt-2 text-gray-500">
            Selamat datang! Silakan masuk.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Masukkan username Anda"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-xl
                         transition-all duration-300
                         focus:outline-none focus:border-pink-300 
                         focus:ring-2 focus:ring-pink-200"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Masukkan password Anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-xl
                         transition-all duration-300
                         focus:outline-none focus:border-pink-300 
                         focus:ring-2 focus:ring-pink-200"
            />
          </div>

          {/* Reusable Button */}
          <Button
            type="submit"
            text="Login"
            className="w-full py-3 font-semibold text-pink-700 rounded-xl
                       bg-gradient-to-r from-pink-100 to-pink-200 
                       transition-all duration-300
                       hover:shadow-lg hover:shadow-pink-200/60 hover:-translate-y-0.5
                       active:scale-[.98] active:translate-y-0"
          />
        </form>
      </div>
    </div>
  );
}
