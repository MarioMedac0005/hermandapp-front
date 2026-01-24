export default function FeatureCard({ icon, title, description }) {
	return (
		<div className="card bg-base-100 shadow-sm hover:shadow-xl transition">
			<div className="card-body">
				<div className="w-14 h-14 flex items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
					<span className="material-symbols-outlined text-3xl">{icon}</span>
				</div>
				<h3 className="card-title">{title}</h3>
				<p className="text-sm text-base-content/70">{description}</p>
			</div>
		</div>
	);
}
