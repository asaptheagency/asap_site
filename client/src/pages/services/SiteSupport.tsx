import React from "react";
import { motion } from "framer-motion";
import { slideFromBottom } from "../../lib/animations";
import ContactButton from "../../components/ContactButton";
import SEOHead from "../../components/SEOHead";
import FloatingElements from "../../components/FloatingElements";
import ImageWithFallback from "../../components/ImageWithFallback";
import siteSupportImage from "../../assets/chat_siteSupport_new.webp";

const SiteSupport: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <SEOHead 
        title="ASAP Chat - Site Support" 
        description="Sophie provides instant customer support on your website, answering inquiries and guiding visitors through their questions."
        imageUrl={siteSupportImage}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gray-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <ImageWithFallback
            src={siteSupportImage}
            fallbackSrc={siteSupportImage}
            alt="ASAP Chat - Site Support"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            Site Support
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
                    🎉 Introducing ASAP Chat – Site Support
                  </h2>
                  <h3 className="text-xl md:text-2xl text-accent mb-6">
                    Your AI-Powered Customer Service Assistant
                  </h3>
                  <p className="text-lg text-white/80 max-w-4xl mx-auto">
                    💬 Instant, 24/7 Support for Your Website Visitors
                  </p>
                </div>

                <div className="mb-12">
                  <p className="text-lg text-white/90 leading-relaxed mb-6">
                    Tired of missing out on customer inquiries because your team is busy, or worse—because the visitor just leaves before you can respond? With ASAP Chat – Site Support, your website gets a powerful, intelligent chatbot that's always ready to engage and answer questions — all while freeing up your team to focus on more important tasks.
                  </p>
                </div>

                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-accent mb-6">How Does ASAP Chat – Site Support Work?</h3>
                  <div className="grid md:grid-cols-1 gap-6">
                    <div className="bg-white/5 p-6 rounded-lg border border-accent/20">
                      <h4 className="text-xl font-semibold text-white mb-3">• Instant Responses</h4>
                      <p className="text-white/80">
                        As soon as a visitor lands on your website, Sophie, your AI chatbot assistant, is there to respond. No more waiting. Just immediate answers to customer questions.
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-lg border border-accent/20">
                      <h4 className="text-xl font-semibold text-white mb-3">• Answers Made Easy</h4>
                      <p className="text-white/80">
                        Sophie is programmed to provide clear, accurate responses to common inquiries, helping customers get the information they need—fast.
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-lg border border-accent/20">
                      <h4 className="text-xl font-semibold text-white mb-3">• 24/7 Availability</h4>
                      <p className="text-white/80">
                        Day or night, Sophie is always on your website, ready to respond. You won't miss another customer interaction, even when you're not around.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-accent mb-6">Why Choose ASAP Chat – Site Support?</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/5 p-6 rounded-lg border border-accent/20">
                      <h4 className="text-xl font-semibold text-white mb-3">• Boost Customer Satisfaction</h4>
                      <p className="text-white/80">
                        Visitors appreciate fast, efficient support. With ASAP Chat, they'll never be left hanging.
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-lg border border-accent/20">
                      <h4 className="text-xl font-semibold text-white mb-3">• Increase Conversions</h4>
                      <p className="text-white/80">
                        Engaging with users in real-time means you're more likely to convert them into leads or customers.
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-lg border border-accent/20">
                      <h4 className="text-xl font-semibold text-white mb-3">• Save Time & Money</h4>
                      <p className="text-white/80">
                        Let Sophie handle all of the repetitive questions, so your team can focus on more important tasks. No need to hire additional support staff.
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-lg border border-accent/20">
                      <h4 className="text-xl font-semibold text-white mb-3">• Seamless Integration</h4>
                      <p className="text-white/80">
                        ASAP Chat integrates seamlessly into your website, providing a smooth, uninterrupted experience for your visitors. It's easy to set up and even easier to maintain.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center bg-gradient-to-r from-accent/20 to-purple-500/20 p-8 rounded-lg border border-accent/30">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Make Your Website Work Smarter, Not Harder
                  </h3>
                  <p className="text-lg text-white/90 mb-6 max-w-4xl mx-auto">
                    Start providing top-tier customer support 24/7 with ASAP Chat – Site Support. Whether you're in retail, real estate, or any service-based industry, Sophie can help you automate customer interactions and provide your customers with the answers they need—whenever they need them.
                  </p>
                  <div className="mb-4">
                    <h4 className="text-xl font-semibold text-accent mb-2">Get Started Today!</h4>
                    <p className="text-white/80 mb-6">
                      Ready to enhance your website's customer support? Contact us for a free demo and see how ASAP Chat can transform your customer service process.
                    </p>
                  </div>
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
                  Enhance Your Website with AI-Powered Customer Support
                </h3>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Ready to provide 24/7 customer support on your website? Let Sophie handle visitor inquiries while you focus on running your business. Schedule your consultation to discover how our Site Support service can improve customer satisfaction.
                </p>
                <div className="bg-gradient-to-r from-accent/20 to-purple-500/20 rounded-xl p-8 border border-accent/30">
                  <h4 className="text-2xl font-bold text-accent mb-4">
                    Book Your Site Support Integration Consultation
                  </h4>
                  <p className="text-lg text-white mb-6">
                    Join successful businesses who've enhanced their customer service and seen immediate improvements with our AI chatbot system.
                  </p>
                  
                  <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-700 bg-white">
                    <iframe 
                      src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1drKUCVOMA5usQoGlPHT9SYyEk777PMSRkNh2OvjkNbHkazJ-UwXZ-tzU3sk-FEgPNTMJXB7H0?gv=true" 
                      style={{ border: 0, backgroundColor: 'white' }} 
                      width="100%" 
                      height="600" 
                      frameBorder="0"
                      title="Schedule Your Site Support Consultation"
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

export default SiteSupport;