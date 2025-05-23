import React from "react";
import { motion } from "framer-motion";
import { slideFromBottom } from "../../lib/animations";
import ContactButton from "../../components/ContactButton";
import SEOHead from "../../components/SEOHead";
import FloatingElements from "../../components/FloatingElements";
import { robotPdrImage } from "../../assets";
import ImageWithFallback from "../../components/ImageWithFallback";

const PdrShops: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <SEOHead 
        title="PDR Shops - Websites and Automation" 
        description="Websites and automation built for paintless dent repair businesses. Get More Jobs Without Doing More Work with systems designed for PDR shops."
        imageUrl={robotPdrImage}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gray-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <ImageWithFallback
            src={robotPdrImage}
            fallbackSrc={robotPdrImage}
            alt="PDR Shop Digital Solutions"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            PDR Shops
          </h1>
          <p className="text-xl text-white/80 mt-4">Websites and automation built for paintless dent repair businesses</p>
        </div>
      </section>
      
      {/* Transition connector from Hero to Content */}
      <div className="h-16 bg-gradient-to-b from-[rgba(75,184,166,0.2)] to-[rgba(75,184,166,0.2)]"></div>
      
      {/* Content Section */}
      <main className="relative flex-grow">
        {/* Background with floating elements */}
        <FloatingElements className="absolute inset-0" />
        
        <div className="relative z-10 py-20">
          <div className="container mx-auto px-4">
            {/* First Section */}
            <motion.section 
              className="py-16 bg-background/40 rounded-lg mb-10 relative z-10 border border-accent/20 shadow-lg backdrop-blur-sm"
              variants={slideFromBottom}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Get More Jobs Without Doing More <span className="text-accent italic">Work</span>
                  </h2>
                </div>
                
                <div className="relative z-10">
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-lg text-muted-foreground">
                      You fix dents. We fix your website, your lead funnel, and your follow-up system.
                    </p>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      Too many PDR shops rely on referrals and word-of-mouth. That's great until things slow down. Your business deserves a system that captures local searches and turns them into booked jobs — without more calls, texts, or missed opportunities.
                    </p>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      We design systems that turn your website into your most valuable tool — even more valuable than your PDR light.
                    </p>

                    <h3 className="text-xl font-semibold text-accent mb-4">What You Get:</h3>
                    <ul className="mt-6 space-y-3">
                      <li className="flex items-start text-muted-foreground">
                        <span className="text-accent mr-2">✓</span>
                        <span><strong>Deep Google Integration:</strong> From reviews to calendars to lead capture, your system works seamlessly with tools your clients already trust — including Google Search, Maps, Sheets, and Calendar.</span>
                      </li>
                      <li className="flex items-start text-muted-foreground">
                        <span className="text-accent mr-2">✓</span>
                        <span>A conversion-first site that brings in estimate requests</span>
                      </li>
                      <li className="flex items-start text-muted-foreground">
                        <span className="text-accent mr-2">✓</span>
                        <span>Automated tools to follow up with leads</span>
                      </li>
                      <li className="flex items-start text-muted-foreground">
                        <span className="text-accent mr-2">✓</span>
                        <span>An optional growth engine that builds local visibility and trust</span>
                      </li>
                    </ul>
                  </div>
                  
                  <ContactButton />
                </div>
              </div>
            </motion.section>
            
            {/* Second Section */}
            <motion.section 
              className="py-16 bg-background/30 rounded-lg mb-10 relative z-10 border border-accent/10 shadow-lg backdrop-blur-sm"
              variants={slideFromBottom}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Our Service <span className="text-accent italic">Tiers</span>
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Tier 1 */}
                  <motion.div 
                    className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300"
                    whileHover={{ 
                      rotate: -2,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <span className="bg-accent/20 text-accent rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">1</span>
                      <h3 className="text-xl font-semibold text-accent">Estimate Engine</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">Get a site that works while you're working.</p>
                    <ul className="space-y-2 text-muted-foreground mb-6">
                      <li className="flex items-start"><span className="text-accent mr-2">•</span>Modern PDR website</li>
                      <li className="flex items-start"><span className="text-accent mr-2">•</span>ASAP's proprietary&nbsp;<a href="services/review-generators" className="text-accent underline hover:text-accent/80">"Review Generator"</a></li>
                      <li className="flex items-start"><span className="text-accent mr-2">•</span>AI customer service text chatbot on website to answer customer inquiries</li>
                      <li className="flex items-start"><span className="text-accent mr-2">•</span>Booking or estimate form (syncs to email or Google Sheet)</li>
                      <li className="flex items-start"><span className="text-accent mr-2">•</span>Google calendar integration</li>
                      <li className="flex items-start"><span className="text-accent mr-2">•</span>Hosting + domain setup</li>
                    </ul>
                  </motion.div>
                  
                  {/* Tier 2 */}
                  <motion.div 
                    className="bg-background/60 p-6 rounded-lg border border-orange-500/30 shadow-md hover:shadow-orange-500/10 transition-all duration-300"
                    whileHover={{ 
                      rotate: -2,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <span className="bg-orange-500/20 text-orange-400 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">2</span>
                      <h3 className="text-xl font-semibold text-orange-400">Local Dominator</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">Get found and trusted.</p>
                    <ul className="space-y-2 text-muted-foreground mb-6">
                      <li className="flex items-start"><span className="text-orange-400 mr-2">•</span>All of Tier 1</li>
                      <li className="flex items-start"><span className="text-orange-400 mr-2">•</span>Google Business optimization</li>
                      <li className="flex items-start"><span className="text-orange-400 mr-2">•</span>SEO blogging</li>
                      <li className="flex items-start"><span className="text-orange-400 mr-2">•</span>AI lead capture text chatbot on website</li>
                      <li className="flex items-start"><span className="text-orange-400 mr-2">•</span>Testimonial and before/after gallery</li>
                      <li className="flex items-start"><span className="text-orange-400 mr-2">•</span>Retargeting-ready contact flows</li>
                    </ul>
                  </motion.div>
                  
                  {/* Tier 3 */}
                  <motion.div 
                    className="bg-background/60 p-6 rounded-lg border border-purple-500/30 shadow-md hover:shadow-purple-500/10 transition-all duration-300"
                    whileHover={{ 
                      rotate: -2,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <span className="bg-purple-500/20 text-purple-400 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">3</span>
                      <h3 className="text-xl font-semibold text-purple-400">Shop Streamliner</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">Your silent salesperson.</p>
                    <ul className="space-y-2 text-muted-foreground mb-6">
                      <li className="flex items-start"><span className="text-purple-400 mr-2">•</span>All of Tier 2</li>
                      <li className="flex items-start"><span className="text-purple-400 mr-2">•</span>Smart chatbot lead qualification</li>
                      <li className="flex items-start"><span className="text-purple-400 mr-2">•</span>AI voice agent to answer + follow up with leads</li>
                      <li className="flex items-start"><span className="text-purple-400 mr-2">•</span>Email/SMS automation for missed estimates</li>
                      <li className="flex items-start"><span className="text-purple-400 mr-2">•</span>Retargeting-ready PDR-specific landing pages for ads</li>
                    </ul>
                  </motion.div>
                </div>
                
                <ContactButton className="mt-10" />
              </div>
            </motion.section>

            {/* Why Choose ASAP Section */}
            <motion.section 
              className="py-16 bg-background/30 rounded-lg mb-10 relative z-10 border border-accent/10 shadow-lg backdrop-blur-sm"
              variants={slideFromBottom}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Why Choose <span className="text-accent italic">ASAP</span> for Your PDR Shop?
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <motion.div 
                    className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300"
                    whileHover={{ 
                      rotate: -2,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <h3 className="text-xl font-bold mb-4">Made for Mobile</h3>
                    <p className="text-muted-foreground">
                      Most PDR customers search on their phones. Your site will shine.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300"
                    whileHover={{ 
                      rotate: -2,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <h3 className="text-xl font-bold mb-4">Trust Signals</h3>
                    <p className="text-muted-foreground">
                      Get more Google Maps reviews and display the vehicles that you've repaired proudly
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300"
                    whileHover={{ 
                      rotate: -2,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <h3 className="text-xl font-bold mb-4">Automation Built for Local</h3>
                    <p className="text-muted-foreground">
                      Capture leads, automate replies, book more jobs.
                    </p>
                  </motion.div>
                </div>
                
                <ContactButton className="mt-10" />
              </div>
            </motion.section>

            {/* Next Step Section */}
            <motion.section 
              className="py-16 bg-background/20 rounded-lg mb-10 relative z-10 border border-primary/20 shadow-lg backdrop-blur-sm"
              variants={slideFromBottom}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="container mx-auto px-4 text-center">
                <div className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Next <span className="text-primary italic">Step?</span>
                  </h2>
                </div>
                
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  You're the best in your lane. Let your website prove it.
                </p>
                <a 
                  href="https://calendar.app.google/nuQzaVZ8opKfm8bo8" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-md hover:bg-accent/90 transition duration-300 card-glow-effect accent-glow"
                >
                  Contact Us
                </a>
              </div>
            </motion.section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PdrShops;