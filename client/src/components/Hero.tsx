import { motion } from "framer-motion";
import {
  fadeIn,
  slideFromLeft,
  slideFromRight,
  fadeInScale,
  staggerFadeIn,
} from "../lib/animations";
import robotLogo from "../assets/robot.png";
import SimpleParallax from "./SimpleParallax";
import GlowingElement from "./GlowingElement";
import { useEffect, useState, useRef } from "react";

const Hero = () => {
  // Create Apple-style parallax effect with mouse movement
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
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
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        // Only track mouse if we're over or near the hero section
        if (e.clientY < rect.bottom + 200) {
          // Calculate mouse position relative to center of screen
          const x = (e.clientX / windowSize.width - 0.5) * 2; // -1 to 1 range
          const y = (e.clientY / windowSize.height - 0.5) * 2; // -1 to 1 range

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
      transform: `translate(${mousePosition.x * depth * -30}px, ${mousePosition.y * depth * -30}px)`,
      transition: "transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
    };
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden bg-gradient-to-b from-[#000000] to-[rgba(75,184,166,0.2)]"
    >
      {/* 3D-like layered backgrounds with parallax - reduced dot density */}
      <div className="absolute inset-0 z-0">
        {/* Main dot background layer - similar to original */}
        <div
          className="absolute inset-0 opacity-30"
          style={getParallaxStyle(0.05)}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#4BD0A0_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>

        {/* Very subtle secondary layer with minimal dots */}
        <div
          className="absolute inset-0 opacity-10"
          style={getParallaxStyle(0.1)}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#4BD0A0_0.5px,transparent_0.5px)] bg-[length:40px_40px] transform translate-x-5 translate-y-5"></div>
        </div>
      </div>

      {/* Enhanced parallax elements with Apple-style 3D depth effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Large gradient orbs that move with mouse */}
        <div
          className="absolute top-[10%] left-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-primary to-transparent opacity-10 blur-xl"
          style={{
            transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * -25}px)`,
            transition: "transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        ></div>

        <div
          className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-gradient-to-tr from-accent to-transparent opacity-10 blur-xl"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
            transition: "transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        ></div>

        {/* Sharper elements with dramatic parallax */}
        <SimpleParallax
          speed={0.15}
          direction="diagonal-up-right"
          opacityEffect={true}
          scale={true}
          mouseEffect={true}
          className="absolute top-[25%] left-[15%] w-32 h-32"
        >
          <div
            className="w-full h-full rounded-full bg-gradient-to-br from-primary to-transparent opacity-30 backdrop-blur-sm"
            style={getParallaxStyle(0.4)}
          ></div>
        </SimpleParallax>

        <SimpleParallax
          speed={0.2}
          direction="diagonal-down-left"
          rotation={15}
          opacityEffect={true}
          mouseEffect={true}
          className="absolute top-[40%] right-[20%] w-40 h-40"
        >
          <div
            className="w-full h-full rounded-full bg-gradient-to-tr from-accent to-transparent opacity-25 backdrop-blur-sm"
            style={getParallaxStyle(0.5)}
          ></div>
        </SimpleParallax>

        <SimpleParallax
          speed={0.25}
          direction="diagonal-up-left"
          scale={true}
          opacityEffect={true}
          mouseEffect={true}
          className="absolute bottom-[30%] left-[25%] w-24 h-24"
        >
          <div
            className="w-full h-full rounded-full bg-gradient-to-r from-primary to-transparent opacity-30 backdrop-blur-sm"
            style={getParallaxStyle(0.6)}
          ></div>
        </SimpleParallax>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeInScale}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start"
          >
            <SimpleParallax
              speed={0.2}
              direction="down"
              scale={true}
              className="mb-8"
            >
              <div style={getParallaxStyle(0.15)}>
                <img
                  src={robotLogo}
                  alt="Robot Mascot"
                  className="w-48 drop-shadow-xl"
                />
              </div>
            </SimpleParallax>

            <SimpleParallax
              speed={0.15}
              direction="diagonal-down-right"
              opacityEffect={true}
            >
              <div style={getParallaxStyle(0.1)}>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 drop-shadow-lg">
                  <span>Aspire</span>
                  <span className="text-accent">It</span>
                  <span>
                    <br />
                  </span>
                  <span className="text-primary">
                    Software Automation & Promotion
                  </span>
                </h1>

                <h2 className="text-2xl md:text-3xl font-medium text-white/80 mt-4 mb-6">
                  <em>We can when we AspireIt</em>
                </h2>
              </div>
            </SimpleParallax>

            <SimpleParallax
              speed={0.1}
              direction="diagonal-down-left"
              opacityEffect={true}
            >
              <div style={getParallaxStyle(0.05)}>
                <p className="text-lg text-muted-foreground mb-8">
                  Your business runs 9-5. Your competition runs 24/7. What if
                  your communication never stopped, your follow-ups were always
                  timely, and your appointments got scheduled automatically?
                  What if every customer interaction was handled perfectly, even
                  at 2 AM?
                </p>
              </div>
            </SimpleParallax>

            <SimpleParallax speed={0.05} direction="up" scale={true}>
              <div
                className="flex justify-center"
                style={getParallaxStyle(0.08)}
              >
                <a
                  href="https://calendar.app.google/nuQzaVZ8opKfm8bo8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-md text-center hover:bg-accent/90 transition duration-300 card-glow-effect accent-glow"
                >
                  Contact Us
                </a>
              </div>
            </SimpleParallax>
          </motion.div>

          <motion.div
            className="relative"
            variants={fadeInScale}
            initial="hidden"
            animate="show"
          >
            {/* Background glow spots with enhanced 3D effect */}
            <div
              className="absolute -left-4 -top-4 w-36 h-36 bg-primary bg-opacity-20 rounded-full blur-xl"
              style={getParallaxStyle(0.5)}
            ></div>

            <div
              className="absolute -right-4 -bottom-4 w-48 h-48 bg-primary bg-opacity-20 rounded-full blur-xl"
              style={getParallaxStyle(0.6)}
            ></div>

            <motion.div
              className="flex items-center justify-center"
              variants={staggerFadeIn}
            >
              <div className="relative w-full aspect-square">
                {/* 3D grid pattern with enhanced parallax + mouse tracking */}
                <div
                  className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-30 w-full h-full"
                  style={getParallaxStyle(0.3)}
                >
                  {Array(16)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="border border-accent/50"></div>
                    ))}
                </div>

                {/* Floating elements with dramatic 3D parallax effect */}
                <div
                  className="absolute top-1/4 left-1/4 w-20 h-20"
                  style={{
                    transform: `translate(${mousePosition.x * -50}px, ${mousePosition.y * -50}px) rotate(12deg)`,
                    transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  }}
                >
                  <GlowingElement
                    glowColor="hsl(28, 100%, 60%)"
                    glowSize="md"
                    glowOpacity={0.6}
                    hoverScale={1.1}
                  >
                    <div className="w-full h-full rounded-lg bg-accent/40 backdrop-blur-sm flex items-center justify-center drop-shadow-lg">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </GlowingElement>
                </div>

                <div
                  className="absolute bottom-1/3 right-1/4 w-16 h-16"
                  style={{
                    transform: `translate(${mousePosition.x * 60}px, ${mousePosition.y * 60}px)`,
                    transition: "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  }}
                >
                  <GlowingElement
                    glowColor="hsl(160, 100%, 50%)"
                    glowSize="md"
                    glowOpacity={0.6}
                    hoverScale={1.1}
                  >
                    <div className="w-full h-full rounded-full bg-primary/50 backdrop-blur-sm flex items-center justify-center drop-shadow-lg">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </GlowingElement>
                </div>

                {/* Animated outer circles with enhanced 3D effect */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={getParallaxStyle(0.2)}
                >
                  <div className="w-48 h-48 rounded-full border-2 border-dashed border-accent/60 animate-spin-slow opacity-60"></div>
                </div>

                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={getParallaxStyle(0.4)}
                >
                  <div className="w-32 h-32 rounded-full border border-dashed border-primary/60 animate-spin-slow opacity-60 transform rotate-45"></div>
                </div>

                {/* Central element with dramatic 3D parallax effect */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `translate(${mousePosition.x * -35}px, ${mousePosition.y * -35}px)`,
                    transition: "transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  }}
                >
                  <div className="w-36 h-36 rounded-full bg-gradient-to-br from-accent to-primary opacity-95 flex items-center justify-center p-4 shadow-lg">
                    <svg
                      className="w-20 h-20 text-white drop-shadow-md"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
