import HeroSection from "@components/index/HeroSection";
import Stats from "@components/index/Stats";
import Features from "@components/index/Features";
import Showcase from "@components/index/Showcase";
import FeaturedProfiles from "@components/index/FeaturedProfiles";
import CTA from "@components/index/CTA";

export default function LandingPage() {
	return (
		<>
			<HeroSection />
			<Stats />
			<Features />
			<Showcase />
			<FeaturedProfiles />
			<CTA />
		</>
	);
}
