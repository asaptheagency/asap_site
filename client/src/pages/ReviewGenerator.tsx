import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../lib/animations';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import ImageWithFallback from '../components/ImageWithFallback';
import { Card, CardContent } from '../components/ui/card';
import { DEFAULT_ASAP_GOOGLE_MAPS_URL } from '../config';

import logoImage from '../assets/logo_transp.png';

// Types for review options
interface ReviewOptions {
  staffMember: string; // Who they interacted with (optional)
  wasServiceTimely: boolean; // Was their service timely
  serviceHighlight: string; // What stood out about the service
  wouldRecommend: boolean; // Would they recommend to a friend
  wouldVisitAgain: boolean; // Would they visit again
  additionalComments: string; // Optional additional comments
  length: 'short' | 'medium' | 'long';
  tone: 'casual' | 'professional' | 'enthusiastic';
}

// Business data (loaded from URL parameters)
interface BusinessData {
  businessName: string;
  businessType: string;
  serviceUsed: string;
  positivePoints: string;
  googleMapsUrl?: string;
}

// Default values
const defaultBusinessData: BusinessData = {
  businessName: "ASAP",
  businessType: "Digital Marketing Agency",
  serviceUsed: "website redesign",
  positivePoints: "Their team was highly professional and delivered outstanding results. The project was completed ahead of schedule and exceeded our expectations."
};

const defaultReviewOptions: ReviewOptions = {
  staffMember: "",
  wasServiceTimely: true,
  serviceHighlight: "",
  wouldRecommend: true,
  wouldVisitAgain: true,
  additionalComments: "",
  length: 'medium',
  tone: 'enthusiastic'
};

// Parse URL parameters
const getParamsFromUrl = (): BusinessData => {
  if (typeof window === 'undefined') return defaultBusinessData;
  
  const urlParams = new URLSearchParams(window.location.search);
  
  // For backwards compatibility with the simple version
  let serviceUsed = urlParams.get('serviceUsed') || defaultBusinessData.serviceUsed;
  // Check for 'services' parameter (used in the simple version)
  const servicesParam = urlParams.get('services');
  if (servicesParam) {
    const services = servicesParam.split(',');
    if (services.length > 0) {
      serviceUsed = services[0].trim();
    }
  }
  
  // For backwards compatibility with the simple version
  let positivePoints = urlParams.get('positivePoints') || defaultBusinessData.positivePoints;
  // Check for 'highlights' parameter (used in the simple version)
  const highlightsParam = urlParams.get('highlights');
  if (highlightsParam) {
    positivePoints = highlightsParam.split(',').join('. ');
  }
  
  return {
    businessName: urlParams.get('businessName') || defaultBusinessData.businessName,
    businessType: urlParams.get('businessType') || defaultBusinessData.businessType,
    serviceUsed: serviceUsed,
    positivePoints: positivePoints,
    googleMapsUrl: urlParams.get('googleMapsUrl') || undefined
  };
};

