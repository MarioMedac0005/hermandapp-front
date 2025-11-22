export default function CTASection() {
  return (
    <section className="px-10 py-12">
      <div className="bg-purple-100 rounded-lg p-8 text-center shadow-lg">
        <h3 className="text-4xl font-bold text-purple-800 mb-4 tracking-tight">
          ¿Eres una hermandad o una banda?
        </h3>
        <p className="text-gray-700 mb-6 text-lg">
          Únete a nuestra plataforma para conectar, gestionar contratos y llegar a una comunidad
          apasionada por la Semana Santa.
        </p>
        <button className="px-12 py-4 bg-purple-600 text-sm text-white rounded-lg shadow hover:bg-purple-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          Saber más
        </button>
      </div>
    </section>
  );
}
