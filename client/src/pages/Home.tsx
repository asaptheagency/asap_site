import { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Problem from "../components/Problem";
import AcceleratingMaterial from "../components/AcceleratingMaterial";
import FrictionlessScaling from "../components/FrictionlessScaling";
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
        const element = document.getElementById(href!.substring(1));
        if (element) {
          window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

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
      </main>
      <Footer />
    </div>
  );
};

export default Home;
