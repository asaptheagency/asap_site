import { motion } from "framer-motion";
import { fadeIn, slideFromBottom, fadeInScale, staggerFadeIn } from "../lib/animations";
import { image2 } from "../assets";
import ImageWithFallback from "./ImageWithFallback";

const CreativeStrategy = () => {
  return (
    <section id="services" className="py-20 relative bg-gradient-to-b from-[rgba(75,184,166,0.3)] to-[#000000]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row relative">
          <div className="md:w-3/4 md:pr-12 relative">
            {/* Vertical text positioned on the side for mobile */}
            <motion.div 
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 vertical-text text-4xl md:text-6xl font-bold opacity-20 text-accent uppercase tracking-widest md:hidden z-10"
              variants={staggerFadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              CONNECT
            </motion.div>
            
            <motion.div 
              className="mb-24 relative mt-12 md:mt-0"
              variants={fadeInScale}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="flex flex-col md:flex-row">
                <div className="mr-8 mb-4 md:mb-0">
                  <div className="flex items-center justify-center w-16 h-16 bg-secondary rounded-full border border-accent text-2xl font-bold text-accent glow-hover">
                    01
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">ASAP Connect</h3>
                  <p className="text-muted-foreground mb-6">
                    Meet your new AI team: Veronica handles outbound calls with perfect consistency, Jessica manages your front desk and scheduling, and our Sales Drive system follows up on leads automatically. Each agent integrates with your Google Calendar and works 24/7 to keep your business running smoothly.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Whether you need someone to qualify prospects, book appointments, or ensure no call goes unanswered, ASAP Connect gives you a reliable team that never takes a day off and always represents your business professionally.
                  </p>
                  <motion.div 
                    className="bg-secondary rounded-lg p-6 relative group card-glow-effect"
                    variants={fadeInScale}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ 
                      rotate: -3,
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute -right-2 -bottom-2 w-12 h-12 bg-accent bg-opacity-20 rounded-full blur-lg"></div>
                    <div className="h-56 w-full rounded-md shadow-lg bg-background flex items-center justify-center relative overflow-hidden">
                      <div className="absolute w-full h-full bg-gradient-to-l from-accent/20 to-transparent"></div>
                      <ImageWithFallback
                        src={image2}
                        fallbackSrc={image2}
                        alt="People working in modern office with data visualization"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Vertical text for desktop only */}
          <motion.div 
            className="hidden md:flex md:w-1/4 vertical-text text-6xl font-bold opacity-20 items-center justify-center text-accent uppercase tracking-widest"
            variants={staggerFadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            CONNECT
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CreativeStrategy;
