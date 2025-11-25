export default function ProcessionDetails() {
	return (
		<div className="card bg-base-100 shadow p-6">
			<h2 className="text-lg font-bold mb-4">2. Detalles de la Procesión</h2>

			<textarea
				className="textarea textarea-bordered w-full"
				placeholder="Lugar de salida, recogida, horas clave..."
				rows={4}
			></textarea>

			<div className="mt-4">
				<input
					type="number"
					placeholder="Duración estimada (horas)"
					className="input input-bordered w-full"
				/>
			</div>
		</div>
	);
}
