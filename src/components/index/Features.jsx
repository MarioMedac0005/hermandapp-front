import FeatureCard from "./ui/FeatureCard";

export default function Features() {
	return (
		<section className="py-20 bg-base-200">
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-14">
					<h2 className="text-4xl font-bold mb-4">
						¿Por qué unirte a HermandApp?
					</h2>
					<p className="text-sm text-base-content/70 max-w-2xl mx-auto">
						Diseñado específicamente para el mundo cofrade.
					</p>
				</div>
				<div className="grid md:grid-cols-3 gap-8">
					<FeatureCard
						icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
							<path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
						</svg>
						}
						title="Búsqueda Inteligente"
						description="Filtra por estilo musical, disponibilidad geográfica y precio para encontrar el acompañamiento perfecto para tu estación de penitencia."
					/>
					<FeatureCard
						icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
							<path fillRule="evenodd" d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z" clipRule="evenodd" />
						</svg>
						}
						title="Perfil Multimedia"
						description="Las bandas pueden subir videos, audios y fotos de alta calidad para mostrar su repertorio y nivel musical a las hermandades."
					/>
					<FeatureCard
						icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
							<path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
						</svg>
						}
						title="Gestión Segura"
						description="Centraliza contratos, calendarios y comunicaciones en un entorno seguro y profesional, diseñado para juntas de gobierno."
					/>
				</div>
			</div>
		</section>
	);
}
