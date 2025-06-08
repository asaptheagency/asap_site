import React, { ReactNode, useState } from 'react';

interface GlowingElementProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  glowSize?: 'sm' | 'md' | 'lg' | 'xl';
  glowOpacity?: number;
  glowOnClick?: boolean;
  hoverScale?: number; // Scale factor on hover (1.0 = no scale)
  activeScale?: number; // Scale factor on click (1.0 = no scale)
  glowIntensity?: 'soft' | 'medium' | 'strong'; // Intensity of the glow effect
  transitionSpeed?: 'fast' | 'normal' | 'slow'; // Speed of the hover transition
}

/**
 * A component that adds a customizable glowing effect on hover to its children
 */
const GlowingElement: React.FC<GlowingElementProps> = ({
  children,
  className = '',
  glowColor = 'hsl(160, 100%, 50%)', // Default: teal
  glowSize = 'md',
  glowOpacity = 0.6,
  glowOnClick = false,
  hoverScale = 1.02,
  activeScale = 0.98,
  glowIntensity = 'medium',
  transitionSpeed = 'normal'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  // Calculate glow size in pixels
  const getGlowSize = (): number => {
    switch (glowSize) {
      case 'sm': return 15;
      case 'md': return 25;
      case 'lg': return 35;
      case 'xl': return 50;
      default: return 25;
    }
  };
  
  // Calculate glow intensity (blur amount)
  const getGlowIntensity = (): number => {
    switch (glowIntensity) {
      case 'soft': return 15;
      case 'medium': return 25;
      case 'strong': return 35;
      default: return 25;
    }
  };
  
  // Calculate transition duration
  const getTransitionDuration = (): string => {
    switch (transitionSpeed) {
      case 'fast': return '0.15s';
      case 'normal': return '0.3s';
      case 'slow': return '0.5s';
      default: return '0.3s';
    }
  };
  
  // Active or hover state
  const showGlow = isHovered || (glowOnClick && isActive);
  
  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setIsActive(false)}
      style={{
        position: 'relative',
        display: 'inline-block',
        transform: isActive ? `scale(${activeScale})` : isHovered ? `scale(${hoverScale})` : 'scale(1)',
        transition: `transform ${getTransitionDuration()} ease-out`
      }}
    >
      {/* Glow effect behind the element */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 'inherit',
          opacity: showGlow ? glowOpacity : 0,
          boxShadow: `0 0 ${getGlowSize()}px ${getGlowIntensity()}px ${glowColor}`,
          transition: `opacity ${getTransitionDuration()} ease-out, box-shadow ${getTransitionDuration()} ease-out`,
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlowingElement;