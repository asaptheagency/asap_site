import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { fadeIn } from '../lib/animations';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { AlertCircle, AlertTriangle, Check, Copy, Key, Settings } from 'lucide-react';
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

// Client API key review generator component
const ClientKeyReviewGenerator: React.FC = () => {
  const [businessDetails, setBusinessDetails] = useState(DEFAULT_BUSINESS_DETAILS);
  const [generatedReview, setGeneratedReview] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isKeyValid, setIsKeyValid] = useState<boolean | null>(null);
  const [usageCount, setUsageCount] = useState<number>(0);
  const [lastUsageTime, setLastUsageTime] = useState<number | null>(null);
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);
  const MAX_USAGE_PER_DAY = 10;
  const USAGE_COOLDOWN = 15000; // 15 seconds cooldown between requests
  const cooldownTimerRef = useRef<number | null>(null);

  // Load business details and API key from storage on component mount
  useEffect(() => {
    const details = getBusinessDetailsFromUrl();
    setBusinessDetails(details);
    
    // Load API key from localStorage
    const storedKey = localStorage.getItem('openai_api_key');
    if (storedKey) {
      setApiKey(storedKey);
      setIsKeyValid(true);
    }
    
    // Load usage statistics
    const lastDate = localStorage.getItem('last_usage_date');
    const today = new Date().toLocaleDateString();
    
    if (lastDate !== today) {
      // Reset counter if it's a new day
      localStorage.setItem('last_usage_date', today);
      localStorage.setItem('usage_count', '0');
      setUsageCount(0);
    } else {
      // Load existing count
      const count = parseInt(localStorage.getItem('usage_count') || '0', 10);
      setUsageCount(count);
    }

    // Load last usage timestamp
    const lastUsage = localStorage.getItem('last_usage_time');
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

  // Save API key
  const saveApiKey = () => {
    if (!apiKey.trim()) {
      setError("API key cannot be empty");
      setIsKeyValid(false);
      return;
    }
    
    // Simple validation - OpenAI keys typically start with "sk-"
    if (!apiKey.trim().startsWith("sk-")) {
      setError("API key does not appear to be valid. OpenAI keys typically start with 'sk-'");
      setIsKeyValid(false);
      return;
    }
    
    localStorage.setItem('openai_api_key', apiKey.trim());
    setSuccessMessage("API key saved successfully!");
    setIsKeyValid(true);
    setError(null);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  // Check if we can generate a review (not in cooldown and under usage limit)
  const canGenerateReview = () => {
    // Check if we're in cooldown period
    if (cooldownRemaining > 0) {
      return false;
    }
    
    // Check daily usage limit
    return usageCount < MAX_USAGE_PER_DAY;
  };

  // Track usage
  const trackUsage = () => {
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    
    // Save to localStorage
    localStorage.setItem('usage_count', newCount.toString());
    
    // Record timestamp of usage
    const now = Date.now();
    setLastUsageTime(now);
    localStorage.setItem('last_usage_time', now.toString());
    
    // Start cooldown timer
    startCooldownTimer(USAGE_COOLDOWN / 1000);
  };

  // Generate a review using the client's OpenAI API key
  const generateReview = async () => {
    if (!apiKey) {
      setError("Please enter your OpenAI API key in settings first");
      setShowSettings(true);
      return;
    }
    
    if (!canGenerateReview()) {
      if (cooldownRemaining > 0) {
        setError(`Please wait ${cooldownRemaining} seconds before generating another review`);
      } else {
        setError(`Daily limit of ${MAX_USAGE_PER_DAY} reviews reached. Try again tomorrow.`);
      }
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    try {
      // Service, highlight and tone selection
      const service = businessDetails.services[Math.floor(Math.random() * businessDetails.services.length)];
      const highlight = businessDetails.highlights[Math.floor(Math.random() * businessDetails.highlights.length)];
      const location = businessDetails.locations[Math.floor(Math.random() * businessDetails.locations.length)];
      const tone = businessDetails.tones[Math.floor(Math.random() * businessDetails.tones.length)];
      
      const prompt = `Generate a positive review for ${businessDetails.name}, a ${businessDetails.type}. 
      The review should mention their ${service} service and highlight that "${highlight}".
      Make the review sound natural, as if written by a customer from ${location}.
      The tone should be ${tone}.
      The review should be 3-5 sentences long.`;
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
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
      
      // Open Google Maps in a new tab - client specific if provided or generic if not
      const mapsUrl = businessDetails.googleMapsUrl || "https://www.google.com/maps";
      window.open(mapsUrl, "_blank");
      
    } catch (err: any) {
      console.error("Error generating review:", err);
      setError(err.message || 'Error generating review. Please check your API key and try again.');
      setIsKeyValid(false);
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
            Generate authentic reviews for {businessDetails.name} using your own OpenAI API key
          </p>
        </div>

        {/* API Key Settings */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 bg-gray-800 border-gray-700 hover:bg-gray-700"
          >
            <Settings size={14} />
            {showSettings ? 'Hide Settings' : 'API Key Settings'}
          </Button>
          
          {showSettings && (
            <Card className="mt-2 bg-gray-900 border-gray-800">
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="apiKey" className="text-sm font-medium flex items-center gap-2">
                      <Key size={14} />
                      OpenAI API Key
                    </Label>
                    <div className="flex mt-1">
                      <Input
                        id="apiKey"
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="sk-..."
                        className="flex-grow bg-gray-800 border-gray-700 text-white"
                      />
                      <Button 
                        onClick={saveApiKey}
                        className="ml-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
                      >
                        Save
                      </Button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Your API key is stored securely in your browser and is never sent to our servers.
                      <br />Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer" className="text-teal-400 hover:underline">OpenAI's website</a>.
                    </p>
                  </div>
                  
                  {isKeyValid === false && !error && (
                    <Alert variant="destructive" className="bg-red-900/30 border-red-800 text-white">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Invalid API Key</AlertTitle>
                      <AlertDescription>
                        Please check your OpenAI API key and try again.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {error && (
                    <Alert variant="destructive" className="bg-red-900/30 border-red-800 text-white">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {successMessage && (
                    <Alert className="bg-green-900/30 border-green-800 text-white">
                      <Check className="h-4 w-4" />
                      <AlertTitle>Success</AlertTitle>
                      <AlertDescription>
                        {successMessage}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            {/* Usage information */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-400">
                <span className="font-medium">Daily usage:</span> {usageCount}/{MAX_USAGE_PER_DAY}
              </div>
              
              {cooldownRemaining > 0 && (
                <div className="text-sm text-orange-400 flex items-center">
                  <AlertTriangle size={14} className="mr-1" />
                  Cooldown: {cooldownRemaining}s
                </div>
              )}
            </div>
            
            <div className="text-center mb-6">
              <p className="text-gray-300 text-sm">
                When you click the button below the review generator will:
              </p>
              <ul className="list-disc text-left ml-8 mt-2 space-y-1 text-sm text-gray-300">
                <li>Generate a positive review for {businessDetails.name} using your OpenAI API key</li>
                <li>Copy the generated review to your clipboard</li>
                <li>Open the Google Maps page for {businessDetails.name}</li>
              </ul>
            </div>

            {generatedReview && (
              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Generated Review</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigator.clipboard.writeText(generatedReview)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Copy size={14} className="mr-1" /> Copy
                  </Button>
                </div>
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

            <div className="flex justify-center gap-4">
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
          </CardContent>
        </Card>

        <div className="mt-4 text-center text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} ASAP All rights reserved <a href="https://www.asaptheagency.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.asaptheagency.com</a></p>
        </div>
      </div>
    </motion.div>
  );
};

export default ClientKeyReviewGenerator;