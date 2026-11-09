import { Hero } from "@/components/sections/Hero";
import { IntroBlock } from "@/components/sections/IntroBlock";
import { UnderstandingsGrid } from "@/components/sections/UnderstandingsGrid";
import { WellnessShowcase } from "@/components/sections/WellnessShowcase";
import { StoryBlock } from "@/components/sections/StoryBlock";
import { Testimonials } from "@/components/sections/Testimonials";
import { ConnectForm } from "@/components/sections/ConnectForm";
import { SocialConnect } from "@/components/sections/SocialConnect";

export default function Home() {
  return (
    <main className="relative flex flex-col w-full">
      <Hero />
      <IntroBlock />
      <UnderstandingsGrid />
      <WellnessShowcase />
      <StoryBlock />
      <Testimonials />
      <ConnectForm />
      <SocialConnect />
    </main>
  );
}
