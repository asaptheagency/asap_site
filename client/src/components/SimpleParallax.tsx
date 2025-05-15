import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface SimpleParallaxProps {
  children?: ReactNode;
  className?: string;
  speed?: number; // Parallax movement speed (higher = more movement)
  direction?: 'up' | 'down' | 'left' | 'right' | 'diagonal-up-right' | 'diagonal-up-left' | 'diagonal-down-right' | 'diagonal-down-left';
  delay?: number; // Delay movement for staggered effects
  maxOffset?: number; // Maximum offset in pixels (limits movement range)
  scale?: boolean; // Whether to add a subtle scaling effect
  rotation?: number; // Degrees of rotation to add to the parallax effect
  opacityEffect?: boolean; // Whether to add opacity change based on scroll position
  mouseEffect?: boolean; // Whether to add additional effect on mouse movement
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'; // Transition easing
}

/**
 * An enhanced parallax component that moves elements based on scroll position and viewport
 * with smoother performance, more directions, and multiple visual effects
 */
const SimpleParallax: React.FC<SimpleParallaxProps> = ({
  children,
  className = '',
  speed = 0.5,  // Default movement is 50% of scroll - increased for visibility
  direction = 'up',
  delay = 0,
  maxOffset = 100, // Maximum 100px of movement in any direction
  scale = false,
  rotation = 0,
  opacityEffect = false,
  mouseEffect = false,
  easing = 'ease-out'
}) => {
  const [offset, setOffset] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0.4);
  const ref = useRef<HTMLDivElement>(null);
  const elementVisible = useRef(false);
  
  // Handle scroll effect
  useEffect(() => {
    let timeoutId: number;
    
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if element is in viewport
        elementVisible.current = 
          rect.top < windowHeight && 
          rect.bottom > 0;
          
        if (elementVisible.current) {
          // Calculate how far element is through viewport (0 to 1)
          const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
          const clampedProgress = Math.max(0, Math.min(1, scrollProgress)); // Ensure between 0 and 1
          
          // Apply delay if specified
          if (delay > 0) {
            clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => {
              const calculatedOffset = clampedProgress * speed * 150; // Increased for more visible effect
              setOffset(Math.min(calculatedOffset, maxOffset));
              
              // Update opacity if opacity effect is enabled
              if (opacityEffect) {
                setOpacity(0.4 + (clampedProgress * 0.6)); // Range from 0.4 to 1.0
              }
            }, delay);
          } else {
            const calculatedOffset = clampedProgress * speed * 150;
            setOffset(Math.min(calculatedOffset, maxOffset));
            
            // Update opacity if opacity effect is enabled
            if (opacityEffect) {
              setOpacity(0.4 + (clampedProgress * 0.6)); // Range from 0.4 to 1.0
            }
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [speed, delay, maxOffset, opacityEffect]);
  
  // Handle mouse movement effect
  useEffect(() => {
    if (!mouseEffect) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current || !elementVisible.current) return;
      
      // Calculate mouse position relative to the center of the screen
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 10; // -5 to +5 range
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 10; // -5 to +5 range
      
      setMouseOffset({ x: mouseX, y: mouseY });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseEffect]);
  
  // Calculate transform style based on direction with enhancements
  const getTransform = () => {
    let transform = '';
    
    // Base directional transform
    switch (direction) {
      case 'up': transform += `translateY(-${offset}px) `; break;
      case 'down': transform += `translateY(${offset}px) `; break;
      case 'left': transform += `translateX(-${offset}px) `; break;
      case 'right': transform += `translateX(${offset}px) `; break;
      case 'diagonal-up-right': transform += `translate(${offset}px, -${offset}px) `; break;
      case 'diagonal-up-left': transform += `translate(-${offset}px, -${offset}px) `; break;
      case 'diagonal-down-right': transform += `translate(${offset}px, ${offset}px) `; break;
      case 'diagonal-down-left': transform += `translate(-${offset}px, ${offset}px) `; break;
      default: transform += `translateY(-${offset}px) `;
    }
    
    // Add scaling if enabled
    if (scale) {
      const scaleValue = 1 + ((offset / maxOffset) * 0.1); // Scale between 1 and 1.1
      transform += `scale(${scaleValue}) `;
    }
    
    // Add rotation if specified
    if (rotation !== 0) {
      const rotationValue = (offset / maxOffset) * rotation;
      transform += `rotate(${rotationValue}deg) `;
    }
    
    // Add mouse effect if enabled
    if (mouseEffect) {
      transform += `translate(${mouseOffset.x}px, ${mouseOffset.y}px) `;
    }
    
    return transform.trim();
  };
  
  return (
    <div 
      ref={ref}
      className={`simple-parallax ${className}`}
      style={{
        transform: getTransform(),
        transition: `transform 0.3s ${easing}, opacity 0.5s ${easing}`,
        opacity: opacityEffect ? opacity : 1,
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  );
};

export default SimpleParallax;