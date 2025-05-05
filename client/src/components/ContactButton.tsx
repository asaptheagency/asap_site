import { slideFromBottom } from "../lib/animations";
import { motion } from "framer-motion";

interface ContactButtonProps {
  className?: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({ className = "" }) => {
  return (
    <motion.div
      className={`flex justify-center my-8 ${className}`}
      variants={slideFromBottom}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <a 
        href="https://calendar.app.google/nuQzaVZ8opKfm8bo8" 
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-white transition-all duration-300 bg-accent rounded-lg group hover:bg-accent/90 glow-hover"
      >
        <span className="relative flex items-center gap-2">
          Contact Us 
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </span>
      </a>
    </motion.div>
  );
};

export default ContactButton;