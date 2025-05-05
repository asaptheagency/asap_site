import { motion } from "framer-motion";
import { fadeIn, slideFromLeft, slideFromBottom } from "../lib/animations";
import { image1 } from "../assets";
import ImageWithFallback from "./ImageWithFallback";

const Problem = () => {
  return (
    <section id="our-story" className="py-20 relative overflow-hidden bg-gradient-to-b from-[rgba(75,184,166,0.2)] to-[rgba(75,184,166,0.3)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 mb-8 md:mb-0">
            <motion.div 
              className="sticky top-32"
              variants={slideFromLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-0.5 w-12 bg-accent"></div>
                <span className="text-accent uppercase text-sm tracking-wider">Our Mission</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Automation First</h2>
              <p className="text-muted-foreground">
                We believe businesses need to establish robust automation systems before scaling their marketing efforts.
              </p>
            </motion.div>
          </div>
          
          <div className="md:w-3/4 md:pl-12">
            <motion.div 
              className="mb-24 relative"
              variants={slideFromBottom}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:flex-row">
                <div className="mr-8 mb-4 md:mb-0">
                  <div className="flex items-center justify-center w-16 h-16 bg-background rounded-full border border-accent text-2xl font-bold text-accent glow-hover">
                    01
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Automation Before Marketing</h3>
                  <p className="text-muted-foreground mb-6">
                    In today's rapidly evolving digital landscape, businesses often rush to market their products without establishing efficient systems first. This leads to operational bottlenecks, inconsistent customer experiences, and wasted resources.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Before scaling your marketing efforts, you need streamlined processes, automated workflows, and integrated systems. Marketing without proper automation is like driving with the brakes on - you'll burn fuel (resources) without gaining the speed (growth) you want.
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
                    <div className="absolute -left-2 -top-2 w-12 h-12 bg-accent bg-opacity-20 rounded-full blur-lg"></div>
                    <div className="h-56 w-full rounded-md shadow-lg bg-secondary flex items-center justify-center relative overflow-hidden">
                      <div className="absolute w-full h-full bg-gradient-to-r from-accent/20 to-transparent"></div>
                      <ImageWithFallback
                        src={image1}
                        fallbackSrc={image1}
                        alt="Person working at messy desk with computer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
