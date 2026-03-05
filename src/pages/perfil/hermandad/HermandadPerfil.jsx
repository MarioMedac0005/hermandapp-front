import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import HermandadHeader from "../../../components/hermandad/HermandadHeader";
import HermandadNav from "../../../components/hermandad/HermandadNav";
import HermandadStats from "../../../components/hermandad/HermandadStats";
import HermandadHistory from "../../../components/hermandad/HermandadHistory";
import HermandadContact from "../../../components/hermandad/HermandadContact";
import HermandadGallery from "../../../components/hermandad/HermandadGallery";
import HermandadCortejos from "../../../components/hermandad/HermandadCortejos";

import { API_ENDPOINTS } from "@/config/api";

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
			fetch(`${API_ENDPOINTS.brotherhoods}/${brotherhood}`)
				.then(r => r.json()),
			fetch(`${API_ENDPOINTS.processions}?brotherhood_id=${brotherhood}&status=published`)
				.then(r => r.json()),
		])
			.then(([brotherhoodRes, processionsRes]) => {
				setData(brotherhoodRes.data);
				// Filter out past processions (maintain same logic as HermandadCortejos)
				const upcoming = (processionsRes.data || []).filter(c => {
					const raw = c.checkout_time ?? c.date;
					if (!raw) return false;
					const normalized = raw.includes(" ") ? raw.replace(" ", "T") : raw;
					const parsed = new Date(normalized);
					if (Number.isNaN(parsed.getTime())) return false;

					const today = new Date();
					today.setHours(0, 0, 0, 0);
					const checkoutDay = new Date(parsed);
					checkoutDay.setHours(0, 0, 0, 0);

					return checkoutDay >= today;
				});
				setProcessions(upcoming);
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
	const hasProcesiones = processions.length > 0;

	return (
		<div className="min-h-screen bg-gray-50 pb-12">
			<HermandadHeader hermandad={data} />

			<div className="sticky top-0 z-30 bg-gray-50/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
				<HermandadNav
					hasHistoria
					hasGaleria={hasGaleria}
					hasProcesiones={hasProcesiones}
				/>
			</div>

			<main className="container mx-auto px-6 py-6 max-w-6xl">
				<div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
					<section className="lg:w-2/3 space-y-8">
						<div id="historia" className="scroll-mt-32 space-y-6">
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
								description={data.description}
							/>
						</div>

						{hasGaleria && (
							<section id="galeria" className="scroll-mt-32">
								<HermandadGallery media={data.media} />
							</section>
						)}

						{hasProcesiones ? (
							<section id="procesiones" className="scroll-mt-32">
								<HermandadCortejos cortejos={processions} />
							</section>
						) : (
							<section id="procesiones" className="scroll-mt-32">
								<div className="bg-white rounded-3xl p-12 text-center border border-gray-200/50 shadow-sm">
									<h3 className="text-lg font-bold text-gray-900 mb-1">No hay procesiones disponibles</h3>
									<p className="text-gray-500 text-sm max-w-xs mx-auto">Esta hermandad aún no ha publicado recorridos de sus procesiones.</p>
								</div>
							</section>
						)}
					</section>
					<aside className="lg:w-1/3 space-y-6">
						<div className="sticky top-32 space-y-6">
							<HermandadContact hermandad={data} />
						</div>
					</aside>
				</div>
			</main>
		</div>
	);
}

export default HermandadPerfil;
