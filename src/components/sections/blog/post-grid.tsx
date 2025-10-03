
"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import blogContent from '@/app/content/blog.json';

type Post = typeof blogContent.posts[0];

const PostCard = ({ post }: { post: Post }) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // Ensure this runs only on the client
    setFormattedDate(new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
  }, [post.date]);

  return (
    <Link href={`/blog/${post.slug}`} passHref>
      <Card className="glass-morphic card-glow border-primary/20 flex flex-col h-full overflow-hidden group">
        <div className="relative w-full h-56">
            <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <span className="absolute top-4 right-4 bg-primary/80 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                {post.category}
            </span>
        </div>
        <CardContent className="p-6 flex-grow flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{post.title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};


export default function PostGrid() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(blogContent.posts.map(p => p.category)))];

  const filteredPosts = useMemo(() => {
    return blogContent.posts
      .filter(post => 
        selectedCategory === 'All' || post.category === selectedCategory
      )
      .filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, selectedCategory]);

  return (
    <section className="w-full py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="relative w-full md:max-w-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search insights..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-6 text-lg bg-background/50 border-primary/20 focus:bg-background focus:ring-primary"
                />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
                {categories.map(category => (
                    <Button 
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        onClick={() => setSelectedCategory(category)}
                        className={`transition-all duration-200 ${selectedCategory === category ? 'btn-glow' : 'glass-morphic'}`}
                    >
                        {category}
                    </Button>
                ))}
            </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
            <p className="text-center text-muted-foreground mt-12 col-span-full">No posts found. Try a different search or category.</p>
        )}
      </div>
    </section>
  );
}
