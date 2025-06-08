import { useLocation } from "wouter";
import { useEffect } from "react";

const Footer = () => {
  const [, setLocation] = useLocation();
  
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Load Google Calendar scheduling button script
    const script = document.createElement('script');
    script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
    script.async = true;
    script.onload = () => {
      // Initialize the calendar button once the script is loaded
      const calendar = (window as any).calendar;
      if (calendar && calendar.schedulingButton) {
        const container = document.getElementById('calendar-button-container');
        if (container) {
          calendar.schedulingButton.load({
            url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1drKUCVOMA5usQoGlPHT9SYyEk777PMSRkNh2OvjkNbHkazJ-UwXZ-tzU3sk-FEgPNTMJXB7H0?gv=true',
            color: '#14B8A6', // Using teal-500 to match the site theme
            label: 'Book an appointment',
            target: container,
          });
        }
      }
    };
    document.head.appendChild(script);

    // Cleanup function to remove script on component unmount
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);
  
  return (
    <>
      <footer id="contact" className="pt-20 pb-10 relative bg-black border-t-2 border-white rounded-t-2xl">
        {/* Solid black background */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div>
              <a href="/" className="inline-block mb-6">
                <span className="text-2xl font-bold">ASAP</span>
              </a>
              <p className="text-muted-foreground mb-6">
                AI-powered automation that handles your business communications 24/7. From lead follow-ups to appointment scheduling and customer outreach - let our AI agents work while you focus on growth.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/chriscastanuela" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition duration-300 glow-hover">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/_thechriscast/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition duration-300 glow-hover">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Services</h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="/services/rise" 
                    className="text-muted-foreground hover:text-accent"
                    onClick={(e) => {
                      e.preventDefault();
                      setLocation("/services/rise");
                    }}
                  >
                    R.I.S.E.
                  </a>
                </li>
                <li>
                  <a 
                    href="/services/sales-drive" 
                    className="text-muted-foreground hover:text-accent"
                    onClick={(e) => {
                      e.preventDefault();
                      setLocation("/services/sales-drive");
                    }}
                  >
                    ASAP Connect - Sales Drive
                  </a>
                </li>
                <li>
                  <a 
                    href="/services/outreach-pro" 
                    className="text-muted-foreground hover:text-accent"
                    onClick={(e) => {
                      e.preventDefault();
                      setLocation("/services/outreach-pro");
                    }}
                  >
                    ASAP Connect - OutreachPro
                  </a>
                </li>
                <li>
                  <a 
                    href="/services/front-desk" 
                    className="text-muted-foreground hover:text-accent"
                    onClick={(e) => {
                      e.preventDefault();
                      setLocation("/services/front-desk");
                    }}
                  >
                    ASAP Connect - Front Desk
                  </a>
                </li>
              </ul>
            </div>

            {/* COMMENTED OUT - Legacy Industries Section */}
            {/* <div>
              <h4 className="text-lg font-bold mb-6">Industries</h4>
              <ul className="space-y-3">
                <li><a href="/industries/law-firms" className="text-muted-foreground hover:text-accent">Law Firms</a></li>
                <li><a href="/industries/contractors" className="text-muted-foreground hover:text-accent">Roofers</a></li>
                <li><a href="/industries/pdr-shops" className="text-muted-foreground hover:text-accent">PDR Shops</a></li>
              </ul>
            </div> */}
            
            <div>
              <h4 className="text-lg font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-muted-foreground">info@asaptheagency.com</span>
                </li>
                <li className="mt-6">
                  <div id="calendar-button-container"></div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-muted">
            <div className="flex flex-col md:flex-row items-center justify-center mb-4">
              <p className="text-sm text-muted-foreground">
                &copy; {currentYear} ASAP All rights reserved <a href="/" className="text-accent hover:underline" onClick={(e) => {
                  e.preventDefault();
                  setLocation("/");
                }}>www.asaptheagency.com</a>
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              {/* Footer links can be added here if needed */}
            </div>
          </div>
        </div>
      </footer>

    </>
  );
};

export default Footer;
