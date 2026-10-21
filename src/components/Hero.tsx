import React from 'react';
import { motion } from 'motion/react';
import { OptimisticAfricaTitle } from './OptimisticAfricaTitle';
import { HeroBook } from './HeroBook';
import { AnimatedParagraph } from './AnimatedParagraph';

interface HeroProps {
  onOpenIntro?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenIntro }) => {
  return (
    <section className="hero wrap" id="home" aria-labelledby="book-title" style={{ backgroundColor: '#ffffff' }}>
      {/* Left Column: Hero Copy & Tight Typography */}
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="dot"></span> A new perspective, grounded in evidence
        </p>

        {/* Dynamic Title with on-enter kinetic entrance and interactive hover wave */}
        <OptimisticAfricaTitle onClick={onOpenIntro} />

        <p className="byline">
          A book by <strong>Dr. Anand Kulkarni</strong>
        </p>

        {/* Hero Deck & Description - Animated words in the paragraphs with precise editorial rhythm */}
        <AnimatedParagraph
          text="There is more reason for optimism than you might think."
          as="p"
          className="hero-deck"
          delay={0.5}
          stagger={0.03}
          interactive={true}
          highlightKeywords={true}
        />

        <AnimatedParagraph
          text="Discover the progress, innovation and opportunity shaping African countries, through the data and stories that too often go unseen."
          as="p"
          className="hero-description"
          delay={0.65}
          stagger={0.018}
          interactive={true}
          highlightKeywords={true}
        />

        {/* Actions with aligned baseline */}
        <div className="actions">
          <a className="button pink group" href="#get-book">
            <span>Get the book</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden="true">
              ↗
            </span>
          </a>
          <button className="text-button group cursor-pointer" type="button" onClick={onOpenIntro}>
            <span>Read the introduction</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden="true">
              →
            </span>
          </button>
        </div>

        <p className="hero-footnote">
          11 chapters · The Funnel of Optimism · A fresh lens on the continent
        </p>
      </div>

      {/* Right Column: Animated Front-Facing Book with Clean White Backdrop */}
      <figure className="hero-book">
        <HeroBook onOpenIntro={onOpenIntro} />

        <figcaption>
          <span>Cover concept</span>
          <a href="#about">
            Read the back cover <span aria-hidden="true">↘</span>
          </a>
        </figcaption>
      </figure>
    </section>
  );
};
