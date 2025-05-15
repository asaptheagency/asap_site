/**
 * Configuration settings for the ASAP website
 */

// The default Google Maps URL for the ASAP Agency review generators
// This URL is ONLY used for review generators on the ASAP website itself
// When the review generator is embedded for clients via iframe, this URL is ignored
// and only the client-specific URL from the URL parameters is used
export const DEFAULT_ASAP_GOOGLE_MAPS_URL = "https://g.co/kgs/fdvVJCy";
// ⚠️ TODO: Replace the above URL with your actual ASAP Google Maps review URL
// Example: https://www.google.com/maps/place/ASAP+Agency/...

// Rate limiting configuration for review generators
export const RATE_LIMITING = {
  MAX_REQUESTS_PER_HOUR: 20,
  COOLDOWN_SECONDS: 5
};