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
import riseImage from "../assets/rise_new.webp";

const RiseLanding: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
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
              🔥 FLASH SALE - 50% OFF - LIMITED TIME 🔥
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            variants={slideFromBottom}
          >
            <span className="bg-gradient-to-r from-white via-teal-400 to-orange-500 bg-clip-text text-transparent">
              Turn Your Dead Leads Into
            </span>
            <br />
            <span className="text-teal-400">Serious Revenue!</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
            variants={slideFromBottom}
          >
            Our AI text agent <strong className="text-teal-400">Alina</strong>{" "}
            revives your dormant leads with personalized messages that feel
            human and convert at 3x industry standard
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
              <p className="text-gray-400 line-through text-xl">
                Regular Price: $2,000
              </p>
              <p className="text-4xl md:text-5xl font-bold text-teal-400 mb-2">
                Flash Sale: $1,000
              </p>
              <p className="text-orange-400 font-semibold">
                Conversion fees of $200 waived (first 10 conversions)
              </p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div className="mb-8" variants={slideFromBottom}>
            <button
              onClick={() => {
                const element = document.getElementById("payment-button");
                if (element) {
                  const elementPosition =
                    element.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition =
                    elementPosition -
                    window.innerHeight / 2 +
                    element.offsetHeight / 2;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              }}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-6 px-12 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-500/25"
            >
              CLAIM YOUR 50% DISCOUNT NOW
            </button>
            <p className="text-sm text-gray-400 mt-3">
              ⚡ Only 10 spots available - 7 already taken
            </p>
          </motion.div>

          {/* Social Proof */}
          <motion.div className="text-center" variants={fadeIn}>
            <p className="text-gray-400 mb-4">
              Trusted by 500+ businesses to revive their dead leads
            </p>
            <div className="flex justify-center items-center space-x-8 text-teal-400">
              <div className="flex items-center space-x-2">
                <MessageSquare size={20} />
                <span>2M+ Messages Sent</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={20} />
                <span>15K+ Appointments Booked</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp size={20} />
                <span>3x Conversion Rate</span>
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
              Your CRM Is A Graveyard of Lost Revenue
            </motion.h2>

            <motion.div
              className="grid md:grid-cols-3 gap-8 mb-12"
              variants={staggerFadeIn}
            >
              <div className="bg-gray-900/50 border border-red-500/30 rounded-lg p-6">
                <div className="text-3xl font-bold text-red-400 mb-2">67%</div>
                <p className="text-gray-300">
                  of your leads go cold before you follow up properly
                </p>
              </div>
              <div className="bg-gray-900/50 border border-red-500/30 rounded-lg p-6">
                <div className="text-3xl font-bold text-red-400 mb-2">8+</div>
                <p className="text-gray-300">
                  touchpoints needed before leads buy, but most give up after 2
                </p>
              </div>
              <div className="bg-gray-900/50 border border-red-500/30 rounded-lg p-6">
                <div className="text-3xl font-bold text-red-400 mb-2">92%</div>
                <p className="text-gray-300">
                  of businesses never follow up on old leads again
                </p>
              </div>
            </motion.div>

            <motion.p
              className="text-xl text-gray-300 leading-relaxed"
              variants={slideFromBottom}
            >
              While you're focused on getting new leads,{" "}
              <strong className="text-red-400">
                thousands of dollars in potential revenue
              </strong>{" "}
              are sitting dormant in your database. Most leads need 8-12
              touchpoints before they buy, but most businesses give up after 2.
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
                  Meet Alina: Your AI Text Agent That Never Gives Up
                </h2>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Alina analyzes your dead leads, crafts personalized text
                  messages that feel completely human, and follows up until they
                  book appointments. She works 24/7 and never forgets a
                  follow-up.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Revives leads that have been dormant for months or years",
                    "Automatically schedules appointments in your calendar",
                    "Works around the clock - even on weekends",
                    "Feels completely human - leads think Alina is your employee",
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
                    src={riseImage}
                    fallbackSrc="/robot_placeholder.webp"
                    alt="RISE AI Text Agent"
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
              Real Results From Real Businesses
            </motion.h2>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={staggerFadeIn}
            >
              <div className="bg-gradient-to-b from-gray-900/80 to-gray-800/80 border border-teal-500/30 rounded-lg p-8 hover:border-teal-500/50 transition-all duration-300">
                <div className="text-4xl font-bold text-teal-400 mb-2">20%</div>
                <p className="text-gray-300 text-lg">
                  of dead leads converted to appointments
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Law firm with 2,000 dormant leads
                </p>
              </div>

              <div className="bg-gradient-to-b from-gray-900/80 to-gray-800/80 border border-orange-500/30 rounded-lg p-8 hover:border-orange-500/50 transition-all duration-300">
                <div className="text-4xl font-bold text-orange-400 mb-2">
                  $127K
                </div>
                <p className="text-gray-300 text-lg">
                  in revenue from previously dead leads
                </p>
                <p className="text-sm text-gray-400 mt-2">Roofing contractor</p>
              </div>

              <div className="bg-gradient-to-b from-gray-900/80 to-gray-800/80 border border-purple-500/30 rounded-lg p-8 hover:border-purple-500/50 transition-all duration-300">
                <div className="text-4xl font-bold text-purple-400 mb-2">
                  3.2x
                </div>
                <p className="text-gray-300 text-lg">
                  higher conversion than industry average
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Across all client industries
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-20 relative bg-gradient-to-b from-black via-gray-900/50 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-teal-400 to-orange-500 bg-clip-text text-transparent"
              variants={slideFromBottom}
            >
              Real Success Stories
            </motion.h2>

            <motion.p
              className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto"
              variants={fadeIn}
            >
              Don't just take our word for it. Hear from real business owners
              who've turned their dead leads into serious revenue with RISE.
            </motion.p>

            <motion.div
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              variants={staggerFadeIn}
            >
              {/* Testimonial Video 1 */}
              <div className="bg-gradient-to-b from-gray-900/80 to-gray-800/80 border border-teal-500/30 rounded-lg p-6 hover:border-teal-500/50 transition-all duration-300">
                <div
                  className="w-full mb-4 bg-gray-800 rounded-lg overflow-hidden"
                  style={{ aspectRatio: "9/16", maxHeight: "500px" }}
                >
                  <iframe
                    src="https://drive.google.com/file/d/1RjExqfltLCj7uC35peiv2L-Ytn1sz7hJ/preview"
                    width="100%"
                    height="100%"
                    allow="autoplay"
                    className="w-full h-full"
                    title="RISE Customer Testimonial 1"
                  ></iframe>
                </div>
                <h3 className="text-xl font-bold text-teal-400 mb-2">Taylor</h3>
                <p className="text-gray-300 text-sm mb-2">
                  Owner/Operator, "Pacific Public Adjusters"
                </p>
                <p className="text-gray-400 text-sm">
                  His testimonial about their RISE experience and results
                </p>
              </div>

              {/* Testimonial Video 2 */}
              <div className="bg-gradient-to-b from-gray-900/80 to-gray-800/80 border border-orange-500/30 rounded-lg p-6 hover:border-orange-500/50 transition-all duration-300">
                <div
                  className="w-full mb-4 bg-gray-800 rounded-lg overflow-hidden"
                  style={{ aspectRatio: "9/16", maxHeight: "500px" }}
                >
                  <iframe
                    src="https://drive.google.com/file/d/1XoJQ8OcZmLD1ZPNYKRxpfzUDh0w8egZ2/preview"
                    width="100%"
                    height="100%"
                    allow="autoplay"
                    className="w-full h-full"
                    title="RISE Customer Testimonial 2"
                  ></iframe>
                </div>
                <h3 className="text-xl font-bold text-orange-400 mb-2">
                  Hogan
                </h3>
                <p className="text-gray-300 text-sm mb-2">
                  Owner/Operator, "Hail Brothers"
                </p>
                <p className="text-gray-400 text-sm">
                  His testimonial about their RISE experience and results
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
            <motion.div
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
              {/* <p className="text-lg text-gray-400">
                We're so confident in Alina's ability to revive your dead leads
                that we're willing to work for free until you see results.
              </p> */}
            </motion.div>

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
              <div className="text-center mb-6">
                <p className="text-gray-400 line-through text-xl">
                  Regular Price: $2,000
                </p>
                <p className="text-5xl font-bold text-teal-400 mb-2">
                  Flash Sale: $1,000
                </p>
                <p className="text-orange-400 font-semibold text-lg">
                  First 10 conversion fees waived ($2,000 value)
                </p>
                <p className="text-orange-400 font-semibold text-lg">
                  Save $3,000 when you act today!
                </p>

                {/* Discount Code Notice */}
                <div className="bg-gradient-to-r from-teal-500/20 to-orange-500/20 border border-teal-400/50 rounded-lg p-4 mt-6 mb-4">
                  <p className="text-teal-400 font-bold text-lg mb-2">
                    💰 Don't Forget Your Discount Code!
                  </p>
                  <p className="text-white text-base">
                    Use code{" "}
                    <span className="bg-teal-400 text-black px-3 py-1 rounded font-bold">
                      riseLaunch
                    </span>{" "}
                    at checkout to claim your $1,000 discount
                  </p>
                </div>
              </div>

              <a
                id="payment-button"
                href="https://buy.stripe.com/bJe5kCa6Y9k78M90Ha0VO02"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-6 px-16 rounded-full text-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-500/25 mb-4"
              >
                <div className="text-center">
                  <div>SECURE YOUR SPOT FOR $1,000</div>
                  <div className="text-sm mt-1">
                    USE DISCOUNT CODE 'riseLaunch'
                  </div>
                </div>
              </a>

              <p className="text-sm text-gray-400">
                ⚡ 3 spots remaining • Secure payment via Stripe
              </p>

              <div className="flex justify-center items-center space-x-8 mt-6 text-gray-400 text-sm">
                <div className="flex items-center space-x-1">
                  <Check size={16} className="text-teal-400" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Check size={16} className="text-teal-400" />
                  <span>Setup within 48 hours</span>
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
                  q: "What's my next step?",
                  a: "Be sure to include your best email address when you sign up using the secure Stripe checkout. After you sign up we will send you an email and book a quick 15 minute call to get you started. You can also feel free to email us after at inbox@asaptheagency.com",
                },
                {
                  q: "How quickly will I see results?",
                  a: "Most clients see their first appointments booked within 48-72 hours of launch. Alina works 24/7, so she starts texting your leads immediately after setup",
                },
                {
                  q: "What if I don't have many dead leads?",
                  a: "Even if you think your lead list is small, most businesses are surprised by how many dormant contacts they have. We've successfully revived leads that were 2+ years old.",
                },
                {
                  q: "Do the messages really feel human?",
                  a: "Yes. Alina uses advanced AI to craft personalized messages based on each lead's history, location, and previous interactions. Most people can't tell they're texting an AI.",
                },
                {
                  q: "What industries does this work for?",
                  a: "RISE works for any business that generates leads and books appointments: law firms, contractors, real estate, medical practices, automotive, and more.",
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

export default RiseLanding;