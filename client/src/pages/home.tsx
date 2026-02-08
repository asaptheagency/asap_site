import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight,
  Phone,
  MessageSquare,
  Globe,
  Link2,
  RefreshCw,
  Code,
  Smartphone,
  ChevronDown,
} from "lucide-react";
import { SiFacebook, SiInstagram } from "react-icons/si";

function useCustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-hover]")) {
        cursor.classList.add("hovering");
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-hover]")) {
        cursor.classList.remove("hovering");
      }
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return { cursorRef, dotRef };
}

function ScrollReveal({
  children,
  direction = "left",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === "left" ? -80 : 80 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ParallaxSection({
  children,
  speed = 0.3,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
        scrolled
          ? "bg-[#e6e6e6]/90 backdrop-blur-md border-b border-[#191919]/10"
          : ""
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center cursor-none"
          data-hover
          data-testid="link-logo"
        >
          <span className="font-bold text-xl tracking-tight">
            <span className="text-[#dc2626]">A</span>
            <span className="text-[#191919]">spire</span>
            <span className="text-[#dc2626]">It</span>
          </span>
        </button>
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Services", id: "services" },
            { label: "Process", id: "process" },
            { label: "About", id: "about" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-[#191919]/70 text-sm tracking-widest uppercase font-medium transition-colors duration-300 hover:text-[#dc2626] cursor-none"
              data-hover
              data-testid={`link-nav-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollTo("cta")}
          className="bg-[#dc2626] text-[#e6e6e6] px-5 py-2.5 text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#991b1b] rounded-md cursor-none"
          data-hover
          data-testid="button-nav-cta"
        >
          Get Started
        </button>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const words = [
    {
      parts: [
        { text: "A", red: true },
        { text: "spire", red: false },
        { text: "It", red: true },
      ],
    },
    {
      parts: [
        { text: "S", red: true },
        { text: "oftware", red: false },
      ],
    },
    {
      parts: [
        { text: "A", red: true },
        { text: "utomation", red: false },
      ],
    },
    { parts: [{ text: "&", red: false }] },
    {
      parts: [
        { text: "P", red: true },
        { text: "romotion", red: false },
      ],
    },
  ];

  return (
    <motion.section
      id="hero"
      style={{ opacity, scale }}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#e6e6e6] pt-20"
    >
      <div className="swiss-grid-line vertical" style={{ left: "8%" }} />
      <div className="swiss-grid-line vertical" style={{ left: "25%" }} />
      <div className="swiss-grid-line vertical" style={{ left: "50%" }} />
      <div className="swiss-grid-line vertical" style={{ left: "75%" }} />
      <div className="swiss-grid-line vertical" style={{ left: "92%" }} />
      <div className="swiss-grid-line horizontal" style={{ top: "20%" }} />
      <div className="swiss-grid-line horizontal" style={{ top: "50%" }} />
      <div className="swiss-grid-line horizontal" style={{ top: "80%" }} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full relative z-10">
        <motion.p
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-[#dc2626] text-sm md:text-base tracking-[0.3em] uppercase font-medium mb-6 md:mb-10"
          data-testid="text-hero-label"
        >
          AspireIt Software Automation & Promotion
        </motion.p>

        <div className="mb-8 md:mb-12">
          {words.map((word, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
              className="inline-block mr-3 md:mr-6"
            >
              <span
                className="text-[clamp(2.5rem,8vw,7rem)] md:text-[clamp(4rem,9vw,8rem)] font-bold leading-[0.95] tracking-tighter"
                data-testid={`text-hero-word-${i}`}
              >
                {word.parts.map((part, j) => (
                  <span
                    key={j}
                    className={part.red ? "text-[#dc2626]" : "text-[#191919]"}
                  >
                    {part.text}
                  </span>
                ))}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8"
        >
          <p
            className="text-[#191919]/60 text-lg md:text-xl tracking-wide font-light max-w-md"
            data-testid="text-hero-tagline"
          >
            We can when we{" "}
            <span className="text-[#dc2626] font-semibold">AspireIt</span>
          </p>
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-[1px] bg-[#dc2626]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              style={{ originX: 0 }}
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="text-[#191919]/40 text-xs tracking-[0.2em] uppercase"
            >
              Scroll to explore
            </motion.span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-[#191919]/30" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

const servicesData = [
  {
    id: "rise",
    label: "R.I.S.E.",
    icon: RefreshCw,
    tagline: "Revive Inactive Sales Engagements",
    content: {
      intro:
        "Is your sales pipeline filled with dead leads? Don't let them collect dust any longer!",
      description:
        "Introducing R.I.S.E. (Revive Inactive Sales Engagements) — the game-changing service that re-engages your old leads and puts them back into your sales process.",
      howItWorks: [
        {
          title: "You provide your old leads",
          desc: "Send us the list of leads that have gone cold or weren't followed up on.",
        },
        {
          title: "Our AI-powered system gets to work",
          desc: "Using Alina, our advanced text agent, we reinitiate contact with these leads and strategically nurture them with personalized messages.",
        },
        {
          title: "We put the leads back into your sales process",
          desc: "Once we've re-engaged them, we seamlessly place these revitalized leads into your active sales funnel, giving you another chance to close the deal.",
        },
      ],
      whyChoose: [
        {
          title: "Turn Dead Leads into Dollars",
          desc: "Stop letting your old leads slip away. With R.I.S.E., we breathe new life into them and give you a second shot at success.",
        },
        {
          title: "Save Time and Effort",
          desc: "Let Alina do the heavy lifting by automating the re-engagement process. No need to waste hours manually reaching out to old prospects.",
        },
        {
          title: "Increase Conversions",
          desc: "Reconnecting with cold leads can increase your sales opportunities and conversion rates. Some of your best customers might have just slipped through the cracks.",
        },
      ],
    },
  },
  {
    id: "frontdesk",
    label: "Front Desk",
    icon: Phone,
    tagline: "ASAP Connect — Front Desk",
    content: {
      intro:
        "Say goodbye to missed calls and overloaded receptionists with ASAP Connect - Front Desk!",
      description:
        "Our inbound AI voice agent, Jessica, works just like a receptionist, handling customer calls seamlessly, scheduling appointments, and providing the information your clients need – all without lifting a finger.",
      howItWorks: [
        {
          title: "Professional Call Handling",
          desc: "Jessica answers incoming calls, offering a polished, friendly greeting to each caller. She can assist with basic inquiries, book appointments, and direct customers to the right department.",
        },
        {
          title: "Appointment Scheduling",
          desc: "Direct access to your Google Calendar means Jessica can check availability, schedule appointments, and confirm bookings – all in real-time.",
        },
        {
          title: "24/7 Availability",
          desc: "No more worrying about after-hours calls. Jessica is always available to ensure your customers are never left hanging.",
        },
        {
          title: "Customer Experience at its Best",
          desc: "With Jessica, your clients get the same level of service they would expect from a human receptionist—without the need for someone to be physically available at all times.",
        },
      ],
      whyChoose: [
        {
          title: "Cost Savings",
          desc: "Reduce the need for a full-time receptionist while still offering top-notch customer service.",
        },
        {
          title: "Efficiency & Accuracy",
          desc: "With seamless integration to your calendar, Jessica ensures appointments are scheduled promptly and accurately.",
        },
        {
          title: "Scalability",
          desc: "Whether you're a small business or a growing enterprise, Jessica can handle as many calls as you need—keeping things efficient as your business scales.",
        },
      ],
    },
  },
  {
    id: "dmdispatch",
    label: "DM Dispatch",
    icon: MessageSquare,
    tagline: "ASAP Chat — DM Dispatch",
    content: {
      intro: "Boost Your Engagement, Automate Your DMs, and Save Time!",
      description:
        "Do you find yourself overwhelmed by endless direct messages on social media? Are you missing out on valuable conversations simply because you can't keep up with the volume? Say hello to ASAP Chat – DM Dispatch, your solution for automating direct messages, powered by Alina, our intelligent AI assistant.",
      howItWorks: [
        {
          title: "Automated Responses",
          desc: "Alina answers DMs on your behalf, providing fast, relevant answers to your customers.",
        },
        {
          title: "Instant Engagement",
          desc: "Don't leave your customers waiting! Alina responds immediately, creating a seamless experience that boosts engagement and keeps your brand in the spotlight.",
        },
        {
          title: "Customized Conversations",
          desc: "With Alina's ability to adapt, you can set up specific flows and responses tailored to your business, products, and customer needs.",
        },
        {
          title: "24/7 Availability",
          desc: "Never miss a message. Alina operates around the clock, ensuring you never lose touch with a potential lead, even when you're asleep!",
        },
      ],
      whyChoose: [
        {
          title: "Save Time",
          desc: "Stop wasting hours each week responding to the same questions over and over. Let Alina handle it for you.",
        },
        {
          title: "Increase Efficiency",
          desc: "With automated responses, your team can focus on higher-value tasks and engage with customers in a more meaningful way.",
        },
        {
          title: "Maximize Lead Conversion",
          desc: "Faster response times mean higher chances of converting leads into customers. Alina qualifies and engages leads, giving you more opportunities to close deals.",
        },
        {
          title: "Boost Your Brand Presence",
          desc: "Stay top of mind with customers who appreciate immediate responses. Fast replies can build trust and enhance customer satisfaction.",
        },
      ],
    },
  },
  {
    id: "sitesupport",
    label: "Site Support",
    icon: Globe,
    tagline: "ASAP Chat — Site Support",
    content: {
      intro: "Instant, 24/7 Support for Your Website Visitors",
      description:
        "Tired of missing out on customer inquiries because your team is busy, or worse—because the visitor just leaves before you can respond? With ASAP Chat – Site Support, your website gets a powerful, intelligent chatbot that's always ready to engage and answer questions — all while freeing up your team to focus on more important tasks.",
      howItWorks: [
        {
          title: "Instant Responses",
          desc: "As soon as a visitor lands on your website, Alina, your AI chatbot assistant, is there to respond. No more waiting. Just immediate answers to customer questions.",
        },
        {
          title: "Answers Made Easy",
          desc: "Alina is programmed to provide clear, accurate responses to common inquiries, helping customers get the information they need—fast.",
        },
        {
          title: "24/7 Availability",
          desc: "Day or night, Alina is always on your website, ready to respond. You won't miss another customer interaction, even when you're not around.",
        },
      ],
      whyChoose: [
        {
          title: "Boost Customer Satisfaction",
          desc: "Visitors appreciate fast, efficient support. With ASAP Chat, they'll never be left hanging.",
        },
        {
          title: "Increase Conversions",
          desc: "Engaging with users in real-time means you're more likely to convert them into leads or customers.",
        },
        {
          title: "Save Time & Money",
          desc: "Let Alina handle all of the repetitive questions, so your team can focus on more important tasks. No need to hire additional support staff.",
        },
        {
          title: "Seamless Integration",
          desc: "ASAP Chat integrates seamlessly into your website, providing a smooth, uninterrupted experience for your visitors. It's easy to set up and even easier to maintain.",
        },
      ],
    },
  },
  {
    id: "leadlink",
    label: "Lead Link",
    icon: Link2,
    tagline: "ASAP Chat — LeadLink",
    content: {
      intro: "Qualify Leads Faster, Capture Data Instantly",
      description:
        "Tired of wasting time chasing down unqualified leads? With ASAP Chat – LeadLink, your website visitors will be greeted by Alina, the AI-powered chatbot, who'll not only engage with them but will qualify their interest and seamlessly send all the data over to your team in real-time via Google Sheets.",
      howItWorks: [
        {
          title: "Instant Lead Qualification",
          desc: "Alina automatically engages with visitors as soon as they land on your website, asking the right questions to qualify leads on the spot. No more guessing or wasted time!",
        },
        {
          title: "Smart Data Collection",
          desc: "As leads are qualified, all the relevant information is gathered and sent straight to a Google Sheet. You can see the data in real-time, easily tracking leads and their journey through the qualification process.",
        },
        {
          title: "Seamless Integration",
          desc: "ASAP Chat – LeadLink works perfectly with your existing website and Google Sheets. Setting up and automating the process is simple, and all your leads are organized in one place, ready for follow-up.",
        },
        {
          title: "24/7 Lead Capture",
          desc: "Whether it's 3 p.m. or 3 a.m., Alina is on duty, capturing and qualifying leads at all hours. Your business never misses a chance to connect with potential customers.",
        },
      ],
      whyChoose: [
        {
          title: "Save Time on Lead Qualification",
          desc: "Let Alina do the heavy lifting by handling the qualification process. Your team only deals with qualified leads, saving you time and effort.",
        },
        {
          title: "Automated Lead Data Collection",
          desc: "All lead information is instantly captured and logged in Google Sheets, ensuring nothing slips through the cracks. Your team has everything they need in one place to follow up efficiently.",
        },
        {
          title: "Increase Conversion Rates",
          desc: "With automated, efficient lead qualification, you're more likely to convert those leads into paying customers. No more wasting time on low-quality leads.",
        },
        {
          title: "Easy Integration",
          desc: "ASAP Chat – LeadLink integrates smoothly into your website, and Google Sheets is easy to manage. It's an all-in-one solution to streamline your lead generation process.",
        },
      ],
    },
  },
  {
    id: "webdesign",
    label: "Web Design",
    icon: Code,
    tagline: "Web Design & Development",
    content: {
      intro:
        "Stunning, High-Performance Websites That Convert Visitors Into Customers",
      description:
        "Your website is your digital storefront — it needs to make an unforgettable first impression. At ASAP, we design and develop custom websites that don't just look beautiful, they perform. From sleek landing pages to full-scale e-commerce platforms, our team builds responsive, lightning-fast sites tailored to your brand and business goals.",
      howItWorks: [
        {
          title: "Discovery & Strategy",
          desc: "We start by understanding your business, your audience, and your goals. Every pixel is planned with purpose — ensuring your website speaks directly to the people who matter most.",
        },
        {
          title: "Custom Design & Prototyping",
          desc: "Our design team creates pixel-perfect mockups that capture your brand identity. You'll see and approve every detail before a single line of code is written.",
        },
        {
          title: "Development & Testing",
          desc: "Using modern frameworks and best practices, we build your site for speed, security, and scalability. Every page is rigorously tested across devices and browsers.",
        },
        {
          title: "Launch & Ongoing Support",
          desc: "We handle deployment, performance optimization, and provide ongoing maintenance so your site stays fast, secure, and up-to-date.",
        },
      ],
      whyChoose: [
        {
          title: "Conversion-Focused Design",
          desc: "Every element is strategically placed to guide visitors toward taking action — whether that's filling out a form, making a purchase, or booking a call.",
        },
        {
          title: "Mobile-First Responsiveness",
          desc: "Your site will look and function flawlessly on every device, from desktop monitors to smartphones.",
        },
        {
          title: "SEO-Optimized from Day One",
          desc: "We build with search engines in mind, ensuring your site ranks well and attracts organic traffic from the start.",
        },
        {
          title: "Fast Turnaround",
          desc: "We move quickly without cutting corners. Get a world-class website delivered on time and on budget.",
        },
      ],
    },
  },
  {
    id: "software",
    label: "Software Dev",
    icon: Smartphone,
    tagline: "Software Design & Development",
    content: {
      intro:
        "Custom Mobile & Desktop Applications Built to Scale Your Business",
      description:
        "Off-the-shelf software doesn't fit every business. That's why ASAP builds custom mobile and desktop applications designed around your unique workflows, challenges, and growth plans. Whether you need an internal tool to streamline operations or a customer-facing app that wows users, we bring your vision to life with clean code and intuitive design.",
      howItWorks: [
        {
          title: "Requirements & Architecture",
          desc: "We work closely with you to map out every feature, user flow, and integration. Our architects design a scalable foundation that grows with your business.",
        },
        {
          title: "UI/UX Design",
          desc: "Our designers craft intuitive interfaces that users love. Every interaction is thoughtfully designed for clarity, speed, and delight.",
        },
        {
          title: "Agile Development",
          desc: "We build in sprints, delivering functional features regularly so you can see progress and provide feedback throughout the process.",
        },
        {
          title: "Quality Assurance & Deployment",
          desc: "Rigorous testing ensures your application is rock-solid before launch. We handle deployment to app stores, cloud infrastructure, or your own servers.",
        },
      ],
      whyChoose: [
        {
          title: "Cross-Platform Expertise",
          desc: "Whether it's iOS, Android, Windows, or Mac — we build native and cross-platform applications that deliver a seamless experience everywhere.",
        },
        {
          title: "Scalable Architecture",
          desc: "Our apps are built on modern, scalable architecture that handles growth without breaking a sweat. Start small, scale big.",
        },
        {
          title: "End-to-End Partnership",
          desc: "From initial concept to post-launch support, we're with you every step of the way. You get a dedicated team invested in your success.",
        },
        {
          title: "Security-First Approach",
          desc: "We implement industry-standard security practices to protect your data and your users. Peace of mind is built into every line of code.",
        },
      ],
    },
  },
];

function ServicesSection() {
  const [activeTab, setActiveTab] = useState("rise");
  const activeService = servicesData.find((s) => s.id === activeTab)!;

  return (
    <section
      id="services"
      className="relative py-24 md:py-32 bg-[#191919] overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#dc2626]/30 to-transparent" />
      <div className="absolute inset-0">
        <div
          className="swiss-grid-line vertical"
          style={{ left: "25%", backgroundColor: "rgba(230,230,230,0.03)" }}
        />
        <div
          className="swiss-grid-line vertical"
          style={{ left: "50%", backgroundColor: "rgba(230,230,230,0.03)" }}
        />
        <div
          className="swiss-grid-line vertical"
          style={{ left: "75%", backgroundColor: "rgba(230,230,230,0.03)" }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <ScrollReveal direction="right">
          <p
            className="text-[#dc2626] text-sm tracking-[0.3em] uppercase font-medium mb-3"
            data-testid="text-services-label"
          >
            What We Do
          </p>
          <h2
            className="text-[#e6e6e6] text-4xl md:text-6xl font-bold tracking-tight mb-4"
            data-testid="text-services-title"
          >
            Our Services
          </h2>
          <p
            className="text-[#e6e6e6]/50 text-lg max-w-2xl mb-12 md:mb-16"
            data-testid="text-services-subtitle"
          >
            AI-powered solutions designed to automate your workflows, capture
            more leads, and accelerate growth.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.2}>
          <div
            className="flex flex-wrap gap-2 mb-10 md:mb-14"
            data-testid="tabs-services"
          >
            {servicesData.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`px-4 py-2.5 text-sm font-medium tracking-wider uppercase transition-all duration-300 rounded-md cursor-none whitespace-nowrap ${
                  activeTab === service.id
                    ? "bg-[#dc2626] text-[#e6e6e6]"
                    : "bg-[#e6e6e6]/5 text-[#e6e6e6]/60 hover:bg-[#e6e6e6]/10 hover:text-[#e6e6e6]"
                }`}
                data-hover
                data-testid={`tab-service-${service.id}`}
              >
                {service.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            data-testid={`content-service-${activeTab}`}
          >
            <div className="grid md:grid-cols-2 gap-10 md:gap-16">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#dc2626]/10 rounded-md flex items-center justify-center">
                    <activeService.icon className="w-5 h-5 text-[#dc2626]" />
                  </div>
                  <h3
                    className="text-[#e6e6e6] text-2xl md:text-3xl font-bold tracking-tight"
                    data-testid="text-service-tagline"
                  >
                    {activeService.tagline}
                  </h3>
                </div>
                <p
                  className="text-[#e6e6e6]/80 text-lg font-medium mb-4"
                  data-testid="text-service-intro"
                >
                  {activeService.content.intro}
                </p>
                <p
                  className="text-[#e6e6e6]/50 leading-relaxed mb-8"
                  data-testid="text-service-description"
                >
                  {activeService.content.description}
                </p>

                <h4 className="text-[#dc2626] text-sm tracking-[0.2em] uppercase font-medium mb-5">
                  Why Choose This?
                </h4>
                <div className="space-y-4">
                  {activeService.content.whyChoose.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-1 bg-[#dc2626]/40 rounded-full flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-[#e6e6e6] font-semibold text-sm mb-1">
                          {item.title}
                        </p>
                        <p className="text-[#e6e6e6]/50 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[#dc2626] text-sm tracking-[0.2em] uppercase font-medium mb-6">
                  How It Works
                </h4>
                <div className="space-y-6">
                  {activeService.content.howItWorks.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="relative pl-8 group"
                    >
                      <div className="absolute left-0 top-0 w-5 h-5 rounded-full border-2 border-[#dc2626]/40 flex items-center justify-center group-hover:border-[#dc2626] transition-colors duration-300">
                        <div className="w-2 h-2 rounded-full bg-[#dc2626]/60 group-hover:bg-[#dc2626] transition-colors duration-300" />
                      </div>
                      {i < activeService.content.howItWorks.length - 1 && (
                        <div className="absolute left-[9px] top-6 w-[2px] h-[calc(100%+8px)] bg-[#e6e6e6]/10" />
                      )}
                      <h5 className="text-[#e6e6e6] font-semibold mb-1.5">
                        {step.title}
                      </h5>
                      <p className="text-[#e6e6e6]/50 text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#dc2626]/30 to-transparent" />
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Discovery",
      desc: "We listen to your challenges, understand your market, and identify the automation opportunities hiding in your workflow.",
    },
    {
      num: "02",
      title: "Strategy",
      desc: "Our team architects a tailored solution — mapping out AI integrations, funnel flows, and conversion touchpoints.",
    },
    {
      num: "03",
      title: "Build",
      desc: "We deploy our AI agents, design your systems, and build custom software — all engineered for measurable results.",
    },
    {
      num: "04",
      title: "Launch & Scale",
      desc: "Go live with confidence. We monitor performance, optimize continuously, and scale with your growth.",
    },
  ];

  return (
    <section
      id="process"
      className="relative py-24 md:py-32 bg-[#e6e6e6] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <ScrollReveal direction="left">
          <p
            className="text-[#dc2626] text-sm tracking-[0.3em] uppercase font-medium mb-3"
            data-testid="text-process-label"
          >
            Our Approach
          </p>
          <h2
            className="text-[#191919] text-4xl md:text-6xl font-bold tracking-tight mb-4"
            data-testid="text-process-title"
          >
            The ASAP Process
          </h2>
          <p
            className="text-[#191919]/50 text-lg max-w-2xl mb-16"
            data-testid="text-process-subtitle"
          >
            From first conversation to full deployment, we move fast without
            cutting corners.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <ScrollReveal
              key={i}
              direction={i % 2 === 0 ? "left" : "right"}
              delay={i * 0.15}
            >
              <ParallaxSection speed={0.1 * (i + 1)}>
                <div
                  className="group relative p-6 bg-[#191919] rounded-md glow-subtle-hover transition-all duration-500 min-h-[200px]"
                  data-testid={`card-process-${step.num}`}
                >
                  <span className="text-[#dc2626] text-5xl font-bold opacity-20 absolute top-4 right-4 group-hover:opacity-40 transition-opacity duration-500">
                    {step.num}
                  </span>
                  <h3 className="text-[#e6e6e6] text-xl font-bold mb-3 mt-8">
                    {step.title}
                  </h3>
                  <p className="text-[#e6e6e6]/50 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#dc2626] group-hover:w-full transition-all duration-700" />
                </div>
              </ParallaxSection>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: "98%", label: "Client Retention" },
    { value: "5x", label: "Average ROI" },
    { value: "24/7", label: "AI Availability" },
    { value: "< 1s", label: "Response Time" },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-[#dc2626] overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="swiss-grid-line vertical"
          style={{ left: "20%", backgroundColor: "#191919" }}
        />
        <div
          className="swiss-grid-line vertical"
          style={{ left: "40%", backgroundColor: "#191919" }}
        />
        <div
          className="swiss-grid-line vertical"
          style={{ left: "60%", backgroundColor: "#191919" }}
        />
        <div
          className="swiss-grid-line vertical"
          style={{ left: "80%", backgroundColor: "#191919" }}
        />
      </div>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <ScrollReveal
              key={i}
              direction={i % 2 === 0 ? "left" : "right"}
              delay={i * 0.1}
            >
              <div className="text-center" data-testid={`stat-${i}`}>
                <p className="text-[#e6e6e6] text-4xl md:text-6xl font-bold tracking-tight mb-2">
                  {stat.value}
                </p>
                <p className="text-[#e6e6e6]/70 text-sm tracking-[0.2em] uppercase">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-[#191919] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <ScrollReveal direction="right">
            <p
              className="text-[#dc2626] text-sm tracking-[0.3em] uppercase font-medium mb-3"
              data-testid="text-about-label"
            >
              About ASAP
            </p>
            <h2
              className="text-[#e6e6e6] text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight"
              data-testid="text-about-title"
            >
              We build the systems that let you focus on what matters
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div className="space-y-6">
              <p
                className="text-[#e6e6e6]/60 leading-relaxed text-lg"
                data-testid="text-about-p1"
              >
                AspireIt Software Automation & Promotion is where cutting-edge
                AI meets practical business solutions. We don't believe in
                bloated platforms or generic tools — every solution we build is
                engineered for your specific needs.
              </p>
              <p
                className="text-[#e6e6e6]/60 leading-relaxed"
                data-testid="text-about-p2"
              >
                From reviving dead leads with our R.I.S.E. system to building
                custom software that scales with your ambitions, ASAP is the
                partner that moves as fast as you think. Our AI agents work
                around the clock so your team can focus on closing deals and
                growing your business.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="w-12 h-[2px] bg-[#dc2626]" />
                <p className="text-[#e6e6e6]/40 text-sm tracking-wider">
                  Founded on the principle that speed and quality aren't
                  mutually exclusive.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "ASAP's Front Desk service replaced our need for a full-time receptionist. Jessica handles every call like a pro.",
      // author: "Marketing Director",
      // company: "Growth Dynamics Co.",
    },
    {
      quote:
        "R.I.S.E. brought back 23% of our dead leads in the first month. That's revenue we'd completely written off.",
      // author: "VP of Sales",
      // company: "TechScale Solutions",
    },
    {
      quote:
        "The DM Dispatch service tripled our Instagram response rate overnight. Our engagement has never been higher.",
      // author: "Social Media Manager",
      // company: "BrandForce Agency",
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-[#e6e6e6] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <ScrollReveal direction="left">
          <p
            className="text-[#dc2626] text-sm tracking-[0.3em] uppercase font-medium mb-3"
            data-testid="text-testimonials-label"
          >
            Testimonials
          </p>
          <h2
            className="text-[#191919] text-4xl md:text-5xl font-bold tracking-tight mb-16"
            data-testid="text-testimonials-title"
          >
            What Our Clients Say
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <ScrollReveal
              key={i}
              direction={i % 2 === 0 ? "left" : "right"}
              delay={i * 0.15}
            >
              <ParallaxSection speed={0.05 * (i + 1)}>
                <div
                  className="bg-[#191919] p-8 rounded-md glow-subtle-hover transition-all duration-500 group relative"
                  data-testid={`card-testimonial-${i}`}
                >
                  <div className="text-[#dc2626] text-6xl font-bold opacity-20 leading-none mb-4 group-hover:opacity-40 transition-opacity duration-500">
                    &ldquo;
                  </div>
                  <p className="text-[#e6e6e6]/70 leading-relaxed mb-8 text-sm">
                    {t.quote}
                  </p>
                  <div>
                    <p className="text-[#e6e6e6] font-semibold text-sm">
                      {t.author}
                    </p>
                    <p className="text-[#e6e6e6]/40 text-xs tracking-wider">
                      {t.company}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#dc2626] group-hover:w-full transition-all duration-700" />
                </div>
              </ParallaxSection>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section
      id="cta"
      className="relative py-24 md:py-32 bg-[#191919] overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#dc2626]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#dc2626]/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[800px] mx-auto px-6 md:px-12 text-center relative z-10">
        <ScrollReveal direction="left">
          <p
            className="text-[#dc2626] text-sm tracking-[0.3em] uppercase font-medium mb-4"
            data-testid="text-cta-label"
          >
            Ready to Move?
          </p>
          <h2
            className="text-[#e6e6e6] text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight"
            data-testid="text-cta-title"
          >
            Let's Build Something
            <br />
            <span className="text-[#dc2626]">Extraordinary</span>
          </h2>
          <p
            className="text-[#e6e6e6]/50 text-lg mb-10 max-w-lg mx-auto"
            data-testid="text-cta-subtitle"
          >
            Book a free strategy session and discover how ASAP can automate your
            growth. No commitments, no pressure — just results-driven
            conversation.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.2}>
          <a
            href="https://calendar.app.google/VsFj1QWbVNASCKTm6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#dc2626] text-[#e6e6e6] px-8 py-4 text-base font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#991b1b] rounded-md animate-pulse-glow cursor-none group"
            data-hover
            data-testid="link-cta-calendar"
          >
            Book Your Free Strategy Call
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#191919] border-t border-[#e6e6e6]/10 py-12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center" data-testid="text-footer-logo">
            <span className="font-bold text-xl">
              {/* <span className="text-[#dc2626]">A</span> */}
              <span className="text-[#e6e6e6]">ASAP</span>
              {/* <span className="text-[#dc2626]">It</span> */}
            </span>
            {/* <span className="text-[#e6e6e6] font-bold text-xl ml-2">
              <span className="text-[#dc2626]">S</span>oftware
            </span>
            <span className="text-[#e6e6e6] font-bold text-xl ml-2">
              <span className="text-[#dc2626]">A</span>utomation &
            </span>
            <span className="text-[#e6e6e6] font-bold text-xl ml-2">
              <span className="text-[#dc2626]">P</span>romotion
            </span> */}
          </div>
          <p
            className="text-[#e6e6e6]/30 text-sm tracking-wider"
            data-testid="text-footer-copyright"
          >
            &copy; {new Date().getFullYear()} ASAP. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/chriscastanuela" target="_blank" rel="noopener noreferrer" className="text-[#e6e6e6]/40 hover:text-[#dc2626] transition-colors duration-300 cursor-none" data-hover data-testid="link-facebook">
              <SiFacebook className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/_thechriscast/" target="_blank" rel="noopener noreferrer" className="text-[#e6e6e6]/40 hover:text-[#dc2626] transition-colors duration-300 cursor-none" data-hover data-testid="link-instagram">
              <SiInstagram className="w-5 h-5" />
            </a>
          </div>
          <p className="text-[#e6e6e6]/20 text-xs tracking-widest uppercase">
            We can when we AspireIt
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const { cursorRef, dotRef } = useCustomCursor();

  return (
    <div className="relative">
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={dotRef} className="custom-cursor-dot hidden md:block" />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <StatsSection />
      <AboutSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  );
}
