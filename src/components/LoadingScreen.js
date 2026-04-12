import React, { useState, useEffect, useRef, useMemo } from 'react';

// Matches Hero.js ParticleField — same black/white particle style
const ParticleField = ({ isDark }) => {
  const particles = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 5,
    })), []
  );

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
            animation: `particlePulse ${p.duration}s ease-in-out infinite ${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const LoadingScreen = () => {
  const [isDark, setIsDark] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(saved ? saved === 'dark' : systemDark);

    startRef.current = performance.now();
    const duration = 2400;

    const tick = (now) => {
      const t = Math.min((now - startRef.current) / duration, 1);
      // ease-out cubic — same feel as Framer Motion easeOut
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.floor(eased * 100));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const d = isDark;

  return (
    <div style={{
      position: 'fixed', inset: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      // Matches App.js main bg: dark:from-black dark:via-gray-950 dark:to-black / from-slate-50 via-white to-gray-50
      background: d
        ? 'linear-gradient(135deg, #000000 0%, #030712 50%, #000000 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f9fafb 100%)',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      zIndex: 9999,
      overflow: 'hidden',
      animation: 'screenFadeIn 0.4s ease forwards',
    }}>

      {/* Same radial glow blobs as premium-dark.css luxury-section */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        zIndex: 0,
        background: d
          ? 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.02) 0%, transparent 50%)'
          : 'radial-gradient(circle at 20% 50%, rgba(0,0,0,0.02) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.015) 0%, transparent 50%)',
      }} />

      {/* Particle field — same as Hero.js */}
      <ParticleField isDark={d} />

      {/* Subtle grid — same density as index.css */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        zIndex: 0,
        backgroundImage: d
          ? 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)'
          : 'linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }} />

      {/* Main content — fades up like Framer Motion fadeInUp */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
        animation: 'contentFadeUp 0.7s cubic-bezier(0.4,0,0.2,1) 0.1s forwards',
        opacity: 0,
      }}>

        {/* ── Logo ── same Cloudinary SVG as Hero.js profile + manifest.json */}
        <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '40px' }}>

          {/* Outer spinning ring — from-black via-gray-800 to-black / dark:from-white */}
          <div style={{
            position: 'absolute', inset: '-14px',
            borderRadius: '50%',
            background: d
              ? 'conic-gradient(from 0deg, transparent 70%, rgba(255,255,255,0.9) 100%)'
              : 'conic-gradient(from 0deg, transparent 70%, rgba(0,0,0,0.85) 100%)',
            animation: 'spinRing 3s linear infinite',
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px))',
          }} />

          {/* Inner reverse ring */}
          <div style={{
            position: 'absolute', inset: '-4px',
            borderRadius: '50%',
            border: `1px solid ${d ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}`,
            borderTopColor: d ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)',
            animation: 'spinRing 2s linear infinite reverse',
          }} />

          {/* Ambient glow — matches .dark .ambient-glow */}
          <div style={{
            position: 'absolute', inset: '-8px',
            borderRadius: '50%',
            background: d
              ? 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(0,0,0,0.06) 0%, transparent 70%)',
            animation: 'breathe 2.5s ease-in-out infinite',
          }} />

          {/* Logo circle — matches Hero.js profile ring + Header VP badge */}
          <div style={{
            width: '100%', height: '100%',
            borderRadius: '50%',
            // dark mode → dark bg so logo shows on dark, light mode → white bg so logo shows on light
            background: d
              ? 'linear-gradient(135deg, #000000 0%, #111111 50%, #0a0a0a 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #ffffff 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            // Matches dark:shadow-premium-lg
            boxShadow: d
              ? '0 20px 60px rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.12), inset 0 1px 0 rgba(255,255,255,0.06)'
              : '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
            animation: 'breathe 2.5s ease-in-out infinite',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Metallic shine — matches premium-dark.css metallic-shine */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)',
              animation: 'shineSweep 3s ease-in-out infinite',
              zIndex: 1,
            }} />
            {/* Actual site logo — same Cloudinary SVG used in Hero.js & manifest.json */}
            <img
              src="https://res.cloudinary.com/dhyc478ch/image/upload/v1765255874/Untitled_design1_wwwx1q.svg"
              alt="Vishesh Panchal"
              style={{
                width: '80%', height: '80%',
                objectFit: 'cover',
                borderRadius: '50%',
                position: 'relative', zIndex: 2,
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>

        {/* Name */}
        <div style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
          fontWeight: '800',
          letterSpacing: '4px',
          marginBottom: '10px',
          color: d ? '#ffffff' : '#000000',
          background: 'transparent',
          textShadow: d ? '0 0 40px rgba(255,255,255,0.25)' : '0 2px 8px rgba(0,0,0,0.08)',
        }}>VISHESH PANCHAL</div>

        {/* Role — matches Hero.js subtitle style */}
        <div style={{
          fontSize: '0.72rem',
          fontWeight: '500',
          letterSpacing: '5px',
          textTransform: 'uppercase',
          color: d ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)',
          marginBottom: '52px',
        }}>Full Stack Developer</div>

        {/* Progress bar — matches .dark .premium-loading shimmer style */}
        <div style={{ width: 'clamp(260px, 38vw, 340px)' }}>

          {/* Track — matches glass/glass-dark inset shadow */}
          <div style={{
            height: '3px', borderRadius: '99px',
            background: d ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
            boxShadow: d
              ? 'inset 0 1px 3px rgba(0,0,0,0.5)'
              : 'inset 0 1px 3px rgba(0,0,0,0.08)',
            position: 'relative', overflow: 'visible',
          }}>
            {/* Fill — matches btn-modern gradient */}
            <div style={{
              height: '100%',
              width: `${progress}%`,
              borderRadius: '99px',
              background: d
                ? 'linear-gradient(90deg, #e8e8e8, #ffffff, #f5f5f5, #ffffff)'
                : 'linear-gradient(90deg, #1a1a1a, #000000, #2a2a2a, #000000)',
              backgroundSize: '200% 100%',
              animation: 'progressShimmer 2s ease-in-out infinite',
              // Matches dark:shadow-premium glow
              boxShadow: d
                ? '0 0 12px rgba(255,255,255,0.6), 0 0 24px rgba(255,255,255,0.25)'
                : '0 0 12px rgba(0,0,0,0.4), 0 0 24px rgba(0,0,0,0.15)',
              transition: 'width 0.05s linear',
              position: 'relative',
            }}>
              {/* Leading dot — glowing tip */}
              <div style={{
                position: 'absolute', right: '-4px', top: '50%',
                transform: 'translateY(-50%)',
                width: '9px', height: '9px', borderRadius: '50%',
                background: d ? '#ffffff' : '#000000',
                boxShadow: d
                  ? '0 0 10px rgba(255,255,255,1), 0 0 20px rgba(255,255,255,0.6)'
                  : '0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.35)',
              }} />
            </div>
          </div>

          {/* Labels row */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginTop: '14px',
          }}>
            {/* Matches .loading-dots style from index.css */}
            <span style={{
              fontSize: '10px', letterSpacing: '2.5px',
              color: d ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
              fontWeight: '500',
              animation: 'blinkDot 1.5s ease-in-out infinite',
            }}>● LOADING</span>
            <span style={{
              fontSize: '11px', letterSpacing: '1px',
              color: d ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.7)',
              fontWeight: '700',
              fontVariantNumeric: 'tabular-nums',
            }}>{progress}%</span>
          </div>
        </div>
      </div>

      {/* Bottom pill — matches Header nav pill glassmorphism */}
      <div style={{
        position: 'absolute', bottom: '40px',
        zIndex: 1,
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '8px 20px',
        borderRadius: '99px',
        // Matches Header: bg-white/90 dark:bg-black/85 backdrop-blur border
        background: d ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(20px) saturate(180%)',
        border: d ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
        boxShadow: d
          ? '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)'
          : '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
        animation: 'contentFadeUp 0.7s cubic-bezier(0.4,0,0.2,1) 0.4s forwards',
        opacity: 0,
      }}>
        <div style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: d ? '#ffffff' : '#000000',
          animation: 'blinkDot 1.2s ease-in-out infinite',
        }} />
        <span style={{
          fontSize: '10px', letterSpacing: '3px',
          fontWeight: '600', textTransform: 'uppercase',
          color: d ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)',
        }}>Portfolio Loading</span>
      </div>

      <style>{`
        @keyframes screenFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes contentFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spinRing {
          to { transform: rotate(360deg); }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.06); }
        }
        @keyframes shineSweep {
          0%        { transform: translateX(-130%); }
          60%, 100% { transform: translateX(130%); }
        }
        @keyframes progressShimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes particlePulse {
          0%, 100% { transform: translateY(0) scale(1);    opacity: 0.15; }
          50%       { transform: translateY(-18px) scale(1.3); opacity: 0.6; }
        }
        @keyframes blinkDot {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
