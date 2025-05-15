# ASAP Agency Website

A modern digital agency website built with React, TypeScript, and Tailwind CSS. The site features cutting-edge UI/UX design elements, animated transitions between sections, and specialized tools like the Review Generators.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Review Generators](#review-generators)
  - [Implementation Guide](#implementation-guide)
  - [API Key Integration](#api-key-integration)
  - [Embed Code Examples](#embed-code-examples)
  - [URL Parameters](#url-parameters)
  - [Rate Limiting](#rate-limiting)
- [Deployment](#deployment)
- [Maintenance](#maintenance)

## Overview

This website is designed for ASAP Agency with a focus on modern aesthetics, including gradient backgrounds, hover effects, and smooth transitions between sections. The design emphasizes client choice between automation and marketing paths for business services.

## Technologies Used

- **Frontend**: React.js with TypeScript
- **Styling**: Tailwind CSS with custom transitions
- **Animations**: Framer Motion
- **State Management**: React hooks
- **Routing**: Wouter (lightweight router)
- **API Integration**: OpenAI API (gpt-4o model) for AI-powered Review Generators

## Key Features

- Responsive mobile-first design
- Glassomorphic header and card elements
- Custom cursor glow effect on hover
- Gradient transitions between sections
- Service pages for different offerings
- Review Generator tools (standard and premium versions)
- Custom iframe integration capabilities

## Project Structure

```
client/
├── src/
│   ├── assets/           # Static assets and images
│   ├── components/       # Reusable UI components
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components
│   │   ├── services/     # Service-specific pages
│   │   └── ...           # Other pages
│   └── styles/           # Global stylesheets
server/                   # Backend server setup
```

## Review Generators

The website includes AI-powered review generators that help businesses collect authentic testimonials from satisfied customers. These tools generate reviews based on business-specific information, copy them to the clipboard, and direct users to Google Maps to post the review.

### Implementation Guide

The Review Generator tool is available in two versions:

#### 1. Standard Version

The standard version is a streamlined one-click solution that generates a positive customer review using the OpenAI API, automatically copies the generated review to the clipboard, and opens the appropriate Google Maps page for posting.

**URL**: `/embed/review-generator`

This version:
- Focuses on customer satisfaction and overall experience without specific service details
- Generates natural-sounding reviews from the customer's perspective
- Uses the business details provided via URL parameters to customize the review
- Features a minimalist design focused on quick implementation
- Requires no user input beyond clicking the "Generate" button

It's perfect for embedding in websites, emails, or follow-up messages to customers to simplify the review process.

#### 2. Premium Version

The premium version offers enhanced customization and lets customers provide specific feedback about their experience. Like the standard version, it uses the OpenAI API to generate the review text, but creates more personalized reviews.

**URL**: `/review-generator`

This version allows customers to provide feedback that focuses on their overall satisfaction and experience with the business. The input form is simplified to capture the most relevant feedback while avoiding specific service details.

The generated reviews are authentic-sounding and focus on customer satisfaction rather than specific service details, maintaining a natural tone that's perfect for Google reviews.

### API Key Integration

Both versions of the Review Generator use OpenAI's GPT-4o model to generate high-quality, natural-sounding reviews. This integration can be handled in two ways:

#### Server-Side API Key Required

Both the Standard and Premium versions require an OpenAI API key to function:

1. Obtain an API key from [OpenAI](https://platform.openai.com/api-keys)
2. Set this API key in your server's environment variables as `OPENAI_API_KEY`
3. The server's `/api/openai/generate-review` endpoint will use this key to handle all review generation requests

If no API key is provided, the review generators will not function. The key is never exposed to clients and is only used for the specific API calls when generating reviews.

#### Client-Side API Key Integration

The client-side version is specifically designed to let ASAP Agency implement review generators for clients using each client's own OpenAI API key:

1. Use the `ClientIframeReviewGenerator` component available at `/client/review-generator`
2. Each client's API key must be passed via the `apiKey` URL parameter
3. API calls are made directly from the client browser to the OpenAI API
4. Includes built-in rate limiting (20 requests per hour, 5-second cooldown)
5. Features error handling for invalid or expired API keys

**Important**: This implementation requires an API key to function. The review generator will not work without a valid OpenAI API key provided through the URL parameter.

```html
<iframe src="https://yourdomain.com/embed/review-generator?apiKey=YOUR_API_KEY&businessName=Business Name..."></iframe>
```

When using this approach, your clients do not see or interact with the API key, but the calls are made using this key.

### Embed Code Examples

#### 1. Standard Review Generator:

```html
<iframe 
  src="https://yourdomain.com/embed/review-generator?businessName=Business Name&businessType=Business Type&googleMapsUrl=https://maps.google.com/..." 
  width="100%" 
  height="600" 
  frameborder="0">
</iframe>
```

#### 2. Premium Version:

```html
<iframe 
  src="https://yourdomain.com/review-generator?businessName=Business Name&businessType=Business Type&googleMapsUrl=https://maps.google.com/..." 
  width="100%" 
  height="600" 
  frameborder="0">
</iframe>
```

#### Option to Specify API Key in the URL:

For either version, you can include your API key in the URL parameters:

```html
<iframe 
  src="https://yourdomain.com/embed/review-generator?apiKey=YOUR_API_KEY&businessName=Business Name&businessType=Business Type&googleMapsUrl=https://maps.google.com/..." 
  width="100%" 
  height="600" 
  frameborder="0">
</iframe>
```

### URL Parameters

All review generator versions accept the following parameters:

| Parameter | Description | Example |
|-----------|-------------|---------|
| businessName | The name of the business | `businessName=ASAP Agency` |
| businessType | Type of business | `businessType=Digital Marketing Agency` |
| services | Comma-separated list of services | `services=web design,app development,marketing` |
| highlights | Comma-separated list of business highlights | `highlights=responsive team,amazing results` |
| googleMapsUrl | The Google Maps URL for the business | `googleMapsUrl=https://goo.gl/maps/example` |

Additionally, when using the option to specify an API key in the URL:

| Parameter | Description | Example |
|-----------|-------------|---------|
| apiKey | Your OpenAI API key | `apiKey=sk-yourapikey...` |

### Rate Limiting

The review generators include rate limiting to prevent abuse:

- Both versions include:
  - 5-second cooldown between requests
  - 20 requests per hour per browser (tracked in localStorage)
  
These limits help protect against potential API abuse while still providing ample usage for legitimate purposes.

## Deployment

The website is deployed on Netlify with continuous integration from the GitHub repository. The deployment process automatically handles:

1. Building the React application
2. Optimizing assets
3. Deploying to the Netlify CDN

## Maintenance

### Adding New Services

To add a new service page:

1. Create a new component in `client/src/pages/services/`
2. Import and add the route in `client/src/App.tsx`
3. Add the service to the Services component in `client/src/components/Services.tsx`

### Updating Content

Most content can be updated through the respective component files. Major sections include:

- Homepage content: `client/src/pages/Home.tsx`
- Header/navigation: `client/src/components/Header.tsx`
- Services listing: `client/src/components/Services.tsx`
- Footer: `client/src/components/Footer.tsx`

### Managing Review Generators

If you need to modify the review generators:

- Standard version: `client/src/pages/EmbeddableReviewGenerator.tsx`
- Premium version: `client/src/pages/ReviewGenerator.tsx`
- API Key URL parameter functionality: `client/src/pages/ClientIframeReviewGenerator.tsx`

## Support

For additional help or questions about implementing the review generators for clients, please contact ASAP Agency support.