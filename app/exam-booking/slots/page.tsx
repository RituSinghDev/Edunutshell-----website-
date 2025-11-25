'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Mock data for available slots
const mockSlots = [
  { id: 1, date: '2025-12-01', available: 120, total: 150 },
  { id: 2, date: '2025-12-02', available: 85, total: 150 },
  { id: 3, date: '2025-12-03', available: 0, total: 150 },
  { id: 4, date: '2025-12-05', available: 150, total: 150 },
  { id: 5, date: '2025-12-08', available: 45, total: 150 },
  { id: 6, date: '2025-12-10', available: 130, total: 150 },
  { id: 7, date: '2025-12-12', available: 95, total: 150 },
  { id: 8, date: '2025-12-15', available: 110, total: 150 },
  { id: 9, date: '2025-12-18', available: 0, total: 150 },
];

export default function SlotsPage() {
  const router = useRouter();
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const handleSelectSlot = (slotId: number) => {
    const slot = mockSlots.find(s => s.id === slotId);
    if (slot && slot.available > 0) {
      setSelectedSlot(slotId);
    }
  };

  const handleBookSlot = () => {
    if (selectedSlot) {
      const slot = mockSlots.find(s => s.id === selectedSlot);
      if (slot) {
        localStorage.setItem('selectedSlot', JSON.stringify(slot));
        router.push('/exam-booking/checkout');
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDay = (dateString: string) => {
    const date = new Date(dateString);
    return date.getDate();
  };

  const getMonth = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short' });
  };

  const getWeekday = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const selectedSlotData = mockSlots.find(s => s.id === selectedSlot);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Compact Hero Section */}
      <section className="relative py-12 pt-28 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/exam-booking" className="inline-flex items-center text-blue-100 hover:text-white mb-4 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium text-sm">Back to Exam Booking</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Select Your Exam Date
          </h1>
          <p className="text-blue-100">
            Choose an available slot from the calendar below
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar Grid - Left Side */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">December 2025</h2>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {mockSlots.map((slot) => {
                    const isFull = slot.available === 0;
                    const isSelected = selectedSlot === slot.id;
                    const availabilityPercentage = (slot.available / slot.total) * 100;
                    
                    return (
                      <button
                        key={slot.id}
                        onClick={() => handleSelectSlot(slot.id)}
                        disabled={isFull}
                        className={`relative p-4 rounded-xl border-2 transition-all ${
                          isFull
                            ? 'bg-slate-100 border-slate-200 cursor-not-allowed opacity-50'
                            : isSelected
                            ? 'bg-blue-50 border-blue-500 shadow-lg'
                            : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'
                        }`}
                      >
                        {/* Date */}
                        <div className="text-center mb-3">
                          <div className="text-xs font-medium text-slate-500 mb-1">
                            {getWeekday(slot.date)}
                          </div>
                          <div className="text-2xl font-bold text-slate-900">
                            {getDay(slot.date)}
                          </div>
                          <div className="text-xs font-medium text-slate-500">
                            {getMonth(slot.date)}
                          </div>
                        </div>

                        {/* Availability Badge */}
                        <div className="text-center">
                          {isFull ? (
                            <span className="inline-block px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded">
                              Full
                            </span>
                          ) : availabilityPercentage < 30 ? (
                            <span className="inline-block px-2 py-1 text-xs font-semibold text-orange-600 bg-orange-100 rounded">
                              {slot.available} left
                            </span>
                          ) : (
                            <span className="inline-block px-2 py-1 text-xs font-semibold text-green-600 bg-green-100 rounded">
                              {slot.available} slots
                            </span>
                          )}
                        </div>

                        {/* Selected Indicator */}
                        {isSelected && (
                          <div className="absolute top-2 right-2">
                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-slate-600">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-slate-600">Limited</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-slate-600">Full</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Summary - Right Side */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sticky top-24">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Booking Summary</h3>
                
                {selectedSlotData ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="text-sm text-slate-600 mb-1">Selected Date</div>
                      <div className="text-lg font-bold text-slate-900">
                        {formatDate(selectedSlotData.date)}
                      </div>
                      <div className="text-sm text-slate-600 mt-2">
                        {selectedSlotData.available} slots available
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Exam Fee</span>
                        <span className="font-semibold text-slate-900">₹500</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Processing Fee</span>
                        <span className="font-semibold text-slate-900">₹50</span>
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <div className="flex justify-between">
                          <span className="font-semibold text-slate-900">Total</span>
                          <span className="font-bold text-blue-600 text-lg">₹550</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleBookSlot}
                      className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                    >
                      Continue to Booking
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg className="w-16 h-16 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-slate-500 text-sm">
                      Select a date from the calendar to continue
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info Footer */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">150 Slots Daily</h4>
                  <p className="text-xs text-slate-600">Limited availability per day</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">Email Confirmation</h4>
                  <p className="text-xs text-slate-600">Sent after booking</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">Arrive Early</h4>
                  <p className="text-xs text-slate-600">15 minutes before exam</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
