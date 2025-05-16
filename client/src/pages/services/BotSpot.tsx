import React from "react";


import ContactButton from "../../components/ContactButton";
import FloatingElements from "../../components/FloatingElements";
import { botspotImage } from "../../assets";
import ImageWithFallback from "../../components/ImageWithFallback";
import SEOHead from "../../components/SEOHead";

const BotSpot: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <SEOHead 
        title="BotSpot & LeadSeed - Chatbot Solutions" 
        description="Transform your customer service and lead generation with BotSpot and LeadSeed, two powerful chatbot solutions designed to handle routine inquiries and qualify leads."
        imageUrl={botspotImage}
      />
      {/* Header is now handled by MainLayout */}
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gray-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <ImageWithFallback
            src={botspotImage}
            fallbackSrc={botspotImage}
            alt="BotSpot and LeadSeed"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            BotSpot
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-white/80 mt-4">
            and LeadSeed
          </h2>
        </div>
      </section>
      
      {/* Transition connector from Hero to Content */}
      <div className="h-16 bg-gradient-to-b from-[rgba(75,184,166,0.2)] to-[rgba(75,184,166,0.2)]"></div>
      
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
                    Revolutionizing <span className="text-accent italic">Customer Service</span>
                  </h2>
                  
                  <h3 className="text-xl md:text-2xl text-muted-foreground">
                    & Lead Generation <span className="text-accent italic">with Smart Chatbots</span>
                  </h3>
                </div>
                
                <div className="relative z-10">
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-lg text-muted-foreground">
                      Feel like your customer service calls are endless, or that you're missing out on high-value leads? Imagine having a chatbot that can handle all the routine questions, freeing up your team to focus on what matters most. Introducing BotSpot and LeadSeed – two powerful chatbot solutions that will transform the way you interact with your customers and prospects.
                    </p>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      <strong>BotSpot</strong> is designed to take the pressure off your team by handling customer inquiries so you can reduce the number of phone calls and improve response times. Whether it's answering FAQs or assisting with common tasks, BotSpot streamlines customer service making it more efficient for both your team and your customers.
                    </p>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      <strong>LeadSeed</strong> is built specifically for high-ticket service-based businesses such as law firms, medical practices, and consultants. This isn't just a lead-generation bot—it actively qualifies leads and answers customer inquiries in real-time. By engaging users right away and addressing their questions, LeadSeed helps keep potential customers interested and engaged, significantly reducing bounce rates on your website. Once qualified, these leads are delivered directly to you with all the valuable data collected during the conversation. With LeadSeed, you maintain full control of your lead pipeline while benefiting from higher engagement rates and better-qualified prospects.
                    </p>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      As a BotSpot & LeadSeed customer, the services you can expect may include but are not limited to:
                    </p>
                    
                    <ul className="mt-6 space-y-3">
                      <li className="text-muted-foreground"><strong>Bot Setup & Customization</strong> – Tailored to fit your specific business needs and customer interactions</li>
                      <li className="text-muted-foreground"><strong>Smart Lead Qualification</strong> – Automatically qualify leads based on your criteria to ensure you're focusing on the best opportunities</li>
                      <li className="text-muted-foreground"><strong>FAQ Automation & Custom Response Flows</strong> – Provide instant answers to common questions without the need for human involvement</li>
                      <li className="text-muted-foreground"><strong>Continuous Support and Optimization</strong> – Ongoing support to keep your chatbot running smoothly and adapting to your business needs</li>
                    </ul>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      With BotSpot and LeadSeed, we take a personalized approach to customizing each chatbot to match your unique business processes. Our team works closely with you to fine-tune your chatbots, ensuring they integrate seamlessly into your existing systems and elevate your customer experience.
                    </p>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      We're so confident that BotSpot & LeadSeed will transform your customer service and lead generation, we offer a satisfaction guarantee. If you don't see a measurable improvement in efficiency and results, we'll work with you until you do – or we'll refund your investment.
                    </p>
                    
                    <p className="text-lg font-bold mt-6">
                      Bonus: Need help promoting your chatbot to drive more traffic and interaction? No problem. We'll help you create a custom chatbot marketing strategy, tailored to your business goals and designed to attract and engage your target audience.
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
                    Why choose <span className="text-accent italic">BotSpot</span>
                  </h2>
                  
                  <h3 className="text-xl md:text-2xl text-muted-foreground">
                    and <span className="text-accent italic">LeadSeed</span> by ASAP
                  </h3>
                </div>
                
                <div className="relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300 hover:rotate-[-2deg]">
                      <h3 className="text-xl font-bold mb-4">Complete customization</h3>
                      <p className="text-muted-foreground">
                        With BotSpot and LeadSeed, we don't just deliver off-the-shelf chatbot solutions. Each bot is tailored specifically to your business needs. Whether it's handling customer service queries through BotSpot or capturing and nurturing high-quality leads with LeadSeed, we ensure that every conversation is designed to align perfectly with your brand voice and objectives. By customizing each bot, we ensure that they work seamlessly with your existing systems, providing an experience that's as unique as your business.
                      </p>
                    </div>
                    
                    <div className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300 hover:rotate-[-2deg]">
                      <h3 className="text-xl font-bold mb-4">Maximized Efficiency and Engagement</h3>
                      <p className="text-muted-foreground">
                        BotSpot and LeadSeed significantly enhance user engagement on your website by providing immediate responses to visitor inquiries. This real-time interaction keeps users on your site longer, drastically reducing bounce rates. The chatbots create a dynamic, interactive experience that not only answers questions but maintains visitor interest. This improved engagement translates directly to better conversion rates and a more effective online presence for your business.
                      </p>
                    </div>
                    
                    <div className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300 hover:rotate-[-2deg]">
                      <h3 className="text-xl font-bold mb-4">Improved Operational Efficiency</h3>
                      <p className="text-muted-foreground">
                        Both BotSpot and LeadSeed are designed to help your business operate more efficiently. BotSpot handles routine customer inquiries, reducing the strain on your customer service team and allowing them to focus on more complex tasks. LeadSeed effectively qualifies leads right on your website, collecting valuable information and providing you with pre-screened prospects ready for your follow-up. By automating these initial interactions, you can focus your time and resources on leads that are most likely to convert, significantly improving your sales efficiency while maintaining complete control of your lead pipeline.
                      </p>
                    </div>
                    
                    <div className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300 hover:rotate-[-2deg]">
                      <h3 className="text-xl font-bold mb-4">Direct Data Delivery & Lower Bounce Rates</h3>
                      <p className="text-muted-foreground">
                        LeadSeed delivers qualified lead information directly to you, allowing you to follow up with prospects on your terms and timeline. This direct data delivery means no intermediaries and complete ownership of your customer relationships. Additionally, by engaging visitors immediately with interactive chatbot experiences, you'll see significantly lower bounce rates as users stay on your site longer. This improved retention translates to more opportunities for conversion, helping you maximize the return on your marketing investments.
                      </p>
                    </div>
                  </div>
                  
                  <ContactButton className="mt-10" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      {/* Footer is now handled by MainLayout */}
    </div>
  );
};

export default BotSpot;