import React from 'react';
import { Button } from '../../components/ui/button';
import { motion } from 'framer-motion';
import { fadeIn, slideFromLeft, slideFromRight } from '../../lib/animations';
import ServiceLayout from '../../components/ServiceLayout';
import ServiceSection from '../../components/ServiceSection';
import { ImageWithFallback } from '../../components/ImageWithFallback';
import { useLocation } from 'wouter';

import { reviewGeneratorsImage } from '../../assets';

const ReviewGenerators: React.FC = () => {
  const [, setLocation] = useLocation();

  return (
    <ServiceLayout
      title="Review Generators"
      subtitle="AI-powered review generation tools for your business"
      heroImage="/review_gen.jpeg"
    >
      <ServiceSection className="py-16 md:py-24">
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
      </ServiceSection>

      <ServiceSection dark className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Two Powerful Options</h2>
            <p className="text-lg text-muted-foreground">
              Choose the version that best suits your business needs and budget
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-gray-900/50 p-6 rounded-lg border border-gray-800"
            >
              <div className="text-accent mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5" />
                  <path d="M5 12h14" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Basic Version</h3>
              <h4 className="text-lg text-accent mb-4">One-Click Generation</h4>
              <p className="text-muted-foreground mb-6">
                A streamlined, single-button generator that creates random positive reviews for your business. Perfect for businesses wanting a simple solution.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>One-click review generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Customizable business details via URL parameters</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Compact design for easy embedding</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Random review styles and lengths</span>
                </li>
              </ul>
              <Button
                onClick={() => window.open("/embed/review-generator", "_blank")}
                className="w-full"
                variant="outline"
              >
                Try Basic Version
              </Button>
            </motion.div>

            <motion.div
              variants={slideFromRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 p-6 rounded-lg border border-accent/30"
            >
              <div className="text-accent mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.2 7.8l-7.7 7.7-4-4" />
                  <path d="M4 12V4h16v16H4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Version</h3>
              <h4 className="text-lg text-accent mb-4">Customizable Reviews</h4>
              <p className="text-muted-foreground mb-6">
                An advanced generator with multiple customization options. Ideal for businesses who want more control over their testimonials.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>All Basic Version features</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Customer-selectable review tone (casual, professional, enthusiastic)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Customer-selectable review length</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Additional customization options</span>
                </li>
              </ul>
              <Button
                onClick={() => window.open("/review-generator", "_blank")}
                className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
              >
                Try Premium Version
              </Button>
            </motion.div>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Easy Integration</h2>
            <p className="text-lg text-muted-foreground">
              We handle the entire integration process for our clients
            </p>
          </motion.div>

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
                    <h4 className="text-lg font-medium mb-2">Seamless Website Integration</h4>
                    <p className="text-muted-foreground">
                      We handle the technical implementation, embedding the review generator directly into your website at strategic locations. This can include dedicated review pages, post-purchase confirmation screens, or sidebar widgets.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-accent font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Testing and Optimization</h4>
                    <p className="text-muted-foreground">
                      Our team thoroughly tests the implementation across different devices and browsers to ensure optimal performance. We make adjustments to improve visibility and user engagement based on your specific business needs.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-accent font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Ongoing Support</h4>
                    <p className="text-muted-foreground">
                      We provide continuous technical support and updates to ensure your review generator remains effective and functional. As your business evolves, we can update the tool to reflect new services or selling points.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </ServiceSection>

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
    </ServiceLayout>
  );
};

export default ReviewGenerators;