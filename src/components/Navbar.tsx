import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Calendar, Clock, Phone, Settings, Sparkles, Menu as MenuIcon, X, MapPin } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { data, activeView, setActiveView, setIsReservationModalOpen } = useRestaurant();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (activeView === 'admin') {
      setActiveView('website');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Banner */}
      <div className="bg-stone-900/95 border-b border-amber-950/60 text-stone-300 text-xs py-1.5 px-4 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium tracking-wider uppercase text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {data.homepage.heroBadge.split('•')[0] || 'Michelin Recommended'}
            </span>
            <span className="hidden sm:inline text-stone-600">•</span>
            <span className="hidden md:inline-flex items-center gap-1 text-stone-300">
              <Clock className="w-3 h-3 text-amber-500/80" />
              Dinner Tonight from 5:00 PM
            </span>
            <span className="hidden lg:inline text-stone-600">•</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-stone-300">
              <MapPin className="w-3 h-3 text-amber-500/80" />
              {data.homepage.address}, {data.homepage.cityStateZip}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${data.homepage.phone}`}
              className="inline-flex items-center gap-1 text-stone-200 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span className="font-medium">{data.homepage.phone}</span>
            </a>
            
            {/* View Switcher Button (Live Website <-> Admin CMS) */}
            <div className="flex items-center bg-stone-950/80 p-0.5 rounded-full border border-amber-500/20">
              <button
                id="btn-nav-view-site"
                onClick={() => setActiveView('website')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all ${
                  activeView === 'website'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-xs'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Diner View
              </button>
              <button
                id="btn-nav-view-admin"
                onClick={() => setActiveView('admin')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium flex items-center gap-1 transition-all ${
                  activeView === 'admin'
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-xs'
                    : 'text-amber-400/90 hover:text-amber-300'
                }`}
              >
                <Settings className="w-3 h-3" />
                Admin Suite
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <nav className="bg-stone-950/90 backdrop-blur-xl border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div 
            onClick={() => scrollTo('hero')} 
            className="cursor-pointer group flex flex-col items-start"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-heading font-bold tracking-widest text-amber-100 group-hover:text-amber-300 transition-colors">
                ARYAS
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            </div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-amber-400/80 font-medium">
              Artisanal Indian Dining
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-300">
            <button onClick={() => scrollTo('about')} className="hover:text-amber-300 transition-colors cursor-pointer">
              Our Story
            </button>
            <button onClick={() => scrollTo('menu')} className="hover:text-amber-300 transition-colors cursor-pointer">
              Menu & Pricing
            </button>
            <button onClick={() => scrollTo('recommendations')} className="hover:text-amber-300 transition-colors cursor-pointer">
              Chef's Table
            </button>
            <button onClick={() => scrollTo('stories')} className="hover:text-amber-300 transition-colors cursor-pointer">
              Events & Stories
            </button>
            <button onClick={() => scrollTo('location-hours')} className="hover:text-amber-300 transition-colors cursor-pointer">
              Hours & Location
            </button>
            <button onClick={() => scrollTo('testimonials')} className="hover:text-amber-300 transition-colors cursor-pointer">
              Reviews
            </button>
            <button onClick={() => scrollTo('faq')} className="hover:text-amber-300 transition-colors cursor-pointer">
              FAQ
            </button>
            <button onClick={() => scrollTo('contact')} className="hover:text-amber-300 transition-colors cursor-pointer">
              Inquiries
            </button>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="nav-book-table-btn"
              onClick={() => {
                if (activeView === 'admin') setActiveView('website');
                setIsReservationModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-full bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-semibold text-sm shadow-md hover:shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-4 h-4 text-stone-950" />
              <span>Book a Table</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              id="mobile-book-btn"
              onClick={() => setIsReservationModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full bg-amber-500 text-stone-950 font-semibold text-xs flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-300 hover:text-amber-400 hover:bg-stone-900 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-stone-950 border-t border-stone-800/80 px-6 py-6 space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-2 gap-3 text-stone-300 text-sm">
              <button onClick={() => scrollTo('about')} className="text-left py-2 hover:text-amber-300">
                Our Story
              </button>
              <button onClick={() => scrollTo('menu')} className="text-left py-2 hover:text-amber-300">
                Menu & Pricing
              </button>
              <button onClick={() => scrollTo('recommendations')} className="text-left py-2 hover:text-amber-300">
                Chef's Specials
              </button>
              <button onClick={() => scrollTo('stories')} className="text-left py-2 hover:text-amber-300">
                Events & Posts
              </button>
              <button onClick={() => scrollTo('location-hours')} className="text-left py-2 hover:text-amber-300">
                Hours & Valet
              </button>
              <button onClick={() => scrollTo('testimonials')} className="text-left py-2 hover:text-amber-300">
                Reviews
              </button>
              <button onClick={() => scrollTo('faq')} className="text-left py-2 hover:text-amber-300">
                FAQ
              </button>
              <button onClick={() => scrollTo('contact')} className="text-left py-2 hover:text-amber-300">
                Contact
              </button>
            </div>

            <div className="pt-4 border-t border-stone-800 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsReservationModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-amber-500 text-stone-950 font-bold text-center flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Reserve Table Now
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveView(activeView === 'website' ? 'admin' : 'website');
                }}
                className="w-full py-2.5 rounded-xl border border-amber-500/30 text-amber-300 font-medium text-xs flex items-center justify-center gap-2"
              >
                <Settings className="w-3.5 h-3.5" />
                {activeView === 'website' ? 'Switch to Admin & CMS Panel' : 'Return to Website'}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
