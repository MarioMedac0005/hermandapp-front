import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import HermandadHeader from "../../../components/hermandad/HermandadHeader";
import HermandadNav from "../../../components/hermandad/HermandadNav";
import HermandadStats from "../../../components/hermandad/HermandadStats";
import HermandadHistory from "../../../components/hermandad/HermandadHistory";
import HermandadContact from "../../../components/hermandad/HermandadContact";
import HermandadGallery from "../../../components/hermandad/HermandadGallery";
import HermandadCortejos from "../../../components/hermandad/HermandadCortejos";
import HermandadBandaCTA from "../../../components/hermandad/HermandadBandaCTA";


function HermandadPerfil() {
	const { brotherhood } = useParams();

	const [data, setData] = useState(null);
	const [processions, setProcessions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!brotherhood) {
			setLoading(false);
			return;
		}

		Promise.all([
			fetch(`https://daw23.arenadaw.com.es/api/brotherhoods/${brotherhood}`)
				.then(r => r.json()),
			fetch(`https://daw23.arenadaw.com.es/api/processions`)
				.then(r => r.json()),
		])
			.then(([brotherhoodRes, processionsRes]) => {
				setData(brotherhoodRes.data);

				const filtered = processionsRes.data.filter(
					p => p.brotherhood_id === Number(brotherhood)
				);

				setProcessions(filtered);
			})
			.catch(err => {
				console.error(err);
				setError("No se pudo cargar la hermandad");
			})
			.finally(() => setLoading(false));
	}, [brotherhood]);

	if (loading) return <div className="p-6">Cargando hermandad…</div>;
	if (error) return <div className="p-6 text-red-600">{error}</div>;
	if (!data) return <div className="p-6">Hermandad no encontrada</div>;

	const hasGaleria = data.media?.some(m => m.category === "gallery");
	const hasCortejos = processions.length > 0;

	return (
		<div className="min-h-screen bg-gray-50 pb-20">
			<HermandadHeader hermandad={data} />

			<div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 mt-[-4rem]">
				<HermandadNav
					hasHistoria
					hasGaleria={hasGaleria}
					hasCortejos={hasCortejos}
				/>
			</div>

			<main className="container mx-auto px-6 py-12 max-w-6xl">
				<div className="flex flex-col lg:flex-row gap-8">
					<section className="lg:w-2/3 space-y-16">
						<div id="historia" className="scroll-mt-32 space-y-8">
							<HermandadStats
								stats={{
									foundationYear: data.foundation_year,
									nazarenos: data.nazarenos,
									headquarters: data.office,
								}}
							/>

							<HermandadHistory
								name={data.name}
								city={data.city}
								description={data.description} // Assuming description exists in data if needed by History component, otherwise just name/city as before
							/>
						</div>
					</section>

					<aside className="lg:w-1/3 space-y-8">
						<HermandadContact hermandad={data} />
						<HermandadBandaCTA />
					</aside>
				</div>

				<div className="mt-16 space-y-16">
					{hasGaleria && (
						<section id="galeria" className="scroll-mt-32">
							<HermandadGallery media={data.media} />
						</section>
					)}
					
					{hasCortejos && (
						<section id="cortejos" className="scroll-mt-32">
							<HermandadCortejos cortejos={processions} />
						</section>
					)}
				</div>
			</main>
		</div>
	);
}

export default HermandadPerfil;
