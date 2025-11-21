export default function ProposalSidebar() {
	return (
		<div className="flex flex-col gap-4">

			{/* Resumen */}
			<div className="card bg-base-100 shadow p-6">
				<h3 className="text-md font-bold mb-2">Tu Propuesta</h3>

				<div className="text-sm">
					<p><strong>Para:</strong> A.M. Virgen de los Reyes</p>
					<p><strong>Fecha:</strong> Jueves, 17 de Abril, 2025</p>
					<p><strong>Tipo:</strong> Misterio</p>
					<p><strong>Momento:</strong> Tarde</p>
				</div>

				<p className="text-right text-xl font-bold text-primary mt-3">3.000 €</p>
			</div>

			{/* Contacto */}
			<div className="card bg-base-100 shadow p-6">
				<h3 className="text-md font-bold mb-2">Información de Contacto</h3>

				<p><strong>Hermandad:</strong> Hdad. del Gran Poder</p>
				<p><strong>Contacto:</strong> Juan Pérez</p>
				<p><strong>Cargo:</strong> Hermano Mayor</p>
			</div>

			{/* Botón */}
			<button className="btn btn-primary w-full">
				Enviar Propuesta
			</button>
		</div>
	);
}
