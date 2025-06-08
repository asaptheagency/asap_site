import { Switch, Route, useLocation, useRoute } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import { LanguageProvider } from "./context/LanguageContext";
import { useEffect, lazy, Suspense, useState } from "react";
import { HomeSkeleton, ServicePageSkeleton, PageSkeleton } from "./components/SkeletonLoaders";
import PageTransition from "./components/PageTransition";
import Header from "./components/Header";
import Footer from "./components/Footer";

// New automation service pages
const Rise = lazy(() => import("./pages/services/Rise"));
const SalesDrive = lazy(() => import("./pages/services/SalesDrive"));
const FollowUp = lazy(() => import("./pages/services/FollowUp"));
const FrontDesk = lazy(() => import("./pages/services/FrontDesk"));

// COMMENTED OUT - Legacy service pages
// const WebDesign = lazy(() => import("./pages/services/WebDesign"));
// const AutoMate = lazy(() => import("./pages/services/AutoMate"));
// const BotSpot = lazy(() => import("./pages/services/BotSpot"));
// const AppSnap = lazy(() => import("./pages/services/AppSnap"));
// const HypeRise = lazy(() => import("./pages/services/HypeRise"));
// const ReviewGenerators = lazy(() => import("./pages/services/ReviewGenerators"));
// const ReviewGeneratorsSimple = lazy(() => import("./pages/services/ReviewGeneratorsSimple"));
// const TestPage = lazy(() => import("./pages/services/TestPage"));
const ReviewLaunch = lazy(() => import("./pages/ReviewLaunch"));

// Hidden review generator pages
const ReviewGenerator = lazy(() => import("./pages/ReviewGenerator"));
const EmbeddableReviewGenerator = lazy(() => import("./pages/EmbeddableReviewGenerator"));
const ClientKeyReviewGenerator = lazy(() => import("./pages/ClientKeyReviewGenerator"));
const ClientIframeReviewGenerator = lazy(() => import("./pages/ClientIframeReviewGenerator"));
const ProductionReviewGenerator = lazy(() => import("./pages/ProductionReviewGenerator"));
const SimpleReviewGenerator = lazy(() => import("./pages/SimpleReviewGenerator"));
const AdvancedReviewGenerator = lazy(() => import("./pages/AdvancedReviewGenerator"));

// Industry pages
const LawFirms = lazy(() => import("./pages/industries/LawFirms"));
const PdrShops = lazy(() => import("./pages/industries/PdrShops"));
const Contractors = lazy(() => import("./pages/industries/Contractors"));

// Preload the ReviewGeneratorsSimple component to avoid 404 flash
import("./pages/services/ReviewGeneratorsSimple");

// Handle scrolling to top on route changes
function RouteChangeListener() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('Route changed, scrolling to top');
  }, [location]);
  
  return null;
}

// Custom loading handler that selects appropriate skeleton based on route
function LoadingHandler() {
  const [location] = useLocation();
  const isHomePage = useRoute("/")[0];
  const isServicePage = location.includes("/services/");
  const isReviewGenerator = location.includes("/review-generator") || location.includes("/embed/review-generator");
  
  if (isHomePage) {
    return <HomeSkeleton />;
  } else if (isServicePage) {
    return <ServicePageSkeleton />;
  } else if (isReviewGenerator) {
    // Review generator pages don't show header/footer, so use a simple skeleton
    return <PageSkeleton />;
  } else {
    return <PageSkeleton />;
  }
}

// Layout with header and footer
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

