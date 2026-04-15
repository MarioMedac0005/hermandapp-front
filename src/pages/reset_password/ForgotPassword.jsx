import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { API_ENDPOINTS } from "../../config/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ShieldExclamationIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Por favor, introduce tu correo electrónico.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.forgotPassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // Incluso si falla o existe, por motivos de seguridad solemos indicar que se envió correctamente.
      if (response.ok) {
        setSuccess(true);
        toast.success("Enlace de recuperación enviado. Revisa tu bandeja de entrada.");
      } else {
        const data = await response.json();
        toast.error(data.message || "Error al solicitar la recuperación.");
      }
    } catch (error) {
      toast.error("Error de conexión con el servidor.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Cabecera */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 rounded-full mb-4">
              <ShieldExclamationIcon className="w-7 h-7 text-[#8a01e5]" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Recuperar contraseña</h1>
            <p className="text-sm text-gray-500 mt-1">
              Introduce el correo asociado a tu cuenta y te enviaremos las instrucciones para restablecer tu contraseña.
            </p>
          </div>

          {/* Tarjeta de Formulario */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
            {success ? (
              <div className="text-center space-y-4">
                <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm mb-4">
                  Si la cuenta existe, hemos enviado un enlace de recuperación a <strong>{email}</strong>. Por favor, revisa también la carpeta de spam.
                </div>
                <Link
                  to="/login"
                  className="inline-block w-full py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all shadow-sm text-sm"
                >
                  Volver al inicio de sesión
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@email.com"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:border-[#8a01e5] focus:ring-1 focus:ring-[#8a01e5] outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-[#8a01e5] hover:bg-[#7000b8] text-white font-semibold rounded-lg transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed text-sm active:scale-[0.98] cursor-pointer"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Enviando...
                      </span>
                    ) : (
                      "Enviar enlace de recuperación"
                    )}
                  </button>
                </div>

                <div className="text-center pt-2">
                  <Link
                    to="/login"
                    className="text-sm text-gray-500 hover:text-[#8a01e5] transition-colors"
                  >
                    Volver al inicio de sesión
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
