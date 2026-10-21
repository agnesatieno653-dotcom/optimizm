import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KineticHeading } from './KineticHeading';
import { AutoCounter } from './AutoCounter';

// Chapter Artwork Imports
import ch01Art from '../assets/chapters/art/ch01_peace_art.jpg';
import ch02Art from '../assets/chapters/art/ch02_governance_art.jpg';
import ch03Art from '../assets/chapters/art/ch03_solidarity_art.jpg';
import ch04Art from '../assets/chapters/art/ch04_innovation_art.jpg';
import ch05Art from '../assets/chapters/art/ch05_entrepreneurship_art.jpg';
import ch06Art from '../assets/chapters/art/ch06_youth_art.jpg';
import ch07Art from '../assets/chapters/art/ch07_ict_diaspora_art.jpg';
import ch08Art from '../assets/chapters/art/ch08_diaspora_art.jpg';
import ch09Art from '../assets/chapters/art/ch09_creative_cities_art.jpg';
import ch10Art from '../assets/chapters/art/ch10_growth_prosperity_art.jpg';
import ch11Art from '../assets/chapters/art/ch11_optimism_index_art.jpg';

interface InsideSectionProps {
  onOpenIntro?: () => void;
}

type Tier = 'foundations' | 'capabilities' | 'outcomes' | 'all';

interface Chapter {
  n: number;
  tier: 'foundations' | 'capabilities' | 'outcomes';
  title: string;
  subtitle: string;
  text: string;
  quote?: string;
  keyMetric: string;
  metricLabel: string;
  art: string;
}

