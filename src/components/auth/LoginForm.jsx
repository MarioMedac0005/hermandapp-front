import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export default function LoginForm() {
    const navigate = useNavigate();

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
            const response = await fetch(
                import.meta.env.VITE_API_URL + "/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            if (!response.ok) {
                throw new Error("Credenciales incorrectas");
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);

            navigate("/");
        } catch (err) {
            setError(err.message);
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
                    className="input input-bordered w-full"
                    placeholder="ejemplo@email.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required/>
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
                        className="input input-bordered w-full pr-10"
                        placeholder="Introduce tu contraseña"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required/>

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
                className="btn bg-purple-800 text-white w-full"
                disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
            </button>
        </form>
    );
}
