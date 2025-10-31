import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Home, Download, Share2, Calendar, Clock, Users, MapPin } from 'lucide-react';
import { useExperience } from '../context/ExperienceContext';

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { booking, dispatch } = useExperience();

  useEffect(() => {
    // Clear the selection when returning to home
    const handleBackToHome = () => {
      dispatch({ type: 'CLEAR_SELECTION' });
    };

    // Add cleanup when component unmounts
    return () => {
      // Optionally clear selection after a delay
      setTimeout(() => {
        dispatch({ type: 'CLEAR_SELECTION' });
      }, 30000); // Clear after 30 seconds
    };
  }, [dispatch]);

  const handleBackToHome = () => {
    dispatch({ type: 'CLEAR_SELECTION' });
    navigate('/');
  };

  // Get booking data from location state or context
  const bookingData = location.state?.booking || booking;

  if (!bookingData) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="text-red-600 text-lg font-medium mb-4">
            No booking found
          </div>
          <p className="text-gray-600 mb-6">
            It seems there was an issue with your booking. Please try again.
          </p>
          <button
            onClick={handleBackToHome}
            className="btn-primary"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-full p-6 shadow-lg">
            <CheckCircle className="h-20 w-20 text-green-600" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Booking Confirmed! 🎉
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your adventure awaits! We've sent you a confirmation email.
        </p>

        {/* Reference ID */}
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6 mb-8 max-w-md mx-auto border border-primary-200">
          <p className="text-primary-700 font-medium mb-2">Booking Reference</p>
          <p className="text-3xl font-mono font-bold text-primary-900">
            {bookingData.referenceId}
          </p>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center justify-center">
            <Calendar className="h-6 w-6 mr-2 text-primary-600" />
            Booking Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Experience</p>
                  <p className="font-semibold text-gray-900">{bookingData.experienceTitle}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(bookingData.selectedDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-semibold text-gray-900">{bookingData.selectedTime}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Quantity</p>
                  <p className="font-semibold text-gray-900">{bookingData.quantity} person{bookingData.quantity > 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-6 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">Total Amount</span>
              <span className="text-3xl font-bold text-primary-600">₹{bookingData.total}</span>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8 max-w-2xl mx-auto border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Important Information</h3>
          <div className="space-y-3 text-left text-blue-800">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-3 mt-0.5 text-blue-600" />
              <p>A confirmation email has been sent to your registered email address.</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-3 mt-0.5 text-blue-600" />
              <p>Please arrive 15 minutes before your scheduled time with a valid ID.</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-3 mt-0.5 text-blue-600" />
              <p>Safety equipment and certified guides are included in your booking.</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-3 mt-0.5 text-blue-600" />
              <p>Contact us at support@highwaydelite.com for any questions.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleBackToHome}
            className="btn-primary flex items-center justify-center px-8 py-3 text-lg"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </button>
          
          <button
            onClick={() => window.print()}
            className="btn-secondary flex items-center justify-center px-8 py-3 text-lg"
          >
            <Download className="h-5 w-5 mr-2" />
            Print Confirmation
          </button>
          
          
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
