'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';
import PaymentNoticeModal from '@components/checkout/PaymentNoticeModal';
import OrderSummary from '@components/checkout/OrderSummary';

const INDIAN_STATES = [
  'Maharashtra',
  'Delhi NCR',
  'Karnataka',
  'Tamil Nadu',
  'Telangana',
  'Gujarat',
  'West Bengal',
  'Haryana',
  'Punjab',
  'Rajasthan',
  'Kerala',
  'Uttar Pradesh',
  'Goa',
  'Madhya Pradesh',
  'Other / All India',
];

export default function CheckoutForm({ items, subtotal }) {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: 'Maharashtra',
    pinCode: '',
    country: 'India',
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Phone validation (Indian 10-digit)
    const cleanPhone = formData.phone.replace(/[\s\-\+\(\)]/g, '');
    const phoneRegex = /^(?:(?:\+|00)91|0)?[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your mobile number.';
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number.';
    }

    // Full name validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name.';
    }

    // Address 1 validation
    if (!formData.address1.trim()) {
      newErrors.address1 = 'Please enter your delivery address.';
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'Please enter your city.';
    }

    // State validation
    if (!formData.state.trim()) {
      newErrors.state = 'Please select or enter your state.';
    }

    // PIN code validation (6 digits)
    const pinRegex = /^\d{6}$/;
    if (!formData.pinCode.trim()) {
      newErrors.pinCode = 'Please enter your 6-digit PIN code.';
    } else if (!pinRegex.test(formData.pinCode.trim())) {
      newErrors.pinCode = 'Please enter a valid 6-digit PIN code.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsModalOpen(true);
    }
  };

  const inputBaseStyle =
    'w-full min-h-[44px] px-3.5 py-2.5 bg-white border rounded-xs text-sm font-sans focus:outline-none transition-colors';

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-10 text-[#161616]">
        
        {/* 01 — CUSTOMER INFORMATION */}
        <div className="space-y-5">
          <h2 className="font-serif text-lg sm:text-xl font-light text-[#161616] border-b border-[#EAEAEA] pb-3">
            CUSTOMER INFORMATION
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-[11px] font-sans tracking-[0.1em] text-[#555555] uppercase font-medium">
                Email Address <span className="text-[#B8892D]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@domain.com"
                className={`${inputBaseStyle} ${
                  errors.email
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-[#EAEAEA] focus:border-[#161616]'
                }`}
              />
              {errors.email && (
                <p className="text-[11px] font-sans text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Mobile Number Field */}
            <div className="space-y-1.5">
              <label htmlFor="phone" className="block text-[11px] font-sans tracking-[0.1em] text-[#555555] uppercase font-medium">
                Mobile Number <span className="text-[#B8892D]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-xs font-sans text-[#777777] font-medium">
                  +91
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="98765 43210"
                  className={`w-full min-h-[44px] pl-11 pr-3.5 py-2.5 bg-white border rounded-xs text-sm font-sans focus:outline-none transition-colors ${
                    errors.phone
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[#EAEAEA] focus:border-[#161616]'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-[11px] font-sans text-red-600">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* 02 — SHIPPING ADDRESS */}
        <div className="space-y-5">
          <h2 className="font-serif text-lg sm:text-xl font-light text-[#161616] border-b border-[#EAEAEA] pb-3">
            SHIPPING ADDRESS
          </h2>

          <div className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-[11px] font-sans tracking-[0.1em] text-[#555555] uppercase font-medium">
                Full Name <span className="text-[#B8892D]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className={`${inputBaseStyle} ${
                  errors.name
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-[#EAEAEA] focus:border-[#161616]'
                }`}
              />
              {errors.name && (
                <p className="text-[11px] font-sans text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Address Line 1 */}
            <div className="space-y-1.5">
              <label htmlFor="address1" className="block text-[11px] font-sans tracking-[0.1em] text-[#555555] uppercase font-medium">
                Street Address <span className="text-[#B8892D]">*</span>
              </label>
              <input
                type="text"
                id="address1"
                name="address1"
                autoComplete="street-address"
                value={formData.address1}
                onChange={handleChange}
                placeholder="House / Flat / Street Name"
                className={`${inputBaseStyle} ${
                  errors.address1
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-[#EAEAEA] focus:border-[#161616]'
                }`}
              />
              {errors.address1 && (
                <p className="text-[11px] font-sans text-red-600">{errors.address1}</p>
              )}
            </div>

            {/* Address Line 2 (Optional) */}
            <div className="space-y-1.5">
              <label htmlFor="address2" className="block text-[11px] font-sans tracking-[0.1em] text-[#555555] uppercase font-medium">
                Apartment, Suite, Landmark (Optional)
              </label>
              <input
                type="text"
                id="address2"
                name="address2"
                autoComplete="address-line2"
                value={formData.address2}
                onChange={handleChange}
                placeholder="Apartment, suite, unit, etc."
                className={`${inputBaseStyle} border-[#EAEAEA] focus:border-[#161616]`}
              />
            </div>

            {/* City, State, PIN Code grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* City */}
              <div className="space-y-1.5">
                <label htmlFor="city" className="block text-[11px] font-sans tracking-[0.1em] text-[#555555] uppercase font-medium">
                  City <span className="text-[#B8892D]">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  autoComplete="address-level2"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className={`${inputBaseStyle} ${
                    errors.city
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[#EAEAEA] focus:border-[#161616]'
                  }`}
                />
                {errors.city && (
                  <p className="text-[11px] font-sans text-red-600">{errors.city}</p>
                )}
              </div>

              {/* State */}
              <div className="space-y-1.5">
                <label htmlFor="state" className="block text-[11px] font-sans tracking-[0.1em] text-[#555555] uppercase font-medium">
                  State <span className="text-[#B8892D]">*</span>
                </label>
                <select
                  id="state"
                  name="state"
                  autoComplete="address-level1"
                  value={formData.state}
                  onChange={handleChange}
                  className={`w-full min-h-[44px] px-3 py-2.5 bg-white border rounded-xs text-sm font-sans focus:outline-none transition-colors ${
                    errors.state
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[#EAEAEA] focus:border-[#161616]'
                  }`}
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-[11px] font-sans text-red-600">{errors.state}</p>
                )}
              </div>

              {/* PIN Code */}
              <div className="space-y-1.5">
                <label htmlFor="pinCode" className="block text-[11px] font-sans tracking-[0.1em] text-[#555555] uppercase font-medium">
                  PIN Code <span className="text-[#B8892D]">*</span>
                </label>
                <input
                  type="text"
                  id="pinCode"
                  name="pinCode"
                  autoComplete="postal-code"
                  maxLength={6}
                  value={formData.pinCode}
                  onChange={handleChange}
                  placeholder="400001"
                  className={`${inputBaseStyle} ${
                    errors.pinCode
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[#EAEAEA] focus:border-[#161616]'
                  }`}
                />
                {errors.pinCode && (
                  <p className="text-[11px] font-sans text-red-600">{errors.pinCode}</p>
                )}
              </div>
            </div>

            {/* Country */}
            <div className="space-y-1.5 pt-1">
              <label htmlFor="country" className="block text-[11px] font-sans tracking-[0.1em] text-[#555555] uppercase font-medium">
                Country / Region
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value="India"
                disabled
                className="w-full min-h-[44px] px-3.5 py-2.5 bg-[#F9F9F9] border border-[#EAEAEA] rounded-xs text-sm font-sans text-[#777777] cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* 03 — MOBILE ORDER SUMMARY (Injected between Shipping & CTA for Mobile Checkout Order: Customer -> Shipping -> Order Summary -> Continue to Payment) */}
        <div className="lg:hidden">
          <OrderSummary isMobile />
        </div>

        {/* 04 — CONTINUE TO PAYMENT CTA */}
        <div className="pt-2 space-y-3">
          <button
            type="submit"
            className="w-full min-h-[48px] px-6 py-3.5 bg-[#161616] hover:bg-[#B8892D] text-[#F8F6F2] hover:text-[#111111] rounded-xs text-xs font-sans font-medium tracking-[0.14em] uppercase transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer group"
          >
            <span>CONTINUE TO PAYMENT</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
          </button>
          
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-sans text-[#777777] uppercase">
            <Lock className="w-3.5 h-3.5 stroke-[1.5] text-[#161616]" />
            <span className="font-medium tracking-wide">SECURE CHECKOUT</span>
          </div>
        </div>

      </form>

      {/* Payment Notice Modal */}
      <PaymentNoticeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
