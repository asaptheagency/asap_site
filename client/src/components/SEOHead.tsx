import React, { useEffect } from 'react';
import { useLocation } from 'wouter';

interface SEOHeadProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  type?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  imageUrl = '/android-chrome-512x512.png',
  type = 'website'
}) => {
  const [location] = useLocation();
  const siteName = 'A.S.A.P. THE AGENCY';
  const defaultTitle = 'A.S.A.P. THE AGENCY - Digital Solutions & Automation';
  const defaultDescription = 'A.S.A.P. THE AGENCY provides digital solutions, automation, web design, app development, and targeted marketing services to help your business thrive.';
  
  const pageTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const pageDescription = description || defaultDescription;
  const canonicalUrl = `https://asaptheagency.com${location}`;

  useEffect(() => {
    // Update the document title
    document.title = pageTitle;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescription);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', pageDescription);
      document.head.appendChild(metaDescription);
    }
    
    // Update Open Graph and Twitter meta tags
    updateMetaTag('og:title', pageTitle);
    updateMetaTag('og:description', pageDescription);
    updateMetaTag('og:image', imageUrl);
    updateMetaTag('og:url', canonicalUrl);
    updateMetaTag('og:type', type);
    updateMetaTag('og:site_name', siteName);
    
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', pageTitle);
    updateMetaTag('twitter:description', pageDescription);
    updateMetaTag('twitter:image', imageUrl);
    
    // Update canonical URL
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) {
      canonicalTag.setAttribute('href', canonicalUrl);
    } else {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      canonicalTag.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonicalTag);
    }
    
    // Add JSON-LD structured data
    addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteName,
      url: 'https://asaptheagency.com',
      logo: 'https://asaptheagency.com/android-chrome-512x512.png',
      description: defaultDescription,
      sameAs: [
        'https://twitter.com/asaptheagency',
        'https://www.facebook.com/asaptheagency',
        'https://www.linkedin.com/company/asaptheagency',
        'https://www.instagram.com/asaptheagency'
      ]
    });
    
    return () => {
      // Clean up structured data on component unmount
      const existingScript = document.getElementById('structured-data');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [pageTitle, pageDescription, canonicalUrl, imageUrl, type]);
  
  const updateMetaTag = (property: string, content: string) => {
    let metaTag = document.querySelector(`meta[property="${property}"]`) || 
                  document.querySelector(`meta[name="${property}"]`);
    
    if (metaTag) {
      metaTag.setAttribute('content', content);
    } else {
      metaTag = document.createElement('meta');
      if (property.startsWith('og:')) {
        metaTag.setAttribute('property', property);
      } else {
        metaTag.setAttribute('name', property);
      }
      metaTag.setAttribute('content', content);
      document.head.appendChild(metaTag);
    }
  };
  
  const addStructuredData = (data: any) => {
    let script = document.getElementById('structured-data');
    
    if (script) {
      script.innerHTML = JSON.stringify(data);
    } else {
      script = document.createElement('script');
      script.id = 'structured-data';
      script.setAttribute('type', 'application/ld+json');
      script.innerHTML = JSON.stringify(data);
      document.head.appendChild(script);
    }
  };
  
  return null; // This component doesn't render anything
};

export default SEOHead;