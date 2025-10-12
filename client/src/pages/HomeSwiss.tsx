import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import SEOHead from "../components/SEOHead";
import ContactButton from "../components/ContactButton";
import { scrollToSection } from "../lib/scrollUtils";

const HomeSwiss: React.FC = () => {
  const [, setLocation] = useLocation();

  const services = [
    {
      id: "rise",
      title: "R.I.S.E.",
      description: "Revive Inactive Sales Engagements",
      details:
        "Our text agent Alina texts your old dead leads and recaptures them, putting them back into your sales process.",
      route: "/services/rise",
      suite: null,
    },
    {
      id: "outreach-pro",
      title: "OutreachPro",
      description: "Automated Outbound Communications",
      details:
        "Automated outbound calls for follow-ups, Google Calendar appointment booking, and vendor orders.",
      route: "/services/outreach-pro",
      suite: "ASAP Connect",
    },
    {
      id: "front-desk",
      title: "Front Desk",
      description: "Intelligent Reception System",
      details:
        "Inbound voice agent Jessica takes calls like your receptionist, books appointments in your Google calendar.",
      route: "/services/front-desk",
      suite: "ASAP Connect",
    },
    {
      id: "dm-dispatch",
      title: "DM Dispatch",
      description: "Social Media Automation",
      details:
        "Sophie automates your direct messages across social media platforms, providing instant responses 24/7.",
      route: "/services/dm-dispatch",
      suite: "ASAP Chat",
    },
    {
      id: "site-support",
      title: "Site Support",
      description: "Customer Service Assistant",
      details:
        "AI-powered customer service providing instant, 24/7 support for website visitors with intelligent responses.",
      route: "/services/site-support",
      suite: "ASAP Chat",
    },
    {
      id: "lead-link",
      title: "LeadLink",
      description: "Lead Qualification System",
      details:
        "Sophie automates lead qualification on your website, capturing prospect data and sending qualified leads to Google Sheets.",
      route: "/services/lead-link",
      suite: "ASAP Chat",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white font-sans">
      <SEOHead
        title="ASAP Agency - Swiss Edition"
        description="Intelligent AI-powered digital agency specializing in automated business communication and lead conversion."
      />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-[#1a1a1a] relative overflow-hidden pt-20">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-0 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-gray-800"></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Header Navigation */}
          <div className="flex justify-between items-center py-6 text-sm">
            <div className="flex items-center space-x-6">
              <span>AI Designer</span>
              <span className="text-gray-400">&</span>
              <span className="text-gray-400">Freelancer</span>
            </div>
            <div className="flex items-center space-x-6">
              <span>Asap</span>
              <span>Agency</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto text-center py-20">
            {/* Logo/Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="w-16 h-16 mx-auto mb-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tight mb-8"
            >
              ASAPAGENCY
            </motion.h1>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12 space-y-4"
            >
              <p className="text-base lg:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                HI WORLD, I'M ASAP AGENCY (AI AUTOMATION), BUSINESS BASED IN AUTOMATION — GLOBALLY.<br/>
                NOW I AM ALSO RUNNING AN AI-POWERED SUITE AT ONE OF THE LEADING<br/>
                AUTOMATION COMPANIES GLOBALLY:
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 text-sm text-gray-400">
                <div>
                  <p>Currently have 6 year experience in designing AI automation and lead generation systems. I am currently working at Various Studio as an AI Independent and part of Asap Studio, Asap Design.</p>
                </div>
                <div>
                  <p>I like to describe myself as a designer with high discipline and enjoy working in a team or independently.</p>
                </div>
                <div>
                  <p>Say Hi:<br/>asap@asapagency.com</p>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4 mb-16"
            >
              <button className="px-8 py-3 border border-gray-600 rounded-full hover:bg-white hover:text-black transition-colors">
                CONTACT
              </button>
              <button className="px-8 py-3 border border-gray-600 rounded-full hover:bg-white hover:text-black transition-colors">
                INSTAGRAM
              </button>
              <button className="px-8 py-3 border border-gray-600 rounded-full hover:bg-white hover:text-black transition-colors">
                LINKEDIN
              </button>
            </motion.div>
          </div>
        </div>


      </section>

      {/* Featured Projects Section */}
      <section className="py-24 bg-[#1a1a1a] relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-8">
              FEATURED PROJECTS
            </h2>
            
            {/* Project Filter Tags */}
            <div className="flex flex-wrap gap-4 mb-12">
              <button className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium">
                Automation
              </button>
              <button className="px-6 py-2 border border-gray-600 text-white rounded-full text-sm hover:bg-white hover:text-black transition-colors">
                Case Study
              </button>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.slice(0, 4).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-300"
              >
                <div className="h-64 bg-gradient-to-br from-purple-500 to-pink-500 relative">
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="text-white text-center">
                      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                      <p className="text-sm opacity-80">{service.description}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                      {service.suite || "Core Service"}
                    </span>
                    <span className="text-xs text-gray-500">AI Design</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{service.details}</p>
                  <button className="text-sm bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
                    View Project
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Section */}
      <section className="py-24 bg-[#1a1a1a] relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-8">
              ACHIEVEMENT
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  3rd Place
                </span>
                <span className="text-xs text-gray-500">Design Challenge</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">
                AI AUTOMATION CHALLENGE
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Make designs with AI automation themes organized by ASAP Studio
              </p>
              <button className="text-sm bg-black text-white px-4 py-2 rounded-full">
                View Design
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  3rd Place
                </span>
                <span className="text-xs text-gray-500">Design Challenge</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">
                BUSINESS AUTOMATION APP
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Make designs with Business automation organized by various studios
              </p>
              <button className="text-sm bg-black text-white px-4 py-2 rounded-full">
                View Design
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Get In Touch Section */}
      <section
        id="services"
        className="py-24 bg-[#1a1a1a] relative overflow-hidden"
      >
        {/* Floating Arrow Elements */}
        <motion.div
          className="absolute top-16 right-16 hidden xl:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            className="text-red-600 opacity-10"
          >
            <path
              d="M12 5L12 19M12 19L6 13M12 19L18 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-16 left-16 hidden xl:block"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            className="text-gray-400 opacity-20"
          >
            <path
              d="M17 7L7 17M7 17H17M7 17V7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight mb-12">
              GET IN TOUCH
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
              I AM AVAILABLE FOR A FREELANCE PROJECT THIS YEAR. LOOKING FOR SOMETHING UNIQUE? JUST GET IN TOUCH.
            </p>

            {/* Social Links - Bottom */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <button className="px-8 py-3 border border-gray-600 rounded-full hover:bg-white hover:text-black transition-colors">
                DRIBBBLE
              </button>
              <button className="px-8 py-3 border border-gray-600 rounded-full hover:bg-white hover:text-black transition-colors">
                INSTAGRAM
              </button>
              <button className="px-8 py-3 border border-gray-600 rounded-full hover:bg-white hover:text-black transition-colors">
                LINKEDIN
              </button>
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white text-black px-12 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Contact Me
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomeSwiss;
