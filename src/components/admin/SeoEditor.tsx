import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { SeoSettings } from '../../types';
import { Search, Check, Globe, Code, Sparkles, ExternalLink } from 'lucide-react';
import { api } from '../../services/api';

export const SeoEditor: React.FC = () => {
  const { data, updateSeo, showToast } = useRestaurant();
  const [seo, setSeo] = useState<SeoSettings>({ ...data.seo });
  const [aiGenerating, setAiGenerating] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSeo(seo);
  };

  const handleAiOptimize = async () => {
    setAiGenerating(true);
    try {
      const result = await api.generateAiText(
        `Write a high-converting SEO meta description (under 155 chars) for "Aryas Artisanal Indian Dining" emphasizing Michelin-trained chef, slow Awadhi roasts, wine pairings, and reservations.`,
        'seo'
      );
      if (result) {
        setSeo(prev => ({
          ...prev,
          metaDescription: result.trim().replace(/^"|"$/g, '')
        }));
        showToast('SEO Meta description optimized with AI!');
      }
    } catch (err) {
      showToast('AI generation error', 'error');
    } finally {
      setAiGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <h2 className="text-2xl font-heading font-bold text-stone-100">
            SEO & Social Metadata Settings
          </h2>
          <p className="text-stone-400 text-xs mt-1">
            Optimize search engine visibility, Google Rich Snippets (Schema.org), and Open Graph preview cards.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
        >
          <Check className="w-4 h-4" />
          <span>Save SEO Settings</span>
        </button>
      </div>

      {/* Google Search Result Preview Simulator */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-400 font-bold">
          <Search className="w-3.5 h-3.5" />
          <span>Google SERP Preview (Desktop & Mobile)</span>
        </div>

        <div className="bg-stone-950 p-5 rounded-2xl border border-stone-850 max-w-2xl space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold">
              A
            </span>
            <span>https://aryasdining.com</span>
          </div>
          <h3 className="text-base text-blue-400 hover:underline font-medium cursor-pointer">
            {seo.pageTitle}
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed font-body">
            {seo.metaDescription}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-amber-400/90 pt-1">
            <span>Rating: 4.9 ★★★★★ (640 reviews)</span>
            <span>•</span>
            <span>Price range: $$$</span>
            <span>•</span>
            <span>Indian Cuisine</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-semibold">
              Page Meta Title *
            </label>
            <input
              type="text"
              required
              value={seo.pageTitle}
              onChange={(e) => setSeo({ ...seo, pageTitle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
            />
            <span className="text-[11px] text-stone-500 mt-1 block">
              Recommended: 50-60 characters ({seo.pageTitle.length} characters)
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold">
                Meta Description *
              </label>
              <button
                type="button"
                onClick={handleAiOptimize}
                disabled={aiGenerating}
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{aiGenerating ? 'Optimizing...' : 'AI Generate Description'}</span>
              </button>
            </div>
            <textarea
              rows={3}
              required
              value={seo.metaDescription}
              onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:border-amber-500 font-body"
            />
            <span className="text-[11px] text-stone-500 mt-1 block">
              Recommended: 120-160 characters ({seo.metaDescription.length} characters)
            </span>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-semibold">
              Keywords (Comma-separated)
            </label>
            <input
              type="text"
              value={seo.metaKeywords}
              onChange={(e) => setSeo({ ...seo, metaKeywords: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-semibold">
                Social Share Image (OG:Image URL)
              </label>
              <input
                type="url"
                value={seo.ogImage}
                onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-semibold">
                Canonical URL
              </label>
              <input
                type="url"
                value={seo.canonicalUrl}
                onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Schema.org Structured Data Viewer */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 text-stone-200 font-heading font-bold text-sm">
            <Code className="w-4 h-4 text-amber-400" />
            <span>Structured Data JSON-LD (Schema.org / Restaurant)</span>
          </div>
          <p className="text-stone-400 text-xs">
            Auto-injected into the document head to power Google Maps rich cards, reservations, and rating badges.
          </p>
          <pre className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-[11px] font-mono text-amber-300 overflow-x-auto">
{`{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Aryas",
  "image": "${seo.ogImage}",
  "servesCuisine": "Modern Indian, Awadhi, Mughlai",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "452 Grand Avenue",
    "addressLocality": "San Francisco",
    "addressRegion": "CA",
    "postalCode": "94102",
    "addressCountry": "US"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "640"
  },
  "telephone": "+1-415-890-2792",
  "acceptsReservations": "True"
}`}
          </pre>
        </div>
      </form>
    </div>
  );
};
