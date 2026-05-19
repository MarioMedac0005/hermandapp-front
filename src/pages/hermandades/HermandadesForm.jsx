import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSafeNavigate } from "../../hooks/useSafeNavigate";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import { API_ENDPOINTS } from "@config/api";

import RegisterShell from "../../components/register/RegisterShell";
import ProposalProgress from "../../components/form/ProposalProgress";
import ProposalSummaryCard from "../../components/form/ProposalSummaryCard";
import ProposalFormCard from "../../components/form/ProposalFormCard";

import ServiceDetails from "@components/form/ServiceDetails";
import ProcessionDetails from "@components/form/ProcessionDetails";
import OfferMessage from "@components/form/OfferMessage";

export default function ProposalPage() {
	const { bandId } = useParams();
	const { user } = useAuth();

	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(false);
	const [fetchingBand, setFetchingBand] = useState(true);
	const [band, setBand] = useState(null);
	const [bookedDates, setBookedDates] = useState([]);
	const [detailedProcessions, setDetailedProcessions] = useState([]);
	const [errors, setErrors] = useState({});
	const { navigate, safeBack } = useSafeNavigate();

	useEffect(() => {
		const fetchBand = async () => {
			try {
				const [bandResponse, datesResponse] = await Promise.all([
					fetch(`${API_ENDPOINTS.bands}/${bandId}`),
					fetch(API_ENDPOINTS.bandBookedDates(bandId))
				]);

				if (bandResponse.ok) {
					const data = await bandResponse.json();
					setBand(data.data);
				} else {
					toast.error("No se pudo cargar la información de la banda");
					safeBack("/busqueda");
				}

				if (datesResponse.ok) {
					const datesJson = await datesResponse.json();
					if (datesJson.success && Array.isArray(datesJson.data)) {
						const dates = datesJson.data.map(d => {
							const [year, month, day] = d.split('-');
							return new Date(year, parseInt(month) - 1, day);
						});
						setBookedDates(dates);
					}
				}
			} catch (error) {
				console.error("Error fetching band:", error);
				toast.error("Error de conexión");
			} finally {
				setFetchingBand(false);
			}
		};

		fetchBand();
	}, [bandId, navigate]);

	const getBrotherhoodId = () => {
		if (user?.brotherhood_id) return user.brotherhood_id;
		if (user?.brotherhood?.id) return user.brotherhood.id;
		// Fallback: extract from avatar url if id is missing in object
		if (user?.avatar) {
			const match = user.avatar.match(/brotherhoods\/(\d+)\//);
			if (match) return parseInt(match[1]);
		}
		return null;
	};

	useEffect(() => {
		const fetchProcessions = async () => {
			if (!user?.brotherhood) return;
			const bId = getBrotherhoodId();
			try {
				const response = await fetch(API_ENDPOINTS.processions);
				if (response.ok) {
					const json = await response.json();
					const allProcessions = json.data || json || [];
					const filtered = allProcessions.filter(p => p.brotherhood_id == bId || (p.brotherhood && p.brotherhood.id == bId));
					setDetailedProcessions(filtered);
				}
			} catch (error) {
				console.error("Error fetching processions:", error);
			}
		};
		fetchProcessions();
	}, [user]);

	const [formData, setFormData] = useState({
		performance_type: "",
		performance_date: null,
		approximate_route: "",
		duration: "",
		minimum_musicians: "",
		amount: "",
		additional_information: ""
	});

	const processions = detailedProcessions.length > 0 ? detailedProcessions : (user?.brotherhood?.processions || []);

	// Helper to update field and clear error in real-time
	const updateField = (name, value) => {
		setFormData(prev => ({ ...prev, [name]: value }));
		if (errors[name]) {
			setErrors(prev => {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			});
		}
	};



	const validateStep = () => {
		const newErrors = {};
		if (step === 1) {
			if (!formData.performance_type) newErrors.performance_type = "Selecciona un tipo de actuación";
			if (!formData.performance_date) newErrors.performance_date = "Selecciona una fecha";
            if (formData.performance_type === 'procession' && !formData.procession_id) {
                newErrors.procession_id = "Selecciona una procesión";
            }
		} else if (step === 2) {
			if (formData.performance_type !== 'procession') {
				if (!formData.approximate_route) newErrors.approximate_route = "Indica los detalles del recorrido";
			}
			if (!formData.duration) newErrors.duration = "Indica la duración estimada";
			if (!formData.minimum_musicians) newErrors.minimum_musicians = "Indica los músicos mínimos";
		} else if (step === 3) {
			if (!formData.amount || Number(formData.amount) <= 0) newErrors.amount = "Indica un importe válido";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleNext = () => {
		if (validateStep()) {
			if (step < 3) {
				setStep(s => s + 1);
				window.scrollTo({ top: 0, behavior: 'smooth' });
			} else {
				handleFinalSubmit();
			}
		}
	};

	const handleBack = () => {
		if (step > 1) {
			setStep(s => s - 1);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
			safeBack("/");
		}
	};

	const handleFinalSubmit = async () => {
		const brotherhoodId = getBrotherhoodId();

		if (!brotherhoodId) {
			toast.error("Debes ser gestor de una hermandad para enviar propuestas");
			return;
		}

		setLoading(true);
		try {
			const token = localStorage.getItem("token");
			const d = formData.performance_date;
			const year = d.getFullYear();
			const month = String(d.getMonth() + 1).padStart(2, '0');
			const day = String(d.getDate()).padStart(2, '0');
			const dateStr = `${year}-${month}-${day}`;

			const response = await fetch(API_ENDPOINTS.contracts, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json",
				},
				body: JSON.stringify({
					performance_type: formData.performance_type,
					performance_date: dateStr,
					procession_id: formData.procession_id || null, // Ensure processing_id is sent
					approximate_route: formData.approximate_route,
					duration: parseInt(formData.duration),
					minimum_musicians: parseInt(formData.minimum_musicians),
					amount: parseFloat(formData.amount),
					additional_information: formData.additional_information,
					band_id: bandId,
					brotherhood_id: brotherhoodId,
					status: 'pending' // Assuming status is still used
				}),
			});

			if (response.ok) {
				toast.success("¡Propuesta enviada con éxito!", {
					style: {
						borderRadius: '12px',
						background: '#1e1b4b',
						color: '#fff',
						fontWeight: 'bold',
					},
				});
				navigate("/hermandad/panel/contratos");
			} else {
				const errorData = await response.json();
				toast.error(errorData.message || "Error al enviar la propuesta");
			}
		} catch (error) {
			console.error("Submit error:", error);
			toast.error("Error al enviar la propuesta");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-[#f8fafc] flex flex-col items-center py-12 px-4 selection:bg-[#8a01e5]/10 selection:text-[#8a01e5]">
			<div className="w-full max-w-6xl">
				<RegisterShell
					left={
						<div className="flex flex-col gap-6 lg:sticky lg:top-12">
							<ProposalProgress step={step} />
							<ProposalSummaryCard formData={formData} />
						</div>
					}
					right={
						<ProposalFormCard
							step={step}
							title={
								step === 1 ? "Detalles del Servicio" :
									step === 2 ? "Detalles de la Procesión" :
										"Oferta Económica"
							}
							subtitle={
								<div className="flex flex-col gap-2">
									<div className="flex flex-col gap-0.5">
										<p className="text-[#8a01e5] font-black uppercase tracking-[0.2em] text-[11px]">
											Propuesta de {user?.organization || "Hermandad"} para:
										</p>
										<h2 className="text-2xl sm:text-2xl font-black text-base-content tracking-tight">
											{fetchingBand ? "Cargando..." : (band?.name || "Banda")}
										</h2>
									</div>
									<p className="text-base-content/40 font-medium text-sm">
										{step === 1 ? "Configura el tipo de evento y la fecha en que se realizará el servicio." :
											step === 2 ? "Indica los puntos clave del recorrido y la duración estimada del evento." :
												"Define el importe de tu propuesta y añade un mensaje personalizado para la banda."}
									</p>
								</div>
							}
							primaryText={step === 3 ? (loading ? "Enviando..." : "Finalizar Propuesta") : "Siguiente"}
							secondaryText={step === 1 ? "Cancelar" : "Atrás"}
							onPrimary={handleNext}
							onSecondary={handleBack}
							loading={loading}
							isLastStep={step === 3}
						>
							<div className="mt-2">
								{step === 1 && <ServiceDetails formData={formData} updateField={updateField} errors={errors} processions={processions} bookedDates={bookedDates} />}
								{step === 2 && <ProcessionDetails formData={formData} updateField={updateField} errors={errors} processions={processions} />}
								{step === 3 && <OfferMessage formData={formData} updateField={updateField} errors={errors} />}
							</div>
						</ProposalFormCard>
					}
				/>
			</div>
		</div>
	);
}
