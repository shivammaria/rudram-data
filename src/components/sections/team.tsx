
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import teamContent from "@/app/content/team.json";
import { Linkedin } from "lucide-react";

export default function Team() {
  return (
    <section id="team" className="w-full py-20 lg:py-32 bg-background/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            {teamContent.headline}
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
            {teamContent.subheadline}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center max-w-5xl mx-auto">
          {teamContent.members.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <div className="relative w-full max-w-xs mx-auto aspect-square [perspective:1500px] mb-6">
                <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500 hover:[transform:rotateY(10deg)]">
                  <div className="absolute inset-0 rounded-2xl glass-morphic border-2 border-primary/30 p-4 shadow-2xl shadow-primary/20 animate-float">
                    <Image
                      src={member.image.src}
                      alt={member.image.alt}
                      width={400}
                      height={400}
                      className="rounded-lg object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold">{member.name}</h3>
              <p className="text-primary font-medium">{member.role}</p>
              <p className="mt-2 text-muted-foreground">{member.bio}</p>
              <Link href={member.linkedinUrl} passHref>
                <Button variant="ghost" size="icon" className="mt-2 text-muted-foreground hover:text-primary">
                    <Linkedin />
                    <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">{teamContent.story.paragraph}</p>
        </div>
      </div>
    </section>
  );
}
