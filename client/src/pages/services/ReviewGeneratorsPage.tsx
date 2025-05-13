import * as React from 'react';
import { Button } from '../../components/ui/button';
import { motion } from 'framer-motion';
import { fadeIn, slideFromLeft, slideFromRight } from '../../lib/animations';
import { useLocation } from 'wouter';

/**
 * Standalone Review Generators page that doesn't rely on dynamic imports or complex layouts
 * This will serve as a more stable alternative to prevent black screen issues on refresh
 */
const ReviewGeneratorsPage: React.FC = () => {
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gray-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="w-full h-full">
            <img 
              src="/review_gen.jpeg" 
              alt="Review Generators"
              className="w-full h-full object-cover opacity-50"
              onError={(e) => {
                // Fallback to a solid color if image fails
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            Review Generators
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-white/80 mt-4">
            AI-powered review generation tools for your business
          </h2>
        </div>
      </section>
      
      {/* Content Section */}
      <main className="flex-grow bg-gray-900 z-10 relative">
        <div className="py-20">
          <div className="container mx-auto px-4">
            <section className="py-16 md:py-24">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <motion.div
                    variants={slideFromLeft}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold">Boost Your Business Reputation</h2>
                    <p className="text-lg text-muted-foreground">
                      Our AI-powered Review Generator tools streamline the customer feedback process. With just a click, these tools create authentic-sounding reviews, copy them to the user's clipboard, and direct them to your Google Maps business profile to leave a review.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-accent">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </div>
                        <p>Uses AI to generate professional, personalized reviews based on your business strengths</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-accent">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </div>
                        <p>Automatically copies generated reviews to clipboard for easy posting</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-accent">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </div>
                        <p>Directs users to your Google Maps business page to increase review count</p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    variants={slideFromRight}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="rounded-lg overflow-hidden shadow-2xl"
                  >
                    <div className="aspect-video bg-gray-900 flex items-center justify-center rounded-lg p-6">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-orange-500 bg-clip-text text-transparent">Review Generator Demo</h3>
                        <p className="text-gray-400 mb-6">
                          Our Review Generator tool helps businesses collect authentic testimonials from satisfied customers. 
                          Try our demo versions below.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                          <Button 
                            onClick={() => window.open("/embed/review-generator", "_blank")}
                            variant="outline"
                          >
                            Standard Version
                          </Button>
                          <Button 
                            onClick={() => window.open("/review-generator", "_blank")}
                            variant="outline"
                          >
                            Premium Version
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            <section className="py-16 md:py-24 bg-gray-900">
              <div className="container mx-auto px-4">
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="max-w-4xl mx-auto"
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Implementation Process</h2>
                  
                  <div className="grid grid-cols-1 gap-8">
                    <motion.div
                      variants={fadeIn}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="bg-gray-900/50 p-8 rounded-lg"
                    >
                      <h3 className="text-xl font-bold mb-4">How We Implement Review Generators</h3>
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                            <span className="text-accent font-bold">1</span>
                          </div>
                          <div>
                            <h4 className="text-lg font-medium mb-2">Initial Setup</h4>
                            <p className="text-muted-foreground">
                              Our team configures the review generator with your business details, including name, industry, services offered, and key selling points. We customize the appearance to match your website's branding.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                            <span className="text-accent font-bold">2</span>
                          </div>
                          <div>
                            <h4 className="text-lg font-medium mb-2">Integration</h4>
                            <p className="text-muted-foreground">
                              The review generator can be integrated into your website in multiple ways - as a dedicated page, embedded in existing pages, or as a popup. We handle all the technical implementation.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                            <span className="text-accent font-bold">3</span>
                          </div>
                          <div>
                            <h4 className="text-lg font-medium mb-2">Testing & Training</h4>
                            <p className="text-muted-foreground">
                              We test all functionality to ensure seamless operation and train your team on how to maximize the tool's effectiveness in your customer interaction processes.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </section>

            <div className="py-16 md:py-24 bg-gray-900 rounded-lg mb-10 relative z-10">
              <div className="container mx-auto px-4 text-center">
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="max-w-3xl mx-auto"
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Boost Your Business Reputation?</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Contact us today to get your customized Review Generator tool set up for your business website.
                  </p>
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 px-8"
                    onClick={() => {
                      // Scroll to the contact section in the footer
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Get Started
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewGeneratorsPage;