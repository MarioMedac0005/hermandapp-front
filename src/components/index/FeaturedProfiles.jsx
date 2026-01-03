import { useEffect, useState } from "react";
import ProfileCard from "./ui/ProfileCard";

export default function FeaturedProfiles() {
	const [profiles, setProfiles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchFeatured() {
			try {
				const response = await fetch(
					"https://daw23.arenadaw.com.es/api/featured"
				);

				if (!response.ok) {
					throw new Error("Error al obtener perfiles destacados");
				}

				const json = await response.json();
				setProfiles(json.data);
			} catch (err) {
				console.error(err);
				setError("No se pudieron cargar los perfiles destacados");
			} finally {
				setLoading(false);
			}
		}

		fetchFeatured();
	}, []);

	if (loading) {
		return (
			<section className="py-20 bg-base-200 text-center">
				<p>Cargando perfiles destacados…</p>
			</section>
		);
	}

	if (error) {
		return (
			<section className="py-20 bg-base-200 text-center text-error">
				<p>{error}</p>
			</section>
		);
	}

	return (
		<section className="py-20 bg-base-200">
			<div className="max-w-7xl mx-auto px-6">
				<div className="flex justify-between items-center mb-10">
					<h2 className="text-3xl font-bold">Perfiles Destacados</h2>
					<span className="link link-primary font-bold">
						Ver todos
					</span>
				</div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{profiles.map(profile => (
						<ProfileCard
							key={`${profile.type}-${profile.id}`}
							image={profile.image}
							name={profile.name}
							city={profile.city}
							entityType={profile.type}
							actionText="Próximamente"
						/>
					))}
				</div>
			</div>
		</section>
	);
}
