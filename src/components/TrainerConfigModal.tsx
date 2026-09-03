import React, { useState } from 'react';
import { useTrainer } from '../context/TrainerContext';
import {
  X,
  SlidersHorizontal,
  RotateCcw,
  Check,
  Sparkles,
  User,
  Building,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Clock,
  Copy,
  Image as ImageIcon,
  Palette
} from 'lucide-react';
import { TrainerProfile, ThemeId } from '../types';
import { DEFAULT_THEMES } from '../data/defaultTrainer';

export const TrainerConfigModal: React.FC = () => {
  const {
    isConfigModalOpen,
    closeConfigModal,
    profile,
    updateProfile,
    resetAllDefaults,
    theme,
    setTheme,
    currentThemeConfig
  } = useTrainer();

  const availableThemes = Object.values(DEFAULT_THEMES);
  const currentTheme = theme;

  const [form, setForm] = useState<TrainerProfile>({ ...profile });
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isConfigModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      closeConfigModal();
    }, 800);
  };

  const handleCopyPromptDetails = () => {
    const text = `
Trainer Name: ${form.name}
Gym Name: ${form.gymName}
Location/Address: ${form.address}, ${form.city}
Phone: ${form.phone}
Email: ${form.email}
Instagram: ${form.instagramHandle}
Opening Hours: ${form.openingHours.weekdays}
`.trim();

    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-stone-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-xl h-full bg-stone-900 border-l border-stone-800 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div
              className="p-2 rounded-lg"
              style={{
                backgroundColor: `${currentThemeConfig.primaryHex}20`,
                color: currentThemeConfig.primaryHex
              }}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100">Trainer & Gym Studio Settings</h3>
              <p className="text-xs text-stone-400">Live customization of trainer profile, theme, and location</p>
            </div>
          </div>
          <button
            onClick={closeConfigModal}
            className="p-1.5 rounded-lg bg-stone-900 text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form id="config-form" onSubmit={handleSave} className="p-6 overflow-y-auto flex-1 space-y-6 text-left">
          
          {/* Theme Selector Section */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" style={{ color: currentThemeConfig.primaryHex }} />
                <span>Color Palette & Aesthetic</span>
              </span>
              <span className={`text-[11px] font-bold ${currentThemeConfig.textClass}`}>
                Active: {currentThemeConfig.name}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {availableThemes.map((thm) => {
                const isActive = currentTheme === thm.id;
                return (
                  <button
                    key={thm.id}
                    type="button"
                    onClick={() => setTheme(thm.id)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                      isActive
                        ? 'bg-stone-900 border-white/40 shadow-lg scale-105'
                        : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full shadow-inner"
                      style={{ backgroundColor: thm.primaryHex }}
                    />
                    <span className="text-[10px] font-bold text-stone-300 truncate w-full text-center">
                      {thm.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Helper Banner */}
          <div
            className="p-3.5 rounded-xl border text-xs text-stone-300 flex items-center justify-between"
            style={{
              backgroundColor: `${currentThemeConfig.primaryHex}10`,
              borderColor: `${currentThemeConfig.primaryHex}30`
            }}
          >
            <span>Any changes you make here will instantly update this website.</span>
            <button
              type="button"
              onClick={handleCopyPromptDetails}
              className={`px-2.5 py-1 rounded font-bold text-[11px] flex items-center gap-1 shrink-0 ml-2 shadow-sm ${currentThemeConfig.buttonClass}`}
            >
              <Copy className="w-3 h-3" />
              <span>{copiedNotification ? 'Copied!' : 'Copy Info'}</span>
            </button>
          </div>

          {/* Trainer Core Info */}
          <div className="space-y-4">
            <h4 className={`text-xs uppercase font-black tracking-wider flex items-center gap-1.5 ${currentThemeConfig.textClass}`}>
              <User className="w-3.5 h-3.5" />
              <span>Trainer Identity</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">Trainer Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">Years of Experience</label>
                <input
                  type="number"
                  value={form.yearsOfExperience}
                  onChange={(e) => setForm({ ...form, yearsOfExperience: Number(e.target.value) })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Hero Bold Headline</label>
              <input
                type="text"
                value={form.heroHeadline}
                onChange={(e) => setForm({ ...form, heroHeadline: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Hero Subheadline / Philosophy</label>
              <textarea
                rows={2}
                value={form.heroSubheadline}
                onChange={(e) => setForm({ ...form, heroSubheadline: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600"
              />
            </div>
          </div>

          {/* Gym & Location */}
          <div className="space-y-4 pt-3 border-t border-stone-800">
            <h4 className={`text-xs uppercase font-black tracking-wider flex items-center gap-1.5 ${currentThemeConfig.textClass}`}>
              <Building className="w-3.5 h-3.5" />
              <span>Gym & Business Info</span>
            </h4>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Gym Name</label>
              <input
                type="text"
                value={form.gymName}
                onChange={(e) => setForm({ ...form, gymName: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">Street Address</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">City, State / ZIP</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600"
                />
              </div>
            </div>
          </div>

          {/* Contact & Social Links */}
          <div className="space-y-4 pt-3 border-t border-stone-800">
            <h4 className={`text-xs uppercase font-black tracking-wider flex items-center gap-1.5 ${currentThemeConfig.textClass}`}>
              <Phone className="w-3.5 h-3.5" />
              <span>Contact & Socials</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">Phone Number (Calling)</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value, formattedPhone: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">WhatsApp Number (Digits only)</label>
                <input
                  type="text"
                  value={form.whatsappNumber}
                  onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value.replace(/\D/g, '') })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600"
                  placeholder="e.g. 15553829014"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">Instagram Handle</label>
                <input
                  type="text"
                  value={form.instagramHandle}
                  onChange={(e) => setForm({ ...form, instagramHandle: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600"
                  placeholder="@handle"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Opening Hours (Weekdays)</label>
              <input
                type="text"
                value={form.openingHours.weekdays}
                onChange={(e) =>
                  setForm({
                    ...form,
                    openingHours: { ...form.openingHours, weekdays: e.target.value },
                  })
                }
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-stone-600"
              />
            </div>
          </div>

          {/* Photo URLs */}
          <div className="space-y-4 pt-3 border-t border-stone-800">
            <h4 className={`text-xs uppercase font-black tracking-wider flex items-center gap-1.5 ${currentThemeConfig.textClass}`}>
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Trainer Photos (Unsplash or Image URLs)</span>
            </h4>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Hero Photo URL</label>
              <input
                type="text"
                value={form.trainerHeroImage}
                onChange={(e) => setForm({ ...form, trainerHeroImage: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-xs font-mono focus:outline-none focus:border-stone-600"
              />
            </div>
          </div>

        </form>

        {/* Footer Actions */}
        <div className="p-5 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={resetAllDefaults}
            className="py-2 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 text-xs font-medium flex items-center gap-1.5 border border-stone-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={closeConfigModal}
              className="py-2 px-4 rounded-lg bg-stone-800 text-stone-300 text-xs font-medium hover:bg-stone-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="config-form"
              className={`py-2.5 px-6 rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all ${currentThemeConfig.buttonClass}`}
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Apply Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
