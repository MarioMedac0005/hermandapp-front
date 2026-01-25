export default function BandaInfo({ banda }) {
	return (
		<section>
			<h2 className="text-2xl font-semibold mb-6">Información</h2>

			<div className="bg-white rounded-xl shadow divide-y">
				<Item label="Historia" value={banda.description} />
				<Item label="Ciudad" value={banda.city} />
				<Item label="Lugar de ensayo" value={banda.rehearsal_space} />
			</div>
		</section>
	);
}

function Item({ label, value }) {
	if (!value) return null;

	return (
		<div className="flex gap-4 p-4">
			<span className="w-32 sm:w-48 shrink-0 font-semibold text-lg">
				{label}
			</span>


			<p className="flex-1 text-gray-800 whitespace-normal wrap-break-words">
				{value}
			</p>
		</div>
	);
}


