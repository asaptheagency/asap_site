// Enhanced fade-in animation with more dramatic opacity change
export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 1.0,
      ease: "easeInOut"
    }
  }
};

// Enhanced slide animations with more dramatic fade effects
export const slideFromLeft = {
  hidden: { 
    x: -100, 
    opacity: 0 
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1.0,
      bounce: 0.2,
      opacity: { duration: 1.2, ease: "easeInOut" },
      x: { duration: 0.9, ease: [0.17, 0.55, 0.55, 1] }
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
      type: "spring",
      duration: 1.0,
      bounce: 0.2,
      opacity: { duration: 1.2, ease: "easeInOut" },
      x: { duration: 0.9, ease: [0.17, 0.55, 0.55, 1] }
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
      type: "spring",
      duration: 1.0,
      bounce: 0.2,
      opacity: { duration: 1.2, ease: "easeInOut" },
      y: { duration: 0.9, ease: [0.17, 0.55, 0.55, 1] }
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

// New: Scale and fade animation for cards and feature sections
export const fadeInScale = {
  hidden: { 
    opacity: 0, 
    scale: 0.9
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      scale: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        restDelta: 0.001
      },
      opacity: { duration: 1.2, ease: "easeInOut" }
    }
  }
};

// New: Staggered fade-in for list items and grid elements
export const staggerFadeIn = {
  hidden: { opacity: 0 },
  show: (custom: number = 0) => ({
    opacity: 1,
    transition: {
      delay: custom * 0.15,
      duration: 0.8,
      ease: "easeInOut"
    }
  })
};
