function Busqueda() {
  return (
    <>
      <form className="w-full mt-4">
        <div className="flex w-full gap-2">
          <input className="input input-sm flex-1" placeholder="Search" />

          <select className="select select-sm w-48">
            <option value="" disabled>
              Filter
            </option>
            <option value="sci-fi">Sci-fi</option>
            <option value="drama">Drama</option>
            <option value="action">Action</option>
          </select>

          <button type="submit" className="btn btn-sm">
            Search
          </button>
        </div>
      </form>
    </>
  );
}

export default Busqueda;
