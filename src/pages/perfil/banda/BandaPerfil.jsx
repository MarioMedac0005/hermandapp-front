import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BandaHeader from "../../../components/banda/BandaHeader";
import BandaNav from "../../../components/banda/BandaNav";
import BandaHistoria from "../../../components/banda/BandaHistoria";
import BandaGaleria from "../../../components/banda/BandaGaleria";
import BandaDisponibilidad from "../../../components/banda/BandaDisponibilidad";

function BandaPerfil() {
	const { band } = useParams();

	const [banda, setBanda] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchBand() {
			try {
				const response = await fetch(
					`https://daw23.arenadaw.com.es/api/bands/${band}`
				);

				if (!response.ok) {
					throw new Error("Error al obtener la banda");
				}

				const json = await response.json();
				setBanda(json.data);
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
				hasGaleria={banda.media?.some(m => m.category === "galeria")}
			/>

			<main className="container mx-auto px-6 py-8 max-w-7xl">
				<div className="flex flex-col space-y-10">
					<section id="historia">
						<BandaHistoria banda={banda} />
					</section>

					{banda.media?.some(m => m.category === "galeria") && (
						<section id="galeria">
							<BandaGaleria media={banda.media} />
						</section>
					)}

					<section id="disponibilidad">
						<BandaDisponibilidad />
					</section>
				</div>
			</main>
		</div>
	);
}

export default BandaPerfil;
