export type DietaryTag = 'Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Chef Special' | 'Dairy-Free' | 'Halal' | 'Nut-Free';

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  dietary: DietaryTag[];
  isPopular?: boolean;
  isChefRecommendation?: boolean;
  spiciness?: 0 | 1 | 2 | 3; // 0=mild, 3=spicy
  prepTime?: string;
  calories?: number;
}

export type ReservationStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: 'Main Dining Room' | "Chef's Table" | 'Terrace & Garden' | 'Private Dining Suite';
  specialRequests?: string;
  status: ReservationStatus;
  createdAt: string;
  confirmationCode: string;
  emailNotificationSent?: boolean;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
  status: 'Unread' | 'Replied' | 'Archived';
  replyNote?: string;
}

export interface DayHours {
  day: string;
  lunch: string;
  dinner: string;
  isOpen: boolean;
}

export interface OpeningHoursData {
  regularHours: DayHours[];
  specialNotice?: string;
  isSpecialNoticeActive?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: 'Event' | 'Announcement' | 'Culinary Story' | 'Seasonal Menu';
  isPublished: boolean;
}

export interface DesignConfig {
  theme: 'gold-obsidian' | 'tuscan-terracotta' | 'royal-emerald' | 'velvet-rose';
  fontFamily: 'classic-serif' | 'cinzel-luxury' | 'modern-sans';
  accentColor: string;
  enableFloatingBookingBar: boolean;
  sectionsVisibility: {
    hero: boolean;
    about: boolean;
    menu: boolean;
    chefRecommendations: boolean;
    reservations: boolean;
    testimonials: boolean;
    announcements: boolean;
    locationHours: boolean;
    faq: boolean;
    contact: boolean;
  };
}

export interface HomepageContent {
  tagline: string;
  headline: string;
  subheadline: string;
  heroBadge: string;
  heroCtaText: string;
  heroSecondaryCtaText: string;
  heroImage: string;
  
  aboutHeading: string;
  aboutStory: string;
  aboutPhilosophy: string;
  aboutChefName: string;
  aboutChefRole: string;
  aboutChefBio: string;
  aboutChefImage: string;
  aboutInteriorImage: string;
  
  reservationHeadline: string;
  reservationSubtext: string;
  
  phone: string;
  email: string;
  address: string;
  cityStateZip: string;
  googleRating: number;
  totalReviews: number;
}

export interface SeoSettings {
  pageTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  category: 'Dishes' | 'Ambiance' | 'Chef & Team' | 'Drinks';
  tags?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  source: 'Google Review' | 'TripAdvisor' | 'Verified Diner';
  avatar?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Dietary' | 'Reservations' | 'Parking & Location' | 'Events & Private Dining';
}

export interface RestaurantData {
  homepage: HomepageContent;
  menu: MenuItem[];
  categories: string[];
  reservations: Reservation[];
  inquiries: Inquiry[];
  hours: OpeningHoursData;
  posts: BlogPost[];
  design: DesignConfig;
  seo: SeoSettings;
  media: MediaItem[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
}
