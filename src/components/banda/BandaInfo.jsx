export default function BandaInfo({ banda }) {
	return (
		<main className="container mx-auto px-6 py-8 max-w-7xl">
			<div className="bg-white rounded-xl shadow divide-y">
				<Item label="Ciudad" value={banda.city} />
				<Item label="Lugar de ensayo" value={banda.rehearsal_space} />
				<Item label="Correo electrónico" value={banda.email} />
				<Item
					label="Fecha de creación"
					value={formatDate(banda.created_at)}
				/>
			</div>
		</main>
	);
}

function Item({ label, value }) {
	if (!value) return null;

	return (
		<div className="flex p-4">
			<span className="w-48 font-semibold text-gray-700">
				{label}
			</span>
			<span className="text-gray-600">{value}</span>
		</div>
	);
}

function formatDate(date) {
	return new Date(date).toLocaleDateString("es-ES");
}
