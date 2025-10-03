
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, AreaChart, Compass } from "lucide-react";
import clarityPath from "@/app/content/clarity-path.json";
import { StartJourneyModal } from "../modals/start-journey-modal";

const icons: { [key: string]: React.ReactNode } = {
  "data-health-check": <Database className="h-10 w-10 text-primary" />,
  "interactive-data-apps": <AreaChart className="h-10 w-10 text-primary" />,
  "data-strategy-advisory": <Compass className="h-10 w-10 text-primary" />,
};

export default function ClarityPath() {
  return (
    <section id="path" className="w-full py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            {clarityPath.headline}
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
            {clarityPath.subheadline}
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary/20 -translate-y-1/2 hidden md:block" />
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary animate-gradient-shift bg-[length:200%_200%] opacity-70 hidden md:block" style={{'maskImage': 'linear-gradient(to right, transparent, white, transparent)'}}/>

          <div className="grid md:grid-cols-3 gap-8 md:gap-16 relative">
            {clarityPath.steps.map((step) => (
              <Card key={step.id} className="glass-morphic text-center p-6 card-glow border-primary/20 flex flex-col">
                <CardHeader className="items-center">
                  <div className="w-20 h-20 rounded-full glass-morphic flex items-center justify-center mb-4 border-2 border-primary/30 animate-pulse-glow">
                    {icons[step.icon]}
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-center">
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <StartJourneyModal>
            <Button size="lg" className="btn-glow rounded-full w-48 h-48 text-lg flex items-center justify-center animate-pulse-glow mx-auto">
              {clarityPath.cta.text}
            </Button>
          </StartJourneyModal>
        </div>
      </div>
    </section>
  );
}
