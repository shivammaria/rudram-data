import AboutHero from "@/components/sections/about/about-hero";
import WhoWeAre from "@/components/sections/about/who-we-are";
import OurVision from "@/components/sections/about/our-vision";
import OurValues from "@/components/sections/about/our-values";
import CtaBanner from "@/components/sections/shared/cta-banner";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
       <div className="relative z-10 bg-background">
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-background via-primary/10 to-accent/10"></div>
          <div 
            className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat"
            style={{ maskImage: 'radial-gradient(ellipse at center, white 20%, transparent 70%)' }}
          ></div>
        </div>
        <AboutHero />
        <WhoWeAre />
        <OurVision />
        <OurValues />
        <CtaBanner />
      </div>
    </div>
  );
}
