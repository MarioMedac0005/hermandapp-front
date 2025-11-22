import HeroSection from "@components/index/HeroSection";
import Card from "@components/index/BandaCard";
import CTASection from "@components/index/CTASection";

export default function LandingPage() {
	return (
		<>
			<HeroSection />

			<h2 className="text-3xl font-bold text-purple-700 px-10 mt-10 mb-6">
				Bandas Destacadas
			</h2>
			<div className="px-10 grid gap-6 justify-center grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
				<Card />
				<Card />
				<Card />
				<Card />
			</div>

			<h2 className="text-3xl font-bold text-purple-700 px-10 mt-10 mb-6">
				Hermandades Destacadas
			</h2>
			<div className="px-10 grid gap-6 justify-center grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</div>

			<CTASection />
		</>
	);
}
