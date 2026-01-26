import React from "react";

export default function Info() {
  return (
    <section>
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#734c9a]">
        Información de contacto
      </h3>
      <div className="grid gap-3">
        <div className="flex items-center gap-3 p-4 rounded-xl border border-[#dbcfe7]/50 bg-white shadow-sm">
          <div className="bg-[#734c9a]/10 p-2 rounded-lg text-[#734c9a] flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">mail</span>
          </div>
          <div>
            <p className="font-bold text-xs uppercase tracking-wider text-[#734c9a]">Correo Electrónico</p>
            <p className="text-sm font-small text-gray-800">soporte@hermandapp.es</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-xl border border-[#dbcfe7]/50 bg-white shadow-sm">
          <div className="bg-[#734c9a]/10 p-2 rounded-lg text-[#734c9a] flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">call</span>
          </div>
          <div>
            <p className="font-bold text-xs uppercase tracking-wider text-[#734c9a]">Teléfono</p>
            <p className="text-sm font-small text-gray-800">+34 954 123 456</p>
          </div>
        </div>
      </div>
    </section>
  );
}
