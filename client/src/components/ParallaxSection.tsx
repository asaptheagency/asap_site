import React, { useRef, useEffect, useState, ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  offset?: number;        // How much the element moves relative to scroll (0.1 = 10%)
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  baseSpeed?: number;     // Base multiplier for movement
  fadeEffect?: boolean;   // Whether to fade in as scrolling
  delay?: number;         // Milliseconds to delay the effect (for staggering)
}

/**
 * A component that creates a parallax scrolling effect for its children
 */
const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  offset = 0.1,
  className = '',
  direction = 'up',
  baseSpeed = 1,
  fadeEffect = false,
  delay = 0
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [initiallyRendered, setInitiallyRendered] = useState(false);

  // Calculate transform values based on scroll position
  const getTransformValue = () => {
    if (!initiallyRendered) return 'translate3d(0, 0, 0)';

    const speed = baseSpeed * offset;
    const value = scrollPosition * speed;

    switch (direction) {
      case 'up':
        return `translate3d(0, ${-value}px, 0)`;
      case 'down':
        return `translate3d(0, ${value}px, 0)`;
      case 'left':
        return `translate3d(${-value}px, 0, 0)`;
      case 'right':
        return `translate3d(${value}px, 0, 0)`;
      default:
        return `translate3d(0, ${-value}px, 0)`;
    }
  };

  // Calculate opacity based on element's visibility in viewport
  const getOpacity = () => {
    if (!fadeEffect) return 1;
    return isVisible ? 1 : 0;
  };

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Check if element is visible
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(isInView);
      }
    };

    // Add initial delay if specified
    setTimeout(() => {
      setInitiallyRendered(true);
      handleScroll(); // Initial check
    }, delay);

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`parallax-section ${className}`}
      style={{
        transform: getTransformValue(),
        opacity: getOpacity(),
        transition: `transform 0.1s ease-out, opacity 0.5s ease-in-out`,
        willChange: 'transform, opacity' // Optimize for performance
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxSection;