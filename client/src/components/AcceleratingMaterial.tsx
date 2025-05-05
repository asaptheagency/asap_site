import { motion } from "framer-motion";
import { fadeIn, slideFromBottom } from "../lib/animations";

const CreativeStrategy = () => {
  return (
    <section id="services" className="py-20 relative bg-gradient-to-b from-[rgba(75,184,166,0.3)] to-[#000000]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="md:w-3/4 md:pr-12">
            <motion.div 
              className="mb-24 relative mt-12 md:mt-0"
              variants={slideFromBottom}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:flex-row">
                <div className="mr-8 mb-4 md:mb-0">
                  <div className="flex items-center justify-center w-16 h-16 bg-secondary rounded-full border border-accent text-2xl font-bold text-accent glow-hover">
                    02
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Automation Solutions</h3>
                  <p className="text-muted-foreground mb-6">
                    Our team creates custom automation solutions that streamline your business operations, reduce manual tasks, and free up your valuable time and resources for strategic growth initiatives.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    From customer service chatbots to workflow automation systems, we build intelligent tools that run 24/7, eliminating bottlenecks and ensuring consistent quality in every customer interaction.
                  </p>
                  <motion.div 
                    className="bg-secondary rounded-lg p-6 relative group"
                    variants={fadeIn}
                    whileHover={{ 
                      rotate: -3,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute -right-2 -bottom-2 w-12 h-12 bg-accent bg-opacity-20 rounded-full blur-lg"></div>
                    <div className="h-56 w-full rounded-md shadow-lg bg-background flex items-center justify-center relative overflow-hidden">
                      <div className="absolute w-full h-full bg-gradient-to-l from-accent/20 to-transparent"></div>
                      <picture>
                        <source srcSet="/images/2.webp" type="image/webp" />
                        <img 
                          src="/images/2.webp" 
                          alt="People working in modern office with data visualization" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.log('Image failed to load: /images/2.webp');
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '2.webp';
                          }}
                        />
                      </picture>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="md:w-1/4 vertical-text text-6xl font-bold opacity-20 flex items-center justify-center text-accent uppercase tracking-widest">
            AUTOMATE
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeStrategy;
