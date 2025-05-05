import { useLocation } from "wouter";
import { useEffect } from "react";

export function useNavigation() {
  const [, navigate] = useLocation();
  
  const navigateTo = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };
  
  // Listen for route changes and scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]); 
  
  return { navigateTo };
}