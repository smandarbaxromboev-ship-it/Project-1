    
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (password === "111") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      setError("Неверный пароль");
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Panel
            </h1>

            <p className="text-gray-500 mt-2">
              Войдите, чтобы продолжить
            </p>
          </div>

          <form onSubmit={handleLogin}>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Пароль
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Введите пароль"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none transition focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            />

            {error && (
              <p className="text-red-500 text-sm mt-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full mt-6 bg-black text-white py-3 rounded-xl font-medium transition hover:bg-gray-800 active:scale-[0.98]"
            >
              Войти
            </button>

          </form>

        </div>

        <p className="text-center text-gray-400 text-sm mt-5">
          Панель управления
        </p>

      </div>

    </div>
  );
}

export default AdminLogin;
