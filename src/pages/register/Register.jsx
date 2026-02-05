import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import RegisterShell from "../../components/register/RegisterShell";
import ProgressCard from "../../components/register/ProgressCard";
import RegisterFormCard from "../../components/register/RegisterFormCard";
import Footer from "../../components/Footer";

import RegisterStep1Identity from "../../components/register/RegisterStep1Identity";
import Step2Account from "../../components/register/Step2Account";
import Step3Confirm from "../../components/register/Step3Confirm";

import { API_ENDPOINTS } from "../../config/api";

export default function Register() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [orgData, setOrgData] = useState({
    orgType: "brotherhood",
    // Brotherhood
    brotherhoodName: "",
    brotherhoodCity: "",
    brotherhoodNifCif: "",
    brotherhoodEmail: "",
    brotherhoodCanonicalSeat: "",
    brotherhoodPhone: "",
    // Band
    bandName: "",
    bandCity: "",
    bandNifCif: "",
    bandEmail: "",
    bandDescription: "",
    bandRehearsalPlace: "",
  });

  const [accountData, setAccountData] = useState({
    firstName: "",
    lastName: "",
    userEmail: "",
  });

  // Helpers
  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "");

  const isPhone = (value) => {
    const v = (value || "").trim();
    // Solo números, longitud 9-15
    return /^[0-9]{9,15}$/.test(v);
  };

  const isNifCif = (value) => {
    const v = (value || "").trim().toUpperCase();

    // DNI: 8 dígitos + letra
    const dni = /^[0-9]{8}[A-Z]$/;
    // NIE: X/Y/Z + 7 dígitos + letra
    const nie = /^[XYZ][0-9]{7}[A-Z]$/;
    // CIF: letra + 7 dígitos + [0-9A-J]
    const cif = /^[ABCDEFGHJNPQRSUVW][0-9]{7}[0-9A-J]$/;

    return dni.test(v) || nie.test(v) || cif.test(v);
  };

  const clearFieldError = (field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  };

  const firstErrorMessage = (errs) => {
    const firstKey = Object.keys(errs)[0];
    return firstKey ? errs[firstKey] : null;
  };

  const handleOrgChange = (e) => {
    const { name, value } = e.target;
    setOrgData((s) => ({ ...s, [name]: value }));
    clearFieldError(name);
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountData((s) => ({ ...s, [name]: value }));
    clearFieldError(name);
  };

  const cityLabels = {
    Sevilla: "Sevilla",
    Malaga: "Málaga",
    Cadiz: "Cádiz",
    Granada: "Granada",
    Almeria: "Almería",
    Cordoba: "Córdoba",
    Huelva: "Huelva",
    Jaen: "Jaén",
  };

  const validateStep = (currentStep) => {
    const nextErrors = {};

    if (currentStep === 1) {
      if (orgData.orgType === "brotherhood") {
        if (!orgData.brotherhoodName.trim())
          nextErrors.brotherhoodName = "El nombre es obligatorio.";

        if (!orgData.brotherhoodCity)
          nextErrors.brotherhoodCity = "La ciudad es obligatoria.";

        // NIF/CIF + regex
        if (!orgData.brotherhoodNifCif.trim())
          nextErrors.brotherhoodNifCif = "El NIF/CIF es obligatorio.";
        else if (!isNifCif(orgData.brotherhoodNifCif))
          nextErrors.brotherhoodNifCif = "El NIF/CIF no tiene un formato válido.";

        if (!orgData.brotherhoodCanonicalSeat.trim())
          nextErrors.brotherhoodCanonicalSeat = "La sede canónica es obligatoria.";

        // Teléfono + solo números + longitud
        if (!orgData.brotherhoodPhone.trim())
          nextErrors.brotherhoodPhone = "El teléfono es obligatorio.";
        else if (!isPhone(orgData.brotherhoodPhone))
          nextErrors.brotherhoodPhone = "El teléfono debe tener solo números (9–15).";

        // Email
        if (!orgData.brotherhoodEmail.trim())
          nextErrors.brotherhoodEmail = "El email es obligatorio.";
        else if (!isEmail(orgData.brotherhoodEmail))
          nextErrors.brotherhoodEmail = "El email no tiene un formato válido.";
      } else {
        if (!orgData.bandName.trim())
          nextErrors.bandName = "El nombre de la banda es obligatorio.";

        if (!orgData.bandCity)
          nextErrors.bandCity = "La ciudad es obligatoria.";

        if (!orgData.bandRehearsalPlace.trim())
          nextErrors.bandRehearsalPlace = "El sitio de ensayo es obligatorio.";

        // NIF/CIF + regex
        if (!orgData.bandNifCif.trim())
          nextErrors.bandNifCif = "El NIF/CIF es obligatorio.";
        else if (!isNifCif(orgData.bandNifCif))
          nextErrors.bandNifCif = "El NIF/CIF no tiene un formato válido.";

        // Email
        if (!orgData.bandEmail.trim())
          nextErrors.bandEmail = "El email es obligatorio.";
        else if (!isEmail(orgData.bandEmail))
          nextErrors.bandEmail = "El email no tiene un formato válido.";

        // bandDescription opcional (no se valida)
      }
    }

    if (currentStep === 2) {
      if (!accountData.firstName.trim())
        nextErrors.firstName = "El nombre es obligatorio.";

      if (!accountData.lastName.trim())
        nextErrors.lastName = "Los apellidos son obligatorios.";

      if (!accountData.userEmail.trim())
        nextErrors.userEmail = "El email es obligatorio.";
      else if (!isEmail(accountData.userEmail))
        nextErrors.userEmail = "El email no tiene un formato válido.";
    }

    setErrors(nextErrors);

    return {
      ok: Object.keys(nextErrors).length === 0,
      message: firstErrorMessage(nextErrors),
    };
  };

  const handleSubmit = async () => {
    // Revalidar todo antes de enviar
    const v1 = validateStep(1);
    if (!v1.ok) {
      toast.error(v1.message || "Revisa el Paso 1.");
      setStep(1);
      return;
    }

    const v2 = validateStep(2);
    if (!v2.ok) {
      toast.error(v2.message || "Revisa el Paso 2.");
      setStep(2);
      return;
    }

    setLoading(true);

    const payload = {
      type: orgData.orgType,
      user: {
        name: accountData.firstName,
        surname: accountData.lastName,
        email: accountData.userEmail,
      },
      organization: {},
    };

    if (orgData.orgType === "brotherhood") {
      payload.organization = {
        name: orgData.brotherhoodName,
        city: orgData.brotherhoodCity,
        nifCif: orgData.brotherhoodNifCif,
        email: orgData.brotherhoodEmail,
        canonicalSeat: orgData.brotherhoodCanonicalSeat,
        phone: orgData.brotherhoodPhone,
      };
    } else {
      payload.organization = {
        name: orgData.bandName,
        city: orgData.bandCity,
        nifCif: orgData.bandNifCif,
        email: orgData.bandEmail,
        description: orgData.bandDescription,
        rehearsalPlace: orgData.bandRehearsalPlace,
      };
    }

    try {
      const response = await fetch(API_ENDPOINTS.register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Error en el registro");

      toast.success(data.message || "Registro completado con éxito");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message || "Hubo un error al procesar el registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Navbar />

      <div className="flex-1 flex justify-center px-4 py-8">
        <RegisterShell
          left={
            <div className="grid gap-4">
              <ProgressCard step={step} />
            </div>
          }
          right={
            <RegisterFormCard
              secondaryText={step === 1 ? "Cancelar" : "Atrás"}
              primaryText={
                step === 3 ? (
                  loading ? "Enviando..." : "Finalizar registro"
                ) : (
                  <>
                    Siguiente Paso <span aria-hidden="true">→</span>
                  </>
                )
              }
              onSecondary={() => {
                if (step > 1) setStep((s) => s - 1);
                else navigate("/");
              }}
              onPrimary={() => {
                if (step < 3) {
                  const v = validateStep(step);
                  if (!v.ok) {
                    toast.error(v.message || "Revisa los campos obligatorios.");
                    return;
                  }
                  setStep((s) => s + 1);
                } else {
                  handleSubmit();
                }
              }}
            >
              {step === 1 && (
                <RegisterStep1Identity
                  values={orgData}
                  onChange={handleOrgChange}
                  errors={errors}
                />
              )}

              {step === 2 && (
                <Step2Account
                  values={accountData}
                  onChange={handleAccountChange}
                  errors={errors}
                />
              )}

              {step === 3 && (
                <Step3Confirm
                  org={orgData}
                  account={accountData}
                  cityLabels={cityLabels}
                />
              )}
            </RegisterFormCard>
          }
        />
      </div>

      <Footer />
    </div>
  );
}
