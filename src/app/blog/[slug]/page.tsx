
'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import blogContent from '@/app/content/blog.json';
import { HealthCheckModal } from '@/components/modals/health-check-modal';
import { useEffect, useState } from 'react';

// This is now a client component to handle dynamic date formatting safely.

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [formattedDate, setFormattedDate] = useState('');
  const post = blogContent.posts.find((p) => p.slug === params.slug);

  useEffect(() => {
    if (post) {
      setFormattedDate(new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    }
  }, [post]);

  if (!post) {
    notFound();
  }

  const author = blogContent.authors.find(a => a.id === post.authorId);

  return (
    <article className="min-h-screen">
      <header className="relative w-full h-[60vh] text-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover animate-zoom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10" />
        </div>
        <div className="container px-4 md:px-6 relative z-20 flex flex-col justify-end h-full pb-20">
          <div className="space-y-4">
             <p className="text-primary font-semibold text-glow">{post.category}</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white text-glow">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-neutral-300">
                {author && (
                    <div className="flex items-center gap-2">
                        <Image src={author.avatar} alt={author.name} width={32} height={32} className="rounded-full" />
                        <span>{author.name}</span>
                    </div>
                )}
                <span>&bull;</span>
                <time dateTime={post.date}>{formattedDate}</time>
            </div>
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
            <div className="grid lg:grid-cols-12 gap-8">
                <main className="lg:col-span-9">
                    <Card className="glass-morphic border-primary/20 p-6 md:p-8">
                        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground">
                           <p>{post.content}</p>
                        </div>
                    </Card>
                </main>
                <aside className="lg:col-span-3">
                    <div className="sticky top-28 space-y-6">
                       {author && (
                         <Card className="glass-morphic border-primary/20 p-4 text-center">
                            <Image src={author.avatar} alt={author.name} width={80} height={80} className="rounded-full mx-auto mb-4" />
                            <h3 className="font-bold text-foreground">{author.name}</h3>
                            <p className="text-sm text-muted-foreground">{author.role}</p>
                        </Card>
                       )}
                        <Card className="glass-morphic border-primary/20 p-4">
                            <h3 className="font-bold text-center mb-4 text-primary">Share This Post</h3>
                            <div className="flex justify-center gap-4">
                               <Button variant="outline" size="icon" className="glass-morphic"><Twitter /></Button>
                               <Button variant="outline" size="icon" className="glass-morphic"><Linkedin /></Button>
                            </div>
                        </Card>
                    </div>
                </aside>
            </div>

            <div className="mt-20 text-center p-8 rounded-2xl glass-morphic border-2 border-primary/30 shadow-2xl shadow-primary/20">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6 text-glow bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-300">
                    {blogContent.postCta.headline}
                </h2>
                <HealthCheckModal defaultServiceId="data-apps">
                    <Button size="lg" className="btn-glow text-lg px-8 py-6 animate-pulse-glow">
                        {blogContent.postCta.ctaText}
                    </Button>
                </HealthCheckModal>
            </div>
        </div>
      </div>
    </article>
  );
}
