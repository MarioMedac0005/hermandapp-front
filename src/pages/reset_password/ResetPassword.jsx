import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { API_ENDPOINTS } from "../../config/api";

function PasswordInput({ label, value, onChange, show, onToggle }) {
  return (
    <div>
      <div className="text-xs font-bold text-base-content/80 mb-2">
        {label}
      </div>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="********"
          className="input input-bordered w-full pr-14"
          required
        />

        <button
          type="button"
          className="btn btn-ghost btn-sm absolute right-2 top-1/2 -translate-y-1/2"
          onClick={onToggle}
          aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {show ? "🙈" : "👁️"}
        </button>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // URL Params
  const tokenParam = searchParams.get("token");
  const emailParam = searchParams.get("email");

  // Determine mode based on presence of token
  const isResetMode = !!tokenParam;

  // Form States
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [requestEmail, setRequestEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Visibility toggles
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  // Handle "Request Reset Link" (Forgot Password)
  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.forgotPassword, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: requestEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmailSent(true);
        toast.success("Correo enviado correctamente");
      } else {
        toast.error(data.message || "Error al enviar el correo");
      }
    } catch (error) {
      toast.error("Error de conexión");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle "Reset Password" (New Password)
  const handleResetSubmit = async (e) => {
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
            headers: {
                "Content-Type": "application/json",
            },
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

  // Render "Email Sent" success state
  if (emailSent && !isResetMode) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md card bg-base-100 shadow-xl">
          <div className="card-body p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">✉️</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Correo enviado</h2>
            <p className="text-base-content/60 mb-6">
              Hemos enviado un enlace de recuperación a <strong>{requestEmail}</strong>. Revisa tu bandeja de entrada.
            </p>
            <Link to="/login" className="btn btn-outline btn-block">
              Volver al Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-7">
            
            {/* Header */}
            <h1 className="text-3xl font-extrabold tracking-tight text-base-content mb-2">
              {isResetMode ? "Restablecer contraseña" : "Recuperar contraseña"}
            </h1>
            
            <p className="text-sm text-base-content/60 mb-8">
              {isResetMode 
                ? "Introduce tu nueva contraseña para finalizar el proceso." 
                : "Introduce tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña."}
            </p>

            {/* Email Feedback (Reset Mode) */}
            {isResetMode && emailParam && (
               <div className="mb-6 px-4 py-3 bg-base-200 rounded-lg flex items-center gap-3">
                  <div className="avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                      <span className="text-xs">@</span>
                    </div>
                  </div> 
                  <div>
                    <p className="text-xs font-bold uppercase text-base-content/50">Cuenta</p>
                    <p className="text-sm font-medium">{emailParam}</p>
                  </div>
               </div>
            )}

            {/* Invalid Link Warning (Reset Mode with missing params) */}
            {isResetMode && (!tokenParam || !emailParam) && (
                 <div className="mb-6 p-4 bg-error/10 text-error rounded-md text-sm flex items-start gap-2">
                    <span>⚠</span>
                    <span>Enlace inválido o incompleto. Por favor solicita un nuevo enlace.</span>
                 </div>
            )}

            {/* FORMS */}
            {isResetMode ? (
                // ---------------- RESET FORM ----------------
                <form onSubmit={handleResetSubmit}>
                    <div className="grid grid-cols-1 gap-6">
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
                    </div>

                    <p className="mt-4 text-xs text-base-content/40">
                        Usa al menos 8 caracteres. Te recomendamos combinar letras y números.
                    </p>

                    <div className="mt-8 flex items-center justify-between gap-3">
                        <Link to="/login" className="btn btn-ghost">
                            Cancelar
                        </Link>

                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={loading || !tokenParam || !emailParam}
                        >
                            {loading ? "Guardando..." : "Guardar contraseña"}
                        </button>
                    </div>
                </form>
            ) : (
                // ---------------- REQUEST FORM ----------------
                <form onSubmit={handleRequestSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Correo electrónico</span>
                        </label>
                        <input 
                            type="email" 
                            placeholder="ejemplo@correo.com" 
                            className="input input-bordered w-full" 
                            value={requestEmail}
                            onChange={(e) => setRequestEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mt-8 flex items-center justify-between gap-3">
                        <Link to="/login" className="btn btn-ghost">
                            Volver
                        </Link>

                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? "Enviando..." : "Enviar enlace"}
                        </button>
                    </div>
                </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
