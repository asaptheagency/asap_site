import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
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
            <Link href="/">
              <a className="px-4 py-2 bg-accent hover:bg-accent/90 rounded text-center transition-colors">
                Home Page
              </a>
            </Link>
            <Link href="/services/web-design">
              <a className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-center transition-colors">
                Web Design
              </a>
            </Link>
            <Link href="/services/automate">
              <a className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-center transition-colors">
                AutoMate
              </a>
            </Link>
            <Link href="/services/botspot">
              <a className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-center transition-colors">
                BotSpot
              </a>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
