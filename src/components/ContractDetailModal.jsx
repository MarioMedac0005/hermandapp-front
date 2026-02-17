import React from 'react';
import Modal from './Modal';
import { CalendarIcon, BanknotesIcon, MapPinIcon, UserGroupIcon, MusicalNoteIcon } from '@heroicons/react/24/outline';

function ContractDetailModal({ contract, isOpen, onClose, actions, isAdmin = false }) {
  if (!contract) return null;

  const DetailRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
      <div className="mt-0.5 p-1.5 bg-gray-50 rounded-lg text-gray-400">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
        <p className="text-sm text-gray-900 mt-0.5 font-medium">{value || "-"}</p>
      </div>
    </div>
  );

  const getServiceLabel = (type) => {
    const labels = {
      'procession': 'Procesión',
      'concert': 'Concierto',
      'transfer': 'Traslado',
      'festival': 'Certamen',
      'other': 'Otro'
    };
    return labels[type] || type;
  };

  const statusConfig = {
    pending: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
    rejected: { label: "Rechazado", color: "bg-red-100 text-red-800" },
    accepted: { label: "Aceptado", color: "bg-blue-100 text-blue-800" },
    signed_by_band: { label: "Firmado por Banda", color: "bg-purple-100 text-purple-800" },
    signed_by_brotherhood: { label: "Firmado por Hermandad", color: "bg-purple-100 text-purple-800" },
    completed: { label: "Completado", color: "bg-green-100 text-green-800" },
    paid: { label: "Pagado", color: "bg-emerald-100 text-emerald-800" },
    payment_failed: { label: "Pago Fallido", color: "bg-orange-100 text-orange-800" },
    expired: { label: "Expirado", color: "bg-gray-100 text-gray-800" },
  };

  const status = statusConfig[contract.status] || { label: contract.status, color: "bg-gray-100 text-gray-800" };

  const formatDate = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleString("es-ES");
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Detalles del Contrato"
    >
      <div className="mt-4 space-y-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            <DetailRow 
                icon={CalendarIcon} 
                label="Fecha del Evento" 
                value={contract.performance_date ? new Date(contract.performance_date).toLocaleDateString("es-ES", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "No indicada"} 
            />
            <DetailRow 
                icon={BanknotesIcon} 
                label="Importe Acordado" 
                value={contract.amount ? `${parseFloat(contract.amount).toLocaleString('es-ES', { minimumFractionDigits: 2 })} €` : "No indicado"} 
            />
            <DetailRow 
                icon={UserGroupIcon} 
                label="Hermandad" 
                value={contract.brotherhood?.name} 
            />
            <DetailRow 
                icon={MusicalNoteIcon} 
                label="Banda" 
                value={contract.band?.name} 
            />
             <DetailRow 
                icon={MapPinIcon} 
                label="Tipo / Procesión" 
                value={contract.procession?.name || getServiceLabel(contract.performance_type)} 
            />
            <DetailRow 
                icon={({className}) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} 
                label="Estado Actual" 
                value={
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${status.color}`}>
                        {status.label}
                    </span>
                }
            />
            <DetailRow 
                icon={({className}) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} 
                label="Duración" 
                value={contract.duration ? `${contract.duration} minutos` : "-"} 
            />
            <DetailRow 
                icon={UserGroupIcon} 
                label="Músicos Mínimos" 
                value={contract.minimum_musicians} 
            />
        </div>

        {contract.approximate_route && (
            <div className="pt-4 mt-2">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Recorrido Aproximado</p>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-line">
                    {contract.approximate_route}
                </div>
            </div>
        )}

        {contract.additional_information && (
            <div className="pt-4 mt-2">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Información Adicional</p>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">
                    {contract.additional_information}
                </div>
            </div>
        )}

        {isAdmin && (
            <div className="pt-8 mt-6 border-t border-gray-100 space-y-6">
                <h4 className="text-sm font-black text-purple-600 uppercase tracking-widest">Detalles Técnicos (Admin)</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Stripe Session ID</p>
                        <p className="text-xs font-mono break-all bg-gray-50 p-2 rounded border border-gray-100">{contract.stripe_session_id || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Payment Intent ID</p>
                        <p className="text-xs font-mono break-all bg-gray-50 p-2 rounded border border-gray-100">{contract.stripe_payment_intent_id || "N/A"}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Firma Banda (Hash)</p>
                        <p className="text-[10px] font-mono break-all bg-gray-50 p-2 rounded border border-gray-100">{contract.band_signature_hash || "Pendiente"}</p>
                        <p className="text-[10px] text-gray-400 mt-1">Fecha: {formatDate(contract.signed_by_band_at)}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Firma Hermandad (Hash)</p>
                        <p className="text-[10px] font-mono break-all bg-gray-50 p-2 rounded border border-gray-100">{contract.brotherhood_signature_hash || "Pendiente"}</p>
                        <p className="text-[10px] text-gray-400 mt-1">Fecha: {formatDate(contract.signed_by_brotherhood_at)}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Pagado el</p>
                        <p className="text-xs font-medium">{formatDate(contract.paid_at)}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ID Contrato</p>
                        <p className="text-xs font-medium">#{contract.id}</p>
                    </div>
                </div>
            </div>
        )}
      </div>

      {actions && (
        <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-gray-100">
            {actions}
        </div>
      )}
    </Modal>
  );
}

export default ContractDetailModal;
