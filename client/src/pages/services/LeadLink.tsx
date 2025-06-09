import React from "react";
import { motion } from "framer-motion";
import { slideFromBottom } from "../../lib/animations";
import ContactButton from "../../components/ContactButton";
import SEOHead from "../../components/SEOHead";
import FloatingElements from "../../components/FloatingElements";
import ImageWithFallback from "../../components/ImageWithFallback";
import leadLinkImage from "../../assets/chat_leadLink.webp";

const LeadLink: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <SEOHead 
        title="ASAP Chat - LeadLink" 
        description="Sophie qualifies website visitors as leads and automatically sends qualified prospect data to your Google Sheets for follow-up."
        imageUrl={leadLinkImage}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gray-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <ImageWithFallback
            src={leadLinkImage}
            fallbackSrc={leadLinkImage}
            alt="ASAP Chat - LeadLink"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            LeadLink
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
                    🎉 Introducing ASAP Chat – LeadLink
                  </h2>
                  <h3 className="text-xl md:text-2xl text-accent mb-6">
                    Supercharge Your Lead Generation with AI-Powered Automation
                  </h3>
                  <p className="text-lg text-white/80 max-w-4xl mx-auto">
                    💬 Qualify Leads Faster, Capture Data Instantly
                  </p>
                </div>

                <div className="mb-12">
                  <p className="text-lg text-white/90 leading-relaxed mb-6">
                    Tired of wasting time chasing down unqualified leads? With ASAP Chat – LeadLink, your website visitors will be greeted by Sophie, the AI-powered chatbot, who'll not only engage with them but will qualify their interest and seamlessly send all the data over to your team in real-time via Google Sheets.
                  </p>
                </div>

                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-accent mb-6">How Does ASAP Chat – LeadLink Work?</h3>
                  <div className="grid md:grid-cols-1 gap-6">
                    <div className="bg-white/5 p-6 rounded-lg border border-accent/20">
                      <h4 className="text-xl font-semibold text-white mb-3">• Instant Lead Qualification</h4>
                      <p className="text-white/80">
                        Sophie automatically engages with visitors as soon as they land on your website, asking the right questions to qualify leads on the spot. No more guessing or wasted time!
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-lg border border-accent/20">
                      <h4 className="text-xl font-semibold text-white mb-3">• Smart Data Collection</h4>
                      <p className="text-white/80">
                        As leads are qualified, all the relevant information is gathered and sent straight to a Google Sheet. You can see the data in real-time, easily tracking leads and their journey through the qualification process.
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-lg border border-accent/20">
                      <h4 className="text-xl font-semibold text-white mb-3">• Seamless Integration</h4>
                      <p className="text-white/80">
                        ASAP Chat – LeadLink works perfectly with your existing website and Google Sheets. Setting up and automating the process is simple, and all your leads are organized in one place, ready for follow-up.
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-lg border border-accent/20">
                      <h4 className="text-xl font-semibold text-white mb-3">• 24/7 Lead Capture</h4>
                      <p className="text-white/80">
                        Whether it's 3 p.m. or 3 a.m., Sophie is on duty, capturing and qualifying leads at all hours. Your business never misses a chance to connect with potential customers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-accent mb-6">Why Choose ASAP Chat – LeadLink?</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/5 p-6 rounded-lg border border-accent/20">
                      <h4 className="text-xl font-semibold text-white mb-3">• Save Time on Lead Qualification</h4>
                      <p className="text-white/80">
                        Let Sophie do the heavy lifting by handling the qualification process. Your team only deals with qualified leads, saving you time and effort.
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-lg border border-accent/20">
                      <h4 className="text-xl font-semibold text-white mb-3">• Automated Lead Data Collection</h4>
                      <p className="text-white/80">
                        All lead information is instantly captured and logged in Google Sheets, ensuring nothing slips through the cracks. Your team has everything they need in one place to follow up efficiently.
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-lg border border-accent/20">
                      <h4 className="text-xl font-semibold text-white mb-3">• Increase Conversion Rates</h4>
                      <p className="text-white/80">
                        With automated, efficient lead qualification, you're more likely to convert those leads into paying customers. No more wasting time on low-quality leads.
                      </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-lg border border-accent/20">
                      <h4 className="text-xl font-semibold text-white mb-3">• Easy Integration</h4>
                      <p className="text-white/80">
                        ASAP Chat – LeadLink integrates smoothly into your website, and Google Sheets is easy to manage. It's an all-in-one solution to streamline your lead generation process.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center bg-gradient-to-r from-accent/20 to-purple-500/20 p-8 rounded-lg border border-accent/30">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Transform Your Lead Generation Process Today!
                  </h3>
                  <p className="text-lg text-white/90 mb-6 max-w-4xl mx-auto">
                    Say goodbye to manual lead qualification and hello to a smarter, more efficient way of capturing and organizing high-quality leads. With ASAP Chat – LeadLink, you can ensure that only the best leads are passed to your sales team, saving you time and boosting your bottom line.
                  </p>
                  <div className="mb-4">
                    <h4 className="text-xl font-semibold text-accent mb-2">Get Started Now!</h4>
                    <p className="text-white/80 mb-6">
                      Ready to supercharge your lead generation and automate the qualification process? Contact us today for a demo and see how ASAP Chat – LeadLink can work for your business!
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
                  Supercharge Your Lead Generation with AI-Powered Qualification
                </h3>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Ready to automate your lead qualification process? Let Sophie identify and capture your best prospects while you focus on closing deals. Schedule your consultation to discover how our LeadLink service can transform your sales pipeline.
                </p>
                <div className="bg-gradient-to-r from-accent/20 to-purple-500/20 rounded-xl p-8 border border-accent/30">
                  <h4 className="text-2xl font-bold text-accent mb-4">
                    Book Your Lead Generation Strategy Session
                  </h4>
                  <p className="text-lg text-white mb-6">
                    Join successful businesses who've automated their lead qualification and seen immediate increases in conversion rates with our AI system.
                  </p>
                  
                  <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-700 bg-white">
                    <iframe 
                      src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1drKUCVOMA5usQoGlPHT9SYyEk777PMSRkNh2OvjkNbHkazJ-UwXZ-tzU3sk-FEgPNTMJXB7H0?gv=true" 
                      style={{ border: 0, backgroundColor: 'white' }} 
                      width="100%" 
                      height="600" 
                      frameBorder="0"
                      title="Schedule Your LeadLink Consultation"
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

export default LeadLink;