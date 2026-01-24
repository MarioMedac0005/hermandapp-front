import { useState } from "react";
import RegisterShell from "../../components/register/RegisterShell";
import ProgressCard from "../../components/register/ProgressCard";
import RegisterFormCard from "../../components/register/RegisterFormCard";
import FooterLinks from "../../components/register/FooterLinks";

import RegisterStep1Identity from "../../components/register/RegisterStep1Identity";
import Step2Account from "../../components/register/Step2Account";
import Step3Confirm from "../../components/register/Step3Confirm";

export default function Register() {
  const [step, setStep] = useState(1);

  const [orgData, setOrgData] = useState({
    orgType: "brotherhood",
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

  return (
    <div className="min-h-screen bg-base-200 flex justify-center px-4 py-8">
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
              step === 3 ? "Finalizar registro" : (
                <>
                  Siguiente Paso <span aria-hidden="true">→</span>
                </>
              )
            }
            onSecondary={() => {
              if (step > 1) setStep((s) => s - 1);
            }}
            onPrimary={() => {
              if (step < 3) setStep((s) => s + 1);
            }}
          >
            {step === 1 && (
              <RegisterStep1Identity values={orgData} onChange={handleOrgChange} />
            )}

            {step === 2 && (
              <Step2Account values={accountData} onChange={handleAccountChange} />
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
        footer={<FooterLinks />}
      />
    </div>
  );
}
