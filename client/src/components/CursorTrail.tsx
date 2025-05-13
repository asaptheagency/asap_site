import React, { useEffect, useRef, useState } from 'react';

interface CursorTrailProps {
  particleCount?: number;
  particleLifetime?: number;
  colors?: string[];
  particleSize?: number;
  trailSpeed?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  age: number;
  opacity: number;
  velocityX?: number;
  velocityY?: number;
}

const CursorTrail: React.FC<CursorTrailProps> = ({
  particleCount = 15,
  particleLifetime = 800,
  colors = ['#4BD0A0', '#FF7D5F', '#FFD166', '#06D6A0', '#118AB2'],
  particleSize = 8,
  trailSpeed = 3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: -100, y: -100 });
  const particles = useRef<Particle[]>([]);
  const nextParticleId = useRef(0);
  const frameRef = useRef<number | null>(null);
  const lastEmitTime = useRef(0);
  const lastUpdateTime = useRef(0);
  const emitInterval = 30; // ms between particle emissions
  const [isActive, setIsActive] = useState(false);
  const currentColor = useRef(0);
  const canvasContext = useRef<CanvasRenderingContext2D | null>(null);

  // Set up canvas and context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasContext.current = canvas.getContext('2d');

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update mouse position on movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      setIsActive(true);
    };

    const handleMouseLeave = () => {
      setIsActive(false);
    };

    const handleMouseEnter = () => {
      setIsActive(true);
    };

    // Also track touch events for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePosition.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
        setIsActive(true);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePosition.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
        setIsActive(true);
      }
    };

    const handleTouchEnd = () => {
      setIsActive(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  // Emit particles and animate them
  useEffect(() => {
    const createParticle = () => {
      // Cycle through colors for a rainbow effect
      currentColor.current = (currentColor.current + 1) % colors.length;
      
      // Add some randomness to size
      const sizeVariation = 0.5 + Math.random() * 0.5;
      const size = particleSize * sizeVariation;
      
      // Add random velocity for more dynamic movement
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.5;
      
      return {
        id: nextParticleId.current++,
        x: mousePosition.current.x,
        y: mousePosition.current.y,
        color: colors[currentColor.current],
        size: size,
        age: 0,
        opacity: 0.8,
        velocityX: Math.cos(angle) * speed,
        velocityY: Math.sin(angle) * speed
      };
    };

    const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
      // Reset composite operation for each particle
      ctx.globalCompositeOperation = 'lighter';
      ctx.shadowBlur = particle.size * 2;
      ctx.shadowColor = particle.color;
      ctx.globalAlpha = particle.opacity;
      
      // Draw the particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    };

    const updateParticles = (delta: number) => {
      const ctx = canvasContext.current;
      if (!ctx) return;
      
      // Clear canvas with proper reset of context
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'source-over';
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      
      // Update and draw particles
      const updatedParticles: Particle[] = [];
      
      for (const particle of particles.current) {
        const newAge = particle.age + delta;
        const lifeProgress = newAge / particleLifetime;
        
        // Skip particles that have completed their lifetime
        if (newAge >= particleLifetime) continue;
        
        // Update particle properties
        const updatedParticle = {
          ...particle,
          age: newAge,
          opacity: 1 - lifeProgress,
          // Move particles based on their velocity
          x: particle.x + (particle.velocityX || 0),
          y: particle.y + (particle.velocityY || 0)
        };
        
        // Draw and add to updated array
        drawParticle(ctx, updatedParticle);
        updatedParticles.push(updatedParticle);
      }
      
      // Update particles reference
      particles.current = updatedParticles;
    };

    const animateTrail = (timestamp: number) => {
      // Calculate delta time for smooth animation regardless of frame rate
      const delta = timestamp - lastUpdateTime.current || 16;
      lastUpdateTime.current = timestamp;

      // Emit new particles at interval
      if (isActive && timestamp - lastEmitTime.current > emitInterval) {
        if (particles.current.length < particleCount) {
          particles.current.push(createParticle());
        }
        lastEmitTime.current = timestamp;
      }

      // Update and draw particles
      updateParticles(delta);

      // Continue animation loop
      frameRef.current = requestAnimationFrame(animateTrail);
    };

    // Start animation
    frameRef.current = requestAnimationFrame(animateTrail);

    // Clean up on unmount
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isActive, colors, particleCount, particleLifetime, particleSize, trailSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className="cursor-trail-canvas"
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}
    />
  );
};

export default CursorTrail;