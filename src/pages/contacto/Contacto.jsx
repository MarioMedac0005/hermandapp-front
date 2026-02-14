import React from "react";
import Info from "@components/contacto/Info";
import Preguntas from "@components/contacto/Preguntas";
import Formulario from "@components/contacto/Form";

export default function Contacto() {
  return (
    <div className="bg-gray-50 font-display text-[#140d1b] min-h-screen">
      <main className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="mb-12 text-center lg:text-left">
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-[#8a01e5] mb-4">Contacto</h2>
          <p className="text-lg text-gray-600 max-w-2xl">
  Ponte en contacto con nosotros para cualquier duda o sugerencia.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-10">
            <Info />
            <Preguntas />
          </div>
          <div className="sticky top-24">
            <Formulario />
          </div>
        </div>
      </main>
    </div>
  );
}
