/**
 * Backend utility functions
 */

// Fallback function to generate a review when API fails
export function generateFallbackReview(businessName: string, businessType: string, location: string = "your area"): string {
  const reviews = [
    `I recently visited ${businessName} and had an amazing experience! The team was professional, friendly, and made me feel valued as a customer. I highly recommend their services to anyone in ${location} looking for quality ${businessType}.`,
    
    `${businessName} exceeded all my expectations! Their attention to detail and commitment to customer satisfaction really sets them apart from other ${businessType} providers. I've been telling all my friends about my great experience.`,
    
    `I can't say enough good things about ${businessName}. From start to finish, the experience was exceptional. The staff was knowledgeable and friendly, making the whole process incredibly smooth. Definitely giving them 5 stars!`,
    
    `If you're looking for top-notch ${businessType} services, look no further than ${businessName}. Their team is professional, efficient, and truly cares about delivering quality results. I'm so glad I found them!`,
    
    `What a fantastic experience with ${businessName}! The level of professionalism and service quality was outstanding. I'll definitely be using their services again and recommending them to everyone in ${location}.`
  ];
  
  // Randomly select one of the fallback reviews
  return reviews[Math.floor(Math.random() * reviews.length)];
}