import { fadeIn } from "../lib/animations";
import { motion } from "framer-motion";
import React, { ReactNode, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface ServiceLayoutProps {
  title: string;
  subtitle?: string;
  heroImage: string;
  children: ReactNode;
}

const ServiceLayout: React.FC<ServiceLayoutProps> = ({
  title,
  subtitle,
  heroImage,
  children
}) => {
  // Log component rendering and props for debugging
  useEffect(() => {
    console.log(`ServiceLayout rendered with title: ${title}`);
    console.log(`Image path: ${heroImage}`);
    console.log("Children:", children);
  }, [title, heroImage, children]);

  // Use a default image if the heroImage fails to load
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log(`Image failed to load: ${heroImage}`);
    e.currentTarget.src = "/attached_assets/1.webp";
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gray-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={heroImage} 
            alt={title}
            onError={handleImageError}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            {title}
          </h1>
          {subtitle && (
            <h2 className="text-2xl md:text-3xl font-medium text-white/80 mt-4">
              {subtitle}
            </h2>
          )}
        </div>
      </section>
      
      {/* Content Section */}
      <main className="flex-grow bg-gray-900 z-10 relative">
        <div className="py-20">
          <div className="container mx-auto px-4">
            {/* Add debug info */}
            <div className="text-white bg-accent/30 p-4 mb-8 rounded-md" style={{display: 'none'}}>
              Debug: {children ? 'Children content exists' : 'No children content'}
            </div>
            {children}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default ServiceLayout;