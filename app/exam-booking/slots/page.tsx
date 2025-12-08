'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Exam {
  _id: string;
  title: string;
  description: string;
  price: number;
  totalSlotsPerDay: number;
  createdAt: string;
  updatedAt: string;
}

interface Slot {
  _id: string;
  exam: string;
  date: string;
  bookedCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function SlotsPage() {
  const router = useRouter();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [exams, setExams] = useState<Exam[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState('');
  const [slotsError, setSlotsError] = useState('');

  useEffect(() => {
    fetchExams();
  }, []);

  useEffect(() => {
    if (selectedExam) {
      fetchSlots(selectedExam._id);
    }
  }, [selectedExam]);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://edunutshell-lms.onrender.com/api/exams/list');
      
      if (!response.ok) {
        throw new Error('Failed to fetch exams');
      }

      const data = await response.json();
      if (data.success && data.exams) {
        setExams(data.exams);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load exams');
      console.error('Error fetching exams:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSlots = async (examId: string) => {
    try {
      setLoadingSlots(true);
      setSlotsError('');
      setSelectedSlot(null);
      const response = await fetch(`https://edunutshell-lms.onrender.com/api/slot/${examId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch slots');
      }

      const data = await response.json();
      if (data.success && data.slots) {
        setSlots(data.slots);
      }
    } catch (err) {
      setSlotsError(err instanceof Error ? err.message : 'Failed to load slots');
      console.error('Error fetching slots:', err);
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleSelectSlot = (slotId: string, slot: Slot) => {
    const available = (selectedExam?.totalSlotsPerDay || 0) - slot.bookedCount;
    if (available > 0) {
      setSelectedSlot(slotId);
    }
  };

  const handleBookSlot = () => {
    if (selectedSlot && selectedExam) {
      const slot = slots.find(s => s._id === selectedSlot);
      if (slot) {
        localStorage.setItem('selectedSlot', JSON.stringify(slot));
        localStorage.setItem('selectedExam', JSON.stringify(selectedExam));
        
        // Check if student data exists, if not redirect to verification
        const studentData = localStorage.getItem('studentData');
        if (!studentData) {
          router.push('/exam-booking/verification');
        } else {
          router.push('/exam-booking/checkout');
        }
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

  const selectedSlotData = slots.find(s => s._id === selectedSlot);

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

          {/* Exam Selection Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Step 1: Select Your Exam</h2>
            
            {loading ? (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
                <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-slate-600">Loading exams...</p>
              </div>
            ) : error ? (
              <div className="bg-white rounded-2xl shadow-lg border border-red-200 p-8">
                <div className="flex items-center gap-3 text-red-600 mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="font-semibold">{error}</p>
                </div>
                <button
                  onClick={fetchExams}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : exams.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
                <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-slate-600">No exams available at the moment</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {exams.map((exam) => (
                  <button
                    key={exam._id}
                    onClick={() => setSelectedExam(exam)}
                    className={`text-left p-6 rounded-xl border-2 transition-all ${
                      selectedExam?._id === exam._id
                        ? 'bg-blue-50 border-blue-500 shadow-lg'
                        : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-slate-900">{exam.title}</h3>
                      {selectedExam?._id === exam._id && (
                        <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-4">{exam.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">₹{exam.price}</span>
                      <span className="text-xs text-slate-500">{exam.totalSlotsPerDay} slots/day</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Selection Section */}
          {selectedExam && (
            <>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-slate-900">Step 2: Select Your Date</h2>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar Grid - Left Side */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Available Dates</h2>
                </div>

                {loadingSlots ? (
                  <div className="py-12 text-center">
                    <svg className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-slate-600">Loading available slots...</p>
                  </div>
                ) : slotsError ? (
                  <div className="py-8 text-center">
                    <svg className="w-12 h-12 text-red-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-600 font-medium mb-2">{slotsError}</p>
                    <button
                      onClick={() => selectedExam && fetchSlots(selectedExam._id)}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Try Again
                    </button>
                  </div>
                ) : slots.length === 0 ? (
                  <div className="py-12 text-center">
                    <svg className="w-16 h-16 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-slate-600">No slots available for this exam</p>
                  </div>
                ) : (
                  <>
                    {/* Calendar Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {slots.map((slot) => {
                        const totalSlots = selectedExam?.totalSlotsPerDay || 150;
                        const available = totalSlots - slot.bookedCount;
                        const isFull = available <= 0;
                        const isSelected = selectedSlot === slot._id;
                        const availabilityPercentage = (available / totalSlots) * 100;
                        
                        return (
                          <button
                            key={slot._id}
                            onClick={() => handleSelectSlot(slot._id, slot)}
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
                                  {available} left
                                </span>
                              ) : (
                                <span className="inline-block px-2 py-1 text-xs font-semibold text-green-600 bg-green-100 rounded">
                                  {available} slots
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
                  </>
                )}

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
                
                {selectedExam && (
                  <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="text-sm text-slate-600 mb-1">Selected Exam</div>
                    <div className="text-lg font-bold text-slate-900">{selectedExam.title}</div>
                    <div className="text-sm text-slate-600 mt-1">{selectedExam.description}</div>
                  </div>
                )}

                {selectedSlotData ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="text-sm text-slate-600 mb-1">Selected Date</div>
                      <div className="text-lg font-bold text-slate-900">
                        {formatDate(selectedSlotData.date)}
                      </div>
                      <div className="text-sm text-slate-600 mt-2">
                        {(selectedExam?.totalSlotsPerDay || 0) - selectedSlotData.bookedCount} slots available
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Exam Fee</span>
                        <span className="font-semibold text-slate-900">₹{selectedExam?.price || 0}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Processing Fee</span>
                        <span className="font-semibold text-slate-900">₹50</span>
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <div className="flex justify-between">
                          <span className="font-semibold text-slate-900">Total</span>
                          <span className="font-bold text-blue-600 text-lg">₹{(selectedExam?.price || 0) + 50}</span>
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
            </>
          )}

          {/* Info Footer */}
          <div className="mt-6 sm:mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
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
