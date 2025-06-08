import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string | any; // Allow imported image objects as well as string URLs
  fallbackSrc: string | any; // Allow imported image objects as well as string URLs
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  style = {}
}) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    console.log(`Image failed to load: ${src}, trying fallback`);
    setError(true);
  };

  return (
    <img 
      src={error ? fallbackSrc : src}
      alt={alt}
      className={className}
      style={style}
      onError={handleError}
    />
  );
};

export default ImageWithFallback;