
'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, TrendingUp, Users, PieChart, Target, Zap, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import caseStudiesContent from '@/app/content/case-stories.json';
import { HealthCheckModal } from '@/components/modals/health-check-modal';

const icons: { [key: string]: React.ReactNode } = {
  TrendingUp: <TrendingUp className="h-8 w-8 text-primary" />,
  Users: <Users className="h-8 w-8 text-primary" />,
  PieChart: <PieChart className="h-8 w-8 text-primary" />,
  Target: <Target className="h-10 w-10 text-destructive" />,
  Zap: <Zap className="h-10 w-10 text-accent" />,
  CheckCircle: <CheckCircle className="h-10 w-10 text-primary" />,
};

const ResultVisual = ({ story }: { story: any }) => {
    if (!story.visual) return null;

    if (story.visual.type === 'graph') {
        return (
            <div className="text-center p-6 rounded-lg glass-morphic border border-primary/20 w-64 mx-auto">
                <p className="text-sm text-muted-foreground">{story.visual.data.title}</p>
                <p className="text-5xl font-bold text-primary text-glow">{story.visual.data.metric}</p>
            </div>
        );
    }

    if (story.visual.type === 'flowchart') {
        return (
            <div className="flex items-center justify-center gap-4 text-sm text-center">
                <div className="flex flex-col items-center gap-2 p-4 glass-morphic rounded-lg border border-red-400/20 w-40">
                    <Users className="h-8 w-8 text-red-400"/>
                    <span className="font-semibold">{story.visual.data.before}</span>
                </div>
                <ArrowRight className="h-8 w-8 text-primary/50 shrink-0" />
                <div className="flex flex-col items-center gap-2 p-4 glass-morphic rounded-lg border border-green-400/20 w-40">
                    <Users className="h-8 w-8 text-green-400"/>
                    <span className="font-semibold">{story.visual.data.after}</span>
                </div>
            </div>
        );
    }
    return null;
}


export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const story = caseStudiesContent.stories.find((s) => s.slug === params.slug);

  if (!story) {
    notFound();
  }

  // A simple way to split content. In a real CMS, this would be more robust.
  const [challenge, solution, result] = (story.content || story.description).split('\n\n');

  return (
    <article className="min-h-screen">
      <header className="relative w-full h-[50vh] text-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={story.image || 'https://picsum.photos/seed/default-case-study/1200/600'}
            alt={story.title}
            fill
            className="object-cover animate-zoom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10" />
        </div>
        <div className="container px-4 md:px-6 relative z-20 flex flex-col justify-end h-full pb-20">
          <div className="space-y-4">
            <p className="text-primary font-semibold text-glow">Case Study</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white text-glow">
              {story.title}
            </h1>
          </div>
        </div>
      </header>

      <div className="relative bg-background py-16 lg:py-24">
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-background via-primary/10 to-accent/10"></div>
          <div
            className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat"
            style={{ maskImage: 'radial-gradient(ellipse at center, white 20%, transparent 70%)' }}
          ></div>
        </div>
        
        <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
                 <Link href="/case-studies" passHref>
                    <Button variant="outline" className="glass-morphic">
                        <ArrowLeft className="mr-2 h-4 w-4"/>
                        Back to All Case Studies
                    </Button>
                </Link>
            </div>

            <div className="max-w-4xl mx-auto space-y-16">
                {/* Challenge */}
                <Card className="glass-morphic border-primary/20 p-6 md:p-8 card-glow">
                    <CardHeader className="flex-row items-center gap-4 space-y-0 pb-6">
                        <div className="w-20 h-20 rounded-full glass-morphic flex items-center justify-center border-2 border-destructive/30">
                            {icons['Target']}
                        </div>
                        <CardTitle className="text-3xl font-bold text-destructive text-glow">The Challenge</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg text-muted-foreground">{challenge}</p>
                    </CardContent>
                </Card>

                {/* Solution */}
                <Card className="glass-morphic border-primary/20 p-6 md:p-8 card-glow">
                    <CardHeader className="flex-row items-center gap-4 space-y-0 pb-6">
                        <div className="w-20 h-20 rounded-full glass-morphic flex items-center justify-center border-2 border-accent/30">
                            {icons['Zap']}
                        </div>
                        <CardTitle className="text-3xl font-bold text-accent text-glow">The Solution</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <p className="text-lg text-muted-foreground">{solution}</p>
                    </CardContent>
                </Card>

                {/* Result */}
                <Card className="glass-morphic border-primary/20 p-6 md:p-8 card-glow">
                    <CardHeader className="flex-row items-center gap-4 space-y-0 pb-6">
                         <div className="w-20 h-20 rounded-full glass-morphic flex items-center justify-center border-2 border-primary/30">
                            {icons['CheckCircle']}
                        </div>
                        <CardTitle className="text-3xl font-bold text-primary text-glow">The Result</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                         <p className="text-lg text-muted-foreground">{result}</p>
                         <div className="flex justify-center pt-4">
                            <ResultVisual story={story} />
                         </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-20 text-center p-8 rounded-2xl glass-morphic border-2 border-primary/30 shadow-2xl shadow-primary/20">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6 text-glow bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-300">
                    Ready to see results like this?
                </h2>
                <HealthCheckModal defaultServiceId="health-check">
                    <Button size="lg" className="btn-glow text-lg px-8 py-6 animate-pulse-glow">
                        Book a Data Health Check
                    </Button>
                </HealthCheckModal>
            </div>
        </div>
      </div>
    </article>
  );
}
