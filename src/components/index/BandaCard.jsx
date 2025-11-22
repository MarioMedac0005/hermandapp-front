export default function BandaCard() {
	return (
		<div className="card bg-base-100 w-full shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
			<figure className="overflow-hidden">
				<img
					src="src/assets/img/CardExample.png"
					alt="Foto de Banda"
					className="w-full h-64 object-cover transition-transform duration-300"
				/>
			</figure>
			<div className="card-body">
				<h2 className="card-title">La Macarena</h2>
				<p className="text-sm opacity-80">Sevilla</p>
			</div>
		</div>
	);
}
