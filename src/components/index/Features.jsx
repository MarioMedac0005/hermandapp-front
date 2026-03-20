import { MagnifyingGlassIcon, MusicalNoteIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";
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
						icon={<MagnifyingGlassIcon className="size-6" />}
						title="Búsqueda Inteligente"
						description="Filtra por estilo musical, disponibilidad geográfica y precio para encontrar el acompañamiento perfecto para tu estación de penitencia."
					/>
					<FeatureCard
						icon={<MusicalNoteIcon className="size-6" />}
						title="Perfil Multimedia"
						description="Las bandas pueden subir videos, audios y fotos de alta calidad para mostrar su repertorio y nivel musical a las hermandades."
					/>
					<FeatureCard
						icon={<ShieldCheckIcon className="size-6" />}
						title="Gestión Segura"
						description="Centraliza contratos, calendarios y comunicaciones en un entorno seguro y profesional, diseñado para juntas de gobierno."
					/>
				</div>
			</div>
		</section>
	);
}
