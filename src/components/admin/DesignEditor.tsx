import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { DesignConfig } from '../../types';
import { Palette, Type, Layout, Check, Sliders } from 'lucide-react';

export const DesignEditor: React.FC = () => {
  const { data, updateDesign } = useRestaurant();
  const [design, setDesign] = useState<DesignConfig>({ ...data.design });

  const themeOptions: { id: DesignConfig['theme']; name: string; bg: string; accent: string; desc: string }[] = [
    {
      id: 'gold-obsidian',
      name: 'Gold Obsidian',
      bg: 'bg-stone-950',
      accent: 'bg-amber-400',
      desc: 'Deep warm charcoal canvas paired with rich gold and bronze accents.'
    },
    {
      id: 'royal-emerald',
      name: 'Royal Emerald',
      bg: 'bg-emerald-950',
      accent: 'bg-emerald-400',
      desc: 'Regal dark jewel green with pale champagne gold typography.'
    },
    {
      id: 'velvet-rose',
      name: 'Velvet Rose',
      bg: 'bg-rose-950',
      accent: 'bg-amber-500',
      desc: 'Romantic saffron, dark garnet, and rich terracotta tones.'
    },
    {
      id: 'tuscan-terracotta',
      name: 'Tuscan Terracotta',
      bg: 'bg-amber-950',
      accent: 'bg-amber-300',
      desc: 'Warm spiced clay and earthen tones with golden accents.'
    }
  ];

  const fontOptions: { id: DesignConfig['fontFamily']; label: string }[] = [
    { id: 'classic-serif', label: 'Playfair Display (Serif) & Plus Jakarta Sans' },
    { id: 'cinzel-luxury', label: 'Cinzel (Classical Display) & Plus Jakarta Sans' },
    { id: 'modern-sans', label: 'Plus Jakarta Sans (Modern Clean Sans)' }
  ];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateDesign(design);
  };

  const toggleSection = (key: keyof DesignConfig['sectionsVisibility']) => {
    setDesign((prev) => ({
      ...prev,
      sectionsVisibility: {
        ...prev.sectionsVisibility,
        [key]: !prev.sectionsVisibility[key]
      }
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <h2 className="text-2xl font-heading font-bold text-stone-100">
            Design, Color Palette & Section Layout
          </h2>
          <p className="text-stone-400 text-xs mt-1">
            Customize the restaurant aesthetic, typography hierarchies, brand colors, and toggle active sections.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
        >
          <Check className="w-4 h-4" />
          <span>Apply Visual Theme</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Theme Presets */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-stone-100 font-heading font-bold text-base">
            <Palette className="w-4 h-4 text-amber-400" />
            <span>Curated Atmosphere Themes</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {themeOptions.map((th) => (
              <button
                key={th.id}
                type="button"
                onClick={() => setDesign({ ...design, theme: th.id })}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  design.theme === th.id
                    ? 'border-amber-400 bg-amber-500/10 shadow-lg'
                    : 'border-stone-800 bg-stone-950/60 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-4 h-4 rounded-full ${th.bg} border border-stone-700`} />
                  <div className={`w-4 h-4 rounded-full ${th.accent}`} />
                </div>
                <div className="font-heading font-bold text-sm text-stone-100">{th.name}</div>
                <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">{th.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Typography & Accent Color */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-stone-100 font-heading font-bold text-base">
              <Type className="w-4 h-4 text-amber-400" />
              <span>Typography Pairing</span>
            </div>

            <div className="space-y-2">
              {fontOptions.map((f) => (
                <label
                  key={f.id}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer ${
                    design.fontFamily === f.id
                      ? 'border-amber-500/60 bg-amber-500/10 text-amber-200'
                      : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="font-pair"
                      checked={design.fontFamily === f.id}
                      onChange={() => setDesign({ ...design, fontFamily: f.id })}
                      className="accent-amber-500"
                    />
                    <span>{f.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Custom Accent Color picker */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-stone-100 font-heading font-bold text-base">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Accent & Highlight Color</span>
            </div>

            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-wider text-stone-400">
                Primary Brand Accent (HEX)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={design.accentColor}
                  onChange={(e) => setDesign({ ...design, accentColor: e.target.value })}
                  className="w-10 h-10 rounded-xl bg-stone-950 border border-stone-800 cursor-pointer p-0"
                />
                <input
                  type="text"
                  value={design.accentColor}
                  onChange={(e) => setDesign({ ...design, accentColor: e.target.value })}
                  className="w-32 px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-stone-100 uppercase"
                />
                <div className="flex items-center gap-1.5">
                  {['#d97706', '#f59e0b', '#10b981', '#f43f5e', '#6366f1'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setDesign({ ...design, accentColor: preset })}
                      className="w-6 h-6 rounded-full border border-stone-700 cursor-pointer"
                      style={{ backgroundColor: preset }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Layout & Visibility */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-stone-100 font-heading font-bold text-base">
              <Layout className="w-4 h-4 text-amber-400" />
              <span>Homepage Section Controls</span>
            </div>
            <span className="text-xs text-stone-400">Toggle sections on/off instantly</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { key: 'hero', label: 'Hero Showcase & Quick Booking' },
              { key: 'about', label: 'Story & Master Chef Profile' },
              { key: 'menu', label: 'A La Carte Menu & Categories' },
              { key: 'chefRecommendations', label: 'Chef Degustation Picks' },
              { key: 'reservations', label: 'Reservation Booking Section' },
              { key: 'testimonials', label: 'Google Reviews & Acclaim' },
              { key: 'locationHours', label: 'Hours, Map & Valet Directions' },
              { key: 'announcements', label: 'Events & Culinary Journal' },
              { key: 'faq', label: 'Frequently Asked Questions' },
              { key: 'contact', label: 'Inquiries & Contact Desk' }
            ].map((sec) => {
              const isVisible = (design.sectionsVisibility as any)[sec.key];
              return (
                <div
                  key={sec.key}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-950 border border-stone-800 text-xs"
                >
                  <span className="text-stone-200 font-medium">{sec.label}</span>
                  <button
                    type="button"
                    onClick={() => toggleSection(sec.key as any)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                      isVisible
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-stone-900 text-stone-500 border border-stone-800'
                    }`}
                  >
                    {isVisible ? 'Enabled' : 'Hidden'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
};
