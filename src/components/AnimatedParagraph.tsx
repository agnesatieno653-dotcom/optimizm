import React from 'react';
import { motion } from 'motion/react';

interface AnimatedParagraphProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: 'p' | 'div' | 'span';
  interactive?: boolean;
  highlightKeywords?: boolean;
}

const HIGHLIGHT_WORDS = new Set([
  'optimism',
  'optimistic',
  'progress',
  'innovation',
  'opportunity',
  'evidence',
  'possibility',
  'prosperity',
  'peace',
  'governance',
  'solidarity',
  'talents',
  'enterprise',
  'growth',
  'achievements',
  'strengths',
]);

export const AnimatedParagraph: React.FC<AnimatedParagraphProps> = ({
  text,
  className = '',
  delay = 0.05,
  stagger = 0.022,
  as = 'p',
  interactive = true,
  highlightKeywords = true,
}) => {
  const words = text.split(/\s+/).filter(Boolean);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 12,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.42,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const Component = motion[as];

  return (
    <Component
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={`leading-relaxed select-text ${className}`}
    >
      {words.map((rawWord, index) => {
        // Strip punctuation for keyword check
        const cleanWord = rawWord.toLowerCase().replace(/[^a-z]/g, '');
        const isKeyword = highlightKeywords && HIGHLIGHT_WORDS.has(cleanWord);

        return (
          <motion.span
            variants={child}
            key={index}
            whileHover={
              interactive
                ? {
                    y: -2.5,
                    scale: 1.05,
                    transition: { duration: 0.15, ease: 'easeOut' },
                  }
                : undefined
            }
            className={`inline-block mr-[0.28em] will-change-transform ${
              interactive ? 'cursor-default transition-colors duration-150' : ''
            } ${
              isKeyword
                ? 'font-medium text-[#123440] hover:text-[#d91e68] border-b border-transparent hover:border-[#d91e68]'
                : 'hover:text-[#08798e]'
            }`}
          >
            {rawWord}
          </motion.span>
        );
      })}
    </Component>
  );
};
