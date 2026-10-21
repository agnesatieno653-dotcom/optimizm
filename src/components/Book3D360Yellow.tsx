import React, { useState, useRef, useEffect } from 'react';
import doctorPhoto from '../assets/images/doctor.jpg';

interface Book3D360YellowProps {
  onOpenIntro?: () => void;
  className?: string;
}

export const Book3D360Yellow: React.FC<Book3D360YellowProps> = ({ onOpenIntro, className = '' }) => {
  const [rotY, setRotY] = useState<number>(0);
  const [rotX, setRotX] = useState<number>(2);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const dragStartRef = useRef<{ x: number; y: number; initialRotY: number; initialRotX: number }>({
    x: 0,
    y: 0,
    initialRotY: 0,
    initialRotX: 2,
  });

  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const stageRef = useRef<HTMLDivElement>(null);

  // Smooth continuous 360-degree rotation loop
  useEffect(() => {
    if (isDragging) {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      return;
    }

    const spinSpeed = isHovered ? 12 : 24; // degrees per second

    const tick = (now: number) => {
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      setRotY((prev) => (prev + spinSpeed * delta) % 3600);
      animFrameRef.current = requestAnimationFrame(tick);
    };

    lastTimeRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isDragging, isHovered]);

  // Pointer drag to spin 360 interactively
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialRotY: rotY,
      initialRotX: rotX,
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) {
      if (stageRef.current) {
        const rect = stageRef.current.getBoundingClientRect();
        const deltaY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        setRotX(-deltaY * 8);
      }
      return;
    }

    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    setRotY(dragStartRef.current.initialRotY + deltaX * 0.7);
    const newRotX = Math.max(-18, Math.min(18, dragStartRef.current.initialRotX - deltaY * 0.3));
    setRotX(newRotX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
  };

  const sheenOffset = Math.sin((rotY * Math.PI) / 180) * 100;

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* 360 Rotating Stage in Yellow Section */}
      <div
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          if (!isDragging) setRotX(2);
        }}
        onClick={() => {
          if (Math.abs(rotY - dragStartRef.current.initialRotY) < 3 && onOpenIntro) {
            onOpenIntro();
          }
        }}
        className="relative w-[240px] sm:w-[260px] h-[360px] sm:h-[390px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        style={{ perspective: '1100px' }}
      >
        {/* Ground Contact Shadow */}
        <div
          className="absolute bottom-4 w-[210px] sm:w-[230px] h-8 rounded-full blur-xl pointer-events-none transition-all duration-150"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(18,52,64,0.45) 0%, rgba(18,52,64,0) 70%)',
            transform: `scale(${1 + Math.abs(Math.sin((rotY * Math.PI) / 180)) * 0.15}) translateY(${
              Math.sin((rotY * Math.PI) / 180) * 4
            }px)`,
          }}
        />

        {/* 360-Degree Rotating 3D Book */}
        <div
          className="relative w-[210px] sm:w-[230px] h-[305px] sm:h-[335px]"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(-3deg)`,
            transition: isDragging ? 'none' : 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* ================= FRONT COVER (Z: +16px) ================= */}
          <div
            className="absolute inset-0 rounded-[2px] overflow-hidden shadow-2xl backface-hidden"
            style={{
              transform: 'translateZ(16px)',
              backfaceVisibility: 'hidden',
              backgroundColor: '#ffd537',
            }}
          >
            <img
              src="/assets/book-cover.webp"
              alt="Optimistic Africa Cover"
              className="w-full h-full object-cover select-none pointer-events-none"
              loading="lazy"
            />

            {/* Gloss reflection overlay moving dynamically with 360 rotation */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(${115 + sheenOffset * 0.3}deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 30%, transparent 50%, rgba(0,0,0,0.12) 100%)`,
                mixBlendMode: 'overlay',
              }}
            />

            {/* Book spine groove crease */}
            <div
              className="absolute top-0 bottom-0 left-[12px] w-[2px] pointer-events-none"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.25), rgba(255,255,255,0.3) 50%, rgba(0,0,0,0.15))',
              }}
            />
          </div>

          {/* ================= BACK COVER (Z: -16px, RotateY 180deg) ================= */}
          <div
            className="absolute inset-0 rounded-[2px] overflow-hidden shadow-2xl p-4 flex flex-col justify-between text-white"
            style={{
              transform: 'rotateY(180deg) translateZ(16px)',
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(145deg, #094754 0%, #08798e 45%, #055361 100%)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {/* Gloss reflection overlay for back cover */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(${295 + sheenOffset * 0.3}deg, rgba(255,255,255,0.2) 0%, transparent 60%)`,
              }}
            />

            {/* Spine hinge line on back */}
            <div
              className="absolute top-0 bottom-0 right-[12px] w-[2px] pointer-events-none"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.3), rgba(255,255,255,0.2) 50%, rgba(0,0,0,0.2))',
              }}
            />

            {/* Back Cover Header */}
            <div className="relative z-10">
              <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-[#ffd537] block mb-1">
                A Case For Possibility
              </span>
              <h4 className="font-serif text-sm leading-tight text-white font-normal">
                What if optimism about Africa could be grounded in evidence?
              </h4>
            </div>

            {/* Back Cover Synopsis */}
            <div className="relative z-10 text-[9.5px] leading-relaxed text-white/90 space-y-1 font-sans my-1">
              <p>
                Across African countries, people are building businesses, developing technologies, and reshaping economies.
              </p>
              <p className="border-l-2 border-[#ffd537] pl-1.5 text-white/95 italic font-serif text-[9px]">
                &ldquo;The Funnel of Optimism connects peace, governance and solidarity.&rdquo;
              </p>
            </div>

            {/* Author info & ISBN Barcode box */}
            <div className="relative z-10 pt-1.5 border-t border-white/20 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <img
                  src={doctorPhoto}
                  alt="Dr Anand Kulkarni"
                  className="w-8 h-8 rounded-full object-cover border border-[#ffd537] shrink-0"
                />
                <div>
                  <span className="text-[9px] font-bold block text-white leading-tight">Dr. Anand Kulkarni</span>
                  <span className="text-[7.5px] text-white/75 block leading-tight">Author</span>
                </div>
              </div>

              {/* Barcode badge */}
              <div className="bg-white text-black p-0.5 rounded text-center shrink-0 shadow-sm">
                <div className="flex gap-[1px] h-4 items-end justify-center px-0.5">
                  {[2, 1, 3, 1, 2, 1, 3, 1, 2, 2, 1, 2].map((w, i) => (
                    <div
                      key={i}
                      className="bg-black"
                      style={{ width: `${w}px`, height: i % 2 === 0 ? '100%' : '75%' }}
                    />
                  ))}
                </div>
                <span className="text-[5.5px] font-mono tracking-tighter block text-slate-800">
                  978-0-646-88542-1
                </span>
              </div>
            </div>
          </div>

          {/* ================= BOOK SPINE (Left Edge, width: 32px) ================= */}
          <div
            className="absolute top-0 bottom-0 left-0 w-[32px] flex flex-col justify-between items-center py-4 text-white"
            style={{
              transform: 'translateX(-16px) rotateY(-90deg)',
              transformOrigin: 'center center',
              background: 'linear-gradient(to right, #075c6d, #08798e 40%, #064a57)',
              boxShadow: 'inset 0 0 8px rgba(0,0,0,0.6)',
              borderLeft: '1px solid rgba(255,255,255,0.15)',
              borderRight: '1px solid rgba(0,0,0,0.4)',
            }}
          >
            <span className="text-[#ffd537] text-[10px] font-bold font-serif">✳</span>

            <div
              className="tracking-widest uppercase text-[9.5px] font-bold text-white whitespace-nowrap"
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                letterSpacing: '0.2em',
              }}
            >
              <span className="text-[#ffd537]">OPTIMISTIC</span>{' '}
              <span className="text-[#ff528d]">AFRICA</span>
            </div>

            <span className="text-[7px] font-bold text-white/60 font-mono">2026</span>
          </div>

          {/* ================= FORE-EDGE / PAGES (Right Edge, width: 32px) ================= */}
          <div
            className="absolute top-0 bottom-0 right-0 w-[32px]"
            style={{
              transform: 'translateX(16px) rotateY(90deg)',
              transformOrigin: 'center center',
              background: 'repeating-linear-gradient(to bottom, #ffffff, #ffffff 1.5px, #e2e8f0 2px, #ffffff 3.5px)',
              boxShadow: 'inset 2px 0 6px rgba(0,0,0,0.15)',
              borderRadius: '2px',
            }}
          >
            {/* Silk bookmark ribbon */}
            <div
              className="absolute -bottom-2.5 left-2 w-2.5 h-6 bg-[#d91e68] shadow-md transform rotate-6 pointer-events-none"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)' }}
            />
          </div>

          {/* ================= TOP EDGE / PAGES ================= */}
          <div
            className="absolute top-0 left-0 right-0 h-[32px]"
            style={{
              transform: 'translateY(-16px) rotateX(90deg)',
              transformOrigin: 'center center',
              background: 'repeating-linear-gradient(to right, #ffffff, #ffffff 1.5px, #e2e8f0 2px, #ffffff 3.5px)',
              boxShadow: 'inset 0 0 6px rgba(0,0,0,0.12)',
            }}
          />

          {/* ================= BOTTOM EDGE / PAGES ================= */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[32px]"
            style={{
              transform: 'translateY(16px) rotateX(-90deg)',
              transformOrigin: 'center center',
              background: 'repeating-linear-gradient(to right, #ffffff, #ffffff 1.5px, #e2e8f0 2px, #ffffff 3.5px)',
              boxShadow: 'inset 0 0 6px rgba(0,0,0,0.12)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
