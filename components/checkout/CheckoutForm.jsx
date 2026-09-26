'use client';

import { useState } from 'react';
import { ArrowUpRight, User, MapPin, Mail, Phone, Lock, Sparkles } from 'lucide-react';
import PaymentNoticeModal from '@components/checkout/PaymentNoticeModal';

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

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-8 text-[#161616]">
        
        {/* SECTION 01 — CONTACT INFORMATION */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/8 shadow-xs space-y-5">
          <div className="flex items-center gap-2 border-b border-black/8 pb-3">
            <Mail className="w-4 h-4 text-[#B8892D]" />
            <h2 className="font-serif text-xl font-light text-[#161616]">CONTACT INFORMATION</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-sans tracking-[0.14em] uppercase text-xs uppercase text-[#555555] font-semibold">
                EMAIL ADDRESS <span className="text-[#B8892D]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@domain.com"
                className={`w-full min-h-[44px] px-4 py-2.5 bg-[#F8F6F2]/70 border ${
                  errors.email ? 'border-red-500' : 'border-black/15 focus:border-[#B8892D]'
                } rounded-xl text-sm font-sans focus:outline-none focus:ring-1 focus:ring-[#B8892D] transition-colors`}
              />
              {errors.email && (
                <p className="text-[11px] font-sans tracking-[0.14em] uppercase text-xs text-red-600 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Mobile Number Field */}
            <div className="space-y-1.5">
              <label htmlFor="phone" className="block text-xs font-sans tracking-[0.14em] uppercase text-xs uppercase text-[#555555] font-semibold">
                MOBILE NUMBER (INDIA) <span className="text-[#B8892D]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-xs font-sans tracking-[0.14em] uppercase text-xs text-[#777777] font-semibold">
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
                  className={`w-full min-h-[44px] pl-12 pr-4 py-2.5 bg-[#F8F6F2]/70 border ${
                    errors.phone ? 'border-red-500' : 'border-black/15 focus:border-[#B8892D]'
                  } rounded-xl text-sm font-sans focus:outline-none focus:ring-1 focus:ring-[#B8892D] transition-colors`}
                />
              </div>
              {errors.phone && (
                <p className="text-[11px] font-sans tracking-[0.14em] uppercase text-xs text-red-600 font-medium">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 02 — SHIPPING ADDRESS */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/8 shadow-xs space-y-5">
          <div className="flex items-center gap-2 border-b border-black/8 pb-3">
            <MapPin className="w-4 h-4 text-[#B8892D]" />
            <h2 className="font-serif text-xl font-light text-[#161616]">DELIVERY ADDRESS</h2>
          </div>

          <div className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-xs font-sans tracking-[0.14em] uppercase text-xs uppercase text-[#555555] font-semibold">
                FULL NAME <span className="text-[#B8892D]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="First and Last Name"
                className={`w-full min-h-[44px] px-4 py-2.5 bg-[#F8F6F2]/70 border ${
                  errors.name ? 'border-red-500' : 'border-black/15 focus:border-[#B8892D]'
                } rounded-xl text-sm font-sans focus:outline-none focus:ring-1 focus:ring-[#B8892D] transition-colors`}
              />
              {errors.name && (
                <p className="text-[11px] font-sans tracking-[0.14em] uppercase text-xs text-red-600 font-medium">{errors.name}</p>
              )}
            </div>

            {/* Address Line 1 */}
            <div className="space-y-1.5">
              <label htmlFor="address1" className="block text-xs font-sans tracking-[0.14em] uppercase text-xs uppercase text-[#555555] font-semibold">
                STREET ADDRESS / HOUSE NO / BUILDING <span className="text-[#B8892D]">*</span>
              </label>
              <input
                type="text"
                id="address1"
                name="address1"
                autoComplete="street-address"
                value={formData.address1}
                onChange={handleChange}
                placeholder="Flat / Suite / Building Name / Street"
                className={`w-full min-h-[44px] px-4 py-2.5 bg-[#F8F6F2]/70 border ${
                  errors.address1 ? 'border-red-500' : 'border-black/15 focus:border-[#B8892D]'
                } rounded-xl text-sm font-sans focus:outline-none focus:ring-1 focus:ring-[#B8892D] transition-colors`}
              />
              {errors.address1 && (
                <p className="text-[11px] font-sans tracking-[0.14em] uppercase text-xs text-red-600 font-medium">{errors.address1}</p>
              )}
            </div>

            {/* Address Line 2 (Optional) */}
            <div className="space-y-1.5">
              <label htmlFor="address2" className="block text-xs font-sans tracking-[0.14em] uppercase text-xs uppercase text-[#555555] font-semibold">
                APARTMENT, SUITE, LANDMARK (OPTIONAL)
              </label>
              <input
                type="text"
                id="address2"
                name="address2"
                autoComplete="address-line2"
                value={formData.address2}
                onChange={handleChange}
                placeholder="Landmark or Area info"
                className="w-full min-h-[44px] px-4 py-2.5 bg-[#F8F6F2]/70 border border-black/15 focus:border-[#B8892D] rounded-xl text-sm font-sans focus:outline-none focus:ring-1 focus:ring-[#B8892D] transition-colors"
              />
            </div>

            {/* City, State, PIN Code grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* City */}
              <div className="space-y-1.5">
                <label htmlFor="city" className="block text-xs font-sans tracking-[0.14em] uppercase text-xs uppercase text-[#555555] font-semibold">
                  CITY / DISTRICT <span className="text-[#B8892D]">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  autoComplete="address-level2"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Mumbai / Delhi / Bengaluru"
                  className={`w-full min-h-[44px] px-4 py-2.5 bg-[#F8F6F2]/70 border ${
                    errors.city ? 'border-red-500' : 'border-black/15 focus:border-[#B8892D]'
                  } rounded-xl text-sm font-sans focus:outline-none focus:ring-1 focus:ring-[#B8892D] transition-colors`}
                />
                {errors.city && (
                  <p className="text-[11px] font-sans tracking-[0.14em] uppercase text-xs text-red-600 font-medium">{errors.city}</p>
                )}
              </div>

              {/* State */}
              <div className="space-y-1.5">
                <label htmlFor="state" className="block text-xs font-sans tracking-[0.14em] uppercase text-xs uppercase text-[#555555] font-semibold">
                  STATE <span className="text-[#B8892D]">*</span>
                </label>
                <select
                  id="state"
                  name="state"
                  autoComplete="address-level1"
                  value={formData.state}
                  onChange={handleChange}
                  className={`w-full min-h-[44px] px-3 py-2.5 bg-[#F8F6F2]/70 border ${
                    errors.state ? 'border-red-500' : 'border-black/15 focus:border-[#B8892D]'
                  } rounded-xl text-sm font-sans focus:outline-none focus:ring-1 focus:ring-[#B8892D] transition-colors`}
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-[11px] font-sans tracking-[0.14em] uppercase text-xs text-red-600 font-medium">{errors.state}</p>
                )}
              </div>

              {/* PIN Code */}
              <div className="space-y-1.5">
                <label htmlFor="pinCode" className="block text-xs font-sans tracking-[0.14em] uppercase text-xs uppercase text-[#555555] font-semibold">
                  PIN CODE <span className="text-[#B8892D]">*</span>
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
                  className={`w-full min-h-[44px] px-4 py-2.5 bg-[#F8F6F2]/70 border ${
                    errors.pinCode ? 'border-red-500' : 'border-black/15 focus:border-[#B8892D]'
                  } rounded-xl text-sm font-sans focus:outline-none focus:ring-1 focus:ring-[#B8892D] transition-colors font-sans tracking-[0.14em] uppercase text-xs`}
                />
                {errors.pinCode && (
                  <p className="text-[11px] font-sans tracking-[0.14em] uppercase text-xs text-red-600 font-medium">{errors.pinCode}</p>
                )}
              </div>
            </div>

            {/* Country */}
            <div className="space-y-1.5 pt-1">
              <label htmlFor="country" className="block text-xs font-sans tracking-[0.14em] uppercase text-xs uppercase text-[#555555] font-semibold">
                COUNTRY / REGION
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value="India"
                disabled
                className="w-full min-h-[44px] px-4 py-2.5 bg-black/5 border border-black/10 rounded-xl text-sm font-sans text-[#777777] cursor-not-allowed font-medium"
              />
            </div>
          </div>
        </div>

        {/* Submit Primary CTA */}
        <div className="pt-2">
          <button
            type="submit"
            className="btn-primary-gold w-full min-h-[50px] text-xs font-sans tracking-[0.16em]"
          >
            <span>CONTINUE TO PAYMENT</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <div className="flex items-center justify-center gap-2 text-[11px] font-sans text-[#777777] uppercase mt-3">
            <Lock className="w-3.5 h-3.5 text-[#2E7D32]" />
            <span>SECURE CHECKOUT • VERIFIED ENCRYPTION</span>
          </div>
        </div>

      </form>

      {/* Payment Notice Modal */}
      <PaymentNoticeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        items={items}
        subtotal={subtotal}
      />
    </>
  );
}
