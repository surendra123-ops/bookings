import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { useExperience } from '../context/ExperienceContext';
import { useNotification } from '../context/NotificationContext';
import LoadingSpinner from '../components/LoadingSpinner';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const {
    selectedExperience,
    selectedDate,
    selectedTime,
    quantity,
    promoCode,
    discount,
    loading,
    validatePromoCode,
    createBooking,
    calculateTotal,
    dispatch
  } = useExperience();
  const { showError, showSuccess, showWarning } = useNotification();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
  });
  const [promoCodeInput, setPromoCodeInput] = useState(promoCode);
  const [promoCodeError, setPromoCodeError] = useState('');
  const [promoCodeSuccess, setPromoCodeSuccess] = useState(false);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!selectedExperience || !selectedDate || !selectedTime) {
      navigate('/');
    }
  }, [selectedExperience, selectedDate, selectedTime, navigate]);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePromoCodeApply = async (code) => {
    // If called directly from onClick, React passes the event as first arg; ignore it
    if (code && typeof code === 'object' && 'preventDefault' in code) {
      code = undefined;
    }
    if (isApplyingPromo) return;
    setIsApplyingPromo(true);
    const input = (code ?? promoCodeInput).trim().toUpperCase();
    if (!input) {
      setPromoCodeError('Please enter a promo code');
      setIsApplyingPromo(false);
      return;
    }

    // Avoid re-applying the same successful code
    if (promoCodeSuccess && input === promoCode) {
      setIsApplyingPromo(false);
      return;
    }

    try {
      const result = await validatePromoCode(input, calculateTotal().subtotal);
      
      if (result.valid) {
        dispatch({ type: 'SET_PROMO_CODE', payload: input });
        dispatch({ type: 'SET_DISCOUNT', payload: result.discount });
        setPromoCodeError('');
        setPromoCodeSuccess(true);
      } else {
        setPromoCodeError(result.message);
        setPromoCodeSuccess(false);
        dispatch({ type: 'SET_PROMO_CODE', payload: '' });
        dispatch({ type: 'SET_DISCOUNT', payload: 0 });
      }
    } catch (error) {
      setPromoCodeError('Error validating promo code');
      setPromoCodeSuccess(false);
    } finally {
      setIsApplyingPromo(false);
    }
  };

  // Clear messages when user edits the code
  useEffect(() => {
    setPromoCodeError('');
    setPromoCodeSuccess(false);
  }, [promoCodeInput]);

  // Auto re-validate when quantity changes for an already applied code
  useEffect(() => {
    if (promoCode && promoCodeSuccess) {
      handlePromoCodeApply(promoCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, selectedExperience?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showError('Please fix the form errors before submitting');
      return;
    }
    
    if (!termsAccepted) {
      showWarning('Please accept the terms and safety policy');
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = {
        experienceId: selectedExperience._id,
        customerName: formData.fullName,
        customerEmail: formData.email,
        selectedDate,
        selectedTime,
        quantity,
        promoCode: promoCodeInput || undefined,
      };

      const result = await createBooking(bookingData);
      
      if (result.success) {
        navigate('/result');
      } else {
        showError(result.error || 'Failed to create booking');
      }
    } catch (error) {
      showError('An error occurred while creating the booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!selectedExperience) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="text-red-600 text-lg font-medium mb-4">
            No experience selected
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
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Back to Details</span>
        <span className="sm:hidden">Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Left Column - Form */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Checkout Details</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                    className={`input-field ${formErrors.fullName ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {formErrors.fullName && (
                    <p className="text-red-600 text-sm mt-1">{formErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email"
                    required
                    className={`input-field ${formErrors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {formErrors.email && (
                    <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>
              </div>

              {/* Promo Code */}
              <div>
                <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Promo code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="promoCode"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handlePromoCodeApply();
                      }
                    }}
                    placeholder="Enter promo code"
                    className="flex-1 input-field"
                  />
                  <button
                    type="button"
                    onClick={() => handlePromoCodeApply()}
                    disabled={isApplyingPromo}
                    className={`px-3 sm:px-4 py-2 rounded-lg transition-colors duration-200 text-white ${
                      isApplyingPromo ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-800'
                    }`}
                  >
                    {isApplyingPromo ? 'Applying…' : 'Apply'}
                  </button>
                </div>
                {/* Suggested promo codes */}
                <div className="mt-2 text-xs text-gray-500">
                  Try one of these codes:
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {[
                      { code: 'SAVE10', label: 'SAVE10 - 10% off' },
                      { code: 'FLAT50', label: 'FLAT50 - ₹50 off' },
                      { code: 'NEWUSER', label: 'NEWUSER - 15% off' },
                    ].map((p) => (
                      <button
                        key={p.code}
                        type="button"
                        onClick={async () => {
                          setPromoCodeInput(p.code);
                          await handlePromoCodeApply(p.code);
                        }}
                        className="px-2.5 py-1 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
                {promoCodeError && (
                  <p className="text-red-600 text-sm mt-1">{promoCodeError}</p>
                )}
                {promoCodeSuccess && (
                  <p className="text-green-600 text-sm mt-1 flex items-center">
                    <Check className="h-4 w-4 mr-1" />
                    Promo code applied successfully!
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 h-4 w-4 text-primary-400 focus:ring-primary-400 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the terms and safety policy
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !termsAccepted}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                  isSubmitting || !termsAccepted
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-primary-400 hover:bg-primary-500 text-white'
                }`}
              >
                {isSubmitting ? 'Processing...' : 'Pay and Confirm'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column - Booking Summary */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 sm:p-6 lg:sticky lg:top-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Booking Summary</h2>
            
            {/* Experience Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Experience</span>
                <span className="font-medium">{selectedExperience.title}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-medium">
                  {new Date(selectedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Time</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Qty</span>
                <span className="font-medium">{quantity}</span>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{pricing.subtotal}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes</span>
                <span className="font-medium">₹{pricing.taxes}</span>
              </div>
              
              {pricing.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-medium">-₹{pricing.discount}</span>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="border-t border-gray-300 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{pricing.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
