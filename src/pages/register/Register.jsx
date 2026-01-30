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
  const navigate = useNavigate();

  const [orgData, setOrgData] = useState({
    orgType: "brotherhood",
    // Brotherhood specific
    brotherhoodName: "",
    brotherhoodCity: "",
    brotherhoodNifCif: "",
    brotherhoodEmail: "",
    brotherhoodCanonicalSeat: "",
    brotherhoodPhone: "",
    // Band specific
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

  const handleOrgChange = (e) => {
    const { name, value } = e.target;
    setOrgData((s) => ({ ...s, [name]: value }));
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountData((s) => ({ ...s, [name]: value }));
  };

  const cityLabels = {
    sevilla: "Sevilla",
    malaga: "Málaga",
    cadiz: "Cádiz",
    granada: "Granada",
  };

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      orgType: orgData.orgType,
      account: {
        firstName: accountData.firstName,
        lastName: accountData.lastName,
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

      if (!response.ok) {
        throw new Error(data.message || "Error en el registro");
      }

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex justify-center px-4 py-12">
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
                if (step > 1) {
                  setStep((s) => s - 1);
                } else {
                  navigate("/");
                }
              }}
              onPrimary={() => {
                if (step < 3) {
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
                />
              )}

              {step === 2 && (
                <Step2Account values={accountData} onChange={handleAccountChange} />
              )}

              {step === 3 && (
                <Step3Confirm org={orgData} account={accountData} cityLabels={cityLabels} />
              )}
            </RegisterFormCard>
          }
        />
      </div>

      <Footer />
    </div>
  );
}
