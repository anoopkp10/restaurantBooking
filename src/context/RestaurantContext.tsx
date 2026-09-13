import React, { createContext, useContext, useState, useEffect } from 'react';
import { RestaurantData, MenuItem, Reservation, Inquiry, OpeningHoursData, DesignConfig, HomepageContent, SeoSettings, BlogPost, MediaItem } from '../types';
import { initialRestaurantData } from '../data/initialData';
import { api } from '../services/api';

interface RestaurantContextType {
  data: RestaurantData;
  loading: boolean;
  activeView: 'website' | 'admin' | 'diner';
  setActiveView: (view: 'website' | 'admin' | 'diner') => void;
  adminTab: string;
  setAdminTab: (tab: string) => void;
  isReservationModalOpen: boolean;
  setIsReservationModalOpen: (open: boolean) => void;
  selectedDishForReservation: string | null;
  setSelectedDishForReservation: (dish: string | null) => void;
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  
  // Actions
  refreshData: () => Promise<void>;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => Promise<void>;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;
  createReservation: (res: Omit<Reservation, 'id' | 'createdAt' | 'status' | 'confirmationCode'>) => Promise<Reservation>;
  updateReservationStatus: (id: string, status: Reservation['status'], emailNotificationSent?: boolean) => Promise<void>;
  submitInquiry: (inq: Omit<Inquiry, 'id' | 'date' | 'status'>) => Promise<void>;
  updateInquiryStatus: (id: string, status: Inquiry['status'], replyNote?: string) => Promise<void>;
  updateHours: (hours: OpeningHoursData) => Promise<void>;
  updateDesign: (design: DesignConfig) => Promise<void>;
  updateHomepage: (content: Partial<HomepageContent>) => Promise<void>;
  updateSeo: (seo: SeoSettings) => Promise<void>;
  createPost: (post: Omit<BlogPost, 'id' | 'date'>) => Promise<void>;
  updatePost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  addMedia: (media: Omit<MediaItem, 'id'>) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  resetData: () => Promise<void>;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<RestaurantData>(initialRestaurantData);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'website' | 'admin' | 'diner'>('diner');
  const [adminTab, setAdminTab] = useState<string>('overview');
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedDishForReservation, setSelectedDishForReservation] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const refreshData = async () => {
    try {
      setLoading(true);
      const res = await api.getData();
      setData(res);
    } catch (err) {
      console.error('Failed to load restaurant data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const addMenuItem = async (item: Omit<MenuItem, 'id'>) => {
    try {
      const added = await api.addMenuItem(item);
      setData(prev => ({ ...prev, menu: [added, ...prev.menu] }));
      showToast(`Added "${item.name}" to menu`);
    } catch (err) {
      showToast('Failed to add menu item', 'error');
    }
  };

  const updateMenuItem = async (id: string, updates: Partial<MenuItem>) => {
    try {
      const updated = await api.updateMenuItem(id, updates);
      setData(prev => ({
        ...prev,
        menu: prev.menu.map(m => (m.id === id ? updated : m))
      }));
      showToast('Menu item updated');
    } catch (err) {
      showToast('Failed to update menu item', 'error');
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      await api.deleteMenuItem(id);
      setData(prev => ({
        ...prev,
        menu: prev.menu.filter(m => m.id !== id)
      }));
      showToast('Dish removed from menu');
    } catch (err) {
      showToast('Failed to delete dish', 'error');
    }
  };

  const createReservation = async (resInput: Omit<Reservation, 'id' | 'createdAt' | 'status' | 'confirmationCode'>): Promise<Reservation> => {
    try {
      const created = await api.createReservation(resInput);
      setData(prev => ({
        ...prev,
        reservations: [created, ...prev.reservations]
      }));
      showToast(`Reservation request received for ${resInput.name}! Confirmation: ${created.confirmationCode}`, 'success');
      return created;
    } catch (err) {
      showToast('Failed to submit reservation. Please try again.', 'error');
      throw err;
    }
  };

  const updateReservationStatus = async (id: string, status: Reservation['status'], emailNotificationSent = true) => {
    try {
      const updated = await api.updateReservation(id, { status, emailNotificationSent });
      setData(prev => ({
        ...prev,
        reservations: prev.reservations.map(r => (r.id === id ? updated : r))
      }));
      showToast(`Reservation marked as ${status}. Notification dispatched.`);
    } catch (err) {
      showToast('Failed to update reservation', 'error');
    }
  };

  const submitInquiry = async (inq: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    try {
      const created = await api.createInquiry(inq);
      setData(prev => ({
        ...prev,
        inquiries: [created, ...prev.inquiries]
      }));
      showToast('Message sent! Our dining concierge will respond promptly.');
    } catch (err) {
      showToast('Failed to send message', 'error');
    }
  };

  const updateInquiryStatus = async (id: string, status: Inquiry['status'], replyNote?: string) => {
    try {
      const updated = await api.updateInquiry(id, { status, replyNote });
      setData(prev => ({
        ...prev,
        inquiries: prev.inquiries.map(i => (i.id === id ? updated : i))
      }));
      showToast(`Inquiry status updated to ${status}`);
    } catch (err) {
      showToast('Failed to update inquiry', 'error');
    }
  };

  const updateHours = async (hours: OpeningHoursData) => {
    try {
      const updated = await api.updateHours(hours);
      setData(prev => ({ ...prev, hours: updated }));
      showToast('Opening hours updated successfully');
    } catch (err) {
      showToast('Failed to update hours', 'error');
    }
  };

  const updateDesign = async (design: DesignConfig) => {
    try {
      const updated = await api.updateDesign(design);
      setData(prev => ({ ...prev, design: updated }));
      showToast('Design theme & layout updated');
    } catch (err) {
      showToast('Failed to update design', 'error');
    }
  };

  const updateHomepage = async (content: Partial<HomepageContent>) => {
    try {
      const updated = await api.updateHomepage(content);
      setData(prev => ({ ...prev, homepage: updated }));
      showToast('Homepage sections and copy updated');
    } catch (err) {
      showToast('Failed to update homepage', 'error');
    }
  };

  const updateSeo = async (seo: SeoSettings) => {
    try {
      const updated = await api.updateSeo(seo);
      setData(prev => ({ ...prev, seo: updated }));
      showToast('SEO settings saved');
    } catch (err) {
      showToast('Failed to update SEO', 'error');
    }
  };

  const createPost = async (post: Omit<BlogPost, 'id' | 'date'>) => {
    try {
      const created = await api.createPost(post);
      setData(prev => ({ ...prev, posts: [created, ...prev.posts] }));
      showToast(`Published post: "${post.title}"`);
    } catch (err) {
      showToast('Failed to publish post', 'error');
    }
  };

  const updatePost = async (id: string, post: Partial<BlogPost>) => {
    try {
      const updated = await api.updatePost(id, post);
      setData(prev => ({
        ...prev,
        posts: prev.posts.map(p => (p.id === id ? updated : p))
      }));
      showToast('Post updated');
    } catch (err) {
      showToast('Failed to update post', 'error');
    }
  };

  const deletePost = async (id: string) => {
    try {
      await api.deletePost(id);
      setData(prev => ({
        ...prev,
        posts: prev.posts.filter(p => p.id !== id)
      }));
      showToast('Post removed');
    } catch (err) {
      showToast('Failed to delete post', 'error');
    }
  };

  const addMedia = async (media: Omit<MediaItem, 'id'>) => {
    try {
      const added = await api.addMedia(media);
      setData(prev => ({ ...prev, media: [added, ...prev.media] }));
      showToast('Image added to Media Library');
    } catch (err) {
      showToast('Failed to add media', 'error');
    }
  };

  const resetToDefaults = async () => {
    try {
      const refreshed = await api.resetData();
      setData(refreshed);
      showToast('Reset back to pristine demonstration data');
    } catch (err) {
      showToast('Failed to reset', 'error');
    }
  };

  return (
    <RestaurantContext.Provider
      value={{
        data,
        loading,
        activeView,
        setActiveView,
        adminTab,
        setAdminTab,
        isReservationModalOpen,
        setIsReservationModalOpen,
        selectedDishForReservation,
        setSelectedDishForReservation,
        toast,
        showToast,
        refreshData,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        createReservation,
        updateReservationStatus,
        submitInquiry,
        updateInquiryStatus,
        updateHours,
        updateDesign,
        updateHomepage,
        updateSeo,
        createPost,
        updatePost,
        deletePost,
        addMedia,
        resetToDefaults,
        resetData: resetToDefaults
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
