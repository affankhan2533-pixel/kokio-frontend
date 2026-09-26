'use client';

import { useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Compass } from 'lucide-react';
import { useJourneyStore } from '@store/useJourneyStore';
import JourneyStep from '@components/journey/JourneyStep';
import JourneyResults from '@components/journey/JourneyResults';

export default function JourneyFinder() {
  const {
    isOpen,
    step,
    answers,
    setAnswer,
    nextStep,
    prevStep,
    resetJourney,
    closeJourney,
  } = useJourneyStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeJourney();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeJourney]);

  if (!isOpen) return null;

  const currentField = ['purpose', 'duration', 'destination', 'preference'][step - 1];
  const isCurrentStepAnswered = Boolean(answers[currentField]);

  const handleSelectOption = (field, value) => {
    setAnswer(field, value);
    // Auto-advance after smooth feedback delay
    setTimeout(() => {
      nextStep();
    }, 240);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-[#F8F6F2] text-[#161616] w-full max-w-4xl rounded-sm border border-black/10 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] selection:bg-[#B8892D]/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-black/10 flex items-center justify-between bg-[#F8F6F2] shrink-0">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#B8892D]" />
            <span className="font-serif text-lg tracking-[0.16em] font-light text-[#161616]">
              KOKIO JOURNEY FINDER
            </span>
          </div>

          <div className="flex items-center gap-4">
            {step <= 4 && (
              <span className="text-xs font-sans font-medium text-[#777777] hidden sm:inline">
                0{step} / 04
              </span>
            )}
            <button
              onClick={closeJourney}
              className="p-2 -mr-2 text-[#777777] hover:text-[#161616] transition-colors rounded-full cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close Journey Finder"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Thin Gold Progress Line */}
        {step <= 4 && (
          <div className="w-full bg-black/5 h-1">
            <div
              className="bg-[#B8892D] h-full transition-all duration-300 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto no-scrollbar flex items-center justify-center">
          {step <= 4 ? (
            <JourneyStep
              step={step}
              answers={answers}
              onSelect={handleSelectOption}
            />
          ) : (
            <JourneyResults
              answers={answers}
              onRestart={resetJourney}
              onClose={closeJourney}
            />
          )}
        </div>

        {/* Bottom Navigation Controls (for steps 1-4) */}
        {step <= 4 && (
          <div className="px-6 py-4 border-t border-black/10 bg-white/60 flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="btn-secondary-luxury min-h-[44px]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>BACK</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isCurrentStepAnswered}
                  className={`btn-primary-luxury min-h-[44px] ${
                    isCurrentStepAnswered
                      ? ''
                      : 'opacity-40 cursor-not-allowed hover:bg-[#161616] hover:text-[#F8F6F2] hover:border-[#161616]'
                  }`}
                >
                  <span>NEXT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isCurrentStepAnswered}
                  className={`btn-primary-gold min-h-[44px] ${
                    isCurrentStepAnswered
                      ? ''
                      : 'opacity-40 cursor-not-allowed hover:bg-[#B8892D] hover:text-[#111111] hover:border-[#B8892D]'
                  }`}
                >
                  <span>VIEW YOUR EDIT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
