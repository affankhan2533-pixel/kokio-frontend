'use client';

import { ShieldCheck, Check, X, Lock, ArrowUpRight } from 'lucide-react';

export default function PaymentNoticeModal({ isOpen, onClose, formData, items, subtotal }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-[#F8F6F2] text-[#161616] w-full max-w-lg rounded-sm border border-black/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#161616] text-[#F8F6F2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#B8892D]" />
            <h3 className="font-serif text-lg tracking-[0.16em] font-light">SECURE CHECKOUT</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-[#888888] hover:text-white transition-colors cursor-pointer p-1"
            aria-label="Close Notice"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          
          {/* Status Banner */}
          <div className="bg-[#EFEAE2] border border-[#B8892D]/30 rounded-xs p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#B8892D] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-serif text-base font-medium text-[#161616]">
                Order Details Verified
              </h4>
              <p className="text-xs text-[#555555] font-sans leading-relaxed">
                Your delivery address and contact information have been validated. In production, this final step connects to your preferred payment method (UPI, Net Banking, or Credit/Debit Card).
              </p>
            </div>
          </div>

          {/* Customer & Address Summary */}
          <div className="bg-white rounded-xs p-4 border border-black/8 space-y-3 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-black/8 pb-2">
              <span className="text-[#777777] uppercase tracking-wider font-semibold">CUSTOMER</span>
              <span className="font-semibold text-[#161616]">{formData.name} ({formData.phone})</span>
            </div>
            <div className="flex items-center justify-between border-b border-black/8 pb-2">
              <span className="text-[#777777] uppercase tracking-wider font-semibold">EMAIL</span>
              <span className="font-semibold text-[#161616]">{formData.email}</span>
            </div>
            <div className="flex items-center justify-between border-b border-black/8 pb-2">
              <span className="text-[#777777] uppercase tracking-wider font-semibold">DESTINATION</span>
              <span className="font-semibold text-[#161616]">
                {formData.city}, {formData.state} - {formData.pinCode}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-black/8 pb-2">
              <span className="text-[#777777] uppercase tracking-wider font-semibold">PIECES</span>
              <span className="font-semibold text-[#161616]">
                {items.reduce((acc, curr) => acc + curr.quantity, 0)} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[#777777] uppercase tracking-wider font-bold">TOTAL PAYABLE</span>
              <span className="font-bold text-base text-[#161616]">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Security Assurance */}
          <div className="p-3 bg-[#E8F5E9] border border-[#C8E6C9] rounded-xs text-xs font-sans text-[#2E7D32] flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>Secure Checkout • Insured Delivery Across India</span>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 bg-[#EFEAE2]/60 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-transparent hover:bg-black/5 border border-black/20 text-[#161616] rounded-xs text-xs font-sans font-semibold tracking-wider uppercase cursor-pointer transition-colors"
          >
            EDIT DETAILS
          </button>
          <button
            onClick={onClose}
            className="btn-primary-gold w-full sm:w-auto"
          >
            <span>PROCEED TO PAYMENT</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
