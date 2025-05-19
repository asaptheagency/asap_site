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
const ReliablePremiumGenerator: React.FC = () => {
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
      
      // Try server-side generation first
      let reviewText = '';
      let success = false;
      
      // Start with API call to guarantee uniqueness
      try {
        const response = await fetch('/api/openai/generate-review', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: `Generate a ${tone} positive customer review for ${businessName}, a ${businessType} business.
            ${staffMember ? `The customer interacted with ${staffMember}.` : ''}
            ${wasServiceTimely ? 'The service was provided in a timely manner.' : ''}
            ${serviceHighlight ? `What stood out most about the service: ${serviceHighlight}` : ''}
            ${wouldRecommend ? `The customer would recommend this business to friends.` : ''}
            ${wouldVisitAgain ? `The customer would use their services again in the future.` : ''}
            ${additionalComments ? `Additional comments: ${additionalComments}` : ''}
            Make the review sound authentic and ${tone}, written by a real person.
            The review should be ${length === 'short' ? '2-3' : length === 'medium' ? '4-5' : '6-8'} sentences long.`
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
      
      // Fall back to sophisticated in-browser generation if API fails
      if (!success) {
        console.log("Falling back to advanced client-side generation");
        
        // ====== SOPHISTICATED REVIEW GENERATOR ======
        // These components allow for thousands of different combinations
        
        // Different opening phrases for various tones
        const openings = {
          enthusiastic: [
            `I absolutely love ${businessName}!`,
            `WOW! My experience with ${businessName} was incredible!`, 
            `I can't say enough good things about ${businessName}!`,
            `${businessName} blew me away with their amazing service!`,
            `I'm absolutely thrilled with my experience at ${businessName}!`,
            `Just had the most incredible experience with ${businessName}!`,
            `This place is FANTASTIC! ${businessName} has won me over completely!`,
            `I'm completely impressed by ${businessName}!`,
            `Oh my goodness, ${businessName} is a game-changer!`,
            `Stop what you're doing and check out ${businessName}!`
          ],
          professional: [
            `I would like to commend ${businessName} for their excellent service.`, 
            `My experience with ${businessName} was highly satisfactory.`,
            `I'm pleased to report that ${businessName} exceeded expectations.`,
            `${businessName} stands out in the ${businessType} industry for good reason.`,
            `I recently engaged the services of ${businessName} and was thoroughly impressed.`,
            `In my assessment, ${businessName} delivers exceptional quality.`,
            `From a professional standpoint, ${businessName} exemplifies excellence.`,
            `After careful evaluation, I can confidently recommend ${businessName}.`,
            `${businessName} has proven to be a reliable provider in the ${businessType} sector.`,
            `My recent interaction with ${businessName} was notably positive.`
          ],
          casual: [
            `Really happy with ${businessName}!`, 
            `Just wanted to share my great experience with ${businessName}.`,
            `Had a super time at ${businessName}!`,
            `${businessName} is pretty awesome!`,
            `Gotta say, ${businessName} really knows their stuff!`,
            `Just checked out ${businessName} - definitely worth a visit!`,
            `So glad I found ${businessName}!`,
            `${businessName} is my new go-to for ${businessType}!`,
            `Finally found a great ${businessType} place - ${businessName} is legit!`,
            `Hey, if you need ${serviceUsed || businessType}, check out ${businessName}!`
          ]
        };
        
        // Service experience descriptions
        const serviceDescriptions = {
          enthusiastic: [
            `Their team went ABOVE AND BEYOND to make sure I was satisfied.`,
            `Every aspect of their service was absolutely top-notch!`,
            `The attention to detail was incredible!`,
            `They truly made me feel like their most important customer!`,
            `The level of service was outstanding in every possible way!`,
            `They clearly put their heart and soul into their work!`,
            `Everything about the experience was absolutely perfect!`,
            `Their dedication to customer satisfaction is unmatched!`,
            `I was completely blown away by their commitment to excellence!`,
            `The quality of service was absolutely outstanding!`
          ],
          professional: [
            `The service delivery was executed with remarkable efficiency and attention to detail.`,
            `Their methodical approach to customer service is commendable.`,
            `The team demonstrated exceptional competence in addressing my requirements.`,
            `Their professional demeanor and technical expertise were evident throughout.`,
            `The quality of service was consistent with industry-leading standards.`,
            `Their systematic approach ensured all aspects were handled appropriately.`,
            `The service process was well-structured and efficiently implemented.`,
            `Their operational excellence was evident in every interaction.`,
            `The team's proficiency in ${businessType} services was clearly demonstrated.`,
            `Their execution was methodical and results-oriented.`
          ],
          casual: [
            `They really took care of everything without any hassle.`,
            `The whole experience was super smooth from start to finish.`,
            `They made the process really easy and stress-free.`,
            `Everything was handled really well, no complaints at all.`,
            `The service was great, just what I needed.`,
            `They definitely know what they're doing.`,
            `The whole thing was pretty straightforward and well done.`,
            `They were really on top of things the whole time.`,
            `The service was spot-on, exactly what I was looking for.`,
            `Everything went smoothly, which was a nice change of pace.`
          ]
        };
        
        // Staff mention variations
        const staffMentions = {
          enthusiastic: [
            `${staffMember} was AMAZING to work with!`,
            `I can't praise ${staffMember} enough for the incredible service!`,
            `${staffMember} went out of their way to make everything perfect!`,
            `Working with ${staffMember} was an absolute pleasure!`,
            `${staffMember} is truly a rockstar at what they do!`
          ],
          professional: [
            `${staffMember} demonstrated exemplary professionalism throughout the process.`,
            `My interactions with ${staffMember} were consistently productive and courteous.`,
            `${staffMember} handled all aspects with notable expertise.`,
            `I found ${staffMember} to be exceptionally knowledgeable and efficient.`,
            `${staffMember}'s attention to detail and proficiency were commendable.`
          ],
          casual: [
            `${staffMember} was super helpful and friendly.`,
            `Big shout-out to ${staffMember} who made everything so easy.`,
            `${staffMember} was great to work with, really knew their stuff.`,
            `Thanks to ${staffMember} for making it such a good experience.`,
            `Really liked working with ${staffMember}, they were awesome.`
          ]
        };
        
        // Timeliness phrases
        const timelinessDescriptions = {
          enthusiastic: [
            `They completed everything in record time!`,
            `I was amazed at how quickly they delivered such quality results!`,
            `They value my time and it really shows in their efficiency!`,
            `Their quick response time was absolutely impressive!`,
            `I couldn't believe how fast they got everything done!`
          ],
          professional: [
            `Their timeline management was exemplary.`,
            `The service was delivered according to a well-structured schedule.`,
            `The efficiency of their process resulted in timely completion.`,
            `Their adherence to deadlines was notable.`,
            `The prompt delivery of service was indicative of their operational excellence.`
          ],
          casual: [
            `They got everything done really quickly.`,
            `Didn't have to wait around, which was nice.`,
            `The turnaround time was super fast.`,
            `No delays or waiting - they were on it.`,
            `Everything was done in good time, no issues.`
          ]
        };
        
        // Highlight variations
        const highlightVariations = {
          enthusiastic: [
            `What really stood out was ${serviceHighlight} - absolutely incredible!`,
            `I was blown away by ${serviceHighlight}!`,
            `The most amazing part was definitely ${serviceHighlight}!`,
            `I can't stop raving about ${serviceHighlight}!`,
            `${serviceHighlight} exceeded all my expectations!`
          ],
          professional: [
            `Particularly noteworthy was ${serviceHighlight}.`,
            `${serviceHighlight} was executed with exceptional precision.`,
            `The standout element was undoubtedly ${serviceHighlight}.`,
            `${serviceHighlight} demonstrated their superior approach.`,
            `The implementation of ${serviceHighlight} was remarkably effective.`
          ],
          casual: [
            `I really liked ${serviceHighlight}.`,
            `${serviceHighlight} was probably the best part.`,
            `What stood out was definitely ${serviceHighlight}.`,
            `Really impressed with ${serviceHighlight}.`,
            `${serviceHighlight} made a big difference.`
          ]
        };
        
        // Recommendation phrases
        const recommendationPhrases = {
          enthusiastic: [
            `I've already told all my friends to check them out!`,
            `I HIGHLY recommend them to anyone looking for ${businessType} services!`,
            `If you're looking for quality ${businessType}, look no further!`,
            `You'd be crazy not to choose them for your ${businessType} needs!`,
            `I'm recommending them to absolutely everyone I know!`
          ],
          professional: [
            `I would confidently recommend their services to colleagues and associates.`,
            `They merit serious consideration for anyone requiring ${businessType} services.`,
            `I recommend their services without reservation.`,
            `Based on my experience, I can endorse their professional capabilities.`,
            `Their services are worthy of recommendation to those seeking quality ${businessType} solutions.`
          ],
          casual: [
            `Definitely recommend checking them out.`,
            `I'd suggest giving them a try if you need a good ${businessType}.`,
            `Worth recommending to friends for sure.`,
            `Would definitely point people their way for ${businessType} stuff.`,
            `Happy to recommend them to anyone looking.`
          ]
        };
        
        // Return phrases
        const returnPhrases = {
          enthusiastic: [
            `I'll definitely be coming back for all my future needs!`,
            `They've earned a customer for life!`,
            `I can't wait to work with them again!`,
            `There's no question where I'll go for ${businessType} services in the future!`,
            `I'm already planning my next visit!`
          ],
          professional: [
            `I anticipate engaging their services for future requirements.`,
            `They will be my primary consideration for subsequent ${businessType} needs.`,
            `I foresee maintaining this professional relationship for future projects.`,
            `Their consistent quality ensures they will be considered for future services.`,
            `I have incorporated them into my ongoing planning for ${businessType} services.`
          ],
          casual: [
            `Will definitely use them again next time.`,
            `They're my go-to now for this kind of thing.`,
            `Planning to head back there when I need more ${businessType} work.`,
            `Would definitely use their services again.`,
            `They've got my business going forward for sure.`
          ]
        };
        
        // Closing statements
        const closings = {
          enthusiastic: [
            `Five stars isn't enough for this amazing business!`,
            `Couldn't be happier with my experience!`,
            `Thanks for the amazing service!`,
            `Totally worth every penny!`,
            `A truly exceptional experience from start to finish!`
          ],
          professional: [
            `In conclusion, a commendable service provider.`,
            `Overall, a thoroughly satisfactory engagement.`,
            `A worthwhile investment in quality service.`,
            `Their performance meets the standards of excellence in the industry.`,
            `A reliable option for those seeking quality and professionalism.`
          ],
          casual: [
            `Really happy with how everything turned out.`,
            `Overall, a great place to check out.`,
            `Solid experience all around.`,
            `Good stuff, no complaints at all.`,
            `Happy with my choice and the results.`
          ]
        };
        
        // Random seed to ensure variety in selections
        const seed = Date.now() % 10000;
        const getRandomElement = (array, offset = 0) => {
          const index = (seed + offset) % array.length;
          return array[index];
        };
        
        // Construct the review with different components based on tone
        const components = [];
        
        // 1. Add opening
        components.push(getRandomElement(openings[tone]));
        
        // 2. Add staff mention if provided
        if (staffMember) {
          components.push(getRandomElement(staffMentions[tone], 1));
        }
        
        // 3. Add service description
        components.push(getRandomElement(serviceDescriptions[tone], 2));
        
        // 4. Add timeliness if selected
        if (wasServiceTimely) {
          components.push(getRandomElement(timelinessDescriptions[tone], 3));
        }
        
        // 5. Add highlight if provided
        if (serviceHighlight) {
          components.push(getRandomElement(highlightVariations[tone], 4));
        }
        
        // 6. Add recommendation if selected
        if (wouldRecommend) {
          components.push(getRandomElement(recommendationPhrases[tone], 5));
        }
        
        // 7. Add return statement if selected
        if (wouldVisitAgain) {
          components.push(getRandomElement(returnPhrases[tone], 6));
        }
        
        // 8. Add additional comments if provided
        if (additionalComments) {
          components.push(additionalComments);
        }
        
        // 9. Add closing statement
        components.push(getRandomElement(closings[tone], 7));
        
        // Combine all components into a review
        reviewText = components.join(' ');
        
        // Adjust length if needed
        if (length === 'short' && components.length > 3) {
          // For short reviews, take only the essential parts
          const essentialParts = [
            components[0], // Opening
            serviceHighlight ? getRandomElement(highlightVariations[tone], 4) : getRandomElement(serviceDescriptions[tone], 2),
            getRandomElement(closings[tone], 7) // Closing
          ];
          reviewText = essentialParts.join(' ');
        } else if (length === 'long' && components.length < 6) {
          // For long reviews, add more details
          const additionalDetails = {
            enthusiastic: [
              `The quality of their work speaks for itself!`,
              `I was particularly impressed by how they handled every detail!`,
              `Their customer service is second to none!`,
              `You can really tell they care about their clients!`,
              `The value for money was exceptional!`
            ],
            professional: [
              `Their attention to detail was evident throughout the process.`,
              `The quality-to-cost ratio was notably favorable.`,
              `Their systematic approach ensured comprehensive service delivery.`,
              `Communication was clear and consistent throughout the engagement.`,
              `The professionalism displayed by their team was consistent at every touchpoint.`
            ],
            casual: [
              `The prices were pretty reasonable too.`,
              `They were super helpful with all my questions.`,
              `The whole process was just really smooth.`,
              `I appreciated how straightforward everything was.`,
              `They definitely made things easier than I expected.`
            ]
          };
          
          // Insert additional details before the closing statement
          const extraDetail1 = getRandomElement(additionalDetails[tone], 8);
          const extraDetail2 = getRandomElement(additionalDetails[tone], 9);
          
          const componentsWithExtras = [...components];
          componentsWithExtras.splice(-1, 0, extraDetail1, extraDetail2);
          reviewText = componentsWithExtras.join(' ');
        }
        
        // Return phrases
        const returnPhrases = {
          enthusiastic: [
            `I'll definitely be coming back for all my future needs!`,
            `They've earned a customer for life!`,
            `I can't wait to work with them again!`,
            `There's no question where I'll go for ${businessType} services in the future!`,
            `I'm already planning my next visit!`
          ],
          professional: [
            `I anticipate engaging their services for future requirements.`,
            `They will be my primary consideration for subsequent ${businessType} needs.`,
            `I foresee maintaining this professional relationship for future projects.`,
            `Their consistent quality ensures they will be considered for future services.`,
            `I have incorporated them into my ongoing planning for ${businessType} services.`
          ],
          casual: [
            `Will definitely use them again next time.`,
            `They're my go-to now for this kind of thing.`,
            `Planning to head back there when I need more ${businessType} work.`,
            `Would definitely use their services again.`,
            `They've got my business going forward for sure.`
          ]
        };
        
        // Closing statements
        const closings = {
          enthusiastic: [
            `Five stars isn't enough for this amazing business!`,
            `Couldn't be happier with my experience!`,
            `Thanks for the amazing service!`,
            `Totally worth every penny!`,
            `A truly exceptional experience from start to finish!`
          ],
          professional: [
            `In conclusion, a commendable service provider.`,
            `Overall, a thoroughly satisfactory engagement.`,
            `A worthwhile investment in quality service.`,
            `Their performance meets the standards of excellence in the industry.`,
            `A reliable option for those seeking quality and professionalism.`
          ],
          casual: [
            `Really happy with how everything turned out.`,
            `Overall, a great place to check out.`,
            `Solid experience all around.`,
            `Good stuff, no complaints at all.`,
            `Happy with my choice and the results.`
          ]
        };
        
        // Random seed to ensure variety in selections
        const seed = Date.now() % 10000;
        const getRandomElement = (array, offset = 0) => {
          const index = (seed + offset) % array.length;
          return array[index];
        };
        
        // Construct the review with different components based on tone
        const components = [];
        
        // 1. Add opening
        components.push(getRandomElement(openings[tone]));
        
        // 2. Add staff mention if provided
        if (staffMember) {
          components.push(getRandomElement(staffMentions[tone], 1));
        }
        
        // 3. Add service description
        components.push(getRandomElement(serviceDescriptions[tone], 2));
        
        // 4. Add timeliness if selected
        if (wasServiceTimely) {
          components.push(getRandomElement(timelinessDescriptions[tone], 3));
        }
        
        // 5. Add highlight if provided
        if (serviceHighlight) {
          components.push(getRandomElement(highlightVariations[tone], 4));
        }
        
        // 6. Add recommendation if selected
        if (wouldRecommend) {
          components.push(getRandomElement(recommendationPhrases[tone], 5));
        }
        
        // 7. Add return statement if selected
        if (wouldVisitAgain) {
          components.push(getRandomElement(returnPhrases[tone], 6));
        }
        
        // 8. Add additional comments if provided
        if (additionalComments) {
          components.push(additionalComments);
        }
        
        // 9. Add closing statement
        components.push(getRandomElement(closings[tone], 7));
        
        // Combine all components into a review
        reviewText = components.join(' ');
        
        // Adjust length if needed
        if (length === 'short' && components.length > 3) {
          // For short reviews, take only the essential parts
          const essentialParts = [
            components[0], // Opening
            serviceHighlight ? getRandomElement(highlightVariations[tone], 4) : getRandomElement(serviceDescriptions[tone], 2),
            getRandomElement(closings[tone], 7) // Closing
          ];
          reviewText = essentialParts.join(' ');
        } else if (length === 'long' && components.length < 6) {
          // For long reviews, add more details
          const additionalDetails = {
            enthusiastic: [
              `The quality of their work speaks for itself!`,
              `I was particularly impressed by how they handled every detail!`,
              `Their customer service is second to none!`,
              `You can really tell they care about their clients!`,
              `The value for money was exceptional!`
            ],
            professional: [
              `Their attention to detail was evident throughout the process.`,
              `The quality-to-cost ratio was notably favorable.`,
              `Their systematic approach ensured comprehensive service delivery.`,
              `Communication was clear and consistent throughout the engagement.`,
              `The professionalism displayed by their team was consistent at every touchpoint.`
            ],
            casual: [
              `The prices were pretty reasonable too.`,
              `They were super helpful with all my questions.`,
              `The whole process was just really smooth.`,
              `I appreciated how straightforward everything was.`,
              `They definitely made things easier than I expected.`
            ]
          };
          
          // Insert additional details before the closing statement
          const extraDetail1 = getRandomElement(additionalDetails[tone], 8);
          const extraDetail2 = getRandomElement(additionalDetails[tone], 9);
          
          const componentsWithExtras = [...components];
          componentsWithExtras.splice(-1, 0, extraDetail1, extraDetail2);
          reviewText = componentsWithExtras.join(' ');
        }
        
        success = true;
      }
      
      console.log("Premium Review Generator: Generated review:", reviewText);
      
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

export default ReliablePremiumGenerator;