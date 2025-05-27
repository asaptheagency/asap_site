import React from "react";
import { motion } from "framer-motion";
import { fadeIn, slideFromLeft, slideFromRight } from "../lib/animations";
import { Button } from "../components/ui/button";
import SEOHead from "../components/SEOHead";
import FloatingElements from "../components/FloatingElements";
import { Check, Star, Users, Clock, Shield } from "lucide-react";

const ReviewLaunch: React.FC = () => {
  const scrollToForm = () => {
    const formSection = document.getElementById('google-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWhatYoureGetting = () => {
    const whatYoureGettingSection = document.getElementById('what-youre-getting');
    if (whatYoureGettingSection) {
      whatYoureGettingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="Get More Google Reviews - Review Generator Launch Special"
        description="Turn your happy customers into 5-star reviewers with one smart tool. Quick setup. Real results. Limited time launch pricing."
      />
      
      <FloatingElements className="fixed inset-0 pointer-events-none" />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="show"
              className="space-y-8"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Get More Google Reviews —{" "}
                <span className="text-accent">Without Chasing Anyone.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Turn your happy customers into 5-star reviewers with one smart tool. Quick setup. Real results.
              </p>
              
              <Button 
                size="lg"
                onClick={scrollToWhatYoureGetting}
                className="bg-accent hover:bg-accent/90 text-black font-semibold px-8 py-4 text-lg rounded-lg"
              >
                Claim Your Launch Discount
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Why More Reviews = More Business Section */}
        <section className="py-20 px-4 bg-gray-950">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                More Reviews = More Business
              </h2>
              
              <p className="text-lg text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                Did you know that businesses who ask for reviews at the point of service see up to{" "}
                <span className="text-accent font-semibold">3x more responses</span>? (Source: GatherUp) That's why this tool exists. Customers are most likely to leave a review when the experience is still fresh — not hours later when they've forgotten. Our system helps you capture that moment and turn it into a public 5-star endorsement.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-4">
                  <div className="text-4xl font-bold text-accent">2.4x</div>
                  <p className="text-gray-300">More bookings for businesses with 50+ Google reviews compared to those with fewer</p>
                </div>
                
                <div className="space-y-4">
                  <div className="text-4xl font-bold text-accent">88%</div>
                  <p className="text-gray-300">Of consumers trust online reviews as much as personal recommendations</p>
                </div>
                
                <div className="space-y-4">
                  <div className="text-4xl font-bold text-accent">72%</div>
                  <p className="text-gray-300">Of customers won't take action until they've read reviews about your business</p>
                </div>
              </div>
              
              <p className="text-lg text-gray-300 mt-8 max-w-3xl mx-auto">
                Every 5-star review is working for you 24/7, convincing prospects to choose your business over competitors. More reviews means higher local search rankings, increased customer trust, and ultimately more revenue flowing through your doors.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Founder's Note */}
        <section className="py-16 px-4 bg-accent/5 backdrop-blur-sm">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Why We're Offering This as a Standalone Product
              </h2>
              
              <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                The Review Generator was originally developed as one part of our larger growth systems but we received consistent requests from business owners asking to access this tool by itself. For a limited time, you can get direct access to this tool exclusively without signing up for an ASAP automation or marketing package.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Offer Section */}
        <section id="what-youre-getting" className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                What You're Getting
              </h2>
              
              <div className="space-y-8 text-lg text-gray-300 max-w-4xl mx-auto">
                {/* Video Demo */}
                <div className="flex justify-center mb-8">
                  <div className="relative w-full max-w-3xl">
                    <iframe 
                      width="100%" 
                      height="400" 
                      src="https://www.youtube.com/embed/LX01ZCh3u_M?si=Fed_U7AE18bAK_qx&controls=0" 
                      title="Review Generator Demo" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                      className="rounded-lg shadow-2xl"
                    />
                  </div>
                </div>
                
                <p>
                  Both Review Generators automatically create authentic-sounding reviews, copy them to your customer's clipboard, and redirect the customer to your Google Maps profile making them just clicks away from leaving you that 5-star review on the spot. The Standard version uses a simple one-click button that instantly generates a review. The Premium version includes a smart form that customizes the review based on customer input, creating more personalized and varied feedback. Both are designed to get results fast — with no subscriptions, no fluff, and no hassle.
                </p>
              </div>
            </motion.div>

            {/* Urgency Block */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-center bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-8 mb-12"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                We don't usually sell this tool by itself. This offer exists because business owners have been asking for it — and because we believe in getting fast results. If you're seeing this page, it means the offer is still active. But once we hit our onboarding limit, this page comes down.
              </p>
            </motion.div>

            {/* Pricing Tiers */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                variants={slideFromLeft}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-accent/30 transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Standard</h3>
                  <div className="text-4xl font-bold text-accent">$500<span className="text-lg text-gray-400">/one time fee</span></div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span>Review Generator button that creates AI-generated review text</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span>Clipboard copy + Google Maps redirect</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span>Branding for one location</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span>Website integration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span>Strategy call to ensure you receive desired outcome</span>
                  </li>
                </ul>
                
                <div className="text-center">
                  <Button 
                    size="lg"
                    onClick={() => window.open('https://buy.stripe.com/8x27sK3IAdAn8M9ey00VO00', '_blank')}
                    className="bg-accent hover:bg-accent/90 text-black font-semibold px-8 py-3 rounded-lg w-1/2"
                  >
                    Get Standard Setup
                  </Button>
                </div>
              </motion.div>

              <motion.div
                variants={slideFromRight}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-accent/30 rounded-2xl p-8 relative hover:border-accent/50 transition-all duration-300"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-black px-4 py-1 rounded-full text-sm font-semibold">
                    MOST POPULAR
                  </span>
                </div>
                
                <div className="text-center mb-6 pt-4">
                  <h3 className="text-2xl font-bold mb-2">Premium</h3>
                  <div className="text-4xl font-bold text-accent">$1,000<span className="text-lg text-gray-400">/one time fee</span></div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span>Review Generator form that customizes review text based on customer input</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span>Clipboard copy + Google Maps redirect</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span>Multi-location branding (up to 3)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span>Website integration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span>Strategy call to ensure you receive desired outcome</span>
                  </li>
                </ul>
                
                <div className="text-center">
                  <Button 
                    size="lg"
                    onClick={() => window.open('https://buy.stripe.com/dRm9AS4MEfIv8M90Ha0VO01', '_blank')}
                    className="bg-accent hover:bg-accent/90 text-black font-semibold px-8 py-3 rounded-lg w-1/2"
                  >
                    Get Premium Setup
                  </Button>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <p className="text-gray-400 italic">
                These are one-time setup fees — no recurring charges.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-accent/5 backdrop-blur-sm">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Why This Tool Gets Results
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Star className="text-accent" size={32} />,
                  title: "Increases amount of consistent 5-star reviews"
                },
                {
                  icon: <Users className="text-accent" size={32} />,
                  title: "Removes the awkwardness of asking for reviews"
                },
                {
                  icon: <Clock className="text-accent" size={32} />,
                  title: "Makes leaving feedback quick, easy, and guided"
                },
                {
                  icon: <Shield className="text-accent" size={32} />,
                  title: "Helps you dominate your local reputation while you focus on doing great work"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center space-y-4"
                >
                  <div className="flex justify-center">{benefit.icon}</div>
                  <p className="text-gray-300">{benefit.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantee Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-center space-y-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Our Guarantee
              </h2>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                If you don't see a noticeable increase in reviews within 30 days of using this tool, we'll step in. Our team will work with you directly to fine-tune the system and make sure you're getting results — no extra charge, no runaround.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Google Form Section */}
        <section id="google-form" className="py-16 px-4 bg-accent/5 backdrop-blur-sm">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Have More Questions?
              </h2>
              <p className="text-lg text-gray-300">
                Fill out the form below and we'll get back to you
              </p>
            </motion.div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex justify-center">
                <iframe 
                  src="https://docs.google.com/forms/d/e/1FAIpQLScpmvDyux6dg6pEdSlFSFHm8nlZrJOIteFGG5hp7TqatsjfDA/viewform?embedded=true" 
                  width="100%" 
                  height="1400" 
                  frameBorder="0" 
                  marginHeight="0" 
                  marginWidth="0"
                  className="max-w-2xl rounded-lg"
                  style={{ maxWidth: '640px' }}
                >
                  Loading…
                </iframe>
              </div>
            </div>
          </div>
        </section>



        {/* Final CTA */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Let's Get You More Reviews
              </h2>
              
              <Button 
                size="lg"
                onClick={scrollToForm}
                className="bg-accent hover:bg-accent/90 text-black font-semibold px-8 py-4 text-lg rounded-lg"
              >
                Start Setup Now
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReviewLaunch;