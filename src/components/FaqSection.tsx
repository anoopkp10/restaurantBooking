import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageSquare } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { data } = useRestaurant();
  const [openId, setOpenId] = useState<string | null>(data.faqs[0]?.id || null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Dietary', 'Reservations', 'Parking & Location', 'Events & Private Dining'];

  const filteredFaqs = data.faqs.filter((faq) => {
    if (activeCategory === 'All') return true;
    return faq.category === activeCategory;
  });

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="faq" className="py-24 bg-stone-950 text-stone-100 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Dining Essentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-stone-100 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-body">
            Everything you need to know about dietary accommodations, valet parking, dress code, and reservation policies.
          </p>
          <div className="w-20 h-1 bg-linear-to-r from-amber-400 to-amber-600 mx-auto mt-6 rounded-full" />
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-500 text-stone-950 font-semibold shadow-md'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-stone-900/80 border border-stone-800 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-stone-900 transition-colors cursor-pointer"
                >
                  <span className="font-heading font-semibold text-base sm:text-lg text-stone-100">
                    {faq.question}
                  </span>
                  <div className="p-1 rounded-full bg-stone-950 text-amber-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-stone-300 text-sm leading-relaxed border-t border-stone-850 font-body animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional help footer */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-stone-900/40 border border-stone-800 text-xs text-stone-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-400" />
            Have a custom dietary requirement or planning a banquet?
          </span>
          <button
            onClick={scrollToContact}
            className="px-4 py-2 rounded-full bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-amber-300 font-semibold transition-colors"
          >
            Direct Host Inquiry
          </button>
        </div>
      </div>
    </section>
  );
};
