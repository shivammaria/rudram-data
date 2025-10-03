
"use client";

import content from "@/app/content/case-stories.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ArrowRight, Sheet, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HealthCheckModal } from "@/components/modals/health-check-modal";

const icons: { [key: string]: React.ReactNode } = {
  Sheet: <Sheet className="h-10 w-10 text-red-400" />,
  LayoutDashboard: <LayoutDashboard className="h-10 w-10 text-green-400" />,
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 glass-morphic rounded-lg border border-primary/20">
        <p className="label text-primary">{`${label} : ${payload[0].value} hrs`}</p>
      </div>
    );
  }
  return null;
};

export default function FeaturedStory() {
  const { featuredStory } = content;
  
  return (
    <section id="featured-story" className="w-full py-20 lg:py-32 bg-background/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            {featuredStory.industry}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-primary">Challenge</h3>
              <p className="text-muted-foreground text-lg">{featuredStory.challenge}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-primary">Solution</h3>
              <p className="text-muted-foreground text-lg">{featuredStory.solution}</p>
            </div>
             <div className="space-y-2">
              <h3 className="text-2xl font-bold text-primary">Result</h3>
              <p className="text-muted-foreground text-lg">{featuredStory.result}</p>
            </div>
          </div>
          
          <div className="space-y-8">
            <Card className="glass-morphic border-primary/20 card-glow">
              <CardHeader>
                <CardTitle className="text-center text-lg text-primary">From Chaos to Clarity</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-around p-6">
                <div className="flex flex-col items-center gap-2 text-center">
                  {icons[featuredStory.visual.before.icon]}
                  <p className="font-semibold">{featuredStory.visual.before.title}</p>
                </div>
                <ArrowRight className="h-8 w-8 text-primary/50" />
                <div className="flex flex-col items-center gap-2 text-center">
                  {icons[featuredStory.visual.after.icon]}
                  <p className="font-semibold">{featuredStory.visual.after.title}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-morphic border-primary/20 card-glow">
                <CardHeader>
                    <CardTitle className="text-center text-lg text-primary">{featuredStory.roiGraph.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={featuredStory.roiGraph.data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--primary)/0.1)' }}/>
                            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
