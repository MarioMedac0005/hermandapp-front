import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BandaHeader from "../../../components/banda/BandaHeader";
import BandaNav from "../../../components/banda/BandaNav";
import BandaInfo from "../../../components/banda/BandaInfo";
import BandaGaleria from "../../../components/banda/BandaGaleria";
import BandaDisponibilidad from "../../../components/banda/BandaDisponibilidad";
import BandaContratarCTA from "../../../components/banda/BandaContratarCTA";
import BandaRepertorio from "../../../components/banda/BandaRepertorio";
import { API_ENDPOINTS } from "../../../config/api";

function BandaPerfil() {
	const { band } = useParams();

	const [banda, setBanda] = useState(null);
	const [bookedDates, setBookedDates] = useState([]);
	const [repertoire, setRepertoire] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchBand() {
			try {
				const [bandResponse, datesResponse] = await Promise.all([
					fetch(`${API_ENDPOINTS.bands}/${band}`),
					fetch(`${API_ENDPOINTS.bands}/${band}/booked-dates`)
				]);

				if (!bandResponse.ok) {
					throw new Error("Error al obtener la banda");
				}

				const bandJson = await bandResponse.json();
				const bandData = bandJson.data;

				setBanda(bandData);
				setRepertoire(bandData.songs || []);

				if (datesResponse.ok) {
					const datesJson = await datesResponse.json();
					if (datesJson.success && Array.isArray(datesJson.data)) {
						const dates = datesJson.data.map(d => new Date(d));
						setBookedDates(dates);
					}
				}

			} catch (err) {
				console.error(err);
				setError("No se pudo cargar la banda");
			} finally {
				setLoading(false);
			}
		}

		fetchBand();
	}, [band]);

	if (loading) {
		return <p className="text-center mt-10">Cargando banda…</p>;
	}

	if (error) {
		return <p className="text-center mt-10 text-error">{error}</p>;
	}

	return (
		<div className="min-h-screen bg-gray-50 pb-12">
			<BandaHeader banda={banda} />

			<div className="sticky top-0 z-30 bg-gray-50/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
				<BandaNav
					hasRepertorio={repertoire.length > 0}
					hasGaleria={banda.media?.some(m => m.category === "gallery")}
				/>
			</div>
			<main className="container mx-auto px-6 py-6 max-w-6xl">
				<div className="flex flex-col gap-8">
					{/* CTA for Authed Users */}
					<BandaContratarCTA />

					<section id="historia" className="scroll-mt-32">
						<BandaInfo banda={banda} />
					</section>

					<section id="repertorio" className="scroll-mt-32">
						<BandaRepertorio songs={repertoire} />
					</section>

					{banda.media?.some(m => m.category === "gallery") && (
						<section id="galeria" className="scroll-mt-32">
							<BandaGaleria media={banda.media} />
						</section>
					)}
					<section id="disponibilidad" className="scroll-mt-32">
						<BandaDisponibilidad bookedDates={bookedDates} />
					</section>
				</div>
			</main>
		</div>
	);
}

export default BandaPerfil;
