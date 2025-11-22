
export default function Home() {
  return (
    <div className="w-full">

      {/* === HERO SECTION === */}
      <header
        className="relative h-[420px] w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('/images/hero.jpg')", // cambia por tu imagen local
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="relative text-center text-white px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            La Pasión de Andalucía, a tu alcance
          </h1>
          <p className="text-lg md:text-xl">
            Encuentra, sigue y conecta con las hermandades y bandas que dan vida a la Semana Santa.
          </p>

          {/* Buscador */}
          <div className="mt-6 flex justify-center">
            <input
              type="text"
              placeholder="Busca una hermandad o una banda..."
              className="input input-bordered w-full max-w-md rounded-r-none"
            />
            <button className="btn btn-primary rounded-l-none">Buscar</button>
          </div>
        </div>
      </header>

      {/* === Hermandades Populares === */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-semibold mb-6">Hermandades Populares</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Card
            title="La Macarena"
            city="Sevilla"
            img="/images/hermandades/macarena.jpg"
          />
          <Card
            title="Esperanza de Triana"
            city="Sevilla"
            img="/images/hermandades/triana.jpg"
          />
          <Card
            title="El Gran Poder"
            city="Sevilla"
            img="/images/hermandades/granpoder.jpg"
          />
          <Card
            title="El Cachorro"
            city="Sevilla"
            img="/images/hermandades/cachorro.jpg"
          />
        </div>
      </section>

      {/* === Bandas Destacadas === */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <h2 className="text-2xl font-semibold mb-6">Bandas Destacadas</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Card
            title="Las Cigarreras"
            city="Sevilla"
            img="/images/bandas/cigarreras.jpg"
          />
          <Card
            title="Tres Caídas de Triana"
            city="Sevilla"
            img="/images/bandas/trescaidas.jpg"
          />
          <Card
            title="Rosario de Cádiz"
            city="Cádiz"
            img="/images/bandas/rosario.jpg"
          />
          <Card
            title="Pasión de Linares"
            city="Linares"
            img="/images/bandas/linares.jpg"
          />
        </div>
      </section>

      {/* === CTA === */}
      <section className="bg-purple-100 mt-16 py-10 text-center">
        <h3 className="text-lg font-semibold mb-3">
          ¿Eres una hermandad o una banda?
        </h3>
        <p className="mb-4">
          Únete a nuestra plataforma para conectar, gestionar contratos y llegar a una comunidad apasionada por la Semana Santa.
        </p>

        <button className="btn btn-primary">Saber más</button>
      </section>
    </div>
  );
}
