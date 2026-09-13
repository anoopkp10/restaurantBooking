import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Sparkles, Calendar, ArrowRight, BookOpen, Tag } from 'lucide-react';
import { BlogPost } from '../types';

export const AnnouncementsSection: React.FC = () => {
  const { data, setIsReservationModalOpen } = useRestaurant();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const publishedPosts = data.posts.filter((p) => p.isPublished);

  if (publishedPosts.length === 0) return null;

  return (
    <section id="stories" className="py-24 bg-stone-900/60 text-stone-100 border-t border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Culinary Journal & Events</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-stone-100">
              Announcements & Soirées
            </h2>
          </div>
          <p className="text-stone-300 text-sm max-w-md">
            Discover our seasonal tasting releases, vineyard collaborations, live jazz nights, and restaurant updates.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publishedPosts.map((post) => (
            <article
              key={post.id}
              className="bg-stone-950 border border-stone-800 rounded-3xl overflow-hidden shadow-xl hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 left-4 bg-amber-500/90 text-stone-950 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <Calendar className="w-3.5 h-3.5 text-amber-500/70" />
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>By {post.author}</span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-stone-400 text-xs sm:text-sm leading-relaxed line-clamp-3 font-body">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <span>Read Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Story Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-stone-900 border border-amber-500/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="relative h-60 rounded-2xl overflow-hidden -mt-2">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-amber-500 text-stone-950 px-3 py-1 rounded-full text-xs font-bold uppercase">
                {selectedPost.category}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs text-stone-400 mb-2">
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span>Written by {selectedPost.author}</span>
              </div>
              <h3 className="font-heading font-bold text-2xl text-stone-100 mb-4">
                {selectedPost.title}
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-line font-body">
                {selectedPost.content}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedPost(null);
                  setIsReservationModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
              >
                Reserve Table for this Event
              </button>

              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
