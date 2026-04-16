import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";

function Table({ columns, data, entity, onEdit, onDelete, customActions, pagination, onPageChange }) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpen(true);
  }

  const handleConfirm = () => {
    if (onDelete && selectedId) {
      onDelete(selectedId);
    }
    setOpen(false);
    setSelectedId(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 font-medium uppercase text-xs tracking-wider border-b border-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-6 py-4 text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item) => (
              <tr 
                key={item.id} 
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-6 py-4 whitespace-nowrap text-gray-700 ${col.className || ""}`}
                  >
                    {(() => {
                        if (col.type === "status") {
                          const statusColors = {
                             pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
                             rejected: "bg-red-50 text-red-700 border border-red-200",
                             accepted: "bg-blue-50 text-blue-700 border border-blue-200",
                             signed_by_band: "bg-purple-50 text-purple-700 border border-purple-200",
                             signed_by_brotherhood: "bg-purple-50 text-purple-700 border border-purple-200",
                             completed: "bg-green-50 text-green-700 border border-green-200",
                             paid: "bg-emerald-50 text-emerald-700 border border-emerald-200",
                             payment_failed: "bg-orange-50 text-orange-700 border border-orange-200",
                             expired: "bg-gray-50 text-gray-600 border border-gray-200",
                           };
                           
                           const statusLabels = {
                             pending: "Pendiente",
                             rejected: "Rechazado",
                             accepted: "Aceptado",
                             signed_by_band: "Firmado por Banda",
                             signed_by_brotherhood: "Firmado por Hermandad",
                             completed: "Completado",
                             paid: "Pagado",
                             payment_failed: "Pago Fallido",
                             expired: "Expirado",
                           };

                          const value = item[col.key];
                          return (
                            <span
                              className={`px-2.5 py-0.5 inline-flex text-xs font-medium rounded-full ${
                                statusColors[value] || "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {statusLabels[value] || value}
                            </span>
                          );
                        }
                        
                        if (col.format) {
                          return col.format(item[col.key]);
                        }
                        
                        if (col.render) {
                            return col.render(item);
                        }

                        return item[col.key];
                      })()}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end items-center gap-2">
                    {customActions && customActions(item)}
                    {onDelete && (
                      <button
                        onClick={() => handleDeleteClick(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Eliminar"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    )}
                    {onEdit && (
                        <button
                        onClick={() => onEdit(item)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                        title="Editar"
                        >
                        <PencilIcon className="w-5 h-5" />
                        </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
                <tr>
                    <td colSpan={columns.length + 1} className="px-6 py-8 text-center text-gray-400">
                        No hay registros disponibles
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>



      {/* Pagination */}
      {pagination && pagination.last_page > 1 && (
        <div className="flex items-center justify-between px-6 py-5 border-t border-slate-100/60 bg-white">
          <div className="text-sm text-slate-500 font-medium">
            Página {pagination.current_page} de {pagination.last_page}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onPageChange(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
              className="flex items-center justify-center h-9 px-3 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
            >
              Anterior
            </button>
            <div className="items-center gap-1 hidden sm:flex">
                {pagination.links && pagination.links.filter(link => !link.label.includes('&laquo;') && !link.label.includes('&raquo;')).map((link, index) => {
                     if (isNaN(link.label) && link.label !== '...') return null; 
                     return (
                        <button
                            key={index}
                            onClick={() => !isNaN(link.label) && onPageChange(parseInt(link.label))}
                            disabled={link.label === '...'}
                            className={`flex items-center justify-center h-9 min-w-[36px] px-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                                link.active 
                                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20 ring-1 ring-purple-600/50' 
                                    : link.label === '...' ? 'text-slate-400 cursor-default' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                            }`}
                        >
                            {link.label}
                        </button>
                     );
                })}
            </div>
            <button
              onClick={() => onPageChange(pagination.current_page + 1)}
              disabled={pagination.current_page === pagination.last_page}
              className="flex items-center justify-center h-9 px-3 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {/* Modal reutilizable */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        title="¿Eliminar registro?"
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            ¿Seguro que quieres eliminar este registro? Esta acción no se puede
            deshacer.
          </p>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            onClick={handleConfirm}
          >
            Confirmar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Table;
