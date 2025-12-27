import ProfileCard from "./ui/ProfileCard";

export default function FeaturedProfiles() {
	return (
		<section className="py-20 bg-base-200">
			<div className="max-w-7xl mx-auto px-6">
				<div className="flex justify-between items-center mb-10">
					<h2 className="text-3xl font-bold">Perfiles Destacados</h2>
					<a className="link link-primary font-bold">Ver todos</a>
				</div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<ProfileCard
						image="https://lh3.googleusercontent.com/aida-public/AB6AXuAu0XTRAAvWOipSYc_apz9g1V4or2h2rz8mNEaEKaeJi9zok-RjawkBON-u9BRE9005diDE6ReqQscg4ZQkpD9YN_WUUh9eS513SnqIwqU2OGXVD-fHEHlHT26x7mYrOsvkl3SAfkZmRtVbycoMSoEHMaejZzeNeNKUnDDnEfbhu55CrHh_OmHe-BMhxF1YHSS2quH-00ZYpr3OPoLWhQJgTNC7XL3sAH2CZ4epyZf3pj4d-IFtTGlbJs7fumzajxAY9hrbKbW88wI"
						location="Sevilla"
						name="Banda CCTT Tres Caídas"
						type="Cornetas y Tambores"
						rating={5}
						reviews={120}
						actionText="Ver Perfil"
					/>

					<ProfileCard
						image="https://lh3.googleusercontent.com/aida-public/AB6AXuAkqiJABy0HhDaws2sqBrTm3k96wcYnZLH6tTPDEcyFe5sZcLKyUDGdT1feiznwdhaGAekSAWzkI1jRrMh_DgfwSSa8Qq5azTZCdQinxenFH2LcmYBrKYrekXbzkstQskj7hPV2zHbkWQgzlQ9IcPM0JbzA-xXb6VAXU_Eadj0qmSWTJSSQ-4dp0igyH-7XQHeTmDxeQ_Xyx1OzwhkKAyE9vRGDhn4XLfEkNYgMdmY7JWprFFfBpAav1klPrbFqCQi8uqDb8ll53ys"
						location="Málaga"
						name="A.M. La Redención"
						type="Agrupación Musical"
						rating={4}
						reviews={85}
						actionText="Ver Perfil"
					/>

					<ProfileCard
						image="https://lh3.googleusercontent.com/aida-public/AB6AXuBx_wHIy5NAiVouqgVEo2CqKVVfbBLRqADAsJYdLYXXlzi2WgwbYIbrDi28ngL7SmbMGp2GtMLtFQ-xRaD-mRfqQVuvarOgHE810qmW90ElVnHpeqlHd4u7UoCU8jnjdAFS1JrdA-ACT8NIoUq_0tmvEPUcGNLE4cNqgVFz0rj3iUPK2sHn31xFYhH1ovoTBmh01eS-W_Nl437HV38iGniCbtsXEHzaNeoomhffM5jQdNd_-y3cYTeeLhoI6gcETLZSL1M4wnn8lc0"
						location="Córdoba"
						name="Hdad. de la Esperanza"
						type="Hermandad de Penitencia"
						actionText="Contactar"
					/>

					<ProfileCard
						image="https://lh3.googleusercontent.com/aida-public/AB6AXuDVoEKWvGXmAos_tvpEDVfAaRv1Lw7ULEhgXJ1N9RLMa4tLqYtQGT3xGHwxUXQlNWCY8nii3C9gBEg-hOyZ4R3pmESN5w3mspDT9Bwla_fDE9v6X2tQD8jYpibmq13rILz7TweWl4oN5I6ZfWH8eJX6PAzSQZwG0fafrMCH_NhBZ2cnCauj2-2GZ2SRRWLMDrpJtBS885G7NPho9tRFhQErgfUZaHM0dn41CrEX8K1dK3Mr_tSYulNF8zYJhfIMmCzBk44x64KCU7Q"
						location="Cádiz"
						name="B.M. Maestro Dueñas"
						type="Banda de Música"
						rating={5}
						reviews={92}
						actionText="Ver Perfil"
					/>
				</div>
			</div>
		</section>
	);
}
