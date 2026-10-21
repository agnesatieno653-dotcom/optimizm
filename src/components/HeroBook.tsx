import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface HeroBookProps {
  onOpenIntro?: () => void;
  className?: string;
}

export const HeroBook: React.FC<HeroBookProps> = ({ onOpenIntro, className = '' }) => {
  const [rotation, setRotation] = useState<{ x: 0; y: -6; z: -4 }>({ x: 0, y: -6, z: -4 });
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const stageRef = useRef<HTMLDivElement>(null);

  // Subtle interactive 3D mouse tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    const rotX = -deltaY * 12;
    const rotY = deltaX * 14 - 6;
    const rotZ = -4 + deltaX * 2.5;

    setRotation({ x: rotX as any, y: rotY as any, z: rotZ as any });
    if (!isInteracting) setIsInteracting(true);
  };

  const handleMouseEnter = () => {
    setIsInteracting(true);
  };

  const handleMouseLeave = () => {
    setIsInteracting(false);
    setRotation({ x: 0, y: -6, z: -4 });
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Book Stage */}
      <div
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onOpenIntro}
        className="book-stage relative flex items-center justify-center cursor-pointer"
        style={{
          perspective: '1200px',
          minHeight: '525px',
          padding: '20px 45px 16px',
        }}
      >
        {/* ================= CLEAN CRISP WHITE CIRCULAR BACKDROP ================= */}
        {/* Matches pure white background with subtle border & soft shadow */}
        <div
          className="absolute inset-[6%_-3%_2%_-3%] pointer-events-none transition-transform duration-500 ease-out"
          style={{
            zIndex: -1,
            backgroundColor: '#ffffff',
            borderRadius: '50% 48% 41% 45%',
            border: '1.5px solid rgba(18, 52, 64, 0.08)',
            boxShadow: '0 20px 50px rgba(18, 52, 64, 0.06)',
            transform: isInteracting ? 'scale(1.02)' : 'scale(1)',
          }}
        />

        {/* Ambient Sunburst Spark in Top Right */}
        <div
          className="sunburst"
          style={{
            animation: 'sunburstSpin 45s linear infinite',
            transformOrigin: 'center',
          }}
          aria-hidden="true"
        >
          ✳
        </div>

        {/* Floating "A different way to see." scribble */}
        <span
          className="book-scribble"
          aria-hidden="true"
        >
          A different<br />way to see.
        </span>

        {/* Ground Contact Shadow */}
        <div
          className="absolute bottom-6 w-[260px] sm:w-[290px] h-8 rounded-full blur-xl pointer-events-none transition-all duration-300"
          style={{
            zIndex: 0,
            background: 'radial-gradient(ellipse at center, rgba(18,52,64,0.3) 0%, rgba(18,52,64,0) 70%)',
            transform: isInteracting ? 'scale(1.06)' : 'scale(1)',
          }}
        />

        {/* ================= ANIMATED 3D FRONT-FACING BOOK ================= */}
        <motion.div
          className={`book-object ${!isInteracting ? 'idle-float' : ''}`}
          style={{
            zIndex: 2,
            transform: isInteracting
              ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg) scale3d(1.03, 1.03, 1.03)`
              : undefined,
            transition: isInteracting ? 'transform 0.12s ease-out' : 'transform 0.8s ease-in-out',
          }}
        >
          <img
            src="/assets/book-cover.webp"
            width="1054"
            height="1492"
            alt="Optimistic Africa cover concept by Dr. Anand Kulkarni"
            loading="eager"
            className="w-full h-auto rounded-[2px]"
          />
        </motion.div>
      </div>
    </div>
  );
};
