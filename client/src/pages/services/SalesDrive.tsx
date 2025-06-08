import React from "react";
import { motion } from "framer-motion";
import { slideFromBottom } from "../../lib/animations";
import ContactButton from "../../components/ContactButton";
import SEOHead from "../../components/SEOHead";
import FloatingElements from "../../components/FloatingElements";
import ImageWithFallback from "../../components/ImageWithFallback";
import salesDriveImage from "../../assets/asap_connect_sales.webp";

const SalesDrive: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <SEOHead 
        title="ASAP Connect - Sales Drive" 
        description="Our outbound sales agent Veronica makes sales calls for you, checks your Google calendar, and schedules appointments automatically."
        imageUrl={salesDriveImage}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gray-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <ImageWithFallback
            src={salesDriveImage}
            fallbackSrc={salesDriveImage}
            alt="ASAP Connect - Sales Drive"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            Sales Drive
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-white/80 mt-4">
            ASAP Connect
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
              className="text-center max-w-4xl mx-auto"
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-8 text-white">
                🚗 Drive Your Sales with ASAP Connect - Sales Drive! 🚗
              </h3>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Struggling to reach enough prospects or close enough deals? Let ASAP Connect - Sales Drive turbocharge your sales efforts with AI-powered outbound calling!
              </p>
            </motion.div>

            {/* What is ASAP Connect - Sales Drive Section */}
            <motion.div
              variants={slideFromBottom}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mb-16"
            >
              <div className="bg-gradient-to-r from-teal-500/10 to-orange-500/10 rounded-xl p-8 border border-teal-400/20">
                <h4 className="text-2xl md:text-3xl font-bold mb-6 text-teal-400">
                  🔊 What is ASAP Connect - Sales Drive?
                </h4>
                <p className="text-lg text-gray-300 leading-relaxed">
                  With ASAP Connect - Sales Drive, we harness the power of Veronica, our AI agent, to make sales calls for you. Whether you're targeting new leads or following up with past prospects, Veronica's got you covered—working tirelessly to push your sales further.
                </p>
              </div>
            </motion.div>

            {/* How It Works Section */}
            <motion.div
              variants={slideFromBottom}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mb-16"
            >
              <h4 className="text-2xl md:text-3xl font-bold mb-8 text-white text-center">
                💼 How It Works:
              </h4>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-black/50 rounded-xl p-6 border border-gray-700">
                  <h5 className="text-xl font-bold mb-4 text-teal-400">Setup Phase</h5>
                  <p className="text-gray-300">
                    We set up Veronica for your business: After understanding your needs and sales goals, we customize Veronica's calling script and set her to work on your leads.
                  </p>
                </div>
                <div className="bg-black/50 rounded-xl p-6 border border-gray-700">
                  <h5 className="text-xl font-bold mb-4 text-orange-400">AI-Powered Calls</h5>
                  <p className="text-gray-300">
                    Veronica reaches out to your prospects, makes introductions, answers basic questions, and qualifies leads, all while sounding natural and professional.
                  </p>
                </div>
                <div className="bg-black/50 rounded-xl p-6 border border-gray-700">
                  <h5 className="text-xl font-bold mb-4 text-teal-400">Seamless Integration</h5>
                  <p className="text-gray-300">
                    The leads Veronica qualifies are scheduled directly into your calendar for easy follow-up by your team, ready to close the deal.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Why Choose Sales Drive Section */}
            <motion.div
              variants={slideFromBottom}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mb-16"
            >
              <h4 className="text-2xl md:text-3xl font-bold mb-8 text-white text-center">
                Why ASAP Connect - Sales Drive?
              </h4>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-teal-500/10 to-black/50 rounded-xl p-6 border border-teal-400/20">
                  <h5 className="text-xl font-bold mb-3 text-teal-400">
                    🔑 Automate Your Sales Calls
                  </h5>
                  <p className="text-gray-300">
                    Say goodbye to time-consuming cold calls and missed opportunities. Veronica efficiently reaches out to prospects, giving your sales team more time to close deals and drive revenue.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/10 to-black/50 rounded-xl p-6 border border-orange-400/20">
                  <h5 className="text-xl font-bold mb-3 text-orange-400">
                    📈 Increase Conversion Rates
                  </h5>
                  <p className="text-gray-300">
                    By having Veronica make your sales calls, you can ensure every lead is followed up on, no matter the time of day or the number of calls it takes. This persistent approach helps maximize your conversion rates.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-teal-500/10 to-black/50 rounded-xl p-6 border border-teal-400/20">
                  <h5 className="text-xl font-bold mb-3 text-teal-400">
                    💬 Personalized, Scalable Outreach
                  </h5>
                  <p className="text-gray-300">
                    We customize each call script to match your brand and audience, ensuring the conversation feels natural. Plus, as your business grows, Veronica can scale with you, handling thousands of calls efficiently.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/10 to-black/50 rounded-xl p-6 border border-orange-400/20">
                  <h5 className="text-xl font-bold mb-3 text-orange-400">
                    🚀 Boost Your Sales Pipeline
                  </h5>
                  <p className="text-gray-300">
                    Don't let opportunities slip through the cracks. ASAP Connect - Sales Drive is designed to keep your sales pipeline full by continually engaging and nurturing leads on your behalf.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Ready to See More Sales Section */}
            <motion.div
              variants={slideFromBottom}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mb-16"
            >
              <div className="bg-gradient-to-r from-gray-800/50 to-black/50 rounded-xl p-8 border border-gray-600 text-center">
                <h4 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                  Ready to See More Sales?
                </h4>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  We're confident that ASAP Connect - Sales Drive can fuel your sales success. Imagine having Veronica on your side, handling outbound calls and generating quality leads—so you can focus on closing deals.
                </p>
                <p className="text-xl font-bold text-teal-400 mb-4">
                  🎯 Get started now and start driving sales with Veronica today!
                </p>
                <div className="bg-black/30 rounded-lg p-4 border border-teal-400/30">
                  <p className="text-lg font-semibold text-white">
                    ASAP Connect - Sales Drive: Driving Revenue, One Call at a Time.
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
                  Scale Your Sales with AI-Powered Outbound Calling
                </h3>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Ready to supercharge your outbound sales efforts? Let Veronica, our advanced AI sales agent, handle your prospecting calls while you focus on closing deals. Schedule your strategy session to discover how our Sales Drive service can multiply your revenue streams.
                </p>
                <div className="bg-gradient-to-r from-teal-500/20 to-orange-500/20 rounded-xl p-8 border border-teal-400/30">
                  <h4 className="text-2xl font-bold text-teal-400 mb-4">
                    Book Your Sales Acceleration Consultation
                  </h4>
                  <p className="text-lg text-white mb-6">
                    Join successful businesses who've automated their sales process and seen immediate results with our AI calling system.
                  </p>
                  
                  <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-700 bg-white">
                    <iframe 
                      src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1drKUCVOMA5usQoGlPHT9SYyEk777PMSRkNh2OvjkNbHkazJ-UwXZ-tzU3sk-FEgPNTMJXB7H0?gv=true" 
                      style={{ border: 0, backgroundColor: 'white' }} 
                      width="100%" 
                      height="600" 
                      frameBorder="0"
                      title="Schedule Your Sales Drive Consultation"
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

export default SalesDrive;