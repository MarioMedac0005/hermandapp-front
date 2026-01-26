import { useState } from "react";
import Modal from "@components/Modal";
import GestorForm from "./GestorForm";
import { UserPlusIcon } from "@heroicons/react/24/outline";

function GestorList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    // Here we would refetch the list if we had one
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestores</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 mb-4">
            <UserPlusIcon className="h-8 w-8 text-purple-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Crear Nuevo Gestor</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Actualmente solo está disponible la creación de gestores. La visualización y edición se implementará próximamente.
        </p>
        <button
          type="button"
          className="btn bg-purple-600 text-white hover:bg-purple-700 border-none"
          onClick={handleCreate}
        >
          Crear un Gestor
        </button>
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
    </div>
  );
}

export default GestorList;
