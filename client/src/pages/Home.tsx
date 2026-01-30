import { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import AcceleratingMaterial from "../components/AcceleratingMaterial";
import FrictionlessScaling from "../components/FrictionlessScaling";
import Industries from "../components/Industries";
import SEOHead from "../components/SEOHead";

const Home = () => {
  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const href = target.getAttribute('href');
        console.log('Anchor clicked with href:', href);
        const targetId = href!.substring(1);
        console.log('Looking for element with ID:', targetId);
        const element = document.getElementById(targetId);
        
        if (element) {
          console.log('Element found, scrolling to:', element.offsetTop);
          window.scrollTo({
            top: element.offsetTop - 100, // Offset to account for header
            behavior: 'smooth'
          });
        } else {
          console.log('Element not found with ID:', targetId);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Check if services section exists for debugging
    setTimeout(() => {
      const services = document.getElementById('services');
      console.log('Services section found:', !!services);
      if (services) {
        console.log('Services section offset:', services.offsetTop);
      }
    }, 1000);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      <SEOHead 
        title="Digital Solutions & Automation First Agency" 
        description="ASAP helps businesses automate processes and scale digital operations with targeted web design, app development, and marketing services." 
      />
      {/* Header is provided by MainLayout */}
      <main>
        <div>
          <Hero />
        </div>
        
        {/* Transition connector from Hero to AcceleratingMaterial */}
        <div className="h-16 bg-gradient-to-b from-[rgba(75,184,166,0.2)] to-[rgba(75,184,166,0.3)]"></div>
        
        <div>
          <AcceleratingMaterial />
        </div>
        
        {/* Transition connector from AcceleratingMaterial to FrictionlessScaling */}
        <div className="h-16 bg-gradient-to-b from-[#000000] to-[#000000]"></div>
        
        <div>
          <FrictionlessScaling />
        </div>
        
        {/* Services section wrapped with both IDs for different targeting options */}
        <div id="services" className="scroll-mt-[120px]">
          <Industries />
        </div>

        {/* Custom Workflow Automation Section */}
        <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-teal-400 to-orange-500 bg-clip-text text-transparent">
                Need Something Custom?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                Don't see exactly what you need? We specialize in creating custom workflow automations 
                tailored to your unique business processes. From complex integrations to specialized AI solutions, 
                we build what others can't.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-teal-500/50 transition-colors duration-300">
                  <h3 className="text-2xl font-bold text-teal-400 mb-4">Custom Workflow Automation</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Multi-platform integrations and API connections</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Custom AI agents trained for your specific industry</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Automated reporting and data synchronization</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Complex decision-making workflows</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-teal-500/20 to-orange-500/20 border border-teal-400/50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Not Sure What You Need?</h3>
                  <p className="text-gray-300 mb-4">
                    Our discovery process identifies automation opportunities you might not even know exist. 
                    We'll analyze your current workflows and show you exactly how to save time and increase revenue.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-teal-400/20 text-teal-400 px-3 py-1 rounded-full text-sm">Free Analysis</span>
                    <span className="bg-orange-400/20 text-orange-400 px-3 py-1 rounded-full text-sm">No Commitment</span>
                    <span className="bg-purple-400/20 text-purple-400 px-3 py-1 rounded-full text-sm">Expert Consultation</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-b from-gray-900/80 to-gray-800/80 border border-teal-500/30 rounded-lg p-8 hover:border-teal-500/50 transition-all duration-300">
                  <h3 className="text-3xl font-bold text-white mb-4">Book Your Free Discovery Call</h3>
                  <p className="text-gray-300 mb-6">
                    Get a personalized automation strategy session where we'll identify 
                    opportunities to streamline your business operations.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-center space-x-3 text-teal-400">
                      <div className="w-8 h-8 bg-teal-400/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">30</span>
                      </div>
                      <span>Minutes of Expert Analysis</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3 text-orange-400">
                      <div className="w-8 h-8 bg-orange-400/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">$0</span>
                      </div>
                      <span>Completely Free Consultation</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3 text-purple-400">
                      <div className="w-8 h-8 bg-purple-400/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">✓</span>
                      </div>
                      <span>Custom Automation Roadmap</span>
                    </div>
                  </div>

                  <a
                    href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1drKUCVOMA5usQoGlPHT9SYyEk777PMSRkNh2OvjkNbHkazJ-UwXZ-tzU3sk-FEgPNTMJXB7H0?gv=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-orange-500/25"
                  >
                    Book Free Discovery Call
                  </a>
                  
                  <p className="text-xs text-gray-400 mt-4">
                    No sales pressure • Just valuable insights
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

                    // href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1w-btxYSNa7lHJt-kCKF8FqpqcZSiCWjHmKJhtWEuvCQvLUBM4L8t7xKRJXKI5oe3L_hU6_5XH"