function Router() {
  const [location] = useLocation();
  const isSpecialPage = location.includes("/review-generator") || 
                        location.includes("/embed/review-generator") ||
                        location.includes("/client-key-review-generator") ||
                        location.includes("/client-iframe-review-generator") ||
                        location.includes("/services/review-generators") ||
                        location.includes("/review-launch");
  
  return (
    <Suspense fallback={<LoadingHandler />}>
      <RouteChangeListener />
      <PageTransition>
        {/* Apply the main layout conditionally */}
        {isSpecialPage ? (
          <Switch>
            {/* Standard version (simple embed) */}
            <Route path="/embed/review-generator" component={SimpleReviewGenerator} />
            <Route path="/client-iframe-review-generator" component={SimpleReviewGenerator} />
            <Route path="/client/review-generator" component={SimpleReviewGenerator} />
            
            {/* Premium version with customization options */}
            <Route path="/review-generator" component={AdvancedReviewGenerator} />
            <Route path="/client-key-review-generator" component={AdvancedReviewGenerator} />
            {/* <Route path="/services/review-generators" component={ReviewGeneratorsSimple} /> */}
            <Route path="/review-launch" component={ReviewLaunch} />
            
            {/* Industry pages */}
            <Route path="/industries/law-firms" component={LawFirms} />
            <Route path="/industries/pdr-shops" component={PdrShops} />
            <Route path="/industries/contractors" component={Contractors} />
          </Switch>
        ) : (
          <MainLayout>
            <Switch>
              <Route path="/" component={Home} />
              
              {/* New automation service routes */}
              <Route path="/services/rise" component={Rise} />
              <Route path="/services/sales-drive" component={SalesDrive} />
              <Route path="/services/outreach-pro" component={FollowUp} />
              <Route path="/services/front-desk" component={FrontDesk} />

              {/* COMMENTED OUT - Legacy service routes */}
              {/* <Route path="/services/web-design" component={WebDesign} /> */}
              {/* <Route path="/services/automate" component={AutoMate} /> */}
              {/* <Route path="/services/botspot" component={BotSpot} /> */}
              {/* <Route path="/services/appsnap" component={AppSnap} /> */}
              {/* <Route path="/services/hyperise" component={HypeRise} /> */}
              {/* <Route path="/services/test" component={TestPage} /> */}

              {/* Industry pages also available in main layout */}
              <Route path="/industries/law-firms" component={LawFirms} />
              <Route path="/industries/pdr-shops" component={PdrShops} />
              <Route path="/industries/contractors" component={Contractors} />
              
              <Route component={NotFound} />
            </Switch>
          </MainLayout>
        )}
      </PageTransition>
    </Suspense>
  );
}

function App() {
  useEffect(() => {
    // Cursor glow effect with trailing effect
    let lastMove = 0;
    let lastX = 0;
    let lastY = 0;
    let trailTimeout: number | null = null;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Only enable cursor effect on desktop (lg and above)
      if (window.innerWidth < 1024) return;
      
      const now = Date.now();
      // Throttle updates to every 5ms for more responsive glow
      if (now - lastMove < 5) return;
      
      const currentX = e.clientX;
      const currentY = e.clientY;
      
      // Calculate angle for the trail based on movement direction
      if (lastX !== 0 && lastY !== 0) {
        const deltaX = currentX - lastX;
        const deltaY = currentY - lastY;
        
        if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
          const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
          document.body.style.setProperty('--cursor-angle', `${angle + 90}deg`);
        }
      }
      
      // Main cursor glow
      document.body.classList.add('has-cursor-glow');
      document.body.style.setProperty('--cursor-x', `${currentX}px`);
      document.body.style.setProperty('--cursor-y', `${currentY}px`);
      
      // Set trail position with a delay
      if (trailTimeout) clearTimeout(trailTimeout);
      trailTimeout = window.setTimeout(() => {
        document.body.style.setProperty('--cursor-trail-x', `${currentX}px`);
        document.body.style.setProperty('--cursor-trail-y', `${currentY}px`);
      }, 120); // Increased delay for more noticeable trail effect
      
      // Create larger glow effect when hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' ||
        target.closest('.card-glow-effect') !== null ||
        target.classList.contains('glow-hover');
      
      if (isInteractive) {
        document.body.classList.add('enhanced-glow');
      } else {
        document.body.classList.remove('enhanced-glow');
      }
      
      // Store current position for next calculation
      lastX = currentX;
      lastY = currentY;
      lastMove = now;
    };

    // Add scroll-to-top button
    const createScrollToTopButton = () => {
      const button = document.createElement('button');
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>';
      button.className = 'scroll-to-top';
      button.setAttribute('aria-label', 'Scroll to top');
      button.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.appendChild(button);

      // Show button only when scrolled down
      const toggleButtonVisibility = () => {
        if (window.scrollY > 500) {
          button.classList.add('visible');
        } else {
          button.classList.remove('visible');
        }
      };

      window.addEventListener('scroll', toggleButtonVisibility);
      toggleButtonVisibility(); // Initial check
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    createScrollToTopButton();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      const scrollButton = document.querySelector('.scroll-to-top');
      if (scrollButton) {
        document.body.removeChild(scrollButton);
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router />
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
