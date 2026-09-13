import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { X, Calendar, Clock, Users, Sparkles, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';
import { Reservation } from '../types';

export const ReservationModal: React.FC = () => {
  const {
    isReservationModalOpen,
    setIsReservationModalOpen,
    selectedDishForReservation,
    setSelectedDishForReservation,
    createReservation
  } = useRestaurant();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: () => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      return d.toISOString().split('T')[0];
    },
    time: '19:00',
    guests: 2,
    seatingPreference: 'Main Dining Room' as Reservation['seatingPreference'],
    specialRequests: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    if (selectedDishForReservation) {
      setFormData((prev) => ({
        ...prev,
        specialRequests: `Requested dish: ${selectedDishForReservation}`
      }));
    }
  }, [selectedDishForReservation]);

  if (!isReservationModalOpen) return null;

  const handleClose = () => {
    setIsReservationModalOpen(false);
    setSelectedDishForReservation(null);
    setConfirmedReservation(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setSubmitting(true);
    try {
      const res = await createReservation({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: typeof formData.date === 'function' ? formData.date() : formData.date,
        time: formData.time,
        guests: Number(formData.guests),
        seatingPreference: formData.seatingPreference,
        specialRequests: formData.specialRequests
      });
      setConfirmedReservation(res);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const timeSlots = [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
    '9:00 PM', '9:30 PM'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative bg-stone-900 border border-amber-500/30 rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-950 text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedReservation ? (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Table Reserved
              </span>
              <h3 className="text-2xl font-heading font-bold text-stone-100 mt-1">
                Your Table is Prepared at Aryas
              </h3>
              <p className="text-stone-300 text-xs mt-2">
                Confirmation sent to <strong className="text-amber-300">{confirmedReservation.email}</strong>.
              </p>
            </div>

            <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 text-left space-y-2.5 text-xs">
              <div className="flex justify-between pb-2 border-b border-stone-800">
                <span className="text-stone-400">Confirmation Code:</span>
                <span className="font-mono text-amber-400 font-bold">{confirmedReservation.confirmationCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Guest:</span>
                <span className="text-stone-200">{confirmedReservation.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Date & Time:</span>
                <span className="text-stone-200">{confirmedReservation.date} at {confirmedReservation.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Party:</span>
                <span className="text-stone-200">{confirmedReservation.guests} Guests ({confirmedReservation.seatingPreference})</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors cursor-pointer"
            >
              Done & Return to Site
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-semibold uppercase tracking-wider mb-2">
                <Calendar className="w-3 h-3" />
                <span>Quick Table Reservation</span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-stone-100">
                Reserve Your Dining Experience
              </h3>
              <p className="text-stone-400 text-xs mt-1">
                Select your preferred date, time, and party size below.
              </p>
            </div>

            {selectedDishForReservation && (
              <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-xs text-amber-200">
                Special reservation request for: <strong>{selectedDishForReservation}</strong>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Guests</label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Date</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={typeof formData.date === 'function' ? formData.date() : formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Time</label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Seating Area</label>
              <select
                value={formData.seatingPreference}
                onChange={(e) => setFormData({ ...formData, seatingPreference: e.target.value as any })}
                className="w-full px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none"
              >
                <option value="Main Dining Room">Main Dining Room (Chandelier hall)</option>
                <option value="Chef's Table">Chef's Table (Open kitchen)</option>
                <option value="Terrace & Garden">Terrace & Garden (Heated courtyard)</option>
                <option value="Private Dining Suite">Private Dining Suite</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Eleanor Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="eleanor@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+1 (415) 555-0199"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Special Occasion / Notes</label>
              <input
                type="text"
                placeholder="e.g., Anniversary, Birthday, Nut Allergy"
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-full bg-linear-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{submitting ? 'Confirming...' : 'Confirm Table Reservation'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
