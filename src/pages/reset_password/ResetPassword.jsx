import { useState } from "react";
import { Link } from "react-router-dom";

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
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-7">
            <h1 className="text-4xl font-extrabold tracking-tight text-base-content">
              Restablecer contraseña
            </h1>

            <p className="mt-2 text-sm text-base-content/60">
              Introduce tu nueva contraseña para finalizar el proceso.
            </p>

            {/* Campos */}
            <div className="mt-10 grid grid-cols-1 gap-6">
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

            {/* Acciones */}
            <div className="mt-10 flex items-center justify-between gap-3">
              <Link to="/login" className="btn btn-ghost">
                Volver
              </Link>

              <button type="button" className="btn btn-primary">
                Guardar contraseña <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-base-content/40">
          Si no solicitaste este cambio, puedes ignorar este mensaje.
        </div>
      </div>
    </div>
  );
}
