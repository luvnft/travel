
import FlightSearchCard from "@/components/flight/FlightSearch";
import Navbar from "@/components/navbar";
import HeroSectionGradientBackground from "@/components/ui/hero";

export default function Home() {
  return (
    <main >
      <Navbar />
      <HeroSectionGradientBackground />
      <FlightSearchCard />
    </main>
  );
}
