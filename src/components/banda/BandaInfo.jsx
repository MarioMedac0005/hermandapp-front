export default function BandaInfo({ banda }) {
	return (
		<section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
				{/* History Section */}
				<div className="md:col-span-2">
					<h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
						Historia & Descripción
					</h3>
					<div className="prose prose-sm md:prose-base text-gray-600 max-w-none leading-relaxed">
						{banda.description || "Sin descripción disponible."}
					</div>
				</div>

				{/* Quick Facts Side */}
				<div className="space-y-4 md:border-l md:border-gray-100 md:pl-6">
					<InfoItem label="Ciudad" value={banda.city} />
					<InfoItem label="Lugar de ensayo" value={banda.rehearsal_space} />
				</div>
			</div>
		</section>
	);
}

function InfoItem({ label, value }) {
	if (!value) return null;

	return (
		<div>
			<h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
				{label}
			</h3>
			<p className="text-base font-medium text-gray-900">
				{value}
			</p>
		</div>
	);
}
