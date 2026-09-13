import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import {
  UtensilsCrossed,
  Calendar,
  MessageSquare,
  Clock,
  BookOpen,
  Palette,
  Search,
  Image as ImageIcon,
  ArrowLeft,
  RefreshCcw,
  Sparkles,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

import { MenuManager } from './MenuManager';
import { ReservationManager } from './ReservationManager';
import { InquiryManager } from './InquiryManager';
import { HoursEditor } from './HoursEditor';
import { CmsManager } from './CmsManager';
import { DesignEditor } from './DesignEditor';
import { SeoEditor } from './SeoEditor';
import { MediaLibrary } from './MediaLibrary';

type AdminTab =
  | 'menu'
  | 'reservations'
  | 'inquiries'
  | 'hours'
  | 'cms'
  | 'design'
  | 'seo'
  | 'media';

export const AdminDashboard: React.FC = () => {
  const { data, setActiveView, resetData, showToast } = useRestaurant();
  const [activeTab, setActiveTab] = useState<AdminTab>('reservations');

  const pendingReservations = data.reservations.filter((r) => r.status === 'Pending').length;
  const unreadInquiries = data.inquiries.filter((i) => i.status === 'Unread').length;

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'reservations', label: 'Reservations', icon: <Calendar className="w-4 h-4" />, badge: pendingReservations },
    { id: 'menu', label: 'Menu Manager', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: 'inquiries', label: 'Customer Inquiries', icon: <MessageSquare className="w-4 h-4" />, badge: unreadInquiries },
    { id: 'cms', label: 'CMS & Content', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'hours', label: 'Opening Hours', icon: <Clock className="w-4 h-4" /> },
    { id: 'design', label: 'Design & Themes', icon: <Palette className="w-4 h-4" /> },
    { id: 'seo', label: 'SEO & Meta', icon: <Search className="w-4 h-4" /> },
    { id: 'media', label: 'Media Library', icon: <ImageIcon className="w-4 h-4" /> }
  ];

  const handleResetData = async () => {
    if (confirm('Reset all restaurant data, menu items, and bookings back to initial seed data?')) {
      await resetData();
      showToast('All restaurant data successfully reset to seed data!');
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Top Bar */}
      <header className="bg-stone-900/90 border-b border-stone-800 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveView('diner')}
              className="px-3.5 py-1.5 rounded-full bg-stone-950 hover:bg-stone-800 text-stone-300 text-xs font-semibold border border-stone-800 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Diner Website</span>
            </button>

            <div className="hidden sm:block h-5 w-px bg-stone-800" />

            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-base tracking-wider text-amber-100">
                ARYAS
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold uppercase">
                Owner Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetData}
              className="px-3 py-1.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-400 hover:text-stone-200 text-xs border border-stone-800 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset all sample data"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset Seed Data</span>
            </button>

            <button
              onClick={() => setActiveView('diner')}
              className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <span>Live Website View</span>
            </button>
          </div>
        </div>
      </header>

      {/* KPI Stats Bar */}
      <section className="bg-stone-900/40 border-b border-stone-850 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone-400">Total Bookings</span>
                <div className="text-2xl font-heading font-bold text-stone-100 mt-0.5">
                  {data.reservations.length}
                </div>
              </div>
              {pendingReservations > 0 ? (
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{pendingReservations} Pending</span>
                </div>
              ) : (
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                  All Cleared
                </div>
              )}
            </div>

            <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone-400">Active Dishes</span>
                <div className="text-2xl font-heading font-bold text-stone-100 mt-0.5">
                  {data.menu.length}
                </div>
              </div>
              <div className="p-2 rounded-xl bg-stone-950 text-amber-400 text-xs font-semibold">
                {data.categories.length} Categories
              </div>
            </div>

            <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone-400">Guest Inquiries</span>
                <div className="text-2xl font-heading font-bold text-stone-100 mt-0.5">
                  {data.inquiries.length}
                </div>
              </div>
              {unreadInquiries > 0 && (
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-bold">
                  {unreadInquiries} New
                </div>
              )}
            </div>

            <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone-400">Google Reputation</span>
                <div className="text-2xl font-heading font-bold text-amber-400 mt-0.5">
                  {data.homepage.googleRating} ★
                </div>
              </div>
              <div className="p-2 rounded-xl bg-stone-950 text-stone-400 text-xs font-semibold">
                {data.homepage.totalReviews} Reviews
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Admin Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-1">
          <div className="px-3 pb-2 text-[10px] uppercase tracking-widest text-stone-500 font-semibold">
            Admin Modules
          </div>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full px-4 py-3 rounded-2xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                    : 'text-stone-400 hover:text-stone-100 hover:bg-stone-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-stone-950 text-amber-300'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Dynamic Content Panel */}
        <main className="flex-1 min-w-0">
          {activeTab === 'reservations' && <ReservationManager />}
          {activeTab === 'menu' && <MenuManager />}
          {activeTab === 'inquiries' && <InquiryManager />}
          {activeTab === 'cms' && <CmsManager />}
          {activeTab === 'hours' && <HoursEditor />}
          {activeTab === 'design' && <DesignEditor />}
          {activeTab === 'seo' && <SeoEditor />}
          {activeTab === 'media' && <MediaLibrary />}
        </main>
      </div>
    </div>
  );
};
