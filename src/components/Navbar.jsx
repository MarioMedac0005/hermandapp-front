import { useState, useRef, useEffect } from "react";
import Logo from "@assets/img/logo.svg";

function Navbar() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isBlogOpen, setIsBlogOpen] = useState(false);

	const dropdownRef = useRef(null);
	const blogRef = useRef(null);

	// Cerrar dropdowns al hacer click fuera
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsDropdownOpen(false);
			}
			if (blogRef.current && !blogRef.current.contains(event.target)) {
				setIsBlogOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="navbar bg-base-100 shadow-sm px-7">
			<div className="flex-1">
				<img src={Logo} alt="Logo" className="w-28" />
			</div>

			<div className="flex-none">
				<ul className="menu menu-horizontal px-6">
					<li><a className="active:bg-gray-200 hover:text-inherit">Inicio</a></li>
					<li><a className="active:bg-gray-200 hover:text-inherit">Bandas</a></li>
					<li><a className="active:bg-gray-200 hover:text-inherit">Hermandades</a></li>
					<li><a className="active:bg-gray-200 hover:text-inherit">Contacto</a></li>

					{/* Blog con <details> */}
					<li ref={blogRef}>
						<details open={isBlogOpen}>
							<summary
								onClick={(e) => {
									e.preventDefault(); // prevenir toggle nativo
									setIsBlogOpen(!isBlogOpen);
								}}
								className="active:bg-gray-200 hover:text-inherit cursor-pointer"
							>
								Blog
							</summary>
							<ul className="bg-base-100 rounded-t-none p-2 absolute mt-1 z-10 shadow">
								<li><a className="active:bg-gray-200 hover:text-inherit">Novedades</a></li>
								<li><a className="active:bg-gray-200 hover:text-inherit">Posts</a></li>
							</ul>
						</details>
					</li>
				</ul>
			</div>

			{/* Dropdown del avatar */}
			<div className="flex gap-2">
				<div
					ref={dropdownRef}
					className={`dropdown dropdown-end ${isDropdownOpen ? "dropdown-open" : ""}`}
				>
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost btn-circle avatar"
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
					>
						<div className="w-10 rounded-full">
							<img
								alt="Foto de perfil del usuario"
								src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
							/>
						</div>
					</div>

					<ul
						tabIndex="-1"
						className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-40 p-2 shadow"
					>
						<li><a className="active:bg-gray-200 hover:text-inherit">Perfil</a></li>
						<li><a className="active:bg-gray-200 hover:text-inherit">Ajustes</a></li>
						<li><a className="active:bg-gray-200 hover:text-inherit">Salir</a></li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Navbar;