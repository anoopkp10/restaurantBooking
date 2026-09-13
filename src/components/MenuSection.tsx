import React, { useState, useMemo } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem, DietaryTag } from '../types';
import { Utensils, Sparkles, Search, Flame, Leaf, Award, Clock, Calendar } from 'lucide-react';

export const MenuSection: React.FC = () => {
  const { data, setIsReservationModalOpen, setSelectedDishForReservation } = useRestaurant();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDishDetail, setSelectedDishDetail] = useState<MenuItem | null>(null);

  const categories = ['All', ...data.categories];
  const dietaryFilters: (DietaryTag | 'All')[] = [
    'All',
    'Chef Special',
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Halal'
  ];

  const filteredMenu = useMemo(() => {
    return data.menu.filter((item) => {
      const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchDietary = selectedDietary === 'All' || item.dietary.includes(selectedDietary);
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchDietary && matchSearch;
    });
  }, [data.menu, selectedCategory, selectedDietary, searchQuery]);

  const handleBookDish = (dish: MenuItem) => {
    setSelectedDishForReservation(dish.name);
    setIsReservationModalOpen(true);
  };

  return (
    <section id="menu" className="py-24 bg-stone-950 text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Utensils className="w-3.5 h-3.5" />
            <span>Curated Culinary Offerings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-stone-100 mb-4">
            The Aryas Dining Menu
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-body">
            Each creation is a testament to authentic artisanal spices, royal Awadhi reductions, and fresh seasonal harvests.
          </p>
          <div className="w-20 h-1 bg-linear-to-r from-amber-400 to-amber-600 mx-auto mt-6 rounded-full" />
        </div>

        {/* Search & Filter Controls */}
        <div className="space-y-4 mb-12">
          {/* Search bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes (e.g., Truffle, Biryani, Butter Chicken, Paneer)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-stone-900 border border-stone-800 focus:border-amber-500/60 focus:outline-none text-sm text-stone-200 placeholder-stone-500 transition-all shadow-inner"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-md'
                    : 'bg-stone-900/80 text-stone-400 hover:text-stone-200 hover:bg-stone-850 border border-stone-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dietary Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
            <span className="text-xs text-stone-400 mr-1 flex items-center gap-1">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" /> Filter:
            </span>
            {dietaryFilters.map((diet) => (
              <button
                key={diet}
                onClick={() => setSelectedDietary(diet)}
                className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                  selectedDietary === diet
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-medium'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-300 border border-stone-800'
                }`}
              >
                {diet}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        {filteredMenu.length === 0 ? (
          <div className="text-center py-16 bg-stone-900/40 rounded-3xl border border-stone-800">
            <Utensils className="w-12 h-12 text-stone-600 mx-auto mb-3" />
            <h3 className="text-lg font-heading text-stone-300">No dishes found matching your selection</h3>
            <p className="text-stone-400 text-xs mt-1">Try resetting the category or search filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedDietary('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold hover:bg-amber-500/30 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenu.map((dish) => (
              <div
                key={dish.id}
                className="group bg-stone-900/70 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Image & Badges */}
                <div className="relative h-56 overflow-hidden bg-stone-950">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-transparent to-transparent opacity-80" />

                  {/* Price Tag */}
                  <div className="absolute top-4 right-4 bg-stone-950/90 border border-amber-500/40 px-3 py-1 rounded-full text-amber-300 font-heading font-bold text-sm backdrop-blur-md shadow-md">
                    ${dish.price.toFixed(2)}
                  </div>

                  {/* Special Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                    {dish.isChefRecommendation && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        <Award className="w-3 h-3 text-stone-950" /> Chef Pick
                      </span>
                    )}
                    {dish.isPopular && !dish.isChefRecommendation && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/90 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        <Sparkles className="w-3 h-3" /> Popular
                      </span>
                    )}
                  </div>

                  {/* Category Pill */}
                  <div className="absolute bottom-3 left-4 text-[11px] text-stone-400 font-medium tracking-wider uppercase">
                    {dish.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-heading font-bold text-lg text-stone-100 group-hover:text-amber-300 transition-colors">
                        {dish.name}
                      </h3>
                    </div>

                    <p className="text-stone-300 text-xs sm:text-sm leading-relaxed line-clamp-3 font-body">
                      {dish.description}
                    </p>
                  </div>

                  {/* Dietary tags & Spice */}
                  <div className="pt-2 border-t border-stone-800/80 space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      {/* Dietary Badges */}
                      <div className="flex flex-wrap gap-1">
                        {dish.dietary.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                              tag === 'Vegetarian'
                                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                                : tag === 'Vegan'
                                ? 'bg-teal-950/80 text-teal-300 border border-teal-800/60'
                                : tag === 'Gluten-Free'
                                ? 'bg-sky-950/80 text-sky-300 border border-sky-800/60'
                                : 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Spice Level Indicator */}
                      {dish.spiciness !== undefined && dish.spiciness > 0 && (
                        <div className="flex items-center gap-0.5" title={`Spiciness Level: ${dish.spiciness}/3`}>
                          {Array.from({ length: dish.spiciness }).map((_, i) => (
                            <Flame key={i} className="w-3 h-3 text-red-400 fill-red-400" />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Book Table for this dish CTA */}
                    <div className="flex items-center justify-between gap-2 pt-1">
                      {dish.prepTime && (
                        <span className="text-[11px] text-stone-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400" /> {dish.prepTime}
                        </span>
                      )}
                      <button
                        onClick={() => handleBookDish(dish)}
                        className="ml-auto inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold group-hover:translate-x-0.5 transition-all cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Reserve to Taste</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
