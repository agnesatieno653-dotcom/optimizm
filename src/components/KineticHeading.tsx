import React from 'react';
import { motion } from 'motion/react';

export interface KineticLine {
  text: string;
  isEm?: boolean;
  italic?: boolean;
}

interface KineticHeadingProps {
  id?: string;
  className?: string;
  lines: KineticLine[];
  delay?: number;
}

export const KineticHeading: React.FC<KineticHeadingProps> = ({
  id,
  className = '',
  lines,
  delay = 0.08,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.065,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 26,
      rotateX: -30,
      filter: 'blur(5px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.62,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.h2
      id={id}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`font-serif select-none overflow-visible ${className}`}
      style={{ perspective: '800px' }}
    >
      {lines.map((line, lineIdx) => {
        const words = line.text.split(' ').filter(Boolean);
        const shouldItalic = line.isEm && line.italic !== false;

        return (
          <span key={`line-${lineIdx}`} className="block overflow-visible leading-[1.04]">
            {words.map((word, wordIdx) => (
              <motion.span
                key={`word-${lineIdx}-${wordIdx}`}
                variants={wordVariants}
                whileHover={{
                  y: -4,
                  scale: 1.05,
                  transition: { duration: 0.16, ease: 'easeOut' },
                }}
                className={`inline-block mr-[0.24em] will-change-transform transform-gpu cursor-default transition-colors duration-150 ${
                  line.isEm
                    ? `${shouldItalic ? 'italic' : 'not-italic font-normal'} text-[var(--teal,#08798e)] hover:text-[#d91e68]`
                    : 'text-[var(--ink,#123440)] hover:text-[var(--teal,#08798e)]'
                }`}
                style={{
                  transformOrigin: '50% 100%',
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        );
      })}
    </motion.h2>
  );
};
