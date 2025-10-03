
"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import content from "@/app/content/case-stories.json";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 glass-morphic rounded-lg border border-primary/20 text-sm">
        <p className="label text-primary">{`${label}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};


export default function RoiVisual() {
  const { roiSection } = content;

  return (
    <section id="roi-visual" className="w-full py-20 lg:py-32 bg-background/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            {roiSection.headline}
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="glass-morphic border-primary/20 card-glow lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-primary text-lg">{roiSection.charts.costSavings.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={roiSection.charts.costSavings.data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={['dataMin', 'dataMax']} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }} />
                  <Line type="monotone" dataKey="savings" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} activeDot={{ r: 8, fill: 'hsl(var(--primary))' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-morphic border-primary/20 card-glow">
            <CardHeader>
              <CardTitle className="text-primary text-lg">{roiSection.charts.growthConfidence.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div>
                  <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-muted-foreground">Before</span>
                      <span className="text-sm font-medium text-primary">{roiSection.charts.growthConfidence.before}%</span>
                  </div>
                  <Progress value={roiSection.charts.growthConfidence.before} className="h-4" />
              </div>
              <div>
                  <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-muted-foreground">After</span>
                      <span className="text-sm font-medium text-primary">{roiSection.charts.growthConfidence.after}%</span>
                  </div>
                  <Progress value={roiSection.charts.growthConfidence.after} className="h-4" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
