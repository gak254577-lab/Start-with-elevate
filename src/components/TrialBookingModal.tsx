import React, { useState } from 'react';
import { useTrainer } from '../context/TrainerContext';
import {
  X,
  Calendar,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { TrialBookingRequest, TrialPass } from '../types';
import { TrialPassTicket } from './TrialPassTicket';
import { WaveFitnessLogo } from './WaveFitnessLogo';

export const TrialBookingModal: React.FC = () => {
  const {
    isTrialModalOpen,
    closeTrialModal,
    profile,
    saveTrialPass,
    selectedPlanForTrial,
    pricingPlans,
    services,
    currentThemeConfig
  } = useTrainer();

  const selectedPlan = pricingPlans.find((p) => p.id === selectedPlanForTrial);
  const selectedService = services.find((s) => s.id === selectedPlanForTrial);

  const [formData, setFormData] = useState<TrialBookingRequest>({
    fullName: '',
    email: '',
    phone: '',
    fitnessGoal: selectedService ? selectedService.title : 'Fat Loss & Body Recomposition',
    experienceLevel: 'Beginner (0-1 years)',
    preferredDate: '',
    preferredTimeSlot: 'Morning (8:00 AM - 11:30 AM)',
    notes: selectedPlan ? `Interested in ${selectedPlan.name}` : '',
  });

  const [submittedPass, setSubmittedPass] = useState<TrialPass | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isTrialModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Please enter your phone number.');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Please enter your email.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newPass: TrialPass = {
        passId: `APX-${Math.floor(100000 + Math.random() * 900000)}`,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        fitnessGoal: formData.fitnessGoal,
        date: formData.preferredDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
        timeSlot: formData.preferredTimeSlot,
        gymName: profile.gymName,
        trainerName: profile.name,
        address: `${profile.address}, ${profile.city}`,
        createdAt: new Date().toISOString(),
      };

      saveTrialPass(newPass);
      setSubmittedPass(newPass);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-stone-900 border border-stone-800 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden my-0 sm:my-8 animate-in fade-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200">
        
        {/* Mobile Pull Handle */}
        <div className="w-12 h-1 bg-stone-700 rounded-full mx-auto mt-2.5 mb-1 sm:hidden"></div>

        {/* Header */}
        <div className="p-4 sm:p-6 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black border border-stone-800 flex items-center justify-center p-0.5 shadow-md">
              <WaveFitnessLogo
                variant="full"
                size={36}
              />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-stone-100 leading-tight">
                {selectedPlan ? `Pass for ${selectedPlan.name}` : 'Free 60-Min Trial Session'}
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-400">
                {profile.name} • {profile.gymName}
              </p>
            </div>
          </div>
          <button
            onClick={closeTrialModal}
            className="p-2 rounded-lg bg-stone-900 text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 max-h-[82vh] overflow-y-auto">

          {submittedPass ? (
            <div className="space-y-4">
              <TrialPassTicket
                pass={submittedPass}
                onClose={() => {
                  setSubmittedPass(null);
                  closeTrialModal();
                }}
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-950/70 border border-red-800 text-red-300 text-xs">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    Your Name <span style={{ color: currentThemeConfig.primaryHex }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder=""
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600 shadow-inner"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    Phone / WhatsApp <span style={{ color: currentThemeConfig.primaryHex }}>*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder=""
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600 shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  Email Address <span style={{ color: currentThemeConfig.primaryHex }}>*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder=""
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600 shadow-inner"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    Fitness Objective
                  </label>
                  <select
                    value={formData.fitnessGoal}
                    onChange={(e) => setFormData({ ...formData, fitnessGoal: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600 shadow-inner"
                  >
                    <option value="Fat Loss & Body Recomposition">Fat Loss & Body Recomp</option>
                    <option value="Hypertrophy & Muscle Growth">Muscle Growth</option>
                    <option value="Strength & Powerlifting">Strength & Powerlifting</option>
                    <option value="Posture & Sciatica Relief">Posture & Pain Relief</option>
                    <option value="Athletic Conditioning">Athletic Conditioning</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.preferredTimeSlot}
                    onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600 shadow-inner"
                  >
                    <option value="Early Morning (5:30 AM - 8:00 AM)">Early Morning (5:30 - 8:00 AM)</option>
                    <option value="Morning (8:00 AM - 11:30 AM)">Morning (8:00 - 11:30 AM)</option>
                    <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 - 4:00 PM)</option>
                    <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 - 8:00 PM)</option>
                    <option value="Night (8:00 PM - 9:30 PM)">Night (8:00 - 9:30 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600 shadow-inner"
                />
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50 ${currentThemeConfig.buttonClass}`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isSubmitting ? 'Generating Your VIP Pass...' : 'Confirm Free Trial Session'}</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
                <p className="text-[11px] text-center text-emerald-400 font-medium">
                  ⚡ Instant WhatsApp notification will be generated for Coach {profile.name}
                </p>
              </div>

              <div className="text-center pt-1">
                <span className="text-[11px] text-stone-500 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  100% Free • No cancellation fees • Direct 1-on-1 with {profile.name}
                </span>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
