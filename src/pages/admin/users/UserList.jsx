import Table from "@components/Table";
import { useState } from "react";
import Modal from "@components/Modal";
import UserForm from "./UserForm";
import { useFetchData } from "../../../hooks/useFetchData";
import { useDeleteEntity } from "../../../hooks/useDeleteEntity";
import { userColumns } from "../../../config/tables/usersColumns.jsx";
import { API_ENDPOINTS } from "../../../config/api";

function UserList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  
  const entidad = "usuario";
  const columnas = userColumns;
  const { data, loading, error, refetch, pagination } = useFetchData(API_ENDPOINTS.users, page);
  const { destroy } = useDeleteEntity();

  const handleCreate = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const success = await destroy(`${API_ENDPOINTS.users}/${id}`);
    if (success) {
        refetch();
    }
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    refetch();
  };

  if (loading) return <div className="p-4 text-center">Cargando usuarios...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6 mt-2">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Usuarios</h1>
          <p className="text-sm text-slate-500 mt-1">Gestión de usuarios de la plataforma</p>
        </div>
        <button
          type="button"
          className="btn bg-purple-600 hover:bg-purple-700 text-white border-none rounded-xl shadow-sm hover:shadow-md transition-all px-5 lg:px-6 font-semibold"
          onClick={handleCreate}
        >
          Crear usuario
        </button>
      </div>
      
      <Table 
        columns={columnas} 
        data={data} 
        entity={entidad} 
        onEdit={handleEdit}
        onDelete={handleDelete}
        pagination={pagination}
        onPageChange={setPage}
      />

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedUser ? "Editar Usuario" : "Crear Usuario"}
      >
        <UserForm 
            initialData={selectedUser} 
            onSuccess={handleSuccess}
        />
      </Modal>
    </div>
  );
}

export default UserList;
