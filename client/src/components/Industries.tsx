import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { fadeIn, staggerContainer, staggerFadeIn } from '../lib/animations';
// import { useLanguage } from '../context/LanguageContext';
import GlowingElement from './GlowingElement';
import { scrollToSection } from '../lib/scrollUtils';
import ImageWithFallback from './ImageWithFallback';

// Import industry images
import robotLawImage from '../assets/robot_law.webp';
import robotPdrImage from '../assets/robot_pdr.webp';
import robotRooferImage from '../assets/robot_roofer.webp';

const Industries: React.FC = () => {
  // const { translations } = useLanguage();
  const [, setLocation] = useLocation();

  const industries = [
    {
      id: 'law-firms',
      title: 'Law Firms',
      subtitle: 'Transform your practice into a client-generating machine. Stop chasing leads and start attracting them automatically.',
      image: robotLawImage,
      route: '/industries/law-firms'
    },
    {
      id: 'contractors',
      title: 'Roofers',
      subtitle: 'Dominate your local market with storm-ready systems that book jobs while you sleep. Built for ambitious contractors.',
      image: robotRooferImage,
      route: '/industries/contractors'
    },
    {
      id: 'pdr-shops',
      title: 'PDR Shops',
      subtitle: 'Turn your PDR expertise into a lead-generating powerhouse. Get booked solid without the constant hustle.',
      image: robotPdrImage,
      route: '/industries/pdr-shops'
    }
  ];

  const handleIndustryClick = (route: string) => {
    setLocation(route);
  };

  return (
    <section id="industries" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div 
          className="text-center mb-16"
          variants={fadeIn}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-teal-400 to-orange-500 bg-clip-text text-transparent">
            Industries We Serve
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Tailored growth systems for specific business types. Explore how we help businesses like yours automate operations, attract more customers, and scale smarter.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
        >
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              variants={staggerFadeIn}
              whileHover={{ 
                scale: 1.05,
                rotateZ: -2,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <GlowingElement 
                glowColor="rgba(20, 184, 166, 0.5)"
                glowSize="md"
                className="h-full w-full"
              >
                <div 
                  className="bg-gray-900 border border-gray-800 rounded-lg p-6 h-full w-full cursor-pointer transition-all duration-300 hover:border-teal-500/50 card-glow-effect group"
                  onClick={() => handleIndustryClick(industry.route)}
                >
                  <div className="h-full flex flex-col w-full">
                    <div className="w-full h-48 mb-4 overflow-hidden rounded-lg group-hover:scale-105 transition-transform duration-300">
                      <ImageWithFallback
                        src={industry.image}
                        fallbackSrc="/robot_placeholder.webp"
                        alt={`${industry.title} Robot`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow flex flex-col justify-between w-full">
                      <div className="w-full">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors duration-300">
                          {industry.title}
                        </h3>
                        
                        <p className="text-gray-300 text-base leading-relaxed">
                          {industry.subtitle}
                        </p>
                      </div>
                      
                      <div className="mt-6 text-teal-400 group-hover:text-orange-400 transition-colors duration-300 w-full">
                        <span className="text-sm font-medium">Learn More →</span>
                      </div>
                    </div>
                  </div>
                </div>
              </GlowingElement>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Industries;