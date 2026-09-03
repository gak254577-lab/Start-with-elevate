import React from 'react';
import { TrialPass } from '../types';
import { useTrainer } from '../context/TrainerContext';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  MessageSquare,
  ExternalLink
} from 'lucide-react';
import { WaveFitnessLogo } from './WaveFitnessLogo';

interface TrialPassTicketProps {
  pass: TrialPass;
  onClose?: () => void;
}

export const TrialPassTicket: React.FC<TrialPassTicketProps> = ({ pass, onClose }) => {
  const { currentThemeConfig, profile } = useTrainer();

  const whatsappMessage = encodeURIComponent(
    `🔥 *New 60-Min Trial Session Booking*\n\n` +
    `Hello Coach ${profile.name} (@ ${pass.gymName}),\n` +
    `I have just claimed my Free 60-Minute 1-on-1 Trial Session!\n\n` +
    `📋 *Booking Summary:*\n` +
    `• *Pass ID:* ${pass.passId}\n` +
    `• *Client Name:* ${pass.fullName}\n` +
    `• *Phone:* ${pass.phone}\n` +
    `• *Date:* ${pass.date}\n` +
    `• *Preferred Time Slot:* ${pass.timeSlot}\n` +
    `• *Fitness Goal:* ${pass.fitnessGoal}\n\n` +
    `Please confirm my slot. See you at ${pass.gymName}!`
  );

  const cleanPhone = profile.whatsappNumber || profile.phone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappMessage}`;

  return (
    <div
      className="rounded-2xl bg-stone-900 border-2 shadow-2xl overflow-hidden text-left max-w-md mx-auto animate-in fade-in zoom-in-95 duration-300"
      style={{
        borderColor: `${currentThemeConfig.primaryHex}90`,
        boxShadow: `0 20px 40px -15px ${currentThemeConfig.primaryHex}30`
      }}
    >
      
      {/* Top Banner */}
      <div
        className="text-stone-950 p-4 font-black flex items-center justify-between"
        style={{
          background: `linear-gradient(135deg, ${currentThemeConfig.primaryHex}, #ffffff 220%)`
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center p-0.5 shadow">
            <WaveFitnessLogo
              variant="full"
              size={28}
            />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest block text-stone-950 font-extrabold leading-none">
              VIP ACCESS PASS
            </span>
            <span className="text-base leading-tight font-black">{pass.gymName}</span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase font-bold tracking-wider block leading-none">Pass ID</span>
          <span className="text-xs font-mono font-black">{pass.passId}</span>
        </div>
      </div>

      {/* Ticket Body */}
      <div className="p-6 space-y-4 bg-stone-950">
        
        {/* Success Confirmation Badge */}
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-950/70 border border-emerald-800/40 text-emerald-300 text-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <span className="font-bold block">1-on-1 Trial Confirmed!</span>
            <span className="text-stone-300 text-[11px]">Pass generated. Send details to your coach on WhatsApp to lock your slot.</span>
          </div>
        </div>

        {/* Prominent Direct WhatsApp Send Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/20 transition-all active:scale-95"
        >
          <MessageSquare className="w-4 h-4 fill-stone-950" />
          <span>Send Booking to Coach on WhatsApp</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </a>

        {/* Member & Session Details */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
            <span className="text-[10px] text-stone-400 uppercase font-bold block mb-0.5">Attendee</span>
            <span className="text-stone-100 font-bold text-sm truncate block">{pass.fullName}</span>
            <span className="text-stone-400 text-[11px] truncate block">{pass.phone}</span>
          </div>

          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
            <span className="text-[10px] text-stone-400 uppercase font-bold block mb-0.5">Coach</span>
            <span
              className="font-bold text-sm truncate block"
              style={{ color: currentThemeConfig.primaryHex }}
            >
              {pass.trainerName}
            </span>
            <span className="text-stone-400 text-[11px] block">60-Min 1-on-1 Session</span>
          </div>
        </div>

        {/* Scheduled Date & Time */}
        <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-stone-800/80 pb-2">
            <div className="flex items-center gap-2 text-stone-300">
              <Calendar className="w-4 h-4" style={{ color: currentThemeConfig.primaryHex }} />
              <span>Date:</span>
            </div>
            <span className="font-bold text-stone-100">{pass.date || 'Within next 48 hours'}</span>
          </div>

          <div className="flex items-center justify-between border-b border-stone-800/80 pb-2">
            <div className="flex items-center gap-2 text-stone-300">
              <Clock className="w-4 h-4" style={{ color: currentThemeConfig.primaryHex }} />
              <span>Time Slot:</span>
            </div>
            <span className="font-bold text-stone-100">{pass.timeSlot}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-stone-300">
              <Sparkles className="w-4 h-4" style={{ color: currentThemeConfig.primaryHex }} />
              <span>Primary Goal:</span>
            </div>
            <span className="font-semibold truncate max-w-[200px]" style={{ color: currentThemeConfig.primaryHex }}>
              {pass.fitnessGoal}
            </span>
          </div>
        </div>

        {/* Location Info */}
        <div className="flex items-start gap-2 text-xs text-stone-400 pt-1">
          <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: currentThemeConfig.primaryHex }} />
          <span className="leading-snug">{pass.address}</span>
        </div>

        {/* Barcode & Security stamp mockup */}
        <div className="pt-3 border-t border-dashed border-stone-800 text-center">
          <div className="font-mono text-stone-600 text-[10px] tracking-[0.3em] font-bold mb-1">
            ||| | ||||| || |||| ||| ||||| || |||
          </div>
          <p className="text-[10px] text-stone-500">
            Pass Generated: {new Date(pass.createdAt).toLocaleDateString()} • Free Trial Pass
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2 flex gap-2">
          {onClose && (
            <button
              onClick={onClose}
              className={`py-2.5 px-5 font-bold rounded-lg text-xs transition-colors ${currentThemeConfig.buttonClass}`}
            >
              Done
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
