import { InputText } from "primereact/inputtext";
import HeroImage from "@assets/img/HeroImage2.jpg";

export default function Hero() {
	const ciudades = [
		"Andalucía",
		"Almería",
		"Cádiz",
		"Córdoba",
		"Granada",
		"Huelva",
		"Jaén",
		"Málaga",
		"Sevilla",
	];

	return (
		<section className="relative flex items-center justify-center py-28 lg:py-36 overflow-hidden">
			<div className="absolute inset-0 z-0">
				<div className="absolute inset-0 bg-linear-to-r from-primary/70 via-primary/60 to-primary/40 mix-blend-multiply z-10" />
				<div className="absolute inset-0 bg-linear-to-b from-black/30 to-black/60 z-10" />

				<img
					src={HeroImage}
					alt="Procesión de Semana Santa en Andalucía"
					className="w-full h-full object-cover"
				/>
			</div>

			<div className="relative z-20 max-w-3xl mx-auto px-6 text-center text-white">
				<h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
					Siente el latido de <br />
					<span className="text-rotate inline-block">
						<span className="grid justify-items-center">
							{ciudades.map((nombre) => (
								<span key={nombre} className="bg-linear-to-r from-purple-200 to-white bg-clip-text text-transparent">
									{nombre}
								</span>
							))}
						</span>
					</span>
				</h1>

				<p className="text-lg md:text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
					La plataforma definitiva que une Hermandades y Bandas. Gestiona
					contratos, descubre talento y vive la Semana Santa como nunca antes.
				</p>

				<div className="flex justify-center">
					<InputText
						placeholder="Busca una banda o una hermandad..."
						className="w-full max-w-xl p-inputtext-md border! border-primary/60! focus:border-primary! focus:ring-2! focus:ring-primary/40! bg-white! text-base-content!"
					/>
				</div>
			</div>
		</section>
	);
}
