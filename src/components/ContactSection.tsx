import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Send, Phone, Mail, MapPin, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { data, submitInquiry } = useRestaurant();
  const hp = data.homepage;

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Private Dining & Event Inquiry',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSubmitting(true);
    try {
      await submitInquiry(form);
      setSubmitted(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        subject: 'Private Dining & Event Inquiry',
        message: ''
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-stone-900/60 text-stone-100 border-t border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Concierge & Inquiries</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-stone-100 mb-4">
                Connect with the Aryas Team
              </h2>
              <p className="text-stone-300 text-sm leading-relaxed font-body">
                For private dining room buyouts, corporate banquets, wedding rehearsals, or press inquiries, our dining director is at your service.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-950 border border-stone-800">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-stone-400">Phone Reservations & Inquiries</div>
                  <a href={`tel:${hp.phone}`} className="text-sm font-bold text-stone-100 hover:text-amber-400 transition-colors">
                    {hp.phone}
                  </a>
                  <div className="text-[11px] text-stone-400">Available daily 11:00 AM – 10:30 PM</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-950 border border-stone-800">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-stone-400">Email Inquiries</div>
                  <a href={`mailto:${hp.email}`} className="text-sm font-bold text-stone-100 hover:text-amber-400 transition-colors">
                    {hp.email}
                  </a>
                  <div className="text-[11px] text-stone-400">Responses within 2 to 4 business hours</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-950 border border-stone-800">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-stone-400">Address & Valet</div>
                  <div className="text-sm font-semibold text-stone-100">{hp.address}</div>
                  <div className="text-[11px] text-stone-400">{hp.cityStateZip}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiries Form */}
          <div className="lg:col-span-7 bg-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-stone-100">
                  Message Received
                </h3>
                <p className="text-stone-300 text-sm max-w-md mx-auto">
                  Thank you for reaching out. Our event director and sommelier team have received your details and will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-heading font-bold text-stone-100 mb-2">
                  Send a Customer Inquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-stone-100 focus:border-amber-500/80 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-stone-100 focus:border-amber-500/80 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (415) 555-0123"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-stone-100 focus:border-amber-500/80 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                      Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-stone-100 focus:border-amber-500/80 focus:outline-none"
                    >
                      <option value="Private Dining & Event Inquiry">Private Dining & Event Inquiry</option>
                      <option value="Large Party Table (7+ Guests)">Large Party Table (7+ Guests)</option>
                      <option value="Dietary & Allergen Question">Dietary & Allergen Question</option>
                      <option value="Corporate Catering">Corporate Catering</option>
                      <option value="General Dining Feedback">General Dining Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Please tell us about your requested dates, guest count, dietary preferences, or any specific questions..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-sm text-stone-100 focus:border-amber-500/80 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting Inquiry...' : 'Send Inquiry to Concierge'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
