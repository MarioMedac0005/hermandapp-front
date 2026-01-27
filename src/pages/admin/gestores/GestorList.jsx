import { useState } from "react";
import Modal from "@components/Modal";
import GestorForm from "./GestorForm";
import ManagerCard from "./ManagerCard";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { useFetchData } from "../../../hooks/useFetchData";
import { useDeleteEntity } from "../../../hooks/useDeleteEntity";
import { API_ENDPOINTS } from "../../../config/api";
import { toast } from 'react-hot-toast';

function GestorList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: managers, loading, error, refetch } = useFetchData(API_ENDPOINTS.gestores);
  const { destroy } = useDeleteEntity();

  const [managerToDelete, setManagerToDelete] = useState(null);

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    refetch();
    toast.success("Gestor creado correctamente");
  };

  const handleDeleteClick = (manager) => {
    setManagerToDelete(manager);
  };

  const confirmDelete = async () => {
    if (!managerToDelete) return;

    const success = await destroy(`${API_ENDPOINTS.gestores}/${managerToDelete.id}`);
    if (success) {
        refetch();
        setManagerToDelete(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestores</h1>
        <button
          type="button"
          className="btn bg-purple-600 text-white hover:bg-purple-700 border-none gap-2"
          onClick={handleCreate}
        >
          <UserPlusIcon className="h-5 w-5" />
          Nuevo Gestor
        </button>
      </div>

      {loading && <div className="text-center py-10">Cargando gestores...</div>}
      
      {error && <div className="text-center py-10 text-red-500">Error al cargar: {error}</div>}

      {!loading && !error && managers && managers.length === 0 && (
         <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 mb-4">
                <UserPlusIcon className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay gestores</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Aún no has creado ningún gestor. ¡Crea el primero ahora!
            </p>
         </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {managers && managers.map(manager => (
            <ManagerCard 
                key={manager.id} 
                manager={manager} 
                onDelete={handleDeleteClick}
            />
        ))}
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Crear Nuevo Gestor"
      >
        <GestorForm 
            onSuccess={handleSuccess}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={!!managerToDelete}
        onClose={() => setManagerToDelete(null)}
        title="Eliminar Gestor"
      >
        <div className="p-1">
            <p className="text-gray-600 mb-6">
                ¿Estás seguro de que deseas eliminar a <span className="font-semibold text-gray-900">{managerToDelete?.name}</span>? 
                Esta acción no se puede deshacer.
            </p>
            
            <div className="flex justify-end gap-3">
                <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    onClick={() => setManagerToDelete(null)}
                >
                    Cancelar
                </button>
                <button
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={confirmDelete}
                >
                    Eliminar
                </button>
            </div>
        </div>
      </Modal>
    </div>
  );
}

export default GestorList;
