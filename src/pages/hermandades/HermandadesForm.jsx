import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import RegisterShell from "../../components/register/RegisterShell";
import ProposalProgress from "../../components/form/ProposalProgress";
import ProposalSummaryCard from "../../components/form/ProposalSummaryCard";
import ProposalFormCard from "../../components/form/ProposalFormCard";

import ServiceDetails from "@components/form/ServiceDetails";
import ProcessionDetails from "@components/form/ProcessionDetails";
import OfferMessage from "@components/form/OfferMessage";

export default function ProposalPage() {
	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const bandName = "Agrupación Musical Virgen de los Reyes";

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
		setLoading(true);
		try {
			await new Promise(resolve => setTimeout(resolve, 2000));
			toast.success("¡Propuesta enviada con éxito!", {
				style: {
					borderRadius: '12px',
					background: '#1e1b4b',
					color: '#fff',
					fontWeight: 'bold',
				},
			});
			navigate("/");
		} catch (error) {
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
											Propuesta para:
										</p>
										<h2 className="text-2xl sm:text-4xl font-black text-base-content tracking-tight">
											{bandName}
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
