import Header from "@components/form/Header";
import ServiceDetails from "@components/form/ServiceDetails";
import ProcessionDetails from "@components/form/ProcessionDetails";
import OfferMessage from "@components/form/OfferMessage";
import ProposalSidebar from "@components/form/ProposalSidebar";

export default function ProposalPage() {
	return (
		<div className="flex flex-col px-6 py-6 max-w-7xl mx-auto">
			<Header />
			
			<div className="flex gap-6 mt-4">
				{/* Columna izquierda */}
				<div className="w-2/3 flex flex-col gap-6">
					<ServiceDetails />
					<ProcessionDetails />
					<OfferMessage />
				</div>

				{/* Sidebar */}
				<div className="w-1/3">
					<ProposalSidebar />
				</div>
			</div>
		</div>
	);
}
