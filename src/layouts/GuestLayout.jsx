import { Outlet } from "react-router-dom";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

function GuestLayout() {
	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar></Navbar>
			<main>
				<Outlet /> {/* Aquí se renderiza HermandadesForm */}
			</main>
			<Footer />
		</div>
	);
}

export default GuestLayout;
