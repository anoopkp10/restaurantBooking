import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { BlogPost, HomepageContent } from '../../types';
import { Plus, Edit2, Trash2, Check, Sparkles, BookOpen, LayoutTemplate, X, Image as ImageIcon } from 'lucide-react';
import { api } from '../../services/api';

export const CmsManager: React.FC = () => {
  const { data, updateHomepage, createPost, updatePost, deletePost, showToast } = useRestaurant();
  const [subTab, setSubTab] = useState<'homepage' | 'posts'>('homepage');

  // Homepage Form State
  const [homeForm, setHomeForm] = useState<HomepageContent>({ ...data.homepage });

  // Post Form State
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editingPostItem, setEditingPostItem] = useState<BlogPost | null>(null);
  const [postForm, setPostForm] = useState<Omit<BlogPost, 'id' | 'date'>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Chef Arya Vardhan',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    category: 'Seasonal Menu',
    isPublished: true
  });
  const [aiGenerating, setAiGenerating] = useState(false);

  const handleSaveHomepage = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateHomepage(homeForm);
  };

  const handleCreatePost = () => {
    setEditingPostItem(null);
    setPostForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: 'Chef Arya Vardhan',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      category: 'Seasonal Menu',
      isPublished: true
    });
    setIsEditingPost(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPostItem(post);
    setPostForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      image: post.image,
      category: post.category,
      isPublished: post.isPublished
    });
    setIsEditingPost(true);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postForm.title) return;

    const slug = postForm.slug || postForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingPostItem) {
      await updatePost(editingPostItem.id, { ...postForm, slug });
    } else {
      await createPost({ ...postForm, slug });
    }
    setIsEditingPost(false);
    setEditingPostItem(null);
  };

  const handleAiGeneratePost = async () => {
    if (!postForm.title) {
      showToast('Please enter a title for the announcement first', 'error');
      return;
    }
    setAiGenerating(true);
    try {
      const result = await api.generateAiText(
        `Write an elegant restaurant announcement for "${postForm.title}" in category "${postForm.category}". Provide a 1-sentence excerpt and a 2-paragraph rich story highlighting modern Indian culinary craft.`,
        'announcement'
      );
      if (result) {
        const parts = result.split('\n\n');
        setPostForm(prev => ({
          ...prev,
          excerpt: parts[0] ? parts[0].slice(0, 160) : prev.excerpt,
          content: result
        }));
        showToast('Generated announcement draft with AI!');
      }
    } catch (err) {
      showToast('AI Generation failed', 'error');
    } finally {
      setAiGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Subtab Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <h2 className="text-2xl font-heading font-bold text-stone-100">
            Content Management System (CMS)
          </h2>
          <p className="text-stone-400 text-xs mt-1">
            Update live homepage copy, chef stories, hero headlines, and publish seasonal announcements.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-stone-900 p-1 rounded-xl border border-stone-800">
          <button
            onClick={() => setSubTab('homepage')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              subTab === 'homepage'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span>Homepage Editor</span>
          </button>
          <button
            onClick={() => setSubTab('posts')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              subTab === 'posts'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Posts & Events</span>
          </button>
        </div>
      </div>

      {/* SubTab 1: Homepage Editor */}
      {subTab === 'homepage' && (
        <form onSubmit={handleSaveHomepage} className="space-y-8">
          {/* Hero Section Copy */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-5">
            <h3 className="text-base font-heading font-bold text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Hero Section Content</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Tagline</label>
                <input
                  type="text"
                  value={homeForm.tagline}
                  onChange={(e) => setHomeForm({ ...homeForm, tagline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Badge Text</label>
                <input
                  type="text"
                  value={homeForm.heroBadge}
                  onChange={(e) => setHomeForm({ ...homeForm, heroBadge: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Main Headline</label>
              <input
                type="text"
                value={homeForm.headline}
                onChange={(e) => setHomeForm({ ...homeForm, headline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 font-heading"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Subheadline</label>
              <textarea
                rows={2}
                value={homeForm.subheadline}
                onChange={(e) => setHomeForm({ ...homeForm, subheadline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Primary CTA Text</label>
                <input
                  type="text"
                  value={homeForm.heroCtaText}
                  onChange={(e) => setHomeForm({ ...homeForm, heroCtaText: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Secondary CTA Text</label>
                <input
                  type="text"
                  value={homeForm.heroSecondaryCtaText}
                  onChange={(e) => setHomeForm({ ...homeForm, heroSecondaryCtaText: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Hero Background Image</label>
                <input
                  type="url"
                  value={homeForm.heroImage}
                  onChange={(e) => setHomeForm({ ...homeForm, heroImage: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100"
                />
              </div>
            </div>
          </div>

          {/* About & Chef Section Copy */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-5">
            <h3 className="text-base font-heading font-bold text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>About Section & Chef Introduction</span>
            </h3>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">About Heading</label>
              <input
                type="text"
                value={homeForm.aboutHeading}
                onChange={(e) => setHomeForm({ ...homeForm, aboutHeading: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 font-heading"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Restaurant Story</label>
              <textarea
                rows={3}
                value={homeForm.aboutStory}
                onChange={(e) => setHomeForm({ ...homeForm, aboutStory: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Chef Name</label>
                <input
                  type="text"
                  value={homeForm.aboutChefName}
                  onChange={(e) => setHomeForm({ ...homeForm, aboutChefName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Chef Role</label>
                <input
                  type="text"
                  value={homeForm.aboutChefRole}
                  onChange={(e) => setHomeForm({ ...homeForm, aboutChefRole: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Chef Bio & Words</label>
              <textarea
                rows={3}
                value={homeForm.aboutChefBio}
                onChange={(e) => setHomeForm({ ...homeForm, aboutChefBio: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Check className="w-4 h-4" />
              <span>Publish Homepage Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* SubTab 2: Posts & Events */}
      {subTab === 'posts' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-heading font-bold text-stone-100">
              Articles & Event Announcements ({data.posts.length})
            </h3>
            <button
              onClick={handleCreatePost}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Create Announcement</span>
            </button>
          </div>

          {/* Post Editor Drawer */}
          {isEditingPost && (
            <div className="bg-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <h4 className="font-heading font-bold text-stone-100 text-base">
                  {editingPostItem ? 'Edit Post' : 'Create New Event / Post'}
                </h4>
                <button
                  onClick={() => setIsEditingPost(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSavePost} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Autumn Truffle & Spice Degustation"
                      value={postForm.title}
                      onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Category</label>
                    <select
                      value={postForm.category}
                      onChange={(e) => setPostForm({ ...postForm, category: e.target.value as any })}
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100"
                    >
                      <option value="Event">Event</option>
                      <option value="Announcement">Announcement</option>
                      <option value="Culinary Story">Culinary Story</option>
                      <option value="Seasonal Menu">Seasonal Menu</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleAiGeneratePost}
                    disabled={aiGenerating}
                    className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{aiGenerating ? 'Writing with AI...' : 'AI Generate Content Draft'}</span>
                  </button>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Short Excerpt (Teaser)</label>
                  <input
                    type="text"
                    placeholder="Brief 1-line summary for cards..."
                    value={postForm.excerpt}
                    onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Full Article / Announcement Details</label>
                  <textarea
                    rows={6}
                    value={postForm.content}
                    onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 font-body"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={postForm.image}
                      onChange={(e) => setPostForm({ ...postForm, image: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Author Name</label>
                    <input
                      type="text"
                      value={postForm.author}
                      onChange={(e) => setPostForm({ ...postForm, author: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
                  >
                    Save & Publish
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingPost(false)}
                    className="px-5 py-2.5 rounded-full bg-stone-800 text-stone-300 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Posts List */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-xl divide-y divide-stone-800">
            {data.posts.map((post) => (
              <div key={post.id} className="p-5 flex items-center justify-between gap-4 hover:bg-stone-850/40 transition-colors">
                <div className="flex items-center gap-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-stone-800"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading font-bold text-stone-100 text-sm">
                        {post.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded-md bg-stone-950 text-[10px] text-amber-400 border border-stone-800 font-medium">
                        {post.category}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 line-clamp-1 mt-0.5">{post.excerpt}</p>
                    <div className="text-[10px] text-stone-500 mt-1">
                      {post.date} • by {post.author}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditPost(post)}
                    className="p-2 rounded-xl bg-stone-950 hover:bg-amber-500/20 hover:text-amber-300 text-stone-300 text-xs border border-stone-800 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete post "${post.title}"?`)) {
                        deletePost(post.id);
                      }
                    }}
                    className="p-2 rounded-xl bg-stone-950 hover:bg-rose-500/20 hover:text-rose-400 text-stone-400 text-xs border border-stone-800 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
