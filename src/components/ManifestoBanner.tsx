import React, { useState } from 'react';
import { motion } from 'motion/react';

export const ManifestoBanner: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const items = [
    'Beyond the narrative.',
    'Backed by evidence.',
    'Driven by possibility.',
    'The Funnel of Optimism.',
    'Peace · Governance · Solidarity.',
    'Talent · Enterprise · Innovation.',
  ];

  return (
    <div
      className="manifesto overflow-hidden relative cursor-default select-none border-y border-[#163542]/15 bg-[#ffd537]"
      aria-label="The book's approach"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex w-fit whitespace-nowrap py-4 sm:py-5">
        <motion.div
          animate={{ x: isHovered ? '-25%' : '-50%' }}
          transition={{
            ease: 'linear',
            duration: isHovered ? 45 : 24,
            repeat: Infinity,
          }}
          className="flex items-center gap-8 sm:gap-12 shrink-0 font-bold text-xs sm:text-sm tracking-wide text-[#123440]"
        >
          {/* Double list for seamless marquee loop */}
          {[...items, ...items, ...items].map((phrase, idx) => (
            <React.Fragment key={idx}>
              <span className="hover:text-[#d91e68] transition-colors">{phrase}</span>
              <span
                className="text-xl sm:text-2xl text-[#08798e] inline-block animate-[sunburstSpin_20s_linear_infinite]"
                aria-hidden="true"
              >
                ✳
              </span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
