import React from 'react';
import { motion } from 'motion/react';
import { AnimatedParagraph } from './AnimatedParagraph';

interface AuthorSectionProps {
  onOpenIntro?: () => void;
}

export const AuthorSection: React.FC<AuthorSectionProps> = ({ onOpenIntro }) => {
  return (
    <section className="author-section section-space relative overflow-hidden" id="author" aria-labelledby="author-title">
      <div className="wrap author-grid">
        {/* Animated Circle Container */}
        <div className="relative max-w-[370px] w-full mx-auto select-none">
          {/* Subtle Ambient Backing Glow */}
          <motion.div
            animate={{
              scale: [1, 1.06, 1],
              opacity: [0.35, 0.55, 0.35],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-2 rounded-full bg-gradient-to-tr from-[#08798e]/30 via-transparent to-[#ffd537]/20 blur-2xl pointer-events-none"
          />

          {/* The Animated Circle */}
          <motion.div
            className="author-mark cursor-pointer group relative overflow-visible"
            onClick={onOpenIntro}
            title="Click to read the introduction"
            animate={{
              y: [0, -7, 0],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{
              scale: 1.035,
              boxShadow: '0 0 35px rgba(255, 213, 55, 0.18)',
              transition: { duration: 0.3 },
            }}
          >
            {/* Orbiting Circumference Ring & Light Pulse */}
            <svg
              className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none -z-10"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              {/* Outer Dashed Orbit Track */}
              <circle
                cx="50"
                cy="50"
                r="49"
                fill="none"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="0.6"
                strokeDasharray="2.5 3.5"
              />
              {/* Glowing Orbiting Light Streak */}
              <motion.circle
                cx="50"
                cy="50"
                r="49"
                fill="none"
                stroke="#ffd537"
                strokeWidth="1.2"
                strokeDasharray="16 295"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: 'center' }}
              />
              {/* Secondary Teal Pulse Streak */}
              <motion.circle
                cx="50"
                cy="50"
                r="49"
                fill="none"
                stroke="#08798e"
                strokeWidth="1.2"
                strokeDasharray="12 299"
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: 'center' }}
              />
            </svg>

            {/* Child 1: The Pink Asterisk Star - Smooth Continuous 360° Rotation */}
            <motion.span
              className="author-star pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              ✳
            </motion.span>

            {/* Child 2: "Ideas change outlooks." typography with gold emphasis */}
            <motion.span
              style={{
                font: 'clamp(36px, 4.4vw, 48px)/1.02 var(--serif, Georgia, serif)',
                letterSpacing: '-0.03em',
              }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              Ideas<br />
              change<br />
              <motion.em
                animate={{
                  color: ['#ffd537', '#ffe57f', '#ffd537'],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="not-italic"
              >
                outlooks.
              </motion.em>
            </motion.span>

            {/* Child 3: Caption */}
            <small>The thinking behind the book</small>
          </motion.div>
        </div>

        {/* Author Copy */}
        <div className="author-copy">
          <p className="eyebrow">The author</p>
          <h2 id="author-title">Dr. Anand Kulkarni</h2>
          <h3>Why he wrote <em>Optimistic Africa</em></h3>

          <div className="space-y-4 my-5">
            <AnimatedParagraph
              text="The book starts with a question: are the conditions for long-term optimism strengthening across African countries?"
              as="p"
              delay={0.15}
              stagger={0.015}
            />
            <AnimatedParagraph
              text="Dr. Kulkarni brings together data, comparative analysis and structural trends to explore that question. His argument is that optimism can shape the decisions people make, the businesses they build and the futures they invest in."
              as="p"
              delay={0.2}
              stagger={0.015}
            />
            <AnimatedParagraph
              text="By tracing the links between foundations, capabilities and outcomes, he offers readers a framework for understanding where progress is happening and what can sustain it."
              as="p"
              delay={0.25}
              stagger={0.015}
            />
          </div>

          <p className="author-source">An editorial summary based on the manuscript’s introduction.</p>

          <button type="button" className="text-button light-link cursor-pointer" onClick={onOpenIntro}>
            Read his introduction <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
