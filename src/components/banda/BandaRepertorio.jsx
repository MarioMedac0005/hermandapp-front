export default function BandaRepertorio({ repertorio }) {
	return (
		<section>
			<h2 className="text-2xl font-semibold mb-4">
				Repertorio Musical
			</h2>

			{repertorio.length === 0 ? (
				<p className="text-gray-500">No disponible</p>
			) : (
				<div className="grid md:grid-cols-3 gap-4">
					{repertorio.map((obra, i) => (
						<div key={i} className="bg-white p-4 rounded-lg shadow">
							<p className="font-semibold">{obra.titulo}</p>
							<p className="text-sm text-gray-500">
								{obra.autor}
							</p>
						</div>
					))}
				</div>
			)}
		</section>
	);
}
