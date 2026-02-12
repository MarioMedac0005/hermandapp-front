import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		const fetchBand = async () => {
			try {
				const response = await fetch(`${API_ENDPOINTS.bands}/${bandId}`);
				if (response.ok) {
					const data = await response.json();
					setBand(data.data);
				} else {
					toast.error("No se pudo cargar la información de la banda");
					navigate(-1);
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

	const [formData, setFormData] = useState({
		serviceType: "",
		moment: "",
		date: null,
		processionDetails: "",
		duration: "",
		offer: "",
		message: ""
	});

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
			if (!formData.serviceType) newErrors.serviceType = "Selecciona un tipo de servicio";
			if (!formData.moment) newErrors.moment = "Selecciona un horario";
			if (!formData.date) newErrors.date = "Selecciona una fecha";
		} else if (step === 2) {
			if (!formData.processionDetails?.trim()) newErrors.processionDetails = "Indica los detalles del recorrido";
			if (!formData.duration) newErrors.duration = "Indica la duración estimada";
		} else if (step === 3) {
			if (!formData.offer || Number(formData.offer) <= 0) newErrors.offer = "Indica una oferta económica válida (mínimo 1€)";
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
			navigate(-1);
		}
	};

	const handleFinalSubmit = async () => {
		if (!user?.brotherhood_id) {
			toast.error("Debes ser gestor de una hermandad para enviar propuestas");
			return;
		}

		setLoading(true);
		try {
			const token = localStorage.getItem("token");
			const response = await fetch(API_ENDPOINTS.contracts, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json",
				},
				body: JSON.stringify({
					date: formData.date.toISOString().slice(0, 19).replace('T', ' '), // MySQL datetime format
					amount: parseFloat(formData.offer),
					description: `Tipo: ${formData.serviceType}. Horario: ${formData.moment}. Recorrido: ${formData.processionDetails}. Duración: ${formData.duration}. Mensaje: ${formData.message}`,
					band_id: bandId,
					brotherhood_id: user.brotherhood_id,
					status: 'pending'
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
										<h2 className="text-2xl sm:text-4xl font-black text-base-content tracking-tight">
											{fetchingBand ? "Cargando..." : (band?.name || "Banda")}
										</h2>
									</div>
									<p className="mt-2 text-base-content/40 font-medium">
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
							<div className="mt-6">
								{step === 1 && <ServiceDetails formData={formData} updateField={updateField} errors={errors} />}
								{step === 2 && <ProcessionDetails formData={formData} updateField={updateField} errors={errors} />}
								{step === 3 && <OfferMessage formData={formData} updateField={updateField} errors={errors} />}
							</div>
						</ProposalFormCard>
					}
				/>
			</div>
		</div>
	);
}
