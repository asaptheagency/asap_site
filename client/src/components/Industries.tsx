import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { fadeIn, staggerContainer, staggerFadeIn } from '../lib/animations';
// import { useLanguage } from '../context/LanguageContext';
import GlowingElement from './GlowingElement';
import { scrollToSection } from '../lib/scrollUtils';
import ImageWithFallback from './ImageWithFallback';

// Import automation service images
import riseImage from '../assets/rise_new.webp';
import salesDriveImage from '../assets/connect_sales.webp';
import followUpImage from '../assets/connect_outreachPro.webp';
import frontDeskImage from '../assets/connect_frontDesk.webp';

// COMMENTED OUT - Legacy industry images
// import robotLawImage from '../assets/robot_law.webp';
// import robotPdrImage from '../assets/robot_pdr.webp';
// import robotRooferImage from '../assets/robot_roofer.webp';

const Industries: React.FC = () => {
  // const { translations } = useLanguage();
  const [, setLocation] = useLocation();

  // New automation services
  const services = [
    {
      id: 'rise',
      title: 'R.I.S.E.',
      subtitle: 'Revive Inactive Sales Engagements - Our text agent "Alina" texts your old dead leads and recaptures them, putting them back into your sales process.',
      image: riseImage,
      route: '/services/rise'
    },
    {
      id: 'outreach-pro',
      title: 'ASAP Connect - OutreachPro',
      subtitle: 'Automated outbound calls for follow-ups, appointments, and vendor orders. Let Veronica handle all your business communications.',
      image: followUpImage,
      route: '/services/outreach-pro'
    },
    {
      id: 'front-desk',
      title: 'ASAP Connect - Front Desk',
      subtitle: 'Inbound voice agent "Jessica" takes calls just like your receptionist would, checks your Google calendar, and schedules appointments.',
      image: frontDeskImage,
      route: '/services/front-desk'
    },
    {
      id: 'sales-drive',
      title: 'ASAP Connect - Sales Drive',
      subtitle: 'Our outbound sales agent "Veronica" makes sales calls for you, checks your Google calendar, and schedules appointments automatically.',
      image: salesDriveImage,
      route: '/services/sales-drive'
    }
  ];

  // COMMENTED OUT - Legacy industries
  // const industries = [
  //   {
  //     id: 'law-firms',
  //     title: 'Law Firms',
  //     subtitle: 'Transform your practice into a client-generating machine. Stop chasing leads and start attracting them automatically.',
  //     image: robotLawImage,
  //     route: '/industries/law-firms'
  //   },
  //   {
  //     id: 'contractors',
  //     title: 'Roofers',
  //     subtitle: 'Dominate your local market with storm-ready systems that book jobs while you sleep. Built for ambitious contractors.',
  //     image: robotRooferImage,
  //     route: '/industries/contractors'
  //   },
  //   {
  //     id: 'pdr-shops',
  //     title: 'PDR Shops',
  //     subtitle: 'Turn your PDR expertise into a lead-generating powerhouse. Get booked solid without the constant hustle.',
  //     image: robotPdrImage,
  //     route: '/industries/pdr-shops'
  //   }
  // ];

  const handleIndustryClick = (route: string) => {
    setLocation(route);
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
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
            Introducing Your New AI Team
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            What if you could hire the perfect team that never sleeps, never calls in sick, and converts leads at 3x your current rate? Meet the solution thousands of businesses are using to automate their growth.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          variants={staggerContainer}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
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
                  onClick={() => handleIndustryClick(service.route)}
                >
                  <div className="h-full flex flex-col w-full">
                    <div className="w-full h-40 sm:h-48 md:h-52 mb-4 overflow-hidden rounded-lg group-hover:scale-105 transition-transform duration-300">
                      <ImageWithFallback
                        src={service.image}
                        fallbackSrc="/robot_placeholder.webp"
                        alt={`${service.title} Agent`}
                        className="w-full h-full object-cover object-center"
                        style={{ objectPosition: service.id === 'rise' ? 'center 20%' : 'center center' }}
                      />
                    </div>
                    
                    <div className="flex-grow flex flex-col justify-between w-full">
                      <div className="w-full">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors duration-300">
                          {service.title}
                        </h3>
                        
                        <p className="text-gray-300 text-base leading-relaxed">
                          {service.subtitle}
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