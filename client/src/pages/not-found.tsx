import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [location] = useLocation();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Check if this is a special route that might be lazy loading
  useEffect(() => {
    // Special routes we know will load but might take time
    const specialRoutes = ['/services/review-generators'];
    
    const isSpecialRoute = specialRoutes.some(route => location.includes(route));
    
    if (isSpecialRoute) {
      setIsRedirecting(true);
      
      // Force a re-navigation after a small delay to allow component to load
      const timeout = setTimeout(() => {
        window.location.href = location;
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [location]);

  // Show a loading state for special routes
  if (isRedirecting) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-black">
        <Card className="w-full max-w-md mx-4 bg-gray-800/70 text-white border border-gray-700/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2 items-center">
              <Loader2 className="h-6 w-6 text-teal-500 animate-spin" />
              <h1 className="text-2xl font-bold">Loading Page</h1>
            </div>

            <p className="mt-4 text-sm text-gray-300 mb-6">
              Please wait while the page loads...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Standard 404 for actual not found pages
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900">
      <Card className="w-full max-w-md mx-4 bg-gray-800 text-white border-gray-700">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-300 mb-6">
            The page you are looking for doesn't exist. Try one of these links:
          </p>
          
          <div className="flex flex-col gap-3 mb-6">
            <Link href="/" className="px-4 py-2 bg-accent hover:bg-accent/90 rounded text-center transition-colors">
              Home Page
            </Link>
            <Link href="/services/web-design" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-center transition-colors">
              Web Design
            </Link>
            <Link href="/services/automate" className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-center transition-colors">
              AutoMate
            </Link>
            <Link href="/services/botspot" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-center transition-colors">
              BotSpot
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
