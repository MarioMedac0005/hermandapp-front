import HeroSection from "@components/index/HeroSection";
import Card from "@components/index/BandaCard";
import CTASection from "@components/index/CTASection";

export default function LandingPage() {
  return (
    <>
      <HeroSection />

      <h2 className="text-3xl font-bold text-purple-700 px-15 mt-10 mb-6">
        Bandas Destacadas
      </h2>
      <div className="px-50 flex flex-wrap justify-between gap-6">
        <Card href="/perfil/banda" />
        <Card href="/perfil/banda" />
        <Card href="/perfil/banda" />
        <Card href="/perfil/banda" />
      </div>

      <h2 className="text-3xl font-bold text-purple-700 px-15 mt-10 mb-6">
        Hermandades Destacadas
      </h2>
      <div className="px-50 flex flex-wrap justify-between gap-6">
        <Card href="/perfil/hermandad" />
        <Card href="/perfil/hermandad" />
        <Card href="/perfil/hermandad" />
        <Card href="/perfil/hermandad" />
        <Card href="/perfil/hermandad" />
        <Card href="/perfil/hermandad" />
      </div>

      <CTASection />
    </>
  );
}
