import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

interface OptimisticAfricaTitleProps {
  className?: string;
  onClick?: () => void;
}

export const OptimisticAfricaTitle: React.FC<OptimisticAfricaTitleProps> = ({ className = '', onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const word1 = 'Optimistic'.split('');
  const word2 = 'Africa.'.split('');

  // Trigger celebratory confetti on click
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) onClick();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 30,
      spread: 55,
      origin: { x, y },
      colors: ['#d91e68', '#08798e', '#ffd537', '#ff528d'],
      disableForReducedMotion: true,
    });
  };

  return (
    <h1
      id="book-title"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`cursor-pointer select-none font-serif ${className}`}
      style={{
        letterSpacing: '-0.045em',
        marginBottom: '26px',
        overflow: 'visible',
      }}
    >
      {/* 1. "Optimistic" with Staggered 3D Fold-Down Entrance and Wave Ripple */}
      <span
        className="block text-[#123440] overflow-visible"
        style={{
          fontSize: 'clamp(62px, 7.8vw, 104px)',
          lineHeight: 0.96,
          overflow: 'visible',
        }}
      >
        {word1.map((char, i) => (
          <motion.span
            key={`opt-${i}`}
            initial={{ opacity: 0, y: 35, rotateX: -80, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 0.6,
              delay: 0.08 + i * 0.025,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              y: -8,
              scale: 1.08,
              color: '#08798e',
              transition: { duration: 0.15 },
            }}
            className="inline-block will-change-transform transform-gpu transition-colors duration-150 overflow-visible"
            style={{ perspective: '600px', transformOrigin: '50% 100%', overflow: 'visible' }}
          >
            {char}
          </motion.span>
        ))}
      </span>

      {/* 2. "Africa." closely nestled under "Optimistic" as shown in reference */}
      <em
        className="block not-italic relative z-10 overflow-visible"
        style={{
          fontSize: 'clamp(64px, 8.0vw, 108px)',
          lineHeight: 0.98,
          marginTop: '-4px',
          overflow: 'visible',
        }}
      >
        {word2.map((char, i) => {
          const isPeriod = char === '.';
          return (
            <motion.span
              key={`afr-${i}`}
              initial={{
                opacity: 0,
                scale: 0.75,
                y: 28,
                filter: 'blur(4px)',
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: 'blur(0px)',
              }}
              transition={{
                duration: 0.55,
                delay: 0.35 + i * 0.03,
                type: 'spring',
                stiffness: 170,
                damping: 14,
              }}
              whileHover={{
                y: -6,
                scale: 1.08,
                color: '#b80e54',
                rotate: i % 2 === 0 ? 2 : -2,
                transition: { duration: 0.15 },
              }}
              className={`inline-block overflow-visible will-change-transform transform-gpu text-[#d91e68] ${
                isPeriod ? 'not-italic ml-0.5' : 'italic'
              }`}
              style={{
                overflow: 'visible',
                display: 'inline-block',
                verticalAlign: 'baseline',
              }}
            >
              {char}
            </motion.span>
          );
        })}
      </em>
    </h1>
  );
};
