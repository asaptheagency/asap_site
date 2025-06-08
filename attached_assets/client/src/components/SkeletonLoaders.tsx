import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const PageSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header Skeleton */}
      <header className="fixed w-full z-50 backdrop-blur-md bg-black/30">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          <Skeleton className="h-8 w-32" />
          <div className="hidden md:flex items-center space-x-8">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </header>
      
      {/* Hero Section Skeleton */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 z-10 text-center pt-16">
          <Skeleton className="h-16 w-3/4 mx-auto mb-8" />
          <Skeleton className="h-8 w-2/4 mx-auto mb-6" />
          <Skeleton className="h-12 w-48 mx-auto" />
        </div>
      </section>
      
      {/* Main Content Skeleton */}
      <main className="flex-grow relative">
        <div className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            {/* First Section */}
            <section className="py-10 bg-gray-900/40 rounded-lg mb-10 relative z-10">
              <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                  <Skeleton className="h-10 w-2/4 mx-auto mb-4" />
                  <Skeleton className="h-6 w-1/3 mx-auto" />
                </div>
                
                <div className="relative z-10">
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                  
                  <div className="mt-8 space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                  
                  <div className="flex justify-center mt-8">
                    <Skeleton className="h-12 w-48" />
                  </div>
                </div>
              </div>
            </section>
            
            {/* Grid Section */}
            <section className="py-10 bg-gray-900/30 rounded-lg mb-10 relative z-10">
              <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                  <Skeleton className="h-10 w-2/4 mx-auto mb-4" />
                  <Skeleton className="h-6 w-1/3 mx-auto" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-lg border border-gray-800">
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                  
                  <div className="p-6 rounded-lg border border-gray-800">
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                  
                  <div className="p-6 rounded-lg border border-gray-800">
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                  
                  <div className="p-6 rounded-lg border border-gray-800">
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </div>
                
                <div className="flex justify-center mt-8">
                  <Skeleton className="h-12 w-48" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      {/* Footer Skeleton */}
      <footer className="bg-gray-950 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Skeleton className="h-10 w-32 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            
            <div>
              <Skeleton className="h-6 w-24 mb-4" />
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-4 w-28 mb-2" />
              <Skeleton className="h-4 w-20" />
            </div>
            
            <div>
              <Skeleton className="h-6 w-24 mb-4" />
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-4 w-28 mb-2" />
              <Skeleton className="h-4 w-20" />
            </div>
            
            <div>
              <Skeleton className="h-6 w-28 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-8 w-32 mt-4" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const HomeSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header Skeleton */}
      <header className="fixed w-full z-50 backdrop-blur-md bg-black/30">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          <Skeleton className="h-8 w-32" />
          <div className="hidden md:flex items-center space-x-8">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </header>
      
      {/* Hero Section Skeleton */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 z-10 text-center mt-16">
          <Skeleton className="h-24 w-3/4 mx-auto mb-8" />
          <Skeleton className="h-8 w-2/3 mx-auto mb-4" />
          <Skeleton className="h-8 w-1/2 mx-auto mb-8" />
          <Skeleton className="h-12 w-48 mx-auto" />
        </div>
      </section>
      
      {/* Main Content Skeleton */}
      <main className="flex-grow relative">
        {/* Problem Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2">
                <Skeleton className="h-12 w-3/4 mb-6" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Service Grid Section */}
        <section className="py-20 relative bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <Skeleton className="h-12 w-1/2 mx-auto mb-4" />
              <Skeleton className="h-6 w-1/3 mx-auto mb-12" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-900/40 p-6 rounded-lg border border-gray-800">
                  <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-6" />
                  <Skeleton className="h-10 w-32" />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 text-center">
            <Skeleton className="h-12 w-2/3 mx-auto mb-6" />
            <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
            <Skeleton className="h-12 w-48 mx-auto" />
          </div>
        </section>
      </main>
      
      {/* Footer Skeleton */}
      <footer className="bg-gray-950 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Skeleton className="h-10 w-32 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            
            <div>
              <Skeleton className="h-6 w-24 mb-4" />
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-4 w-28 mb-2" />
              <Skeleton className="h-4 w-20" />
            </div>
            
            <div>
              <Skeleton className="h-6 w-24 mb-4" />
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-4 w-28 mb-2" />
              <Skeleton className="h-4 w-20" />
            </div>
            
            <div>
              <Skeleton className="h-6 w-28 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-8 w-32 mt-4" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const ServicePageSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header Skeleton */}
      <header className="fixed w-full z-50 backdrop-blur-md bg-black/30">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          <Skeleton className="h-8 w-32" />
          <div className="hidden md:flex items-center space-x-8">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </header>
      
      {/* Hero Section Skeleton */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-16 bg-gray-950">
        <div className="absolute inset-0 overflow-hidden">
          <Skeleton className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <Skeleton className="h-16 w-1/2 mx-auto mb-4" />
          <Skeleton className="h-8 w-1/3 mx-auto" />
        </div>
      </section>
      
      {/* Content Section */}
      <main className="relative flex-grow">
        <div className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            {/* First Section */}
            <section className="py-16 bg-gray-900/40 rounded-lg mb-10 relative z-10 border border-gray-800">
              <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                  <Skeleton className="h-10 w-2/3 mx-auto mb-4" />
                  <Skeleton className="h-6 w-1/2 mx-auto" />
                </div>
                
                <div className="relative z-10">
                  <div className="prose prose-lg max-w-none">
                    <Skeleton className="h-4 w-full mb-3" />
                    <Skeleton className="h-4 w-full mb-3" />
                    <Skeleton className="h-4 w-5/6 mb-3" />
                    <Skeleton className="h-4 w-full mb-3" />
                    <Skeleton className="h-4 w-4/5 mb-8" />
                    
                    <Skeleton className="h-4 w-full mb-3" />
                    <Skeleton className="h-4 w-full mb-3" />
                    <Skeleton className="h-4 w-5/6 mb-8" />
                    
                    <div className="mt-6 space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                    
                    <Skeleton className="h-4 w-full mt-8 mb-3" />
                    <Skeleton className="h-4 w-full mb-3" />
                    <Skeleton className="h-4 w-5/6 mb-3" />
                    <Skeleton className="h-4 w-full mb-8" />
                    
                    <Skeleton className="h-5 w-5/6 mt-6" />
                  </div>
                  
                  <div className="flex justify-center mt-8">
                    <Skeleton className="h-12 w-48" />
                  </div>
                </div>
              </div>
            </section>
            
            {/* Second Section */}
            <section className="py-16 bg-gray-900/30 rounded-lg mb-10 relative z-10 border border-gray-800">
              <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                  <Skeleton className="h-10 w-2/3 mx-auto mb-4" />
                  <Skeleton className="h-6 w-1/2 mx-auto" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-950/60 p-6 rounded-lg border border-gray-800">
                      <Skeleton className="h-8 w-3/4 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-8">
                  <Skeleton className="h-12 w-48" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      {/* Footer Skeleton */}
      <footer className="bg-gray-950 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Skeleton className="h-10 w-32 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            
            <div>
              <Skeleton className="h-6 w-24 mb-4" />
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-4 w-28 mb-2" />
              <Skeleton className="h-4 w-20" />
            </div>
            
            <div>
              <Skeleton className="h-6 w-24 mb-4" />
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-4 w-28 mb-2" />
              <Skeleton className="h-4 w-20" />
            </div>
            
            <div>
              <Skeleton className="h-6 w-28 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-8 w-32 mt-4" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};