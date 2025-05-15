import React, { useEffect, useState } from 'react';

interface ParallaxBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  elementCount?: number;
  elementSizes?: number[];
  colors?: string[];
  shapes?: ('circle' | 'square' | 'triangle' | 'dot')[];
  maxSpeed?: number;
}

/**
 * A component that creates a parallax background with floating elements
 */
const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  className = '',
  children,
  elementCount = 15,
  elementSizes = [5, 10, 15, 20, 25],
  colors = ['#4BD0A0', '#FF7D5F', '#118AB2', '#073B4C', '#06D6A0'],
  shapes = ['circle', 'square', 'triangle', 'dot'],
  maxSpeed = 0.04
}) => {
  const [elements, setElements] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    shape: 'circle' | 'square' | 'triangle' | 'dot';
    speedX: number;
    speedY: number;
    rotation: number;
    rotationSpeed: number;
    delay: number;
  }>>([]);

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  const [scrollY, setScrollY] = useState(0);

  // Generate random elements once on mount
  useEffect(() => {
    const generatedElements = Array.from({ length: elementCount }, (_, i) => {
      const size = elementSizes[Math.floor(Math.random() * elementSizes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      
      // Speed should be smaller for larger elements (more realistic physics)
      const baseSpeed = maxSpeed * (1 - size / Math.max(...elementSizes) * 0.8);
      
      return {
        id: i,
        x: Math.random() * 100, // percentage of parent width
        y: Math.random() * 100, // percentage of parent height
        size,
        color,
        shape,
        speedX: (Math.random() - 0.5) * baseSpeed, // between -baseSpeed/2 and baseSpeed/2
        speedY: (Math.random() - 0.5) * baseSpeed,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        delay: Math.random() * 2000 // stagger the animation start
      };
    });
    
    setElements(generatedElements);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Render element based on shape
  const renderShape = (shape: string, size: number, color: string, rotation: number) => {
    switch (shape) {
      case 'circle':
        return (
          <div 
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              borderRadius: '50%'
            }}
          />
        );
      case 'square':
        return (
          <div 
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              transform: `rotate(${rotation}deg)`
            }}
          />
        );
      case 'triangle':
        return (
          <div 
            style={{
              width: 0,
              height: 0,
              borderLeft: `${size/2}px solid transparent`,
              borderRight: `${size/2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
              transform: `rotate(${rotation}deg)`
            }}
          />
        );
      case 'dot':
        return (
          <div 
            style={{
              width: `${size/2}px`,
              height: `${size/2}px`,
              backgroundColor: color,
              borderRadius: '50%'
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`parallax-background relative overflow-hidden ${className}`}>
      {/* Parallax Elements */}
      {elements.map((element) => {
        // Calculate parallax position based on scroll
        const parallaxY = scrollY * element.speedY * 2;
        const parallaxX = scrollY * element.speedX * 2;
        
        const elementStyle: React.CSSProperties = {
          position: 'absolute',
          left: `${element.x}%`,
          top: `${element.y}%`,
          transform: `translate(${parallaxX}px, ${parallaxY}px) rotate(${element.rotation + scrollY * element.rotationSpeed}deg)`,
          opacity: 0.15 + (element.size / Math.max(...elementSizes)) * 0.2, // Larger elements slightly more visible
          transition: 'transform 0.1s ease-out',
          zIndex: 0,
          animation: `fadeIn 1s ease-out ${element.delay}ms forwards`,
          willChange: 'transform'
        };
        
        return (
          <div key={element.id} style={elementStyle} className="parallax-element">
            {renderShape(element.shape, element.size, element.color, element.rotation)}
          </div>
        );
      })}
      
      {/* Main content */}
      {children}
      
      {/* Animation is handled in the CSS file */}
    </div>
  );
};

export default ParallaxBackground;