import { createContext, useContext, ReactNode } from "react";

// Define the translations type
type Translations = {
  home: string;
  ourStory: string;
  batteries: string;
  technology: string;
  investors: string;
  media: string;
  contact: string;
  contactUs: string;
  learnMore: string;
  language: string;
  ourMission: string;
  designApproach: string;
  designApproachDescription: string;
  theProblem: string;
  problemDescription1: string;
  problemDescription2: string;
  acceleratingMaterial: string;
  acceleratingMaterialDescription1: string;
  acceleratingMaterialDescription2: string;
  accelerating: string;
  frictionlessScaling: string;
  frictionlessScalingDescription1: string;
  frictionlessScalingDescription2: string;
  scaling: string;
  heroDescription: string;
  footerDescription: string;
  quickLinks: string;
  products: string;
  electricVehicles: string;
  gridStorage: string;
  portableDevices: string;
  renewableIntegration: string;
  industrialApplications: string;
  businessHours: string;
  weekendHours: string;
  allRightsReserved: string;
  privacyPolicy: string;
  termsOfService: string;
  cookiePolicy: string;
};

// English-only translations
const translations: Translations = {
  home: "Home",
  ourStory: "Our Story",
  batteries: "Batteries",
  technology: "Technology",
  investors: "Investors",
  media: "Media",
  contact: "Contact",
  contactUs: "Contact Us",
  learnMore: "Learn More",
  language: "Language",
  ourMission: "Our Approach",
  designApproach: "Our Automation-First Approach",
  designApproachDescription: "We apply cutting-edge automation technology to streamline business operations before focusing on promotion and growth.",
  theProblem: "The Business Challenge",
  problemDescription1: "Most businesses seek marketing help to grow but neglect to streamline their operations first. When new customers arrive, these businesses struggle to handle the increased demand.",
  problemDescription2: "Traditional approaches often focus on marketing without addressing operational bottlenecks, leading to overwhelmed teams, disappointed customers, and missed opportunities for sustainable growth.",
  acceleratingMaterial: "Streamlined Operations",
  acceleratingMaterialDescription1: "Our proprietary approach combines process automation, AI integration, and custom software development to identify and eliminate operational inefficiencies.",
  acceleratingMaterialDescription2: "This automation-first strategy creates a solid foundation that makes your business ready to scale before investing heavily in marketing and promotion.",
  accelerating: "Automating",
  frictionlessScaling: "Seamless Growth & Scaling",
  frictionlessScalingDescription1: "Once your operations are streamlined through automation, we help design marketing strategies that bring in the right customers at the right pace for your newly efficient business.",
  frictionlessScalingDescription2: "This integrated approach ensures your business can handle growth smoothly, delivering consistent quality as you scale without overwhelming your team or resources.",
  scaling: "Growing",
  heroDescription: "We help businesses streamline operations through automation first, then promote effectively to ensure sustainable, manageable growth.",
  footerDescription: "Pioneering automation-first solutions that streamline business operations and enable sustainable growth through effective promotion strategies.",
  quickLinks: "Quick Links",
  products: "Services",
  electricVehicles: "Process Automation",
  gridStorage: "AI Integration",
  portableDevices: "Custom Software",
  renewableIntegration: "Marketing Strategies",
  industrialApplications: "Business Consulting",
  businessHours: "Mon-Fri: 9AM-6PM",
  weekendHours: "Sat: 10AM-4PM",
  allRightsReserved: "All rights reserved.",
  privacyPolicy: "Privacy Policy",
  termsOfService: "Terms of Service",
  cookiePolicy: "Cookie Policy"
};

// Simplified context type - English only
type LanguageContextType = {
  translations: Translations;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  return (
    <LanguageContext.Provider 
      value={{ 
        translations 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
