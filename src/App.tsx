import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ManifestoBanner } from './components/ManifestoBanner';
import { AboutSection } from './components/AboutSection';
import { InsideSection } from './components/InsideSection';
import { AuthorSection } from './components/AuthorSection';
import { QuizSection } from './components/QuizSection';
import { GetTheBookSection } from './components/GetTheBookSection';
import { Footer } from './components/Footer';
import { IntroDialog } from './components/IntroDialog';

export default function App() {
  const [isIntroOpen, setIsIntroOpen] = useState(false);

  // Smooth scroll progress bar at top of window
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleOpenIntro = () => {
    setIsIntroOpen(true);
  };

  const handleCloseIntro = () => {
    setIsIntroOpen(false);
  };

  return (
    <>
      {/* Top Floating Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d91e68] via-[#ffd537] to-[#08798e] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* Header */}
      <Navbar />

      <main id="main">
        {/* 1. Hero Section with 360-Degree Interactive 3D Book & On-Enter Kinetic Title */}
        <Hero onOpenIntro={handleOpenIntro} />

        {/* 2. Manifesto Banner */}
        <ManifestoBanner />

        {/* 3. Between the Covers (About) with Word-by-Word Animation */}
        <AboutSection />

        {/* 4. Inside the book: 11 Chapters & Funnel of Optimism */}
        <InsideSection onOpenIntro={handleOpenIntro} />

        {/* 5. The Author: Dr. Anand Kulkarni */}
        <AuthorSection onOpenIntro={handleOpenIntro} />

        {/* 6. Optimism Quiz: Exercise your optimism muscle */}
        <QuizSection />

        {/* 7. Get the book with 360-Degree Spin Preview */}
        <GetTheBookSection onOpenIntro={handleOpenIntro} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Introduction Dialog Modal */}
      <IntroDialog isOpen={isIntroOpen} onClose={handleCloseIntro} />
    </>
  );
}
