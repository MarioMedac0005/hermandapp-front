import { Link } from "react-router-dom";

export default function SearchBar() {
  return (
    <div className="join">
      <div>
        <label className="input join-item w-96">
          <svg
            className="h-[1em] opacity-70 text-[#8a01e5]"
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
            type="text"
            placeholder="Busca una hermandad o una banda..."
            className="w-full text-base text-black focus:outline-none placeholder:text-gray-400"
          />
        </label>
      </div>

      {/* Cambiar en un futuro */}
      <Link to="/busqueda">
        <button className="btn bg-[#8a01e5] hover:bg-[#7000b8] text-white border-none join-item">Buscar</button>
      </Link>
    </div>
  );
}
