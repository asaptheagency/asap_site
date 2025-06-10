import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Clock,
  Users,
  TrendingUp,
  MessageSquare,
  Calendar,
} from "lucide-react";
import {
  fadeIn,
  slideFromBottom,
  staggerContainer,
  staggerFadeIn,
} from "../lib/animations";
import FloatingElements from "../components/FloatingElements";
import SimpleParallax from "../components/SimpleParallax";
import ImageWithFallback from "../components/ImageWithFallback";
import { scrollToSection } from "../lib/scrollUtils";
import siteSupportImage from "../assets/chat_siteSupport_new.webp";

const ChatLaunch: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 47,
    minutes: 59,
    seconds: 59,
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-hidden">
      {/* Floating background elements */}
      <FloatingElements />

      {/* Dots pattern background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(75,184,166,0.3)_1px,_transparent_0)] bg-[length:40px_40px]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>

        <motion.div
          className="container mx-auto px-4 relative z-10 text-center max-w-6xl"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Flash Sale Badge */}
          <motion.div className="inline-block mb-6" variants={fadeIn}>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
              🔥 FLASH SALE - LAUNCHING SOPHIE NOW 🔥
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            variants={slideFromBottom}
          >
            <span className="bg-gradient-to-r from-white via-teal-400 to-orange-500 bg-clip-text text-transparent">
              ⚖️ AI Messaging for Law Firms ⚖️
            </span>
            <br />
            <span className="text-teal-400">
              First Impressions That Convert!
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
            variants={slideFromBottom}
          >
            Introducing ASAP Chat – powered by{" "}
            <strong className="text-teal-400">Sophie</strong>, your 24/7 AI
            legal assistant that handles DMs, qualifies leads, and makes your
            firm look elite and responsive
          </motion.p>

          {/* Countdown Timer */}
          <motion.div className="mb-8" variants={fadeIn}>
            <div className="text-center mb-4">
              <p className="text-orange-400 font-semibold text-lg">
                FLASH SALE ENDS IN:
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div
                  key={unit}
                  className="bg-gray-900 border border-teal-500/30 rounded-lg p-4 min-w-[80px]"
                >
                  <div className="text-2xl md:text-3xl font-bold text-teal-400">
                    {value.toString().padStart(2, "0")}
                  </div>
                  <div className="text-xs uppercase text-gray-400">{unit}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pricing */}
          <motion.div className="mb-8" variants={fadeIn}>
            <div className="text-center">
              <p className="text-gray-400 text-lg mb-4">Choose Your Bundle:</p>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-lg border border-blue-400/30">
                  {/* <p className="text-gray-400 line-through text-lg">
                    Regular: $1,198 setup
                  </p> */}
                  <p className="text-3xl font-bold text-teal-400 mb-2">
                    Engagement Bundle
                  </p>
                  <p className="text-orange-400 font-semibold text-sm">
                    DM Dispatch + Site Support
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 p-6 rounded-lg border border-green-400/30">
                  {/* <p className="text-gray-400 line-through text-lg">
                    Regular: $1,498 setup
                  </p> */}
                  <p className="text-3xl font-bold text-teal-400 mb-2">
                    Lead Conversion
                  </p>
                  <p className="text-orange-400 font-semibold text-sm">
                    DM Dispatch + LeadLink
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div className="mb-8" variants={slideFromBottom}>
            <button
              onClick={() => {
                const element = document.getElementById("pricing-section");
                if (element) {
                  const elementPosition =
                    element.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition =
                    elementPosition - 100; // Add some top padding
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              }}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-6 px-12 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-500/25"
            >
              CLAIM YOUR FLASH SALE PRICING
            </button>
            <p className="text-sm text-gray-400 mt-3">
              ⚡ Limited to the First 10 Firms - Act Fast
            </p>
          </motion.div>

          {/* Social Proof */}
          <motion.div className="text-center" variants={fadeIn}>
            <p className="text-gray-400 mb-4">
              Trusted by law firms to capture leads and convert prospects
            </p>
            <div className="flex justify-center items-center space-x-8 text-teal-400">
              <div className="flex items-center space-x-2">
                <MessageSquare size={20} />
                <span>24/7 Response Time</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={20} />
                <span>Instant Lead Qualification</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp size={20} />
                <span>Elite Positioning</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-8 text-red-400"
              variants={slideFromBottom}
            >
              Your Prospects Are Bouncing Before You Can Respond
            </motion.h2>

            <motion.div
              className="grid md:grid-cols-3 gap-8 mb-12"
              variants={staggerFadeIn}
            >
              <div className="bg-gray-900/50 border border-red-500/30 rounded-lg p-6">
                <div className="text-3xl font-bold text-red-400 mb-2">73%</div>
                <p className="text-gray-300">
                  of website visitors leave without making contact
                </p>
              </div>
              <div className="bg-gray-900/50 border border-red-500/30 rounded-lg p-6">
                <div className="text-3xl font-bold text-red-400 mb-2">
                  5 min
                </div>
                <p className="text-gray-300">
                  average wait time before prospects move to next firm
                </p>
              </div>
              <div className="bg-gray-900/50 border border-red-500/30 rounded-lg p-6">
                <div className="text-3xl font-bold text-red-400 mb-2">85%</div>
                <p className="text-gray-300">
                  of DMs and messages never get responded to promptly
                </p>
              </div>
            </motion.div>

            <motion.p
              className="text-xl text-gray-300 leading-relaxed"
              variants={slideFromBottom}
            >
              Right now, prospective clients are DM'ing your social media and
              landing on your website expecting answers—fast. If they don't get
              a real response?{" "}
              <strong className="text-red-400">
                They bounce… and call the next firm.
              </strong>{" "}
              Every missed message is a missed case that could have been worth
              thousands.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 relative bg-gradient-to-b from-gray-900/30 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={slideFromBottom}>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-orange-500 bg-clip-text text-transparent">
                  Meet Sophie: Your 24/7 AI Legal Assistant
                </h2>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Sophie handles your website inquiries, responds to social
                  media DMs with human-like AI, and qualifies leads
                  automatically. She makes your firm look elite, responsive, and
                  modern while you focus on practicing law.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Answers client questions instantly on your website",
                    "Handles direct messages with human-like AI responses",
                    "Qualifies leads and forwards serious cases to your team",
                    "Makes your firm look tech-forward and always available",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check
                        className="text-teal-400 mt-1 flex-shrink-0"
                        size={20}
                      />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div className="relative" variants={fadeIn}>
                <div className="relative z-10">
                  <ImageWithFallback
                    src={siteSupportImage}
                    fallbackSrc="/robot_placeholder.webp"
                    alt="ASAP Chat Sophie AI Assistant"
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/20 to-orange-500/20 rounded-lg blur-xl -z-10"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-12 text-teal-400"
              variants={slideFromBottom}
            >
              Why Law Firms Need Sophie
            </motion.h2>

            <motion.div
              className="grid md:grid-cols-2 gap-8"
              variants={staggerFadeIn}
            >
              <div className="bg-gradient-to-b from-gray-900/80 to-gray-800/80 border border-teal-500/30 rounded-lg p-8 hover:border-teal-500/50 transition-all duration-300">
                <div className="text-2xl font-bold text-teal-400 mb-4">
                  ✅ Never misses a lead
                </div>
                <p className="text-gray-300 text-lg">
                  Sophie captures interest before a prospect clicks away.
                </p>
              </div>

              <div className="bg-gradient-to-b from-gray-900/80 to-gray-800/80 border border-orange-500/30 rounded-lg p-8 hover:border-orange-500/50 transition-all duration-300">
                <div className="text-2xl font-bold text-orange-400 mb-4">
                  ✅ Tech-forward positioning
                </div>
                <p className="text-gray-300 text-lg">
                  Show prospects you use cutting-edge tools to serve them
                  better.
                </p>
              </div>

              <div className="bg-gradient-to-b from-gray-900/80 to-gray-800/80 border border-purple-500/30 rounded-lg p-8 hover:border-purple-500/50 transition-all duration-300">
                <div className="text-2xl font-bold text-purple-400 mb-4">
                  ✅ Professional image
                </div>
                <p className="text-gray-300 text-lg">
                  Sophie's smart, clear responses reflect the tone and polish of
                  a high-end firm.
                </p>
              </div>

              <div className="bg-gradient-to-b from-gray-900/80 to-gray-800/80 border border-green-500/30 rounded-lg p-8 hover:border-green-500/50 transition-all duration-300">
                <div className="text-2xl font-bold text-green-400 mb-4">
                  ✅ Instant credibility
                </div>
                <p className="text-gray-300 text-lg">
                  Clients feel like they're getting attention from the start—not
                  left wondering if you're even available.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video Testimonials Section */}

      {/* Guarantee Section */}
      <section
        id="guarantee"
        className="py-20 relative bg-gradient-to-r from-gray-900/30 via-teal-900/20 to-gray-900/30"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* <motion.div
              className="bg-gradient-to-b from-gray-900/90 to-gray-800/90 border-2 border-teal-500/50 rounded-2xl p-12 mb-12"
              variants={slideFromBottom}
            >
              <div className="text-6xl mb-6">🛡️</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-teal-400">
                Our Guarantee
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                If we don't get you{" "}
                <strong className="text-teal-400">
                  10 booked appointments
                </strong>{" "}
                out of your first 100 leads, we’ll keep fine-tuning Alina for
                you until you get them.{" "}
                <strong className="text-orange-400">
                  At no extra cost to you.
                </strong>
              </p>
            </motion.div> */}

            {/* Urgency */}
            <motion.div className="mb-8" variants={fadeIn}>
              <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-orange-500/50 rounded-lg p-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Clock className="text-orange-400" size={24} />
                  <span className="text-orange-400 font-bold text-lg">
                    LIMITED AVAILABILITY
                  </span>
                </div>
                <p className="text-white text-lg">
                  We're only opening{" "}
                  <strong className="text-orange-400">10 slots</strong> because
                  each campaign requires manual setup.
                  <br />
                  <strong className="text-red-400">
                    7 spots already taken. First come, first served.
                  </strong>
                </p>
              </div>
            </motion.div>

            {/* Final CTA */}
            <motion.div variants={slideFromBottom}>
              <div id="pricing-section" className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-6">
                  Choose Your ASAP Chat Bundle
                </h3>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
                  {/* Engagement Bundle */}
                  <div className="bg-gradient-to-b from-blue-500/20 to-purple-500/20 border border-blue-400/50 rounded-lg p-8">
                    <h4 className="text-2xl font-bold text-teal-400 mb-4">
                      Engagement Bundle
                    </h4>
                    <div className="mb-6">
                      <p className="text-gray-400 line-through text-lg">
                        Regular: $1,198 setup
                      </p>
                      <p className="text-4xl font-bold text-teal-400 mb-2">
                        Flash Sale: $299
                      </p>
                      <p className="text-orange-400 font-semibold">
                        Save $899 Today!
                      </p>
                    </div>

                    <div className="text-left mb-6">
                      <p className="text-white font-semibold mb-2">Includes:</p>
                      <ul className="text-gray-300 space-y-1">
                        <li>• DM Dispatch (Social Media AI)</li>
                        <li>• Site Support (Website Chat AI)</li>
                        <li>• 24/7 customer service from site to social!</li>
                        <li>• Custom Sophie AI training</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-teal-500/20 to-blue-500/20 border border-teal-400/50 rounded-lg p-4 mb-6">
                      <p className="text-teal-400 font-bold text-sm mb-1">
                        Discount Code:
                      </p>
                      <p className="text-white text-lg font-bold">
                        chatEngagement
                      </p>
                    </div>

                    <a
                      href="https://buy.stripe.com/5kQ00icf68g3e6tey00VO06"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
                    >
                      <div>Get Engagement Bundle - $299</div>
                      <div className="text-sm mt-1 opacity-90">
                        Discount Code: 'chatEngagement'
                      </div>
                    </a>
                  </div>

                  {/* Lead Conversion Bundle */}
                  <div className="bg-gradient-to-b from-green-500/20 to-teal-500/20 border border-green-400/50 rounded-lg p-8 relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                        MOST POPULAR
                      </span>
                    </div>

                    <h4 className="text-2xl font-bold text-teal-400 mb-4">
                      Lead Conversion Bundle
                    </h4>
                    <div className="mb-6">
                      <p className="text-gray-400 line-through text-lg">
                        Regular: $1,498 setup
                      </p>
                      <p className="text-4xl font-bold text-teal-400 mb-2">
                        Flash Sale: $499
                      </p>
                      <p className="text-orange-400 font-semibold">
                        Save $999 Today!
                      </p>
                    </div>

                    <div className="text-left mb-6">
                      <p className="text-white font-semibold mb-2">Includes:</p>
                      <ul className="text-gray-300 space-y-1">
                        <li>• DM Dispatch (Social Media AI)</li>
                        <li>• LeadLink (Lead Qualification AI)</li>
                        <li>• Advanced lead scoring & routing</li>
                        <li>• Priority Sophie AI training</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-teal-500/20 to-green-500/20 border border-teal-400/50 rounded-lg p-4 mb-6">
                      <p className="text-teal-400 font-bold text-sm mb-1">
                        Discount Code:
                      </p>
                      <p className="text-white text-lg font-bold">
                        chatConversion
                      </p>
                    </div>

                    <a
                      href="https://buy.stripe.com/6oU7sKdja1RF9Qdey00VO05"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
                    >
                      <div>Get Lead Conversion - $499</div>
                      <div className="text-sm mt-1 opacity-90">
                        Discount Code: 'chatConversion'
                      </div>
                    </a>
                  </div>
                </div>

                <p className="text-sm text-gray-400 mb-4">
                  Limited to First 10 Law Firms • Secure payment via Stripe
                </p>

                <div className="flex justify-center items-center space-x-8 text-gray-400 text-sm">
                  <div className="flex items-center space-x-1">
                    <Check size={16} className="text-teal-400" />
                    <span>Secure payment</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Check size={16} className="text-teal-400" />
                    <span>Setup within 48 hours</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Check size={16} className="text-teal-400" />
                    <span>30-day money back guarantee</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-12 text-center text-white"
              variants={slideFromBottom}
            >
              Frequently Asked Questions
            </motion.h2>

            <motion.div className="space-y-6" variants={staggerFadeIn}>
              {[
                {
                  q: "What's my next step after purchasing?",
                  a: "Be sure to provide your best email address when using the Stripe secure checkout and after securing your bundle, we'll email you within 24 hours to schedule a 15-minute setup call. We'll customize Sophie's responses to match your firm's tone and practice areas. You can also reach us at inbox@asaptheagency.com",
                },
                {
                  q: "How quickly will Sophie be active?",
                  a: "Sophie goes live within 48 hours of your setup call. We'll test everything with you before activation to ensure she's responding perfectly to your types of legal inquiries.",
                },
                {
                  q: "What types of legal questions can Sophie handle?",
                  a: "Sophie handles initial inquiries, qualifies case types, collects contact information, and books consultations. She's trained on common legal questions but always directs complex matters to your team.",
                },
                {
                  q: "What happens after this flash sale ends?",
                  a: "Bundle prices return to regular rates ($1,198 and $1,498). This launch pricing is exclusively for the first 10 law firms to sign up.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-teal-500/50 transition-colors duration-300"
                  variants={fadeIn}
                >
                  <h3 className="text-xl font-bold text-teal-400 mb-3">
                    {faq.q}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ChatLaunch;
