import React from 'react';
import { RestaurantProvider, useRestaurant } from './context/RestaurantContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ChefRecommendations } from './components/ChefRecommendations';
import { MenuSection } from './components/MenuSection';
import { ReservationSection } from './components/ReservationSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { AnnouncementsSection } from './components/AnnouncementsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const AppContent: React.FC = () => {
  const { data, activeView, toast } = useRestaurant();
  const visibility = data.design.sectionsVisibility;

  // Theme-specific styles
  const themeClass =
    data.design.theme === 'classic-elegant'
      ? 'theme-classic'
      : data.design.theme === 'warm-rustic'
      ? 'theme-rustic'
      : data.design.theme === 'minimalist-dark'
      ? 'theme-minimal'
      : 'theme-luxury';

  return (
    <div className={`min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-500 selection:text-stone-950 ${themeClass}`}>
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div
            className={`px-4 py-3 rounded-2xl shadow-2xl border flex items-center gap-2.5 text-xs font-semibold ${
              toast.type === 'error'
                ? 'bg-rose-950/90 border-rose-800 text-rose-200'
                : 'bg-stone-900/95 border-amber-500/50 text-amber-300'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {activeView === 'admin' ? (
        <AdminDashboard />
      ) : (
        <>
          <Navbar />
          <main>
            {visibility.hero && <HeroSection />}
            {visibility.about && <AboutSection />}
            {visibility.chefRecommendations && <ChefRecommendations />}
            {visibility.menu && <MenuSection />}
            {visibility.reservations && <ReservationSection />}
            {visibility.testimonials && <TestimonialsSection />}
            {visibility.locationHours && <LocationHoursSection />}
            {visibility.announcements && <AnnouncementsSection />}
            {visibility.faq && <FaqSection />}
            {visibility.contact && <ContactSection />}
          </main>
          <Footer />
          <ReservationModal />
        </>
      )}
    </div>
  );
};

export default function App() {
  return (
    <RestaurantProvider>
      <AppContent />
    </RestaurantProvider>
  );
}
