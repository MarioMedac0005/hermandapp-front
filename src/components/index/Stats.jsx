const stats = [
	{ value: "500+", label: "Bandas Registradas" },
	{ value: "300+", label: "Hermandades" },
	{ value: "1.2k", label: "Contratos Cerrados" },
	{ value: "8", label: "Provincias" },
];

export default function Stats() {
	return (
		<section className="py-10 bg-base-100">
			<div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
				{stats.map((stat) => (
					<div key={stat.label}>
						<p className="text-4xl font-black text-primary">{stat.value}</p>
						<p className="text-sm text-base-content/70 font-semibold">
							{stat.label}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