// Premium Review generator component
const ReviewGenerator: React.FC = () => {
  const [businessData, setBusinessData] = useState<BusinessData>(defaultBusinessData);
  const [reviewOptions, setReviewOptions] = useState<ReviewOptions>(defaultReviewOptions);
  const [generatedReview, setGeneratedReview] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Load business data from URL parameters on initial render
  useEffect(() => {
    const urlData = getParamsFromUrl();
    setBusinessData(urlData);
  }, []);

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setReviewOptions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setReviewOptions(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Check if the form has required fields filled
  const isFormValid = () => {
    // Require at least service highlight
    return reviewOptions.serviceHighlight.trim().length > 0;
  };

  // Generate the review, copy to clipboard, and navigate to Google Maps
  const generateReview = async () => {
    // Don't allow submission if form is invalid
    if (!isFormValid()) return;
    
    setIsGenerating(true);
    
    try {
      const { businessName, businessType, serviceUsed, positivePoints } = businessData;
      const { staffMember, wasServiceTimely, serviceHighlight, wouldRecommend, wouldVisitAgain, additionalComments, length } = reviewOptions;
      
      // Build user feedback summary to include in the prompt
      let feedbackPoints = [];
      
      if (staffMember) {
        feedbackPoints.push(`They worked with ${staffMember} who provided excellent service`);
      }
      
      if (wasServiceTimely) {
        feedbackPoints.push(`The service was very timely and efficient`);
      }
      
      if (serviceHighlight) {
        feedbackPoints.push(`What stood out most was: ${serviceHighlight}`);
      }
      
      if (wouldRecommend) {
        feedbackPoints.push(`They would recommend ${businessName} to others`);
      }
      
      if (wouldVisitAgain) {
        feedbackPoints.push(`They plan to use ${businessName}'s services again in the future`);
      }
      
      if (additionalComments) {
        feedbackPoints.push(`Additional feedback: ${additionalComments}`);
      }
      
      const feedbackText = feedbackPoints.join('. ');
      
      // Build the prompt for OpenAI
      const prompt = `Generate a positive customer review for ${businessName}, a ${businessType}, based on the following customer feedback:
      
      Customer satisfaction points: ${positivePoints}
      ${feedbackText}
      
      Focus solely on overall customer satisfaction and experience rather than specific service details.
      Make the review sound natural and authentic, from the customer's perspective.
      The review should be 3-5 sentences long and focus on how the customer felt about their experience with the business.
      Avoid mentioning specific service details or processes.`;
      
      // Call the API
      const response = await fetch('/api/openai/generate-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt,
          // Pass through customer feedback to help with review customization
          customerFeedback: {
            staffMember,
            wasServiceTimely,
            serviceHighlight,
            wouldRecommend,
            wouldVisitAgain,
            additionalComments
          }
        })
      });
      
      if (!response.ok) {
        throw new Error('Error generating review. Please try again later.');
      }
      
      const data = await response.json();
      const reviewText = data.review.trim();
      
      setGeneratedReview(reviewText);
      
      // Copy to clipboard
      navigator.clipboard.writeText(reviewText);
      
      // Open Google Maps in a new tab - client specific if provided or ASAP's default if not
      // This is the premium version used directly on ASAP's site
      const mapsUrl = businessData.googleMapsUrl || DEFAULT_ASAP_GOOGLE_MAPS_URL;
      window.open(mapsUrl, "_blank");
    } catch (error) {
      console.error('Error generating review:', error);
      alert('There was an error generating the review. Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Reset options
  const resetOptions = () => {
    setReviewOptions(defaultReviewOptions);
    setGeneratedReview('');
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      variants={fadeIn}
      className="min-h-screen bg-black text-white py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <ImageWithFallback
              src={logoImage}
              fallbackSrc="/logo_placeholder.png"
              alt="ASAP Logo"
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-orange-500 bg-clip-text text-transparent">
            {businessData.businessName} Review Generator
          </h1>
          <p className="mt-3 text-gray-300 max-w-2xl mx-auto">
            When you click the button below the review generator will do the following:
            <ul className="list-disc text-left ml-8 mt-3 space-y-1 max-w-md mx-auto">
              <li>Generate a positive review for {businessData.businessName} through the use of AI integration</li>
              <li>Copy the AI generated review to your clipboard</li>
              <li>Open the Google Maps page for {businessData.businessName}</li>
            </ul>
          </p>
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            {/* Business info summary */}
            <div className="bg-gray-800 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium mb-2">Business Information</h3>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <p><span className="text-gray-400">Business:</span> {businessData.businessName}</p>
                <p><span className="text-gray-400">Service:</span> {businessData.serviceUsed}</p>
              </div>
            </div>
            
            {generatedReview && (
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-medium mb-4">Generated Review</h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {generatedReview}
                </p>
                <p className="text-green-500 mt-4 text-sm">
                  ✓ Review copied to clipboard
                  <br />
                  ✓ Google Maps opened in new tab
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium mb-4">Service Experience</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Who did you interact with? (optional)</label>
                    <input
                      type="text"
                      value={reviewOptions.staffMember}
                      onChange={(e) => setReviewOptions(prev => ({ ...prev, staffMember: e.target.value }))}
                      placeholder="Staff member name"
                      className="w-full px-3 py-2 mt-1 bg-gray-800 border border-gray-700 rounded text-white"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="wasServiceTimely"
                      name="wasServiceTimely"
                      checked={reviewOptions.wasServiceTimely}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 rounded"
                    />
                    <label htmlFor="wasServiceTimely" className="text-sm">
                      Was the service timely?
                    </label>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-400">
                      What stood out about the service you received? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={reviewOptions.serviceHighlight}
                      onChange={(e) => setReviewOptions(prev => ({ ...prev, serviceHighlight: e.target.value }))}
                      placeholder="E.g., friendly staff, quality of work, etc."
                      rows={3}
                      className={`w-full px-3 py-2 mt-1 bg-gray-800 border rounded text-white ${
                        !isFormValid() && reviewOptions.serviceHighlight.trim() === '' 
                          ? 'border-red-500' 
                          : 'border-gray-700'
                      }`}
                    />
                    {!isFormValid() && reviewOptions.serviceHighlight.trim() === '' && (
                      <p className="mt-1 text-sm text-red-500">
                        This field is required to generate a review
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Satisfaction & Additional Options</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="wouldRecommend"
                      name="wouldRecommend"
                      checked={reviewOptions.wouldRecommend}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 rounded"
                    />
                    <label htmlFor="wouldRecommend" className="text-sm">
                      Would you recommend this service to a friend?
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="wouldVisitAgain"
                      name="wouldVisitAgain"
                      checked={reviewOptions.wouldVisitAgain}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 rounded"
                    />
                    <label htmlFor="wouldVisitAgain" className="text-sm">
                      Would you visit again?
                    </label>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-400">Additional comments (optional)</label>
                    <textarea
                      value={reviewOptions.additionalComments}
                      onChange={(e) => setReviewOptions(prev => ({ ...prev, additionalComments: e.target.value }))}
                      placeholder="Any other thoughts about your experience..."
                      rows={3}
                      className="w-full px-3 py-2 mt-1 bg-gray-800 border border-gray-700 rounded text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={resetOptions}
                className="bg-gray-800 border-gray-700 hover:bg-gray-700"
              >
                Reset Options
              </Button>
              <Button 
                onClick={generateReview}
                className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
                disabled={isGenerating || !isFormValid()}
              >
                {isGenerating ? 'Processing...' : 'Submit'}
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} ASAP All rights reserved <a href="https://www.asaptheagency.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.asaptheagency.com</a></p>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewGenerator;