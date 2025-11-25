export default function ProposalSidebar() {
	return (
		<div className="flex flex-col gap-6 sticky top-6">

			{/* Resumen */}
			<div className="card bg-base-100 shadow p-6">
				<h3 className="text-lg font-bold mb-3">Tu Propuesta</h3>

				<div className="text-base space-y-1">
					<p><strong>Para:</strong> A.M. Virgen de los Reyes</p>
					<p><strong>Fecha:</strong> Jueves, 17 de Abril, 2025</p>
					<p><strong>Tipo:</strong> Misterio</p>
					<p><strong>Momento:</strong> Tarde</p>
				</div>

				<p className="text-right text-2xl font-bold text-purple-700 mt-4">3.000 €</p>
			</div>

			{/* Contacto */}
			<div className="card bg-base-100 shadow p-6">
				<h3 className="text-lg font-bold mb-3">Información de Contacto</h3>

				<div className="text-base space-y-1">
					<p><strong>Hermandad:</strong> Hdad. del Gran Poder</p>
					<p><strong>Contacto:</strong> Juan Pérez</p>
					<p><strong>Cargo:</strong> Hermano Mayor</p>
				</div>
			</div>

			{/* Botón */}
			<button className="btn w-full text-lg bg-purple-700 text-amber-50 hover:bg-purple-800">
				Enviar Propuesta
			</button>
		</div>
	);
}
