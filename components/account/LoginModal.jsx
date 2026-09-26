'use client';

import { useState } from 'react';
import { X, Lock, ArrowUpRight, ShieldCheck, Sparkles, Check } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-[#F8F6F2] text-[#161616] w-full max-w-md rounded-xs border border-black/10 shadow-2xl overflow-hidden flex flex-col selection:bg-[#B8892D]/30"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Bar */}
        <div className="px-6 py-5 bg-[#161616] text-[#F8F6F2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#B8892D]" />
            <h3 className="font-serif text-lg tracking-wide font-light">
              {isSignUp ? 'CREATE YOUR KOKIO ACCOUNT' : 'SIGN IN TO KOKIO'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-[#888888] hover:text-white transition-colors cursor-pointer p-1"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {submitted ? (
            /* Visual Placeholder Notice */
            <div className="space-y-4 py-4 text-center">
              <div className="w-12 h-12 bg-[#EFEAE2] rounded-full flex items-center justify-center mx-auto text-[#B8892D]">
                <Sparkles className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-xl font-light text-[#161616]">
                  UI AUTHENTICATION NOTICE
                </h4>
                <p className="text-xs text-[#666666] leading-relaxed max-w-xs mx-auto">
                  Authentication is prepared for client backend API integration. No credentials were sent or stored.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xs border border-black/8 text-[11px] font-sans tracking-[0.14em] uppercase text-[#555555] text-left space-y-1">
                <div><span className="text-[#888888]">TARGET EMAIL:</span> {email || 'guest@kokio.com'}</div>
                <div><span className="text-[#888888]">MODE:</span> {isSignUp ? 'Account Creation' : 'Sign In'}</div>
                <div><span className="text-[#888888]">STATUS:</span> Ready for backend endpoint</div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    handleReset();
                    onClose();
                  }}
                  className="w-full min-h-[44px] px-6 py-2.5 bg-[#161616] text-[#F8F6F2] hover:bg-[#333333] rounded-xs text-xs font-sans tracking-[0.14em] font-semibold uppercase transition-colors cursor-pointer"
                >
                  RETURN TO ACCOUNT VIEW
                </button>
              </div>
            </div>
          ) : (
            /* Login Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-[#666666] font-light">
                  {isSignUp
                    ? 'Join the House of KOKIO for client advisory services and journey records.'
                    : 'Access your saved pieces, order history, and client advisory support.'}
                </p>
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label htmlFor="login-email" className="block text-[11px] font-sans tracking-[0.14em] uppercase text-[#555555] font-semibold">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  id="login-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full min-h-[44px] px-4 py-2.5 bg-white border border-black/15 focus:border-[#B8892D] rounded-xs text-sm font-sans focus:outline-none focus:ring-1 focus:ring-[#B8892D] transition-colors"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="login-password" className="block text-[11px] font-sans tracking-[0.14em] uppercase text-[#555555] font-semibold">
                    PASSWORD
                  </label>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() => alert('Password recovery is ready for backend integration.')}
                      className="text-[11px] font-sans tracking-[0.14em] uppercase text-[#888888] hover:text-[#B8892D] transition-colors cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  id="login-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full min-h-[44px] px-4 py-2.5 bg-white border border-black/15 focus:border-[#B8892D] rounded-xs text-sm font-sans focus:outline-none focus:ring-1 focus:ring-[#B8892D] transition-colors"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  className="w-full min-h-[44px] px-6 py-2.5 bg-[#B8892D] hover:bg-[#161616] hover:text-[#F8F6F2] text-[#111111] rounded-xs text-xs font-sans font-semibold tracking-[0.16em] uppercase transition-all duration-300 shadow-none flex items-center justify-center gap-2 cursor-pointer border border-[#B8892D]"
                >
                  <span>{isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="w-full min-h-[44px] px-4 py-2 bg-transparent hover:bg-black/5 text-[#161616] border border-black/15 rounded-xs text-xs font-sans font-semibold tracking-[0.14em] uppercase transition-colors cursor-pointer"
                >
                  {isSignUp ? 'ALREADY HAVE AN ACCOUNT? SIGN IN →' : 'NEW TO KOKIO? CREATE ACCOUNT →'}
                </button>
              </div>

              {/* Security info */}
              <div className="pt-2 flex items-center justify-center gap-2 text-[10px] font-sans tracking-[0.14em] text-[#777777] uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B8892D]" />
                <span>256-Bit SSL Encrypted Access</span>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
