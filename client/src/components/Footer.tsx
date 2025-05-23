import { useLocation } from "wouter";

const Footer = () => {
  const [, setLocation] = useLocation();
  
  const currentYear = new Date().getFullYear();
  
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
                Pioneering automation-first solutions that streamline business operations and enable sustainable growth through effective promotion strategies.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/chriscastanuela" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition duration-300 glow-hover">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Industries</h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="/industries/law-firms" 
                    className="text-muted-foreground hover:text-accent"
                    onClick={(e) => {
                      e.preventDefault();
                      setLocation("/industries/law-firms");
                    }}
                  >
                    Law Firms
                  </a>
                </li>
                <li>
                  <a 
                    href="/industries/contractors" 
                    className="text-muted-foreground hover:text-accent"
                    onClick={(e) => {
                      e.preventDefault();
                      setLocation("/industries/contractors");
                    }}
                  >
                    Roofers
                  </a>
                </li>
                <li>
                  <a 
                    href="/industries/pdr-shops" 
                    className="text-muted-foreground hover:text-accent"
                    onClick={(e) => {
                      e.preventDefault();
                      setLocation("/industries/pdr-shops");
                    }}
                  >
                    PDR Shops
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-muted-foreground">info@asaptheagency.com</span>
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
