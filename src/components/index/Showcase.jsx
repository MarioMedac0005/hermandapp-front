import HermandadFoto from "@assets/img/HermandadShowcase.png";
import BandasFoto from "@assets/img/BandasShowcase.webp";

export default function Showcase() {
	return (
		<section className="py-20 bg-base-100">
			<div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
				{/* Hermandades */}
				<div className="relative h-[480px] rounded-3xl overflow-hidden group">
					<img
						src={BandasFoto}
						className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
					/>
					<div className="absolute inset-0 bg-linear-to-t from-primary/90 to-transparent" />

					<div className="absolute bottom-0 left-0 p-10 text-white">
						<div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-white/20 px-3 py-1 backdrop-blur-md">
							<span className="text-xs font-bold uppercase text-white">Para Hermandades</span>
						</div>
						<h3 className="text-4xl font-black mb-3">Encuentra tu sonido</h3>
						<p className="mb-6 text-white/90 text-sm">
							Accede a la mayor base de datos de bandas de Andalucía.
						</p>
						<a className="link font-bold">
							<span className="inline-flex link-hover items-center">
								Explorar Bandas
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 ml-2" style={{ verticalAlign: 'middle', width: '16px', height: '16px' }}>
									<path fillRule="evenodd" d="M2 8c0 .414.336.75.75.75h8.69l-1.22 1.22a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 0-1.06l-2.5-2.5a.75.75 0 1 0-1.06 1.06l1.22 1.22H2.75A.75.75 0 0 0 2 8Z" clipRule="evenodd" />
								</svg>
							</span>
						</a>
					</div>
				</div>

				{/* Bandas */}
				<div className="relative h-[480px] rounded-3xl overflow-hidden group">
					<img
						src={HermandadFoto}
						alt="Bandas"
						className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
					/>
					<div className="absolute inset-0 bg-linear-to-t from-purple-900/90 to-transparent" />

					<div className="absolute bottom-0 left-0 p-10 text-white">
						<div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-white/20 px-3 py-1 backdrop-blur-md">
							<span className="text-xs font-bold uppercase text-white">Para Bandas</span>
						</div>
						<h3 className="text-4xl font-black mb-3">Muestra tu talento</h3>
						<p className="mb-6 text-white/90 text-sm">
							Consigue más contratos y gestiona tu agenda fácilmente.
						</p>
						<a className="link font-bold">
							<span className="inline-flex link-hover items-center">
								Crear Perfil
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 ml-2" style={{ verticalAlign: 'middle', width: '16px', height: '16px' }}>
									<path fillRule="evenodd" d="M2 8c0 .414.336.75.75.75h8.69l-1.22 1.22a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 0-1.06l-2.5-2.5a.75.75 0 1 0-1.06 1.06l1.22 1.22H2.75A.75.75 0 0 0 2 8Z" clipRule="evenodd" />
								</svg>
							</span>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
