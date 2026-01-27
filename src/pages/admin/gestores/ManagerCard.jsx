import { TrashIcon, EnvelopeIcon, BuildingLibraryIcon, MusicalNoteIcon } from '@heroicons/react/24/outline';

export default function ManagerCard({ manager, onDelete }) {
  const isBand = manager.type === 'band' || (manager.band && !manager.brotherhood);
  const entityName = manager.band?.name || manager.brotherhood?.name || 'Sin Asignar';
  
  // Dynamic styles based on type
  const theme = isBand ? {
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    badge: 'bg-purple-100 text-purple-700',
    gradient: 'from-purple-500 to-indigo-600'
  } : {
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    badge: 'bg-amber-100 text-amber-700',
    gradient: 'from-amber-500 to-orange-600'
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Header Color Bar */}
      <div className={`h-2 w-full bg-gradient-to-r ${theme.gradient}`}></div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-2 rounded-lg ${theme.iconBg} ${theme.iconColor}`}>
             {isBand ? (
                <MusicalNoteIcon className="h-6 w-6" />
             ) : (
                <BuildingLibraryIcon className="h-6 w-6" />
             )}
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${theme.badge}`}>
            {isBand ? 'Banda' : 'Hermandad'}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight truncate" title={manager.name}>
          {manager.name}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
           <EnvelopeIcon className="h-4 w-4" />
           <span className="truncate" title={manager.email}>{manager.email}</span>
        </div>

        <div className="pt-4 border-t border-gray-50">
           <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Entidad Asignada</p>
           <p className="text-sm font-medium text-gray-700 truncate" title={entityName}>{entityName}</p>
        </div>
      </div>

      {/* Hover Action */}
      <div className="absolute top-4 right-1/2 translate-x-1/2 -translate-y-full group-hover:translate-y-0 shadow-lg bg-white rounded-full p-1 transition-all duration-300 opacity-0 group-hover:opacity-100 z-10">
         <button
            onClick={() => onDelete(manager)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="Eliminar gestor"
        >
            <TrashIcon className="h-5 w-5" />
        </button>
      </div>
      
      {/* Overlay to make delete button interaction cleaner (optional) */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/2 transition-colors pointer-events-none" />
    </div>
  );
}
