import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "@/styles/Container.module.css";

/* Framer motion variants */
const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0.75,
    transition: { duration: 0.8, delay: 0.1 }, // Removed delay so "Hello" appears immediately
  },
};

const wordAnimation = {
  initial: {
    opacity: 0,
    y: 10, // Slight upward movement for subtle effect
  },
  animate: {
    opacity: 0.75,
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    },
  },
  exit: {
    opacity: 0,
    y: -10, // Slight downward movement for subtle effect
    transition: { 
      duration: 0.4, 
      ease: "easeIn" 
    },
  },
};

const slideUp = {
  initial: {
    top: 0,
  },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }, // Reduced delay from 0.2 to 0.1
  },
};

const words = [
  "Hello",
  "Bonjour", // Hello in French
  "नमस्ते", // Namaste in Hindi
  "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ", // Sat Sri Akal in Punjabi
  
];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Set dimensions immediately
    setDimension({ width: window.innerWidth, height: window.innerHeight });
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady || index == words.length - 1) return;
    
    // First word shows immediately, others have 800ms delay
    const delay = index === 0 ? 100 : 800;
    
    const timer = setTimeout(() => {
      setIndex(index + 1);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [index, isReady]);

  const initialPath = `M0 0 L${dimension.width || 1000} 0 L${dimension.width || 1000} ${dimension.height || 1000} Q${(dimension.width || 1000) / 2} ${(dimension.height || 1000) + 300} 0 ${dimension.height || 1000}  L0 0`;
  const targetPath = `M0 0 L${dimension.width || 1000} 0 L${dimension.width || 1000} ${dimension.height || 1000} Q${(dimension.width || 1000) / 2} ${dimension.height || 1000} 0 ${dimension.height || 1000}  L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }, // Reduced delay from 0.3 to 0.2
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className={styles.introduction}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={words[index]}
          variants={wordAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <span></span>
          {words[index]}
        </motion.p>
      </AnimatePresence>
      <svg>
        <motion.path
          variants={curve}
          initial="initial"
          exit="exit"
        ></motion.path>
      </svg>
    </motion.div>
  );
}
