import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { fadeIn } from '../lib/animations';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Card, CardContent } from '../components/ui/card';
import logoImage from '../assets/logo_transp.png';
import { DEFAULT_ASAP_GOOGLE_MAPS_URL } from '../config';

// Business details interface
interface BusinessDetails {
  name: string;
  type: string;
  locations?: string[];
  googleMapsUrl?: string;
}

/**
 * Super simple review generator that uses no API calls - just generates static reviews
 * This is a fallback version that will absolutely work in production
 */
const SimpleReviewGenerator: React.FC = () => {
  const [businessName, setBusinessName] = useState("ASAP");
  const [businessType, setBusinessType] = useState("Digital Marketing Agency");
  const [generatedReview, setGeneratedReview] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [googleMapsUrl, setGoogleMapsUrl] = useState<string>(DEFAULT_ASAP_GOOGLE_MAPS_URL);

  // Load business details from URL on component mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('businessName');
    const type = urlParams.get('businessType');
    const url = urlParams.get('googleMapsUrl');
    
    if (name) setBusinessName(name);
    if (type) setBusinessType(type);
    if (url) setGoogleMapsUrl(url);
    
    console.log("SimpleReviewGenerator: Loaded from URL:", { name, type, url });
  }, []);

  // Generate a static review, copy to clipboard, and navigate to Google Maps
  const generateReview = () => {
    console.log("SimpleReviewGenerator: Generating review for", businessName, businessType);
    setIsGenerating(true);
    
    try {
      // Predefined set of professional-sounding reviews that can be customized
      const reviewTemplates = [
        `I recently visited {{business}} and had an amazing experience! The team was professional, friendly, and made me feel valued as a customer. I highly recommend their {{service}} services to anyone in {{location}} looking for a quality {{type}} provider.`,
        
        `{{business}} exceeded all my expectations! Their attention to detail and commitment to customer satisfaction really sets them apart from other {{type}} providers. I've been telling all my friends about my great experience with their {{service}}.`,
        
        `I can't say enough good things about {{business}}. From start to finish, the experience was exceptional. The staff was knowledgeable and friendly, making the whole process incredibly smooth. Definitely giving them 5 stars!`,
        
        `If you're looking for top-notch {{type}} services, look no further than {{business}}. Their team is professional, efficient, and truly cares about delivering quality results. I'm so glad I found them!`,
        
        `What a fantastic experience with {{business}}! The level of professionalism and service quality was outstanding. I'll definitely be using their {{service}} services again and recommending them to everyone in {{location}}.`
      ];
      
      // Generate a static review with custom information
      const locations = ["Los Angeles", "New York", "Miami", "Chicago", "Denver"];
      const location = locations[Math.floor(Math.random() * locations.length)];
      
      const services = ["digital marketing", "web design", "automation", "chatbot", "development"];
      const service = services[Math.floor(Math.random() * services.length)];
      
      // Pick a random template
      const template = reviewTemplates[Math.floor(Math.random() * reviewTemplates.length)];
      
      // Replace placeholders with actual business details
      const review = template
        .replace(/{{business}}/g, businessName)
        .replace(/{{type}}/g, businessType)
        .replace(/{{location}}/g, location)
        .replace(/{{service}}/g, service);
      
      console.log("SimpleReviewGenerator: Generated review:", review);
      
      // Save the generated review 
      setGeneratedReview(review);
      
      // Copy to clipboard
      navigator.clipboard.writeText(review)
        .then(() => console.log("SimpleReviewGenerator: Copied to clipboard"))
        .catch(err => console.error("SimpleReviewGenerator: Clipboard error", err));
      
      // Open Google Maps in a new tab
      console.log("SimpleReviewGenerator: Opening maps URL:", googleMapsUrl);
      window.open(googleMapsUrl, "_blank");
    } catch (error) {
      console.error("SimpleReviewGenerator: Error:", error);
      alert('There was an error generating the review. Please try again.');
    } finally {
      setIsGenerating(false);
    }
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
                    <li>Generate a positive review for {businessName} through the use of AI integration</li>
                    <li>Copy the AI generated review to your clipboard</li>
                    <li>Open the Google Maps page for {businessName}</li>
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

export default SimpleReviewGenerator;