import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BandaHeader from "../../../components/banda/BandaHeader";
import BandaNav from "../../../components/banda/BandaNav";
import BandaInfo from "../../../components/banda/BandaInfo";
import BandaGaleria from "../../../components/banda/BandaGaleria";
import BandaDisponibilidad from "../../../components/banda/BandaDisponibilidad";
import BandaContractCTA from "../../../components/banda/BandaContractCTA";

function BandaPerfil() {
	const { band } = useParams();

	const [banda, setBanda] = useState(null);
	const [bookedDates, setBookedDates] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchBand() {
			try {
				const [bandResponse, datesResponse] = await Promise.all([
					fetch(`https://daw23.arenadaw.com.es/api/bands/${band}`),
					fetch(`https://daw23.arenadaw.com.es/api/bands/${band}/booked-dates`)
				]);

				if (!bandResponse.ok) {
					throw new Error("Error al obtener la banda");
				}

				const bandJson = await bandResponse.json();
				setBanda(bandJson.data);

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
		<div className="min-h-screen bg-gray-100">
			<BandaHeader banda={banda} />

			<BandaNav
				hasGaleria={banda.media?.some(m => m.category === "gallery")}
			/>

			<main className="container mx-auto px-6 py-8 max-w-7xl">
				<div className="flex flex-col lg:flex-row gap-8">
					<div className="lg:w-2/3 space-y-10">
						<section id="historia">
							<BandaInfo banda={banda} />
						</section>

						{banda.media?.some(m => m.category === "gallery") && (
							<section id="galeria">
								<BandaGaleria media={banda.media} />
							</section>
						)}

						<section id="disponibilidad">
							<BandaDisponibilidad bookedDates={bookedDates} />
						</section>
					</div>

					<aside className="lg:w-1/3">
						<div className="sticky top-24">
							<BandaContractCTA bandId={banda.id} />
						</div>
					</aside>
				</div>
			</main>
		</div>
	);
}

export default BandaPerfil;
