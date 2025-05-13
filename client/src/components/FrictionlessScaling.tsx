import { motion } from "framer-motion";
import { fadeIn, slideFromBottom } from "../lib/animations";
import { image3 } from "../assets";
import ImageWithFallback from "./ImageWithFallback";

const FrictionlessScaling = () => {
  return (
    <section id="technology" className="py-20 relative bg-gradient-to-b from-[#000000] to-[rgba(75,184,166,0.15)]">
      {/* Direct gradient background */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="md:w-3/4 md:pr-12">
            <motion.div 
              className="mb-6 relative mt-12 md:mt-0"
              variants={slideFromBottom}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="flex">
                <div className="mr-8">
                  <div className="flex items-center justify-center w-16 h-16 bg-background rounded-full border border-accent text-2xl font-bold text-accent">
                    02
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Frictionless Scaling</h3>
                  <p className="text-muted-foreground mb-6">
                    Once your business systems are streamlined, our marketing experts create high-impact strategies that connect your services to ideal clients, build authority, and transform you into the go-to solution in your market.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Whether you need targeted ad campaigns, conversion-optimized websites, or comprehensive funnel systems, we design scalable marketing that delivers measurable results and sustainable growth.
                  </p>
                  <motion.div 
                    className="bg-background rounded-lg p-6 relative group"
                    variants={fadeIn}
                    whileHover={{ 
                      rotate: -3,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute -left-2 -bottom-2 w-12 h-12 bg-accent bg-opacity-20 rounded-full blur-lg"></div>
                    <div className="h-56 w-full rounded-md shadow-lg bg-secondary flex items-center justify-center relative overflow-hidden">
                      <div className="absolute w-full h-full bg-gradient-to-t from-accent/20 to-transparent"></div>
                      <ImageWithFallback
                        src={image3}
                        fallbackSrc={image3}
                        alt="Business professional pointing at analytics dashboard"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </motion.div>
                  
                  <div className="mt-8 p-6 border border-accent/30 rounded-md bg-background/20 backdrop-blur-sm shadow-lg relative overflow-hidden">
                    {/* Decorative glowing element */}
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-accent/20 rounded-full blur-xl"></div>
                    
                    <h4 className="text-xl font-semibold mb-3 relative z-10">Customized Service Paths</h4>
                    <p className="text-sm text-muted-foreground mb-5 relative z-10">
                      Every business is unique. We offer tailored service paths based on where you are in your journey:
                    </p>
                    <ul className="space-y-4 text-sm relative z-10">
                      <li className="flex items-start p-2 rounded-md hover:bg-accent/10 transition-colors">
                        <span className="text-accent mr-3 mt-0.5 text-lg">→</span>
                        <div>
                          <span className="font-bold text-primary block mb-1">Automation Focus</span>
                          <span className="text-muted-foreground">For businesses needing to streamline operations first</span>
                        </div>
                      </li>
                      <li className="flex items-start p-2 rounded-md hover:bg-accent/10 transition-colors">
                        <span className="text-accent mr-3 mt-0.5 text-lg">→</span>
                        <div>
                          <span className="font-bold text-primary block mb-1">Marketing Boost</span>
                          <span className="text-muted-foreground">For businesses with solid systems ready to scale</span>
                        </div>
                      </li>
                      <li className="flex items-start p-2 rounded-md hover:bg-accent/10 transition-colors">
                        <span className="text-accent mr-3 mt-0.5 text-lg">→</span>
                        <div>
                          <span className="font-bold text-primary block mb-1">Integrated Approach</span>
                          <span className="text-muted-foreground">Our comprehensive solution covering both areas</span>
                        </div>
                      </li>
                    </ul>
                    
                    {/* Decorative glowing element */}
                    <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="md:w-1/4 vertical-text text-6xl font-bold opacity-20 flex items-center justify-center text-accent uppercase tracking-widest">
            SCALING
          </div>
        </div>
      </div>
      
      {/* Solid gray bottom - no gradient connector */}
    </section>
  );
};

export default FrictionlessScaling;
