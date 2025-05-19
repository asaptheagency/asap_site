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
  serviceHighlight: string; // What stood out about the service
  wouldRecommend: boolean; // Would they recommend to a friend
  wouldVisitAgain: boolean; // Would they visit again
  additionalComments: string; // Optional additional comments
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
  serviceHighlight: "",
  wouldRecommend: true,
  wouldVisitAgain: true,
  additionalComments: ""
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

/**
 * Advanced Review Generator Component
 * - Creates unique, personalized reviews
 * - Tries server API first, then falls back to sophisticated local generation
 * - Ensures variety and authenticity
 */
const AdvancedReviewGenerator: React.FC = () => {
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
      const { staffMember, serviceHighlight, wouldRecommend, wouldVisitAgain, additionalComments } = reviewOptions;
      
      console.log("Advanced Review Generator: Generating review for", businessName, businessType);
      
      // Try server-side generation first
      let reviewText = '';
      let success = false;
      
      // Try API call to guarantee uniqueness
      try {
        const response = await fetch('/api/openai/generate-review', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: `Generate an enthusiastic positive customer review for ${businessName}, a ${businessType} business.
            ${staffMember ? `The customer interacted with ${staffMember}.` : ''}
            ${serviceHighlight ? `What stood out most about the service: ${serviceHighlight}` : ''}
            ${wouldRecommend ? `The customer would recommend this business to friends.` : ''}
            ${wouldVisitAgain ? `The customer would use their services again in the future.` : ''}
            ${additionalComments ? `Additional comments: ${additionalComments}` : ''}
            Make the review sound authentic and enthusiastic, written by a real person.
            The review should be 4-5 sentences long.`
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.review) {
            reviewText = data.review.trim();
            success = true;
            console.log("API provided review successfully");
          }
        }
      } catch (error) {
        console.log("API call failed:", error);
      }
      
      // If API failed, fall back to sophisticated local generation
      if (!success) {
        console.log("Falling back to client-side generator");
        
        // SOPHISTICATED REVIEW GENERATOR WITH VARIABLE COMPONENT SYSTEM
        
        // Create phrase sets for different tones and contexts
        const phrases = {
          openings: {
            enthusiastic: [
              `I absolutely love ${businessName}!`,
              `WOW! My experience with ${businessName} was incredible!`, 
              `I can't say enough good things about ${businessName}!`,
              `${businessName} blew me away with their amazing service!`,
              `I'm absolutely thrilled with my experience at ${businessName}!`
            ],
            professional: [
              `I would like to commend ${businessName} for their excellent service.`, 
              `My experience with ${businessName} was highly satisfactory.`,
              `I'm pleased to report that ${businessName} exceeded expectations.`,
              `${businessName} stands out in the ${businessType} industry for good reason.`,
              `I recently engaged the services of ${businessName} and was thoroughly impressed.`
            ],
            casual: [
              `Really happy with ${businessName}!`, 
              `Just wanted to share my great experience with ${businessName}.`,
              `Had a super time at ${businessName}!`,
              `${businessName} is pretty awesome!`,
              `Gotta say, ${businessName} really knows their stuff!`
            ]
          },
          
          serviceDescriptions: {
            enthusiastic: [
              `Their team went ABOVE AND BEYOND to make sure I was satisfied.`,
              `Every aspect of their service was absolutely top-notch!`,
              `The attention to detail was incredible!`,
              `They truly made me feel like their most important customer!`,
              `The level of service was outstanding in every possible way!`
            ],
            professional: [
              `The service delivery was executed with remarkable efficiency and attention to detail.`,
              `Their methodical approach to customer service is commendable.`,
              `The team demonstrated exceptional competence in addressing my requirements.`,
              `Their professional demeanor and technical expertise were evident throughout.`,
              `The quality of service was consistent with industry-leading standards.`
            ],
            casual: [
              `They really took care of everything without any hassle.`,
              `The whole experience was super smooth from start to finish.`,
              `They made the process really easy and stress-free.`,
              `Everything was handled really well, no complaints at all.`,
              `The service was great, just what I needed.`
            ]
          },
          
          staffMentions: staffMember ? {
            enthusiastic: [
              `${staffMember} was AMAZING to work with!`,
              `I can't praise ${staffMember} enough for the incredible service!`,
              `${staffMember} went out of their way to make everything perfect!`
            ],
            professional: [
              `${staffMember} demonstrated exemplary professionalism throughout the process.`,
              `My interactions with ${staffMember} were consistently productive and courteous.`,
              `${staffMember} handled all aspects with notable expertise.`
            ],
            casual: [
              `${staffMember} was super helpful and friendly.`,
              `Big shout-out to ${staffMember} who made everything so easy.`,
              `${staffMember} was great to work with, really knew their stuff.`
            ]
          } : null,
          
          // Timeliness section removed
          
          highlights: serviceHighlight ? {
            enthusiastic: [
              `What really stood out was ${serviceHighlight} - absolutely incredible!`,
              `I was blown away by ${serviceHighlight}!`,
              `The most amazing part was definitely ${serviceHighlight}!`
            ],
            professional: [
              `Particularly noteworthy was ${serviceHighlight}.`,
              `${serviceHighlight} was executed with exceptional precision.`,
              `The standout element was undoubtedly ${serviceHighlight}.`
            ],
            casual: [
              `I really liked ${serviceHighlight}.`,
              `${serviceHighlight} was probably the best part.`,
              `What stood out was definitely ${serviceHighlight}.`
            ]
          } : null,
          
          recommendations: wouldRecommend ? {
            enthusiastic: [
              `I've already told all my friends to check them out!`,
              `I HIGHLY recommend them to anyone looking for ${businessType} services!`,
              `If you're looking for quality ${businessType}, look no further!`
            ],
            professional: [
              `I would confidently recommend their services to colleagues and associates.`,
              `They merit serious consideration for anyone requiring ${businessType} services.`,
              `I recommend their services without reservation.`
            ],
            casual: [
              `Definitely recommend checking them out.`,
              `I'd suggest giving them a try if you need a good ${businessType}.`,
              `Worth recommending to friends for sure.`
            ]
          } : null,
          
          returnIntentions: wouldVisitAgain ? {
            enthusiastic: [
              `I'll definitely be coming back for all my future needs!`,
              `They've earned a customer for life!`,
              `I can't wait to work with them again!`
            ],
            professional: [
              `I anticipate engaging their services for future requirements.`,
              `They will be my primary consideration for subsequent ${businessType} needs.`,
              `I foresee maintaining this professional relationship for future projects.`
            ],
            casual: [
              `Will definitely use them again next time.`,
              `They're my go-to now for this kind of thing.`,
              `Planning to head back there when I need more ${businessType} work.`
            ]
          } : null,
          
          closings: {
            enthusiastic: [
              `Five stars isn't enough for this amazing business!`,
              `Couldn't be happier with my experience!`,
              `Thanks for the amazing service!`
            ],
            professional: [
              `In conclusion, a commendable service provider.`,
              `Overall, a thoroughly satisfactory engagement.`,
              `A worthwhile investment in quality service.`
            ],
            casual: [
              `Really happy with how everything turned out.`,
              `Overall, a great place to check out.`,
              `Solid experience all around.`
            ]
          },
          
          extras: {
            enthusiastic: [
              `The quality of their work speaks for itself!`,
              `I was particularly impressed by how they handled every detail!`,
              `Their customer service is second to none!`
            ],
            professional: [
              `Their attention to detail was evident throughout the process.`,
              `The quality-to-cost ratio was notably favorable.`,
              `Their systematic approach ensured comprehensive service delivery.`
            ],
            casual: [
              `The prices were pretty reasonable too.`,
              `They were super helpful with all my questions.`,
              `The whole process was just really smooth.`
            ]
          }
        };
        
        // Function to get random element with a seed for consistency
        const seed = Math.floor(Date.now() % 10000);
        const getRandomPhrase = (phraseGroup: string[], offset: number = 0): string => {
          const index = (seed + offset) % phraseGroup.length;
          return phraseGroup[index];
        };
        
        // Build review components based on enthusiastic tone
        const selectedTone = 'enthusiastic'; // Always use enthusiastic tone
        const reviewComponents: string[] = [];
        
        // Always include opening and service description
        reviewComponents.push(getRandomPhrase(phrases.openings[selectedTone], 1));
        
        // Add staff mention if provided
        if (phrases.staffMentions) {
          reviewComponents.push(getRandomPhrase(phrases.staffMentions[selectedTone], 2));
        }
        
        reviewComponents.push(getRandomPhrase(phrases.serviceDescriptions[selectedTone], 3));
        
        // Add highlight if provided
        if (phrases.highlights) {
          reviewComponents.push(getRandomPhrase(phrases.highlights[selectedTone], 5));
        }
        
        // Add recommendation if selected
        if (phrases.recommendations) {
          reviewComponents.push(getRandomPhrase(phrases.recommendations[selectedTone], 6));
        }
        
        // Add return intentions if selected
        if (phrases.returnIntentions) {
          reviewComponents.push(getRandomPhrase(phrases.returnIntentions[selectedTone], 7));
        }
        
        // Add additional comments if provided
        if (additionalComments) {
          reviewComponents.push(additionalComments);
        }
        
        // Add closing statement
        reviewComponents.push(getRandomPhrase(phrases.closings[selectedTone], 8));
        
        // Add medium length details if needed
        if (reviewComponents.length < 5) {
          // Add extra details for a good medium-length review
          reviewComponents.splice(
            reviewComponents.length - 1, 0, 
            getRandomPhrase(phrases.extras[selectedTone], 9)
          );
        }
        
        // Join all components into a complete review
        reviewText = reviewComponents.join(' ');
        success = true;
      }
      
      console.log("Advanced Review Generator: Generated review:", reviewText);
      
      // Save the generated review
      setGeneratedReview(reviewText);
      
      // Copy to clipboard
      try {
        await navigator.clipboard.writeText(reviewText);
        console.log("Advanced Review Generator: Copied to clipboard successfully");
      } catch (clipboardError) {
        console.error("Advanced Review Generator: Clipboard error:", clipboardError);
      }
      
      // Open Google Maps in a new tab
      const mapsUrl = businessData.googleMapsUrl || DEFAULT_ASAP_GOOGLE_MAPS_URL;
      console.log("Advanced Review Generator: Opening Google Maps URL:", mapsUrl);
      window.open(mapsUrl, "_blank");
    } catch (error) {
      console.error('Error generating review:', error);
      alert('There was an error generating the review. Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Reset options for a new review
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

export default AdvancedReviewGenerator;