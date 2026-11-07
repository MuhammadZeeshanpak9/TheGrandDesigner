import { TopUtilityBar } from "@/components/layout/TopUtilityBar";
import { SecondaryTopBar } from "@/components/layout/SecondaryTopBar";
import { MainHeader } from "@/components/layout/MainHeader";
import { GuaranteeBar } from "@/components/layout/GuaranteeBar";
import { Hero } from "@/components/sections/Hero";
import { WellnessSection } from "@/components/sections/WellnessSection";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <TopUtilityBar />
      <SecondaryTopBar />
      <MainHeader />
      <GuaranteeBar />
      <Hero />
      <WellnessSection />
    </div>
  );
}
