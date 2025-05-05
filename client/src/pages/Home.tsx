import { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Problem from "../components/Problem";
import AcceleratingMaterial from "../components/AcceleratingMaterial";
import FrictionlessScaling from "../components/FrictionlessScaling";
import Services from "../components/Services";
import Footer from "../components/Footer";
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
        description="A.S.A.P. THE AGENCY helps businesses automate processes and scale digital operations with targeted web design, app development, and marketing services." 
      />
      <Header />
      <main>
        <div>
          <Hero />
        </div>
        
        {/* Transition connector from Hero to Problem */}
        <div className="h-16 bg-gradient-to-b from-[rgba(75,184,166,0.2)] to-[rgba(75,184,166,0.2)]"></div>
        
        <div>
          <Problem />
        </div>
        
        {/* Transition connector from Problem to AcceleratingMaterial */}
        <div className="h-16 bg-gradient-to-b from-[rgba(75,184,166,0.3)] to-[rgba(75,184,166,0.3)]"></div>
        
        <div>
          <AcceleratingMaterial />
        </div>
        
        {/* Transition connector from AcceleratingMaterial to FrictionlessScaling */}
        <div className="h-16 bg-gradient-to-b from-[#000000] to-[#000000]"></div>
        
        <div>
          <FrictionlessScaling />
        </div>
        
        {/* Transition connector from FrictionlessScaling to Services */}
        <div className="h-16 bg-gradient-to-b from-[rgba(75,184,166,0.2)] to-[rgba(75,184,166,0.2)]"></div>
        
        <div id="services-section">
          <Services />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
