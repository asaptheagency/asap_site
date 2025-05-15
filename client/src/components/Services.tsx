import React from 'react';
import { motion } from 'framer-motion';
import { slideFromBottom, fadeIn, fadeInScale, staggerFadeIn } from '../lib/animations';
import { Link } from 'wouter';
import { 
  websiteImage, 
  automateImage, 
  botspotImage, 
  appsnapImage, 
  hyperiseImage,
  reviewGeneratorsImage 
} from '../assets';
import ImageWithFallback from './ImageWithFallback';
import SimpleParallax from './SimpleParallax';
import GlowingElement from './GlowingElement';

const Services: React.FC = () => {
  const services = [
    {
      title: "Web Design & Development",
      subtitle: "",
      description: "Professional, eye-catching websites designed to make a great first impression and encourage customers to reach out. Our skilled team creates custom sites that exceed expectations.",
      image: websiteImage,
      link: "/services/web-design",
      fallback: websiteImage
    },
    {
      title: "Business Automation",
      subtitle: "AutoMate",
      description: "Streamline your business with custom automation solutions. From workflow to lead generation, our personalized approach integrates seamlessly with your systems to boost efficiency.",
      image: automateImage,
      link: "/services/automate",
      fallback: automateImage
    },
    {
      title: "AI Chatbot Solutions",
      subtitle: "BotSpot & LeadSeed",
      description: "Transform customer service with smart chatbots. BotSpot handles routine inquiries while LeadSeed qualifies leads for high-ticket service businesses, saving time and boosting sales.",
      image: botspotImage,
      link: "/services/botspot",
      fallback: botspotImage
    },
    {
      title: "Custom App Development",
      subtitle: "AppSnap",
      description: "Custom mobile, web, or desktop app development tailored to your business needs. Our team builds user-friendly, functional applications that help streamline operations and serve customers better.",
      image: appsnapImage,
      link: "/services/appsnap",
      fallback: appsnapImage
    },
    {
      title: "Marketing Strategies",
      subtitle: "HypeRise",
      description: "Elevate your high-ticket service business with targeted marketing strategies. Reach the right customers, generate quality leads, and boost conversions with our comprehensive approach.",
      image: hyperiseImage,
      link: "/services/hyperise",
      fallback: hyperiseImage
    },
    {
      title: "Review Generators",
      subtitle: "",
      description: "Boost your online reputation with our customizable review generators. Available in basic and premium versions, these tools help showcase customer satisfaction and build trust with potential clients.",
      image: reviewGeneratorsImage,
      link: "/services/review-generators",
      fallback: hyperiseImage // Using hyperiseImage as fallback in case the reviewGeneratorsImage fails
    }
  ];

  return (
    <section id="services" className="pt-4 pb-20 relative scroll-mt-[200px]">
      {/* Background gradient - blending with the previous section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black/70 z-0"></div>
      
      {/* Parallax background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <SimpleParallax speed={0.2} direction="up" className="absolute top-[20%] right-[10%] w-48 h-48">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-transparent opacity-10"></div>
        </SimpleParallax>
        
        <SimpleParallax speed={0.3} direction="left" className="absolute bottom-[30%] left-[5%] w-64 h-64">
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-accent to-transparent opacity-10"></div>
        </SimpleParallax>
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          variants={staggerFadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SimpleParallax speed={0.3} direction="up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-accent italic">Services</span>
            </h2>
          </SimpleParallax>
          
          <SimpleParallax speed={0.2} direction="up" delay={100}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive digital solutions designed to automate, optimize, and scale your business.
            </p>
          </SimpleParallax>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <SimpleParallax 
              key={index} 
              speed={0.15} 
              direction="up" 
              delay={index * 50} // Staggered delay based on index
              maxOffset={30}
            >
              <motion.div
                className="bg-background/30 rounded-lg overflow-hidden border border-accent/10 shadow-lg backdrop-blur-sm transition-all duration-300 flex flex-col h-full card-glow-effect"
                variants={fadeInScale}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                custom={index}
                whileHover={{ 
                  rotate: -1, // Slight counterclockwise rotation on hover
                  transition: { duration: 0.3 }
                }}
              >
                <div className="relative h-52 overflow-hidden">
                  <SimpleParallax 
                    speed={0.2} 
                    direction="up" 
                    scale={true}
                    opacityEffect={true}
                  >
                    <ImageWithFallback
                      src={service.image}
                      fallbackSrc={service.fallback}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-300"
                    />
                  </SimpleParallax>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <SimpleParallax speed={0.15} direction="right" maxOffset={10}>
                    <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                    {service.subtitle && (
                      <h4 className="text-sm text-accent/90 mb-3">{service.subtitle}</h4>
                    )}
                  </SimpleParallax>
                  
                  <SimpleParallax speed={0.1} direction="left" maxOffset={8}>
                    <p className="text-muted-foreground mb-4 flex-grow">{service.description}</p>
                  </SimpleParallax>
                  
                  <SimpleParallax speed={0.12} direction="up" maxOffset={5}>
                    <div className="w-full relative">
                      <Link href={service.link}>
                        <div className="inline-flex items-center justify-center px-4 py-2 border border-accent/40 bg-accent/10 text-accent rounded-md w-full cursor-pointer relative card-glow-effect accent-glow">
                          Learn More
                        </div>
                      </Link>
                    </div>
                  </SimpleParallax>
                </div>
              </motion.div>
            </SimpleParallax>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;