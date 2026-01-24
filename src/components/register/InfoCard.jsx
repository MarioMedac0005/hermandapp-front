export default function InfoCard() {
  return (
    <div className="card shadow-xl bg-gradient-to-br from-primary to-secondary text-primary-content">
      <div className="card-body p-5 grid gap-2 content-center min-h-[120px]">
        <div className="h-9 w-9 rounded-xl bg-white/15 flex items-center justify-center text-sm">
          💡
        </div>
        <p className="text-sm leading-relaxed opacity-95">
          ¿Sabías que HermandApp ayuda a más de 500 hermandades a gestionar sus ensayos y salidas procesionales?
        </p>
      </div>
    </div>
  );
}
