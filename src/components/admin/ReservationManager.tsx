import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { Reservation, ReservationStatus } from '../../types';
import { Calendar, Users, Clock, Mail, CheckCircle2, XCircle, AlertCircle, Plus, Send, Eye, X } from 'lucide-react';

export const ReservationManager: React.FC = () => {
  const { data, updateReservationStatus, createReservation, showToast } = useRestaurant();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [activeEmailModal, setActiveEmailModal] = useState<Reservation | null>(null);
  const [isAddingWalkin, setIsAddingWalkin] = useState(false);

  // Walk-in form
  const [walkin, setWalkin] = useState({
    name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    guests: 2,
    seatingPreference: 'Main Dining Room' as Reservation['seatingPreference'],
    specialRequests: 'Walk-in / Phone reservation'
  });

  const filtered = data.reservations.filter((res) => {
    const matchesStatus = filterStatus === 'All' || res.status === filterStatus;
    const matchesSearch =
      res.name.toLowerCase().includes(search.toLowerCase()) ||
      res.email.toLowerCase().includes(search.toLowerCase()) ||
      res.confirmationCode.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusUpdate = (res: Reservation, newStatus: ReservationStatus) => {
    updateReservationStatus(res.id, newStatus, true);
    if (newStatus === 'Confirmed') {
      showToast(`Reservation ${res.confirmationCode} confirmed! Email notification sent.`);
    }
  };

  const handleCreateWalkin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkin.name || !walkin.email) return;
    try {
      await createReservation({
        ...walkin,
        guests: Number(walkin.guests)
      });
      setIsAddingWalkin(false);
      setWalkin({
        name: '',
        email: '',
        phone: '',
        date: new Date().toISOString().split('T')[0],
        time: '19:00',
        guests: 2,
        seatingPreference: 'Main Dining Room',
        specialRequests: 'Walk-in / Phone reservation'
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <h2 className="text-2xl font-heading font-bold text-stone-100">
            Table Reservations System
          </h2>
          <p className="text-stone-400 text-xs mt-1">
            Review guest bookings, confirm table allocations, and dispatch simulated email notifications.
          </p>
        </div>

        <button
          onClick={() => setIsAddingWalkin(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Phone / Walk-in Booking</span>
        </button>
      </div>

      {/* Manual Booking Drawer */}
      {isAddingWalkin && (
        <div className="bg-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-stone-800">
            <h3 className="text-lg font-heading font-bold text-stone-100">
              New Manual Table Allocation
            </h3>
            <button
              onClick={() => setIsAddingWalkin(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 bg-stone-950"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleCreateWalkin} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Guest Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Robert Langdon"
                  value={walkin.name}
                  onChange={(e) => setWalkin({ ...walkin, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="robert@example.com"
                  value={walkin.email}
                  onChange={(e) => setWalkin({ ...walkin, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Phone</label>
                <input
                  type="tel"
                  placeholder="+1 (415) 555-0199"
                  value={walkin.phone}
                  onChange={(e) => setWalkin({ ...walkin, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Date</label>
                <input
                  type="date"
                  value={walkin.date}
                  onChange={(e) => setWalkin({ ...walkin, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Time</label>
                <input
                  type="text"
                  value={walkin.time}
                  onChange={(e) => setWalkin({ ...walkin, time: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Guests</label>
                <select
                  value={walkin.guests}
                  onChange={(e) => setWalkin({ ...walkin, guests: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                    <option key={n} value={n}>
                      {n} Guests
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Seating Area</label>
              <select
                value={walkin.seatingPreference}
                onChange={(e) => setWalkin({ ...walkin, seatingPreference: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200"
              >
                <option value="Main Dining Room">Main Dining Room</option>
                <option value="Chef's Table">Chef's Table</option>
                <option value="Terrace & Garden">Terrace & Garden</option>
                <option value="Private Dining Suite">Private Dining Suite</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
              >
                Save Reservation
              </button>
              <button
                type="button"
                onClick={() => setIsAddingWalkin(false)}
                className="px-5 py-2.5 rounded-full bg-stone-800 text-stone-300 text-xs"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Filter by guest name, code, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
        />
      </div>

      {/* Reservations Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span>Bookings ({filtered.length})</span>
          <span>Automatic email confirmation enabled</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-stone-500 text-xs">
            No reservations found for this filter.
          </div>
        ) : (
          <div className="divide-y divide-stone-800">
            {filtered.map((res) => (
              <div
                key={res.id}
                className="p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 hover:bg-stone-850/50 transition-colors"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-heading font-bold text-stone-100 text-base">
                      {res.name}
                    </span>
                    <span className="font-mono text-xs text-amber-400 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20">
                      {res.confirmationCode}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        res.status === 'Confirmed'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : res.status === 'Pending'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : res.status === 'Cancelled'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {res.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      {res.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {res.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      {res.guests} Guests
                    </span>
                    <span className="text-stone-300">({res.seatingPreference})</span>
                  </div>

                  <div className="text-[11px] text-stone-500 flex flex-wrap gap-3">
                    <span>Contact: {res.email}</span>
                    {res.phone && <span>• {res.phone}</span>}
                  </div>

                  {res.specialRequests && (
                    <div className="text-xs text-amber-300/80 bg-stone-950/60 p-2 rounded-lg border border-stone-800 max-w-xl">
                      <strong>Notes:</strong> {res.specialRequests}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 self-end lg:self-center">
                  {/* View Email Confirmation Slip */}
                  <button
                    onClick={() => setActiveEmailModal(res)}
                    className="px-3 py-1.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 text-xs border border-stone-800 flex items-center gap-1.5 cursor-pointer"
                    title="View Guest Email Notification Preview"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>Email Preview</span>
                  </button>

                  {/* Status Toggle Buttons */}
                  {res.status !== 'Confirmed' && (
                    <button
                      onClick={() => handleStatusUpdate(res, 'Confirmed')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Confirm Table</span>
                    </button>
                  )}

                  {res.status === 'Confirmed' && (
                    <button
                      onClick={() => handleStatusUpdate(res, 'Completed')}
                      className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs"
                    >
                      Mark Completed
                    </button>
                  )}

                  {res.status !== 'Cancelled' && (
                    <button
                      onClick={() => handleStatusUpdate(res, 'Cancelled')}
                      className="px-3 py-1.5 rounded-xl bg-stone-950 hover:bg-rose-950 text-rose-400 hover:text-rose-300 text-xs border border-stone-800"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Email Notification Preview Modal */}
      {activeEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-stone-900 border border-amber-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-400 font-bold">
                <Mail className="w-4 h-4" />
                <span>Guest Email Notification Template</span>
              </div>
              <button
                onClick={() => setActiveEmailModal(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Email Canvas Preview */}
            <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 text-stone-300 text-xs space-y-4 font-body">
              <div className="border-b border-stone-800 pb-3">
                <span className="text-stone-500 block text-[10px] uppercase">To:</span>
                <span className="text-stone-200 font-semibold">{activeEmailModal.email}</span>
                <span className="text-stone-500 block text-[10px] uppercase mt-2">Subject:</span>
                <span className="text-amber-300 font-semibold">
                  Reservation Confirmation — Aryas Restaurant [{activeEmailModal.confirmationCode}]
                </span>
              </div>

              <div className="space-y-3 leading-relaxed text-stone-300">
                <p>Dear {activeEmailModal.name},</p>
                <p>
                  We are delighted to confirm your table reservation at <strong>Aryas</strong>. Our culinary team and sommeliers eagerly await your presence.
                </p>
                <div className="bg-stone-900/90 p-3.5 rounded-xl border border-stone-800 space-y-1">
                  <div><strong>Date:</strong> {activeEmailModal.date}</div>
                  <div><strong>Time:</strong> {activeEmailModal.time}</div>
                  <div><strong>Party Size:</strong> {activeEmailModal.guests} Guests</div>
                  <div><strong>Seating:</strong> {activeEmailModal.seatingPreference}</div>
                  <div><strong>Confirmation Code:</strong> {activeEmailModal.confirmationCode}</div>
                </div>
                <p className="text-[11px] text-stone-400">
                  Complimentary valet parking is available at our Grand Avenue entrance. If your schedule changes, please contact our concierge at +1 (415) 890-2792.
                </p>
                <p className="pt-2 text-amber-400/90 font-heading">
                  Warmest regards,<br />
                  Host Concierge & Chef Arya Vardhan
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Notification status: Sent & Logged
              </span>
              <button
                onClick={() => setActiveEmailModal(null)}
                className="px-5 py-2 rounded-full bg-amber-500 text-stone-950 font-bold text-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
