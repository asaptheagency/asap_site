import React from "react";


import ContactButton from "../../components/ContactButton";
import FloatingElements from "../../components/FloatingElements";
import { hyperiseImage } from "../../assets";
import ImageWithFallback from "../../components/ImageWithFallback";
import SEOHead from "../../components/SEOHead";

const HypeRise: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <SEOHead 
        title="HypeRise - High-Ticket Marketing Services" 
        description="Supercharge your high-ticket sales with precision marketing from HypeRise. Targeted ad campaigns designed to attract qualified leads for service-based businesses."
        imageUrl={hyperiseImage}
      />
      {/* Header is now handled by MainLayout */}
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gray-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <ImageWithFallback
            src={hyperiseImage}
            fallbackSrc={hyperiseImage}
            alt="HypeRise"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            HypeRise
          </h1>
        </div>
      </section>
      
      {/* Transition connector from Hero to Content */}
      <div className="h-16 bg-gradient-to-b from-[rgba(75,184,166,0.2)] to-[rgba(75,184,166,0.2)]"></div>
      
      {/* Content Section */}
      <main className="flex-grow z-10 relative">
        <FloatingElements className="absolute inset-0" />
        <div className="py-20">
          <div className="container mx-auto px-4">
            {/* First Section */}
            <section className="py-16 bg-background/40 rounded-lg mb-10 relative z-10 border border-accent/20 shadow-lg backdrop-blur-sm">
              <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Supercharge Your <span className="text-accent italic">High-Ticket Sales</span>
                  </h2>
                  
                  <h3 className="text-xl md:text-2xl text-muted-foreground">
                    with <span className="text-accent italic">Precision Marketing</span>
                  </h3>
                </div>
                
                <div className="relative z-10">
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-lg text-muted-foreground">
                      Struggling to reach the right customers for your high-ticket service business? Wish you could generate more leads that actually convert?
                    </p>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      Introducing HypeRise—the ultimate strategy to elevate your high-ticket sales. We specialize in creating targeted ad campaigns that attract the right kind of leads for your service-based business. Whether you're in law, healthcare, consulting, or any other high-ticket service niche, HypeRise is designed to fill your pipeline with qualified prospects. Once the leads are generated, we deliver them directly to you, providing all the valuable data collected during the campaign. This approach gives you complete control over your lead follow-up process while freeing you from the time-consuming tasks of content creation, market research, and ad management. With HypeRise, you can focus on what you do best—closing deals and delivering exceptional services to your clients.
                    </p>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      As a HypeRise customer, the services you can expect may include but are not limited to:
                    </p>
                    
                    <ul className="mt-6 space-y-3">
                      <li className="text-muted-foreground">Targeted Ad Campaigns for High-Ticket Sales</li>
                      <li className="text-muted-foreground">Lead Generation via Paid Advertising</li>
                      <li className="text-muted-foreground">Sales Funnel Optimization</li>
                      <li className="text-muted-foreground">Advanced Analytics and Reporting</li>
                      <li className="text-muted-foreground">Direct Lead Data Delivery</li>
                      <li className="text-muted-foreground">Strategic Market Research and Content Creation</li>
                    </ul>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      We don't believe in a one-size-fits-all approach. At ASAP, we take a highly personalized strategy, working closely with your business to understand your target market and crafting a custom ad campaign tailored to your unique needs. From creating compelling ad copy to optimizing your sales funnels and conducting thorough market research, we handle the technical aspects of lead generation. You receive qualified lead data directly and maintain complete control over your customer relationships and sales process—a perfect balance of specialized expertise and business autonomy.
                    </p>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      Why HypeRise is better than other marketing services:
                    </p>
                    
                    <ul className="mt-6 space-y-3">
                      <li className="text-muted-foreground">HypeRise focuses specifically on high-ticket services, ensuring that you attract qualified leads who are ready to make a purchase.</li>
                      <li className="text-muted-foreground">We use data-driven ad campaigns, giving you more control and visibility over how your marketing dollars are spent and ensuring the best return on investment.</li>
                      <li className="text-muted-foreground">HypeRise handles the time-consuming aspects of lead generation—content creation, market research, and campaign management—while giving you full control over customer relationships and the sales process.</li>
                    </ul>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      Let's work together to elevate your high-ticket sales with HypeRise. Your business deserves the kind of precision marketing that produces results.
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
                    Why <span className="text-accent italic">HypeRise</span> is what
                  </h2>
                  
                  <h3 className="text-xl md:text-2xl text-muted-foreground">
                    you're <span className="text-accent italic">looking for</span>
                  </h3>
                </div>
                
                <div className="relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300 hover:rotate-[-2deg]">
                      <h3 className="text-xl font-bold mb-4">Expert Content Creation & Market Research</h3>
                      <p className="text-muted-foreground">
                        One of HypeRise's biggest advantages is eliminating the need for you to create ad content or conduct market research. Our team handles all aspects of content creation—from compelling ad copy to attention-grabbing visuals—based on extensive market research specific to your industry. We identify your ideal customer profiles, research competitors, and craft messages that resonate with your target audience. This saves you significant time and resources while ensuring your campaigns benefit from specialized marketing expertise.
                      </p>
                    </div>
                    
                    <div className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300 hover:rotate-[-2deg]">
                      <h3 className="text-xl font-bold mb-4">Tailored Ad Campaigns with Precision</h3>
                      <p className="text-muted-foreground">
                        With HypeRise, we don't believe in one-size-fits-all solutions. Our targeted ad campaigns are custom-built for your business, designed to connect you with the right audience who are ready to invest in your high-ticket services. Whether you're running ads on social media or other digital platforms, we make sure your campaign reaches the right people at the right time. This level of customization ensures that your marketing efforts aren't just reaching a wide audience—they're speaking directly to those who are most likely to convert.
                      </p>
                    </div>
                    
                    <div className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300 hover:rotate-[-2deg]">
                      <h3 className="text-xl font-bold mb-4">Direct Lead Data Delivery</h3>
                      <p className="text-muted-foreground">
                        With HypeRise, we deliver qualified lead data directly to you, giving you complete control over your customer relationships. We provide comprehensive information about each lead, allowing your sales team to personalize their approach based on the prospect's interests and behavior. This direct delivery model ensures you maintain ownership of your client relationships while benefiting from our expertise in lead generation. You'll have all the information you need to follow up effectively, without any middlemen in your sales process.
                      </p>
                    </div>
                    
                    <div className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300 hover:rotate-[-2deg]">
                      <h3 className="text-xl font-bold mb-4">Maximize Your ROI with Data-Driven Strategies</h3>
                      <p className="text-muted-foreground">
                        With HypeRise, we make sure your ad spend works harder for you. Our campaigns are powered by data and designed to deliver measurable results. We continually track and optimize every aspect of the campaign, ensuring that you're getting the best return on your investment. From fine-tuning targeting to adjusting ad copy and creative, we use real-time data to ensure that every dollar spent is moving your business closer to its goals.
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

export default HypeRise;