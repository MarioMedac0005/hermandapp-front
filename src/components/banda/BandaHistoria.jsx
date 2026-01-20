export default function BandaHistoria({ banda }) {
	return (
		<section>
			<h2 className="text-2xl font-semibold mb-6">Información</h2>

			<div className="bg-white rounded-xl shadow divide-y">
				<Item label="Ciudad" value={banda.city} />
				<Item label="Lugar de ensayo" value={banda.rehearsal_space} />
				<Item label="Correo" value={banda.email} />
			</div>
		</section>
	);
}

function Item({ label, value }) {
	if (!value) return null;

	return (
		<div className="flex p-4">
			<span className="w-48 font-semibold">{label}</span>
			<span className="text-gray-600">{value}</span>
		</div>
	);
}
