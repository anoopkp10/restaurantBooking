import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Sparkles, UtensilsCrossed, Flame, HeartHandshake, Quote } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { data } = useRestaurant();
  const hp = data.homepage;

  return (
    <section id="about" className="py-24 bg-stone-900/60 text-stone-200 border-t border-b border-stone-800/80 relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Culinary Heritage & Vision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-stone-100 mb-4">
            {hp.aboutHeading}
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-amber-400 to-amber-600 mx-auto rounded-full" />
        </div>

        {/* Story & Visuals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: Story narrative */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-heading font-semibold text-amber-100">
              Where Royal Tradition Meets Contemporary Precision
            </h3>
            <p className="text-stone-300 leading-relaxed text-base font-body">
              {hp.aboutStory}
            </p>
            <p className="text-stone-400 leading-relaxed text-sm font-body">
              {hp.aboutPhilosophy}
            </p>

            {/* Pillar badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 text-center">
                <Flame className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <h4 className="font-heading font-bold text-stone-100 text-sm">Babool Wood Tandoor</h4>
                <p className="text-stone-400 text-xs mt-1">High-heat charcoal roasting</p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 text-center">
                <UtensilsCrossed className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <h4 className="font-heading font-bold text-stone-100 text-sm">18-Hour Velvets</h4>
                <p className="text-stone-400 text-xs mt-1">Slow simmered reductions</p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 text-center">
                <HeartHandshake className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <h4 className="font-heading font-bold text-stone-100 text-sm">Estate Terroir</h4>
                <p className="text-stone-400 text-xs mt-1">Direct from spice farmers</p>
              </div>
            </div>
          </div>

          {/* Right Column: Imagery composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-stone-700/80 group">
                <img
                  src={hp.aboutInteriorImage}
                  alt="Aryas intimate fine dining room"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating accent badge */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-stone-950/95 border border-amber-500/40 p-5 rounded-2xl shadow-xl backdrop-blur-md max-w-xs">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-3xl font-heading font-bold text-amber-400">20+</span>
                  <div className="text-xs text-stone-300 uppercase tracking-wider font-semibold">
                    Years Culinary Excellence
                  </div>
                </div>
                <p className="text-[11px] text-stone-400">
                  Honoring the culinary treasures of Malabar, Awadh, and Old Delhi.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chef Introduction Card */}
        <div className="bg-stone-950 border border-amber-500/20 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Chef Portrait */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-amber-500/40 shadow-xl">
                  <img
                    src={hp.aboutChefImage}
                    alt={hp.aboutChefName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-amber-500 text-stone-950 p-2.5 rounded-full shadow-lg">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Chef Credentials & Words */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Meet the Culinary Maestro</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-stone-100">
                {hp.aboutChefName}
              </h3>
              <p className="text-sm font-medium text-amber-400/90 tracking-wide">
                {hp.aboutChefRole}
              </p>

              <div className="relative pl-6 border-l-2 border-amber-500/60 my-4">
                <Quote className="w-6 h-6 text-amber-500/30 absolute -top-2 -left-3" />
                <p className="text-stone-300 italic text-sm sm:text-base leading-relaxed">
                  "{hp.aboutChefBio}"
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-stone-400">
                <div>
                  <span className="text-amber-400 font-bold block text-sm">Paris & London</span>
                  <span>Classical European & Indian Pedigree</span>
                </div>
                <div>
                  <span className="text-amber-400 font-bold block text-sm">18 Custom Spice Blends</span>
                  <span>Roast in-house every morning</span>
                </div>
                <div>
                  <span className="text-amber-400 font-bold block text-sm">Private Chef's Table</span>
                  <span>Available by reservation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
