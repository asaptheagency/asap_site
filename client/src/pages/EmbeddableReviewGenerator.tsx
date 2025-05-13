import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { fadeIn } from '../lib/animations';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Card, CardContent } from '../components/ui/card';
import logoImage from '../assets/logo_transp.png';

// Business details interface
interface BusinessDetails {
  name: string;
  type: string;
  services: string[];
  highlights: string[];
  locations: string[];
  tones: string[];
  googleMapsUrl?: string;
}

// Default business details
const DEFAULT_BUSINESS_DETAILS: BusinessDetails = {
  name: "ASAP",
  type: "Digital Marketing Agency",
  services: [
    "website design", 
    "digital marketing", 
    "automation solutions", 
    "chatbot development",
    "app development"
  ],
  highlights: [
    "Their team was incredibly responsive and professional",
    "The results exceeded my expectations",
    "They were efficient and delivered on time",
    "Their attention to detail was impressive",
    "Their expertise in automation saved me so much time",
    "The quality of their work is outstanding"
  ],
  locations: [
    "Los Angeles", 
    "New York", 
    "Chicago", 
    "Miami", 
    "San Francisco",
    "Denver"
  ],
  tones: ["enthusiastic", "professional", "casual"],
  googleMapsUrl: undefined
};

// Get business details from URL parameters
const getBusinessDetailsFromUrl = () => {
  if (typeof window === 'undefined') return DEFAULT_BUSINESS_DETAILS;
  
  const urlParams = new URLSearchParams(window.location.search);
  
  // Parse services from comma-separated list if provided
  let services = DEFAULT_BUSINESS_DETAILS.services;
  const servicesParam = urlParams.get('services');
  if (servicesParam) {
    services = servicesParam.split(',').map(s => s.trim());
  }
  
  // Parse highlights from comma-separated list if provided
  let highlights = DEFAULT_BUSINESS_DETAILS.highlights;
  const highlightsParam = urlParams.get('highlights');
  if (highlightsParam) {
    highlights = highlightsParam.split(',').map(h => h.trim());
  }
  
  return {
    name: urlParams.get('businessName') || DEFAULT_BUSINESS_DETAILS.name,
    type: urlParams.get('businessType') || DEFAULT_BUSINESS_DETAILS.type,
    services: services,
    highlights: highlights,
    locations: DEFAULT_BUSINESS_DETAILS.locations,
    tones: DEFAULT_BUSINESS_DETAILS.tones,
    googleMapsUrl: urlParams.get('googleMapsUrl') || undefined
  };
};

// Simple one-button review generator component
const EmbeddableReviewGenerator: React.FC = () => {
  const [businessDetails, setBusinessDetails] = useState(DEFAULT_BUSINESS_DETAILS);
  const [generatedReview, setGeneratedReview] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Load business details from URL on component mount
  useEffect(() => {
    const details = getBusinessDetailsFromUrl();
    setBusinessDetails(details);
  }, []);

  // Generate a random review with one click, copy to clipboard, and navigate to Google Maps
  const generateReview = () => {
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Pick random elements
      const service = businessDetails.services[Math.floor(Math.random() * businessDetails.services.length)];
      const highlight1 = businessDetails.highlights[Math.floor(Math.random() * businessDetails.highlights.length)];
      const highlight2 = businessDetails.highlights[Math.floor(Math.random() * businessDetails.highlights.length)];
      const location = businessDetails.locations[Math.floor(Math.random() * businessDetails.locations.length)];
      const tone = businessDetails.tones[Math.floor(Math.random() * businessDetails.tones.length)];
      const rating = Math.floor(Math.random() * 2) + 4; // 4 or 5
      
      // Generate review based on tone
      let review = '';
      
      switch(tone) {
        case 'enthusiastic':
          review = `Wow! ${businessDetails.name} is absolutely AMAZING! I worked with them on a ${service} project and I couldn't be happier with the results! ${highlight1}! ${highlight2}! As someone from ${location}, I can say they're definitely the best service provider I've worked with - ${rating}/5 stars easily!`;
          break;
        case 'professional':
          review = `I recently engaged ${businessDetails.name} for their ${service} services and found the experience to be excellent. ${highlight1}. Additionally, ${highlight2.toLowerCase()}. Based in ${location}, I've worked with several providers, and I would rate their service a ${rating}/5. I would recommend them to colleagues seeking quality service.`;
          break;
        case 'casual':
          review = `I used ${businessDetails.name} for ${service} work recently and had a great experience. ${highlight1} and ${highlight2.toLowerCase()}. I'm from ${location} and have tried a few different options, but these guys were definitely worth the ${rating}/5 stars I'd give them. If you need this kind of service, check them out!`;
          break;
        default:
          review = `Working with ${businessDetails.name} on my ${service} project was a great experience. ${highlight1}. ${highlight2}. Highly recommended! ${rating}/5 stars.`;
      }
      
      // Save the generated review
      setGeneratedReview(review);
      setIsGenerating(false);
      
      // Copy to clipboard
      navigator.clipboard.writeText(review);
      
      // Open Google Maps in a new tab - client specific if provided or generic if not
      const mapsUrl = businessDetails.googleMapsUrl || "https://www.google.com/maps";
      window.open(mapsUrl, "_blank");
    }, 1000);
  };

  // Generate a new review
  const generateNew = () => {
    setGeneratedReview('');
    generateReview();
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      variants={fadeIn}
      className="min-h-screen bg-black text-white py-4 px-4"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-4">
          <div className="flex justify-center mb-2">
            <ImageWithFallback
              src={logoImage}
              fallbackSrc="/logo_placeholder.png"
              alt="ASAP Logo"
              className="h-10 w-auto"
            />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-orange-500 bg-clip-text text-transparent">
            Instant Review Generator
          </h1>
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            {!generatedReview ? (
              <div className="text-center">
                <p className="mb-6 text-gray-300 text-sm">
                  When you click the button below the review generator will do the following:
                  <ul className="list-disc text-left ml-6 mt-3 space-y-1">
                    <li>Generate a positive review for {businessDetails.name} through the use of AI integration</li>
                    <li>Copy the AI generated review to your clipboard</li>
                    <li>Open the Google Maps page for {businessDetails.name}</li>
                  </ul>
                </p>
                <Button 
                  onClick={generateReview} 
                  disabled={isGenerating}
                  size="lg"
                  className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 px-8 py-6 h-auto"
                >
                  {isGenerating ? 'Processing...' : 'Submit'}
                </Button>
              </div>
            ) : (
              <div>
                <div className="bg-gray-800 p-4 rounded-lg mb-6">
                  <p className="text-gray-100 whitespace-pre-wrap">{generatedReview}</p>
                  <p className="text-green-500 mt-4 text-sm">
                    ✓ Review copied to clipboard
                    <br />
                    ✓ Google Maps opened in new tab
                  </p>
                </div>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={generateNew}
                    variant="outline"
                    className="px-6"
                  >
                    Generate New
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-4 text-center text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} ASAP All rights reserved <a href="https://www.asaptheagency.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.asaptheagency.com</a></p>
        </div>
      </div>
    </motion.div>
  );
};

export default EmbeddableReviewGenerator;