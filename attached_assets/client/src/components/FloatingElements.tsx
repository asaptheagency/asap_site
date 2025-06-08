import React from 'react';
import { motion } from 'framer-motion';

interface FloatingElementsProps {
  className?: string;
}

export const FloatingElements: React.FC<FloatingElementsProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {/* Static teal gradient background */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          background: 'linear-gradient(135deg, rgba(75,184,166,0.2) 0%, rgba(75,184,166,0.1) 100%)'
        }}
      ></div>
    
      {/* Dotted grid pattern - enhanced */}
      <div className="absolute inset-0" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(255, 120, 73, 0.5) 2px, transparent 2px)', 
          backgroundSize: '45px 45px',
          opacity: 0.4
        }} 
      />
    </div>
  );
};

export default FloatingElements;