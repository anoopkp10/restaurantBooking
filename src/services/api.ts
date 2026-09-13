import { MenuItem, Reservation, Inquiry, RestaurantData, BlogPost, OpeningHoursData, SeoSettings, DesignConfig, HomepageContent, MediaItem } from '../types';
import { initialRestaurantData } from '../data/initialData';

const BASE_URL = '/api';

export const api = {
  async getData(): Promise<RestaurantData> {
    try {
      const res = await fetch(`${BASE_URL}/data`);
      if (!res.ok) throw new Error('Failed to fetch data');
      return await res.json();
    } catch (err) {
      console.warn('Backend API unavailable, using initial data:', err);
      return initialRestaurantData;
    }
  },

  async addMenuItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem> {
    const res = await fetch(`${BASE_URL}/menu`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Failed to add menu item');
    return await res.json();
  },

  async updateMenuItem(id: string, item: Partial<MenuItem>): Promise<MenuItem> {
    const res = await fetch(`${BASE_URL}/menu/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Failed to update menu item');
    return await res.json();
  },

  async deleteMenuItem(id: string): Promise<boolean> {
    const res = await fetch(`${BASE_URL}/menu/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete menu item');
    return true;
  },

  async createReservation(reservation: Omit<Reservation, 'id' | 'createdAt' | 'status' | 'confirmationCode'>): Promise<Reservation> {
    const res = await fetch(`${BASE_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservation),
    });
    if (!res.ok) throw new Error('Failed to create reservation');
    return await res.json();
  },

  async updateReservation(id: string, updates: Partial<Reservation>): Promise<Reservation> {
    const res = await fetch(`${BASE_URL}/reservations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update reservation');
    return await res.json();
  },

  async createInquiry(inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>): Promise<Inquiry> {
    const res = await fetch(`${BASE_URL}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry),
    });
    if (!res.ok) throw new Error('Failed to send inquiry');
    return await res.json();
  },

  async updateInquiry(id: string, updates: Partial<Inquiry>): Promise<Inquiry> {
    const res = await fetch(`${BASE_URL}/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update inquiry');
    return await res.json();
  },

  async updateHours(hours: OpeningHoursData): Promise<OpeningHoursData> {
    const res = await fetch(`${BASE_URL}/settings/hours`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hours),
    });
    if (!res.ok) throw new Error('Failed to update hours');
    return await res.json();
  },

  async updateSeo(seo: SeoSettings): Promise<SeoSettings> {
    const res = await fetch(`${BASE_URL}/settings/seo`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(seo),
    });
    if (!res.ok) throw new Error('Failed to update SEO');
    return await res.json();
  },

  async updateDesign(design: DesignConfig): Promise<DesignConfig> {
    const res = await fetch(`${BASE_URL}/settings/design`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(design),
    });
    if (!res.ok) throw new Error('Failed to update design');
    return await res.json();
  },

  async updateHomepage(homepage: Partial<HomepageContent>): Promise<HomepageContent> {
    const res = await fetch(`${BASE_URL}/settings/homepage`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(homepage),
    });
    if (!res.ok) throw new Error('Failed to update homepage content');
    return await res.json();
  },

  async createPost(post: Omit<BlogPost, 'id' | 'date'>): Promise<BlogPost> {
    const res = await fetch(`${BASE_URL}/cms/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!res.ok) throw new Error('Failed to create post');
    return await res.json();
  },

  async updatePost(id: string, post: Partial<BlogPost>): Promise<BlogPost> {
    const res = await fetch(`${BASE_URL}/cms/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!res.ok) throw new Error('Failed to update post');
    return await res.json();
  },

  async deletePost(id: string): Promise<boolean> {
    const res = await fetch(`${BASE_URL}/cms/posts/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete post');
    return true;
  },

  async addMedia(media: Omit<MediaItem, 'id'>): Promise<MediaItem> {
    const res = await fetch(`${BASE_URL}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(media),
    });
    if (!res.ok) throw new Error('Failed to add media');
    return await res.json();
  },

  async generateAiText(prompt: string, type: 'dish' | 'announcement' | 'email' | 'general' | 'seo'): Promise<string> {
    const res = await fetch(`${BASE_URL}/ai/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, type }),
    });
    if (!res.ok) throw new Error('Failed to generate AI text');
    const data = await res.json();
    return data.result || '';
  },

  async resetData(): Promise<RestaurantData> {
    const res = await fetch(`${BASE_URL}/reset`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to reset data');
    const json = await res.json();
    return json.data;
  }
};
