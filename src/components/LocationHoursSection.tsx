import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Clock, MapPin, Phone, Car, Navigation, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

export const LocationHoursSection: React.FC = () => {
  const { data } = useRestaurant();
  const hp = data.homepage;
  const hours = data.hours;

  // Compute current day of week
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = days[new Date().getDay()];

  return (
    <section id="location-hours" className="py-24 bg-stone-950 text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Visit Aryas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-stone-100 mb-4">
            Hours, Location & Valet
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-body">
            Located in the heart of the cultural district, designed for effortless arrival and tranquil evenings.
          </p>
          <div className="w-20 h-1 bg-linear-to-r from-amber-400 to-amber-600 mx-auto mt-6 rounded-full" />
        </div>

        {/* 2-Column Grid: Hours on Left, Map & Address on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Hours Card */}
          <div className="lg:col-span-6 bg-stone-900/80 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between pb-6 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-stone-100">Service Hours</h3>
                  <p className="text-xs text-stone-400">Lunch & Evening Dinner</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800/80 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Open Today
              </span>
            </div>

            {/* Special Notice Banner if active */}
            {hours.isSpecialNoticeActive && hours.specialNotice && (
              <div className="my-5 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3">
                <Car className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="font-semibold block text-amber-300">Patron Notice:</strong>
                  {hours.specialNotice}
                </div>
              </div>
            )}

            {/* Weekly Schedule */}
            <div className="space-y-2.5 my-6">
              {hours.regularHours.map((item) => {
                const isToday = item.day.toLowerCase() === todayName.toLowerCase();
                return (
                  <div
                    key={item.day}
                    className={`flex items-center justify-between p-3 rounded-xl transition-colors text-xs sm:text-sm ${
                      isToday
                        ? 'bg-amber-500/15 border border-amber-500/40 text-amber-100 font-semibold'
                        : 'bg-stone-950/60 text-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{item.day}</span>
                      {isToday && (
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold">
                          Today
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      {item.lunch !== 'Closed' ? (
                        <div>
                          <span className="text-stone-400 text-[11px] block sm:inline mr-2">
                            Lunch: {item.lunch}
                          </span>
                          <span>Dinner: {item.dinner}</span>
                        </div>
                      ) : (
                        <span>Dinner: {item.dinner}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-xs text-stone-400 flex items-center justify-between pt-4 border-t border-stone-800">
              <span>Last kitchen seating 45 minutes prior to close</span>
              <span className="text-amber-400">Walk-ins welcome based on availability</span>
            </div>
          </div>

          {/* Location & Interactive Map Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-stone-900/80 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-stone-100">Location & Arrival</h3>
                  <p className="text-xs text-stone-400">Grand Avenue Arts & Dining District</p>
                </div>
              </div>

              {/* Styled Interactive Map Representation */}
              <div className="relative h-64 rounded-2xl overflow-hidden border border-stone-800 shadow-inner group">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop"
                  alt="Aryas Restaurant Neighborhood Map"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-60 contrast-125 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-stone-950/40 backdrop-blur-[1px]" />

                {/* Simulated Pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
                  <div className="bg-amber-500 text-stone-950 p-2.5 rounded-full shadow-2xl border-2 border-stone-950">
                    <MapPin className="w-6 h-6 fill-stone-950" />
                  </div>
                  <div className="bg-stone-950/90 text-amber-300 font-heading font-bold text-xs px-3 py-1 rounded-full shadow-lg border border-amber-500/40 mt-1 whitespace-nowrap">
                    Aryas Fine Dining
                  </div>
                </div>

                {/* Map Action Button */}
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(hp.address + ', ' + hp.cityStateZip)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 bg-stone-950/90 hover:bg-amber-500 hover:text-stone-950 text-amber-300 text-xs px-4 py-2 rounded-full border border-amber-500/40 transition-colors flex items-center gap-1.5 shadow-lg backdrop-blur-md"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Quick Details List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-1">
                  <div className="text-stone-500 font-medium">Full Address</div>
                  <div className="text-stone-200 font-semibold">{hp.address}</div>
                  <div className="text-stone-400">{hp.cityStateZip}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-1">
                  <div className="text-stone-500 font-medium">Concierge Direct</div>
                  <div className="text-amber-400 font-semibold">{hp.phone}</div>
                  <div className="text-stone-400">{hp.email}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950/40 border border-stone-800/80 text-xs text-stone-400 space-y-2">
                <div className="flex items-center gap-2 text-stone-300 font-medium">
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>Transit & Valet Directions:</span>
                </div>
                <p className="leading-relaxed">
                  Valet stands are stationed directly in front of the main foyer on Grand Avenue. 
                  Conveniently situated 4 minutes from Powell Street station and civic parking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
