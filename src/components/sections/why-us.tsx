
import { MessageCircle, Settings, TrendingUp, InfinityIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import whyUsContent from "@/app/content/why-us.json";
import { FreeIntroCallModal } from "../modals/free-intro-call-modal";

const icons: { [key: string]: React.ReactNode } = {
  "simple-first": <MessageCircle className="h-10 w-10 text-primary" />,
  "built-for-you": <Settings className="h-10 w-10 text-primary" />,
  "results-oriented": <TrendingUp className="h-10 w-10 text-primary" />,
  "future-proof": <InfinityIcon className="h-10 w-10 text-primary" />,
};

type Feature = typeof whyUsContent.features[0];

const FlipCard = ({ feature }: { feature: Feature }) => {
  return (
    <div className="group h-64 w-full [perspective:1000px]">
      <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 glass-morphic rounded-xl flex flex-col items-center justify-center p-6 text-center border border-primary/20">
          <div className="mb-4">{icons[feature.icon]}</div>
          <h3 className="text-2xl font-bold text-foreground">{feature.title}</h3>
        </div>
        {/* Back */}
        <div className="absolute inset-0 h-full w-full rounded-xl bg-primary/90 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center">
          <p className="text-lg text-primary-foreground">{feature.description}</p>
        </div>
      </div>
    </div>
  );
};


export default function WhyUs() {
  return (
    <section id="why-us" className="w-full py-20 lg:py-32 bg-background/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            {whyUsContent.headline}
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
            {whyUsContent.subheadline}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyUsContent.features.map((feature, index) => (
            <FlipCard key={index} feature={feature} />
          ))}
        </div>
        <div className="mt-20 text-center">
          <FreeIntroCallModal>
            <Button size="lg" className="relative btn-glow px-8 py-6 text-lg">
                <span className="relative">{whyUsContent.cta.text}</span>
            </Button>
          </FreeIntroCallModal>
        </div>
      </div>
    </section>
  );
}
