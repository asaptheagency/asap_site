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

// Default business details (these get overridden by URL parameters)
const DEFAULT_BUSINESS_DETAILS: BusinessDetails = {
  name: "ASAP",
  type: "Digital Marketing Agency",
  services: ["Marketing", "Web Development", "Automation", "ChatBots"],
  highlights: ["Excellent customer service", "Fast turnaround", "Quality work", "Innovative solutions"],
  locations: ["Boston", "New York", "San Francisco", "Chicago", "Miami", "Los Angeles"],
  tones: ["friendly", "professional", "enthusiastic", "appreciative", "impressed"],
  googleMapsUrl: DEFAULT_ASAP_GOOGLE_MAPS_URL
};

// Rate limiting constants from config
const MAX_HOURLY_USAGE = RATE_LIMITING.MAX_HOURLY_USAGE;
const USAGE_COOLDOWN = RATE_LIMITING.USAGE_COOLDOWN; // Already in milliseconds

export default function ClientIframeReviewGenerator() {
  // State for the generated review
  const [generatedReview, setGeneratedReview] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [remainingUses, setRemainingUses] = useState(MAX_HOURLY_USAGE);
  const [lastUsageTime, setLastUsageTime] = useState(0);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [copyButtonText, setCopyButtonText] = useState("Copy to Clipboard");
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>(DEFAULT_BUSINESS_DETAILS);
  
  // Ref for the timer
  const cooldownTimerRef = useRef<number | null>(null);
  
  // Today's date for the hourly usage key
  const today = new Date().toISOString().split('T')[0];
  const hourlyUsageKey = `review_generator_usage_${today}`;
  
  useEffect(() => {
    // Parse URL parameters to extract business details and API key
    const params = new URLSearchParams(window.location.search);
    
    // Initialize business details with defaults
    const details = { ...DEFAULT_BUSINESS_DETAILS };
    
    // Update business details from URL parameters
    if (params.get('name')) details.name = params.get('name')!;
    if (params.get('type')) details.type = params.get('type')!;
    if (params.get('services')) details.services = params.get('services')!.split(',');
    if (params.get('highlights')) details.highlights = params.get('highlights')!.split(',');
    if (params.get('locations')) details.locations = params.get('locations')!.split(',');
    if (params.get('tones')) details.tones = params.get('tones')!.split(',');
    if (params.get('googleMapsUrl')) details.googleMapsUrl = params.get('googleMapsUrl')!;
    if (params.get('apiKey')) details.apiKey = params.get('apiKey')!;
    
    // Set the business details
    setBusinessDetails(details);
    
    // Check rate limits from localStorage
    const storedUsage = localStorage.getItem(hourlyUsageKey);
    const storedTime = localStorage.getItem(`${hourlyUsageKey}_time`);
    
    if (storedUsage) {
      const parsedUsage = parseInt(storedUsage, 10);
      setRemainingUses(MAX_HOURLY_USAGE - parsedUsage);
    }
    
    if (storedTime) {
      const lastTime = parseInt(storedTime, 10);
      const timeSinceLastUse = Date.now() - lastTime;
      
      if (timeSinceLastUse < USAGE_COOLDOWN) {
        const remainingCooldown = Math.ceil((USAGE_COOLDOWN - timeSinceLastUse) / 1000);
        startCooldownTimer(remainingCooldown);
      }
      
      setLastUsageTime(lastTime);
    }
    
    return () => {
      if (cooldownTimerRef.current) {
        window.clearInterval(cooldownTimerRef.current);
      }
    };
  }, []);
  
  // Function to start the cooldown timer
  const startCooldownTimer = (duration: number) => {
    setCooldownRemaining(duration);
    
    // Clear existing timer if it exists
    if (cooldownTimerRef.current) {
      window.clearInterval(cooldownTimerRef.current);
    }
    
    // Set up the timer
    const timer = window.setInterval(() => {
      setCooldownRemaining(prev => {
        if (prev <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    cooldownTimerRef.current = timer;
  };
  
  // Check if the user can generate a review
  const canGenerateReview = () => {
    if (remainingUses <= 0) {
      setError(`You've reached the hourly limit of ${MAX_HOURLY_USAGE} reviews`);
      return false;
    }
    
    const timeSinceLastUse = Date.now() - lastUsageTime;
    if (timeSinceLastUse < USAGE_COOLDOWN) {
      const remainingSec = Math.ceil((USAGE_COOLDOWN - timeSinceLastUse) / 1000);
      startCooldownTimer(remainingSec);
      setError(`Please wait ${remainingSec} seconds before generating another review`);
      return false;
    }
    
    return true;
  };
  
  // Track usage for rate limiting
  const trackUsage = () => {
    // Get current usage
    const storedUsage = localStorage.getItem(hourlyUsageKey) || "0";
    const newUsage = parseInt(storedUsage, 10) + 1;
    
    // Update remaining uses
    setRemainingUses(MAX_HOURLY_USAGE - newUsage);
    
    // Save new usage
    localStorage.setItem(hourlyUsageKey, newUsage.toString());
    
    // Record timestamp of usage
    const now = Date.now();
    setLastUsageTime(now);
    localStorage.setItem(`${hourlyUsageKey}_time`, now.toString());
    
    // Start cooldown timer
    startCooldownTimer(USAGE_COOLDOWN / 1000);
  };
  
  // Generate a review using the appropriate API endpoint
  const generateReview = async () => {
    // Clear any previous errors
    setError("");
    
    // Check if we need to use client API key (embedded mode) or server API (ASAP website)
    const useDirectApi = !!businessDetails.apiKey && !!businessDetails.googleMapsUrl;
    
    // For embedded client sites, we need API key and Google Maps URL
    if (useDirectApi && !businessDetails.apiKey) {
      setError("No API key provided. Please contact the site administrator.");
      return;
    }
    
    if (useDirectApi && !businessDetails.googleMapsUrl) {
      setError("No Google Maps URL provided. This implementation requires a client-specific URL.");
      return;
    }
    
    // Check rate limits
    if (!canGenerateReview()) {
      return;
    }
    
    // Start generating
    setIsGenerating(true);
    
    try {
      // Get random items from arrays
      const location = businessDetails.locations[Math.floor(Math.random() * businessDetails.locations.length)];
      const tone = businessDetails.tones[Math.floor(Math.random() * businessDetails.tones.length)];
      const service = businessDetails.services[Math.floor(Math.random() * businessDetails.services.length)];
      const highlight = businessDetails.highlights[Math.floor(Math.random() * businessDetails.highlights.length)];
      
      // Create prompt for review generation
      const prompt = `Generate a positive 5-star review for ${businessDetails.name}, a ${businessDetails.type}.
      Make the review sound authentic, as if written by a happy customer from ${location}.
      The tone should be ${tone}.
      The review should be 3-5 sentences long, focus on how the customer felt about their experience, and avoid mentioning specific service details.`;
      
      let response;
      
      if (!useDirectApi) {
        try {
          // For ASAP website, use the server endpoint that has API key in environment
          // Use the full URL to ensure it works in all environments including production
          const baseUrl = window.location.origin;
          const apiUrl = `${baseUrl}/api/openai/generate-review`;
          
          console.log(`Making API request to: ${apiUrl}`);
          console.log(`Request body:`, JSON.stringify({ prompt }));
          
          response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              prompt
            })
          });
          
          console.log(`API response status: ${response.status}`);
          
          // If there's a problem with the API call, catch it early with detailed info
          if (!response.ok) {
            const errorText = await response.text();
            console.error(`API error (${response.status}): ${errorText}`);
            throw new Error(`Server API Error (${response.status}): ${errorText || 'Unknown error'}`);
          }
        } catch (apiError) {
          console.error('Server API call failed:', apiError);
          throw apiError; // Re-throw to be caught by the outer try/catch
        }
      } else {
        // For client sites, use their API key directly
        response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${businessDetails.apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo", // Use a more affordable model for client implementations
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
            max_tokens: 350
          })
        });
      }
      
      // This check is only needed for the client API since the server API has its own check
      if (useDirectApi && !response.ok) {
        let errorMessage = 'Error generating review';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error?.message || errorMessage;
        } catch (e) {
          console.error('Could not parse error response', e);
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      
      // Handle different response formats with better error handling
      let reviewText = '';
      try {
        if (!useDirectApi) {
          // Format from server API endpoint
          console.log("Server API response data:", data);
          if (data && data.review) {
            reviewText = data.review.trim();
          } else {
            console.error("Unexpected server API response format:", data);
            throw new Error("The server returned an unexpected response format");
          }
        } else {
          // Format from direct OpenAI API call
          console.log("OpenAI API response data:", data);
          if (data && data.choices && data.choices[0] && data.choices[0].message) {
            reviewText = data.choices[0].message.content.trim();
          } else {
            console.error("Unexpected OpenAI API response format:", data);
            throw new Error("The OpenAI API returned an unexpected response format");
          }
        }
        
        if (!reviewText) {
          throw new Error("No review text was generated");
        }
      } catch (err) {
        const formatError = err as Error;
        console.error("Error processing API response:", formatError);
        throw new Error(`Failed to process the response: ${formatError?.message || 'Unknown error'}`);
      }
      
      // Track this usage
      trackUsage();
      
      // Set generated review
      setGeneratedReview(reviewText);
      
      // Copy to clipboard
      navigator.clipboard.writeText(reviewText);
      setCopyButtonText("Copied!");
      setTimeout(() => setCopyButtonText("Copy to Clipboard"), 2000);
      
      // Open appropriate Google Maps URL
      if (!useDirectApi) {
        // For ASAP website, use the default URL from config
        window.open(DEFAULT_ASAP_GOOGLE_MAPS_URL, "_blank");
      } else if (businessDetails.googleMapsUrl) {
        // For client implementations, use their specific URL
        window.open(businessDetails.googleMapsUrl, "_blank");
      }
      
    } catch (err: any) {
      console.error('Error generating review:', err);
      setError(err.message || 'Error generating review. Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Copy the generated review to clipboard
  const copyReview = () => {
    if (!generatedReview) return;
    
    navigator.clipboard.writeText(generatedReview);
    setCopyButtonText("Copied!");
    setTimeout(() => setCopyButtonText("Copy to Clipboard"), 2000);
  };
  
  // Open Google Maps for review
  const openGoogleMaps = () => {
    // Use client-specific URL if available, otherwise use default
    const mapsUrl = businessDetails.googleMapsUrl || DEFAULT_ASAP_GOOGLE_MAPS_URL;
    window.open(mapsUrl, "_blank");
  };
  
  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col items-center">
      <motion.div 
        className="w-full max-w-md mx-auto" 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex justify-center mb-6">
          <ImageWithFallback
            src={logoImage}
            fallbackSrc="/logo_transp.png"
            alt="ASAP Logo"
            className="h-20 w-auto"
          />
        </div>
        
        <Card className="bg-gray-900 border-gray-800 mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-2 text-center">
              Review Generator for {businessDetails.name}
            </h2>
            <p className="text-gray-400 mb-4 text-center text-sm">
              Generate a positive review and post it to Google
            </p>
            
            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-900 border-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-4">
              <Button 
                onClick={generateReview} 
                disabled={isGenerating || cooldownRemaining > 0} 
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                {isGenerating ? 'Generating...' : `Generate Review (${remainingUses}/${MAX_HOURLY_USAGE} left)`}
              </Button>
              
              {cooldownRemaining > 0 && (
                <p className="text-sm text-gray-400 text-center">
                  Cooldown: {cooldownRemaining}s
                </p>
              )}
              
              {generatedReview && (
                <div className="mt-4 p-4 bg-gray-800 rounded-md relative">
                  <p className="text-gray-200 whitespace-pre-wrap">{generatedReview}</p>
                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" className="flex-1" onClick={copyReview}>
                      {copyButtonText}
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={openGoogleMaps}>
                      Open Google Maps
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <p className="text-sm text-gray-500 text-center">
          Powered by ASAP | All generated reviews should be based on genuine experiences
        </p>
      </motion.div>
    </div>
  );
}