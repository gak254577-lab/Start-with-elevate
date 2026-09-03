import React, { useState } from 'react';
import { LOGOS } from '../constants/images';

interface WaveFitnessLogoProps {
  className?: string;
  size?: number | string;
  fillColor?: string;
  bannerColor?: string;
  textColor?: string;
  variant?: 'full' | 'icon' | 'badge';
  alt?: string;
}

export const WaveFitnessLogo: React.FC<WaveFitnessLogoProps> = ({
  className = '',
  size = 48,
  variant = 'full',
  alt = 'Wave Fitness Logo',
}) => {
  const [imgError, setImgError] = useState(false);

  const logoSrc = variant === 'icon' ? LOGOS.icon : LOGOS.main;

  const numericSize = typeof size === 'number' ? `${size}px` : size;

  if (imgError) {
    // Graceful vector fallback if image is temporarily unavailable
    return (
      <div 
        className={`inline-flex items-center justify-center font-black select-none text-amber-400 ${className}`}
        style={{ width: numericSize, height: numericSize }}
      >
        <span className="text-sm uppercase tracking-tighter font-extrabold">WF</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      style={{
        width: numericSize,
        height: numericSize,
      }}
    >
      <img
        src={logoSrc}
        alt={alt}
        className="w-full h-full object-contain drop-shadow-md transition-transform duration-200"
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
      />
    </div>
  );
};

export default WaveFitnessLogo;
