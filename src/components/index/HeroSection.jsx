import SearchBar from "./SearchBar";

export default function HeroSection() {
	return (
		<section className="w-full flex justify-center px-15 mt-5">
			<div className="relative w-full h-[420px] rounded-xl overflow-hidden">

				<img src="/src/assets/img/Hero.webp" alt="Imagen Hero" className="absolute inset-0 w-full h-full object-cover" />

				<div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />

				<div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-6">
					<h1 className="text-4xl font-bold mb-4">
						La Pasión de Andalucía, a tu alcance
					</h1>

					<p className="text-lg mb-6">Encuentra, sigue y conecta con las hermandades y bandas que dan vida a la Semana Santa</p>

					<SearchBar />
				</div>

			</div>
		</section>
	);
}
