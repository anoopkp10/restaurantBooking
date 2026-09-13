import { RestaurantData } from '../types';

export const initialRestaurantData: RestaurantData = {
  homepage: {
    tagline: 'Modern Artisanal & Fine Indian Dining',
    headline: 'A Symphony of Heritage Spices & Contemporary Culinary Art',
    subheadline: 'Immerse your senses in time-honored slow-cooking traditions, rare hand-ground spices, and progressive gastronomy in an intimate, opulent setting.',
    heroBadge: 'Michelin Recommended 2024 • Top 10 Fine Dining',
    heroCtaText: 'Reserve a Table',
    heroSecondaryCtaText: 'Explore Menu',
    heroImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1600&auto=format&fit=crop', // Rich aromatic Indian dish with vibrant spices
    
    aboutHeading: 'Crafted with Devotion, Rooted in Tradition',
    aboutStory: 'Founded with a passion to redefine contemporary Indian gastronomy, Aryas merges century-old royal recipes from the spice corridors of Malabar and Awadh with French culinary precision. Every sauce is simmered for over 18 hours, and each spice blend is roasted and stone-ground daily in our kitchen.',
    aboutPhilosophy: 'We believe exceptional dining is an emotional journey. From cold-pressed mustard oils to single-estate Kashmiri saffron and heirloom grains, our ingredients celebrate nature’s purest terroir.',
    aboutChefName: 'Chef Arya Vardhan',
    aboutChefRole: 'Executive Chef & Culinary Director',
    aboutChefBio: 'Trained in Paris and seasoned across Mumbai and London luxury five-star dining rooms, Chef Arya brings over two decades of gastronomic mastery, transforming royal banquet traditions into breathtaking modern plates.',
    aboutChefImage: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop',
    aboutInteriorImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    
    reservationHeadline: 'Experience Aryas: Reserve Your Table',
    reservationSubtext: 'Whether celebrating a milestone or craving an unforgettable dinner, our culinary team and sommeliers await your presence.',
    
    phone: '+1 (415) 890-2792',
    email: 'reservations@aryasrestaurant.com',
    address: '450 Grand Avenue, Suite 100',
    cityStateZip: 'San Francisco, CA 94102',
    googleRating: 4.9,
    totalReviews: 842
  },

  categories: [
    'Starters & Small Plates',
    'Tandoor & Charcoal Grills',
    'Artisanal Curries & Mains',
    'Biryanis & Heirloom Breads',
    'Signature Tasting Specials',
    'Handcrafted Desserts & Cocktails'
  ],

  menu: [
    {
      id: 'm1',
      name: 'Truffle & Wild Mushroom Galouti',
      category: 'Starters & Small Plates',
      description: 'Melt-in-mouth smoked portobello kebabs infused with black summer truffle, saffron warqi paratha, and mint emulsion.',
      price: 22,
      image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=800&auto=format&fit=crop',
      dietary: ['Vegetarian', 'Chef Special'],
      isChefRecommendation: true,
      isPopular: true,
      spiciness: 1,
      prepTime: '15 mins',
      calories: 340
    },
    {
      id: 'm2',
      name: 'Charred Malabar Prawns',
      category: 'Starters & Small Plates',
      description: 'Jumbo tiger prawns marinated in roasted Tellicherry pepper, curry leaf butter, and crushed kokum reduction.',
      price: 26,
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop',
      dietary: ['Gluten-Free', 'Chef Special'],
      isPopular: true,
      spiciness: 2,
      prepTime: '18 mins',
      calories: 390
    },
    {
      id: 'm3',
      name: 'Burrata Papdi Chaat',
      category: 'Starters & Small Plates',
      description: 'Artisanal Italian burrata layered over crisp wheat crisps, pomegranate pearls, tamarind glaze, and mint foam.',
      price: 19,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
      dietary: ['Vegetarian'],
      isPopular: true,
      spiciness: 1,
      prepTime: '12 mins',
      calories: 310
    },
    {
      id: 'm4',
      name: 'Smoked Angaar Paneer Tikka',
      category: 'Tandoor & Charcoal Grills',
      description: 'Handcrafted cottage cheese steeped in crushed coriander seeds, Kashmiri chili, and char-grilled over babool coals.',
      price: 24,
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop',
      dietary: ['Vegetarian', 'Gluten-Free'],
      isPopular: true,
      spiciness: 2,
      prepTime: '20 mins',
      calories: 420
    },
    {
      id: 'm5',
      name: 'Kashmiri Lamb Chops Barra',
      category: 'Tandoor & Charcoal Grills',
      description: 'Pasture-raised Colorado lamb racks infused with green cardamom, royal mace, mustard oil, and smoked garlic yogurt.',
      price: 38,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      dietary: ['Gluten-Free', 'Chef Special', 'Halal'],
      isChefRecommendation: true,
      isPopular: true,
      spiciness: 2,
      prepTime: '22 mins',
      calories: 580
    },
    {
      id: 'm6',
      name: 'Old Delhi Butter Chicken (Murgh Makhani)',
      category: 'Artisanal Curries & Mains',
      description: 'Tandoor-pulled chicken steeped in an 18-hour velvety sauce of vine-ripened tomatoes, organic butter, fenugreek, and honey.',
      price: 32,
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop',
      dietary: ['Gluten-Free', 'Halal'],
      isPopular: true,
      isChefRecommendation: true,
      spiciness: 1,
      prepTime: '20 mins',
      calories: 620
    },
    {
      id: 'm7',
      name: 'Slow-Braised Nalli Rogan Josh',
      category: 'Artisanal Curries & Mains',
      description: 'Tender lamb shank simmered in Kashmiri dried chilies, ratan jot bark, wild fennel, and aromatic bone broth.',
      price: 36,
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop',
      dietary: ['Gluten-Free', 'Halal'],
      isPopular: true,
      spiciness: 2,
      prepTime: '25 mins',
      calories: 680
    },
    {
      id: 'm8',
      name: 'Saffron Truffle Malai Kofta',
      category: 'Artisanal Curries & Mains',
      description: 'Lotus seed and paneer dumplings filled with dried cranberries, nestled in a silky cashew and saffron velouté.',
      price: 28,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800&auto=format&fit=crop',
      dietary: ['Vegetarian', 'Chef Special'],
      isChefRecommendation: true,
      spiciness: 1,
      prepTime: '20 mins',
      calories: 510
    },
    {
      id: 'm9',
      name: 'Awadhi Dum Gosht Biryani',
      category: 'Biryanis & Heirloom Breads',
      description: 'Aged basmati rice and marinated tender lamb cooked under a sealed pastry crust (parda) with rose water and saffron.',
      price: 34,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop',
      dietary: ['Halal', 'Chef Special'],
      isPopular: true,
      isChefRecommendation: true,
      spiciness: 2,
      prepTime: '25 mins',
      calories: 740
    },
    {
      id: 'm10',
      name: 'Truffle & Rosemary Garlic Naan Basket',
      category: 'Biryanis & Heirloom Breads',
      description: 'Artisanal tandoor breads featuring black truffle oil naan, flaky laccha paratha, and smoked chili kulcha.',
      price: 14,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
      dietary: ['Vegetarian'],
      spiciness: 0,
      prepTime: '10 mins',
      calories: 380
    },
    {
      id: 'm11',
      name: 'Grand Royal Aryas Thali Experience',
      category: 'Signature Tasting Specials',
      description: 'A multi-course degustation served on brass ware: featuring 2 starters, 3 curries, artisanal breads, saffron pulao, and dessert pairing.',
      price: 65,
      image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=800&auto=format&fit=crop',
      dietary: ['Chef Special'],
      isChefRecommendation: true,
      isPopular: true,
      spiciness: 2,
      prepTime: '30 mins',
      calories: 890
    },
    {
      id: 'm12',
      name: 'Rose & Saffron Pistachio Kulfi Pop',
      category: 'Handcrafted Desserts & Cocktails',
      description: 'Slow-reduced organic dairy ice cream with Iranian saffron, roasted pistachios, candied rose petals, and rabri foam.',
      price: 16,
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=800&auto=format&fit=crop',
      dietary: ['Vegetarian', 'Gluten-Free'],
      isPopular: true,
      spiciness: 0,
      prepTime: '10 mins',
      calories: 280
    },
    {
      id: 'm13',
      name: 'Smoked Cardamom & Bourbon Old Fashioned',
      category: 'Handcrafted Desserts & Cocktails',
      description: 'Bourbon infused with green cardamom, house jaggery bitters, smoked cinnamon quill, and orange peel oils.',
      price: 18,
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop',
      dietary: ['Vegan', 'Gluten-Free'],
      spiciness: 0,
      prepTime: '5 mins',
      calories: 190
    }
  ],

  reservations: [
    {
      id: 'res-101',
      name: 'Elena Rostova',
      email: 'elena.rostova@example.com',
      phone: '+1 (415) 555-0192',
      date: '2026-09-15',
      time: '19:30',
      guests: 4,
      seatingPreference: 'Main Dining Room',
      specialRequests: 'Celebrating 10th wedding anniversary. Quiet booth preferred.',
      status: 'Confirmed',
      createdAt: '2026-09-12T14:20:00Z',
      confirmationCode: 'ARYAS-8942',
      emailNotificationSent: true
    },
    {
      id: 'res-102',
      name: 'Dr. Marcus Vance',
      email: 'marcus.vance@bayhealth.org',
      phone: '+1 (415) 555-0841',
      date: '2026-09-16',
      time: '20:00',
      guests: 2,
      seatingPreference: "Chef's Table",
      specialRequests: 'One guest has severe peanut allergy.',
      status: 'Pending',
      createdAt: '2026-09-13T08:15:00Z',
      confirmationCode: 'ARYAS-7719',
      emailNotificationSent: false
    },
    {
      id: 'res-103',
      name: 'Sarah Chen',
      email: 'sarah.chen@techventures.io',
      phone: '+1 (408) 555-4321',
      date: '2026-09-18',
      time: '18:30',
      guests: 8,
      seatingPreference: 'Private Dining Suite',
      specialRequests: 'Executive client dinner. Wine pairing consultation requested.',
      status: 'Confirmed',
      createdAt: '2026-09-11T16:45:00Z',
      confirmationCode: 'ARYAS-4431',
      emailNotificationSent: true
    }
  ],

  inquiries: [
    {
      id: 'inq-1',
      name: 'David K. Miller',
      email: 'david.miller@corp-events.com',
      phone: '+1 (415) 555-9011',
      subject: 'Private Buyout for Corporate Holiday Gala (60 guests)',
      message: 'Hello Aryas Events team, we are considering your restaurant for an exclusive buyout dinner on Thursday, Dec 12. Could you share the minimum spend and sample 4-course banquet menus?',
      date: '2026-09-12T10:30:00Z',
      status: 'Unread'
    },
    {
      id: 'inq-2',
      name: 'Priya Patel',
      email: 'priya.patel@gmail.com',
      phone: '+1 (510) 555-2289',
      subject: 'Bespoke Vegetarian Degustation for Sangeet Rehearsal',
      message: 'Hi Chef Arya, I would love to arrange a dedicated 12-person vegetarian tasting dinner next month for my family. Do you customize wine pairings with modern Indian cuisine?',
      date: '2026-09-11T18:22:00Z',
      status: 'Replied',
      replyNote: 'Sent custom vegetarian tasting menu proposal via concierge.'
    }
  ],

  hours: {
    regularHours: [
      { day: 'Monday', lunch: 'Closed', dinner: '5:00 PM – 10:00 PM', isOpen: true },
      { day: 'Tuesday', lunch: '11:30 AM – 2:30 PM', dinner: '5:00 PM – 10:00 PM', isOpen: true },
      { day: 'Wednesday', lunch: '11:30 AM – 2:30 PM', dinner: '5:00 PM – 10:00 PM', isOpen: true },
      { day: 'Thursday', lunch: '11:30 AM – 2:30 PM', dinner: '5:00 PM – 10:30 PM', isOpen: true },
      { day: 'Friday', lunch: '11:30 AM – 2:30 PM', dinner: '5:00 PM – 11:00 PM', isOpen: true },
      { day: 'Saturday', lunch: '12:00 PM – 3:00 PM', dinner: '5:00 PM – 11:00 PM', isOpen: true },
      { day: 'Sunday', lunch: '12:00 PM – 3:30 PM', dinner: '5:00 PM – 9:30 PM', isOpen: true }
    ],
    specialNotice: 'Complimentary Valet Parking available Thursday through Sunday evenings at Grand Avenue entrance.',
    isSpecialNoticeActive: true
  },

  posts: [
    {
      id: 'post-1',
      title: 'Autumn Truffle & Royal Spice Degustation Menu Launches',
      slug: 'autumn-truffle-spice-degustation',
      excerpt: 'Experience a 7-course journey highlighting white Alba truffles married with Malabar spices and rare Awadhi reductions.',
      content: 'Starting this week, Chef Arya unveils our seasonal Autumn tasting journey. Highlights include Charred Langoustines with Tellicherry pepper butter, followed by Morel Mushroom Yakhni and 24-hour braised lamb shank.',
      date: '2026-09-10',
      author: 'Chef Arya Vardhan',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      category: 'Seasonal Menu',
      isPublished: true
    },
    {
      id: 'post-2',
      title: 'Aryas Honored with Michelin Guide Distinction for 2024',
      slug: 'michelin-guide-distinction-2024',
      excerpt: 'We are thrilled to announce that Aryas has been recognized in the Michelin Guide for exceptional culinary craftsmanship.',
      content: 'A heartfelt thank you to our patrons, farmers, and tireless kitchen team. The inspectors highlighted our Truffle Galouti and 18-hour Old Delhi Butter Chicken as masterworks of flavor equilibrium.',
      date: '2026-08-28',
      author: 'Editorial Team',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
      category: 'Announcement',
      isPublished: true
    },
    {
      id: 'post-3',
      title: 'Weekend Jazz & Tandoor Evenings on the Courtyard Terrace',
      slug: 'weekend-jazz-tandoor-courtyard',
      excerpt: 'Join us every Friday & Saturday evening for live acoustic jazz, charcoal grills, and bespoke botanical cocktails under the stars.',
      content: 'Our heated courtyard terrace now features live acoustic jazz ensembles every weekend from 7:30 PM. Enjoy smoke-kissed lamb chops and artisanal gin infusions in an enchanting open-air setting.',
      date: '2026-08-15',
      author: 'Events Director',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop',
      category: 'Event',
      isPublished: true
    }
  ],

  design: {
    theme: 'gold-obsidian',
    fontFamily: 'classic-serif',
    accentColor: '#d4af37',
    enableFloatingBookingBar: true,
    sectionsVisibility: {
      hero: true,
      about: true,
      menu: true,
      chefRecommendations: true,
      reservations: true,
      testimonials: true,
      announcements: true,
      locationHours: true,
      faq: true,
      contact: true
    }
  },

  seo: {
    pageTitle: 'Aryas Restaurant — Modern Artisanal & Fine Indian Dining',
    metaDescription: 'Experience award-winning modern Indian dining at Aryas in San Francisco. Handcrafted kebabs, 18-hour curries, wood-fired grills, and instant online table reservations.',
    metaKeywords: 'Aryas restaurant, fine dining, modern Indian cuisine, table reservation, San Francisco restaurant, Michelin guide, chef Arya, best butter chicken',
    ogTitle: 'Aryas Restaurant — Modern Artisanal & Fine Indian Dining',
    ogDescription: 'Experience award-winning modern Indian gastronomy. Reserve your table online for an exquisite culinary journey.',
    ogImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1200&auto=format&fit=crop',
    canonicalUrl: 'https://aryasrestaurant.com'
  },

  media: [
    {
      id: 'med-1',
      title: 'Signature Dum Biryani in Clay Pot',
      url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop',
      category: 'Dishes',
      tags: ['Biryani', 'Heritage', 'Main']
    },
    {
      id: 'med-2',
      title: 'Velvety Murgh Makhani with Garlic Naan',
      url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop',
      category: 'Dishes',
      tags: ['Curry', 'Butter Chicken']
    },
    {
      id: 'med-3',
      title: 'Charred Tandoori Racks & Mint Chutney',
      url: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      category: 'Dishes',
      tags: ['Tandoor', 'Lamb Chops']
    },
    {
      id: 'med-4',
      title: 'Golden Saffron Curries Platter',
      url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop',
      category: 'Dishes',
      tags: ['Curry', 'Spices']
    },
    {
      id: 'med-5',
      title: 'Intimate Candlelit Dining Room',
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
      category: 'Ambiance',
      tags: ['Interior', 'Romantic', 'Lighting']
    },
    {
      id: 'med-6',
      title: 'Courtyard Terrace & Fountain',
      url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop',
      category: 'Ambiance',
      tags: ['Terrace', 'Outdoor', 'Garden']
    },
    {
      id: 'med-7',
      title: 'Smoked Botanical Craft Cocktails',
      url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop',
      category: 'Drinks',
      tags: ['Cocktails', 'Bar', 'Bourbon']
    },
    {
      id: 'med-8',
      title: 'Chef Arya in Open Kitchen',
      url: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop',
      category: 'Chef & Team',
      tags: ['Chef', 'Kitchen', 'Culinary']
    }
  ],

  testimonials: [
    {
      id: 't-1',
      name: 'Jonathan Sterling',
      rating: 5,
      date: '3 days ago',
      comment: 'Hands down the most sublime dining experience in the Bay Area. The Truffle Galouti and Awadhi Biryani were perfection on a plate. The attention to detail from the host to the sommelier was world-class.',
      source: 'Google Review',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 't-2',
      name: 'Amara Campbell',
      rating: 5,
      date: '1 week ago',
      comment: 'We celebrated my mother’s 60th birthday at the Private Dining Suite. The personalized tasting menu, warm lighting, and exquisite butter chicken sauce had everyone raving for days.',
      source: 'Verified Diner',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 't-3',
      name: 'Rohan Mehra',
      rating: 5,
      date: '2 weeks ago',
      comment: 'As someone who grew up in Delhi and travels globally, Aryas delivers the rare magic of authentic deep flavors balanced with modern elegance. The cocktails with smoked cardamom are phenomenal.',
      source: 'Google Review',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 't-4',
      name: 'Claire Beauchamp',
      rating: 5,
      date: '3 weeks ago',
      comment: 'Impeccable table service and atmosphere. The Chef’s Table gave us front-row seats to the open tandoor and charcoal fire. Truly unforgettable dinner!',
      source: 'TripAdvisor',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
    }
  ],

  faqs: [
    {
      id: 'faq-1',
      question: 'What is the dress code at Aryas?',
      answer: 'We recommend smart casual to elegant evening attire. While formal suits are not required, we kindly request guests refrain from athletic wear, beachwear, and flip-flops to maintain our dining ambiance.',
      category: 'Reservations'
    },
    {
      id: 'faq-2',
      question: 'Do you accommodate dietary restrictions and allergies?',
      answer: 'Yes, extensively. Over 50% of our menu offers dedicated vegetarian, vegan, and gluten-free creations clearly labeled. Please mention any severe nut, dairy, or seafood allergies during booking so Chef Arya can tailor your courses.',
      category: 'Dietary'
    },
    {
      id: 'faq-3',
      question: 'Is parking available nearby?',
      answer: 'Yes! We provide complimentary valet parking at our Grand Avenue entrance from Thursday through Sunday evenings. Additional secure parking garages are located within 2 minutes walk on 5th Street.',
      category: 'Parking & Location'
    },
    {
      id: 'faq-4',
      question: 'How far in advance can I book a table?',
      answer: 'Reservations open 30 days in advance via our online booking engine. For parties of 7 or more or private dining suite buyouts, we recommend reserving 3 to 6 weeks early or submitting an inquiry via our contact form.',
      category: 'Reservations'
    },
    {
      id: 'faq-5',
      question: 'Can we book Aryas for weddings, receptions, or corporate events?',
      answer: 'Yes, our Private Dining Suite accommodates up to 24 seated guests, and full restaurant buyouts are available for up to 110 seated guests with bespoke menus, curated cocktail bars, and sommelier pairings.',
      category: 'Events & Private Dining'
    }
  ]
};
