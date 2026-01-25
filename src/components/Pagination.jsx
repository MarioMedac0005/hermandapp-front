function Pagination({ pagination, onPageChange }) {
	if (!pagination || pagination.lastPage <= 1) return null;

	const { currentPage, lastPage } = pagination;
	const delta = 1; // páginas a cada lado de la actual

	const pages = [];

	const rangeStart = Math.max(2, currentPage - delta);
	const rangeEnd = Math.min(lastPage - 1, currentPage + delta);

	// Primera página
	pages.push(1);

	// Ellipsis inicial
	if (rangeStart > 2) {
		pages.push("ellipsis-start");
	}

	// Páginas centrales
	for (let i = rangeStart; i <= rangeEnd; i++) {
		pages.push(i);
	}

	// Ellipsis final
	if (rangeEnd < lastPage - 1) {
		pages.push("ellipsis-end");
	}

	// Última página
	if (lastPage > 1) {
		pages.push(lastPage);
	}

	return (
		<div className="flex justify-center my-6">
			<div className="join">
				{pages.map((item, index) => {
					// Ellipsis
					if (typeof item !== "number") {
						return (
							<button
								key={item + index}
								className="join-item btn btn-sm btn-disabled"
								type="button"
							>
								…
							</button>
						);
					}

					// Página normal
					return (
						<button
							key={item}
							type="button"
							onClick={() => onPageChange(item)}
							className={`join-item btn btn-sm ${item === currentPage
									? "bg-purple-600 text-white"
									: ""
								}`}
						>
							{item}
						</button>
					);
				})}
			</div>
		</div>
	);
}

export default Pagination;
