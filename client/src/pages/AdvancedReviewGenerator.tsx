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
  serviceHighlight: "communication" | "quality" | "value" | "expertise" | "professionalism" | "flexibility" | "results" | "speed" | "friendliness" | "attention-to-detail"; // What stood out about the service
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
  serviceHighlight: "professionalism",
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
      const { businessName, businessType, serviceUsed, positivePoints, googleMapsUrl } = businessData;
      const { staffMember, serviceHighlight, wouldRecommend, wouldVisitAgain, additionalComments } = reviewOptions;
      
      console.log("Advanced Review Generator: Generating review for", businessName, businessType);
      
      // MASSIVELY EXPANDED TEMPLATE-BASED REVIEW GENERATOR
      
      // Huge collection of templates organized by what stood out about the service
      const reviewTemplates = {
        // COMMUNICATION TEMPLATES
        communication: [
          // Set 1 - General communication praise
          {
            templates: [
              `I can't say enough about my experience with ${businessName}! Their communication was outstanding from start to finish. ${staffMember ? `${staffMember} was always responsive and kept me informed every step of the way.` : `The entire team was incredibly responsive and kept me updated throughout the process.`} They really understood what I needed and delivered exactly that. ${wouldRecommend ? `I've already recommended them to several friends looking for ${businessType} services!` : ``} ${wouldVisitAgain ? `I'll definitely be working with them again for future projects!` : ``}`,
              
              `My experience with ${businessName} was phenomenal! What really impressed me was how well they communicated throughout our project. ${staffMember ? `${staffMember} was exceptional at explaining complex ideas in a way that made perfect sense.` : `Everyone I interacted with was great at explaining complex ideas in simple terms.`} They were always available to answer my questions and address concerns promptly. ${wouldRecommend ? `If you're looking for a ${businessType} that keeps you in the loop, look no further!` : ``} ${wouldVisitAgain ? `They've earned my business for years to come!` : ``}`,
              
              `Working with ${businessName} was an absolute pleasure! Their communication skills are top-notch, making the entire process smooth and stress-free. ${staffMember ? `${staffMember} was particularly great at listening to my needs and providing regular updates.` : `They excel at listening to client needs and providing regular updates.`} I never had to wonder what was happening with my project. ${wouldRecommend ? `I enthusiastically recommend them to anyone seeking quality ${businessType} services!` : ``} ${wouldVisitAgain ? `I'm already planning my next project with them!` : ``}`,
              
              `${businessName} exceeded all my expectations! Their communication was exceptional - clear, timely, and professional. ${staffMember ? `${staffMember} was always reachable and took the time to really understand what I was looking for.` : `Their team was always reachable and took the time to understand my vision.`} They explained everything in detail without overwhelming me with industry jargon. ${wouldRecommend ? `Anyone looking for a ${businessType} with excellent communication should definitely give them a call!` : ``} ${wouldVisitAgain ? `I'll certainly be using their services again!` : ``}`,
              
              `I'm extremely impressed with ${businessName}! The way they communicated throughout our project was remarkable. ${staffMember ? `${staffMember} was proactive in reaching out and keeping me informed.` : `Their staff was proactive in reaching out and keeping me informed.`} They were attentive listeners and asked insightful questions to ensure they delivered exactly what I needed. ${wouldRecommend ? `I highly recommend them to anyone needing ${businessType} services!` : ``} ${wouldVisitAgain ? `They've earned a customer for life!` : ``}`
            ],
            extras: [
              `They always responded promptly to my messages and calls.`,
              `Their ability to explain complex concepts in simple terms was impressive.`,
              `I appreciated how they kept me in the loop throughout the entire process.`,
              `They were always transparent about timelines and expectations.`,
              `Their follow-up communication was consistent and helpful.`,
              `I never felt left in the dark about the status of my project.`,
              `They took the time to understand my specific needs before moving forward.`,
              `The communication channels they used were convenient and efficient.`
            ]
          },
          
          // Set 2 - Responsive communication focus
          {
            templates: [
              `I had a fantastic experience with ${businessName}! Their quick response time and clear communication made everything so smooth. ${staffMember ? `${staffMember} would get back to me within hours, sometimes minutes!` : `Their team would get back to me within hours, sometimes minutes!`} They were patient with all my questions and made sure I understood each step. ${wouldRecommend ? `I've been telling everyone I know about how great they are!` : ``} ${wouldVisitAgain ? `I'll definitely be using their services again in the future!` : ``}`,
              
              `${businessName} provided an exceptional experience through their responsive and clear communication. ${staffMember ? `${staffMember} was always quick to respond to my inquiries, no matter how small.` : `Their entire staff was incredibly quick to respond to my inquiries.`} I never had to wait or wonder what was happening next. ${wouldRecommend ? `I wholeheartedly recommend them to anyone looking for reliable ${businessType} services!` : ``} ${wouldVisitAgain ? `I'll be coming back for all my future needs!` : ``}`,
              
              `I'm blown away by the level of communication at ${businessName}! ${staffMember ? `${staffMember} responded to all my messages promptly and was incredibly articulate in explaining their process.` : `Everyone I dealt with responded promptly and explained their process clearly.`} They made everything so easy to understand and kept me informed every step of the way. ${wouldRecommend ? `If you're looking for a ${businessType} that values communication, this is it!` : ``} ${wouldVisitAgain ? `They've earned my loyalty for sure!` : ``}`,
              
              `My experience with ${businessName} was stellar! Their communication was by far the best I've experienced with any ${businessType}. ${staffMember ? `${staffMember} was incredibly responsive and detailed in every interaction.` : `Their team was remarkably responsive and detailed in every interaction.`} I appreciated how they took the time to really listen to my needs. ${wouldRecommend ? `I've already referred several friends who were equally impressed!` : ``} ${wouldVisitAgain ? `I won't go anywhere else for future projects!` : ``}`,
              
              `I can't recommend ${businessName} highly enough! Their communication was exemplary from our very first interaction. ${staffMember ? `${staffMember} was proactive, reaching out with updates before I even had to ask.` : `Their staff was proactive, reaching out with updates before I even had to ask.`} They explained options clearly and always made me feel like a priority. ${wouldRecommend ? `Anyone needing ${businessType} services should definitely check them out!` : ``} ${wouldVisitAgain ? `I'm already looking forward to working with them again!` : ``}`
            ],
            extras: [
              `They never left me waiting for a response.`,
              `I appreciated how they confirmed receipt of my messages.`,
              `Their communication was consistently clear and concise.`,
              `They were great at explaining technical concepts in terms I could understand.`,
              `Their proactive updates meant I never had to wonder about progress.`,
              `The level of detail in their communications showed how much they cared.`,
              `They were excellent listeners and really heard what I was asking for.`,
              `Their follow-through on promises about communication was impeccable.`
            ]
          }
        ],
        
        // QUALITY TEMPLATES
        quality: [
          // Set 1 - Overall quality focus
          {
            templates: [
              `${businessName} delivers exceptional quality that exceeded all my expectations! ${staffMember ? `${staffMember} showed incredible attention to detail and commitment to excellence.` : `Their team showed remarkable attention to detail and commitment to excellence.`} The finished product was flawless and exactly what I was hoping for. ${wouldRecommend ? `I enthusiastically recommend them to anyone who values quality in ${businessType} services!` : ``} ${wouldVisitAgain ? `I'll absolutely be returning for future projects!` : ``}`,
              
              `I'm absolutely thrilled with the quality of service from ${businessName}! ${staffMember ? `${staffMember} delivered work that was truly exceptional in every way.` : `Their workmanship was truly exceptional in every way.`} Every aspect showed meticulous attention to detail and a dedication to excellence. ${wouldRecommend ? `Anyone looking for top-tier ${businessType} services should definitely give them a call!` : ``} ${wouldVisitAgain ? `They've earned my business for the foreseeable future!` : ``}`,
              
              `The quality of service at ${businessName} is simply outstanding! ${staffMember ? `${staffMember} handled everything with incredible precision and care.` : `Their team handled everything with incredible precision and care.`} The results far surpassed what I thought was possible. ${wouldRecommend ? `I've been recommending them to everyone I know who needs ${businessType} services!` : ``} ${wouldVisitAgain ? `I can't wait to work with them again on my next project!` : ``}`,
              
              `${businessName} sets the gold standard for quality in their industry! ${staffMember ? `${staffMember} delivered perfection at every stage of the process.` : `Their commitment to quality was evident at every stage of the process.`} Nothing was overlooked, and the attention to detail was impeccable. ${wouldRecommend ? `If you want the best quality ${businessType} services, this is where to go!` : ``} ${wouldVisitAgain ? `They'll be my first choice for all future needs!` : ``}`,
              
              `I couldn't be more impressed with the quality provided by ${businessName}! ${staffMember ? `${staffMember} demonstrated extraordinary skill and precision in their work.` : `Their team demonstrated extraordinary skill and precision in their work.`} The final result was absolutely perfect in every way. ${wouldRecommend ? `I highly recommend them to anyone who won't settle for less than the best!` : ``} ${wouldVisitAgain ? `I'll definitely be using their services again!` : ``}`
            ],
            extras: [
              `Their commitment to quality was evident in every detail.`,
              `The final product exceeded what I thought was possible.`,
              `They clearly take pride in delivering excellence.`,
              `Not a single detail was overlooked or rushed.`,
              `The quality of their work speaks volumes about their standards.`,
              `They seem to genuinely care about delivering superior results.`,
              `Everything was executed with precision and expertise.`,
              `The quality far exceeded the industry standard.`
            ]
          },
          
          // Set 2 - Durable quality focus
          {
            templates: [
              `${businessName} delivers incredible quality that truly stands the test of time! ${staffMember ? `${staffMember} used premium materials and techniques throughout the project.` : `They used only premium materials and techniques throughout the project.`} Months later, everything still looks and functions perfectly. ${wouldRecommend ? `I recommend them to anyone looking for ${businessType} services that don't cut corners!` : ``} ${wouldVisitAgain ? `They'll be my go-to for all future projects!` : ``}`,
              
              `The quality of work from ${businessName} is truly exceptional and built to last! ${staffMember ? `${staffMember} focused on durability without sacrificing aesthetics or functionality.` : `Their focus on durability never sacrificed aesthetics or functionality.`} Every aspect shows thoughtful consideration and expert execution. ${wouldRecommend ? `Anyone looking for long-lasting quality in ${businessType} services should definitely give them a call!` : ``} ${wouldVisitAgain ? `I'm already planning my next project with them!` : ``}`,
              
              `I'm amazed by the superior quality of ${businessName}'s work! ${staffMember ? `${staffMember} clearly believes in doing things right the first time, using only the best materials and methods.` : `They clearly believe in doing things right the first time, using only the best materials and methods.`} The results speak for themselves - absolutely flawless. ${wouldRecommend ? `I've been telling everyone I know about their exceptional quality!` : ``} ${wouldVisitAgain ? `They've earned my repeat business for sure!` : ``}`,
              
              `${businessName} provides remarkable quality that exceeds industry standards! ${staffMember ? `${staffMember} implemented solutions that were both beautiful and built to last.` : `Every solution they implemented was both beautiful and built to last.`} Their attention to detail results in work that remains perfect long after completion. ${wouldRecommend ? `If you value quality that endures, I highly recommend their ${businessType} services!` : ``} ${wouldVisitAgain ? `I'll absolutely return for future projects!` : ``}`,
              
              `The quality delivered by ${businessName} is truly second to none! ${staffMember ? `${staffMember} demonstrated a level of craftsmanship that's increasingly rare these days.` : `Their level of craftsmanship is increasingly rare these days.`} No corners were cut and no details overlooked. ${wouldRecommend ? `Anyone serious about quality ${businessType} services should look no further!` : ``} ${wouldVisitAgain ? `I won't trust anyone else with my future projects!` : ``}`
            ],
            extras: [
              `Their commitment to quality shows in how well everything has held up.`,
              `They clearly don't believe in temporary fixes or shortcuts.`,
              `The materials and workmanship are top-tier in every way.`,
              `Their quality control process must be rigorous - everything was perfect.`,
              `They seem to approach each project with the intention of it lasting forever.`,
              `The quality of their work continues to impress me months later.`,
              `They clearly take pride in creating solutions built to last.`,
              `The durability of their work demonstrates their commitment to excellence.`
            ]
          }
        ],
        
        // VALUE TEMPLATES
        value: [
          // Set 1 - Great value focus
          {
            templates: [
              `${businessName} provides exceptional value that far exceeded my expectations! ${staffMember ? `${staffMember} delivered premium quality service at a price that was more than fair.` : `They delivered premium quality service at a price that was more than fair.`} I was impressed by how much value they packed into their offering. ${wouldRecommend ? `I highly recommend them to anyone looking for ${businessType} services that deliver real value!` : ``} ${wouldVisitAgain ? `I'll definitely return for all my future needs!` : ``}`,
              
              `I'm amazed by the value I received from ${businessName}! ${staffMember ? `${staffMember} provided service that was worth every penny and then some.` : `Their service was worth every penny and then some.`} The quality-to-price ratio was truly impressive. ${wouldRecommend ? `Anyone looking for great value in ${businessType} services should definitely check them out!` : ``} ${wouldVisitAgain ? `They've earned my business going forward!` : ``}`,
              
              `The value offered by ${businessName} is truly outstanding! ${staffMember ? `${staffMember} delivered top-tier results at a price point that was surprisingly reasonable.` : `They delivered top-tier results at a price point that was surprisingly reasonable.`} I honestly feel like I got more than I paid for. ${wouldRecommend ? `I've been recommending them to everyone looking for excellent ${businessType} value!` : ``} ${wouldVisitAgain ? `I'll be coming back without hesitation!` : ``}`,
              
              `${businessName} delivers tremendous value that makes them stand out in their field! ${staffMember ? `${staffMember} went above and beyond while maintaining very competitive pricing.` : `Their team went above and beyond while maintaining very competitive pricing.`} The investment was absolutely worth it for the quality received. ${wouldRecommend ? `If you're looking for ${businessType} services with exceptional value, look no further!` : ``} ${wouldVisitAgain ? `They'll be my first choice for future projects!` : ``}`,
              
              `I couldn't be more pleased with the value I received from ${businessName}! ${staffMember ? `${staffMember} provided high-end service without the high-end price tag.` : `They provided high-end service without the high-end price tag.`} Their pricing was transparent with no hidden fees or surprises. ${wouldRecommend ? `I highly recommend them to anyone who appreciates great value in ${businessType} services!` : ``} ${wouldVisitAgain ? `I'm already planning to use them again!` : ``}`
            ],
            extras: [
              `Their pricing was fair and transparent throughout the process.`,
              `I received more value than I expected for what I paid.`,
              `The quality of service far exceeded the price point.`,
              `They offered a perfect balance of affordability and quality.`,
              `I was pleasantly surprised by how much was included in their service.`,
              `Their rates are extremely competitive for the level of service provided.`,
              `The return on investment was excellent.`,
              `They provided premium service without the premium price tag.`
            ]
          },
          
          // Set 2 - Fair pricing focus
          {
            templates: [
              `${businessName} offers incredible value with fair, transparent pricing! ${staffMember ? `${staffMember} was upfront about all costs and delivered even more than promised.` : `They were completely upfront about all costs and delivered even more than promised.`} There were no hidden fees or unexpected charges. ${wouldRecommend ? `I recommend them to anyone looking for honest ${businessType} services that deliver great value!` : ``} ${wouldVisitAgain ? `I'll absolutely return for future projects!` : ``}`,
              
              `I'm thoroughly impressed with the value provided by ${businessName}! ${staffMember ? `${staffMember} delivered exceptional quality at a price that didn't break the bank.` : `They delivered exceptional quality at a price that didn't break the bank.`} Their pricing structure was clear, and they stuck to the quoted amount. ${wouldRecommend ? `Anyone looking for fairly priced ${businessType} services should definitely give them a call!` : ``} ${wouldVisitAgain ? `They've earned my repeat business!` : ``}`,
              
              `The value at ${businessName} is simply unmatched in the industry! ${staffMember ? `${staffMember} provided comprehensive service at a price point that was refreshingly reasonable.` : `They provided comprehensive service at a price point that was refreshingly reasonable.`} I received exceptional quality without overpaying. ${wouldRecommend ? `I've been telling everyone about their fair pricing and excellent service!` : ``} ${wouldVisitAgain ? `I won't go anywhere else in the future!` : ``}`,
              
              `${businessName} delivers outstanding value that truly sets them apart! ${staffMember ? `${staffMember} was transparent about costs while delivering service that exceeded expectations.` : `They were completely transparent about costs while delivering service that exceeded expectations.`} The price-to-quality ratio was excellent. ${wouldRecommend ? `If you want honest pricing and great ${businessType} services, this is the place!` : ``} ${wouldVisitAgain ? `I'll definitely be returning!` : ``}`,
              
              `I can't say enough about the value I received from ${businessName}! ${staffMember ? `${staffMember} offered fair pricing with no upselling or hidden charges.` : `They offered fair pricing with no upselling or hidden charges.`} I got exceptional service at a reasonable cost. ${wouldRecommend ? `I highly recommend them to anyone who values transparency in ${businessType} services!` : ``} ${wouldVisitAgain ? `They'll be my go-to for all future needs!` : ``}`
            ],
            extras: [
              `Their pricing was straightforward with no hidden costs.`,
              `They delivered more value than I expected at the price point.`,
              `I appreciated their transparent approach to pricing.`,
              `They offered competitive rates without compromising on quality.`,
              `The value received far exceeded the investment made.`,
              `Their fair pricing policy was refreshing in this industry.`,
              `They seemed more focused on delivering value than maximizing profit.`,
              `I never felt like I was being upsold on unnecessary services.`
            ]
          }
        ],
        
        // EXPERTISE TEMPLATES
        expertise: [
          // Set 1 - Professional knowledge focus
          {
            templates: [
              `${businessName} demonstrates incredible expertise in their field! ${staffMember ? `${staffMember} showed deep knowledge and mastery of every aspect of the service.` : `Their team showed deep knowledge and mastery of every aspect of the service.`} Their expert guidance helped me make informed decisions throughout the process. ${wouldRecommend ? `I highly recommend them to anyone seeking knowledgeable ${businessType} professionals!` : ``} ${wouldVisitAgain ? `I'll definitely be using their expertise again!` : ``}`,
              
              `I'm thoroughly impressed by the expertise at ${businessName}! ${staffMember ? `${staffMember} demonstrated comprehensive knowledge that clearly comes from years of experience.` : `Their staff demonstrated comprehensive knowledge that clearly comes from years of experience.`} They knew exactly how to handle my specific situation with expert precision. ${wouldRecommend ? `Anyone needing expert ${businessType} services should definitely check them out!` : ``} ${wouldVisitAgain ? `I'll be relying on their expertise again in the future!` : ``}`,
              
              `The level of expertise at ${businessName} is truly exceptional! ${staffMember ? `${staffMember} provided insights and solutions that only come from deep industry knowledge.` : `Their team provided insights and solutions that only come from deep industry knowledge.`} They anticipated needs and challenges before they even arose. ${wouldRecommend ? `I've been recommending them to everyone who needs expert ${businessType} services!` : ``} ${wouldVisitAgain ? `I won't trust anyone else with future projects!` : ``}`,
              
              `${businessName} showcases remarkable expertise that sets them apart! ${staffMember ? `${staffMember} demonstrated specialized knowledge that solved problems I didn't even know I had.` : `Their specialists demonstrated knowledge that solved problems I didn't even know I had.`} Their professional insights made all the difference in my project. ${wouldRecommend ? `If you value expertise in ${businessType} services, this is where to go!` : ``} ${wouldVisitAgain ? `I'll definitely return when I need expert assistance again!` : ``}`,
              
              `I was blown away by the expertise displayed by ${businessName}! ${staffMember ? `${staffMember} showed mastery of both fundamental principles and cutting-edge techniques.` : `Their team showed mastery of both fundamental principles and cutting-edge techniques.`} Their knowledge guided the project to a perfect outcome. ${wouldRecommend ? `I highly recommend them to anyone who appreciates true expertise in ${businessType}!` : ``} ${wouldVisitAgain ? `They'll be my first choice for future needs!` : ``}`
            ],
            extras: [
              `Their industry knowledge was evident in every recommendation they made.`,
              `They offered solutions I wouldn't have thought of myself.`,
              `Their expertise helped avoid potential issues before they happened.`,
              `They stay current with the latest developments in their field.`,
              `Their specialized knowledge saved both time and money on my project.`,
              `They explained complex concepts in ways that were easy to understand.`,
              `Their experienced perspective was invaluable throughout the process.`,
              `Their expert recommendations were exactly what I needed.`
            ]
          },
          
          // Set 2 - Problem-solving expertise focus
          {
            templates: [
              `${businessName} showcases impressive expertise that solved my complex challenges! ${staffMember ? `${staffMember} applied specialized knowledge to overcome obstacles that seemed insurmountable.` : `Their team applied specialized knowledge to overcome obstacles that seemed insurmountable.`} Their problem-solving expertise made the entire process smooth. ${wouldRecommend ? `I enthusiastically recommend them for tackling any ${businessType} challenge!` : ``} ${wouldVisitAgain ? `I'll definitely seek their expertise again!` : ``}`,
              
              `The expertise at ${businessName} is truly remarkable! ${staffMember ? `${staffMember} approached my unique situation with specialized knowledge and creative solutions.` : `Their experts approached my unique situation with specialized knowledge and creative solutions.`} They knew exactly what would work best for my specific needs. ${wouldRecommend ? `Anyone facing challenging ${businessType} issues should definitely give them a call!` : ``} ${wouldVisitAgain ? `They'll be my first call for future projects!` : ``}`,
              
              `I'm amazed by the depth of expertise at ${businessName}! ${staffMember ? `${staffMember} demonstrated an impressive command of both theory and practical application.` : `Their team demonstrated an impressive command of both theory and practical application.`} They solved problems I didn't even know existed. ${wouldRecommend ? `I've been telling everyone about their expert ${businessType} services!` : ``} ${wouldVisitAgain ? `I won't trust anyone else with my future needs!` : ``}`,
              
              `${businessName} offers unparalleled expertise that made all the difference! ${staffMember ? `${staffMember} drew on years of experience to provide solutions perfectly tailored to my situation.` : `Their specialists drew on years of experience to provide solutions perfectly tailored to my situation.`} Their knowledge base is clearly extensive and up-to-date. ${wouldRecommend ? `If you need expert ${businessType} services, look no further!` : ``} ${wouldVisitAgain ? `I'll definitely return for their expertise!` : ``}`,
              
              `The expert knowledge at ${businessName} exceeded all my expectations! ${staffMember ? `${staffMember} applied advanced techniques and specialized knowledge throughout the project.` : `Their team applied advanced techniques and specialized knowledge throughout the project.`} They knew precisely how to address every challenge that came up. ${wouldRecommend ? `I highly recommend their expert ${businessType} services to anyone facing complex issues!` : ``} ${wouldVisitAgain ? `They've earned my trust for all future projects!` : ``}`
            ],
            extras: [
              `They identified and solved issues I wouldn't have even recognized.`,
              `Their technical knowledge was impressive and practically applied.`,
              `They offered creative solutions based on extensive experience.`,
              `Their expertise allowed them to anticipate potential problems.`,
              `They approached challenges with confidence born from experience.`,
              `Their specialized knowledge saved the project from potential setbacks.`,
              `They were able to explain complex concepts in accessible ways.`,
              `Their expert perspective transformed how I view the entire situation.`
            ]
          }
        ],
        
        // PROFESSIONALISM TEMPLATES
        professionalism: [
          // Set 1 - Overall professionalism focus
          {
            templates: [
              `${businessName} exemplifies professionalism in every interaction! ${staffMember ? `${staffMember} was courteous, prompt, and thoroughly prepared at all times.` : `Their entire team was courteous, prompt, and thoroughly prepared at all times.`} Their professional approach made the entire experience a pleasure. ${wouldRecommend ? `I highly recommend them to anyone seeking truly professional ${businessType} services!` : ``} ${wouldVisitAgain ? `I'll definitely be using their services again!` : ``}`,
              
              `I'm impressed by the exceptional professionalism at ${businessName}! ${staffMember ? `${staffMember} maintained the highest standards throughout our entire engagement.` : `Their staff maintained the highest standards throughout our entire engagement.`} Every interaction was handled with courtesy and competence. ${wouldRecommend ? `Anyone looking for professional ${businessType} services should give them a call!` : ``} ${wouldVisitAgain ? `They've earned my repeat business!` : ``}`,
              
              `The professionalism displayed by ${businessName} is truly outstanding! ${staffMember ? `${staffMember} was punctual, prepared, and polished in every interaction.` : `Everyone I dealt with was punctual, prepared, and polished in every interaction.`} Their professional demeanor inspired complete confidence. ${wouldRecommend ? `I've been recommending them to everyone seeking professional ${businessType} services!` : ``} ${wouldVisitAgain ? `I won't go anywhere else in the future!` : ``}`,
              
              `${businessName} sets the standard for professionalism in their industry! ${staffMember ? `${staffMember} demonstrated integrity, competence, and courtesy throughout the process.` : `Their team demonstrated integrity, competence, and courtesy throughout the process.`} Every detail was handled with professional care. ${wouldRecommend ? `If you value professionalism in ${businessType} services, this is the place!` : ``} ${wouldVisitAgain ? `I'll definitely return for future needs!` : ``}`,
              
              `I can't say enough about the professionalism at ${businessName}! ${staffMember ? `${staffMember} was respectful of my time, responsive to my needs, and reliable in their commitments.` : `Everyone was respectful of my time, responsive to my needs, and reliable in their commitments.`} Their professional approach made everything smooth and efficient. ${wouldRecommend ? `I highly recommend them to anyone who values professional ${businessType} service!` : ``} ${wouldVisitAgain ? `They'll be my first choice going forward!` : ``}`
            ],
            extras: [
              `Their presentation and demeanor were consistently professional.`,
              `They were punctual and prepared for every appointment.`,
              `Their reliable follow-through on commitments was refreshing.`,
              `They maintained a professional attitude even when challenges arose.`,
              `Their organized approach reflected their professionalism.`,
              `The level of respect they showed was impressive.`,
              `Their professional boundaries and ethics were apparent throughout.`,
              `They maintained professional standards from start to finish.`
            ]
          },
          
          // Set 2 - Integrity & reliability focus
          {
            templates: [
              `${businessName} demonstrates remarkable professionalism and integrity! ${staffMember ? `${staffMember} was honest, reliable, and completely trustworthy throughout our engagement.` : `Their entire team was honest, reliable, and completely trustworthy throughout our engagement.`} They followed through on every promise made. ${wouldRecommend ? `I enthusiastically recommend them to anyone valuing integrity in ${businessType} services!` : ``} ${wouldVisitAgain ? `I'll definitely return for their professional service!` : ``}`,
              
              `The professionalism and reliability at ${businessName} are truly exceptional! ${staffMember ? `${staffMember} was consistently dependable, arriving on time and honoring all commitments.` : `Everyone I dealt with was consistently dependable, arriving on time and honoring all commitments.`} Their professional ethics were evident in every interaction. ${wouldRecommend ? `Anyone seeking reliable ${businessType} services should definitely check them out!` : ``} ${wouldVisitAgain ? `They've earned my trust and future business!` : ``}`,
              
              `I'm thoroughly impressed by the professionalism shown by ${businessName}! ${staffMember ? `${staffMember} maintained impeccable standards of conduct and delivered exactly as promised.` : `Their team maintained impeccable standards of conduct and delivered exactly as promised.`} Their word was as good as gold. ${wouldRecommend ? `I've been telling everyone about their professional ${businessType} services!` : ``} ${wouldVisitAgain ? `I won't trust anyone else going forward!` : ``}`,
              
              `${businessName} sets the gold standard for professional integrity! ${staffMember ? `${staffMember} was straightforward, ethical, and completely reliable in all our dealings.` : `Everyone I worked with was straightforward, ethical, and completely reliable in all our dealings.`} They did exactly what they said they would do, when they said they would do it. ${wouldRecommend ? `If you value reliability in ${businessType} services, look no further!` : ``} ${wouldVisitAgain ? `I'll definitely return for their trustworthy service!` : ``}`,
              
              `The level of professionalism at ${businessName} is truly outstanding! ${staffMember ? `${staffMember} displayed integrity, competence, and courtesy in every interaction.` : `Their entire staff displayed integrity, competence, and courtesy in every interaction.`} They were completely transparent and kept every promise. ${wouldRecommend ? `I highly recommend their professional ${businessType} services to anyone!` : ``} ${wouldVisitAgain ? `They've earned my complete trust for future projects!` : ``}`
            ],
            extras: [
              `They were consistently reliable and punctual.`,
              `Their honesty and transparency were refreshing.`,
              `They delivered exactly what was promised without excuses.`,
              `Their ethical approach to business was apparent throughout.`,
              `They respected boundaries and maintained professionalism at all times.`,
              `They communicated professionally even when challenges arose.`,
              `Their follow-through on commitments was impeccable.`,
              `The level of integrity they demonstrated was impressive.`
            ]
          }
        ],
        
        // FLEXIBILITY TEMPLATES
        flexibility: [
          // Set 1 - Accommodation focus
          {
            templates: [
              `${businessName} offers incredible flexibility that made working with them a pleasure! ${staffMember ? `${staffMember} was willing to accommodate my schedule and specific requests.` : `Their team was willing to accommodate my schedule and specific requests.`} Their adaptable approach made everything so much easier. ${wouldRecommend ? `I highly recommend them to anyone needing flexible ${businessType} services!` : ``} ${wouldVisitAgain ? `I'll definitely use their adaptable services again!` : ``}`,
              
              `I'm impressed by the remarkable flexibility offered by ${businessName}! ${staffMember ? `${staffMember} adjusted plans and processes to perfectly fit my unique situation.` : `They adjusted plans and processes to perfectly fit my unique situation.`} They were willing to work around my constraints without complaint. ${wouldRecommend ? `Anyone who needs accommodating ${businessType} services should give them a call!` : ``} ${wouldVisitAgain ? `Their flexibility has earned my future business!` : ``}`,
              
              `The flexibility displayed by ${businessName} is truly exceptional! ${staffMember ? `${staffMember} was open to adjustments and willing to tailor their approach to my specific needs.` : `Their entire team was open to adjustments and willing to tailor their approach to my specific needs.`} They never made me feel like an inconvenience. ${wouldRecommend ? `I've been recommending their flexible ${businessType} services to everyone!` : ``} ${wouldVisitAgain ? `I'll definitely return for their accommodating approach!` : ``}`,
              
              `${businessName} demonstrates outstanding flexibility that sets them apart! ${staffMember ? `${staffMember} worked around my challenging schedule and specific requirements with ease.` : `They worked around my challenging schedule and specific requirements with ease.`} Their adaptable service model was exactly what I needed. ${wouldRecommend ? `If you need flexible ${businessType} services, look no further!` : ``} ${wouldVisitAgain ? `I'll be calling on their flexible service again!` : ``}`,
              
              `I can't say enough about the flexibility offered by ${businessName}! ${staffMember ? `${staffMember} accommodated last-minute changes and special requests without hesitation.` : `Their team accommodated last-minute changes and special requests without hesitation.`} They tailored everything to my specific situation. ${wouldRecommend ? `I highly recommend them to anyone who needs adaptable ${businessType} services!` : ``} ${wouldVisitAgain ? `Their flexibility has made me a customer for life!` : ``}`
            ],
            extras: [
              `They were willing to adjust their process to fit my unique needs.`,
              `Their ability to accommodate changes made everything easier.`,
              `They never made me feel like my requests were burdensome.`,
              `They offered creative solutions to accommodate my constraints.`,
              `Their flexible scheduling options were incredibly helpful.`,
              `They adapted their approach when circumstances changed.`,
              `They were open to suggestions and alternative methods.`,
              `Their willingness to customize their service was impressive.`
            ]
          },
          
          // Set 2 - Problem-solving flexibility focus
          {
            templates: [
              `${businessName} showcases impressive flexibility and creative problem-solving! ${staffMember ? `${staffMember} adapted seamlessly when challenges arose and found innovative solutions.` : `Their team adapted seamlessly when challenges arose and found innovative solutions.`} Their ability to pivot when needed was remarkable. ${wouldRecommend ? `I enthusiastically recommend them for handling any ${businessType} situation that requires flexibility!` : ``} ${wouldVisitAgain ? `I'll definitely return for their adaptable approach!` : ``}`,
              
              `The flexibility at ${businessName} transformed potential problems into perfect solutions! ${staffMember ? `${staffMember} approached unexpected challenges with a can-do attitude and creative thinking.` : `Their staff approached unexpected challenges with a can-do attitude and creative thinking.`} They adjusted their methods to ensure the best outcome. ${wouldRecommend ? `Anyone needing adaptable ${businessType} services should definitely check them out!` : ``} ${wouldVisitAgain ? `They've earned my business for future projects!` : ``}`,
              
              `I'm thoroughly impressed by the flexibility demonstrated by ${businessName}! ${staffMember ? `${staffMember} handled curveballs with grace and quickly adapted to changing circumstances.` : `Their team handled curveballs with grace and quickly adapted to changing circumstances.`} Their adaptable approach prevented any potential issues. ${wouldRecommend ? `I've been telling everyone about their flexible ${businessType} services!` : ``} ${wouldVisitAgain ? `I won't go anywhere else in the future!` : ``}`,
              
              `${businessName} offers unmatched flexibility that made my complex project successful! ${staffMember ? `${staffMember} adjusted strategies and timelines as needed while maintaining quality standards.` : `They adjusted strategies and timelines as needed while maintaining quality standards.`} Their ability to adapt was crucial to our success. ${wouldRecommend ? `If you need ${businessType} services that can adapt to changing needs, this is the place!` : ``} ${wouldVisitAgain ? `I'll definitely return for their flexible service!` : ``}`,
              
              `The level of flexibility at ${businessName} is truly exceptional! ${staffMember ? `${staffMember} was able to pivot quickly when circumstances changed and still deliver outstanding results.` : `Their team was able to pivot quickly when circumstances changed and still deliver outstanding results.`} They turned potential obstacles into opportunities. ${wouldRecommend ? `I highly recommend their adaptable ${businessType} services to anyone with changing needs!` : ``} ${wouldVisitAgain ? `They'll be my first choice for future projects!` : ``}`
            ],
            extras: [
              `They adapted quickly when unexpected challenges arose.`,
              `Their creative problem-solving skills were impressive.`,
              `They weren't rigidly bound to one way of doing things.`,
              `They found innovative solutions when standard approaches wouldn't work.`,
              `Their adaptability never compromised the quality of service.`,
              `They remained calm and flexible when plans needed to change.`,
              `Their ability to pivot while maintaining progress was remarkable.`,
              `They handled changes in scope without making it a big issue.`
            ]
          }
        ],
        
        // RESULTS TEMPLATES
        results: [
          // Set 1 - Outcome excellence focus
          {
            templates: [
              `${businessName} delivered absolutely outstanding results that exceeded all my expectations! ${staffMember ? `${staffMember} produced outcomes that were even better than I had hoped for.` : `Their team produced outcomes that were even better than I had hoped for.`} The final results completely transformed my situation. ${wouldRecommend ? `I enthusiastically recommend them to anyone seeking excellent ${businessType} results!` : ``} ${wouldVisitAgain ? `I'll definitely return for more amazing results!` : ``}`,
              
              `I'm blown away by the exceptional results delivered by ${businessName}! ${staffMember ? `${staffMember} achieved outcomes that have made a significant positive impact.` : `They achieved outcomes that have made a significant positive impact.`} The results were beyond what I thought possible. ${wouldRecommend ? `Anyone wanting superior ${businessType} results should definitely give them a call!` : ``} ${wouldVisitAgain ? `They've earned my future business with these results!` : ``}`,
              
              `The results from ${businessName} are truly remarkable! ${staffMember ? `${staffMember} produced outcomes that perfectly aligned with my goals and exceeded my expectations.` : `They produced outcomes that perfectly aligned with my goals and exceeded my expectations.`} The impact of their work has been transformative. ${wouldRecommend ? `I've been raving about their ${businessType} results to everyone I know!` : ``} ${wouldVisitAgain ? `I can't wait to work with them again!` : ``}`,
              
              `${businessName} achieves incredible results that truly set them apart! ${staffMember ? `${staffMember} delivered outcomes that were measurably better than any I've experienced before.` : `Their team delivered outcomes that were measurably better than any I've experienced before.`} The results speak for themselves - absolutely perfect! ${wouldRecommend ? `If you want amazing ${businessType} results, look no further!` : ``} ${wouldVisitAgain ? `I'll definitely be back for more outstanding results!` : ``}`,
              
              `I can't praise the results from ${businessName} highly enough! ${staffMember ? `${staffMember} achieved outcomes that have completely exceeded my highest expectations.` : `They achieved outcomes that have completely exceeded my highest expectations.`} The results have made a substantial difference for me. ${wouldRecommend ? `I highly recommend them to anyone who wants superior ${businessType} results!` : ``} ${wouldVisitAgain ? `They'll be my first choice for future projects!` : ``}`
            ],
            extras: [
              `The results they delivered continue to exceed expectations.`,
              `The impact of their work has been truly transformative.`,
              `They achieved outcomes I didn't think were possible.`,
              `The results have made a significant positive difference.`,
              `Their work produced measurable improvements.`,
              `The end results perfectly matched what I was hoping for.`,
              `The quality of the outcomes speaks for itself.`,
              `They delivered results that will benefit me for years to come.`
            ]
          },
          
          // Set 2 - Results beyond expectations focus
          {
            templates: [
              `${businessName} produced results that went far beyond what I thought possible! ${staffMember ? `${staffMember} delivered outcomes that surpassed even my highest expectations.` : `Their team delivered outcomes that surpassed even my highest expectations.`} The results have made a tremendous positive impact. ${wouldRecommend ? `I wholeheartedly recommend them for truly exceptional ${businessType} results!` : ``} ${wouldVisitAgain ? `I'll definitely seek their amazing results again!` : ``}`,
              
              `The results achieved by ${businessName} are nothing short of extraordinary! ${staffMember ? `${staffMember} produced outcomes that have completely transformed my situation for the better.` : `They produced outcomes that have completely transformed my situation for the better.`} I'm still amazed by how great the results turned out. ${wouldRecommend ? `Anyone wanting remarkable ${businessType} results should definitely check them out!` : ``} ${wouldVisitAgain ? `They've earned my future business with these incredible results!` : ``}`,
              
              `I'm completely amazed by the results delivered by ${businessName}! ${staffMember ? `${staffMember} achieved outcomes that have exceeded my expectations in every possible way.` : `Their team achieved outcomes that have exceeded my expectations in every possible way.`} The results have had a profound positive impact. ${wouldRecommend ? `I've been telling everyone about the amazing ${businessType} results they deliver!` : ``} ${wouldVisitAgain ? `I can't wait to work with them again!` : ``}`,
              
              `${businessName} delivers results that truly separate them from the competition! ${staffMember ? `${staffMember} produced outcomes of such high quality that I'm still impressed weeks later.` : `They produced outcomes of such high quality that I'm still impressed weeks later.`} The results have been game-changing for me. ${wouldRecommend ? `If you want ${businessType} results that will exceed expectations, this is the place!` : ``} ${wouldVisitAgain ? `I'll definitely return for more exceptional results!` : ``}`,
              
              `The results I received from ${businessName} are truly mind-blowing! ${staffMember ? `${staffMember} achieved outcomes that I didn't even think were possible before.` : `They achieved outcomes that I didn't even think were possible before.`} The results have made an incredible difference. ${wouldRecommend ? `I highly recommend them to anyone seeking outstanding ${businessType} results!` : ``} ${wouldVisitAgain ? `They'll be my only choice for future projects!` : ``}`
            ],
            extras: [
              `The results exceeded my expectations in every way.`,
              `I'm still impressed by the outcomes they achieved.`,
              `The results have made a significant positive impact.`,
              `Their work produced outcomes better than I imagined possible.`,
              `The results continue to provide benefits long after completion.`,
              `I'm amazed by the quality of the outcomes they delivered.`,
              `Their results outperformed everything I've seen before.`,
              `The impact of their results has been truly transformative.`
            ]
          }
        ],
        
        // SPEED TEMPLATES
        speed: [
          // Set 1 - Efficiency focus
          {
            templates: [
              `${businessName} delivered with impressive speed without sacrificing quality! ${staffMember ? `${staffMember} completed everything efficiently and ahead of schedule.` : `Their team completed everything efficiently and ahead of schedule.`} Their quick turnaround time was exactly what I needed. ${wouldRecommend ? `I highly recommend them to anyone needing fast, reliable ${businessType} services!` : ``} ${wouldVisitAgain ? `I'll definitely return when I need speed and quality!` : ``}`,
              
              `I'm amazed by the speed and efficiency at ${businessName}! ${staffMember ? `${staffMember} worked quickly while maintaining meticulous attention to detail.` : `Their team worked quickly while maintaining meticulous attention to detail.`} They completed everything faster than I expected. ${wouldRecommend ? `Anyone needing efficient ${businessType} services should definitely give them a call!` : ``} ${wouldVisitAgain ? `Their speed has earned my future business!` : ``}`,
              
              `The speed of service at ${businessName} is truly exceptional! ${staffMember ? `${staffMember} worked efficiently without cutting corners on quality.` : `Their staff worked efficiently without cutting corners on quality.`} They delivered results in record time. ${wouldRecommend ? `I've been recommending their speedy ${businessType} services to everyone I know!` : ``} ${wouldVisitAgain ? `I won't go anywhere else when I need quick results!` : ``}`,
              
              `${businessName} offers remarkable speed that sets them apart in their industry! ${staffMember ? `${staffMember} worked quickly and effectively, completing everything ahead of deadline.` : `Their team worked quickly and effectively, completing everything ahead of deadline.`} Their efficient process saved me valuable time. ${wouldRecommend ? `If you need fast ${businessType} services without sacrificing quality, this is the place!` : ``} ${wouldVisitAgain ? `I'll definitely return for their quick service!` : ``}`,
              
              `I can't say enough about the speed and efficiency at ${businessName}! ${staffMember ? `${staffMember} completed everything promptly while maintaining exceptional quality standards.` : `They completed everything promptly while maintaining exceptional quality standards.`} Their quick turnaround exceeded my expectations. ${wouldRecommend ? `I highly recommend them to anyone who values efficiency in ${businessType} services!` : ``} ${wouldVisitAgain ? `They'll be my first choice when time is of the essence!` : ``}`
            ],
            extras: [
              `Their efficient process saved me valuable time.`,
              `They delivered results faster than I expected.`,
              `Their quick work never compromised quality.`,
              `They respected my time by working efficiently.`,
              `Their streamlined process eliminated unnecessary delays.`,
              `They were able to expedite service when I needed it most.`,
              `Their quick response and turnaround time was impressive.`,
              `They completed everything ahead of schedule.`
            ]
          },
          
          // Set 2 - Urgency accommodation focus
          {
            templates: [
              `${businessName} responded to my urgent needs with incredible speed! ${staffMember ? `${staffMember} prioritized my time-sensitive request and delivered results quickly.` : `They prioritized my time-sensitive request and delivered results quickly.`} Their ability to work efficiently under pressure was impressive. ${wouldRecommend ? `I enthusiastically recommend them when you need urgent ${businessType} service!` : ``} ${wouldVisitAgain ? `I'll definitely return when I need fast results!` : ``}`,
              
              `The speed of service at ${businessName} saved the day for my urgent project! ${staffMember ? `${staffMember} understood my time constraints and worked quickly without sacrificing quality.` : `Their team understood my time constraints and worked quickly without sacrificing quality.`} They delivered everything ahead of my tight deadline. ${wouldRecommend ? `Anyone with time-sensitive ${businessType} needs should definitely give them a call!` : ``} ${wouldVisitAgain ? `They've earned my business for all future urgent projects!` : ``}`,
              
              `I'm thoroughly impressed by how quickly ${businessName} responded to my needs! ${staffMember ? `${staffMember} acted with urgency and completed everything in record time.` : `Their team acted with urgency and completed everything in record time.`} Their efficiency saved me from a potentially stressful situation. ${wouldRecommend ? `I've been telling everyone about their rapid ${businessType} services!` : ``} ${wouldVisitAgain ? `I won't trust anyone else when time is critical!` : ``}`,
              
              `${businessName} offers unmatched speed for urgent situations! ${staffMember ? `${staffMember} understood my deadline was non-negotiable and delivered flawlessly ahead of schedule.` : `They understood my deadline was non-negotiable and delivered flawlessly ahead of schedule.`} Their quick work was a lifesaver. ${wouldRecommend ? `If you need urgent ${businessType} services without compromising quality, look no further!` : ``} ${wouldVisitAgain ? `I'll definitely return for their rapid response!` : ``}`,
              
              `The speed and urgency that ${businessName} brought to my project was remarkable! ${staffMember ? `${staffMember} made my time-sensitive needs a priority and delivered faster than promised.` : `Their team made my time-sensitive needs a priority and delivered faster than promised.`} They work with an efficiency that's rare to find. ${wouldRecommend ? `I highly recommend their quick ${businessType} services to anyone with urgent needs!` : ``} ${wouldVisitAgain ? `They'll be my first call for all time-sensitive projects!` : ``}`
            ],
            extras: [
              `They understood the urgency of my situation and responded accordingly.`,
              `Their quick turnaround saved me from a potential crisis.`,
              `They accommodated my tight timeline without complaint.`,
              `They made my urgent request a priority.`,
              `Their ability to expedite service without sacrificing quality was impressive.`,
              `They delivered results faster than I thought possible.`,
              `Their quick response time made all the difference.`,
              `They completed everything well before the deadline.`
            ]
          }
        ],
        
        // FRIENDLINESS TEMPLATES
        friendliness: [
          // Set 1 - Warm service focus
          {
            templates: [
              `${businessName} offers the warmest, friendliest service I've experienced! ${staffMember ? `${staffMember} was incredibly personable and made me feel valued throughout the process.` : `Everyone I interacted with was incredibly personable and made me feel valued.`} Their friendly approach made the experience truly enjoyable. ${wouldRecommend ? `I highly recommend them to anyone who appreciates friendly ${businessType} service!` : ``} ${wouldVisitAgain ? `I'll definitely return for their warm approach!` : ``}`,
              
              `I'm impressed by the genuine friendliness at ${businessName}! ${staffMember ? `${staffMember} was approachable, warm, and created a comfortable atmosphere from start to finish.` : `Their entire team was approachable, warm, and created a comfortable atmosphere.`} They treat customers like friends, not transactions. ${wouldRecommend ? `Anyone who values a friendly experience should check out their ${businessType} services!` : ``} ${wouldVisitAgain ? `Their welcoming environment has earned my future business!` : ``}`,
              
              `The friendliness at ${businessName} truly sets them apart! ${staffMember ? `${staffMember} was genuine, personable, and made our interactions enjoyable.` : `Everyone I dealt with was genuine, personable, and made our interactions enjoyable.`} Their warm demeanor created a wonderful experience. ${wouldRecommend ? `I've been telling everyone about their friendly ${businessType} services!` : ``} ${wouldVisitAgain ? `I look forward to returning for their pleasant atmosphere!` : ``}`,
              
              `${businessName} provides service with exceptional warmth and friendliness! ${staffMember ? `${staffMember} was welcoming, personable, and genuinely seemed happy to help.` : `Their staff was welcoming, personable, and genuinely seemed happy to help.`} The friendly environment made everything more enjoyable. ${wouldRecommend ? `If you appreciate warm, friendly ${businessType} service, this is the place!` : ``} ${wouldVisitAgain ? `I'll definitely return for their welcoming approach!` : ``}`,
              
              `I can't say enough about the friendly atmosphere at ${businessName}! ${staffMember ? `${staffMember} was warm, engaging, and made me feel completely at ease.` : `Everyone there was warm, engaging, and made me feel completely at ease.`} Their genuine friendliness enhanced the entire experience. ${wouldRecommend ? `I highly recommend them to anyone who values personable ${businessType} service!` : ``} ${wouldVisitAgain ? `Their friendly environment guarantees my return!` : ``}`
            ],
            extras: [
              `Their genuine warmth made the experience so much more enjoyable.`,
              `They created a welcoming environment from the moment I arrived.`,
              `Their friendly approach put me completely at ease.`,
              `They treated me like a valued friend, not just another customer.`,
              `Their personable nature made even routine interactions pleasant.`,
              `The warm atmosphere they created was truly inviting.`,
              `Their friendly demeanor made a potentially stressful process enjoyable.`,
              `The genuine smiles and positive attitudes were refreshing.`
            ]
          },
          
          // Set 2 - Personal connection focus
          {
            templates: [
              `${businessName} creates an incredibly friendly environment that feels like family! ${staffMember ? `${staffMember} took time to get to know me and my specific needs on a personal level.` : `Their team took time to get to know me and my specific needs on a personal level.`} They create genuine connections with their customers. ${wouldRecommend ? `I enthusiastically recommend them to anyone who values personal ${businessType} service!` : ``} ${wouldVisitAgain ? `I'll definitely return to see these friendly faces again!` : ``}`,
              
              `The personable approach at ${businessName} makes them truly special! ${staffMember ? `${staffMember} remembered details about our previous conversations and genuinely cared about my experience.` : `Their staff remembered details about our previous conversations and genuinely cared about my experience.`} They make you feel like more than just a customer. ${wouldRecommend ? `Anyone looking for friendly ${businessType} service should definitely give them a call!` : ``} ${wouldVisitAgain ? `Their personal touch has earned my loyalty!` : ``}`,
              
              `I'm thoroughly impressed by how ${businessName} builds genuine relationships! ${staffMember ? `${staffMember} was authentically interested in me as a person, not just a client.` : `Everyone I interacted with was authentically interested in me as a person, not just a client.`} Their friendly, personal approach made all the difference. ${wouldRecommend ? `I've been telling everyone about their personable ${businessType} service!` : ``} ${wouldVisitAgain ? `I look forward to continuing our relationship!` : ``}`,
              
              `${businessName} offers service with a personal touch that's truly refreshing! ${staffMember ? `${staffMember} created a warm connection that made me feel valued and understood.` : `Their team created a warm connection that made me feel valued and understood.`} They remember your name and your preferences. ${wouldRecommend ? `If you value personal connections in ${businessType} service, this is the place!` : ``} ${wouldVisitAgain ? `I'll definitely return for their friendly atmosphere!` : ``}`,
              
              `The genuine connections created by ${businessName} set them far apart from others! ${staffMember ? `${staffMember} took the time to understand my specific situation and remembered personal details.` : `Their staff took the time to understand my specific situation and remembered personal details.`} They make every interaction warm and personal. ${wouldRecommend ? `I highly recommend their friendly ${businessType} services to anyone who values personal connections!` : ``} ${wouldVisitAgain ? `Their personable approach guarantees my future business!` : ``}`
            ],
            extras: [
              `They remembered personal details about me from previous visits.`,
              `They took time to build a genuine relationship beyond business.`,
              `Their authentic interest in me as a person was refreshing.`,
              `The personal connection they established made everything better.`,
              `They made me feel like a valued friend rather than just a customer.`,
              `Their ability to connect on a personal level enhanced the experience.`,
              `The friendly conversations made the whole process more enjoyable.`,
              `They showed genuine interest in my specific situation.`
            ]
          }
        ],
        
        // ATTENTION TO DETAIL TEMPLATES
        "attention-to-detail": [
          // Set 1 - Meticulous service focus
          {
            templates: [
              `${businessName} demonstrates incredible attention to detail that's truly impressive! ${staffMember ? `${staffMember} was meticulous, catching even the smallest details that others would miss.` : `Their team was meticulous, catching even the smallest details that others would miss.`} Their thorough approach ensured perfect results. ${wouldRecommend ? `I highly recommend them to anyone who appreciates detailed ${businessType} service!` : ``} ${wouldVisitAgain ? `I'll definitely return for their meticulous approach!` : ``}`,
              
              `I'm amazed by the exceptional attention to detail at ${businessName}! ${staffMember ? `${staffMember} carefully considered every aspect of the project, leaving nothing to chance.` : `They carefully considered every aspect of the project, leaving nothing to chance.`} Their precision made all the difference. ${wouldRecommend ? `Anyone who values thoroughness in ${businessType} services should give them a call!` : ``} ${wouldVisitAgain ? `Their detailed focus has earned my future business!` : ``}`,
              
              `The meticulous attention to detail at ${businessName} sets them far above the rest! ${staffMember ? `${staffMember} was incredibly thorough, ensuring every aspect was perfect.` : `Their entire team was incredibly thorough, ensuring every aspect was perfect.`} They noticed and addressed things I hadn't even considered. ${wouldRecommend ? `I've been recommending their detailed ${businessType} services to everyone!` : ``} ${wouldVisitAgain ? `I won't trust anyone else with my future needs!` : ``}`,
              
              `${businessName} showcases remarkable precision and attention to detail! ${staffMember ? `${staffMember} was focused on getting even the smallest details exactly right.` : `They focused on getting even the smallest details exactly right.`} Their thoroughness prevented potential issues. ${wouldRecommend ? `If you value precision in ${businessType} services, this is the place!` : ``} ${wouldVisitAgain ? `I'll definitely return for their detailed approach!` : ``}`,
              
              `I can't praise the attention to detail at ${businessName} enough! ${staffMember ? `${staffMember} was exceptionally careful and thorough throughout the entire process.` : `Everyone showed exceptional care and thoroughness throughout the entire process.`} They left absolutely nothing overlooked. ${wouldRecommend ? `I highly recommend them to anyone who values meticulous ${businessType} service!` : ``} ${wouldVisitAgain ? `Their precision guarantees my future business!` : ``}`
            ],
            extras: [
              `Their attention to the smallest details was impressive.`,
              `They caught things that I would have completely missed.`,
              `Their thorough approach prevented potential issues.`,
              `They considered aspects I hadn't even thought about.`,
              `Their meticulous nature ensured perfect results.`,
              `They double-checked everything for accuracy.`,
              `The level of detail in their work was extraordinary.`,
              `Their precision and thoroughness were apparent throughout.`
            ]
          },
          
          // Set 2 - Thoughtful details focus
          {
            templates: [
              `${businessName} pays attention to details that truly elevate the experience! ${staffMember ? `${staffMember} noticed and addressed small details that made a huge difference in the outcome.` : `Their team noticed and addressed small details that made a huge difference in the outcome.`} Their thoughtful thoroughness was impressive. ${wouldRecommend ? `I enthusiastically recommend them for detail-oriented ${businessType} service!` : ``} ${wouldVisitAgain ? `I'll definitely return for their detailed care!` : ``}`,
              
              `The thoughtful attention to detail at ${businessName} creates an exceptional experience! ${staffMember ? `${staffMember} considered aspects I never would have thought of, adding tremendous value.` : `They considered aspects I never would have thought of, adding tremendous value.`} Their careful approach catches everything. ${wouldRecommend ? `Anyone who appreciates thoroughness in ${businessType} services should check them out!` : ``} ${wouldVisitAgain ? `Their detailed focus has earned my loyalty!` : ``}`,
              
              `I'm thoroughly impressed by how ${businessName} handles even the smallest details! ${staffMember ? `${staffMember} was incredibly observant, identifying and addressing minor points that had major impact.` : `Their staff was incredibly observant, identifying and addressing minor points that had major impact.`} Their meticulous nature prevented potential issues. ${wouldRecommend ? `I've been telling everyone about their detailed ${businessType} approach!` : ``} ${wouldVisitAgain ? `I can't imagine going anywhere else now!` : ``}`,
              
              `${businessName} offers remarkable attention to detail that makes them truly exceptional! ${staffMember ? `${staffMember} thoughtfully considered every aspect, even those I hadn't mentioned.` : `Their team thoughtfully considered every aspect, even those I hadn't mentioned.`} They think of everything so you don't have to. ${wouldRecommend ? `If you value thorough ${businessType} service, look no further!` : ``} ${wouldVisitAgain ? `I'll definitely be back for more of their detailed care!` : ``}`,
              
              `The level of detail that ${businessName} provides is truly outstanding! ${staffMember ? `${staffMember} noticed things that others would have missed and made thoughtful adjustments.` : `Their team noticed things that others would have missed and made thoughtful adjustments.`} They leave nothing to chance. ${wouldRecommend ? `I highly recommend their meticulous ${businessType} services to anyone who values precision!` : ``} ${wouldVisitAgain ? `Their attention to detail guarantees my return!` : ``}`
            ],
            extras: [
              `They considered details I never would have thought about.`,
              `Their careful attention to small points made a big difference.`,
              `They anticipated potential issues before they could occur.`,
              `The thoughtful details they included enhanced the entire experience.`,
              `Their meticulous nature was evident in the perfect result.`,
              `They seemed to think of everything, leaving nothing to chance.`,
              `The level of care they put into every detail was impressive.`,
              `Their thorough approach meant nothing was overlooked.`
            ]
          }
        ]
      };
      
      // Setup for generating the review
      let reviewText = '';
      let success = false;
      
      try {
        // Generate a review based on service highlight
        // Each service highlight category has multiple template sets
        const highlightTemplates = reviewTemplates[serviceHighlight];
        
        // Create a consistent but seemingly random selection based on timestamp
        const seed = Math.floor(Date.now() % 10000);
        
        // Get a template set based on the seed (creates variety between basic categories)
        const templateSetIndex = seed % highlightTemplates.length;
        const templateSet = highlightTemplates[templateSetIndex];
        
        // Get a template from the selected set
        const templateIndex = (seed * 3) % templateSet.templates.length;
        reviewText = templateSet.templates[templateIndex];
        
        // Add an extra detail if the review seems too short or if additional comments exist
        if (reviewText.length < 250 || additionalComments) {
          // Get a random extra detail
          const extraIndex = (seed * 7) % templateSet.extras.length;
          const extraDetail = templateSet.extras[extraIndex];
          
          // Decide where to insert the extra detail (before the closing statements)
          const insertPoint = reviewText.lastIndexOf('!') + 1;
          if (insertPoint > 0 && insertPoint < reviewText.length) {
            reviewText = reviewText.substring(0, insertPoint) + ' ' + extraDetail + reviewText.substring(insertPoint);
          }
          
          // If there are additional comments, add them too
          if (additionalComments && additionalComments.trim().length > 0) {
            const commentInsertPoint = reviewText.lastIndexOf('!') + 1;
            if (commentInsertPoint > 0 && commentInsertPoint < reviewText.length) {
              reviewText = reviewText.substring(0, commentInsertPoint) + ' ' + additionalComments + reviewText.substring(commentInsertPoint);
            }
          }
        }
        
        // Clean up any double spaces or weird formatting
        reviewText = reviewText.replace(/\s\s+/g, ' ').trim();
        
        success = true;
      } catch (generationError) {
        console.error("Error generating review:", generationError);
        // If there's an error in the complex generation, fall back to a simpler approach
        
        const simpleTemplates = [
          `I had a wonderful experience with ${businessName}! ${staffMember ? `${staffMember} was extremely helpful and professional.` : `Their team was extremely helpful and professional.`} Their ${serviceHighlight} really stood out and made a big difference. ${wouldRecommend ? `I would highly recommend them to anyone looking for ${businessType} services.` : ``} ${wouldVisitAgain ? `I'll definitely be using their services again in the future!` : ``}`,
          
          `${businessName} provided excellent service from start to finish! ${staffMember ? `${staffMember} was attentive and knowledgeable.` : `Everyone I interacted with was attentive and knowledgeable.`} I was particularly impressed with their outstanding ${serviceHighlight}. ${wouldRecommend ? `I recommend them to anyone needing quality ${businessType} services!` : ``} ${wouldVisitAgain ? `They've earned my repeat business for sure.` : ``}`,
          
          `My experience with ${businessName} was fantastic! ${staffMember ? `${staffMember} made sure everything went smoothly.` : `Their staff made sure everything went smoothly.`} Their exceptional ${serviceHighlight} really made them stand out from other providers. ${wouldRecommend ? `If you're looking for great ${businessType} service, look no further!` : ``} ${wouldVisitAgain ? `I'll definitely be returning for future needs.` : ``}`
        ];
        
        // Pick a simple template based on the timestamp
        const simpleIndex = Math.floor(Date.now() % simpleTemplates.length);
        reviewText = simpleTemplates[simpleIndex];
        
        // Add additional comments if provided
        if (additionalComments && additionalComments.trim().length > 0) {
          reviewText += ` ${additionalComments}`;
        }
        
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
      const mapsUrl = googleMapsUrl || DEFAULT_ASAP_GOOGLE_MAPS_URL;
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
                      <Select
                        value={reviewOptions.serviceHighlight}
                        onValueChange={(value) => handleSelectChange('serviceHighlight', value as any)}
                      >
                        <SelectTrigger className="w-full bg-gray-800 border-gray-700">
                          <SelectValue placeholder="Select what stood out" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="communication">Communication</SelectItem>
                          <SelectItem value="quality">Quality of Service</SelectItem>
                          <SelectItem value="value">Value for Money</SelectItem>
                          <SelectItem value="expertise">Expertise & Knowledge</SelectItem>
                          <SelectItem value="professionalism">Professionalism</SelectItem>
                          <SelectItem value="flexibility">Flexibility & Accommodation</SelectItem>
                          <SelectItem value="results">Results & Outcomes</SelectItem>
                          <SelectItem value="speed">Speed & Efficiency</SelectItem>
                          <SelectItem value="friendliness">Friendliness & Approachability</SelectItem>
                          <SelectItem value="attention-to-detail">Attention to Detail</SelectItem>
                        </SelectContent>
                      </Select>
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