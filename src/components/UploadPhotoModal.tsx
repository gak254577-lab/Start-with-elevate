import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTrainer } from '../context/TrainerContext';
import {
  X,
  UploadCloud,
  CheckCircle2,
  Image as ImageIcon,
  Tag,
  FileText,
  Camera
} from 'lucide-react';
import { GalleryItem } from '../types';

interface UploadPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({ isOpen, onClose }) => {
  const { addGalleryPhoto, currentThemeConfig } = useTrainer();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'strength' | 'hiit' | 'coaching' | 'facility' | 'transformation'>('strength');
  const [caption, setCaption] = useState('');
  const [photoBase64, setPhotoBase64] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Image size should be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPhotoBase64(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!photoBase64) {
      setErrorMsg('Please select or drag in a photo to upload.');
      return;
    }

    if (!title.trim()) {
      setErrorMsg('Please enter a title for your photo.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newPhoto: GalleryItem = {
        id: `gal-cloud-${Date.now()}`,
        title: title.trim(),
        category,
        imageUrl: photoBase64,
        caption: caption.trim() || 'Community member photo submission.',
      };

      await addGalleryPhoto(newPhoto);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setTitle('');
        setCaption('');
        setPhotoBase64('');
        onClose();
      }, 1800);
    } catch (err) {
      console.error(err);
      setErrorMsg('Upload failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          className="relative w-full max-w-xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{
                  backgroundColor: `${currentThemeConfig.primaryHex}15`,
                  borderColor: `${currentThemeConfig.primaryHex}40`,
                  color: currentThemeConfig.primaryHex,
                }}
              >
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-stone-100">Upload Gym & Workout Photo</h3>
                <p className="text-xs text-stone-400">Share your workout shot with the gym community</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          {isSubmitted ? (
            <div className="p-10 text-center space-y-4">
              <div
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center border"
                style={{
                  backgroundColor: `${currentThemeConfig.primaryHex}15`,
                  borderColor: `${currentThemeConfig.primaryHex}40`,
                  color: currentThemeConfig.primaryHex,
                }}
              >
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black text-stone-100">Photo Published!</h4>
              <p className="text-stone-400 text-sm max-w-sm mx-auto">
                Your photo has been saved to Firebase Cloud and is now live in the gallery for all visitors!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {errorMsg && (
                <div className="p-3.5 bg-red-950/50 border border-red-800 text-red-300 text-xs font-semibold rounded-xl">
                  {errorMsg}
                </div>
              )}

              {/* Photo selector */}
              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                  Select Photo *
                </label>
                {photoBase64 ? (
                  <div className="relative rounded-xl overflow-hidden border border-stone-700 bg-stone-950 aspect-video">
                    <img src={photoBase64} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotoBase64('')}
                      className="absolute top-3 right-3 p-2 bg-stone-900/90 hover:bg-red-900/90 text-stone-200 hover:text-red-200 rounded-lg text-xs font-bold transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-stone-700 hover:border-stone-500 rounded-2xl p-8 text-center cursor-pointer bg-stone-950/40 hover:bg-stone-950/80 transition-all flex flex-col items-center justify-center gap-2"
                  >
                    <UploadCloud className="w-8 h-8 text-stone-400" />
                    <span className="text-sm font-bold text-stone-200">Click or Drag photo here</span>
                    <span className="text-xs text-stone-500">JPG, PNG, WebP up to 5MB</span>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                    Photo Title *
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. 180kg Squat PR"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-stone-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <div className="relative">
                    <Tag className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-stone-500"
                    >
                      <option value="strength">Strength & Lifting</option>
                      <option value="hiit">HIIT & Conditioning</option>
                      <option value="coaching">1-on-1 Coaching</option>
                      <option value="facility">Gym Facility</option>
                      <option value="transformation">Milestones</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                  Caption / Notes (Optional)
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. Week 10 heavy squat progression at Wave Fitness"
                  className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-stone-500"
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all shadow-lg text-stone-950 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: currentThemeConfig.primaryHex,
                  }}
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>{isSubmitting ? 'Uploading to Firebase...' : 'Publish to Live Gallery'}</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
