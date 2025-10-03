
import { Gem, Handshake, ShieldCheck } from "lucide-react";
import aboutContent from "@/app/content/about.json";

const icons: { [key: string]: React.ReactNode } = {
  "Clarity": <Gem className="h-10 w-10 text-primary" />,
  "Partnership": <Handshake className="h-10 w-10 text-primary" />,
  "Trust": <ShieldCheck className="h-10 w-10 text-primary" />,
};

type Value = typeof aboutContent.ourValues.values[0];

const ValueCard = ({ value }: { value: Value }) => {
  return (
    <div className="group h-64 w-full [perspective:1000px]">
      <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 glass-morphic rounded-xl flex flex-col items-center justify-center p-6 text-center border border-primary/20">
          <div className="mb-4">{icons[value.icon]}</div>
          <h3 className="text-2xl font-bold text-foreground">{value.title}</h3>
        </div>
        {/* Back */}
        <div className="absolute inset-0 h-full w-full rounded-xl bg-primary/90 px-8 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center">
          <p className="text-lg text-primary-foreground">{value.description}</p>
        </div>
      </div>
    </div>
  );
};

export default function OurValues() {
    const { ourValues } = aboutContent;

  return (
    <section id="values" className="w-full py-20 lg:py-32 bg-background/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            {ourValues.headline}
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
            {ourValues.subheadline}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {ourValues.values.map((value, index) => (
            <ValueCard key={index} value={value} />
          ))}
        </div>
      </div>
    </section>
  );
}
