import { motion } from "framer-motion";
import { fadeIn, slideFromBottom, fadeInScale, staggerFadeIn } from "../lib/animations";
import { image3 } from "../assets";
import ImageWithFallback from "./ImageWithFallback";
import SimpleParallax from "./SimpleParallax";
import { useState, useEffect, useRef } from "react";

const FrictionlessScaling = () => {
  // Setup Apple-style mouse tracking for 3D effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const mouseMoveTimeoutRef = useRef<number | null>(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  
  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    // Super smooth Apple-like mouse tracking for parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // Only track mouse if we're over or near the section
        if (e.clientY >= rect.top - 200 && e.clientY <= rect.bottom + 200) {
          // Calculate mouse position relative to center of section
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1 range
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1 range
          
          // Use requestAnimationFrame for smoother animation
          if (mouseMoveTimeoutRef.current) {
            cancelAnimationFrame(mouseMoveTimeoutRef.current);
          }
          
          mouseMoveTimeoutRef.current = requestAnimationFrame(() => {
            setMousePosition({ x, y });
          });
        }
      }
    };
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseMoveTimeoutRef.current) {
        cancelAnimationFrame(mouseMoveTimeoutRef.current);
      }
    };
  }, [windowSize]);
  
  // Calculate movement for different elements based on mouse position
  const getParallaxStyle = (depth: number) => {
    return {
      transform: `translate(${mousePosition.x * depth * -20}px, ${mousePosition.y * depth * -20}px)`,
      transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
    };
  };

  return (
    <section 
      ref={sectionRef}
      id="technology" 
      className="pt-20 pb-12 relative overflow-hidden bg-gradient-to-b from-[rgba(0,0,0,0.9)] to-[rgba(75,184,166,0.12)]"
    >
      {/* 3D-like layered backgrounds with parallax */}
      <div className="absolute inset-0 z-0">
        {/* Deep background layer - moves slowest with mouse */}
        <div 
          className="absolute inset-0 opacity-5"
          style={getParallaxStyle(0.05)}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#4BD0A0_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>
        
        {/* Middle background layer */}
        <div 
          className="absolute inset-0 opacity-10"
          style={getParallaxStyle(0.15)}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,#4BD0A0_1px,transparent_1px)] bg-[length:30px_30px]"></div>
        </div>
      </div>
      
      {/* Large glowing orbs in background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full bg-gradient-to-tr from-accent to-transparent opacity-5 blur-xl"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
            transition: 'transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        ></div>
        
        <div 
          className="absolute bottom-[10%] left-[15%] w-72 h-72 rounded-full bg-gradient-to-br from-primary to-transparent opacity-5 blur-xl"
          style={{
            transform: `translate(${mousePosition.x * -35}px, ${mousePosition.y * -35}px)`,
            transition: 'transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="md:w-3/4 md:pr-12">
            <motion.div 
              className="mb-6 relative mt-12 md:mt-0"
              variants={fadeInScale}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="flex">
                <SimpleParallax speed={0.15} direction="up" opacityEffect={true} className="mr-8">
                  <div 
                    className="flex items-center justify-center w-16 h-16 bg-background/80 backdrop-blur-sm rounded-full border border-accent text-2xl font-bold text-accent"
                    style={getParallaxStyle(0.3)}
                  >
                    02
                  </div>
                </SimpleParallax>
                
                <div>
                  <SimpleParallax speed={0.12} direction="diagonal-down-right" opacityEffect={true}>
                    <h3 
                      className="text-2xl font-bold mb-4 drop-shadow-md"
                      style={getParallaxStyle(0.1)}
                    >
                      Frictionless Scaling
                    </h3>
                  </SimpleParallax>
                  
                  <SimpleParallax speed={0.08} direction="left" opacityEffect={true}>
                    <p 
                      className="text-muted-foreground mb-6"
                      style={getParallaxStyle(0.05)}
                    >
                      Once your business systems are streamlined, our marketing experts create high-impact strategies that connect your services to ideal clients, build authority, and transform you into the go-to solution in your market.
                    </p>
                  </SimpleParallax>
                  
                  <SimpleParallax speed={0.06} direction="right" opacityEffect={true}>
                    <p 
                      className="text-muted-foreground mb-6"
                      style={getParallaxStyle(0.07)}
                    >
                      Whether you need targeted ad campaigns, conversion-optimized websites, or comprehensive funnel systems, we design scalable marketing that delivers measurable results and sustainable growth.
                    </p>
                  </SimpleParallax>
                  
                  <motion.div 
                    className="bg-background/30 backdrop-blur-sm rounded-lg p-6 relative group card-glow-effect"
                    variants={fadeInScale}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    whileHover={{ 
                      rotate: -3,
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={getParallaxStyle(0.1)}
                  >
                    <div className="absolute -left-2 -bottom-2 w-16 h-16 bg-accent bg-opacity-20 rounded-full blur-lg"></div>
                    <div className="h-56 w-full rounded-md shadow-lg bg-secondary/80 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute w-full h-full bg-gradient-to-t from-accent/30 via-transparent to-black/20"></div>
                      <div 
                        className="absolute inset-0"
                        style={{
                          transform: `scale(1.1) translate(${mousePosition.x * -12}px, ${mousePosition.y * -12}px)`,
                          transition: 'transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)',
                        }}
                      >
                        <ImageWithFallback
                          src={image3}
                          fallbackSrc={image3}
                          alt="Business professional pointing at analytics dashboard"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      
                      {/* Subtle overlay that moves with mouse to create a glass/reflection effect */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10"
                        style={{
                          transform: `translateX(${mousePosition.x * 10}px)`,
                          transition: 'transform 0.3s ease-out',
                        }}
                      ></div>
                    </div>
                  </motion.div>
                  
                  <SimpleParallax speed={0.1} direction="up" opacityEffect={true}>
                    <div 
                      className="mt-8 p-6 border border-accent/30 rounded-md bg-background/30 backdrop-blur-sm shadow-lg relative overflow-hidden card-glow-effect primary-glow"
                      style={getParallaxStyle(0.08)}
                    >
                      {/* Decorative glowing elements that move with mouse */}
                      <div 
                        className="absolute -top-10 -right-10 w-24 h-24 bg-accent/20 rounded-full blur-xl"
                        style={{
                          transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
                          transition: 'transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)',
                        }}
                      ></div>
                      
                      <h4 className="text-xl font-semibold mb-3 relative z-10">Customized Service Paths</h4>
                      <p className="text-sm text-muted-foreground mb-5 relative z-10">
                        Every business is unique. We offer tailored service paths based on where you are in your journey:
                      </p>
                      
                      <ul className="space-y-4 text-sm relative z-10">
                        {["Automation Focus", "Marketing Boost", "Integrated Approach"].map((path, i) => (
                          <SimpleParallax key={i} speed={0.05 + (i * 0.02)} direction="right" maxOffset={15} delay={i * 100}>
                            <li 
                              className="flex items-start p-2 rounded-md hover:bg-accent/10 transition-colors"
                              style={{
                                transform: `translateX(${mousePosition.x * (3 + i * 2)}px)`,
                                transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
                              }}
                            >
                              <span className="text-accent mr-3 mt-0.5 text-lg transform transition-transform group-hover:translate-x-1">→</span>
                              <div>
                                <span className="font-bold text-primary block mb-1">{path}</span>
                                <span className="text-muted-foreground">
                                  {i === 0 && "For businesses needing to streamline operations first"}
                                  {i === 1 && "For businesses with solid systems ready to scale"}
                                  {i === 2 && "Our comprehensive solution covering both areas"}
                                </span>
                              </div>
                            </li>
                          </SimpleParallax>
                        ))}
                      </ul>
                      
                      {/* Decorative glowing element */}
                      <div 
                        className="absolute -bottom-10 -left-10 w-24 h-24 bg-primary/20 rounded-full blur-xl"
                        style={{
                          transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`,
                          transition: 'transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)',
                        }}
                      ></div>
                    </div>
                  </SimpleParallax>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="md:w-1/4 vertical-text text-6xl font-bold opacity-20 flex items-center justify-center text-accent uppercase tracking-widest"
            style={{
              transform: `translateY(${mousePosition.y * -15}px)`,
              transition: 'transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          >
            SCALING
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrictionlessScaling;
