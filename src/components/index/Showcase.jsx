import { Link } from "react-router-dom";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

import HermandadFoto from "@assets/img/HermandadShowcase.png";
import BandasFoto from "@assets/img/BandasShowcase.webp";

export default function Showcase() {
	return (
		<section className="py-20 bg-base-100">
			<div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
				<div className="relative h-[480px] rounded-3xl overflow-hidden group">
					<img
						src={BandasFoto}
						alt="Bandas"
						className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
					/>
					<div className="absolute inset-0 bg-linear-to-t from-primary/90 to-transparent" />

					<div className="absolute bottom-0 left-0 p-10 text-white">
						<div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-white/20 px-3 py-1 backdrop-blur-md">
							<span className="text-xs font-bold uppercase">Para Hermandades</span>
						</div>

						<h3 className="text-4xl font-black mb-3">Encuentra tu sonido</h3>

						<p className="mb-6 text-white/90 text-sm">Accede a la mayor base de datos de bandas de Andalucía.</p>

						<Link
							to="/busqueda?type=band"
							className="inline-flex items-center font-bold link-hover">
							Explorar Bandas
							<ArrowLongRightIcon className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
						</Link>
					</div>
				</div>

				<div className="relative h-[480px] rounded-3xl overflow-hidden group">
					<img
						src={HermandadFoto}
						alt="Hermandades"
						className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
					/>
					<div className="absolute inset-0 bg-linear-to-t from-purple-900/90 to-transparent" />

					<div className="absolute bottom-0 left-0 p-10 text-white">
						<div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-white/20 px-3 py-1 backdrop-blur-md">
							<span className="text-xs font-bold uppercase">Para Bandas</span>
						</div>

						<h3 className="text-4xl font-black mb-3">Muestra tu talento</h3>

						<p className="mb-6 text-white/90 text-sm">Consigue más contratos y gestiona tu agenda fácilmente.</p>

						<Link
							to="/busqueda?type=brotherhood"
							className="inline-flex items-center font-bold link-hover"
						>
							Buscar Hermandades
							<ArrowLongRightIcon className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
						</Link>
					</div>
				</div>

			</div>
		</section>
	);
}
