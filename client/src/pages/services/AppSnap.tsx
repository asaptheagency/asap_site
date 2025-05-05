import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactButton from "../../components/ContactButton";
import FloatingElements from "../../components/FloatingElements";

const AppSnap: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gray-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <picture>
            <source srcSet="/client/public/assets/services/appsnap.jpg" type="image/jpeg" />
            <source srcSet="/client/public/assets/services/appsnap.jpg" type="image/webp" />
            <img 
              src="/client/public/assets/services/appsnap.jpg" 
              alt="AppSnap"
              className="w-full h-full object-cover opacity-50"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            AppSnap
          </h1>
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
                    Turning <span className="text-accent italic">aspirations</span>
                  </h2>
                  
                  <h3 className="text-xl md:text-2xl text-muted-foreground">
                    into <span className="text-accent italic">reality</span>
                  </h3>
                </div>
                
                <div className="relative z-10">
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-lg text-muted-foreground">
                      Have you been thinking about creating a custom app for your business? Whether you need a mobile app, web app, or desktop app—whether it's for your internal use or to better serve your customers—AppSnap is here to bring your ideas to life. At AppSnap, we build apps that seamlessly integrate into your business and give you the power to enhance your services, streamline your operations, and provide better experiences for your customers. No matter the complexity, our team can handle it all and turn your app vision into reality.
                    </p>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      As an AppSnap customer, the services you can expect may include but are not limited to:
                    </p>
                    
                    <ul className="mt-6 space-y-3">
                      <li className="text-muted-foreground"><strong>App Optimization</strong>: We'll enhance the performance and efficiency of your app to run smoothly across devices.</li>
                      <li className="text-muted-foreground"><strong>User Experience (UX) Design</strong>: We create a user-friendly interface that makes your app simple and intuitive to navigate.</li>
                      <li className="text-muted-foreground"><strong>Performance Enhancements</strong>: We improve your app's speed and responsiveness, ensuring a seamless experience for users.</li>
                      <li className="text-muted-foreground"><strong>Feature Integration</strong>: We integrate new features into your app, making sure it's packed with all the functionality you need.</li>
                      <li className="text-muted-foreground"><strong>App Analytics Setup</strong>: Get detailed insights into your app's performance and user behavior with our advanced analytics setup.</li>
                      <li className="text-muted-foreground"><strong>Security & Privacy Upgrades</strong>: We ensure your app is safe and secure, protecting both your business data and your users' privacy.</li>
                    </ul>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      When it comes to building an app, why settle for DIY or off-the-shelf solutions when you can get something custom-built to fit your needs? With AppSnap, we create solutions tailored specifically for your business, ensuring that your app works exactly the way you want it to. Our team of experts ensures that your app not only runs smoothly but also meets the specific needs of your customers, making it a powerful tool for your business. Plus, we're always proactive, constantly looking for ways to improve and enhance your app. With ongoing support, we make sure that your app remains up-to-date with the latest technology and trends, helping you stay ahead of the curve.
                    </p>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      We're so confident in our work that we offer a 100% satisfaction guarantee. If you're not satisfied with the app's functionality or design, we'll work with you until it meets your exact expectations. Additionally, AppSnap is backed by our performance guarantee. If your app doesn't meet the agreed-upon performance targets—such as speed, functionality, or efficiency—within the first 30 days of launch, we'll work to fix it at no additional cost to you. Our focus is always on delivering an app that exceeds your expectations and performs at its best.
                    </p>
                    
                    <p className="text-lg font-bold mt-6">
                      Bonus: Need help with marketing your app and driving more users to it? Just let us know and we'll provide app promotion strategies tailored to your business goals, helping you grow your app's user base and maximize its impact.
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
                    Why let <span className="text-accent italic">ASAP</span>
                  </h2>
                  
                  <h3 className="text-xl md:text-2xl text-muted-foreground">
                    <span className="text-accent italic">build</span> your app
                  </h3>
                </div>
                
                <div className="relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300 hover:rotate-[-2deg]">
                      <h3 className="text-xl font-bold mb-4">Tailored to Your Business Needs</h3>
                      <p className="text-muted-foreground">
                        At AppSnap, we create apps that are fully customized to meet the specific needs of your business. Whether it's a mobile app, web app, or desktop solution, our team will work closely with you to design a solution that fits perfectly with your brand, vision, and operational requirements. Unlike cookie-cutter apps, every app we build is a unique solution that addresses your goals and challenges directly, ensuring a higher degree of success and satisfaction.
                      </p>
                    </div>
                    
                    <div className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300 hover:rotate-[-2deg]">
                      <h3 className="text-xl font-bold mb-4">Performance Optimized</h3>
                      <p className="text-muted-foreground">
                        Our apps are designed with performance in mind, crafted from the ground up with optimized code that enhances speed and functionality. We use the latest best practices in app development to create seamless experiences for your users. Whether it's improving load times, refining usability, or integrating the latest features, we focus on making sure your app runs efficiently and is reliable. A faster, more responsive app means a better experience for your customers and a more successful solution for your business.
                      </p>
                    </div>
                    
                    <div className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300 hover:rotate-[-2deg]">
                      <h3 className="text-xl font-bold mb-4">Expert Design and User Experience</h3>
                      <p className="text-muted-foreground">
                        We don't just focus on functionality; we also emphasize a polished, user-friendly interface. Our expert designers ensure that every app we create not only meets your functional needs but also provides a seamless and enjoyable user experience. We understand the importance of aesthetics and usability, so your app will look and feel great while being intuitive and easy for your customers to navigate.
                      </p>
                    </div>
                    
                    <div className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300 hover:rotate-[-2deg]">
                      <h3 className="text-xl font-bold mb-4">Future-Proofed with Ongoing Support</h3>
                      <p className="text-muted-foreground">
                        Building a great app doesn't stop at launch. We provide ongoing support to ensure that your app remains current and continues to perform optimally. Whether it's through regular updates, new feature integration, or technical support, we're here to help you stay ahead of the competition. At AppSnap, we work to continuously improve your app with the latest technological advancements, keeping your business and app in sync with changing user needs.
                      </p>
                    </div>
                    
                    <div className="bg-background/60 p-6 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300 hover:rotate-[-2deg] col-span-1 md:col-span-2">
                      <h3 className="text-xl font-bold mb-4">Built with Scalability in Mind</h3>
                      <p className="text-muted-foreground">
                        Your business is constantly evolving, and so should your app. We design apps with scalability in mind, ensuring that as your business grows, your app can grow with you. Our team focuses on building robust apps that can handle increased demand, more features, and a growing customer base. This forward-thinking approach means you won't need to worry about outgrowing your app as your business expands.
                      </p>
                    </div>
                  </div>
                  
                  <ContactButton className="mt-10" />
                </div>
              </div>
            </section>
            
            {/* Third Section - Don't take it from us */}
            <section className="py-16 bg-background/30 rounded-lg mb-10 relative z-10 border border-accent/10 shadow-lg backdrop-blur-sm">
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
                    <div className="bg-background/60 p-8 rounded-lg border border-accent/10 shadow-md hover:shadow-accent/10 transition-all duration-300 hover:rotate-[-1deg]">
                      <div className="text-center mb-6">
                        <a href="https://adtasticness.com" target="_blank" rel="noopener noreferrer" className="inline-block text-2xl font-bold text-accent hover:underline hover:brightness-125 transition-all">
                          Adtasticness
                        </a>
                        <p className="text-white/70 mt-1 italic">"The platform that democratizes outdoor advertising"</p>
                        <div className="max-w-xl mx-auto mt-3">
                          <p className="text-muted-foreground text-sm">
                            Adtasticness is a platform that turns everyday physical spaces into rentable advertising space. It gives anyone—from small business owners to individuals—the ability to list physical areas they control and get paid by advertisers who want local, real-world visibility.
                          </p>
                        </div>
                      </div>
                      
                      <div className="w-full border-t border-accent/30 pt-6 mt-6 max-w-3xl mx-auto">
                        <div className="relative p-1 overflow-hidden">
                          <div className="flex flex-col gap-4">
                            <div className="bg-background/40 p-4 rounded-lg shadow-sm border border-accent/5">
                              <p className="text-muted-foreground">
                                "Working with ASAP to develop Adtasticness was an exceptional experience from start to finish. Their team truly understood our vision to revolutionize how local advertising spaces are discovered and monetized."
                              </p>
                            </div>
                            
                            <div className="bg-background/40 p-4 rounded-lg shadow-sm border border-accent/5">
                              <p className="text-muted-foreground">
                                "Their development approach was both methodical and agile, adapting quickly to our feedback while maintaining a clear vision of the end goal. The technical challenges were significant, but ASAP's solutions were elegant and user-friendly."
                              </p>
                            </div>
                            
                            <div className="bg-background/40 p-4 rounded-lg shadow-sm border border-accent/5">
                              <p className="text-muted-foreground">
                                "What truly sets ASAP apart is their commitment to understanding not just what we wanted to build, but why we wanted to build it. They became partners in our mission to democratize outdoor advertising."
                              </p>
                            </div>
                            
                            <div className="bg-background/40 p-4 rounded-lg shadow-sm border border-accent/5">
                              <p className="text-accent font-medium">
                                "We're proud to have partnered with ASAP to bring Adtasticness to life, and we're grateful for their ongoing support as we continue to grow."
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
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AppSnap;