import React from "react";



const TestPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header is now handled by MainLayout */}
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gray-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/attached_assets/1.webp" 
            alt="Test Page"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            Test Page
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-white/80 mt-4">
            Simplified Page for Testing
          </h2>
        </div>
      </section>
      
      {/* Content Section */}
      <main className="flex-grow bg-gray-900 z-10 relative">
        <div className="py-20">
          <div className="container mx-auto px-4">
            <section className="py-16 bg-gray-800 rounded-lg mb-10 relative z-10">
              <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    This is a test section
                  </h2>
                </div>
                
                <div className="bg-accent text-white p-4 mb-8">
                  Debug: Test section content
                </div>
                
                <div className="relative z-10">
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-lg text-muted-foreground">
                      This is a simplified test page to diagnose content rendering issues. If you're seeing this text, then content rendering is working correctly.
                    </p>
                    
                    <p className="text-lg text-muted-foreground mt-6">
                      Additional paragraph to ensure we have enough content to test scrolling and layout.
                    </p>
                  </div>
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

export default TestPage;