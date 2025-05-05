import { motion } from "framer-motion";
import { fadeIn, slideFromLeft, slideFromRight } from "../lib/animations";
import robotLogo from "../assets/robot.png";

const Hero = () => {
  
  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden bg-gradient-to-b from-[#000000] to-[rgba(75,184,166,0.2)]">
      {/* Background with direct gradient */}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start"
          >
            <img 
              src={robotLogo} 
              alt="Robot Mascot" 
              className="w-48 mb-8"
            />
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              <span>Aspire</span>
              <span className="text-accent">It</span> 
              <span><br /></span>
              <span className="text-primary">Software Automation & Promotion</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Welcome to ASAP! We believe in automation before promotion. First, we streamline your operations with AI and custom software solutions. Then, we help you market effectively once your business is ready to handle growth.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="#services" 
                className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-md text-center glow-hover hover:bg-accent/90 transition duration-300"
              >
                Our Services
              </a>
              <a 
                href="https://calendar.app.google/nuQzaVZ8opKfm8bo8" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-accent text-foreground font-semibold rounded-md text-center glow-hover hover:bg-accent hover:text-accent-foreground hover:border-transparent transition duration-300"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            variants={slideFromRight}
            initial="hidden"
            animate="show"
          >
            <div className="absolute -left-4 -top-4 w-24 h-24 bg-primary bg-opacity-20 rounded-full blur-xl"></div>
            <motion.div 
              className="flex items-center justify-center"
              variants={fadeIn}
            >
              <div className="relative w-full aspect-square">
                {/* Grid pattern */}
                <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-20">
                  {Array(16).fill(0).map((_, i) => (
                    <div key={i} className="border border-accent/40"></div>
                  ))}
                </div>
                
                {/* Floating elements representing technologies */}
                <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-lg bg-accent/30 backdrop-blur-sm rotate-12 animate-pulse flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full bg-primary/40 backdrop-blur-sm animate-bounce flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                
                {/* Animated outer circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full border-2 border-dashed border-accent/60 animate-spin-slow"></div>
                </div>
                
                {/* Central element - improved chart/arrow icon showing upward trend */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent to-primary opacity-80 glow-hover flex items-center justify-center p-4">
                    <svg className="w-20 h-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary bg-opacity-20 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
