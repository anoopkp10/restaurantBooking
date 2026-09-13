import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Calendar, Clock, Users, Sparkles, CheckCircle2, ShieldCheck, Mail, MapPin, Phone, AlertCircle } from 'lucide-react';
import { Reservation } from '../types';

export const ReservationSection: React.FC = () => {
  const { data, createReservation, selectedDishForReservation, setSelectedDishForReservation } = useRestaurant();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: () => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      return d.toISOString().split('T')[0];
    },
    time: '19:30',
    guests: 2,
    seatingPreference: 'Main Dining Room' as Reservation['seatingPreference'],
    specialRequests: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    if (selectedDishForReservation) {
      setFormData(prev => ({
        ...prev,
        specialRequests: prev.specialRequests 
          ? `${prev.specialRequests}. Interested in tasting: ${selectedDishForReservation}`
          : `Interested in tasting: ${selectedDishForReservation}`
      }));
    }
  }, [selectedDishForReservation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      return;
    }

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
      setSelectedDishForReservation(null);
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
    '9:00 PM', '9:30 PM', '10:00 PM'
  ];

  return (
    <section id="reservation-section" className="py-24 bg-stone-950 text-stone-100 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Instant Online Table Booking</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-stone-100 mb-4">
              {data.homepage.reservationHeadline}
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-body">
              {data.homepage.reservationSubtext}
            </p>
            <div className="w-20 h-1 bg-linear-to-r from-amber-400 to-amber-600 mx-auto mt-6 rounded-full" />
          </div>

          {/* Booking Container */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            {confirmedReservation ? (
              /* Success State / Confirmation Slip */
              <div className="text-center py-8 space-y-6 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                    Reservation Confirmed
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-stone-100 mt-1">
                    We Look Forward to Welcoming You
                  </h3>
                  <p className="text-stone-300 text-sm mt-2">
                    A confirmation email & SMS has been prepared for <strong className="text-amber-300">{confirmedReservation.email}</strong>.
                  </p>
                </div>

                {/* Confirmation Slip Card */}
                <div className="bg-stone-950/90 border border-amber-500/30 rounded-2xl p-6 max-w-md mx-auto text-left space-y-3 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                    <span className="text-xs text-stone-400">Confirmation Code</span>
                    <span className="font-mono text-sm font-bold text-amber-400">
                      {confirmedReservation.confirmationCode}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-stone-500 block">Guest Name</span>
                      <span className="text-stone-200 font-semibold">{confirmedReservation.name}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Party Size</span>
                      <span className="text-stone-200 font-semibold">{confirmedReservation.guests} Guests</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Date & Time</span>
                      <span className="text-stone-200 font-semibold">{confirmedReservation.date} at {confirmedReservation.time}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Seating Area</span>
                      <span className="text-stone-200 font-semibold">{confirmedReservation.seatingPreference}</span>
                    </div>
                  </div>

                  {confirmedReservation.specialRequests && (
                    <div className="pt-2 border-t border-stone-800/80 text-xs">
                      <span className="text-stone-500 block">Special Requests</span>
                      <span className="text-stone-300 italic">{confirmedReservation.specialRequests}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-amber-400" /> Host & Guest Email Dispatched
                    </span>
                    <span className="text-emerald-400 font-medium">Status: Logged</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <button
                    onClick={() => {
                      setConfirmedReservation(null);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        date: new Date().toISOString().split('T')[0],
                        time: '19:30',
                        guests: 2,
                        seatingPreference: 'Main Dining Room',
                        specialRequests: ''
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors"
                  >
                    Make Another Booking
                  </button>

                  <a
                    href={`tel:${data.homepage.phone}`}
                    className="px-6 py-2.5 rounded-full bg-amber-500 text-stone-950 text-xs font-bold hover:bg-amber-400 transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Host Concierge</span>
                  </a>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                {selectedDishForReservation && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 flex items-center justify-between">
                    <span>Reserving table with request for: <strong>{selectedDishForReservation}</strong></span>
                    <button
                      type="button"
                      onClick={() => setSelectedDishForReservation(null)}
                      className="text-stone-400 hover:text-stone-200 text-[11px]"
                    >
                      Clear
                    </button>
                  </div>
                )}

                {/* Step 1: Party, Date, Time */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Guests */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-2 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <span>Number of Guests</span>
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 focus:border-amber-500/80 focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>Date</span>
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={typeof formData.date === 'function' ? formData.date() : formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 focus:border-amber-500/80 focus:outline-none"
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-2 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Preferred Time</span>
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 focus:border-amber-500/80 focus:outline-none"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Step 2: Seating Preference */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-2">
                    Seating Experience Preference
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'Main Dining Room', desc: 'Opulent chandelier dining' },
                      { id: "Chef's Table", desc: 'Front-row open kitchen' },
                      { id: 'Terrace & Garden', desc: 'Heated courtyard under stars' },
                      { id: 'Private Dining Suite', desc: 'Intimate private chamber' }
                    ].map((seat) => (
                      <button
                        type="button"
                        key={seat.id}
                        onClick={() => setFormData({ ...formData, seatingPreference: seat.id as any })}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          formData.seatingPreference === seat.id
                            ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-sm'
                            : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-950'
                        }`}
                      >
                        <div className="text-xs font-bold">{seat.id}</div>
                        <div className="text-[10px] text-stone-400 mt-0.5">{seat.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Guest Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 focus:border-amber-500/80 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="eleanor@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 focus:border-amber-500/80 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (415) 555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 focus:border-amber-500/80 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-2">
                    Dietary Allergies or Special Occasions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Celebrating anniversary, gluten-free diner, high chair needed"
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-100 focus:border-amber-500/80 focus:outline-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-full bg-linear-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-bold text-base shadow-xl hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Securing Your Table...</span>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 text-stone-950" />
                        <span>Confirm Instant Table Reservation</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs text-stone-400 pt-2 border-t border-stone-800">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    Instant confirmation code & cancellation guarantee
                  </span>
                  <span>No prepayment required</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
