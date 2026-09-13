import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { initialRestaurantData } from './src/data/initialData';
import { RestaurantData } from './src/types';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Data persistence
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'restaurant-data.json');

function loadData(): RestaurantData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error loading data, using defaults:', err);
  }
  saveData(initialRestaurantData);
  return initialRestaurantData;
}

function saveData(data: RestaurantData) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving data:', err);
  }
}

let store: RestaurantData = loadData();

// Helper for Gemini AI
function getGeminiClient(): GoogleGenAI | null {
  if (process.env.GEMINI_API_KEY) {
    return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return null;
}

// ----------------- API ROUTES ----------------- //

// Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', restaurant: 'Aryas', time: new Date().toISOString() });
});

// Full state
app.get('/api/data', (req, res) => {
  res.json(store);
});

// Reset to default data
app.post('/api/reset', (req, res) => {
  store = JSON.parse(JSON.stringify(initialRestaurantData));
  saveData(store);
  res.json({ success: true, message: 'Reset to pristine demo data', data: store });
});

// Menu Management
app.post('/api/menu', (req, res) => {
  const newItem = {
    id: 'm_' + Date.now(),
    ...req.body
  };
  store.menu.unshift(newItem);
  saveData(store);
  res.status(201).json(newItem);
});

app.put('/api/menu/:id', (req, res) => {
  const { id } = req.params;
  const index = store.menu.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Menu item not found' });
  }
  store.menu[index] = { ...store.menu[index], ...req.body, id };
  saveData(store);
  res.json(store.menu[index]);
});

app.delete('/api/menu/:id', (req, res) => {
  const { id } = req.params;
  store.menu = store.menu.filter(item => item.id !== id);
  saveData(store);
  res.json({ success: true, id });
});

// Reservations
app.get('/api/reservations', (req, res) => {
  res.json(store.reservations);
});

app.post('/api/reservations', (req, res) => {
  const { name, email, phone, date, time, guests, seatingPreference, specialRequests } = req.body;
  if (!name || !email || !date || !time) {
    return res.status(400).json({ error: 'Name, email, date, and time are required' });
  }

  const confirmationCode = 'ARYAS-' + Math.floor(1000 + Math.random() * 9000);
  const newReservation = {
    id: 'res_' + Date.now(),
    name,
    email,
    phone: phone || '',
    date,
    time,
    guests: Number(guests) || 2,
    seatingPreference: seatingPreference || 'Main Dining Room',
    specialRequests: specialRequests || '',
    status: 'Pending' as const,
    createdAt: new Date().toISOString(),
    confirmationCode,
    emailNotificationSent: true // Automatically simulates client and host confirmation notification dispatch
  };

  store.reservations.unshift(newReservation);
  saveData(store);
  res.status(201).json(newReservation);
});

app.patch('/api/reservations/:id', (req, res) => {
  const { id } = req.params;
  const index = store.reservations.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Reservation not found' });
  }
  store.reservations[index] = { ...store.reservations[index], ...req.body, id };
  saveData(store);
  res.json(store.reservations[index]);
});

// Inquiries / Contact
app.get('/api/inquiries', (req, res) => {
  res.json(store.inquiries);
});

app.post('/api/inquiries', (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }
  const newInquiry = {
    id: 'inq_' + Date.now(),
    name,
    email,
    phone: phone || '',
    subject: subject || 'General Inquiry',
    message,
    date: new Date().toISOString(),
    status: 'Unread' as const
  };
  store.inquiries.unshift(newInquiry);
  saveData(store);
  res.status(201).json(newInquiry);
});

app.patch('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const index = store.inquiries.findIndex(i => i.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Inquiry not found' });
  }
  store.inquiries[index] = { ...store.inquiries[index], ...req.body, id };
  saveData(store);
  res.json(store.inquiries[index]);
});

// Opening Hours Settings
app.put('/api/settings/hours', (req, res) => {
  store.hours = req.body;
  saveData(store);
  res.json(store.hours);
});

// SEO Settings
app.put('/api/settings/seo', (req, res) => {
  store.seo = req.body;
  saveData(store);
  res.json(store.seo);
});

// Design & Themes Settings
app.put('/api/settings/design', (req, res) => {
  store.design = req.body;
  saveData(store);
  res.json(store.design);
});

// Homepage CMS Content
app.put('/api/settings/homepage', (req, res) => {
  store.homepage = { ...store.homepage, ...req.body };
  saveData(store);
  res.json(store.homepage);
});

// Blog Posts / Announcements / Events
app.post('/api/cms/posts', (req, res) => {
  const newPost = {
    id: 'post_' + Date.now(),
    date: new Date().toISOString().split('T')[0],
    isPublished: true,
    ...req.body
  };
  store.posts.unshift(newPost);
  saveData(store);
  res.status(201).json(newPost);
});

app.put('/api/cms/posts/:id', (req, res) => {
  const { id } = req.params;
  const index = store.posts.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  store.posts[index] = { ...store.posts[index], ...req.body, id };
  saveData(store);
  res.json(store.posts[index]);
});

app.delete('/api/cms/posts/:id', (req, res) => {
  const { id } = req.params;
  store.posts = store.posts.filter(p => p.id !== id);
  saveData(store);
  res.json({ success: true, id });
});

// Media Library
app.post('/api/media', (req, res) => {
  const newMedia = {
    id: 'med_' + Date.now(),
    ...req.body
  };
  store.media.unshift(newMedia);
  saveData(store);
  res.status(201).json(newMedia);
});

// AI Copywriter / Assistant endpoint
app.post('/api/ai/generate', async (req, res) => {
  const { prompt, type } = req.body;
  const ai = getGeminiClient();

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an elite culinary copywriter for "Aryas", a luxury modern Indian fine dining restaurant.
Task: ${prompt}
Type: ${type || 'general'}
Write an evocative, mouthwatering, and conversion-focused response. Keep it refined, elegant, and concise.`
      });
      return res.json({ result: response.text });
    } catch (err: any) {
      console.error('Gemini error:', err);
      // Fallback
    }
  }

  // Graceful fallback templates if no API key or on error
  let fallback = '';
  if (type === 'dish') {
    fallback = 'Charred in our traditional babool clay oven, infused with single-origin Malabar black pepper and finished with a velvety saffron emulsion.';
  } else if (type === 'announcement') {
    fallback = 'Join us this season for a sublime culinary soiree featuring rare single-estate spices, royal Awadhi slow-roasts, and sommelier-curated wine pairings.';
  } else if (type === 'email') {
    fallback = 'Dear valued guest, We are delighted to confirm your reservation at Aryas. Our culinary artisans and hospitality team eagerly look forward to hosting you for an exquisite evening.';
  } else {
    fallback = 'Crafted with passion, our culinary artisans honor timeless heritage while celebrating progressive gastronomic elegance.';
  }
  res.json({ result: fallback });
});

// ----------------- VITE & STATIC SERVING ----------------- //

async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Aryas Restaurant server running on http://0.0.0.0:${PORT}`);
  });
}

start();
