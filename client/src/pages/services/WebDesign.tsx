import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { slideFromBottom } from "../../lib/animations";
import ContactButton from "../../components/ContactButton";
import SEOHead from "../../components/SEOHead";
import FloatingElements from "../../components/FloatingElements";
import { websiteImage } from "../../assets";
import ImageWithFallback from "../../components/ImageWithFallback";

const WebDesign: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <SEOHead 
        title="Web Design and Development Services" 
        description="Professional website design services that create eye-catching, SEO-friendly websites for your business. Custom web development tailored to your unique needs and preferences."
        imageUrl={websiteImage}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gray-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <ImageWithFallback
            src={websiteImage}
            fallbackSrc={websiteImage}
            alt="Professional web design and development services"
            className="w-full h-full object-cover opacity-50"
            style={{ width: '1200px', height: '630px' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            Web Design
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-white/80 mt-4">
            and Development
          </h2>
        </div>
      </section>
      
      {/* Transition connector from Hero to Content */}
      <div className="h-16 bg-gradient-to-b from-[rgba(75,184,166,0.2)] to-[rgba(75,184,166,0.2)]"></div>
      
      {/* Content Section */}
      <main className="relative flex-grow">
        {/* Background with floating elements - direct implementation with no nesting */}
        <FloatingElements className="absolute inset-0" />
        
        <div className="relative z-10 py-20">
          <div className="container mx-auto px-4">
            <motion.section 
              className="py-16 bg-background/40 rounded-lg mb-10 relative z-10 border border-accent/20 shadow-lg backdrop-blur-sm"
              variants={slideFromBottom}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Turning <span className="text-accent italic">aspirations</span>
                  </h2>
                  
                  <h3 className="text-xl md:text-2xl text-muted-foreground">
                    into <span className="text-accent italic">reality</span>
                  </h3>
                </div>
                
                <div className="relative z-10">
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-lg text-muted-foreground">
                      Your website is your digital hub, the place everyone goes when they want to learn more about your business. In many ways your website will be a chance at a first impression. Let's make it a good one.
                    </p>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      Every site we create is eye-catching and designed specifically to encourage customers to take the next step and reach out to your business. Our team of skilled designers and developers will collaborate with you to comprehend your business objectives and produce a unique website that fits your requirements and goes above and beyond what you anticipate.
                    </p>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      Whether you're starting from scratch or looking to redesign your existing website, we've got you covered. With our Web Design and Development service, you will receive:
                    </p>
                    
                    <ul className="mt-6 space-y-3">
                      <li className="text-muted-foreground">
                        A visually appealing, professional website that effectively showcases your products or services
                      </li>
                      <li className="text-muted-foreground">
                        Customized design and functionality that meets your unique business needs
                      </li>
                      <li className="text-muted-foreground">
                        Responsive design that ensures your website looks great on any device
                      </li>
                      <li className="text-muted-foreground">
                        Expert guidance and support to help you launch and maintain your website
                      </li>
                    </ul>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      Don't let a subpar website hold your business back. Contact us today to learn more about how our Web Design and Development service can help you succeed online.
                    </p>
                  </div>
                  
                  <ContactButton />
                </div>
              </div>
            </motion.section>
            
            <motion.section 
              className="py-16 bg-background/30 rounded-lg mb-10 relative z-10 border border-accent/10 shadow-lg backdrop-blur-sm"
              variants={slideFromBottom}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Why let <span className="text-accent italic">ASAP</span>
                  </h2>
                  
                  <h3 className="text-xl md:text-2xl text-muted-foreground">
                    <span className="text-accent italic">create</span> your site
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
                      <h3 className="text-xl font-bold mb-4">Complete customization</h3>
                      <p className="text-muted-foreground">
                        Before we start any design work, we take the time to gather detailed customer input through comprehensive consultations. This collaborative approach ensures that we fully understand your specific needs, preferences, and business goals. By listening carefully to your vision and requirements, we can create a website that truly reflects your brand identity and resonates with your target audience.
                      </p>
                      <p className="text-muted-foreground mt-4">
                        Our thorough discovery process allows us to tailor every aspect of your website - from layout and color schemes to functionality and user experience. This attention to your individual preferences ensures that the final product not only meets but exceeds your expectations. At ASAP, we believe that the most successful websites are built on a foundation of clear communication and customer involvement throughout the design process.
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300"
                      whileHover={{ 
                        rotate: -2,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <h3 className="text-xl font-bold mb-4">Professional appearance and functionality</h3>
                      <p className="text-muted-foreground">
                        Our skilled web designers will have the knowledge and expertise to produce a polished, visually appealing website that effectively promotes your company and its products. Additionally, they will be able to guarantee that the website is user-friendly and functional, making it simple for visitors to explore and engage with your company.
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300"
                      whileHover={{ 
                        rotate: -2,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <h3 className="text-xl font-bold mb-4">Improved search engine optimization</h3>
                      <p className="text-muted-foreground">
                        All ASAP developers are knowledgeable about search engine optimization (SEO) best practices and are able to create websites that are search engine friendly. This can make it simpler for potential clients to find you online by increasing the visibility and ranking of your website in search results.
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300"
                      whileHover={{ 
                        rotate: -2,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <h3 className="text-xl font-bold mb-4">Access to advanced design tools and technologies</h3>
                      <p className="text-muted-foreground">
                        Our skilled web developers have access to cutting-edge technologies and design tools that allow help them build more complex and dynamic websites. These tools and methods will enable improved user experience and produce a more dynamic and engaging website for your company.
                      </p>
                    </motion.div>
                  </div>
                  
                  <ContactButton className="mt-10" />
                </div>
              </div>
            </motion.section>

            {/* Third Section - Don't take it from us */}
            <motion.section 
              className="py-16 bg-background/30 rounded-lg mb-10 relative z-10 border border-accent/10 shadow-lg backdrop-blur-sm"
              variants={slideFromBottom}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Don't take it <span className="text-accent italic">from us</span>
                  </h2>
                  
                  <h3 className="text-xl md:text-2xl text-muted-foreground">
                    Here's what our <span className="text-accent italic">clients say</span>
                  </h3>
                </div>
                
                <div className="relative z-10">
                  <div className="grid grid-cols-1 gap-8">
                    {/* KJS Auto Hail Repair */}
                    <div className="bg-background/60 p-8 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300 hover:rotate-[-1deg]">
                      <div className="text-center mb-6">
                        <a href="https://www.kjsautohailrepair.com" target="_blank" rel="noopener noreferrer" className="inline-block text-2xl font-bold text-accent hover:underline hover:brightness-125 transition-all">
                          KJS Auto Hail Repair
                        </a>
                        <p className="text-white/70 mt-1 italic">"Hail damage specialists in Colorado"</p>
                        <div className="max-w-xl mx-auto mt-3">
                          <p className="text-muted-foreground text-sm">
                            KJS Auto Hail Repair specializes in paintless dent repair for vehicles damaged by hail storms. They provide expert auto hail damage repair services across Colorado with efficient, high-quality workmanship.
                          </p>
                        </div>
                      </div>
                      
                      <div className="w-full border-t border-accent/30 pt-6 mt-6 max-w-3xl mx-auto">
                        <div className="relative p-1 overflow-hidden">
                          <div className="flex flex-col gap-4">
                            <div className="bg-background/40 p-4 rounded-lg shadow-sm border border-accent/5">
                              <p className="text-muted-foreground">
                                "ASAP created a website for us that perfectly captures what our business is about. The design is clean, professional, and makes it easy for customers to find exactly what they need."
                              </p>
                            </div>
                            
                            <div className="bg-background/40 p-4 rounded-lg shadow-sm border border-accent/5">
                              <p className="text-accent font-medium">
                                "The team at ASAP was responsive, professional, and delivered exactly what we needed. They took the time to understand our business and created a site that truly represents who we are."
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Pacific Public Adjusters */}
                    <div className="bg-background/60 p-8 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300 hover:rotate-[-1deg]">
                      <div className="text-center mb-6">
                        <a href="https://www.pacificpublicadjusters.com" target="_blank" rel="noopener noreferrer" className="inline-block text-2xl font-bold text-accent hover:underline hover:brightness-125 transition-all">
                          Pacific Public Adjusters
                        </a>
                        <p className="text-white/70 mt-1 italic">"Advocating for fair insurance settlements"</p>
                        <div className="max-w-xl mx-auto mt-3">
                          <p className="text-muted-foreground text-sm">
                            Pacific Public Adjusters helps property owners navigate insurance claims and secure fair settlements. Their team of licensed public adjusters represents clients throughout the claims process for residential and commercial properties.
                          </p>
                        </div>
                      </div>
                      
                      <div className="w-full border-t border-accent/30 pt-6 mt-6 max-w-3xl mx-auto">
                        <div className="relative p-1 overflow-hidden">
                          <div className="flex flex-col gap-4">
                            <div className="bg-background/40 p-4 rounded-lg shadow-sm border border-accent/5">
                              <p className="text-muted-foreground">
                                "Our business operates in a complex industry where building trust is essential. ASAP designed a website that clearly explains our services and establishes our credibility from the moment visitors land on our site."
                              </p>
                            </div>
                            
                            <div className="bg-background/40 p-4 rounded-lg shadow-sm border border-accent/5">
                              <p className="text-muted-foreground">
                                "Working with ASAP was refreshingly straightforward. They took our input seriously and translated our needs into a professional, effective website that's helping us grow our business."
                              </p>
                            </div>
                            
                            <div className="bg-background/40 p-4 rounded-lg shadow-sm border border-accent/5">
                              <p className="text-accent font-medium">
                                "The return on investment has been remarkable. Our new website has become a critical part of our marketing strategy and continues to bring in new clients month after month."
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <ContactButton className="mt-10" />
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WebDesign;
