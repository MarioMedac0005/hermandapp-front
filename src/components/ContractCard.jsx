import React from 'react';
import { CalendarIcon, BanknotesIcon } from '@heroicons/react/24/outline';

function ContractCard({ contract, onClick, type }) {
  const statusColors = {
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
    accepted: "bg-blue-50 text-blue-700 border-blue-200",
    signed_by_band: "bg-purple-50 text-purple-700 border-purple-200",
    signed_by_brotherhood: "bg-purple-50 text-purple-700 border-purple-200",
    completed: "bg-green-50 text-green-700 border-green-200",
    expired: "bg-gray-50 text-gray-600 border-gray-200",
  };

  const statusLabels = {
    pending: "Pendiente",
    rejected: "Rechazado",
    accepted: "Aceptado",
    signed_by_band: "Firmado por Banda",
    signed_by_brotherhood: "Firmado por Hermandad",
    completed: "Completado",
    expired: "Expirado",
  };

  // Determine the "other party" name to display
  const title = type === 'band' 
    ? contract.brotherhood?.name || "Hermandad desconocida" 
    : contract.band?.name || "Banda desconocida";
    
  // Subtitle could be the event or procession name if available
  const subtitle = contract.event_name || contract.procession?.name || "Evento sin nombre";

  return (
    <div 
      onClick={() => onClick(contract)}
      className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all cursor-pointer p-5 flex flex-col gap-4 group"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate group-hover:text-purple-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-500 truncate">{subtitle}</p>
        </div>
        <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${statusColors[contract.status] || "bg-gray-100 text-gray-800"}`}>
          {statusLabels[contract.status] || contract.status}
        </span>
      </div>

      <div className="flex flex-col gap-2 text-sm text-gray-600 mt-auto">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-gray-400" />
          <span>
            {new Date(contract.date).toLocaleDateString("es-ES", {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </span>
        </div>
        <div className="flex items-center gap-2">
            <BanknotesIcon className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-900">
                {parseFloat(contract.amount).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
            </span>
        </div>
      </div>
    </div>
  );
}

export default ContractCard;
