import React from "react";
import { motion } from "framer-motion";
import { slideFromBottom } from "../../lib/animations";
import ContactButton from "../../components/ContactButton";
import SEOHead from "../../components/SEOHead";
import FloatingElements from "../../components/FloatingElements";
import { robotRooferImage } from "../../assets";
import ImageWithFallback from "../../components/ImageWithFallback";

const Contractors: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <SEOHead 
        title="Roofers - Growth Systems" 
        description="Growth systems built for roofing companies ready to scale. Roofing is Competitive. Your System Should Give You the Edge."
        imageUrl={robotRooferImage}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gray-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <ImageWithFallback
            src={robotRooferImage}
            fallbackSrc={robotRooferImage}
            alt="Roofing Contractor Digital Solutions"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            Roofers
          </h1>
          <p className="text-xl text-white/80 mt-4">Growth systems built for roofing companies ready to scale.</p>
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
                    Roofing is Competitive. Your System Should Give You the <span className="text-accent italic">Edge</span>
                  </h2>
                </div>
                
                <div className="relative z-10">
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-lg text-muted-foreground">
                      From storm chasing to local replacement jobs, most roofing companies miss out on leads because their website is just a brochure. We build systems that work like an aggressive salesperson — attracting, qualifying, and booking high-value clients automatically.
                    </p>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      If you want to compete in today's roofing market, you need more than a nice logo. You need automation, trust signals, and a digital experience that closes the deal.
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
                      <h3 className="text-xl font-semibold text-accent">Lead Magnet</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">Get booked online — even while you're on a roof.</p>
                    <ul className="space-y-2 text-muted-foreground mb-6">
                      <li className="flex items-start"><span className="text-accent mr-2">•</span>Roofing website with lead-focused design complete with calls to action and a funnel-like flow</li>
                      <li className="flex items-start"><span className="text-accent mr-2">•</span>ASAP's proprietary&nbsp;<a href="services/review-generators" className="text-accent underline hover:text-accent/80">"Review Generator"</a></li>
                      <li className="flex items-start"><span className="text-accent mr-2">•</span>AI customer service text chatbot on website to answer customer inquiries</li>
                      <li className="flex items-start"><span className="text-accent mr-2">•</span>Estimate/inspection request form (to inbox or Google Sheet)</li>
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
                      <h3 className="text-xl font-semibold text-orange-400">Local Trust Builder</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">Be the first roofer they find — and trust.</p>
                    <ul className="space-y-2 text-muted-foreground mb-6">
                      <li className="flex items-start"><span className="text-orange-400 mr-2">•</span>All of Tier 1</li>
                      <li className="flex items-start"><span className="text-orange-400 mr-2">•</span>Google Business optimization</li>
                      <li className="flex items-start"><span className="text-orange-400 mr-2">•</span>AI lead capture text chatbot on website</li>
                      <li className="flex items-start"><span className="text-orange-400 mr-2">•</span>Testimonial and before/after gallery</li>
                      <li className="flex items-start"><span className="text-orange-400 mr-2">•</span>SEO blogging</li>
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
                      <h3 className="text-xl font-semibold text-purple-400">Stormproof System</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">Run your roofing business on autopilot.</p>
                    <ul className="space-y-2 text-muted-foreground mb-6">
                      <li className="flex items-start"><span className="text-purple-400 mr-2">•</span>All of Tier 2</li>
                      <li className="flex items-start"><span className="text-purple-400 mr-2">•</span>Smart chatbot lead qualification</li>
                      <li className="flex items-start"><span className="text-purple-400 mr-2">•</span>AI voice agent to answer + follow up with leads</li>
                      <li className="flex items-start"><span className="text-purple-400 mr-2">•</span>Email/SMS automations for unclosed jobs</li>
                      <li className="flex items-start"><span className="text-purple-400 mr-2">•</span>CRM integration for full visibility</li>
                      <li className="flex items-start"><span className="text-purple-400 mr-2">•</span>Retargeting-ready storm-specific landing pages for ads</li>
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
                    Why Choose <span className="text-accent italic">ASAP</span> for Your Roofing Company?
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div 
                    className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300"
                    whileHover={{ 
                      rotate: -2,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <h3 className="text-xl font-bold mb-4">Storm Season-Ready</h3>
                    <p className="text-muted-foreground">
                      Add or remove landing pages instantly when storms hit
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300"
                    whileHover={{ 
                      rotate: -2,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <h3 className="text-xl font-bold mb-4">Built to Convert</h3>
                    <p className="text-muted-foreground">
                      Every element is optimized to drive inspections and estimates
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300"
                    whileHover={{ 
                      rotate: -2,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <h3 className="text-xl font-bold mb-4">Locally Tuned</h3>
                    <p className="text-muted-foreground">
                      SEO and Google Business tuned for your market
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300"
                    whileHover={{ 
                      rotate: -2,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <h3 className="text-xl font-bold mb-4">Lead Follow-Up Done for You</h3>
                    <p className="text-muted-foreground">
                      Never forget to chase a job again
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
                  You're already great at roofs. We'll handle the rest.
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

export default Contractors;