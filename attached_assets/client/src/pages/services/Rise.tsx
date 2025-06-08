import React from "react";
import { motion } from "framer-motion";
import { slideFromBottom } from "../../lib/animations";
import ContactButton from "../../components/ContactButton";
import SEOHead from "../../components/SEOHead";
import FloatingElements from "../../components/FloatingElements";
import ImageWithFallback from "../../components/ImageWithFallback";
import riseImage from "../../assets/rise.webp";

const Rise: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <SEOHead 
        title="R.I.S.E. - Revive Inactive Sales Engagements" 
        description="Our text agent Alina revives your dead leads through automated text messaging, putting them back into your sales process."
        imageUrl={riseImage}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gray-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <ImageWithFallback
            src={riseImage}
            fallbackSrc={riseImage}
            alt="R.I.S.E. - Revive Inactive Sales Engagements"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            R.I.S.E.
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-white/80 mt-4">
            Revive Inactive Sales Engagements
          </h2>
        </div>
      </section>
      
      {/* Transition connector from Hero to Content */}
      <div className="h-16 bg-gradient-to-b from-[rgba(75,184,166,0.2)] to-[rgba(75,184,166,0.2)]"></div>
      
      {/* Content Section */}
      <main className="relative flex-grow">
        <FloatingElements className="absolute inset-0" />
        
        <div className="relative bg-gradient-to-b from-[rgba(75,184,166,0.2)] via-[rgba(75,184,166,0.1)] to-black">
          {/* <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#4BD0A0_1px,transparent_1px)] bg-[length:20px_20px]"></div> */}
          
          <div className="container mx-auto px-4 py-20 relative z-10">
            <motion.div
              variants={slideFromBottom}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h3 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                  🌟 Revive Your Sales with R.I.S.E. 🌟
                </h3>
                <p className="text-2xl md:text-3xl font-semibold mb-8 text-teal-400">
                  The Ultimate Lead Engagement System!
                </p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 mb-12 border border-teal-500/30">
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Is your sales pipeline filled with dead leads? Don't let them collect dust any longer!
                </p>
                
                <p className="text-lg text-white mb-8 leading-relaxed">
                  Introducing <span className="text-teal-400 font-bold">R.I.S.E. (Revive Inactive Sales Engagements)</span> — the game-changing service that re-engages your old leads and puts them back into your sales process.
                </p>

                <h4 className="text-2xl font-bold text-orange-400 mb-6">💬 How it Works:</h4>
                <ul className="space-y-4 text-lg text-gray-300 mb-8">
                  <li className="flex items-start">
                    <span className="text-teal-400 mr-3 mt-1">•</span>
                    <div>
                      <strong className="text-white">You provide your old leads:</strong> Send us the list of leads that have gone cold or weren't followed up on.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-400 mr-3 mt-1">•</span>
                    <div>
                      <strong className="text-white">Our AI-powered system gets to work:</strong> Using Alina, our advanced text agent, we reinitiate contact with these leads and strategically nurture them with personalized messages.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-400 mr-3 mt-1">•</span>
                    <div>
                      <strong className="text-white">We put the leads back into your sales process:</strong> Once we've re-engaged them, we seamlessly place these revitalized leads into your active sales funnel, giving you another chance to close the deal.
                    </div>
                  </li>
                </ul>

                <h4 className="text-2xl font-bold text-orange-400 mb-6">Why Choose R.I.S.E.?</h4>
                <ul className="space-y-4 text-lg text-gray-300 mb-8">
                  <li className="flex items-start">
                    <span className="text-teal-400 mr-3 mt-1">•</span>
                    <div>
                      <strong className="text-white">Turn Dead Leads into Dollars:</strong> Stop letting your old leads slip away. With R.I.S.E., we breathe new life into them and give you a second shot at success.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-400 mr-3 mt-1">•</span>
                    <div>
                      <strong className="text-white">Save Time and Effort:</strong> Let Alina do the heavy lifting by automating the re-engagement process. No need to waste hours manually reaching out to old prospects.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-400 mr-3 mt-1">•</span>
                    <div>
                      <strong className="text-white">Increase Conversions:</strong> Reconnecting with cold leads can increase your sales opportunities and conversion rates. Some of your best customers might have just slipped through the cracks.
                    </div>
                  </li>
                </ul>

                <div className="bg-teal-900/30 rounded-lg p-6 mb-8 border border-teal-400/50">
                  <h4 className="text-2xl font-bold text-teal-400 mb-4">Our Guarantee to You:</h4>
                  <p className="text-lg text-white leading-relaxed">
                    We're so confident in R.I.S.E. that we guarantee results! If we don't secure a conversion for you in the first 7 days, we'll continue working your leads until we do.
                  </p>
                  <p className="text-lg text-teal-400 font-semibold mt-4">
                    No risk, no worries—just revived sales and new opportunities.
                  </p>
                </div>

                <div className="text-center">
                  <h4 className="text-2xl font-bold text-orange-400 mb-4">Ready to Boost Your Sales?</h4>
                  <p className="text-lg text-gray-300 mb-6">
                    Don't let lost opportunities stay lost. R.I.S.E. is here to help you capture and convert those old leads back into active sales.
                  </p>
                  <p className="text-xl font-bold text-white mb-8">
                    🔗 Get started today and bring your dead leads back to life!
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Calendar Scheduling Section */}
            <motion.div
              variants={slideFromBottom}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mt-16"
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  Transform Your Sales Pipeline Today
                </h3>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Ready to witness the power of R.I.S.E.? Schedule your complimentary strategy session and discover how we can revive your dormant leads into profitable conversions. Our automation experts are standing by to craft a custom solution that fits your business perfectly.
                </p>
                <div className="bg-gradient-to-r from-teal-500/20 to-orange-500/20 rounded-xl p-8 border border-teal-400/30">
                  <h4 className="text-2xl font-bold text-teal-400 mb-4">
                    Book Your Free Consultation
                  </h4>
                  <p className="text-lg text-white mb-6">
                    Join hundreds of businesses who've already transformed their sales with our AI-powered lead revival system.
                  </p>
                  
                  <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-700 bg-white">
                    <iframe 
                      src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1drKUCVOMA5usQoGlPHT9SYyEk777PMSRkNh2OvjkNbHkazJ-UwXZ-tzU3sk-FEgPNTMJXB7H0?gv=true" 
                      style={{ border: 0, backgroundColor: 'white' }} 
                      width="100%" 
                      height="600" 
                      frameBorder="0"
                      title="Schedule Your R.I.S.E. Consultation"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Rise;