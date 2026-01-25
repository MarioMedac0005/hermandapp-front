import { Link } from "react-router-dom";
import LoginForm from "@components/auth/LoginForm";
import Footer from "@components/Footer";

export default function Login() {
    return (
        <div className="min-h-screen flex flex-col bg-base-200">
            <div className="flex-1 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-md">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-semibold">Iniciar sesión</h1>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <LoginForm />

                            <div className="divider my-6">o</div>

                            <div className="flex flex-col gap-3 text-sm">
                                <Link to="/" className="link link-hover text-center">
                                    Volver al inicio
                                </Link>

                                <p className="text-center">
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
            <Footer />
        </div>
    );
}