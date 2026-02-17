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
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-50">
            <div className="flex flex-1 justify-between sm:hidden">
            <button
                onClick={() => onPageChange(pagination.current_page - 1)}
                disabled={pagination.current_page === 1}
                className="relative inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors cursor-pointer"
            >
                Anterior
            </button>
            <button
                onClick={() => onPageChange(pagination.current_page + 1)}
                disabled={pagination.current_page === pagination.last_page}
                className="relative ml-3 inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors cursor-pointer"
            >
                Siguiente
            </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-500">
                    Mostrando <span className="font-medium text-gray-900">{pagination.from}</span> - <span className="font-medium text-gray-900">{pagination.to}</span> de <span className="font-medium text-gray-900">{pagination.total}</span> resultados
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm gap-1" aria-label="Pagination">
                         {/* Previous */}
                        <button
                            onClick={() => onPageChange(pagination.current_page - 1)}
                            disabled={pagination.current_page === 1}
                            className="relative inline-flex items-center rounded-lg px-2 py-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                        >
                            <span className="sr-only">Anterior</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                            </svg>
                        </button>
                        
                        {/* Page Numbers */}
                        {pagination.links && pagination.links.filter(link => !link.label.includes('&laquo;') && !link.label.includes('&raquo;')).map((link, index) => {
                             if (isNaN(link.label) && link.label !== '...') return null; 
                             
                             return (
                                <button
                                    key={index}
                                    onClick={() => !isNaN(link.label) && onPageChange(parseInt(link.label))}
                                    disabled={link.label === '...'}
                                    aria-current={link.active ? 'page' : undefined}
                                    className={`relative inline-flex items-center px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                                        link.active 
                                            ? 'z-10 bg-purple-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 shadow-sm' 
                                            : link.label === '...' ? 'text-gray-400 cursor-default' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                                    }`}
                                >
                                    {link.label}
                                </button>
                             );
                        })}

                        {/* Next */}
                        <button
                            onClick={() => onPageChange(pagination.current_page + 1)}
                            disabled={pagination.current_page === pagination.last_page}
                            className="relative inline-flex items-center rounded-lg px-2 py-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                        >
                            <span className="sr-only">Siguiente</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                        </button>
                    </nav>
                </div>
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
