
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, PieChart, ArrowRight } from "lucide-react";
import content from "@/app/content/case-stories.json";
import Link from "next/link";

const icons: { [key: string]: React.ReactNode } = {
  TrendingUp: <TrendingUp className="h-8 w-8 text-primary" />,
  Users: <Users className="h-8 w-8 text-primary" />,
  PieChart: <PieChart className="h-8 w-8 text-primary" />,
};

export default function StoryGrid() {
  const { stories } = content;

  return (
    <section id="story-grid" className="w-full py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <Link key={story.slug} href={`/case-studies/${story.slug}`} passHref>
              <Card className="glass-morphic card-glow border-primary/20 flex flex-col h-full cursor-pointer group">
                <CardContent className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{story.title}</h3>
                    <p className="text-muted-foreground">{story.description}</p>
                  </div>
                  <div className="mt-6 flex justify-center">
                      {story.visual.type === 'graph' && (
                          <div className="text-center p-4 rounded-lg glass-morphic border border-primary/20 w-48">
                              <p className="text-sm text-muted-foreground">{story.visual.data.title}</p>
                              <p className="text-4xl font-bold text-primary text-glow">{story.visual.data.metric}</p>
                          </div>
                      )}
                      {story.visual.type === 'flowchart' && (
                          <div className="flex items-center gap-2 text-sm text-center">
                              <div className="flex flex-col items-center gap-1 p-2 glass-morphic rounded-lg border border-red-400/20">
                                  <Users className="h-6 w-6 text-red-400"/>
                                  <span>{story.visual.data.before}</span>
                              </div>
                              <ArrowRight className="h-5 w-5 text-primary/50" />
                              <div className="flex flex-col items-center gap-1 p-2 glass-morphic rounded-lg border border-green-400/20">
                                  <Users className="h-6 w-6 text-green-400"/>
                                  <span>{story.visual.data.after}</span>
                              </div>
                          </div>
                      )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
