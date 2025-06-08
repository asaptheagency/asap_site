import React from "react";
import { motion } from "framer-motion";
import { slideFromBottom } from "../../lib/animations";
import ContactButton from "../../components/ContactButton";
import SEOHead from "../../components/SEOHead";
import FloatingElements from "../../components/FloatingElements";
import ImageWithFallback from "../../components/ImageWithFallback";
import followUpImage from "../../assets/connect_outreachPro.webp";

const FollowUp: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <SEOHead 
        title="ASAP Connect - OutreachPro" 
        description="Automated outbound calls for follow-ups, appointments, and vendor orders. Let Veronica handle all your business communications."
        imageUrl={followUpImage}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gray-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <ImageWithFallback
            src={followUpImage}
            fallbackSrc={followUpImage}
            alt="ASAP Connect - Follow-Up"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            OutreachPro
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
                🚀 Boost Your Business with ASAP Connect - OutreachPro
              </h3>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Tired of your employees spending hours on outbound calls? Let ASAP Connect - OutreachPro handle it all for you! Whether it's following up with customers, scheduling appointments, or placing orders with vendors, our AI-powered agent Veronica is designed to take the load off your team and streamline your operations.
              </p>
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
                How it works:
              </h4>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-black/50 rounded-xl p-6 border border-gray-700">
                  <h5 className="text-xl font-bold mb-4 text-teal-400">Automated Follow-Ups</h5>
                  <p className="text-gray-300">
                    Veronica will call your customers to follow up on pending actions, ensuring no lead falls through the cracks.
                  </p>
                </div>
                <div className="bg-black/50 rounded-xl p-6 border border-gray-700">
                  <h5 className="text-xl font-bold mb-4 text-orange-400">Appointment Scheduling</h5>
                  <p className="text-gray-300">
                    From customer meetings to service appointments, Veronica will efficiently schedule and confirm appointments on your behalf.
                  </p>
                </div>
                <div className="bg-black/50 rounded-xl p-6 border border-gray-700">
                  <h5 className="text-xl font-bold mb-4 text-teal-400">Order Placement</h5>
                  <p className="text-gray-300">
                    Need to place orders with your vendors? Veronica can make those calls, ensuring your inventory is always stocked without the need for your team to spend time on the phone.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Why Choose OutreachPro Section */}
            <motion.div
              variants={slideFromBottom}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mb-16"
            >
              <h4 className="text-2xl md:text-3xl font-bold mb-8 text-white text-center">
                Why Choose ASAP Connect - OutreachPro?
              </h4>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-teal-500/10 to-black/50 rounded-xl p-6 border border-teal-400/20">
                  <h5 className="text-xl font-bold mb-3 text-teal-400">
                    Save Time & Resources
                  </h5>
                  <p className="text-gray-300">
                    With Veronica managing your outbound calls, your employees can focus on higher-value tasks.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/10 to-black/50 rounded-xl p-6 border border-orange-400/20">
                  <h5 className="text-xl font-bold mb-3 text-orange-400">
                    Consistency & Efficiency
                  </h5>
                  <p className="text-gray-300">
                    Veronica ensures every call is made promptly, consistently, and professionally.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-teal-500/10 to-black/50 rounded-xl p-6 border border-teal-400/20">
                  <h5 className="text-xl font-bold mb-3 text-teal-400">
                    Customizable for Your Business
                  </h5>
                  <p className="text-gray-300">
                    From follow-ups to vendor orders, Veronica can be customized to handle any outbound call task that your business needs.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Get Started Today Section */}
            <motion.div
              variants={slideFromBottom}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mb-16"
            >
              <div className="bg-gradient-to-r from-gray-800/50 to-black/50 rounded-xl p-8 border border-gray-600 text-center">
                <h4 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                  Get Started Today
                </h4>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  We're so confident that ASAP Connect - OutreachPro will transform your business operations that we offer a satisfaction guarantee. If you're not completely satisfied with the results after a week of using Veronica, we'll work with you until we make it right.
                </p>
                <p className="text-xl font-bold text-teal-400 mb-4">
                  Click the link below to get started and let Veronica handle your outbound calls so you can focus on growing your business!
                </p>
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
                  Streamline Your Operations with OutreachPro
                </h3>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Ready to eliminate time-consuming outbound calls from your team's workload? Let Veronica handle customer follow-ups, appointment scheduling, and vendor communications. Schedule your consultation to see how OutreachPro can transform your business operations.
                </p>
                <div className="bg-gradient-to-r from-teal-500/20 to-orange-500/20 rounded-xl p-8 border border-teal-400/30">
                  <h4 className="text-2xl font-bold text-teal-400 mb-4">
                    Book Your OutreachPro Automation Consultation
                  </h4>
                  <p className="text-lg text-white mb-6">
                    Join hundreds of businesses who've automated their outbound communications and reclaimed valuable time with our AI calling system.
                  </p>
                  
                  <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-700 bg-white">
                    <iframe 
                      src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1drKUCVOMA5usQoGlPHT9SYyEk777PMSRkNh2OvjkNbHkazJ-UwXZ-tzU3sk-FEgPNTMJXB7H0?gv=true" 
                      style={{ border: 0, backgroundColor: 'white' }} 
                      width="100%" 
                      height="600" 
                      frameBorder="0"
                      title="Schedule Your OutreachPro Consultation"
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

export default FollowUp;