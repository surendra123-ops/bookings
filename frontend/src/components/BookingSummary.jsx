import React from 'react';
import { Minus, Plus, Calendar, Clock, Users, CheckCircle } from 'lucide-react';

const BookingSummary = ({
  experience,
  selectedDate,
  selectedTime,
  quantity,
  pricing,
  onQuantityChange,
  onProceedToCheckout
}) => {
  if (!experience) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 sticky top-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
        Booking Summary
      </h2>
      
      {/* Experience Details */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Price per person</span>
          <span className="font-bold text-lg">₹{experience.price}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Quantity</span>
          <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-2">
            <button
              onClick={() => onQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {selectedDate && (
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
        )}
        
        {selectedTime && (
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="h-4 w-4 mr-2" />
            <span>{selectedTime}</span>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">₹{pricing.subtotal}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Taxes (5%)</span>
          <span className="font-medium">₹{pricing.taxes}</span>
        </div>
        
        {pricing.discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span className="font-medium">-₹{pricing.discount}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span className="text-primary-600">₹{pricing.total}</span>
        </div>
      </div>

      {/* Proceed Button */}
      <button
        onClick={onProceedToCheckout}
        disabled={!selectedDate || !selectedTime}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
          !selectedDate || !selectedTime
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-primary-400 hover:bg-primary-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
        }`}
      >
        {!selectedDate || !selectedTime ? 'Select Date & Time' : 'Proceed to Checkout'}
      </button>
      
      {/* Safety Note */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700">
          <CheckCircle className="h-3 w-3 inline mr-1" />
          Safety equipment and certified guides included
        </p>
      </div>
    </div>
  );
};

export default BookingSummary;
