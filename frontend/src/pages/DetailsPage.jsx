import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Users, MapPin } from 'lucide-react';
import { useExperience } from '../context/ExperienceContext';
import { useNotification } from '../context/NotificationContext';
import LoadingSpinner from '../components/LoadingSpinner';
import SkeletonLoader from '../components/SkeletonLoader';
import BookingSummary from '../components/BookingSummary';

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    selectedExperience,
    selectedDate,
    selectedTime,
    quantity,
    loading,
    error,
    fetchExperienceDetails,
    dispatch,
    calculateTotal
  } = useExperience();
  const { showError, showWarning } = useNotification();

  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDateSlots, setSelectedDateSlots] = useState([]);

  useEffect(() => {
    if (id && id !== 'undefined') {
      fetchExperienceDetails(id);
    }
  }, [id, fetchExperienceDetails]);

  useEffect(() => {
    if (selectedExperience) {
      setAvailableDates(selectedExperience.availableDates || []);
    }
  }, [selectedExperience]);

  useEffect(() => {
    if (selectedDate && availableDates.length > 0) {
      const dateData = availableDates.find(d => d.date === selectedDate);
      setSelectedDateSlots(dateData?.timeSlots || []);
    }
  }, [selectedDate, availableDates]);

  const handleDateSelect = (date) => {
    dispatch({ type: 'SET_SELECTED_DATE', payload: date });
    dispatch({ type: 'SET_SELECTED_TIME', payload: '' });
  };

  const handleTimeSelect = (time) => {
    dispatch({ type: 'SET_SELECTED_TIME', payload: time });
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      dispatch({ type: 'SET_QUANTITY', payload: newQuantity });
    }
  };

  const handleProceedToCheckout = () => {
    if (!selectedDate || !selectedTime) {
      showWarning('Please select both date and time before proceeding');
      return;
    }
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SkeletonLoader type="details" count={1} />
          </div>
          <div className="lg:col-span-1">
            <SkeletonLoader type="booking-summary" count={1} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !selectedExperience) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="text-red-600 text-lg font-medium mb-4">
            {error || 'Experience not found'}
          </div>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const pricing = calculateTotal();

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Back to Experiences</span>
        <span className="sm:hidden">Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Left Column - Experience Details */}
        <div className="lg:col-span-2">
          {/* Experience Image */}
          <div className="mb-4 sm:mb-6">
            <img
              src={selectedExperience.image}
              alt={selectedExperience.title}
              className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Experience Info */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {selectedExperience.title}
            </h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm sm:text-base">{selectedExperience.location}</span>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {selectedExperience.description}
            </p>
          </div>

          {/* Date Selection */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Choose date</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
              {availableDates.map((dateData) => (
                <button
                  key={dateData.date}
                  onClick={() => handleDateSelect(dateData.date)}
                  className={`px-3 py-2 sm:px-4 rounded-lg border transition-all duration-200 text-sm ${
                    selectedDate === dateData.date
                      ? 'bg-primary-400 text-white border-primary-400 shadow-md'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:shadow-sm'
                  }`}
                >
                  {new Date(dateData.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Choose time</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                {selectedDateSlots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => slot.availableSlots > 0 && handleTimeSelect(slot.time)}
                    disabled={slot.availableSlots === 0}
                    className={`px-3 py-3 sm:px-4 rounded-lg border text-center transition-all duration-200 ${
                      slot.availableSlots === 0
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        : selectedTime === slot.time
                        ? 'bg-primary-400 text-white border-primary-400 shadow-md'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:shadow-sm'
                    }`}
                  >
                    <div className="font-medium text-sm sm:text-base">{slot.time}</div>
                    <div className="text-xs mt-1">
                      {slot.availableSlots === 0 ? (
                        <span className="text-gray-400">Sold out</span>
                      ) : (
                        <span className="text-gray-500">{slot.availableSlots} left</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                All times are in IST (GMT +5:30)
              </p>
            </div>
          )}

          {/* About Section */}
          {selectedExperience.about && (
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {selectedExperience.about}
              </p>
            </div>
          )}
        </div>

        {/* Right Column - Booking Summary */}
        <div className="lg:col-span-1 order-first lg:order-last">
          <BookingSummary
            experience={selectedExperience}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            quantity={quantity}
            pricing={pricing}
            onQuantityChange={handleQuantityChange}
            onProceedToCheckout={handleProceedToCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
