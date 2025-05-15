import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { fadeIn } from '../lib/animations';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Card, CardContent } from '../components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { DEFAULT_ASAP_GOOGLE_MAPS_URL, RATE_LIMITING } from '../config';
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
  apiKey?: string; // API key passed as URL parameter
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
  googleMapsUrl: undefined,
  apiKey: undefined
};

// Get business details from URL parameters, including API key
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
    apiKey: urlParams.get('apiKey') || undefined // Get API key from URL parameters
  };
};

// Client Iframe Review Generator component
const ClientIframeReviewGenerator: React.FC = () => {
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>(DEFAULT_BUSINESS_DETAILS);
  const [generatedReview, setGeneratedReview] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [usageCount, setUsageCount] = useState<number>(0);
  const [lastUsageTime, setLastUsageTime] = useState<number | null>(null);
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);
  const MAX_USAGE_PER_HOUR = 20; // Higher limit since this is managed by the business
  const USAGE_COOLDOWN = 5000; // 5 seconds cooldown between requests
  const cooldownTimerRef = useRef<number | null>(null);
  const hourlyUsageKey = `hourly_usage_${businessDetails.name.replace(/[^a-zA-Z0-9]/g, '_')}`;

  // Load business details from URL on component mount
  useEffect(() => {
    const details = getBusinessDetailsFromUrl();
    setBusinessDetails(details);
    
    // Load usage statistics
    const currentHour = new Date().getHours();
    const lastHour = parseInt(localStorage.getItem(`${hourlyUsageKey}_hour`) || '-1', 10);
    
    if (lastHour !== currentHour) {
      // Reset counter if it's a new hour
      localStorage.setItem(`${hourlyUsageKey}_hour`, currentHour.toString());
      localStorage.setItem(hourlyUsageKey, '0');
      setUsageCount(0);
    } else {
      // Load existing count
      const count = parseInt(localStorage.getItem(hourlyUsageKey) || '0', 10);
      setUsageCount(count);
    }

    // Load last usage timestamp
    const lastUsage = localStorage.getItem(`${hourlyUsageKey}_time`);
    if (lastUsage) {
      setLastUsageTime(parseInt(lastUsage, 10));
      
      // Check if still in cooldown period
      const now = Date.now();
      const elapsed = now - parseInt(lastUsage, 10);
      if (elapsed < USAGE_COOLDOWN) {
        const remaining = Math.ceil((USAGE_COOLDOWN - elapsed) / 1000);
        setCooldownRemaining(remaining);
        
        // Start cooldown timer
        startCooldownTimer(remaining);
      }
    }
    
    return () => {
      if (cooldownTimerRef.current) {
        clearInterval(cooldownTimerRef.current);
      }
    };
  }, []);

  // Start cooldown timer
  const startCooldownTimer = (seconds: number) => {
    if (cooldownTimerRef.current) {
      clearInterval(cooldownTimerRef.current);
    }
    
    setCooldownRemaining(seconds);
    
    // @ts-ignore - setTimeout returns number in browser but NodeJS.Timeout in Node
    cooldownTimerRef.current = setInterval(() => {
      setCooldownRemaining(prev => {
        if (prev <= 1) {
          clearInterval(cooldownTimerRef.current as number);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Check if we can generate a review (not in cooldown and under usage limit)
  const canGenerateReview = () => {
    // Check if we're in cooldown period
    if (cooldownRemaining > 0) {
      return false;
    }
    
    // Check hourly usage limit
    return usageCount < MAX_USAGE_PER_HOUR;
  };

  // Track usage
  const trackUsage = () => {
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    
    // Save to localStorage
    localStorage.setItem(hourlyUsageKey, newCount.toString());
    
    // Record timestamp of usage
    const now = Date.now();
    setLastUsageTime(now);
    localStorage.setItem(`${hourlyUsageKey}_time`, now.toString());
    
    // Start cooldown timer
    startCooldownTimer(USAGE_COOLDOWN / 1000);
  };

  // Generate a review using the API key from the URL
  const generateReview = async () => {
    if (!businessDetails.apiKey) {
      setError("No API key provided. Please contact the site administrator.");
      return;
    }
    
    if (!businessDetails.googleMapsUrl) {
      setError("No Google Maps URL provided. The client implementation requires a specific Google Maps URL.");
      return;
    }
    
    if (!canGenerateReview()) {
      if (cooldownRemaining > 0) {
        setError(`Please wait ${cooldownRemaining} seconds before generating another review`);
      } else {
        setError(`Hourly limit of ${MAX_USAGE_PER_HOUR} reviews reached. Try again later.`);
      }
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    try {
      // Location and tone selection - focus on customer satisfaction
      const location = businessDetails.locations[Math.floor(Math.random() * businessDetails.locations.length)];
      const tone = businessDetails.tones[Math.floor(Math.random() * businessDetails.tones.length)];
      
      const prompt = `Generate a positive customer review for ${businessDetails.name}, a ${businessDetails.type}.
      Focus solely on overall customer satisfaction and experience rather than specific service details.
      Make the review sound authentic, as if written by a happy customer from ${location}.
      The tone should be ${tone}.
      The review should be 3-5 sentences long, focus on how the customer felt about their experience, and avoid mentioning specific service details.`;
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${businessDetails.apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that generates realistic customer reviews based on the provided information."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 350
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Error contacting OpenAI API');
      }
      
      const data = await response.json();
      const reviewText = data.choices[0].message.content.trim();
      
      // Track this usage
      trackUsage();
      
      // Set generated review
      setGeneratedReview(reviewText);
      
      // Copy to clipboard
      navigator.clipboard.writeText(reviewText);
      
      // For client implementations, we ONLY use their provided URL, not ASAP's default
      // Client implementations REQUIRE both a business-specific Google Maps URL and API key
      if (businessDetails.googleMapsUrl) {
        window.open(businessDetails.googleMapsUrl, "_blank");
      } else {
        console.warn("No Google Maps URL provided for client. This implementation requires a client-specific URL.");
      }
      
    } catch (err: any) {
      console.error("Error generating review:", err);
      setError(err.message || 'Error generating review. Please try again later.');
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
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <ImageWithFallback
              src={logoImage}
              fallbackSrc="/logo_placeholder.png"
              alt="ASAP Logo"
              className="h-12 w-auto"
            />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-orange-500 bg-clip-text text-transparent">
            {businessDetails.name} Review Generator
          </h1>
          <p className="mt-2 text-gray-300 text-sm">
            Generate authentic reviews for {businessDetails.name} with a single click
          </p>
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-900/30 border-red-800 text-white">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="text-center mb-6">
              <p className="text-gray-300 text-sm">
                When you click the button below the review generator will:
              </p>
              <ul className="list-disc text-left ml-8 mt-2 space-y-1 text-sm text-gray-300">
                <li>Generate a positive review for {businessDetails.name}</li>
                <li>Copy the generated review to your clipboard</li>
                <li>Open the Google Maps page for {businessDetails.name}</li>
              </ul>
            </div>

            {generatedReview && (
              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-2">Generated Review</h3>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                  {generatedReview}
                </p>
                <p className="text-green-500 mt-3 text-xs">
                  ✓ Review copied to clipboard
                  <br />
                  ✓ Google Maps opened in new tab
                </p>
              </div>
            )}

            <div className="flex justify-center">
              {generatedReview ? (
                <Button 
                  onClick={generateNew}
                  className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
                  disabled={isGenerating || !canGenerateReview()}
                >
                  {isGenerating ? 'Processing...' : 'Generate New'}
                </Button>
              ) : (
                <Button 
                  onClick={generateReview}
                  className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
                  disabled={isGenerating || !canGenerateReview()}
                >
                  {isGenerating ? 'Processing...' : 'Generate Review'}
                </Button>
              )}
            </div>
            
            {cooldownRemaining > 0 && (
              <p className="text-center text-orange-400 text-xs mt-2">
                Please wait {cooldownRemaining} seconds before generating another review
              </p>
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

export default ClientIframeReviewGenerator;