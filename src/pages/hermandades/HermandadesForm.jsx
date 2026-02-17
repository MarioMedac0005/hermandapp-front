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
    console.log("HermandadesForm User:", user);
    console.log("HermandadesForm Processions:", user?.brotherhood?.processions);
    
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
		performance_type: "",
		performance_date: null,
		approximate_route: "",
		duration: "",
		minimum_musicians: "",
		amount: "",
		additional_information: ""
	});

    const processions = user?.brotherhood?.processions || [];

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


	const validateStep = () => {
		const newErrors = {};
		if (step === 1) {
			if (!formData.performance_type) newErrors.performance_type = "Selecciona un tipo de actuación";
			if (!formData.performance_date) newErrors.performance_date = "Selecciona una fecha";
		} else if (step === 2) {
			// approximate_route is nullable in schema, but maybe good to require it? User didn't specify.
            // Schema says nullable, but usually user wants some info. I'll make it optional if it says nullable?
            // "text('approximate_route')->nullable();"
            // But let's check previous code. "Indica los detalles del recorrido".
            // I'll keep it required for better UX unless explicitly told otherwise, or maybe warn?
            // Actually, if it's nullable in backend, I can allow empty. But for a proposal, it's usually needed.
            // Let's stick to previous behavior: required.
			if (!formData.approximate_route?.trim()) newErrors.approximate_route = "Indica el recorrido aproximado";
			if (!formData.duration) newErrors.duration = "Indica la duración estimada";
            if (!formData.minimum_musicians) newErrors.minimum_musicians = "Indica los músicos mínimos";
		} else if (step === 3) {
            // amount is nullable in schema, but clearly should be filled for a proposal?
            // "decimal('amount', 10, 2)->nullable();"
            // I'll keep it validatable.
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
			navigate(-1);
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
            // Format date as YYYY-MM-DD for MySQL date (not datetime)
            const dateStr = formData.performance_date.toISOString().split('T')[0];

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
								{step === 1 && <ServiceDetails formData={formData} updateField={updateField} errors={errors} processions={processions} />}
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
