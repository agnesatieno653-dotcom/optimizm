import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { KineticHeading } from './KineticHeading';
import { AnimatedQuestionMark } from './AnimatedQuestionMark';
import { AutoCounter } from './AutoCounter';

interface Question {
  chapter: number;
  tier: 'Introduction' | 'Foundations' | 'Capabilities' | 'Outcomes';
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  source: string;
}

const QUESTIONS: Question[] = [
  {
    chapter: 0,
    tier: 'Introduction',
    prompt: 'What is the book’s case for optimism grounded in?',
    options: [
      'Hope and good intentions alone',
      'Evidence, comparative data and structural trends',
      'A single success story generalized to the whole continent',
    ],
    answer: 1,
    explanation: 'The introduction sets out a case for disciplined optimism — not naive cheerfulness, but an argument grounded in rigorous data, comparative analysis and long-term structural trends.',
    source: 'Introduction · Optimistic Africa',
  },
  {
    chapter: 1,
    tier: 'Foundations',
    prompt: 'Which three elements form the Foundations of the Funnel of Optimism?',
    options: [
      'Peace, governance and solidarity',
      'Tourism, trade and transportation networks',
      'Megacities, pop culture and spectator sports',
    ],
    answer: 0,
    explanation: 'Peace, governance and solidarity create the institutional and social conditions in which human capabilities can flourish and progress can endure.',
    source: 'Chapter 1–3 · Foundations of Progress',
  },
  {
    chapter: 4,
    tier: 'Capabilities',
    prompt: 'How does the book approach innovation across African nations?',
    options: [
      'Only as technologies imported from overseas',
      'Exclusively as the domain of multinational tech conglomerates',
      'As practical local problem-solving combined with modern technology',
    ],
    answer: 2,
    explanation: 'Innovation in Africa is rooted in grassroots knowledge, frugal engineering and practical responses to everyday needs, catalyzed by digital tools and mobile platforms.',
    source: 'Chapter 4 · Innovation & technology',
  },
  {
    chapter: 8,
    tier: 'Capabilities',
    prompt: 'What does the book highlight as the primary power of the African diaspora?',
    options: [
      'Merely the raw statistics of outbound migration',
      'Short-term holiday visits and seasonal tourism',
      'A global connective network moving capital, skills, ideas and influence',
    ],
    answer: 2,
    explanation: 'The diaspora represents a dynamic global network: sending over $100B in annual remittances, transferring specialized knowledge, and connecting local talent with global markets.',
    source: 'Chapter 8 · Diaspora',
  },
  {
    chapter: 10,
    tier: 'Outcomes',
    prompt: 'What sits at the Outcomes end of the Funnel of Optimism?',
    options: [
      'Positive international headlines and PR slogans',
      'Sustainable growth, higher living standards and tangible human progress',
      'Short-term financial speculation and temporary commodity booms',
    ],
    answer: 1,
    explanation: 'Outcomes measure whether foundations and capabilities are translating into real lives: broader prosperity, higher life expectancy, quality education and durable optimism.',
    source: 'Chapter 10 · Growth & prosperity',
  },
];

const CHAPTER_DETAILS: Record<number, { title: string; tier: string; color: string }> = {
  0: { title: 'The Introduction', tier: 'Introduction', color: '#08798e' },
  1: { title: 'Peace', tier: 'Foundations', color: '#08798e' },
  2: { title: 'Governance', tier: 'Foundations', color: '#08798e' },
  3: { title: 'Solidarity', tier: 'Foundations', color: '#08798e' },
  4: { title: 'Innovation & technology', tier: 'Capabilities', color: '#ffd537' },
  8: { title: 'Diaspora', tier: 'Capabilities', color: '#ffd537' },
  10: { title: 'Growth & prosperity', tier: 'Outcomes', color: '#d91e68' },
};

