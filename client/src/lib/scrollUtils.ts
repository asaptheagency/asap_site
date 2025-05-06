/**
 * Enhanced utility for scrolling to a section by ID
 * - Handles page navigation with increased stability
 * - Supports fallback behavior
 * - Includes timeout and retry logic for async page loads
 * 
 * @param sectionId ID of the section to scroll to
 * @param options Additional options for scrolling
 */
export function scrollToSection(sectionId: string, options?: { 
  offset?: number, 
  behavior?: ScrollBehavior,
  maxAttempts?: number,
  delay?: number
}) {
  const defaultOptions = {
    offset: 80, // Default header height offset
    behavior: 'smooth' as ScrollBehavior,
    maxAttempts: 10,  // Maximum number of attempts to find the element
    delay: 100       // Delay between attempts in milliseconds
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  // Helper function to perform the actual scrolling
  const performScroll = (element: HTMLElement) => {
    // Get section's position from the top of the page
    const sectionTop = element.getBoundingClientRect().top + window.pageYOffset;
    
    // Apply offset (e.g., for fixed header)
    const offsetPosition = sectionTop - mergedOptions.offset;
    
    // Add enhanced debugging info
    console.log(`Services section found:`, !!element);
    console.log(`Services section offset:`, sectionTop);
    console.log(`Scrolling to position ${offsetPosition} (with ${mergedOptions.offset}px offset)`);
    
    // Scroll to the position
    window.scrollTo({
      top: offsetPosition,
      behavior: mergedOptions.behavior
    });
    
    return true;
  };
  
  // Try to find the element immediately
  const section = document.getElementById(sectionId);
  console.log(`Attempting to scroll to section: ${sectionId}`, !!section);
  
  if (section) {
    return performScroll(section);
  }
  
  // If we didn't find it, set up some retry logic
  let attempts = 0;
  
  const attemptScroll = () => {
    const section = document.getElementById(sectionId);
    if (section) {
      return performScroll(section);
    }
    
    attempts++;
    if (attempts < mergedOptions.maxAttempts) {
      console.log(`Attempt ${attempts}: Section "${sectionId}" not found yet, retrying...`);
      setTimeout(attemptScroll, mergedOptions.delay);
    } else {
      console.log(`Failed to find section "${sectionId}" after ${attempts} attempts`);
      return false;
    }
  };
  
  // Start the retry process
  setTimeout(attemptScroll, mergedOptions.delay);
  
  // Return false initially, the actual result will come from the retry logic
  return false;
}