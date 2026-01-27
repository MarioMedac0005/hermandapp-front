import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import SearchFilters from "../../components/busqueda/SearchFilters";
import SearchResults from "../../components/busqueda/SearchResults";
import Pagination from "../../components/Pagination";

function Busqueda() {
	const [searchParams, setSearchParams] = useSearchParams();

	const [searchFilters, setSearchFilters] = useState({
		q: searchParams.get("q") ?? "",
		city: searchParams.get("city") ?? "",
		type: searchParams.get("type") ?? "",
		page: Number(searchParams.get("page")) || 1,
	});

	const [formFilters, setFormFilters] = useState({
		q: searchFilters.q,
		city: searchFilters.city,
		type: searchFilters.type,
	});

	const { results, pagination, loading } = useSearch(searchFilters);

	useEffect(() => {
		const params = {};

		if (searchFilters.q) params.q = searchFilters.q;
		if (searchFilters.city) params.city = searchFilters.city;
		if (searchFilters.type) params.type = searchFilters.type;
		if (searchFilters.page > 1) params.page = searchFilters.page;

		setSearchParams(params);
	}, [searchFilters, setSearchParams]);

	const updateFormFilter = (key, value) => {
		setFormFilters(prev => ({ ...prev, [key]: value }));
	};

	const submitFilters = e => {
		e.preventDefault();

		setSearchFilters({
			...formFilters,
			page: 1,
		});
	};

	const resetFilters = () => {
		setFormFilters({
			q: "",
			city: "",
			type: "",
		});

		setSearchFilters({
			q: "",
			city: "",
			type: "",
			page: 1,
		});

		setSearchParams({});
	};

	const changePage = page => {
		setSearchFilters(prev => ({ ...prev, page }));
	};

	return (
		<section className="mt-10 mx-10 pb-10">
			{/* Contenido principal */}
			<div className="grid grid-cols-1 md:grid-cols-[0.6fr_2fr] gap-8 items-start">
				<SearchFilters
					filters={formFilters}
					onChange={updateFormFilter}
					onSubmit={submitFilters}
					onReset={resetFilters}
				/>

				<SearchResults results={results} loading={loading} />
			</div>

			<div className="mt-5 flex justify-center">
				<Pagination
					pagination={pagination}
					onPageChange={changePage}
				/>
			</div>
		</section>
	);
}

export default Busqueda;