const CHAPTERS: Chapter[] = [
  {
    n: 1,
    tier: 'foundations',
    title: 'Peace',
    subtitle: 'Stability as the Bedrock of Investment',
    text: 'How peace is built and sustained, and why relative stability creates the confidence for people, businesses and communities to plan ahead.',
    quote: 'Without baseline stability, all economic calculations collapse into short-term hedging. Peace is an active economic asset.',
    keyMetric: '85%',
    metricLabel: 'Disputes resolved via regional continental mediation',
    art: ch01Art,
  },
  {
    n: 2,
    tier: 'foundations',
    title: 'Governance',
    subtitle: 'Institutional Reform & Rule of Law',
    text: 'A closer look at institutions, public services and reform. The chapter explores how improvements in governance can create the conditions for economic and social progress.',
    quote: 'Governance is moving from bureaucratic friction to digital transparency across forward-looking administrations.',
    keyMetric: '32+',
    metricLabel: 'Countries adopting integrated digital public registries',
    art: ch02Art,
  },
  {
    n: 3,
    tier: 'foundations',
    title: 'Solidarity',
    subtitle: 'Mutual Aid as Economic Infrastructure',
    text: 'From community giving to mutual support, this chapter explores the social ties and traditions that connect people and help build resilience.',
    quote: "From stokvels to harambee to hawalas, mutual aid is Africa's original safety net — and its financial engine, moving more money than aid or investment.",
    keyMetric: '$100B+',
    metricLabel: 'Circulating through community micro-savings networks',
    art: ch03Art,
  },
  {
    n: 4,
    tier: 'capabilities',
    title: 'Innovation & technology',
    subtitle: 'Frugal Problem-Solving & Leapfrogging',
    text: 'Innovation grows from local knowledge, practical problem-solving and new technologies. Explore the ideas and enterprises responding to everyday needs.',
    quote: 'Innovation in Africa does not mimic Silicon Valley; it solves essential, daily logistics and financial barriers from first principles.',
    keyMetric: '400+',
    metricLabel: 'Active tech hubs & incubators spanning 35 nations',
    art: ch04Art,
  },
  {
    n: 5,
    tier: 'capabilities',
    title: 'Entrepreneurship',
    subtitle: 'The Enterprise Spirit of the Continent',
    text: 'A continent shaped by everyday enterprise. This chapter examines the people creating businesses, livelihoods and opportunities, and what helps them thrive.',
    quote: 'Sub-Saharan Africa boasts the highest proportion of female entrepreneurs in the world — enterprise is a cultural reflex.',
    keyMetric: '26%',
    metricLabel: 'Female entrepreneurship rate, highest globally',
    art: ch05Art,
  },
  {
    n: 6,
    tier: 'capabilities',
    title: 'Youth',
    subtitle: 'Demographic Dividend in Real Time',
    text: 'A young population brings talent, ambition and possibilities. The chapter considers what turns that potential into a demographic dividend.',
    quote: 'With a median age under 20, Africa holds the future global workforce that will shape AI, culture, and global consumption.',
    keyMetric: '1.4B',
    metricLabel: 'Total population with over 60% under the age of 25',
    art: ch06Art,
  },
  {
    n: 7,
    tier: 'capabilities',
    title: 'ICT & Africa',
    subtitle: 'Mobile Connectivity & Cloud Leapfrogging',
    text: 'Digital connections are changing access to services and markets. Explore the role of mobile technology and connectivity in opening new possibilities.',
    quote: 'Mobile networks skipped traditional landline stages entirely, establishing Africa as the world’s mobile-money laboratory.',
    keyMetric: '650M+',
    metricLabel: 'Mobile broadband subscriptions continent-wide',
    art: ch07Art,
  },
  {
    n: 8,
    tier: 'capabilities',
    title: 'Diaspora',
    subtitle: 'The Global Connective Brain Trust',
    text: 'The diaspora connects countries and continents through capital, knowledge, culture and relationships. This chapter looks at those connections as an asset for progress.',
    quote: 'The diaspora is not a brain drain of the past, but an active, hyper-connected diaspora dividend in knowledge and capital.',
    keyMetric: '$100B+',
    metricLabel: 'Annual remittances and angel investment flow',
    art: ch08Art,
  },
  {
    n: 9,
    tier: 'capabilities',
    title: 'Creative cities',
    subtitle: 'Cultural Power, Sound & Architecture',
    text: 'Explore how cultural life, creative industries and connected cities can contribute to opportunity, community and a different understanding of the continent.',
    quote: 'Lagos, Nairobi, Dakar and Johannesburg are exporting the sounds and aesthetics defining contemporary global youth culture.',
    keyMetric: '$4.2B',
    metricLabel: 'Projected valuation of African creative industries',
    art: ch09Art,
  },
  {
    n: 10,
    tier: 'outcomes',
    title: 'Growth & prosperity',
    subtitle: 'Tangible Gains in Human Standards',
    text: 'What do stronger foundations and capabilities mean for people’s lives? This chapter examines growth, living standards and the economic outcomes behind the argument for optimism.',
    quote: 'Real optimism is measured in child survival, rising purchasing power, clean kilowatt-hours, and durable family livelihoods.',
    keyMetric: '6 of 10',
    metricLabel: "Of the world's fastest growing economies this decade",
    art: ch10Art,
  },
  {
    n: 11,
    tier: 'outcomes',
    title: 'The Optimism Index',
    subtitle: 'A Comparative Framework for 54 Nations',
    text: 'The book brings its framework together in a pilot index, offering a way to consider the conditions for optimism across the African countries it measures.',
    quote: 'The Optimism Index provides an empirical compass to track structural progress beyond traditional one-dimensional GDP metrics.',
    keyMetric: '54',
    metricLabel: 'African nations measured across Foundations & Outcomes',
    art: ch11Art,
  },
];

const DESCRIPTIONS: Record<Tier, string> = {
  foundations: 'Peace, governance and solidarity create the conditions for lasting progress.',
  capabilities: 'People, ideas and connections turn strengths into new possibilities.',
  outcomes: 'Growth and prosperity help show what progress means in people’s lives.',
  all: 'All 11 chapters, from the foundations of progress to the outcomes that reinforce optimism.',
};

