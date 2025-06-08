import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { fadeIn } from '../lib/animations';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Card, CardContent } from '../components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { DEFAULT_ASAP_GOOGLE_MAPS_URL } from '../config';
import logoImage from '../assets/logo_transp.png';

export default function ProductionReviewGenerator() {
  const [generatedReview, setGeneratedReview] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("Copy to Clipboard");
  
  // Generate a review using the server-side API
  const generateReview = async () => {
    setError("");
    setIsGenerating(true);
    
    try {
      // Use the absolute URL to ensure it works in all environments
      const baseUrl = window.location.origin;
      const apiUrl = `${baseUrl}/api/openai/generate-review`;
      
      console.log(`Making API request to: ${apiUrl}`);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Generate a positive 5-star review for ASAP, a Digital Marketing Agency.
          Make the review sound authentic, as if written by a happy customer from New York.
          The tone should be enthusiastic.
          The review should be 3-5 sentences long, focus on how the customer felt about their experience, and avoid mentioning specific service details.`
        })
      });
      
      if (!response.ok) {
        console.error(`API Error Status: ${response.status}`);
        const errorData = await response.text();
        console.error(`API Error Response: ${errorData}`);
        throw new Error(`Error generating review: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("API Response:", data);
      
      // Extract the review text
      const reviewText = data.review?.trim() || "Couldn't generate a review. Please try again.";
      
      // Set generated review
      setGeneratedReview(reviewText);
      
      // Copy to clipboard
      navigator.clipboard.writeText(reviewText);
      setCopyButtonText("Copied!");
      setTimeout(() => setCopyButtonText("Copy to Clipboard"), 2000);
      
    } catch (err) {
      const error = err as Error;
      console.error('Error generating review:', error);
      setError(error?.message || 'Error generating review. Please try again later.');
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
    window.open(DEFAULT_ASAP_GOOGLE_MAPS_URL, "_blank");
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
              Production Review Generator
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
                disabled={isGenerating} 
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                {isGenerating ? 'Generating...' : 'Generate Review'}
              </Button>
              
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