
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import content from "@/app/content/partners.json";
import Image from "next/image";

const AwsLogo = () => (
    <div className="relative h-12 w-32 md:h-14 md:w-36">
        <Image 
            src="/images/aws.png" 
            alt="AWS Logo" 
            fill 
            className="object-contain" 
            priority
        />
    </div>
);

const MicrosoftLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" className="h-8 w-auto md:h-10">
        <path fill="#f25022" d="M1 1h9v9H1z"/>
        <path fill="#7fba00" d="M11 1h9v9h-9z"/>
        <path fill="#00a4ef" d="M11 11h9v9h-9z"/>
        <path fill="#ffb900" d="M1 11h9v9H1z"/>
    </svg>
);

const XeroLogo = () => (
    <div className="relative h-8 w-24 md:h-10 md:w-32">
        <Image 
            src="/images/xero.png" 
            alt="Xero Logo" 
            fill 
            className="object-contain" 
        />
    </div>
);

const logos: { [key: string]: React.ReactNode } = {
  aws: <AwsLogo />,
  microsoft: <MicrosoftLogo />,
  xero: <XeroLogo />,
};

const PartnerCard = ({ partner }: { partner: typeof content.partners[0] }) => (
    <Card className="glass-morphic card-glow border-primary/20 flex flex-col items-center p-8 text-center h-full transition-all duration-300 ease-in-out hover:-translate-y-2">
        <CardHeader className="p-0 mb-8 items-center w-full">
            <div className="h-24 w-full flex items-center justify-center bg-white rounded-xl p-4 shadow-sm overflow-hidden">
                {logos[partner.logo]}
            </div>
        </CardHeader>
        <CardContent className="p-0 flex-grow">
            <h3 className="text-xl font-bold mb-3 text-foreground">{partner.name}</h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{partner.description}</p>
        </CardContent>
    </Card>
);

export default function CloudPartners() {
  return (
    <section id="partners" className="w-full py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            {content.headline}
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
            {content.subheadline}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {content.partners.map((partner) => (
            <PartnerCard key={partner.name} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
