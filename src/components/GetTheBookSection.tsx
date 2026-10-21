import React from 'react';
import { Book3D360Yellow } from './Book3D360Yellow';
import { AnimatedParagraph } from './AnimatedParagraph';

interface GetTheBookSectionProps {
  onOpenIntro?: () => void;
}

export const GetTheBookSection: React.FC<GetTheBookSectionProps> = ({ onOpenIntro }) => {
  return (
    <section className="get-book-section section-space relative overflow-hidden" id="get-book" aria-labelledby="get-book-title">
      {/* Decorative ambient background */}
      <div
        className="absolute -left-24 -top-24 w-80 h-80 bg-white/20 rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="wrap get-book-grid">
        {/* 360-Degree Rotating 3D Book on Yellow Background */}
        <div className="flex flex-col items-center justify-center">
          <Book3D360Yellow onOpenIntro={onOpenIntro} />
        </div>

        <div>
          <p className="eyebrow">Get the book</p>
          <h2 id="get-book-title">
            See the evidence
            <br />
            <em>for yourself.</em>
          </h2>
          <p className="font-bold text-[#123440] mt-3">
            <strong>Optimistic Africa</strong>
            <br />
            <span className="font-normal text-sm text-[#384e46]">By Dr. Anand Kulkarni</span>
          </p>

          <div className="my-4">
            <AnimatedParagraph
              text="Start with the introduction, or download the full manuscript for private review."
              as="p"
              className="get-book-description text-[15px] text-[#123440]"
              delay={0.1}
            />
          </div>

          <div className="actions flex items-center gap-4 flex-wrap">
            <a
              className="button dark group"
              href="/assets/optimistic-africa-review-edition.pdf"
              download="Optimistic-Africa-Review-Edition.pdf"
            >
              <span>Download review edition</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true">
                ↓
              </span>
            </a>
            <button type="button" className="text-button group cursor-pointer" onClick={onOpenIntro}>
              <span>Read an introduction</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </button>
          </div>

          <p className="availability">
            <strong>Private review edition · PDF</strong>
            <br />
            Publication details and purchase links are awaiting confirmation.
          </p>
        </div>
      </div>
    </section>
  );
};
