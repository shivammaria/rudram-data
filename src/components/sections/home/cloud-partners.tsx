
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import content from "@/app/content/partners.json";
import Image from "next/image";

const AwsLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="55" height="33" viewBox="0 0 55 33" fill="none" className="h-12 w-auto">
        <path d="M7.34766 22.5195C7.34766 22.5195 9.17969 22.0996 10.0195 21.0547C10.8594 20.0098 10.5078 17.5195 10.5078 17.5195L8.90039 12.334L6.09375 14.502L7.34766 22.5195Z" fill="#FF9900"/>
        <path d="M22.8281 3.33984L14.7305 17.5195H22.0996L23.8516 12.334L22.8281 3.33984Z" fill="#232F3E"/>
        <path d="M30.6523 17.5195H38.0215L31.6758 3.33984L30.6523 17.5195Z" fill="#232F3E"/>
        <path d="M43.9023 22.5195C43.9023 22.5195 42.0703 22.0996 41.2305 21.0547C40.3906 20.0098 40.7422 17.5195 40.7422 17.5195L42.3496 12.334L45.1562 14.502L43.9023 22.5195Z" fill="#FF9900"/>
        <path d="M22.0998 17.5195L14.7307 17.5195L19.3811 26.6895C19.3811 26.6895 20.2209 28.3789 22.0998 28.3789C23.9788 28.3789 24.5901 26.6895 24.5901 26.6895L22.0998 17.5195Z" fill="#FF9900"/>
        <path d="M38.0215 17.5195H30.6523L27.9102 26.6895C27.9102 26.6895 28.75 28.3789 30.6289 28.3789C32.5078 28.3789 33.1191 26.6895 33.1191 26.6895L38.0215 17.5195Z" fill="#FF9900"/>
    </svg>
);

const MicrosoftLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" fill="currentColor" className="h-10 w-auto">
        <path fill="#f25022" d="M1 1h9v9H1z"/>
        <path fill="#7fba00" d="M11 1h9v9h-9z"/>
        <path fill="#00a4ef" d="M1 11h9v9H1z"/>
        <path fill="#ffb900" d="M11 11h9v9h-9z"/>
    </svg>
);

const XeroLogo = () => (
    <Image src="/images/xero.png" alt="Xero Logo" width={80} height={40} className="h-10 w-auto" />
);

const logos: { [key: string]: React.ReactNode } = {
  aws: <AwsLogo />,
  microsoft: <MicrosoftLogo />,
  xero: <XeroLogo />,
};

const PartnerCard = ({ partner }: { partner: typeof content.partners[0] }) => (
    <Card className="glass-morphic card-glow border-primary/20 flex flex-col items-center p-6 text-center h-full transition-all duration-300 ease-in-out hover:-translate-y-2">
        <CardHeader className="p-0 mb-4 items-center">
            <div className="h-16 flex items-center justify-center">
              {logos[partner.logo]}
            </div>
        </CardHeader>
        <CardContent className="p-0 flex-grow">
            <p className="text-muted-foreground">{partner.description}</p>
        </CardContent>
    </Card>
);

export default function CloudPartners() {
  return (
    <section id="partners" className="w-full py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            {content.headline}
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
            {content.subheadline}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {content.partners.map((partner) => (
            <PartnerCard key={partner.name} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}

