/*
 * Enhanced component with styling that matches the other service pages exactly
 * while maintaining stability for refresh
 */

import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactButton from "../../components/ContactButton";
import FloatingElements from "../../components/FloatingElements";
import { reviewGeneratorsImage } from "../../assets";
import ImageWithFallback from "../../components/ImageWithFallback";
import SEOHead from "../../components/SEOHead";
import { motion } from "framer-motion";
import { fadeIn, slideFromLeft, slideFromRight } from "../../lib/animations";

// This version matches the look and feel of other service pages for consistency
const ReviewGeneratorsSimple: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <SEOHead
        title="Review Generators - AI-Powered Review Tools"
        description="Boost your business reputation with our AI-powered review generation tools. Help customers provide authentic, meaningful feedback with just a few clicks."
        imageUrl={reviewGeneratorsImage}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gray-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <ImageWithFallback
            src={reviewGeneratorsImage}
            fallbackSrc="/review_gen.jpeg"
            alt="Review Generators"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            Review Generators
          </h1>
        </div>
      </section>
      
      {/* Transition connector from Hero to Content */}
      <div className="h-16 bg-gradient-to-b from-[rgba(75,184,166,0.2)] to-[rgba(75,184,166,0.2)]"></div>
      
      {/* Content Section */}
      <main className="relative flex-grow">
        {/* Background with floating elements */}
        <FloatingElements className="absolute inset-0" />
        
        <div className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            {/* First Section */}
            <section className="py-16 bg-background/40 rounded-lg mb-10 relative z-10 border border-accent/20 shadow-lg backdrop-blur-sm">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <motion.div
                    variants={slideFromLeft}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold">Boost Your Business Reputation</h2>
                    <p className="text-lg text-gray-300">
                      Our AI-powered Review Generator tools streamline the customer feedback process. With just a click, these tools create authentic-sounding reviews, copy them to the user's clipboard, and direct them to your Google Maps business profile to leave a review.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-accent">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </div>
                        <p className="text-gray-300">Uses AI to generate professional, personalized reviews based on your business strengths</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-accent">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </div>
                        <p className="text-gray-300">Automatically copies generated reviews to clipboard for easy posting</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-accent">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </div>
                        <p className="text-gray-300">Directs users to your Google Maps business page to increase review count</p>
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
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-orange-500 bg-clip-text text-transparent">Review Generator Demo</h3>
                        <p className="text-gray-300 mb-6">
                          Our Review Generator tool helps businesses collect authentic testimonials from satisfied customers. Try our demo versions below.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                          <a 
                            href="/embed/review-generator" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-700/50 transition duration-200 text-center"
                          >
                            Standard Version
                          </a>
                          <a 
                            href="/review-generator" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-700/50 transition duration-200 text-center"
                          >
                            Premium Version
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Second Section */}
            <section className="py-16 bg-accent/5 backdrop-blur-sm rounded-lg mb-10 border border-accent/10 relative z-10">
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
                    <div className="space-y-8">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                          <span className="text-accent font-bold">1</span>
                        </div>
                        <div>
                          <h4 className="text-xl font-medium mb-2">Initial Setup</h4>
                          <p className="text-gray-300">
                            Our team configures the review generator with your business details, including name, industry, services offered, and key selling points. We customize the appearance to match your website's branding.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                          <span className="text-accent font-bold">2</span>
                        </div>
                        <div>
                          <h4 className="text-xl font-medium mb-2">Integration</h4>
                          <p className="text-gray-300">
                            The review generator can be integrated into your website in multiple ways - as a dedicated page, embedded in existing pages, or as a popup. We handle all the technical implementation.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                          <span className="text-accent font-bold">3</span>
                        </div>
                        <div>
                          <h4 className="text-xl font-medium mb-2">Testing & Training</h4>
                          <p className="text-gray-300">
                            We test all functionality to ensure seamless operation and train your team on how to maximize the tool's effectiveness in your customer interaction processes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* CTA Section - different background */}
            <section className="py-16 bg-gradient-to-br from-teal-900/20 to-black/40 backdrop-blur-sm rounded-lg border border-teal-500/10 relative z-10">
              <div className="container mx-auto px-4 text-center">
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="max-w-3xl mx-auto"
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Boost Your Business Reputation?</h2>
                  <p className="text-lg text-gray-300 mb-8">
                    Contact us today to get your customized Review Generator tool set up for your business website.
                  </p>
                  <ContactButton />
                </motion.div>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReviewGeneratorsSimple;
