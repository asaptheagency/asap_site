import React from "react";
import { motion } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactButton from "../../components/ContactButton";
import FloatingElements from "../../components/FloatingElements";
import { automateImage } from "../../assets";
import ImageWithFallback from "../../components/ImageWithFallback";
import SEOHead from "../../components/SEOHead";

const AutoMate: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <SEOHead 
        title="AutoMate - Business Automation Solutions" 
        description="Streamline your business processes with AutoMate. Our custom automation solutions help reduce manual work, eliminate errors, and increase productivity."
        imageUrl={automateImage}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gray-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <ImageWithFallback
            src={automateImage}
            fallbackSrc={automateImage}
            alt="AutoMate"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            AutoMate
          </h1>
        </div>
      </section>
      
      {/* Content Section */}
      <main className="relative flex-grow">
        {/* Background with floating elements - direct implementation */}
        <FloatingElements className="absolute inset-0" />
        <div className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            {/* First Section */}
            <section className="py-16 bg-background/40 rounded-lg mb-10 relative z-10 border border-accent/20 shadow-lg backdrop-blur-sm">
              <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Streamlining <span className="text-accent italic">Your Success</span>
                  </h2>
                  
                  <h3 className="text-xl md:text-2xl text-muted-foreground">
                    with <span className="text-accent italic">Automation</span>
                  </h3>
                </div>
                
                <div className="relative z-10">
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-lg text-muted-foreground">
                      Studies show that businesses are leaving a lot of efficiency on the table—up to 45% of work activities could be automated, freeing up time for more valuable tasks. The reality is, businesses that don't take advantage of automation are falling behind. With AutoMate, you can streamline your processes and reduce the amount of time spent on routine mundane tasks that only serve as a bottleneck to your business. Our tailored automation solutions will help your business reduce manual work, eliminate errors, and increase productivity. By automating key tasks, you'll finally be able to focus on what truly drives growth—your business.
                    </p>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      As an AutoMate customer, the services you can expect may include but are not limited to:
                    </p>
                    
                    <ul className="mt-6 space-y-3">
                      <li className="text-muted-foreground">Custom Workflow Automation</li>
                      <li className="text-muted-foreground">Lead Generation Automation</li>
                      <li className="text-muted-foreground">Email Marketing Automations</li>
                      <li className="text-muted-foreground">CRM Integrations</li>
                      <li className="text-muted-foreground">Appointment Scheduling Automation</li>
                      <li className="text-muted-foreground">Data Synchronization Across Platforms</li>
                      <li className="text-muted-foreground">Process Mapping & Streamlining</li>
                    </ul>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      We know that no two businesses are alike, and that's why we take a detailed, personalized approach to every client. We'll work closely with you to identify the areas where automation can make the most significant impact. Our team will review your existing systems, pinpoint inefficiencies, and deliver a custom-tailored automation plan that integrates seamlessly into your current setup. The result? A business that works smarter, not harder.
                    </p>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      Why AutoMate Is the Better Choice:
                    </p>
                    
                    <ul className="mt-6 space-y-3">
                      <li className="text-muted-foreground">AutoMate tailors each automation specifically to your business processes, ensuring maximum effectiveness.</li>
                      <li className="text-muted-foreground">With our custom automation solutions, your business will save valuable time, reduce human error, and improve operational efficiency.</li>
                      <li className="text-muted-foreground">We offer continued support and optimization to keep your automations running smoothly and adapting to your growing business needs.</li>
                    </ul>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      We're so confident that AutoMate will improve your business efficiency, we offer a money-back guarantee if you don't see measurable improvements in your workflow and processes. Your success is our top priority.
                    </p>
                    
                    <p className="text-lg font-bold mt-6">
                      Bonus: Need help with implementing your automations? No problem. Let us assist you with full deployment support and training for your team. We'll make sure your business is set up to succeed from day one!
                    </p>
                  </div>
                  
                  <ContactButton />
                </div>
              </div>
            </section>
            
            {/* Second Section */}
            <section className="py-16 bg-background/30 rounded-lg mb-10 relative z-10 border border-accent/10 shadow-lg backdrop-blur-sm">
              <div className="container mx-auto px-4">
                <div className="mb-12 text-center">

                  <h2 className="text-3xl md:text-4xl font-bold">
                    Why choose <span className="text-accent italic">AutoMate</span>
                  </h2>
                  
                  <h3 className="text-xl md:text-2xl text-muted-foreground">
                    <span className="text-accent italic">for your</span> automation needs
                  </h3>
                </div>
                
                <div className="relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div 
                      className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300"
                      whileHover={{ 
                        rotate: -2,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <h3 className="text-xl font-bold mb-4">Free Up Team Resources</h3>
                      <p className="text-muted-foreground">
                        AutoMate empowers your team to focus on strategic initiatives by eliminating time-consuming manual processes. When repetitive tasks are automated, your employees can dedicate their talents to more meaningful work that drives innovation and growth. This not only improves operational efficiency but also enhances job satisfaction and employee retention. By implementing AutoMate solutions, your business can unlock the full potential of your team's skills and creativity.
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300"
                      whileHover={{ 
                        rotate: -2,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <h3 className="text-xl font-bold mb-4">Tailored Automation Solutions</h3>
                      <p className="text-muted-foreground">
                        Every business is unique, and so are its processes. With AutoMate, we dive deep into understanding your specific needs and workflows, providing a fully customized automation solution that integrates seamlessly with your existing systems. Whether you're automating lead generation, scheduling, or internal workflows, AutoMate offers solutions that are fine-tuned to your exact requirements. Our team ensures that each automation solution is built specifically for your business to maximize effectiveness and ROI.
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300"
                      whileHover={{ 
                        rotate: -2,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <h3 className="text-xl font-bold mb-4">Efficiency and Optimization at Scale</h3>
                      <p className="text-muted-foreground">
                        When you choose AutoMate, you're choosing to enhance your business operations with the power of automation. Our solutions are designed to eliminate tedious manual tasks, reduce human error, and improve your team's efficiency. Whether it's syncing data across platforms or automating customer communication, AutoMate streamlines your processes, saving you time and resources. And, because each automation is built with your business in mind, you'll notice immediate improvements in operational performance and overall productivity.
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300"
                      whileHover={{ 
                        rotate: -2,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <h3 className="text-xl font-bold mb-4">Increased Focus on What Matters Most</h3>
                      <p className="text-muted-foreground">
                        With AutoMate, your business will operate more efficiently, giving your team the ability to focus on high-priority tasks that drive growth. Automating routine tasks means that you no longer have to worry about manual data entry, follow-ups, or missed opportunities. AutoMate works behind the scenes to ensure everything flows smoothly, while you concentrate on what really moves your business forward.
                      </p>
                    </motion.div>
                  </div>
                  
                  <ContactButton className="mt-10" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AutoMate;