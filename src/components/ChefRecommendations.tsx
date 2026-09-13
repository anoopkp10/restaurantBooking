import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Sparkles, Award, Wine, Calendar, Flame } from 'lucide-react';

export const ChefRecommendations: React.FC = () => {
  const { data, setIsReservationModalOpen, setSelectedDishForReservation } = useRestaurant();

  const recommendations = data.menu.filter((m) => m.isChefRecommendation);

  const handleBookDish = (dishName: string) => {
    setSelectedDishForReservation(dishName);
    setIsReservationModalOpen(true);
  };

  return (
    <section id="recommendations" className="py-24 bg-stone-900 text-stone-100 relative overflow-hidden border-t border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Gastronomic Masterpieces</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-stone-100">
              Chef Arya's Signature Selections
            </h2>
          </div>
          <p className="text-stone-300 text-sm max-w-md">
            Unrivaled culinary benchmarks that embody the soul of Aryas. Limited portions prepared fresh for each dinner service.
          </p>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.slice(0, 3).map((dish) => (
            <div
              key={dish.id}
              className="bg-stone-950 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl flex flex-col justify-between group hover:border-amber-400 transition-all duration-300"
            >
              {/* Image Banner with Badge */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/20 to-transparent" />
                <div className="absolute top-4 left-4 bg-amber-500 text-stone-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg">
                  <Sparkles className="w-3 h-3" />
                  <span>Signature Creation</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-stone-950/90 border border-amber-500/50 px-4 py-1.5 rounded-full text-amber-300 font-heading font-bold text-base backdrop-blur-md">
                  ${dish.price.toFixed(2)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-amber-400/80 font-medium">
                      {dish.category}
                    </span>
                    {dish.spiciness !== undefined && dish.spiciness > 0 && (
                      <div className="flex items-center gap-0.5 text-xs text-stone-400">
                        <Flame className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                        <span>Spice {dish.spiciness}/3</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                    {dish.name}
                  </h3>

                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-body">
                    {dish.description}
                  </p>
                </div>

                {/* Sommelier / Pairing Suggestion */}
                <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                    <Wine className="w-3.5 h-3.5 text-amber-400" />
                    <span>Sommelier Pairing Recommendation</span>
                  </div>
                  <p className="text-stone-400 text-xs italic">
                    {dish.name.includes('Lamb') || dish.name.includes('Rogan') || dish.name.includes('Gosht')
                      ? 'Best paired with a bold Willamette Valley Pinot Noir or Bourbon Old Fashioned.'
                      : dish.name.includes('Prawn') || dish.name.includes('Truffle')
                      ? 'Best paired with our chilled Saffron Cardamom Spritz or crisp Loire Valley Sancerre.'
                      : 'Best paired with handcrafted Jasmine Blossom Darjeeling Iced Infusion.'}
                  </p>
                </div>

                {/* Direct Action */}
                <button
                  onClick={() => handleBookDish(dish.name)}
                  className="w-full py-3.5 rounded-full bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-amber-300 font-semibold text-xs sm:text-sm border border-amber-500/30 hover:border-amber-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Table for this Specialty</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
