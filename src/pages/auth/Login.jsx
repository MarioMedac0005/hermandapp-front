import { Link } from "react-router-dom";
import LoginForm from "@components/auth/LoginForm";



export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
            <div className="w-full max-w-md">
                {/* Logo / título */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-semibold">Iniciar sesión</h1>
                </div>

                {/* Card */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <LoginForm />

                        <div className="divider my-6">o</div>

                        {/* Links inferiores (solo vista) */}
                        <div className="flex flex-col gap-3 text-sm">
                            <Link to="/" className="link link-hover text-center">
                                Volver al inicio
                            </Link>

                            <p className="text-center text-sm">
                                ¿No tienes cuenta?{" "}
                                <Link to="/register" className="link link-primary">
                                    Crear cuenta
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}