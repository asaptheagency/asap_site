import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  
  return (
    <header className="fixed w-full top-0 z-50 bg-background/30 backdrop-blur-sm border-b border-white/5">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo */}
            <a href="#" className="flex items-center" onClick={(e) => {
              e.preventDefault();
              setLocation("/");
            }}>
              <img 
                src="/images/robot.png" 
                alt="Robot Mascot" 
                className="h-12 w-auto mr-3"
                onError={(e) => {
                  console.log('Logo failed to load');
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/logo_transp.png';
                }}
              />
              <span className="text-xl font-bold">
                A.S.A.P.
              </span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <a 
              href="#home" 
              className="nav-link text-sm uppercase tracking-wider"
              onClick={(e) => {
                e.preventDefault();
                setLocation("/");
                window.scrollTo(0, 0);
              }}
            >
              Home
            </a>
            
            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                className="flex items-center space-x-1 text-sm uppercase tracking-wider"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
              >
                <span>Solutions</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                className={`absolute left-0 mt-2 bg-secondary/90 backdrop-blur-md min-w-[220px] shadow-lg rounded-md border border-border ${dropdownOpen ? 'block' : 'hidden'}`}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <a 
                  href="/services/web-design" 
                  className="block px-4 py-2 text-sm hover:text-accent"
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/services/web-design");
                    setDropdownOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  Web Design & Development
                </a>
                <a 
                  href="/services/automate" 
                  className="block px-4 py-2 text-sm hover:text-accent"
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/services/automate");
                    setDropdownOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  AutoMate
                </a>
                <a 
                  href="/services/botspot" 
                  className="block px-4 py-2 text-sm hover:text-accent"
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/services/botspot");
                    setDropdownOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  BotSpot & LeadSeed
                </a>
                <a 
                  href="/services/appsnap" 
                  className="block px-4 py-2 text-sm hover:text-accent"
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/services/appsnap");
                    setDropdownOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  AppSnap
                </a>
                <a 
                  href="/services/hyperise" 
                  className="block px-4 py-2 text-sm hover:text-accent"
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/services/hyperise");
                    setDropdownOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  HypeRise
                </a>
              </div>
            </div>
            
            <a 
              href="https://calendar.app.google/nuQzaVZ8opKfm8bo8" 
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-5 py-2 bg-accent text-accent-foreground font-semibold rounded-md whitespace-nowrap glow-hover hover:bg-accent/90 transition duration-300"
            >
              Contact Us
            </a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden flex items-center" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <motion.div 
        className={`absolute w-full bg-secondary/90 backdrop-blur-md lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: mobileMenuOpen ? 'auto' : 0, 
          opacity: mobileMenuOpen ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            <a 
              href="#home" 
              className="py-2 text-sm uppercase tracking-wider" 
              onClick={(e) => {
                e.preventDefault();
                setLocation("/");
                setMobileMenuOpen(false);
              }}
            >
              Home
            </a>
            
            {/* Mobile Services Menu */}
            <div className="py-2">
              <p className="text-sm uppercase tracking-wider mb-2">Solutions</p>
              <div className="flex flex-col space-y-2 pl-4">
                <a 
                  href="/services/web-design" 
                  className="py-1 text-sm hover:text-accent"
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/services/web-design");
                    setMobileMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  Web Design & Development
                </a>
                <a 
                  href="/services/automate" 
                  className="py-1 text-sm hover:text-accent"
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/services/automate");
                    setMobileMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  AutoMate
                </a>
                <a 
                  href="/services/botspot" 
                  className="py-1 text-sm hover:text-accent"
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/services/botspot");
                    setMobileMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  BotSpot & LeadSeed
                </a>
                <a 
                  href="/services/appsnap" 
                  className="py-1 text-sm hover:text-accent"
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/services/appsnap");
                    setMobileMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  AppSnap
                </a>
                <a 
                  href="/services/hyperise" 
                  className="py-1 text-sm hover:text-accent"
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/services/hyperise");
                    setMobileMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  HypeRise
                </a>
              </div>
            </div>
            
            <a 
              href="https://calendar.app.google/nuQzaVZ8opKfm8bo8"
              target="_blank"
              rel="noopener noreferrer" 
              className="py-2 bg-accent text-accent-foreground font-semibold rounded-md text-center whitespace-nowrap"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </a>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
