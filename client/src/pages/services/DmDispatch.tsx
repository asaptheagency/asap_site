import React from "react";
import { motion } from "framer-motion";
import { slideFromBottom } from "../../lib/animations";
import ContactButton from "../../components/ContactButton";
import SEOHead from "../../components/SEOHead";
import FloatingElements from "../../components/FloatingElements";
import ImageWithFallback from "../../components/ImageWithFallback";
import dmDispatchImage from "../../assets/chat_dmDispatch_new.jpg";

const DmDispatch: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <SEOHead 
        title="ASAP Chat - DM Dispatch" 
        description="Sophie automatically responds to your social media DMs, engaging leads and customers 24/7 with personalized conversations."
        imageUrl={dmDispatchImage}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gray-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <ImageWithFallback
            src={dmDispatchImage}
            fallbackSrc={dmDispatchImage}
            alt="ASAP Chat - DM Dispatch"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            DM Dispatch
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-white/80 mt-4">
            ASAP Chat
          </h2>
        </div>
      </section>
      
      {/* Transition connector from Hero to Content */}
      <div className="h-16 bg-gradient-to-b from-[rgba(75,184,166,0.2)] to-[rgba(75,184,166,0.2)]"></div>
      
      {/* Content Section */}
      <main className="relative flex-grow">
        <FloatingElements className="absolute inset-0" />
        
        <div className="relative bg-gradient-to-b from-[rgba(75,184,166,0.2)] via-[rgba(75,184,166,0.1)] to-black">
          <div className="container mx-auto px-4 py-20 relative z-10">
            <motion.div
              className="bg-background/60 backdrop-blur-md rounded-lg p-8 border border-accent/10 shadow-2xl"
              variants={slideFromBottom}
              initial="hidden"
              animate="show"
            >
              <div className="prose prose-lg prose-invert max-w-none">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    🎉 Introducing ASAP Chat – DM Dispatch
                  </h2>
                  <h3 className="text-xl md:text-2xl text-accent mb-6">
                    Powered by Sophie, the AI Assistant
                  </h3>
                  <p className="text-lg text-white/80 max-w-4xl mx-auto">
                    📲 Boost Your Engagement, Automate Your DMs, and Save Time!
                  </p>
                </div>

                <div className="mb-12">
                  <p className="text-lg text-white/90 leading-relaxed mb-6">
                    Do you find yourself overwhelmed by endless direct messages on social media? Are you missing out on valuable conversations simply because you can't keep up with the volume? Say hello to ASAP Chat – DM Dispatch, your solution for automating direct messages, powered by Sophie, our intelligent AI assistant.
                  </p>
                  <p className="text-lg text-white/90 leading-relaxed mb-6">
                    Sophie is designed to respond to DMs quickly, effectively, and in a personalized way. Whether it's answering common questions, providing product info, or engaging with potential leads, Sophie's got it covered.
                  </p>
                </div>

                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-accent mb-6">How Does It Work?</h3>
                  <div className="grid md:grid-cols-1 gap-6">
                    <div className="bg-white/5 p-6 rounded-lg border border-accent/20">
                      <h4 className="text-xl font-semibold text-white mb-3">• Automated Responses</h4>
                      <p className="text-white/80">
                        Sophie answers DMs on your behalf, providing fast, relevant answers to your customers.
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-lg border border-accent/20">
                      <h4 className="text-xl font-semibold text-white mb-3">• Instant Engagement</h4>
                      <p className="text-white/80">
                        Don't leave your customers waiting! Sophie responds immediately, creating a seamless experience that boosts engagement and keeps your brand in the spotlight.
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-lg border border-accent/20">
                      <h4 className="text-xl font-semibold text-white mb-3">• Customized Conversations</h4>
                      <p className="text-white/80">
                        With Sophie's ability to adapt, you can set up specific flows and responses tailored to your business, products, and customer needs.
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-lg border border-accent/20">
                      <h4 className="text-xl font-semibold text-white mb-3">• 24/7 Availability</h4>
                      <p className="text-white/80">
                        Never miss a message. Sophie operates around the clock, ensuring you never lose touch with a potential lead, even when you're asleep!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-accent mb-6">Why Choose ASAP Chat – DM Dispatch?</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/5 p-6 rounded-lg border border-accent/20">
                      <h4 className="text-xl font-semibold text-white mb-3">• Save Time</h4>
                      <p className="text-white/80">
                        Stop wasting hours each week responding to the same questions over and over. Let Sophie handle it for you.
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-lg border border-accent/20">
                      <h4 className="text-xl font-semibold text-white mb-3">• Increase Efficiency</h4>
                      <p className="text-white/80">
                        With automated responses, your team can focus on higher-value tasks and engage with customers in a more meaningful way.
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-lg border border-accent/20">
                      <h4 className="text-xl font-semibold text-white mb-3">• Maximize Lead Conversion</h4>
                      <p className="text-white/80">
                        Faster response times mean higher chances of converting leads into customers. Sophie qualifies and engages leads, giving you more opportunities to close deals.
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-lg border border-accent/20">
                      <h4 className="text-xl font-semibold text-white mb-3">• Boost Your Brand Presence</h4>
                      <p className="text-white/80">
                        Stay top of mind with customers who appreciate immediate responses. Fast replies can build trust and enhance customer satisfaction.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center bg-gradient-to-r from-accent/20 to-purple-500/20 p-8 rounded-lg border border-accent/30">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Ready to Scale Your Social Media Engagement?
                  </h3>
                  <p className="text-lg text-white/90 mb-6 max-w-4xl mx-auto">
                    Book a free demo today and see how ASAP Chat – DM Dispatch can revolutionize your direct message handling with Sophie!
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
                  Automate Your Social Media with AI-Powered DM Management
                </h3>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Ready to transform your social media engagement? Let Sophie handle your DMs while you focus on growing your business. Schedule your strategy session to discover how our DM Dispatch service can boost your social media presence.
                </p>
                <div className="bg-gradient-to-r from-accent/20 to-purple-500/20 rounded-xl p-8 border border-accent/30">
                  <h4 className="text-2xl font-bold text-accent mb-4">
                    Book Your DM Automation Consultation
                  </h4>
                  <p className="text-lg text-white mb-6">
                    Join successful businesses who've automated their social media engagement and seen immediate results with our AI chat system.
                  </p>
                  
                  <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-700 bg-white">
                    <iframe 
                      src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1drKUCVOMA5usQoGlPHT9SYyEk777PMSRkNh2OvjkNbHkazJ-UwXZ-tzU3sk-FEgPNTMJXB7H0?gv=true" 
                      style={{ border: 0, backgroundColor: 'white' }} 
                      width="100%" 
                      height="600" 
                      frameBorder="0"
                      title="Schedule Your DM Dispatch Consultation"
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

export default DmDispatch;