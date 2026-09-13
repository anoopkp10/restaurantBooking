import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { MenuItem, DietaryTag } from '../../types';
import { Plus, Edit2, Trash2, Sparkles, Image as ImageIcon, Flame, DollarSign, X, Check } from 'lucide-react';
import { api } from '../../services/api';

export const MenuManager: React.FC = () => {
  const { data, addMenuItem, updateMenuItem, deleteMenuItem, showToast } = useRestaurant();
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);

  // Form State
  const [form, setForm] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    category: data.categories[0] || 'Starters & Small Plates',
    description: '',
    price: 24,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop',
    dietary: ['Vegetarian'],
    isPopular: false,
    isChefRecommendation: false,
    spiciness: 1,
    prepTime: '20 mins',
    calories: 450
  });

  const availableDietary: DietaryTag[] = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Chef Special',
    'Halal',
    'Dairy-Free',
    'Nut-Free'
  ];

  const handleEditClick = (item: MenuItem) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      category: item.category,
      description: item.description,
      price: item.price,
      image: item.image,
      dietary: [...item.dietary],
      isPopular: !!item.isPopular,
      isChefRecommendation: !!item.isChefRecommendation,
      spiciness: item.spiciness || 0,
      prepTime: item.prepTime || '15 mins',
      calories: item.calories || 350
    });
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setEditingItem(null);
    setForm({
      name: '',
      category: data.categories[0] || 'Starters & Small Plates',
      description: '',
      price: 24,
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop',
      dietary: ['Vegetarian'],
      isPopular: false,
      isChefRecommendation: false,
      spiciness: 1,
      prepTime: '20 mins',
      calories: 450
    });
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return;

    if (editingItem) {
      await updateMenuItem(editingItem.id, form);
      setEditingItem(null);
    } else {
      await addMenuItem(form);
      setIsCreating(false);
    }
  };

  const handleAiGenerateDescription = async () => {
    if (!form.name) {
      showToast('Please enter a dish name first', 'error');
      return;
    }
    setAiGenerating(true);
    try {
      const result = await api.generateAiText(
        `Write an evocative, luxurious 2-sentence menu description for: "${form.name}" in category "${form.category}". Highlight rare spices, texture, and aroma.`,
        'dish'
      );
      if (result) {
        setForm(prev => ({ ...prev, description: result.trim() }));
        showToast('AI Description generated!');
      }
    } catch (err) {
      showToast('AI generation failed, please write manually.', 'error');
    } finally {
      setAiGenerating(false);
    }
  };

  const toggleDietary = (tag: DietaryTag) => {
    setForm(prev => ({
      ...prev,
      dietary: prev.dietary.includes(tag)
        ? prev.dietary.filter(t => t !== tag)
        : [...prev.dietary, tag]
    }));
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <h2 className="text-2xl font-heading font-bold text-stone-100">
            Menu Manager
          </h2>
          <p className="text-stone-400 text-xs mt-1">
            Add new signature dishes, adjust live pricing, edit descriptions, and update photography.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Dish</span>
        </button>
      </div>

      {/* Editor Modal / Drawer if editing or creating */}
      {(editingItem || isCreating) && (
        <div className="bg-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
          <div className="flex items-center justify-between pb-4 border-b border-stone-800">
            <h3 className="text-lg font-heading font-bold text-stone-100">
              {editingItem ? `Edit: ${editingItem.name}` : 'Create New Menu Item'}
            </h3>
            <button
              onClick={() => {
                setEditingItem(null);
                setIsCreating(false);
              }}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 bg-stone-950"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Dish Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-semibold">
                  Dish Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Truffle Malai Kofta"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-semibold">
                  Price ($ USD) *
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-semibold">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                >
                  {data.categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Spice Level */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-semibold">
                  Spice Level (0 to 3)
                </label>
                <select
                  value={form.spiciness}
                  onChange={(e) => setForm({ ...form, spiciness: Number(e.target.value) as any })}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                >
                  <option value={0}>0 - Mild / Non-Spicy</option>
                  <option value={1}>1 - Gentle Warmth</option>
                  <option value={2}>2 - Medium Aromatic Heat</option>
                  <option value={3}>3 - Fiery Royal Heat</option>
                </select>
              </div>
            </div>

            {/* Description with AI Assistant */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold">
                  Culinary Description *
                </label>
                <button
                  type="button"
                  onClick={handleAiGenerateDescription}
                  disabled={aiGenerating}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{aiGenerating ? 'Generating...' : 'AI Enhance Description'}</span>
                </button>
              </div>
              <textarea
                required
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Evocative description detailing ingredients, cooking method, and texture..."
                className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Image URL with Media Picker shortcuts */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-semibold">
                Dish Photo URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                />
                {form.image && (
                  <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-stone-800">
                    <img src={form.image} alt="Preview" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Quick sample image pickers */}
              <div className="flex items-center gap-2 mt-2 overflow-x-auto pb-1">
                <span className="text-[10px] text-stone-500 shrink-0">Quick samples:</span>
                {data.media.slice(0, 4).map((med) => (
                  <button
                    key={med.id}
                    type="button"
                    onClick={() => setForm({ ...form, image: med.url })}
                    className="text-[10px] text-amber-400/80 hover:text-amber-300 underline shrink-0 truncate max-w-[120px]"
                  >
                    {med.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Tags Checkboxes */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-2 font-semibold">
                Dietary Attributes
              </label>
              <div className="flex flex-wrap gap-2">
                {availableDietary.map((tag) => {
                  const isChecked = form.dietary.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleDietary(tag)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                        isChecked
                          ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {isChecked ? `✓ ${tag}` : `+ ${tag}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chef recommendation & Popular toggles */}
            <div className="flex flex-wrap gap-6 pt-2">
              <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isChefRecommendation}
                  onChange={(e) => setForm({ ...form, isChefRecommendation: e.target.checked })}
                  className="rounded accent-amber-500 w-4 h-4"
                />
                <span>Highlight in Chef's Recommendations</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isPopular}
                  onChange={(e) => setForm({ ...form, isPopular: e.target.checked })}
                  className="rounded accent-amber-500 w-4 h-4"
                />
                <span>Badge as "Popular"</span>
              </label>
            </div>

            {/* Save Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-stone-800">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Dish</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setIsCreating(false);
                }}
                className="px-5 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Menu Table / List */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span>Active Dishes ({data.menu.length})</span>
          <span>Editable in real time</span>
        </div>

        <div className="divide-y divide-stone-800">
          {data.menu.map((dish) => (
            <div
              key={dish.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-stone-850/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <img
                  src={dish.image}
                  alt={dish.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-stone-800"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading font-bold text-stone-100 text-base">
                      {dish.name}
                    </h4>
                    {dish.isChefRecommendation && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-semibold border border-amber-500/30">
                        Chef Pick
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 line-clamp-1 max-w-md mt-0.5">
                    {dish.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                    <span className="text-amber-400 font-semibold">${dish.price.toFixed(2)}</span>
                    <span>•</span>
                    <span>{dish.category}</span>
                    <span>•</span>
                    <span>{dish.dietary.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => handleEditClick(dish)}
                  className="p-2 rounded-xl bg-stone-950 hover:bg-amber-500/20 hover:text-amber-300 text-stone-300 text-xs border border-stone-800 transition-colors flex items-center gap-1"
                  title="Edit dish"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Remove "${dish.name}" from the menu?`)) {
                      deleteMenuItem(dish.id);
                    }
                  }}
                  className="p-2 rounded-xl bg-stone-950 hover:bg-rose-500/20 hover:text-rose-400 text-stone-400 text-xs border border-stone-800 transition-colors"
                  title="Delete dish"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
