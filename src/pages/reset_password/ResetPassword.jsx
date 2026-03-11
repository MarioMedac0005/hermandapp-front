import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { API_ENDPOINTS } from "../../config/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

function PasswordInput({ label, value, onChange, show, onToggle }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="••••••••"
          className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:border-[#8a01e5] focus:ring-1 focus:ring-[#8a01e5] outline-none transition-all"
          required
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={onToggle}
          aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {show ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const tokenParam = searchParams.get("token");
  const emailParam = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.resetPassword, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: tokenParam,
          email: emailParam,
          password,
          password_confirmation: confirm,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Contraseña restablecida correctamente");
        navigate("/login");
      } else {
        toast.error(data.message || "Error al restablecer la contraseña");
      }
    } catch (error) {
      toast.error("Error de conexión");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Enlace inválido (faltan parámetros)
  if (!tokenParam || !emailParam) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center space-y-4">
            <p className="text-red-600 font-medium">Enlace inválido o expirado.</p>
            <Link
              to="/login"
              className="inline-block text-sm text-[#8a01e5] hover:underline"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Cabecera */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 rounded-full mb-4">
            <ShieldCheckIcon className="w-7 h-7 text-[#8a01e5]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Restablecer contraseña</h1>
          <p className="text-sm text-gray-500 mt-1">Introduce tu nueva contraseña para finalizar el proceso.</p>
        </div>

        {/* Tarjeta */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 space-y-5">

          {/* Email de la cuenta */}
          <div className="flex items-center gap-3 px-4 py-3 bg-purple-50 border border-purple-100 rounded-lg">
            <div className="w-8 h-8 bg-[#8a01e5] rounded-full flex items-center justify-center shrink-0">
              <EnvelopeIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">Cuenta</p>
              <p className="text-sm font-medium text-gray-700">{emailParam}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <PasswordInput
              label="Nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              show={show1}
              onToggle={() => setShow1((v) => !v)}
            />
            <PasswordInput
              label="Confirmar contraseña"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              show={show2}
              onToggle={() => setShow2((v) => !v)}
            />

            <p className="text-xs text-gray-400">
              Usa al menos 8 caracteres. Combina letras y números para mayor seguridad.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <Link
                to="/login"
                className="flex-1 py-2.5 text-center border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium text-sm"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 bg-[#8a01e5] hover:bg-[#7000b8] text-white font-semibold rounded-lg transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed text-sm active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Guardando...
                  </span>
                ) : (
                  "Guardar contraseña"
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
      </div>
      <Footer />
    </div>
  );
}
