import { ArchiveBoxIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";

function Table({ columns, data, entity }) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    console.log("✅ Esto es lo que se ejecuta en el confirm");
    setOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#e8e9ed]">
      <div className="overflow-x-auto p-3">
        {/* --- Tabla --- */}
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table text-xs">
            {/* head */}
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-2 py-2 text-left font-medium text-slate-600 border-r border-gray-200"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-2 py-2 text-left font-medium text-slate-600">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {data.map((item) => (
                <tr key={item.id} className="odd:bg-gray-50">
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-2 py-2 border-r border-gray-200"
                    >
                      {item[col.key]}
                    </td>
                  ))}
                  <td className="border-r border-gray-200 align-middle">
                    <div className="flex justify-center items-center gap-3">
                      <ArchiveBoxIcon
                        onClick={() => setOpen(true)}
                        className="size-5 text-red-600 hover:cursor-pointer hover:scale-110 transition"
                      />
                      <PencilSquareIcon className="size-5 text-green-600 hover:cursor-pointer hover:scale-110 transition" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
