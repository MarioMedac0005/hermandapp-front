export default function SearchBar() {
	return (
		<div className="join">
			<div>
				<label className="input join-item w-96">
					<svg
						className="h-[1em] opacity-70 text-gray-500"
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
						className="w-full text-base text-black"
					/>
				</label>
			</div>

			<button className="btn btn-neutral join-item">Buscar</button>
		</div>
	);
}
