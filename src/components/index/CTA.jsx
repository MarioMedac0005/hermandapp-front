export default function CTA() {
	return (
		<section className="relative overflow-hidden py-24">
			<div className="absolute inset-0 bg-primary z-0">
				{/* Abstract Pattern */}
				<svg
					className="absolute left-0 top-0 h-full w-full opacity-10"
					preserveAspectRatio="none"
					viewBox="0 0 100 100"
				>
					<path d="M0 100 C 20 0 50 0 100 100 Z" fill="white"></path>
				</svg>
			</div>
			<div className="container relative z-10 mx-auto px-5 lg:px-10">
				<div className="mx-auto flex max-w-4xl flex-col items-center text-center">
					<h2 className="mb-6 text-3xl font-black text-white md:text-5xl">
						Únete a la comunidad cofrade más grande
					</h2>
					<p className="mb-10 max-w-2xl text-lg text-purple-100 md:text-xl">
						Ya sea que busques una banda para tu paso de palio o quieras tocar
						en las mejores procesiones de Andalucía, este es tu lugar.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<button className="btn btn-lg bg-white text-primary">
							Crear cuenta gratis
						</button>
						<button className="btn btn-lg btn-outline text-white hover:bg-white/10">
							Contactar soporte
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}


