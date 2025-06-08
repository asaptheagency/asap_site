import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { fadeIn } from '../lib/animations';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Card, CardContent } from '../components/ui/card';
import logoImage from '../assets/logo_transp.png';
import { DEFAULT_ASAP_GOOGLE_MAPS_URL } from '../config';
import { generateFallbackReview } from '../backend';

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
    console.log("🔍 REVIEW GENERATOR - Starting generation process...");
    console.log("🔍 REVIEW GENERATOR - Environment:", {
      hostname: window.location.hostname,
      pathname: window.location.pathname,
      search: window.location.search,
      href: window.location.href
    });
    console.log("🔍 REVIEW GENERATOR - Business Details:", JSON.stringify(businessDetails, null, 2));
    
    setIsGenerating(true);
    
    try {
      // Get random location and tone for variety, but focus on customer satisfaction
      const location = businessDetails.locations[Math.floor(Math.random() * businessDetails.locations.length)];
      const tone = businessDetails.tones[Math.floor(Math.random() * businessDetails.tones.length)];
      
      console.log("🔍 REVIEW GENERATOR - Selected location:", location);
      console.log("🔍 REVIEW GENERATOR - Selected tone:", tone);
      
      const prompt = `Generate a positive customer review for ${businessDetails.name}, a ${businessDetails.type}.
      Focus on overall customer satisfaction and experience rather than specific service details.
      Make the review sound authentic, as if written by a happy customer from ${location}.
      The tone should be ${tone}.
      The review should be 3-5 sentences long, focus on how the customer felt about their experience, and avoid mentioning specific service details.`;
      
      console.log("🔍 REVIEW GENERATOR - Generated prompt:", prompt);
      
      let reviewText = '';
      let success = false;
      
      // ========== APPROACH 1: Try direct OpenAI API call with client API key if available ==========
      if (businessDetails.apiKey && !success) {
        console.log("🔍 REVIEW GENERATOR - ATTEMPT 1: Using direct OpenAI API");
        console.log("🔍 REVIEW GENERATOR - API Key available (masked):", businessDetails.apiKey ? "✓ YES (starts with: " + businessDetails.apiKey.substring(0, 3) + "...)" : "✗ NO");
        
        try {
          const directApiRequestBody = {
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
          };
          
          console.log("🔍 REVIEW GENERATOR - ATTEMPT 1: Request body:", JSON.stringify(directApiRequestBody, null, 2));
          
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${businessDetails.apiKey}`
            },
            body: JSON.stringify(directApiRequestBody)
          });
          
          console.log("🔍 REVIEW GENERATOR - ATTEMPT 1: Response status:", response.status);
          console.log("🔍 REVIEW GENERATOR - ATTEMPT 1: Response OK:", response.ok);
          
          if (response.ok) {
            const responseText = await response.text();
            console.log("🔍 REVIEW GENERATOR - ATTEMPT 1: Raw response:", responseText);
            
            try {
              const data = JSON.parse(responseText);
              console.log("🔍 REVIEW GENERATOR - ATTEMPT 1: Parsed data:", JSON.stringify(data, null, 2));
              
              if (data.choices && data.choices[0] && data.choices[0].message) {
                reviewText = data.choices[0].message.content.trim();
                success = true;
                console.log("🔍 REVIEW GENERATOR - ATTEMPT 1: SUCCESS! Generated review:", reviewText);
              } else {
                console.error("🔍 REVIEW GENERATOR - ATTEMPT 1: Response format issue. Missing choices/message.", data);
              }
            } catch (parseError) {
              console.error("🔍 REVIEW GENERATOR - ATTEMPT 1: JSON parse error:", parseError);
              console.error("🔍 REVIEW GENERATOR - ATTEMPT 1: Raw response that failed parsing:", responseText);
            }
          } else {
            const errorText = await response.text();
            console.error("🔍 REVIEW GENERATOR - ATTEMPT 1: Error response:", errorText);
            try {
              const errorJson = JSON.parse(errorText);
              console.error("🔍 REVIEW GENERATOR - ATTEMPT 1: Parsed error:", JSON.stringify(errorJson, null, 2));
            } catch (e) {
              console.error("🔍 REVIEW GENERATOR - ATTEMPT 1: Could not parse error as JSON");
            }
          }
        } catch (error: any) {
          console.error("🔍 REVIEW GENERATOR - ATTEMPT 1: Exception:", error);
          console.error("🔍 REVIEW GENERATOR - ATTEMPT 1: Error details:", {
            name: error?.name || 'unknown',
            message: error?.message || 'No message available',
            stack: error?.stack || 'No stack trace available'
          });
        }
      } else {
        console.log("🔍 REVIEW GENERATOR - ATTEMPT 1: Skipped (no API key)");
      }
      
      // ========== APPROACH 2: Try server endpoint if client key failed or wasn't provided ==========
      if (!success) {
        console.log("🔍 REVIEW GENERATOR - ATTEMPT 2: Using server API endpoint");
        
        try {
          const serverRequestBody = { prompt };
          console.log("🔍 REVIEW GENERATOR - ATTEMPT 2: Request body:", JSON.stringify(serverRequestBody, null, 2));
          
          const response = await fetch('/api/openai/generate-review', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(serverRequestBody)
          });
          
          console.log("🔍 REVIEW GENERATOR - ATTEMPT 2: Response status:", response.status);
          console.log("🔍 REVIEW GENERATOR - ATTEMPT 2: Response OK:", response.ok);
          
          if (response.ok) {
            const responseText = await response.text();
            console.log("🔍 REVIEW GENERATOR - ATTEMPT 2: Raw response:", responseText);
            
            try {
              const data = JSON.parse(responseText);
              console.log("🔍 REVIEW GENERATOR - ATTEMPT 2: Parsed data:", JSON.stringify(data, null, 2));
              
              if (data.review) {
                reviewText = data.review.trim();
                success = true;
                console.log("🔍 REVIEW GENERATOR - ATTEMPT 2: SUCCESS! Generated review:", reviewText);
              } else {
                console.error("🔍 REVIEW GENERATOR - ATTEMPT 2: Response format issue. Missing 'review' field.", data);
              }
            } catch (parseError) {
              console.error("🔍 REVIEW GENERATOR - ATTEMPT 2: JSON parse error:", parseError);
              console.error("🔍 REVIEW GENERATOR - ATTEMPT 2: Raw response that failed parsing:", responseText);
            }
          } else {
            const errorText = await response.text();
            console.error("🔍 REVIEW GENERATOR - ATTEMPT 2: Error response:", errorText);
            try {
              const errorJson = JSON.parse(errorText);
              console.error("🔍 REVIEW GENERATOR - ATTEMPT 2: Parsed error:", JSON.stringify(errorJson, null, 2));
            } catch (e) {
              console.error("🔍 REVIEW GENERATOR - ATTEMPT 2: Could not parse error as JSON");
            }
          }
        } catch (error: any) {
          console.error("🔍 REVIEW GENERATOR - ATTEMPT 2: Exception:", error);
          console.error("🔍 REVIEW GENERATOR - ATTEMPT 2: Error details:", {
            name: error?.name || 'unknown',
            message: error?.message || 'No message available',
            stack: error?.stack || 'No stack trace available'
          });
        }
      } else {
        console.log("🔍 REVIEW GENERATOR - ATTEMPT 2: Skipped (already succeeded)");
      }
      
      // ========== APPROACH 3: Try absolute URL if previous attempts failed ==========
      if (!success) {
        console.log("🔍 REVIEW GENERATOR - ATTEMPT 3: Using absolute URL to server endpoint");
        
        try {
          const baseUrl = window.location.origin;
          const absoluteUrl = `${baseUrl}/api/openai/generate-review`;
          console.log("🔍 REVIEW GENERATOR - ATTEMPT 3: Absolute URL:", absoluteUrl);
          
          const serverRequestBody = { prompt };
          console.log("🔍 REVIEW GENERATOR - ATTEMPT 3: Request body:", JSON.stringify(serverRequestBody, null, 2));
          
          const response = await fetch(absoluteUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(serverRequestBody)
          });
          
          console.log("🔍 REVIEW GENERATOR - ATTEMPT 3: Response status:", response.status);
          console.log("🔍 REVIEW GENERATOR - ATTEMPT 3: Response OK:", response.ok);
          
          if (response.ok) {
            const responseText = await response.text();
            console.log("🔍 REVIEW GENERATOR - ATTEMPT 3: Raw response:", responseText);
            
            try {
              const data = JSON.parse(responseText);
              console.log("🔍 REVIEW GENERATOR - ATTEMPT 3: Parsed data:", JSON.stringify(data, null, 2));
              
              if (data.review) {
                reviewText = data.review.trim();
                success = true;
                console.log("🔍 REVIEW GENERATOR - ATTEMPT 3: SUCCESS! Generated review:", reviewText);
              } else {
                console.error("🔍 REVIEW GENERATOR - ATTEMPT 3: Response format issue. Missing 'review' field.", data);
              }
            } catch (parseError) {
              console.error("🔍 REVIEW GENERATOR - ATTEMPT 3: JSON parse error:", parseError);
              console.error("🔍 REVIEW GENERATOR - ATTEMPT 3: Raw response that failed parsing:", responseText);
            }
          } else {
            const errorText = await response.text();
            console.error("🔍 REVIEW GENERATOR - ATTEMPT 3: Error response:", errorText);
            try {
              const errorJson = JSON.parse(errorText);
              console.error("🔍 REVIEW GENERATOR - ATTEMPT 3: Parsed error:", JSON.stringify(errorJson, null, 2));
            } catch (e) {
              console.error("🔍 REVIEW GENERATOR - ATTEMPT 3: Could not parse error as JSON");
            }
          }
        } catch (error: any) {
          console.error("🔍 REVIEW GENERATOR - ATTEMPT 3: Exception:", error);
          console.error("🔍 REVIEW GENERATOR - ATTEMPT 3: Error details:", {
            name: error?.name || 'unknown',
            message: error?.message || 'No message available',
            stack: error?.stack || 'No stack trace available'
          });
        }
      } else {
        console.log("🔍 REVIEW GENERATOR - ATTEMPT 3: Skipped (already succeeded)");
      }
      
      // ========== APPROACH 4: Use fallback if all API attempts failed ==========
      if (!success) {
        console.log("🔍 REVIEW GENERATOR - ATTEMPT 4: Using fallback generator");
        reviewText = generateFallbackReview(businessDetails.name, businessDetails.type, location);
        console.log("🔍 REVIEW GENERATOR - ATTEMPT 4: Generated fallback review:", reviewText);
        success = true;
      } else {
        console.log("🔍 REVIEW GENERATOR - ATTEMPT 4: Skipped (already succeeded)");
      }
      
      console.log("🔍 REVIEW GENERATOR - FINAL RESULT - Success:", success);
      console.log("🔍 REVIEW GENERATOR - FINAL RESULT - Generated review:", reviewText);
      
      // Save the generated review
      console.log("🔍 REVIEW GENERATOR - Updating state with generated review");
      setGeneratedReview(reviewText);
      
      // Copy to clipboard
      try {
        console.log("🔍 REVIEW GENERATOR - Copying to clipboard");
        await navigator.clipboard.writeText(reviewText);
        console.log("🔍 REVIEW GENERATOR - Copied to clipboard successfully");
      } catch (clipboardError) {
        console.error("🔍 REVIEW GENERATOR - Clipboard error:", clipboardError);
      }
      
      // Open Google Maps in a new tab - client specific if provided or ASAP default if not
      // This version is the embedded version that can be either used for ASAP or clients
      const mapsUrl = businessDetails.googleMapsUrl || DEFAULT_ASAP_GOOGLE_MAPS_URL;
      console.log("🔍 REVIEW GENERATOR - Opening Google Maps URL:", mapsUrl);
      
      try {
        const newWindow = window.open(mapsUrl, "_blank");
        if (newWindow) {
          console.log("🔍 REVIEW GENERATOR - Google Maps opened successfully");
        } else {
          console.error("🔍 REVIEW GENERATOR - Failed to open Google Maps - popup might be blocked");
        }
      } catch (navigationError) {
        console.error("🔍 REVIEW GENERATOR - Navigation error:", navigationError);
      }
    } catch (error: any) {
      console.error('🔍 REVIEW GENERATOR - CRITICAL ERROR:', error);
      console.error('🔍 REVIEW GENERATOR - Error details:', {
        name: error?.name || 'unknown',
        message: error?.message || 'No message available',
        stack: error?.stack || 'No stack trace available'
      });
      // Show an error message or handle as needed
      alert('There was an error generating the review. Please try again later.');
    } finally {
      console.log('🔍 REVIEW GENERATOR - Process complete, setting isGenerating to false');
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