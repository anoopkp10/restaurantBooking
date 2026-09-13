import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Star, MessageSquare, CheckCircle, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { data } = useRestaurant();

  return (
    <section id="testimonials" className="py-24 bg-stone-900/40 text-stone-100 border-t border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Aggregate Badge */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Patron Experiences</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-stone-100 mb-4">
            Acclaim & Google Reviews
          </h2>

          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-stone-950 border border-amber-500/30 shadow-md my-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-heading font-bold text-lg text-amber-400">
              {data.homepage.googleRating} / 5.0
            </span>
            <span className="text-stone-400 text-xs">
              Based on {data.homepage.totalReviews} verified Google reviews
            </span>
          </div>

          <div className="w-20 h-1 bg-linear-to-r from-amber-400 to-amber-600 mx-auto mt-6 rounded-full" />
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.testimonials.map((review) => (
            <div
              key={review.id}
              className="bg-stone-950 border border-stone-800/90 rounded-3xl p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-500">{review.date}</span>
                </div>

                <div className="relative">
                  <Quote className="w-6 h-6 text-stone-800 absolute -top-1 -left-1" />
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed relative z-10 pl-2 font-body">
                    "{review.comment}"
                  </p>
                </div>
              </div>

              {/* Reviewer info */}
              <div className="pt-4 mt-4 border-t border-stone-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {review.avatar && (
                    <img
                      src={review.avatar}
                      alt={review.name}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full object-cover border border-stone-800"
                    />
                  )}
                  <div>
                    <h4 className="text-xs font-bold text-stone-100">{review.name}</h4>
                    <span className="text-[10px] text-amber-400/80 font-medium flex items-center gap-1">
                      <CheckCircle className="w-2.5 h-2.5 text-emerald-400" />
                      {review.source}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
