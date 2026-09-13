import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Settings, Heart, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, setActiveView } = useRestaurant();
  const hp = data.homepage;
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-850 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="cursor-pointer" onClick={() => scrollTo('hero')}>
              <div className="text-2xl font-heading font-bold tracking-widest text-amber-100">
                ARYAS
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-medium">
                Artisanal Indian Dining
              </div>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-body max-w-sm">
              An epicurean sanctuary honoring royal Awadhi slow-roasts, stone-ground Malabar spices, and contemporary culinary craft.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 hover:border-amber-500/50 hover:text-amber-400 flex items-center justify-center transition-colors"
                aria-label="Aryas Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 hover:border-amber-500/50 hover:text-amber-400 flex items-center justify-center transition-colors"
                aria-label="Aryas Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 hover:border-amber-500/50 hover:text-amber-400 flex items-center justify-center transition-colors"
                aria-label="Aryas Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => scrollTo('about')} className="hover:text-amber-300 transition-colors">
                  Our Culinary Story
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('menu')} className="hover:text-amber-300 transition-colors">
                  A La Carte Menu
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('recommendations')} className="hover:text-amber-300 transition-colors">
                  Chef's Degustation
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('reservation-section')} className="hover:text-amber-300 transition-colors">
                  Reserve a Table
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('stories')} className="hover:text-amber-300 transition-colors">
                  Events & Announcements
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('faq')} className="hover:text-amber-300 transition-colors">
                  FAQ & Dietary
                </button>
              </li>
            </ul>
          </div>

          {/* Opening Hours Short */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
              Dining Hours
            </h4>
            <div className="text-xs text-stone-400 space-y-1.5 leading-relaxed">
              <div>
                <strong className="text-stone-200 block">Monday:</strong>
                <span>Dinner: 5:00 PM – 10:00 PM</span>
              </div>
              <div>
                <strong className="text-stone-200 block">Tuesday – Friday:</strong>
                <span>Lunch: 11:30 AM – 2:30 PM | Dinner: 5:00 PM – 10:30 PM</span>
              </div>
              <div>
                <strong className="text-stone-200 block">Saturday – Sunday:</strong>
                <span>Lunch: 12:00 PM – 3:30 PM | Dinner: 5:00 PM – 11:00 PM</span>
              </div>
            </div>
          </div>

          {/* Newsletter & Club */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
              The Epicurean Guild
            </h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Subscribe for private tasting invitations, seasonal truffle menus, and sommelier dinners.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You're on the exclusive guest list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-100 placeholder-stone-500 focus:border-amber-500/80 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  Join Exclusive Circle
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Aryas Restaurant. All Rights Reserved. Artisanal Indian Cuisine.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveView('admin')}
              className="inline-flex items-center gap-1.5 text-stone-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Owner & Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
