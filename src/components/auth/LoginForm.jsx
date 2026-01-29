import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { API_ENDPOINTS } from "@config/api";
import { useAuth } from "@contexts/AuthContext";

export default function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch(API_ENDPOINTS.login,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            if (!response.ok) {
                if (response.status === 401 || response.status === 422) {
                    throw new Error("Credenciales incorrectas");
                }

                if (response.status >= 500) {
                    throw new Error("Error inesperado. Inténtalo más tarde.");
                }

                // Fallback
                throw new Error("Error inesperado. Inténtalo más tarde.");
            }

            const data = await response.json();

            // Esperar a que el contexto cargue el usuario y nos devuelva sus datos
            const user = await login(data.access_token, data.user);



            switch (user.panel) {
                case 'admin':
                    navigate("/admin-panel/dashboard");
                    break;
                case 'gestor_banda':
                    navigate("/banda/panel/informacion");
                    break;
                case 'gestor_hermandad':
                    navigate("/hermandad/panel/informacion");
                    break;
                default:
                    navigate("/");
                    break;
            }

        } catch (err) {
            if (err instanceof TypeError) {
                setError("Error inesperado. Inténtalo más tarde.");
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };



    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control">
                <label className="label mb-2">
                    <span className="label-text font-medium">Email</span>
                </label>
                <input
                    type="email"
                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:border-[#8a01e5] focus:ring-1 focus:ring-[#8a01e5] transition-all outline-none"
                    placeholder="ejemplo@email.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
            </div>

            <div className="form-control">
                <label className="label mb-2">
                    <span className="label-text font-medium">
                        Contraseña
                    </span>
                </label>

                <div className="relative z-0">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:border-[#8a01e5] focus:ring-1 focus:ring-[#8a01e5] transition-all outline-none pr-10"
                        placeholder="Introduce tu contraseña"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 z-10 flex items-center text-base-content/70 hover:text-base-content"
                        aria-label={
                            showPassword
                                ? "Ocultar contraseña"
                                : "Mostrar contraseña"
                        }>
                        {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                            <EyeIcon className="h-5 w-5" />
                        )}
                    </button>
                </div>

                <div className="mt-2 flex items-center justify-between">
                    <span className="text-md text-error min-h-4">
                        {error}
                    </span>

                    <Link to="/forgot-password" className="label text-sm link link-hover">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>

            </div>


            <button
                type="submit"
                className="w-full bg-[#8a01e5] hover:bg-[#7000b8] text-white font-bold py-3 rounded-lg transition-all shadow-md active:scale-[0.98]"
                disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
            </button>
        </form >
    );
}
