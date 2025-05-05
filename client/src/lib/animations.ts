export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut"
    }
  }
};

export const slideFromLeft = {
  hidden: { 
    x: -100, 
    opacity: 0 
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const slideFromRight = {
  hidden: { 
    x: 100, 
    opacity: 0 
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const slideFromBottom = {
  hidden: { 
    y: 100, 
    opacity: 0 
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

export const glowEffect = {
  initial: { boxShadow: "0 0 0 rgba(130, 80, 255, 0)" },
  hover: { 
    boxShadow: "0 0 15px rgba(130, 80, 255, 0.7)",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};
