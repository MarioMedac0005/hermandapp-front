import {
  BuildingOfficeIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

function CardInfoHeader({ isEditing, setIsEditing }) {
  return (
    <>
      <header className="bg-gradient-to-r from-purple-600 to-purple-700 px-5 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <BuildingOfficeIcon className="size-6 text-white" />
          </div>
          <div className="text-white">
            <p className="text-xs opacity-90">Banda</p>
            <h2 className="text-base font-semibold">
              Banda del Cristo de Gracia
            </h2>
          </div>
        </div>

        <button 
          className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all backdrop-blur-sm text-sm cursor-pointer"
          onClick={() => setIsEditing(!isEditing)}
          >
          <PencilSquareIcon className="text- white size-4" />
          {isEditing ? "Dejar de editar" : "Editar"}
        </button>
      </header>
    </>
  );
}

export default CardInfoHeader;