export const QuizSection: React.FC = () => {
  const [stage, setStage] = useState<'start' | 'question' | 'results'>('start');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));

  const startQuiz = () => {
    setAnswers(Array(QUESTIONS.length).fill(null));
    setIndex(0);
    setStage('question');
  };

  const handleCancelQuiz = () => {
    setStage('start');
    setIndex(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
  };

  const handleSelectOption = (optIndex: number) => {
    const nextAnswers = [...answers];
    nextAnswers[index] = optIndex;
    setAnswers(nextAnswers);

    // Micro celebratory burst for correct answer
    if (optIndex === QUESTIONS[index].answer) {
      confetti({
        particleCount: 24,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#08798e', '#ffd537', '#ffffff'],
        disableForReducedMotion: true,
      });
    }
  };

  const triggerGrandConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#d91e68', '#08798e', '#ffd537', '#123440'],
      disableForReducedMotion: true,
    });
  };

  const handleNext = () => {
    if (index === QUESTIONS.length - 1) {
      setStage('results');
      triggerGrandConfetti();
    } else {
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      // Return to quiz start view when on the first question
      setStage('start');
    }
  };

  const currentQ = QUESTIONS[index];
  const selectedAnswer = answers[index];
  const answeredCount = answers.filter((a) => a !== null).length;
  const score = answers.reduce(
    (total, a, i) => total + (a === QUESTIONS[i].answer ? 1 : 0),
    0
  );

  const getProfile = () => {
    if (score === 5) {
      return {
        badge: 'Disciplined Optimist',
        color: '#08798e',
        tagline: 'Perceptive, grounded and evidence-led.',
        description: 'You recognize that genuine progress is built on solid structural foundations and sustained momentum rather than surface rhetoric.',
      };
    }
    if (score >= 3) {
      return {
        badge: 'Curious Realist',
        color: '#d97706',
        tagline: 'Thoughtful, open-minded and analytical.',
        description: 'You see the promising trajectories taking shape across African nations while seeking deeper context on how capabilities produce durable outcomes.',
      };
    }
    return {
      badge: 'Explorer of Possibility',
      color: '#d91e68',
      tagline: 'Fresh perspective, eager to discover.',
      description: 'The book offers eye-opening evidence that challenges traditional assumptions, highlighting dynamic innovations and unexpected stories of resilience.',
    };
  };

  const getRecommendedChapter = () => {
    const firstMiss = QUESTIONS.findIndex((q, i) => answers[i] !== q.answer);
    if (firstMiss === -1) {
      return {
        chapter: 11,
        title: 'The Optimism Index',
        tier: 'Outcomes',
        color: '#d91e68',
        reason: 'You have mastered the foundational concepts — explore how the book measures optimism across countries.',
      };
    }
    const q = QUESTIONS[firstMiss];
    const details = CHAPTER_DETAILS[q.chapter] || {
      title: 'Foundations of Progress',
      tier: q.tier,
      color: '#08798e',
    };
    return {
      chapter: q.chapter,
      title: details.title,
      tier: q.tier,
      color: details.color,
      reason: `Explore ${q.source} to uncover surprising data and fresh insights.`,
    };
  };

  const profile = getProfile();
  const recChapter = getRecommendedChapter();

  return (
    <section className="quiz-section section-space wrap" id="quiz" aria-labelledby="quiz-title">
      <div className="quiz-grid items-start">
        {/* Left Column: Authoritative Editorial Framing */}
        <div className="quiz-copy pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#08798e]/10 text-[#08798e] text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#08798e] animate-pulse" />
            Interactive Reader Quiz
          </div>

          <KineticHeading
            id="quiz-title"
            className="text-4xl sm:text-5xl leading-[1.12] mb-5"
            lines={[
              { text: 'Exercise your' },
              { text: 'optimism muscle.', isEm: true, italic: false },
            ]}
          />

          <p className="text-base text-slate-600 leading-relaxed max-w-[360px] mb-6">
            Five questions drawn directly from the manuscript. Test your assumptions against comparative evidence and uncover a personalized reading pathway.
          </p>

          {/* Value Badges with Autocounted Numbers */}
          <div className="grid grid-cols-3 gap-2.5 max-w-[360px] mb-8">
            <div className="p-2.5 rounded-lg bg-white border border-[#123440]/10 text-center shadow-xs">
              <span className="block text-lg font-bold text-[#123440]">
                <AutoCounter value={5} />
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Questions</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-[#123440]/10 text-center shadow-xs">
              <span className="block text-lg font-bold text-[#08798e]">
                <AutoCounter value="~2" />
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Minutes</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-[#123440]/10 text-center shadow-xs">
              <span className="block text-lg font-bold text-[#d91e68]">
                <AutoCounter value="100%" />
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Private</span>
            </div>
          </div>

          {/* Unique Animated Cartoon Question Mark (No legs, no companion extra head, no instruction texts) */}
          <AnimatedQuestionMark className="mt-2" />
        </div>

        {/* Right Column: Interactive Quiz Card */}
        <div
          className="quiz-card relative bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-9 transition-all duration-300"
          id="quiz-card"
        >
          {/* Top Decorative Gradient Edge */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#08798e] via-[#ffd537] to-[#d91e68]" />

          <AnimatePresence mode="wait">
            {/* 1. START STAGE */}
            {stage === 'start' && (
              <motion.div
                key="start"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28 }}
                id="quiz-start"
                className="flex flex-col"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#08798e]">
                    The Optimism Quiz
                  </span>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    className="text-2xl text-[#ffd537]"
                    aria-hidden="true"
                  >
                    ✳
                  </motion.span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#123440] leading-tight mb-3">
                  What could a closer
                  <br />
                  look reveal?
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Take a guess on 5 core themes from the book. Review data-backed explanations after each question and find out where your curiosity leads.
                </p>

                {/* Key Benefits List */}
                <div className="space-y-2.5 mb-7">
                  <div className="flex items-center gap-3 text-xs text-[#123440] font-medium">
                    <span className="w-5 h-5 rounded-full bg-[#08798e]/15 text-[#08798e] flex items-center justify-center font-bold text-[10px]">
                      ✓
                    </span>
                    <span>Test your intuition on economic and social trends</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#123440] font-medium">
                    <span className="w-5 h-5 rounded-full bg-[#ffd537]/30 text-[#b45309] flex items-center justify-center font-bold text-[10px]">
                      ✓
                    </span>
                    <span>Learn the 3 tiers of the Funnel of Optimism</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#123440] font-medium">
                    <span className="w-5 h-5 rounded-full bg-[#d91e68]/15 text-[#d91e68] flex items-center justify-center font-bold text-[10px]">
                      ✓
                    </span>
                    <span>Get a personalized chapter recommendation</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="button dark group cursor-pointer inline-flex items-center justify-between px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#123440] hover:bg-[#08798e] transition-colors duration-200 shadow-md"
                  id="quiz-start-button"
                  onClick={startQuiz}
                >
                  <span>Let’s find out</span>
                  <span
                    className="inline-block transition-transform duration-200 group-hover:translate-x-1 ml-2 text-base"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>

                <p className="text-[11px] text-slate-400 mt-4 text-center">
                  Anonymous & interactive · No email or sign-up required
                </p>
              </motion.div>
            )}

            {/* 2. QUESTION STAGE */}
            {stage === 'question' && (
              <motion.div
                key={`q-${index}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.26 }}
                id="quiz-question"
              >
                {/* Header Trackers & Cancel Button */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-[#123440]">
                      {String(index + 1).padStart(2, '0')} / {String(QUESTIONS.length).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {currentQ.tier}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* 5-Step Progress Indicators */}
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      {QUESTIONS.map((_, i) => (
                        <span
                          key={i}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i === index
                              ? 'w-5 bg-[#08798e]'
                              : answers[i] !== null
                              ? 'bg-[#08798e]/50'
                              : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Cancel Quiz X Button */}
                    <button
                      type="button"
                      onClick={handleCancelQuiz}
                      title="Cancel and exit quiz"
                      aria-label="Cancel and exit quiz"
                      className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-[#d91e68] hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors cursor-pointer text-xs font-bold ml-1"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div
                  className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-5"
                  role="progressbar"
                  aria-label="Quiz progress"
                  aria-valuemin={0}
                  aria-valuemax={5}
                  aria-valuenow={answeredCount}
                >
                  <div
                    className="h-full bg-gradient-to-r from-[#08798e] to-[#ffd537] transition-all duration-300"
                    style={{ width: `${((index + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>

                {/* Question Prompt */}
                <h3
                  id="quiz-prompt"
                  tabIndex={-1}
                  className="text-xl sm:text-2xl font-serif font-bold text-[#123440] leading-snug mb-5 outline-none"
                >
                  {currentQ.prompt}
                </h3>

                {/* Options List */}
                <div className="space-y-2.5 mb-5" role="group" aria-labelledby="quiz-prompt">
                  {currentQ.options.map((optText, optIdx) => {
                    const isSelected = selectedAnswer === optIdx;
                    const isCorrect = optIdx === currentQ.answer;
                    const hasAnswered = selectedAnswer !== null;

                    let cardStyles = 'bg-white border-slate-200 hover:border-[#08798e] hover:bg-slate-50/70 text-[#123440]';
                    let badgeStyles = 'bg-slate-100 text-slate-600 border-slate-300';
                    let statusLabel = String.fromCharCode(65 + optIdx);

                    if (hasAnswered) {
                      if (isCorrect) {
                        cardStyles = 'bg-emerald-50/90 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20';
                        badgeStyles = 'bg-emerald-600 text-white border-emerald-600';
                        statusLabel = '✓';
                      } else if (isSelected) {
                        cardStyles = 'bg-rose-50/90 border-rose-500 text-rose-950 ring-2 ring-rose-500/20';
                        badgeStyles = 'bg-rose-600 text-white border-rose-600';
                        statusLabel = '✕';
                      } else {
                        cardStyles = 'bg-white/60 border-slate-200 text-slate-400 opacity-60';
                        badgeStyles = 'bg-slate-100 text-slate-400 border-slate-200';
                      }
                    }

                    return (
                      <motion.button
                        key={optIdx}
                        type="button"
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleSelectOption(optIdx)}
                        aria-pressed={isSelected}
                        className={`w-full flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer shadow-xs ${cardStyles}`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono border shrink-0 transition-colors ${badgeStyles}`}
                          >
                            {statusLabel}
                          </span>
                          <span className="leading-snug">{optText}</span>
                        </div>
                        {hasAnswered && isCorrect && (
                          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider shrink-0">
                            Correct
                          </span>
                        )}
                        {hasAnswered && isSelected && !isCorrect && (
                          <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider shrink-0">
                            Your answer
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Instant Educational Feedback */}
                {selectedAnswer !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed mb-6 ${
                      selectedAnswer === currentQ.answer
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                        : 'bg-white border-amber-300 text-amber-950'
                    }`}
                    role="status"
                  >
                    <div className="font-bold flex items-center gap-1.5 mb-1.5 text-xs uppercase tracking-wider">
                      {selectedAnswer === currentQ.answer ? (
                        <>
                          <span className="text-emerald-600 text-base">✓</span>
                          <span className="text-emerald-800">Spot on!</span>
                        </>
                      ) : (
                        <>
                          <span className="text-amber-600 text-base">💡</span>
                          <span className="text-amber-800">A fresh perspective:</span>
                        </>
                      )}
                    </div>
                    <p className="text-slate-700 mb-2">{currentQ.explanation}</p>
                    <div className="text-[11px] font-semibold text-slate-500 pt-1 border-t border-slate-200/60 flex items-center justify-between">
                      <span>In the book: {currentQ.source}</span>
                    </div>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={handlePrev}
                    className="text-xs font-semibold text-slate-500 hover:text-[#123440] disabled:opacity-30 disabled:pointer-events-none cursor-pointer px-2 py-1.5"
                  >
                    ← Previous
                  </button>

                  <button
                    type="button"
                    disabled={selectedAnswer === null}
                    onClick={handleNext}
                    className="button dark group cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#123440] hover:bg-[#08798e] disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-sm"
                  >
                    <span>{index === QUESTIONS.length - 1 ? 'See Your Reader Profile' : 'Next Question'}</span>
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* 3. RESULTS STAGE */}
            {stage === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                id="quiz-results"
                className="flex flex-col"
              >
                {/* Result Top Badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span
                    className="text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ backgroundColor: `${profile.color}15`, color: profile.color }}
                  >
                    {profile.badge}
                  </span>
                  <span className="text-xs font-bold text-slate-400">Quiz Completed</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#123440] leading-tight mb-2">
                  {profile.tagline}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {profile.description}
                </p>

                {/* Score Summary Box */}
                <div className="p-4 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between mb-6 shadow-xs">
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-0.5">
                      Your Score
                    </span>
                    <span className="text-3xl font-serif font-bold text-[#123440]">
                      <AutoCounter value={score} /> <span className="text-base text-slate-400 font-sans">/ {QUESTIONS.length}</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#08798e] block">
                      <AutoCounter value={`${Math.round((score / QUESTIONS.length) * 100)}%`} /> Match
                    </span>
                    <span className="text-[11px] text-slate-500">Evidence alignment</span>
                  </div>
                </div>

                {/* Recommended Chapter Card */}
                <div
                  className="p-4 rounded-xl border-l-4 mb-6 shadow-xs bg-white border border-slate-200"
                  style={{
                    borderLeftColor: recChapter.color,
                  }}
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1">
                    Your Curated Reading Pathway
                  </span>
                  <h4 className="text-base font-serif font-bold text-[#123440] mb-1">
                    {recChapter.chapter === 0 ? 'Introduction' : `Chapter ${recChapter.chapter}: ${recChapter.title}`}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {recChapter.reason}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="#get-book"
                    className="flex-1 text-center py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#d91e68] hover:bg-[#b81755] transition-colors shadow-md"
                  >
                    Get the Book ↗
                  </a>
                  <button
                    type="button"
                    onClick={startQuiz}
                    className="py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold text-[#123440] border border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Retake Quiz ↻
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
