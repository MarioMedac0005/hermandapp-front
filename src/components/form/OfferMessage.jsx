export default function OfferMessage() {
	return (
		<div className="card bg-base-100 shadow p-6">
			<h2 className="text-lg font-bold mb-4">3. Oferta y Mensaje</h2>

			<input
				type="number"
				className="input input-bordered w-full"
				placeholder="€ 3000"
			/>

			<textarea
				className="textarea textarea-bordered w-full mt-4"
				placeholder="Añade aquí cualquier detalle adicional..."
				rows={4}
			></textarea>
		</div>
	);
}
