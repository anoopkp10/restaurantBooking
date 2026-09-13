import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Calendar, Users, Clock, Award, Star, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { data, setIsReservationModalOpen } = useRestaurant();
  const [quickDate, setQuickDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [quickTime, setQuickTime] = useState('19:00');
  const [quickGuests, setQuickGuests] = useState('2');

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToReservation = () => {
    const el = document.getElementById('reservation-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else setIsReservationModalOpen(true);
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-stone-950 text-stone-100">
      {/* Ambient background imagery with luxury gradient overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={data.homepage.heroImage}
          alt="Aryas signature artisanal dining"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter brightness-45 contrast-110 transition-transform duration-1000"
        />
        {/* Soft vignette gradients */}
        <div className="absolute inset-0 bg-radial-at-c from-stone-950/40 via-stone-950/80 to-stone-950" />
        <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col items-center text-center">
        {/* Award pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/80 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-medium backdrop-blur-md mb-6 shadow-lg">
          <Award className="w-4 h-4 text-amber-400" />
          <span>{data.homepage.heroBadge}</span>
          <span className="text-stone-500">•</span>
          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{data.homepage.googleRating}</span>
            <span className="text-stone-400 font-normal text-xs">({data.homepage.totalReviews} Google Reviews)</span>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-amber-400/90 text-xs sm:text-sm uppercase tracking-[0.35em] font-semibold mb-4">
          {data.homepage.tagline}
        </p>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-stone-100 max-w-5xl leading-[1.12] tracking-tight mb-6">
          {data.homepage.headline}
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-stone-300/90 max-w-3xl leading-relaxed font-body mb-10">
          {data.homepage.subheadline}
        </p>

        {/* Dual Primary Call-to-Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-14 w-full sm:w-auto">
          <button
            id="hero-book-table-cta"
            onClick={scrollToReservation}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-linear-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-bold text-base shadow-xl hover:shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
          >
            <Calendar className="w-5 h-5 text-stone-950" />
            <span>{data.homepage.heroCtaText}</span>
            <ArrowRight className="w-4 h-4 text-stone-950" />
          </button>

          <button
            id="hero-explore-menu-cta"
            onClick={scrollToMenu}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-stone-900/80 hover:bg-stone-800/90 border border-stone-700 hover:border-amber-500/50 text-stone-200 hover:text-amber-300 font-semibold text-base backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{data.homepage.heroSecondaryCtaText}</span>
          </button>
        </div>

        {/* Quick Instant Table Availability Bar (High Conversion Widget) */}
        <div className="w-full max-w-4xl bg-stone-900/90 border border-stone-700/70 p-4 sm:p-5 rounded-2xl sm:rounded-full backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
            {/* Date */}
            <div className="flex items-center gap-3 px-4 py-2 bg-stone-950/70 rounded-xl sm:rounded-full border border-stone-800">
              <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-left w-full">
                <div className="text-[10px] uppercase tracking-wider text-stone-400">Date</div>
                <input
                  type="date"
                  value={quickDate}
                  onChange={(e) => setQuickDate(e.target.value)}
                  className="bg-transparent text-xs text-stone-200 focus:outline-none w-full cursor-pointer"
                />
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center gap-3 px-4 py-2 bg-stone-950/70 rounded-xl sm:rounded-full border border-stone-800">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-left w-full">
                <div className="text-[10px] uppercase tracking-wider text-stone-400">Time</div>
                <select
                  value={quickTime}
                  onChange={(e) => setQuickTime(e.target.value)}
                  className="bg-transparent text-xs text-stone-200 focus:outline-none w-full cursor-pointer"
                >
                  <option value="17:00" className="bg-stone-900">5:00 PM (Early Dinner)</option>
                  <option value="18:00" className="bg-stone-900">6:00 PM</option>
                  <option value="19:00" className="bg-stone-900">7:00 PM (Prime)</option>
                  <option value="19:30" className="bg-stone-900">7:30 PM (Prime)</option>
                  <option value="20:00" className="bg-stone-900">8:00 PM (Prime)</option>
                  <option value="20:30" className="bg-stone-900">8:30 PM</option>
                  <option value="21:00" className="bg-stone-900">9:00 PM (Late Dinner)</option>
                </select>
              </div>
            </div>

            {/* Guests */}
            <div className="flex items-center gap-3 px-4 py-2 bg-stone-950/70 rounded-xl sm:rounded-full border border-stone-800">
              <Users className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-left w-full">
                <div className="text-[10px] uppercase tracking-wider text-stone-400">Guests</div>
                <select
                  value={quickGuests}
                  onChange={(e) => setQuickGuests(e.target.value)}
                  className="bg-transparent text-xs text-stone-200 focus:outline-none w-full cursor-pointer"
                >
                  <option value="1" className="bg-stone-900">1 Guest (Solo Table)</option>
                  <option value="2" className="bg-stone-900">2 Guests (Couple)</option>
                  <option value="3" className="bg-stone-900">3 Guests</option>
                  <option value="4" className="bg-stone-900">4 Guests (Standard)</option>
                  <option value="5" className="bg-stone-900">5 Guests</option>
                  <option value="6" className="bg-stone-900">6 Guests</option>
                  <option value="8" className="bg-stone-900">8+ Guests (Party)</option>
                </select>
              </div>
            </div>

            {/* Quick Submit */}
            <button
              id="hero-find-table-btn"
              onClick={() => {
                setIsReservationModalOpen(true);
              }}
              className="w-full py-3 px-5 rounded-xl sm:rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Find Table</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Feature Highlights beneath */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 w-full max-w-4xl text-stone-400 text-xs sm:text-sm">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>100% Single-Estate Spices</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Live Clay Tandoor</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Courtyard & Private Suites</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Complimentary Valet</span>
          </div>
        </div>
      </div>
    </section>
  );
};
