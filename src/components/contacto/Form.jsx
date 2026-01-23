import React from "react";

export default function Form() {
  return (
    <div className="bg-white p-8 rounded-2xl border border-[#dbcfe7]/50 shadow-lg shadow-purple-900/5">
      <h3 className="text-2xl font-bold mb-2 text-[#734c9a]">Escríbenos</h3>
      <p className="text-gray-600 mb-8 max-w-md">
        Completa el siguiente formulario y nos pondremos en contacto contigo lo antes posible.
      </p>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#734c9a]">Nombre Completo</label>
            <input type="text" placeholder="Ej. Juan Pérez" className="w-full rounded-xl border border-[#dbcfe7] bg-white p-3 text-sm focus:border-[#734c9a] focus:ring-[#734c9a] transition-all outline-none" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#734c9a]">Correo Electrónico</label>
            <input type="email" placeholder="juan@ejemplo.com" className="w-full rounded-xl border border-[#dbcfe7] bg-white p-3 text-sm focus:border-[#734c9a] focus:ring-[#734c9a] transition-all outline-none" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-[#734c9a]">Asunto</label>
          <div className="relative">
            <select className="w-full appearance-none rounded-xl border border-[#dbcfe7] bg-white p-3 text-sm focus:border-[#734c9a] focus:ring-[#734c9a] transition-all outline-none">
              <option value="soporte">Soporte Técnico</option>
              <option value="contratacion">Información de Contratación</option>
              <option value="registro">Problemas con el registro</option>
              <option value="otros">Otros</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-[#734c9a]">Mensaje</label>
          <textarea rows="5" placeholder="Cuéntanos en qué podemos ayudarte..." className="w-full rounded-xl border border-[#dbcfe7] bg-white p-3 text-sm focus:border-[#734c9a] focus:ring-[#734c9a] transition-all outline-none resize-none" />
        </div>
        <div className="flex items-start gap-3">
          <input type="checkbox" id="privacy" className="mt-1 rounded border-[#dbcfe7] text-[#734c9a] focus:ring-[#734c9a]" />
          <label htmlFor="privacy" className="text-xs text-gray-500 leading-normal cursor-pointer select-none">
            He leído y acepto la política de privacidad y el tratamiento de mis datos personales para la resolución de mi consulta.
          </label>
        </div>
        <button type="submit" className="w-full bg-[#734c9a] hover:bg-[#5e3d7d] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-purple-900/10 hover:shadow-purple-900/20 flex items-center justify-center gap-2 transform active:scale-[0.99]">
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
}
