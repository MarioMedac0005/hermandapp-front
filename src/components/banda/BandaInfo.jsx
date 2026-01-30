export default function BandaInfo({ banda }) {
	return (
		<section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
			<h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
				<span className="w-1.5 h-8 bg-purple-600 rounded-full"></span>
				Información
			</h2>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
				{/* History Section */}
				<div className="lg:col-span-2">
					<h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
						Historia
					</h3>
					<div className="prose prose-lg text-gray-700 max-w-none leading-relaxed">
						{banda.description || "Sin descripción disponible."}
					</div>
				</div>

				{/* Quick Facts Side */}
				<div className="space-y-6 lg:border-l lg:border-gray-100 lg:pl-8">
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
			<h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
				{label}
			</h3>
			<p className="text-lg font-medium text-gray-900 bg-gray-50 rounded-lg px-4 py-2 border border-gray-100">
				{value}
			</p>
		</div>
	);
}


