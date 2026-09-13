import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { MediaItem } from '../../types';
import { Image as ImageIcon, Plus, Copy, Check, Trash2, Filter } from 'lucide-react';

export const MediaLibrary: React.FC = () => {
  const { data, addMedia, showToast } = useRestaurant();
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [form, setForm] = useState<Omit<MediaItem, 'id'>>({
    title: '',
    url: '',
    category: 'Dishes'
  });

  const categories = ['All', 'Dishes', 'Ambiance', 'Chef & Team', 'Drinks'];

  const filteredMedia = data.media.filter((item) => {
    if (filterCategory === 'All') return true;
    return item.category === filterCategory;
  });

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    showToast('Photo URL copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.url) return;
    await addMedia(form);
    setIsAdding(false);
    setForm({ title: '', url: '', category: 'Dishes' });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <h2 className="text-2xl font-heading font-bold text-stone-100">
            Media & Photography Library
          </h2>
          <p className="text-stone-400 text-xs mt-1">
            Curate signature food photography, interior ambience, and chef portraits with 1-click URL copying.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo Asset</span>
        </button>
      </div>

      {/* Add New Asset Drawer */}
      {isAdding && (
        <div className="bg-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
          <h3 className="font-heading font-bold text-stone-100 text-base">
            Add Image Asset to Library
          </h3>
          <form onSubmit={handleAddAsset} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Title *</label>
              <input
                type="text"
                required
                placeholder="e.g., Saffron Biryani Close-up"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Image URL *</label>
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/..."
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200"
              >
                <option value="Dishes">Dishes</option>
                <option value="Ambiance">Ambiance</option>
                <option value="Chef & Team">Chef & Team</option>
                <option value="Drinks">Drinks</option>
              </select>
            </div>

            <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 rounded-full bg-stone-800 text-stone-300 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
              >
                Add to Library
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Category filter */}
      <div className="flex items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
              filterCategory === cat
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden group hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl"
          >
            <div className="relative h-48 overflow-hidden bg-stone-950">
              <img
                src={item.url}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                {item.category}
              </div>
            </div>

            <div className="p-4 space-y-3">
              <h4 className="font-heading font-semibold text-stone-100 text-sm truncate">
                {item.title}
              </h4>

              <button
                onClick={() => handleCopyUrl(item)}
                className="w-full py-2 rounded-xl bg-stone-950 hover:bg-amber-500 hover:text-stone-950 text-stone-300 text-xs font-semibold border border-stone-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Image URL</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
