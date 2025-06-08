import { slideFromBottom, slideFromLeft, slideFromRight } from "../lib/animations";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface ServiceSectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({
  title,
  subtitle,
  children,
  className = "",
  dark = false
}) => {
  // Log when the ServiceSection is rendered
  React.useEffect(() => {
    console.log(`ServiceSection rendered with title: ${title || 'No title'}`);
    console.log('ServiceSection children:', children);
  }, [title, children]);
  return (
    <section className={`py-16 ${dark ? 'bg-gray-900' : 'bg-gray-800'} rounded-lg mb-10 ${className} relative z-10`}>
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold"
                  variants={slideFromLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {title.split('<span>')[0]}
                  {title.includes('<span>') && (
                    <span className="text-accent italic"> 
                      {title.split('<span>')[1].replace('</span>', '')}
                    </span>
                  )}
                </motion.h2>
              </div>
            )}
            
            {subtitle && (
              <motion.h3 
                className="text-xl md:text-2xl text-muted-foreground"
                variants={slideFromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {subtitle.split('<span>')[0]}
                {subtitle.includes('<span>') && (
                  <span className="text-accent italic"> 
                    {subtitle.split('<span>')[1].replace('</span>', '')}
                  </span>
                )}
              </motion.h3>
            )}
          </div>
        )}
        

        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;