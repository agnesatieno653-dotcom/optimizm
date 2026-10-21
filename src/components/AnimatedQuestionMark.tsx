import React from 'react';
import { motion } from 'motion/react';

interface AnimatedQuestionMarkProps {
  className?: string;
}

export const AnimatedQuestionMark: React.FC<AnimatedQuestionMarkProps> = ({ className = '' }) => {
  return (
    <motion.div
      className={`relative inline-block select-none cursor-pointer group ${className}`}
      whileHover={{ scale: 1.06, rotate: [-2, 3, -1] }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.3 }}
      title="Interactive quiz companion"
    >
      <svg
        width="160"
        height="180"
        viewBox="0 0 160 180"
        className="overflow-visible drop-shadow-md"
        aria-hidden="true"
      >
        <defs>
          {/* Rich Vibrant Pink Gradient */}
          <linearGradient id="qm-pink-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4088" />
            <stop offset="55%" stopColor="#d91e68" />
            <stop offset="100%" stopColor="#9e0e47" />
          </linearGradient>

          {/* Dot Glow Gradient */}
          <radialGradient id="qm-dot-grad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ff5c9d" />
            <stop offset="60%" stopColor="#d91e68" />
            <stop offset="100%" stopColor="#9e0e47" />
          </radialGradient>
        </defs>

        {/* Floating Question Mark Hook & Face */}
        <motion.g
          animate={{
            y: [0, -7, 0],
            rotate: [-1, 2, -1],
          }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: '80px 75px' }}
        >
          {/* Main Question Mark Hook Stroke */}
          <path
            d="M 52 64 C 45 36 66 16 92 16 C 118 16 138 34 135 58 C 132 76 116 88 102 100 C 90 110 82 118 82 130"
            fill="none"
            stroke="url(#qm-pink-grad)"
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Glossy Upper Highlight */}
          <path
            d="M 64 45 C 72 28 88 24 104 26"
            fill="none"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Cartoon Eyes */}
          <g id="qm-eyes">
            {/* Left Eye */}
            <ellipse cx="98" cy="48" rx="6.5" ry="8.5" fill="#ffffff" stroke="#123440" strokeWidth="1.2" />
            <motion.ellipse
              cx="100"
              cy="48"
              rx="3.5"
              ry="4.5"
              fill="#123440"
              animate={{
                scaleY: [1, 1, 0.1, 1],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                times: [0, 0.85, 0.9, 1],
              }}
            />
            <circle cx="101.5" cy="46" r="1.4" fill="#ffffff" />

            {/* Right Eye */}
            <ellipse cx="114" cy="51" rx="6" ry="8" fill="#ffffff" stroke="#123440" strokeWidth="1.2" />
            <motion.ellipse
              cx="116"
              cy="51"
              rx="3.2"
              ry="4.2"
              fill="#123440"
              animate={{
                scaleY: [1, 1, 0.1, 1],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                times: [0, 0.85, 0.9, 1],
              }}
            />
            <circle cx="117.5" cy="49" r="1.3" fill="#ffffff" />

            {/* Cute Cartoon Eyebrows */}
            <path d="M 94 38 Q 101 37 105 40" fill="none" stroke="#123440" strokeWidth="2" strokeLinecap="round" />
            <path d="M 111 41 Q 117 39 121 42" fill="none" stroke="#123440" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Cheerful Cartoon Smile */}
          <path
            d="M 103 63 Q 110 70 118 64"
            fill="none"
            stroke="#123440"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </motion.g>

        {/* Single Centered Question Mark Dot (Directly underneath the stem) */}
        <motion.g
          animate={{
            scale: [1, 1.08, 1],
            y: [0, -3, 0],
          }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.2,
          }}
          style={{ transformOrigin: '82px 160px' }}
        >
          {/* Main Dot Circle */}
          <circle
            cx="82"
            cy="160"
            r="12"
            fill="url(#qm-dot-grad)"
            stroke="rgba(18, 52, 64, 0.15)"
            strokeWidth="1"
          />
          {/* Dot Gloss Highlight */}
          <circle cx="78" cy="156" r="3.5" fill="rgba(255, 255, 255, 0.55)" />
        </motion.g>
      </svg>
    </motion.div>
  );
};
