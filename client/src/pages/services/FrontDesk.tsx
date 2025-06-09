import React from "react";
import { motion } from "framer-motion";
import { slideFromBottom } from "../../lib/animations";
import ContactButton from "../../components/ContactButton";
import SEOHead from "../../components/SEOHead";
import FloatingElements from "../../components/FloatingElements";
import ImageWithFallback from "../../components/ImageWithFallback";
import frontDeskImage from "../../assets/connect_frontDesk_new.jpg";

const FrontDesk: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <SEOHead 
        title="ASAP Connect - Front Desk" 
        description="Inbound voice agent Jessica takes calls just like your receptionist would, checks your Google calendar, and schedules appointments."
        imageUrl={frontDeskImage}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gray-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <ImageWithFallback
            src={frontDeskImage}
            fallbackSrc={frontDeskImage}
            alt="ASAP Connect - Front Desk"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            Front Desk
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
                📞 Elevate Your Customer Experience with ASAP Connect - Front Desk
              </h3>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Say goodbye to missed calls and overloaded receptionists with ASAP Connect - Front Desk! Our inbound AI voice agent, Jessica, works just like a receptionist, handling customer calls seamlessly, scheduling appointments, and providing the information your clients need – all without lifting a finger.
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
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-black/50 rounded-xl p-6 border border-gray-700">
                  <h5 className="text-xl font-bold mb-4 text-teal-400">Professional Call Handling</h5>
                  <p className="text-gray-300">
                    Jessica answers incoming calls, offering a polished, friendly greeting to each caller. She can assist with basic inquiries, book appointments, and direct customers to the right department.
                  </p>
                </div>
                <div className="bg-black/50 rounded-xl p-6 border border-gray-700">
                  <h5 className="text-xl font-bold mb-4 text-orange-400">Appointment Scheduling</h5>
                  <p className="text-gray-300">
                    Direct access to your Google Calendar means Jessica can check availability, schedule appointments, and confirm bookings – all in real-time.
                  </p>
                </div>
                <div className="bg-black/50 rounded-xl p-6 border border-gray-700">
                  <h5 className="text-xl font-bold mb-4 text-teal-400">24/7 Availability</h5>
                  <p className="text-gray-300">
                    No more worrying about after-hours calls. Jessica is always available to ensure your customers are never left hanging.
                  </p>
                </div>
                <div className="bg-black/50 rounded-xl p-6 border border-gray-700">
                  <h5 className="text-xl font-bold mb-4 text-orange-400">Customer Experience at its Best</h5>
                  <p className="text-gray-300">
                    With Jessica, your clients get the same level of service they would expect from a human receptionist—without the need for someone to be physically available at all times.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Why Choose Front Desk Section */}
            <motion.div
              variants={slideFromBottom}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mb-16"
            >
              <h4 className="text-2xl md:text-3xl font-bold mb-8 text-white text-center">
                Why Choose ASAP Connect - Front Desk?
              </h4>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-teal-500/10 to-black/50 rounded-xl p-6 border border-teal-400/20">
                  <h5 className="text-xl font-bold mb-3 text-teal-400">
                    Cost Savings
                  </h5>
                  <p className="text-gray-300">
                    Reduce the need for a full-time receptionist while still offering top-notch customer service.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/10 to-black/50 rounded-xl p-6 border border-orange-400/20">
                  <h5 className="text-xl font-bold mb-3 text-orange-400">
                    Efficiency & Accuracy
                  </h5>
                  <p className="text-gray-300">
                    With seamless integration to your calendar, Jessica ensures appointments are scheduled promptly and accurately.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-teal-500/10 to-black/50 rounded-xl p-6 border border-teal-400/20">
                  <h5 className="text-xl font-bold mb-3 text-teal-400">
                    Scalability
                  </h5>
                  <p className="text-gray-300">
                    Whether you're a small business or a growing enterprise, Jessica can handle as many calls as you need—keeping things efficient as your business scales.
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
                  We're so confident that ASAP Connect - Front Desk will improve your customer service experience that we offer a satisfaction guarantee. If you don't see the improvements you're looking for, we'll work with you until we make it right.
                </p>
                <p className="text-xl font-bold text-teal-400 mb-4">
                  Click below to get started and let Jessica answer your calls, schedule appointments, and take your customer experience to the next level!
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
                  Transform Your Front Desk with Jessica
                </h3>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Ready to eliminate missed calls and provide exceptional customer service around the clock? Let Jessica, our AI receptionist, handle your inbound calls professionally while integrating seamlessly with your Google Calendar for appointment scheduling.
                </p>
                <div className="bg-gradient-to-r from-teal-500/20 to-orange-500/20 rounded-xl p-8 border border-teal-400/30">
                  <h4 className="text-2xl font-bold text-teal-400 mb-4">
                    Book Your Front Desk Automation Consultation
                  </h4>
                  <p className="text-lg text-white mb-6">
                    Discover how businesses are providing 24/7 professional customer service without the overhead of full-time staff.
                  </p>
                  
                  <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-700 bg-white">
                    <iframe 
                      src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1drKUCVOMA5usQoGlPHT9SYyEk777PMSRkNh2OvjkNbHkazJ-UwXZ-tzU3sk-FEgPNTMJXB7H0?gv=true" 
                      style={{ border: 0, backgroundColor: 'white' }} 
                      width="100%" 
                      height="600" 
                      frameBorder="0"
                      title="Schedule Your Front Desk Consultation"
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

export default FrontDesk;