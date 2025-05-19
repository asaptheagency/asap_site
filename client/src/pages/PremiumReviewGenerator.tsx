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
  serviceUsed: "",
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

// Premium Review generator component without API dependencies
const PremiumReviewGenerator: React.FC = () => {
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
      const { staffMember, wasServiceTimely, serviceHighlight, wouldRecommend, wouldVisitAgain, additionalComments, length, tone } = reviewOptions;
      
      console.log("Premium Review Generator: Generating review for", businessName, businessType);
      
      // Predefined templates for various tones
      const enthusiasticTemplates = [
        `I am absolutely THRILLED with my experience at {{business}}! {{staffMention}}{{timeliness}} {{highlight}} {{recommendation}} {{return}} {{additional}} They truly are the best {{type}} in the area!`,
        
        `WOW! {{business}} completely exceeded my expectations! {{staffMention}}{{timeliness}} {{highlight}} {{recommendation}} {{return}} I can't recommend them enough to anyone looking for {{service}}!`,
        
        `I can't say enough amazing things about {{business}}! {{staffMention}}{{timeliness}} {{highlight}} {{recommendation}} {{return}} {{additional}} Five stars doesn't seem like enough for this incredible {{type}}!`
      ];
      
      const professionalTemplates = [
        `I would like to express my satisfaction with the services provided by {{business}}. {{staffMention}}{{timeliness}} {{highlight}} {{recommendation}} {{return}} {{additional}} This {{type}} delivers consistent quality and professionalism.`,
        
        `My experience with {{business}} was excellent. {{staffMention}}{{timeliness}} {{highlight}} {{recommendation}} {{return}} {{additional}} They demonstrated a high level of expertise in {{service}}.`,
        
        `{{business}} provided outstanding service from start to finish. {{staffMention}}{{timeliness}} {{highlight}} {{recommendation}} {{return}} {{additional}} Their approach to {{service}} was methodical and efficient.`
      ];
      
      const casualTemplates = [
        `Had a great time at {{business}}! {{staffMention}}{{timeliness}} {{highlight}} {{recommendation}} {{return}} {{additional}} If you need {{service}}, these folks have got you covered.`,
        
        `Just wanted to share my awesome experience with {{business}}. {{staffMention}}{{timeliness}} {{highlight}} {{recommendation}} {{return}} {{additional}} This {{type}} really knows their stuff!`,
        
        `Stopped by {{business}} and couldn't be happier. {{staffMention}}{{timeliness}} {{highlight}} {{recommendation}} {{return}} {{additional}} Such a pleasant experience all around.`
      ];
      
      // Select template based on tone
      let templates;
      switch(tone) {
        case 'enthusiastic':
          templates = enthusiasticTemplates;
          break;
        case 'professional':
          templates = professionalTemplates;
          break;
        case 'casual':
          templates = casualTemplates;
          break;
        default:
          templates = enthusiasticTemplates;
      }
      
      // Randomly select a template
      const template = templates[Math.floor(Math.random() * templates.length)];
      
      // Create conditional components for the template
      const staffMention = staffMember 
        ? `I worked with ${staffMember} who was absolutely fantastic. ` 
        : '';
        
      const timeliness = wasServiceTimely 
        ? `The service was provided in a very timely manner. ` 
        : '';
        
      const highlight = serviceHighlight 
        ? `What really stood out was ${serviceHighlight}. ` 
        : `What really stood out was their attention to detail. `;
        
      const recommendation = wouldRecommend 
        ? `I would absolutely recommend them to friends and family. ` 
        : '';
        
      const returnText = wouldVisitAgain 
        ? `I'll definitely be using their services again in the future. ` 
        : '';
        
      const additional = additionalComments 
        ? `${additionalComments} ` 
        : '';
        
      // Build review from template
      let review = template
        .replace(/{{business}}/g, businessName)
        .replace(/{{type}}/g, businessType)
        .replace(/{{service}}/g, serviceUsed || businessType)
        .replace(/{{staffMention}}/g, staffMention)
        .replace(/{{timeliness}}/g, timeliness)
        .replace(/{{highlight}}/g, highlight)
        .replace(/{{recommendation}}/g, recommendation)
        .replace(/{{return}}/g, returnText)
        .replace(/{{additional}}/g, additional);
      
      // Adjust length if needed
      if (length === 'short' && review.length > 200) {
        const sentences = review.split('. ');
        review = sentences.slice(0, Math.max(2, Math.floor(sentences.length * 0.5))).join('. ') + '.';
      } else if (length === 'long' && review.length < 400) {
        // Add an additional positive comment for longer reviews
        const additionalPhrases = [
          ` The quality of their work speaks for itself.`,
          ` I was particularly impressed by their professionalism.`,
          ` Their customer service is second to none.`,
          ` You can really tell they care about their clients.`,
          ` The value for money was exceptional.`
        ];
        
        const extraPhrases = additionalPhrases.slice(0, 2);
        for (const phrase of extraPhrases) {
          review += phrase;
        }
      }
      
      console.log("Premium Review Generator: Generated review:", review);
      
      // Save the generated review
      setGeneratedReview(review);
      
      // Copy to clipboard
      try {
        await navigator.clipboard.writeText(review);
        console.log("Premium Review Generator: Copied to clipboard");
      } catch (clipboardError) {
        console.error("Premium Review Generator: Clipboard error", clipboardError);
      }
      
      // Open Google Maps in a new tab
      const mapsUrl = businessData.googleMapsUrl || DEFAULT_ASAP_GOOGLE_MAPS_URL;
      console.log("Premium Review Generator: Opening maps URL:", mapsUrl);
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
                {businessData.serviceUsed && (
                  <p><span className="text-gray-400">Service:</span> {businessData.serviceUsed}</p>
                )}
              </div>
            </div>
            
            {generatedReview && (
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-medium mb-4">Generated Review</h3>
                <p className="text-gray-100 whitespace-pre-wrap">{generatedReview}</p>
                <p className="text-green-500 mt-4 text-sm">
                  ✓ Review copied to clipboard
                  <br />
                  ✓ Google Maps opened in new tab
                </p>
                <div className="flex gap-4 justify-center mt-6">
                  <Button
                    onClick={resetOptions}
                    variant="outline"
                    className="border-gray-600"
                  >
                    Generate Another Review
                  </Button>
                </div>
              </div>
            )}
            
            {!generatedReview && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Review Options</h3>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-400 mb-1">Staff Member (optional)</label>
                      <input
                        type="text"
                        value={reviewOptions.staffMember}
                        onChange={(e) => setReviewOptions(prev => ({ ...prev, staffMember: e.target.value }))}
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Who helped you?"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-400 mb-1">What stood out? (required)</label>
                      <input
                        type="text"
                        value={reviewOptions.serviceHighlight}
                        onChange={(e) => setReviewOptions(prev => ({ ...prev, serviceHighlight: e.target.value }))}
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-teal-500 focus:border-teal-500"
                        placeholder="What was exceptional about the service?"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-400 mb-1">Additional Comments (optional)</label>
                      <textarea
                        value={reviewOptions.additionalComments}
                        onChange={(e) => setReviewOptions(prev => ({ ...prev, additionalComments: e.target.value }))}
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-teal-500 focus:border-teal-500"
                        rows={3}
                        placeholder="Any other thoughts you'd like to add?"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Review Preferences</h3>
                    
                    <div className="mb-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={reviewOptions.wasServiceTimely}
                          onChange={handleCheckboxChange}
                          name="wasServiceTimely"
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-700 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-300">Service was timely and efficient</span>
                      </label>
                    </div>
                    
                    <div className="mb-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={reviewOptions.wouldRecommend}
                          onChange={handleCheckboxChange}
                          name="wouldRecommend"
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-700 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-300">Would recommend to others</span>
                      </label>
                    </div>
                    
                    <div className="mb-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={reviewOptions.wouldVisitAgain}
                          onChange={handleCheckboxChange}
                          name="wouldVisitAgain"
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-700 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-300">Would use service again</span>
                      </label>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-400 mb-1">Review Length</label>
                      <Select
                        value={reviewOptions.length}
                        onValueChange={(value) => handleSelectChange('length', value)}
                      >
                        <SelectTrigger className="w-full bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Select length" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="short">Short (2-3 sentences)</SelectItem>
                          <SelectItem value="medium">Medium (4-5 sentences)</SelectItem>
                          <SelectItem value="long">Long (6+ sentences)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-400 mb-1">Review Tone</label>
                      <Select
                        value={reviewOptions.tone}
                        onValueChange={(value) => handleSelectChange('tone', value as any)}
                      >
                        <SelectTrigger className="w-full bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center mt-8">
                  <Button 
                    onClick={generateReview}
                    disabled={isGenerating || !isFormValid()}
                    className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 px-8 py-4 text-lg"
                    size="lg"
                  >
                    {isGenerating ? 'Generating...' : 'Generate Review'}
                  </Button>
                </div>
                
                {!isFormValid() && (
                  <p className="text-amber-500 text-center mt-4 text-sm">
                    Please tell us what stood out about the service to generate a review.
                  </p>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} ASAP All rights reserved <a href="https://www.asaptheagency.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.asaptheagency.com</a></p>
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumReviewGenerator;