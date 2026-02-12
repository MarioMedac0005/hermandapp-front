import React from 'react';
import Modal from './Modal';
import { CalendarIcon, BanknotesIcon, MapPinIcon, UserGroupIcon, MusicalNoteIcon } from '@heroicons/react/24/outline';

function ContractDetailModal({ contract, isOpen, onClose, actions }) {
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
                value={new Date(contract.date).toLocaleDateString("es-ES", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} 
            />
            <DetailRow 
                icon={BanknotesIcon} 
                label="Importe Acordado" 
                value={`${parseFloat(contract.amount).toLocaleString('es-ES', { minimumFractionDigits: 2 })} €`} 
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
                label="Procesión / Evento" 
                value={contract.procession?.name || contract.event_name || "Evento General"} 
            />
            <DetailRow 
                icon={({className}) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} 
                label="Estado Actual" 
                value={
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${contract.status === 'accepted' ? 'bg-blue-100 text-blue-800' : 
                          contract.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                          contract.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                        {contract.status}
                    </span>
                }
            />
        </div>

        {contract.observations && (
            <div className="pt-4 mt-2">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Observaciones</p>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">
                    {contract.observations}
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
