import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { Clock, Check, AlertTriangle, Car } from 'lucide-react';
import { OpeningHoursData } from '../../types';

export const HoursEditor: React.FC = () => {
  const { data, updateHours, showToast } = useRestaurant();
  const [hoursState, setHoursState] = useState<OpeningHoursData>(JSON.parse(JSON.stringify(data.hours)));

  const handleDayChange = (index: number, field: 'lunch' | 'dinner' | 'isOpen', value: any) => {
    setHoursState((prev) => {
      const updated = [...prev.regularHours];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, regularHours: updated };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateHours(hoursState);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <h2 className="text-2xl font-heading font-bold text-stone-100">
            Opening Hours & Service Schedule
          </h2>
          <p className="text-stone-400 text-xs mt-1">
            Configure lunch and evening dinner timings, day closures, and special announcement alerts.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
        >
          <Check className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Special Notice Banner */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-heading font-bold text-stone-100">
                Special Patron Notice / Holiday Banner
              </h3>
            </div>
            <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
              <input
                type="checkbox"
                checked={hoursState.isSpecialNoticeActive}
                onChange={(e) => setHoursState({ ...hoursState, isSpecialNoticeActive: e.target.checked })}
                className="rounded accent-amber-500 w-4 h-4"
              />
              <span>Display Banner on Site</span>
            </label>
          </div>

          <input
            type="text"
            value={hoursState.specialNotice || ''}
            onChange={(e) => setHoursState({ ...hoursState, specialNotice: e.target.value })}
            placeholder="e.g., Complimentary Valet Parking available Thursday through Sunday evenings."
            className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Days Table */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between text-xs text-stone-400 font-medium">
            <span>Day of Week</span>
            <span>Lunch Shift</span>
            <span>Dinner Shift</span>
            <span>Service Status</span>
          </div>

          <div className="divide-y divide-stone-800">
            {hoursState.regularHours.map((dayItem, index) => (
              <div
                key={dayItem.day}
                className="p-4 grid grid-cols-1 sm:grid-cols-4 items-center gap-4 hover:bg-stone-850/40 transition-colors"
              >
                <div className="font-heading font-semibold text-stone-200 text-sm">
                  {dayItem.day}
                </div>

                <div>
                  <label className="sm:hidden text-[10px] text-stone-500 block uppercase">Lunch</label>
                  <input
                    type="text"
                    value={dayItem.lunch}
                    onChange={(e) => handleDayChange(index, 'lunch', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="sm:hidden text-[10px] text-stone-500 block uppercase">Dinner</label>
                  <input
                    type="text"
                    value={dayItem.dinner}
                    onChange={(e) => handleDayChange(index, 'dinner', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center sm:justify-end gap-3">
                  <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dayItem.isOpen}
                      onChange={(e) => handleDayChange(index, 'isOpen', e.target.checked)}
                      className="rounded accent-amber-500 w-4 h-4"
                    />
                    <span>{dayItem.isOpen ? 'Open Service' : 'Closed'}</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};
