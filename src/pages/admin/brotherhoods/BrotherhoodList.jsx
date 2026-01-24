import { useState } from "react";
import Modal from "@components/Modal";
import BrotherhoodForm from "./BrotherhoodForm";
// import { Link } from "react-router-dom";
import Table from "@components/Table";
import { brotherhoodsColumns } from "../../../config/tables/brotherhoodsColumns";
import { useFetchData } from "../../../hooks/useFetchData";
import { API_ENDPOINTS } from "../../../config/api";

function BrotherhoodList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const entidad = "hermandad";
  const columnas = brotherhoodsColumns;
  const { data, loading, error } = useFetchData(API_ENDPOINTS.brotherhoods);

  if (loading) return <p>Cargando hermandades...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold -mt-3 mb-2">Hermandades</h1>
      <div className="flex gap-4 flex-wrap justify-between items-center mb-4 text-xs">
        <label className="input input-sm">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Search"
            className="placeholder:text-xs"
          />
        </label>
        <button
          type="button"
          className="btn btn-sm"
          onClick={() => setIsModalOpen(true)}
        >
          Crear una hermandad
        </button>
      </div>
      <Table columns={columnas} data={data} entity={entidad} />

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title=""
      >
        <BrotherhoodForm />
      </Modal>
    </div>
  );
}

export default BrotherhoodList;
