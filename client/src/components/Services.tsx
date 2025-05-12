import React from 'react';
import { motion } from 'framer-motion';
import { slideFromBottom } from '../lib/animations';
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

const Services: React.FC = () => {
  const services = [
    {
      title: "Web Design & Development",
      description: "Professional, eye-catching websites designed to make a great first impression and encourage customers to reach out. Our skilled team creates custom sites that exceed expectations.",
      image: websiteImage,
      link: "/services/web-design",
      fallback: websiteImage
    },
    {
      title: "AutoMate",
      description: "Streamline your business with custom automation solutions. From workflow to lead generation, our personalized approach integrates seamlessly with your systems to boost efficiency.",
      image: automateImage,
      link: "/services/automate",
      fallback: automateImage
    },
    {
      title: "BotSpot & LeadSeed",
      description: "Transform customer service with smart chatbots. BotSpot handles routine inquiries while LeadSeed qualifies leads for high-ticket service businesses, saving time and boosting sales.",
      image: botspotImage,
      link: "/services/botspot",
      fallback: botspotImage
    },
    {
      title: "AppSnap",
      description: "Custom mobile, web, or desktop app development tailored to your business needs. Our team builds user-friendly, functional applications that help streamline operations and serve customers better.",
      image: appsnapImage,
      link: "/services/appsnap",
      fallback: appsnapImage
    },
    {
      title: "HypeRise",
      description: "Elevate your high-ticket service business with targeted marketing strategies. Reach the right customers, generate quality leads, and boost conversions with our comprehensive approach.",
      image: hyperiseImage,
      link: "/services/hyperise",
      fallback: hyperiseImage
    },
    {
      title: "Review Generators",
      description: "Boost your online reputation with our customizable review generators. Available in basic and premium versions, these tools help showcase customer satisfaction and build trust with potential clients.",
      image: reviewGeneratorsImage,
      link: "/services/review-generators",
      fallback: hyperiseImage // Using hyperiseImage as fallback in case the reviewGeneratorsImage fails
    }
  ];

  return (
    <section id="services" className="py-20 relative scroll-mt-[200px]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/70 z-0"></div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          variants={slideFromBottom}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-accent italic">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions designed to automate, optimize, and scale your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-background/30 rounded-lg overflow-hidden border border-accent/10 shadow-lg backdrop-blur-sm hover:shadow-accent/20 transition-all duration-300 flex flex-col h-full"
              variants={slideFromBottom}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
            >
              <div className="relative h-52 overflow-hidden">
                <ImageWithFallback
                  src={service.image}
                  fallbackSrc={service.fallback}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4 flex-grow">{service.description}</p>
                <Link href={service.link}>
                  <div className="inline-flex items-center justify-center px-4 py-2 border border-accent/40 bg-accent/10 text-accent rounded-md hover:bg-accent/20 transition-colors w-full cursor-pointer">
                    Learn More
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;