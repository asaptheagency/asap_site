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
  services: string[];
  highlights: string[];
  locations: string[];
  tones: string[];
  googleMapsUrl?: string;
  apiKey?: string;
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
    googleMapsUrl: urlParams.get('googleMapsUrl') || undefined,
    apiKey: urlParams.get('apiKey') || undefined
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

  // Generate a review using OpenAI API, copy to clipboard, and navigate to Google Maps
  const generateReview = async () => {
    setIsGenerating(true);
    
    try {
      // Get random location and tone for variety, but focus on customer satisfaction
      const location = businessDetails.locations[Math.floor(Math.random() * businessDetails.locations.length)];
      const tone = businessDetails.tones[Math.floor(Math.random() * businessDetails.tones.length)];
      
      const prompt = `Generate a positive customer review for ${businessDetails.name}, a ${businessDetails.type}.
      Focus on overall customer satisfaction and experience rather than specific service details.
      Make the review sound authentic, as if written by a happy customer from ${location}.
      The tone should be ${tone}.
      The review should be 3-5 sentences long, focus on how the customer felt about their experience, and avoid mentioning specific service details.`;
      
      // Detect if we're in production
      const isProduction = 
        window.location.hostname === 'asaptheagency.com' || 
        window.location.hostname.includes('.netlify.app') ||
        (!window.location.hostname.includes('localhost') && !window.location.hostname.includes('.replit.app'));
      
      console.log("Review Generator - Environment detection:", isProduction ? "Production" : "Development");
      console.log("Review Generator - Current hostname:", window.location.hostname);
      
      // For production, use the OpenAI API directly if we have an API key in URL parameters
      let response;
      
      if (isProduction && businessDetails.apiKey) {
        console.log("Review Generator - Using direct OpenAI API with client key");
        
        // Use the OpenAI API directly with the client's API key
        response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${businessDetails.apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a helpful assistant that generates authentic-sounding customer reviews."
              },
              {
                role: "user",
                content: prompt
              }
            ],
            temperature: 0.7,
            max_tokens: 250
          })
        });
      } else {
        // For development, use the local API endpoint
        console.log("Review Generator - Using server API endpoint");
        response = await fetch('/api/openai/generate-review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt })
        });
      }
      
      if (!response.ok) {
        throw new Error('Error generating review. Please try again later.');
      }
      
      const data = await response.json();
      console.log("Review Generator - API Response Data:", data);
      
      // Handle different response formats based on API source
      let reviewText = '';
      
      if (isProduction && businessDetails.apiKey) {
        // For direct OpenAI API calls (using client API key)
        if (data.choices && data.choices[0] && data.choices[0].message) {
          reviewText = data.choices[0].message.content.trim();
        } else {
          console.error("Review Generator - Unexpected OpenAI API response format:", data);
          throw new Error("The API returned an unexpected response format");
        }
      } else {
        // For server API endpoint (using server API key)
        if (data.review) {
          reviewText = data.review.trim();
        } else {
          console.error("Review Generator - Unexpected server API response format:", data);
          throw new Error("The server returned an unexpected response format");
        }
      }
      
      console.log("Review Generator - Generated review text:", reviewText);
      
      // Save the generated review
      setGeneratedReview(reviewText);
      
      // Copy to clipboard
      navigator.clipboard.writeText(reviewText);
      
      // Open Google Maps in a new tab - client specific if provided or ASAP default if not
      // This version is the embedded version that can be either used for ASAP or clients
      const mapsUrl = businessDetails.googleMapsUrl || DEFAULT_ASAP_GOOGLE_MAPS_URL;
      window.open(mapsUrl, "_blank");
    } catch (error) {
      console.error('Error generating review:', error);
      // Show an error message or handle as needed
      alert('There was an error generating the review. Please try again later.');
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