// Exact colors from the Funnel of Optimism
const TIER_COLORS = {
  foundations: {
    primary: '#08798e', // Teal
    bg: '#ffffff',
    border: '#08798e',
    textOnPrimary: '#ffffff',
    accentText: '#08798e',
    glow: 'rgba(8, 121, 142, 0.18)',
  },
  capabilities: {
    primary: '#ffd537', // Sun Yellow
    bg: '#ffffff',
    border: '#f59e0b',
    textOnPrimary: '#123440',
    accentText: '#b45309',
    glow: 'rgba(245, 158, 11, 0.22)',
  },
  outcomes: {
    primary: '#d91e68', // Pink
    bg: '#ffffff',
    border: '#d91e68',
    textOnPrimary: '#ffffff',
    accentText: '#d91e68',
    glow: 'rgba(217, 30, 104, 0.18)',
  },
};

export const InsideSection: React.FC<InsideSectionProps> = ({ onOpenIntro }) => {
  const [tier, setTier] = useState<Tier>('foundations');
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  const [selectedPlate, setSelectedPlate] = useState<Chapter | null>(null);

  const visibleChapters = CHAPTERS.filter(
    (ch) => tier === 'all' || ch.tier === tier
  );

  const handleTierClick = (newTier: Tier) => {
    setTier(newTier);
    const firstOfTier = CHAPTERS.find((ch) => newTier === 'all' || ch.tier === newTier);
    if (firstOfTier) {
      setOpenIndex(firstOfTier.n);
    }
  };

  const toggleChapter = (n: number) => {
    setOpenIndex((prev) => (prev === n ? null : n));
  };

  return (
    <section className="inside-section section-space" id="inside" aria-labelledby="inside-title">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Inside the book</p>
            <KineticHeading
              id="inside-title"
              lines={[
                { text: '11 chapters.' },
                { text: 'One connected argument.', isEm: true },
              ]}
            />
          </div>
          <p>
            Progress has foundations. People turn those foundations into possibilities. The book’s Funnel of Optimism connects the two to outcomes that matter.
          </p>
        </div>

        <div className="inside-grid">
          {/* Funnel Column - Enriched & Substantially Enlarged Circular Loop Framework */}
          <div className="funnel-column flex flex-col items-center w-full max-w-[560px] mx-auto">
            <p className="small-label text-center mb-3 tracking-wider font-bold">
              Explore the Funnel of Optimism
            </p>

            {/* Enlarged Circular Framework: 3 Stages Forming a Beautiful Orbit Circle */}
            <div
              className="relative w-[360px] xs:w-[420px] sm:w-[480px] md:w-[520px] lg:w-[550px] aspect-square my-3 flex items-center justify-center select-none"
              role="group"
              aria-label="Filter chapters by the circular Funnel of Optimism"
            >
              {/* Background Circular Orbit and Directional Arcs with High-Visibility Arrowheads */}
              <svg
                viewBox="0 0 560 560"
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                aria-hidden="true"
              >
                <defs>
                  {/* Drop-shadow filter for crisp arrowheads */}
                  <filter id="arrow-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#123440" floodOpacity="0.18" />
                  </filter>
                </defs>

                {/* Base Orbit Track Ring */}
                <circle
                  cx="280"
                  cy="280"
                  r="185"
                  fill="none"
                  stroke="rgba(18, 52, 64, 0.16)"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                />

                {/* Arc 1: Top (Foundations) -> Bottom-Right (Capabilities) */}
                <path
                  d="M 383.4 126.6 A 185 185 0 0 1 464.4 259.5"
                  fill="none"
                  stroke="#08798e"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Arc 1 Arrowhead: Bold, clear point pointing clockwise to Capabilities */}
                <polygon
                  points="464.9,273.5 473.3,255.2 464.4,259.5 455.3,255.8"
                  fill="#08798e"
                  filter="url(#arrow-shadow)"
                />

                {/* Arc 2: Bottom-Right (Capabilities) -> Bottom-Left (Outcomes) */}
                <path
                  d="M 361.1 446.3 A 185 185 0 0 1 205.5 449.9"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Arc 2 Arrowhead: Bold, clear point pointing clockwise to Outcomes */}
                <polygon
                  points="193.1,443.3 213.2,443.8 205.5,449.9 204.8,459.7"
                  fill="#d97706"
                  filter="url(#arrow-shadow)"
                />

                {/* Arc 3: Bottom-Left (Outcomes) -> Top (Foundations) */}
                <path
                  d="M 95.4 267.1 A 185 185 0 0 1 170.1 130.5"
                  fill="none"
                  stroke="#d91e68"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Arc 3 Arrowhead: Bold, clear point pointing clockwise to Foundations */}
                <polygon
                  points="182.0,123.1 171.5,140.2 170.1,130.5 161.9,125.0"
                  fill="#d91e68"
                  filter="url(#arrow-shadow)"
                />
              </svg>

              {/* Center Hub Circle: Pure White Background, Active Summary & View All Toggle */}
              <div
                className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-[146px] h-[146px] sm:w-[164px] sm:h-[164px] lg:w-[174px] lg:h-[174px] rounded-full bg-white border-2 border-slate-200/90 shadow-lg flex flex-col items-center justify-center text-center p-3.5 z-20 transition-all duration-300 hover:scale-105 cursor-pointer hover:shadow-xl"
                onClick={() => handleTierClick(tier === 'all' ? 'foundations' : 'all')}
                title="Click to view all chapters"
              >
                <span
                  className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider mb-1 transition-colors duration-200"
                  style={{
                    color:
                      tier === 'foundations'
                        ? '#08798e'
                        : tier === 'capabilities'
                        ? '#d97706'
                        : tier === 'outcomes'
                        ? '#d91e68'
                        : '#123440',
                  }}
                >
                  {tier === 'foundations'
                    ? 'Stage 01'
                    : tier === 'capabilities'
                    ? 'Stage 02'
                    : tier === 'outcomes'
                    ? 'Stage 03'
                    : 'All Stages'}
                </span>
                <span className="text-[14px] sm:text-[16px] lg:text-[17px] font-serif font-bold text-[#123440] leading-snug px-1">
                  {tier === 'foundations'
                    ? 'The conditions for progress'
                    : tier === 'capabilities'
                    ? 'The strengths to build on'
                    : tier === 'outcomes'
                    ? 'The difference it makes'
                    : <><AutoCounter value={11} /> Chapters</>}
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-widest">
                  {tier === 'all' ? 'Active' : 'Click for all'}
                </span>
              </div>

              {/* 1. Node 01: Foundations (Top Center) - Teal */}
              <button
                type="button"
                onClick={() => handleTierClick('foundations')}
                aria-pressed={tier === 'foundations'}
                className={`absolute left-[50%] top-[17.0%] -translate-x-1/2 -translate-y-1/2 w-[122px] h-[122px] sm:w-[136px] sm:h-[136px] lg:w-[144px] lg:h-[144px] rounded-full flex flex-col items-center justify-center text-center p-2.5 transition-all duration-300 z-20 cursor-pointer shadow-md ${
                  tier === 'foundations'
                    ? 'bg-[#08798e] text-white shadow-2xl ring-4 ring-[#08798e]/30 scale-105'
                    : 'bg-white text-[#123440] border-2 border-[#08798e]/50 hover:border-[#08798e] hover:scale-105 hover:shadow-lg'
                }`}
              >
                <span className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider opacity-85">01</span>
                <strong className="text-[16px] sm:text-[18px] lg:text-[19px] font-serif font-bold leading-tight mt-0.5">Foundations</strong>
                <span className="text-[10px] sm:text-[11px] mt-0.5 opacity-80 font-medium"><AutoCounter value={3} /> Chapters</span>
              </button>

              {/* 2. Node 02: Capabilities (Bottom Right) - Sun Yellow / Amber */}
              <button
                type="button"
                onClick={() => handleTierClick('capabilities')}
                aria-pressed={tier === 'capabilities'}
                className={`absolute left-[78.6%] top-[66.5%] -translate-x-1/2 -translate-y-1/2 w-[122px] h-[122px] sm:w-[136px] sm:h-[136px] lg:w-[144px] lg:h-[144px] rounded-full flex flex-col items-center justify-center text-center p-2.5 transition-all duration-300 z-20 cursor-pointer shadow-md ${
                  tier === 'capabilities'
                    ? 'bg-[#ffd537] text-[#123440] shadow-2xl ring-4 ring-[#ffd537]/50 scale-105'
                    : 'bg-white text-[#123440] border-2 border-[#d97706]/50 hover:border-[#d97706] hover:scale-105 hover:shadow-lg'
                }`}
              >
                <span className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider opacity-85">02</span>
                <strong className="text-[16px] sm:text-[18px] lg:text-[19px] font-serif font-bold leading-tight mt-0.5">Capabilities</strong>
                <span className="text-[10px] sm:text-[11px] mt-0.5 opacity-80 font-medium"><AutoCounter value={6} /> Chapters</span>
              </button>

              {/* 3. Node 03: Outcomes (Bottom Left) - Pink */}
              <button
                type="button"
                onClick={() => handleTierClick('outcomes')}
                aria-pressed={tier === 'outcomes'}
                className={`absolute left-[21.4%] top-[66.5%] -translate-x-1/2 -translate-y-1/2 w-[122px] h-[122px] sm:w-[136px] sm:h-[136px] lg:w-[144px] lg:h-[144px] rounded-full flex flex-col items-center justify-center text-center p-2.5 transition-all duration-300 z-20 cursor-pointer shadow-md ${
                  tier === 'outcomes'
                    ? 'bg-[#d91e68] text-white shadow-2xl ring-4 ring-[#d91e68]/30 scale-105'
                    : 'bg-white text-[#123440] border-2 border-[#d91e68]/50 hover:border-[#d91e68] hover:scale-105 hover:shadow-lg'
                }`}
              >
                <span className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider opacity-85">03</span>
                <strong className="text-[16px] sm:text-[18px] lg:text-[19px] font-serif font-bold leading-tight mt-0.5">Outcomes</strong>
                <span className="text-[10px] sm:text-[11px] mt-0.5 opacity-80 font-medium"><AutoCounter value={2} /> Chapters</span>
              </button>
            </div>

            <button
              type="button"
              className="text-button view-all cursor-pointer mt-4 font-semibold text-sm"
              data-tier="all"
              aria-pressed={tier === 'all'}
              onClick={() => handleTierClick('all')}
            >
              View all 11 chapters <span aria-hidden="true">→</span>
            </button>

            <p className="framework-note text-center mt-3 text-xs leading-relaxed max-w-[340px]">
              Foundations enable capabilities.
              <br />
              Capabilities generate outcomes.
              <br />
              Outcomes reinforce optimism.
            </p>
          </div>

          {/* Chapter Column - Rich Chapter Cards with Artwork, Key Evidence & Quote */}
          <div className="chapter-column">
            <p
              key={tier}
              id="chapter-description"
              className="chapter-description"
              aria-live="polite"
              style={{
                animation: 'textSlideUp 0.3s ease-out',
                borderLeft:
                  tier !== 'all'
                    ? `4px solid ${TIER_COLORS[tier].border}`
                    : '4px solid #12344030',
                paddingLeft: '14px',
                color: '#123440',
                fontWeight: 500,
                transition: 'border-color 0.3s ease',
              }}
            >
              {DESCRIPTIONS[tier]}
            </p>

            <div id="chapter-list">
              {visibleChapters.map((chapter) => {
                const isOpen = openIndex === chapter.n;
                const colors = TIER_COLORS[chapter.tier];

                return (
                  <div
                    key={chapter.n}
                    className={`chapter tier-${chapter.tier} transition-all duration-300 rounded-lg overflow-hidden border`}
                    id={`chapter-${chapter.n}`}
                    style={{
                      backgroundColor: '#ffffff',
                      borderColor: isOpen ? colors.border : '#12344020',
                      borderLeft: isOpen
                        ? `4px solid ${colors.border}`
                        : '4px solid transparent',
                      marginBottom: isOpen ? '12px' : '4px',
                      marginTop: isOpen ? '8px' : '4px',
                      boxShadow: isOpen
                        ? `0 6px 24px ${colors.glow}`
                        : '0 1px 3px rgba(18, 52, 64, 0.04)',
                    }}
                  >
                    {/* Chapter Header Trigger */}
                    <div
                      onClick={() => toggleChapter(chapter.n)}
                      className="cursor-pointer flex items-center justify-between p-4 transition-colors hover:bg-slate-50/80"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleChapter(chapter.n);
                        }
                      }}
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3">
                        {/* Chapter Number Badge in the exact tier color */}
                        <span
                          className="chapter-number font-bold text-xs px-2.5 py-0.5 rounded-full transition-all duration-200"
                          style={{
                            backgroundColor: isOpen ? colors.primary : 'rgba(18, 52, 64, 0.08)',
                            color: isOpen ? colors.textOnPrimary : 'var(--muted)',
                            border: isOpen
                              ? `1px solid ${colors.border}`
                              : '1px solid transparent',
                          }}
                        >
                          {String(chapter.n).padStart(2, '0')}
                        </span>

                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className="chapter-title text-base sm:text-lg font-serif"
                              style={{
                                color: isOpen ? '#123440' : 'inherit',
                                fontWeight: isOpen ? 600 : 400,
                              }}
                            >
                              {chapter.title}
                            </span>

                            {/* Tier Accent Dot when open */}
                            {isOpen && (
                              <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: colors.primary }}
                                aria-hidden="true"
                              />
                            )}
                          </div>
                          <span className="text-xs text-[#52626a] font-sans block mt-0.5">
                            {chapter.subtitle}
                          </span>
                        </div>
                      </div>

                      <span
                        className="text-xl font-light font-sans ml-3 transition-transform duration-200 text-[#123440]"
                        aria-hidden="true"
                      >
                        {isOpen ? '−' : '+'}
                      </span>
                    </div>

                    {/* Chapter Body with Artwork Plate, Key Evidence Metric & Quote */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="border-t border-slate-100 p-4 sm:p-5"
                          style={{ backgroundColor: '#ffffff' }}
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
                            {/* Chapter Artwork Preview Card */}
                            <div
                              className="sm:col-span-4 relative group cursor-pointer"
                              onClick={() => setSelectedPlate(chapter)}
                              title="Click to view full chapter plate"
                            >
                              <div className="aspect-[4/3] rounded-md overflow-hidden shadow-xs border border-slate-200 bg-white">
                                <img
                                  src={chapter.art}
                                  alt={`Artwork plate for Chapter ${chapter.n}: ${chapter.title}`}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  loading="lazy"
                                />
                              </div>
                              <span className="absolute bottom-1.5 right-1.5 bg-[#123440]/85 text-white text-[9px] font-mono px-1.5 py-0.5 rounded backdrop-blur-xs">
                                Enlarge Plate ↗
                              </span>
                            </div>

                            {/* Chapter Insights, Key Evidence & Quote */}
                            <div className="sm:col-span-8 flex flex-col justify-between">
                              <p className="text-sm text-[#52626a] leading-relaxed mb-3">
                                {chapter.text}
                              </p>

                              {/* Key Evidence Callout Box - Pure White Background */}
                              <div className="p-3 rounded-md bg-white border border-slate-200 mb-3 flex items-center justify-between gap-3 shadow-xs">
                                <div>
                                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#52626a] block">
                                    Key Evidence
                                  </span>
                                  <span className="text-xs text-[#123440] font-medium">
                                    {chapter.metricLabel}
                                  </span>
                                </div>
                                <span className="text-lg font-bold font-mono text-[#08798e] shrink-0">
                                  <AutoCounter value={chapter.keyMetric} />
                                </span>
                              </div>

                              {chapter.quote && (
                                <blockquote
                                  className="font-serif italic text-xs text-[#123440] leading-relaxed mb-3 p-3 rounded-md bg-white border-l-3 shadow-xs"
                                  style={{
                                    borderLeftColor: colors.primary,
                                    border: '1px solid #e2e8f0',
                                    borderLeftWidth: '3px',
                                  }}
                                >
                                  &ldquo;{chapter.quote}&rdquo;
                                </blockquote>
                              )}

                              <div className="flex items-center gap-4 text-xs font-semibold pt-1">
                                <button
                                  type="button"
                                  onClick={() => setSelectedPlate(chapter)}
                                  className="transition-colors cursor-pointer text-[#08798e] hover:text-[#d91e68]"
                                >
                                  View Full Chapter Plate →
                                </button>
                                <a
                                  href="#get-book"
                                  onClick={onOpenIntro}
                                  className="transition-colors text-[#123440] hover:text-[#d91e68]"
                                >
                                  Read more in the book →
                                </a>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Lightbox Modal: Full Chapter Plate Inspector */}
        <AnimatePresence>
          {selectedPlate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#123440]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
              onClick={() => setSelectedPlate(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 16 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 16 }}
                className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-xs z-10">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#08798e] bg-slate-100 px-2 py-0.5 rounded">
                      Plate {String(selectedPlate.n).padStart(2, '0')} of 11
                    </span>
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#52626a]">
                      Tier: {selectedPlate.tier}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedPlate(null)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-black hover:bg-slate-100 cursor-pointer font-bold text-sm"
                  >
                    ✕
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 bg-white">
                  {/* Full High-Resolution Chapter Artwork */}
                  <div className="rounded-lg overflow-hidden shadow-md border border-slate-200 mb-6 max-h-[460px] flex items-center justify-center bg-slate-50">
                    <img
                      src={selectedPlate.art}
                      alt={`Chapter Plate: ${selectedPlate.title}`}
                      className="max-h-[460px] w-auto object-contain mx-auto"
                    />
                  </div>

                  <div className="mb-4">
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#123440] mb-1">
                      Chapter {selectedPlate.n}: {selectedPlate.title}
                    </h3>
                    <p className="text-sm font-medium text-[#b45309] mb-3">
                      {selectedPlate.subtitle}
                    </p>
                    <p className="text-sm text-[#52626a] leading-relaxed mb-4">
                      {selectedPlate.text}
                    </p>
                  </div>

                  {/* Metric Ribbon */}
                  <div className="p-4 rounded-lg bg-white border border-slate-200 flex items-center justify-between mb-4 shadow-xs">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-bold text-[#52626a] block">
                        Core Indicator
                      </span>
                      <span className="text-sm text-[#123440] font-medium">
                        {selectedPlate.metricLabel}
                      </span>
                    </div>
                    <span className="text-2xl font-mono font-bold text-[#08798e]">
                      <AutoCounter value={selectedPlate.keyMetric} />
                    </span>
                  </div>

                  {selectedPlate.quote && (
                    <blockquote className="p-4 rounded-lg bg-white border border-slate-200 border-l-4 border-l-[#08798e] font-serif italic text-sm text-[#123440] leading-relaxed mb-6 shadow-xs">
                      &ldquo;{selectedPlate.quote}&rdquo;
                    </blockquote>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setSelectedPlate(null)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-black cursor-pointer"
                    >
                      Close Plate
                    </button>
                    <a
                      href="#get-book"
                      onClick={() => {
                        setSelectedPlate(null);
                        if (onOpenIntro) onOpenIntro();
                      }}
                      className="button dark small"
                    >
                      Read in Manuscript ↗
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
