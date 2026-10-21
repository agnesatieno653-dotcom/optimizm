import React from 'react';
import { motion } from 'motion/react';
import { AnimatedParagraph } from './AnimatedParagraph';
import { KineticHeading } from './KineticHeading';

export const AboutSection: React.FC = () => {
  return (
    <section className="about-section section-space wrap" id="about" aria-labelledby="about-title">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="eyebrow">Between the covers</p>
        <KineticHeading
          id="about-title"
          lines={[
            { text: 'A continent of' },
            { text: 'possibility.' },
            { text: 'A case for optimism.', isEm: true },
          ]}
        />
        <motion.p
          whileHover={{ x: 6 }}
          className="margin-note cursor-default"
        >
          Look closer. Question the assumptions.
          <br />
          Follow the evidence.
        </motion.p>
      </motion.div>

      <div className="blurb">
        <p className="draft-label">Back-cover blurb · proposed copy for review</p>

        {/* Lead question animated word by word */}
        <AnimatedParagraph
          text="What if optimism about Africa could be grounded in evidence?"
          as="p"
          className="lead font-serif text-[clamp(24px,2.5vw,30px)] text-[#123440] leading-snug mb-5"
          delay={0.1}
          stagger={0.03}
        />

        {/* Body paragraphs animated word by word */}
        <div className="space-y-4 text-[15px] leading-[1.85] text-[#52626a]">
          <AnimatedParagraph
            text="Across African countries, people are building businesses, developing technologies, strengthening communities and creating new possibilities. Optimistic Africa brings that progress into focus."
            delay={0.15}
            stagger={0.015}
          />

          <AnimatedParagraph
            text="Drawing on international indices, comparative data and stories from across the continent, Dr. Anand Kulkarni explores the conditions that make a better future possible, and the achievements already making it real."
            delay={0.2}
            stagger={0.015}
          />

          <AnimatedParagraph
            text="At the heart of the book is the Funnel of Optimism: a framework connecting peace, governance and solidarity to the talents, enterprise and innovation that can drive growth and prosperity."
            delay={0.25}
            stagger={0.015}
          />

          <AnimatedParagraph
            text="This is an invitation to recognise the strengths of different African countries, understand where progress is taking hold, and see what becomes possible when expectations catch up with the evidence."
            delay={0.3}
            stagger={0.015}
          />
        </div>

        <motion.a
          whileHover={{ x: 4 }}
          className="underlined-link mt-5 inline-flex items-center gap-2 group"
          href="#inside"
        >
          <span>Explore what’s inside</span>
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </motion.a>
      </div>
    </section>
  );
};
