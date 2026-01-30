import React from "react";

export default function Preguntas() {
  const faqs = [
    {
      question: "¿Cómo registro mi hermandad?",
      answer: "Puedes registrar tu hermandad desde el botón de registro seleccionando el perfil de organización."
    },
    {
      question: "¿Tienen aplicación móvil?",
      answer: "Sí, HermandApp está disponible para iOS y Android en sus respectivas tiendas."
    },
    {
      question: "¿Cómo se contratan las bandas?",
      answer: "Las hermandades pueden enviar solicitudes de presupuesto directamente a las bandas desde su perfil verificado."
    },
  ];

  return (
    <section>
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[#8a01e5]">
        Preguntas Frecuentes
      </h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details key={index} className="group bg-white rounded-2xl border border-[#8a01e5]/20 shadow-sm hover:shadow-md transition-all overflow-hidden open:border-[#8a01e5]">
            <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-semibold text-[#140d1b]">
              <span className="group-open:text-[#8a01e5] transition-colors">{faq.question}</span>
            </summary>
            <div className="p-5 pt-0 text-gray-600 text-sm leading-relaxed">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
