function Pagination() {
  return (
    <div className="flex justify-center my-6">
        <div className="join">
          <input className="join-item btn btn-square bg-purple-600" type="radio"name="options"aria-label="1"checked="checked"/>
          <input className="join-item btn btn-square" type="radio" name="options" aria-label="2" />
          <input className="join-item btn btn-square" type="radio" name="options" aria-label="3" />
          <input className="join-item btn btn-square" type="radio" name="options" aria-label="4" />
        </div>
      </div>
  )
}

export default Pagination