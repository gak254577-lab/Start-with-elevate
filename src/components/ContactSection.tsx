import React, { useState } from 'react';
import { useTrainer } from '../context/TrainerContext';
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  Send,
  Calendar,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Dumbbell
} from 'lucide-react';
import { TrialBookingRequest, TrialPass } from '../types';
import { TrialPassTicket } from './TrialPassTicket';

export const ContactSection: React.FC = () => {
  const { profile, saveTrialPass, currentThemeConfig } = useTrainer();

  const [formData, setFormData] = useState<TrialBookingRequest>({
    fullName: '',
    email: '',
    phone: '',
    fitnessGoal: 'Fat Loss & Body Recomposition',
    experienceLevel: 'Beginner (0-1 years)',
    preferredDate: '',
    preferredTimeSlot: 'Morning (6:00 AM - 9:00 AM)',
    notes: '',
  });

  const [submittedPass, setSubmittedPass] = useState<TrialPass | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Please enter your phone number so we can confirm your slot.');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Please enter your email address.');
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
    }, 600);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-stone-950 border-b border-stone-800/80 relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border"
            style={{
              backgroundColor: `${currentThemeConfig.primaryHex}15`,
              borderColor: `${currentThemeConfig.primaryHex}40`,
              color: currentThemeConfig.primaryHex
            }}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Direct Booking</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-100 tracking-tight">
            Book Your Free 60-Min Trial Session
          </h2>
          <p className="text-stone-400 text-base sm:text-lg">
            Experience coaching with {profile.name}, evaluate your form, and get a customized transformation plan. No cost, no obligation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info, Hours, & Google Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Box */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-5 shadow-xl">
              <h3 className="text-lg font-black text-stone-100 flex items-center gap-2">
                <span>Direct Contact Channels</span>
              </h3>

              {/* Click to Call */}
              <a
                href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`}
                className="p-4 rounded-xl bg-stone-950 border border-stone-800 hover:border-stone-600 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2.5 rounded-lg border transition-colors"
                    style={{
                      backgroundColor: `${currentThemeConfig.primaryHex}15`,
                      borderColor: `${currentThemeConfig.primaryHex}35`,
                      color: currentThemeConfig.primaryHex
                    }}
                  >
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-400 block">Click to Call Directly</span>
                    <span className="text-stone-100 font-bold text-sm">{profile.formattedPhone}</span>
                  </div>
                </div>
                <span
                  className="text-xs font-black px-3 py-1.5 rounded-lg border transition-all"
                  style={{
                    backgroundColor: `${currentThemeConfig.primaryHex}20`,
                    borderColor: `${currentThemeConfig.primaryHex}40`,
                    color: currentThemeConfig.primaryHex
                  }}
                >
                  Call Now
                </span>
              </a>

              {/* WhatsApp Direct */}
              <a
                href={`https://wa.me/${profile.whatsappNumber}?text=Hi%20${encodeURIComponent(
                  profile.name
                )},%20I'd%20like%20to%20schedule%20a%20free%20trial%20session.`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 hover:border-emerald-500/60 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-400 block font-medium">WhatsApp Direct Chat</span>
                    <span className="text-stone-100 font-bold text-sm">Instant Response (Within 15 mins)</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-300 bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-800/60 group-hover:bg-emerald-500 group-hover:text-stone-950 transition-colors">
                  Chat
                </span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${profile.email}`}
                className="p-4 rounded-xl bg-stone-950 border border-stone-800 hover:border-stone-700 transition-colors flex items-center gap-3"
              >
                <div className="p-2.5 rounded-lg bg-stone-900 text-stone-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs text-stone-400 block">Email Inquiries</span>
                  <span className="text-stone-200 font-medium text-sm truncate block">{profile.email}</span>
                </div>
              </a>

              {/* Location address */}
              <a
                href={profile.googleMapDirectionsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${profile.gymName} ${profile.address} ${profile.city}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-stone-950 border border-stone-800 hover:border-stone-700 transition-all flex items-start gap-3 group"
              >
                <div
                  className="p-2.5 rounded-lg shrink-0 group-hover:scale-105 transition-transform"
                  style={{
                    backgroundColor: `${currentThemeConfig.primaryHex}15`,
                    color: currentThemeConfig.primaryHex
                  }}
                >
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400 block">Studio & Gym Location</span>
                    <span className="text-[11px] font-bold text-yellow-400 opacity-80 group-hover:opacity-100 flex items-center gap-0.5">
                      Directions <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                  <span className="text-stone-200 font-bold text-sm block mt-0.5">{profile.gymName}</span>
                  <span className="text-stone-400 text-xs leading-relaxed block mt-0.5">
                    {profile.address}, {profile.city}
                  </span>
                </div>
              </a>
            </div>

            {/* Opening Hours Card */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-3 shadow-xl">
              <h3 className="text-sm font-black text-stone-100 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4" style={{ color: currentThemeConfig.primaryHex }} />
                <span>Operating Hours</span>
              </h3>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-stone-800">
                  <span className="text-stone-400">Monday – Friday</span>
                  <span className="font-semibold text-stone-200">{profile.openingHours.weekdays}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-800">
                  <span className="text-stone-400">Saturday</span>
                  <span className="font-semibold text-stone-200">{profile.openingHours.saturday}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-stone-400">Sunday</span>
                  <span className="font-semibold" style={{ color: currentThemeConfig.primaryHex }}>
                    {profile.openingHours.sunday}
                  </span>
                </div>
              </div>
            </div>

            {/* Embedded Google Map Preview */}
            <div className="rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 shadow-xl">
              <div className="p-3 bg-stone-950 border-b border-stone-800 flex items-center justify-between text-xs">
                <span className="text-stone-300 font-bold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" style={{ color: currentThemeConfig.primaryHex }} />
                  <span>{profile.gymName || 'Fitness Studio'} Location Map</span>
                </span>
                <a
                  href={profile.googleMapDirectionsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${profile.gymName} ${profile.address} ${profile.city}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:underline flex items-center gap-1.5 font-bold ${currentThemeConfig.textClass} bg-stone-900 px-2.5 py-1 rounded-lg border border-stone-800 hover:border-yellow-400/50 transition-colors`}
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="aspect-[16/9] w-full bg-stone-950">
                <iframe
                  title="Gym Location"
                  src={profile.googleMapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter invert-[90%] hue-rotate-180 contrast-90"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Booking Form OR Confirmation Ticket */}
          <div className="lg:col-span-7">
            {submittedPass ? (
              <div className="space-y-6">
                <TrialPassTicket
                  pass={submittedPass}
                  onClose={() => setSubmittedPass(null)}
                />
                <div className="text-center">
                  <button
                    onClick={() => {
                      setSubmittedPass(null);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        fitnessGoal: 'Fat Loss & Body Recomposition',
                        experienceLevel: 'Beginner (0-1 years)',
                        preferredDate: '',
                        preferredTimeSlot: 'Morning (6:00 AM - 9:00 AM)',
                        notes: '',
                      });
                    }}
                    className={`text-xs hover:underline ${currentThemeConfig.textClass}`}
                  >
                    ← Book another session or update details
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl relative">
                <div className="mb-6">
                  <span className={`text-xs font-black uppercase tracking-wider block ${currentThemeConfig.textClass}`}>
                    Zero Commitment • Free Assessment
                  </span>
                  <h3 className="text-2xl font-black text-stone-100 mt-1">Claim Your Free Training Pass</h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Fill out your fitness goals below to generate your instant digital session pass with {profile.name}.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 mb-5 rounded-xl bg-red-950/70 border border-red-800 text-red-300 text-xs">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-stone-300 block mb-1.5">
                        Your Full Name <span style={{ color: currentThemeConfig.primaryHex }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder=""
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-stone-600 transition-colors shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-300 block mb-1.5">
                        Phone Number <span style={{ color: currentThemeConfig.primaryHex }}>*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder=""
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-stone-600 transition-colors shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-semibold text-stone-300 block mb-1.5">
                      Email Address <span style={{ color: currentThemeConfig.primaryHex }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder=""
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-stone-600 transition-colors shadow-inner"
                    />
                  </div>

                  {/* Fitness Goal & Experience */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-stone-300 block mb-1.5">
                        Primary Fitness Goal
                      </label>
                      <select
                        value={formData.fitnessGoal}
                        onChange={(e) => setFormData({ ...formData, fitnessGoal: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-3 text-stone-100 text-sm focus:outline-none focus:border-stone-600 shadow-inner"
                      >
                        <option value="Fat Loss & Body Recomposition">Fat Loss & Body Recomposition</option>
                        <option value="Lean Muscle & Hypertrophy">Lean Muscle & Hypertrophy</option>
                        <option value="Strength & Powerlifting">Strength & Powerlifting</option>
                        <option value="Posture & Joint Mobility">Posture & Joint Mobility</option>
                        <option value="Endurance & Cardiovascular Conditioning">Endurance & Conditioning</option>
                        <option value="General Health & Energy">General Health & Energy</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-300 block mb-1.5">
                        Current Experience Level
                      </label>
                      <select
                        value={formData.experienceLevel}
                        onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-3 text-stone-100 text-sm focus:outline-none focus:border-stone-600 shadow-inner"
                      >
                        <option value="Complete Beginner (0-6 months)">Complete Beginner (0-6 months)</option>
                        <option value="Intermediate (6m - 2 years)">Intermediate (6m - 2 years)</option>
                        <option value="Advanced / Experienced Lifter">Advanced / Experienced Lifter</option>
                        <option value="Returning After Injury or Hiatus">Returning After Hiatus / Injury</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-stone-300 block mb-1.5">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-stone-600 shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-300 block mb-1.5">
                        Preferred Time Slot
                      </label>
                      <select
                        value={formData.preferredTimeSlot}
                        onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-3 text-stone-100 text-sm focus:outline-none focus:border-stone-600 shadow-inner"
                      >
                        <option value="Early Morning (5:30 AM - 8:00 AM)">Early Morning (5:30 AM - 8:00 AM)</option>
                        <option value="Morning (8:00 AM - 11:30 AM)">Morning (8:00 AM - 11:30 AM)</option>
                        <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                        <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                        <option value="Night (8:00 PM - 9:30 PM)">Night (8:00 PM - 9:30 PM)</option>
                      </select>
                    </div>
                  </div>

                  {/* Custom Message / Notes */}
                  <div>
                    <label className="text-xs font-semibold text-stone-300 block mb-1.5">
                      Past Injuries or Special Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g., Lower back stiffness, knee pain, or specific equipment questions..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-stone-600 transition-colors shadow-inner"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 px-6 font-black rounded-xl text-base flex items-center justify-center gap-2.5 shadow-xl transition-all disabled:opacity-50 ${currentThemeConfig.buttonClass}`}
                    >
                      {isSubmitting ? (
                        <span>Generating Free Trial Pass...</span>
                      ) : (
                        <>
                          <Calendar className="w-5 h-5" />
                          <span>Generate My Free 60-Min Trial Pass</span>
                          <Sparkles className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Guarantee footnote */}
                  <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 text-center pt-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Your contact details are strictly confidential. No spam guaranteed.</span>
                  </div>
                </form>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
