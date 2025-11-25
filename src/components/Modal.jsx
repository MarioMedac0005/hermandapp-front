export default function Modal({ open, onClose, title, children, onConfirm }) {
  if (!open) return null; // no se renderiza si no está abierto

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md font-poppins transform animate-modalIn"
      >
        {/* Título */}
        {title && (
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {title}
          </h2>
        )}

        {/* Contenido dinámico */}
        <div className="text-gray-700 mb-6">{children}</div>

        {/* Botones */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 hover:cursor-pointer hover:scale-105 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 hover:cursor-pointer hover:scale-105 transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
