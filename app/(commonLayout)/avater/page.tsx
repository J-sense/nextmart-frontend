'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function ExpressiveAvatar() {
  const [isTalking, setIsTalking] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [expression, setExpression] = useState('neutral');
  const mouthControls = useAnimation();
  const eyeControls = useAnimation();
  const eyebrowControls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.body.getBoundingClientRect();
      const x = (e.clientX - rect.width / 2) / 100;
      const y = (e.clientY - rect.height / 2) / 100;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const blink = async () => {
      await eyeControls.start({ scaleY: 0.05, transition: { duration: 0.08 } });
      await eyeControls.start({ scaleY: 1, transition: { duration: 0.08 } });
    };
    const interval = setInterval(blink, 3500 + Math.random() * 2500);
    return () => clearInterval(interval);
  }, [eyeControls]);

  const startTalking = async () => {
    if (isTalking) return;
    setIsTalking(true);

    for (let i = 0; i < 30; i++) {
      const openAmount = Math.random();
      await mouthControls.start({
        scaleY: openAmount > 0.5 ? 1.6 : 0.4,
        scaleX: 1 + Math.random() * 0.15,
        transition: { duration: 0.1 },
      });
    }
    mouthControls.start({ scaleY: 0.2, scaleX: 1 });
    setIsTalking(false);
  };

  const changeExpression = async (newExpression: string) => {
    setExpression(newExpression);

    switch (newExpression) {
      case 'happy':
        eyebrowControls.start({ y: -5, rotate: 0 });
        eyeControls.start({ scaleY: 0.9 });
        mouthControls.start({ 
          scaleY: 0.8, 
          scaleX: 1.2,
          y: -5,
          transition: { duration: 0.3 }
        });
        break;
      case 'surprised':
        eyebrowControls.start({ y: -8, scaleY: 1.2 });
        eyeControls.start({ scaleY: 1.3, scaleX: 1.2 });
        mouthControls.start({ 
          scaleY: 1.4, 
          scaleX: 1.1,
          transition: { duration: 0.3 }
        });
        break;
      case 'angry':
        eyebrowControls.start({ y: 5, rotate: -5 });
        eyeControls.start({ scaleY: 0.7 });
        mouthControls.start({ 
          scaleY: 0.3, 
          scaleX: 0.9,
          y: 5,
          transition: { duration: 0.3 }
        });
        break;
      case 'sad':
        eyebrowControls.start({ y: 3, scaleY: 0.8 });
        eyeControls.start({ scaleY: 0.8 });
        mouthControls.start({ 
          scaleY: 0.4, 
          scaleX: 0.8,
          y: 8,
          transition: { duration: 0.3 }
        });
        break;
      case 'thinking':
        eyebrowControls.start({ y: -2, rotate: 3 });
        eyeControls.start({ scaleY: 0.85, x: 3 });
        mouthControls.start({ 
          scaleY: 0.3, 
          scaleX: 0.7,
          x: -3,
          transition: { duration: 0.3 }
        });
        break;
      default: // neutral
        eyebrowControls.start({ y: 0, rotate: 0, scaleY: 1 });
        eyeControls.start({ scaleY: 1, scaleX: 1, x: 0 });
        mouthControls.start({ 
          scaleY: 0.2, 
          scaleX: 1,
          y: 0,
          x: 0,
          transition: { duration: 0.3 }
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 flex items-center justify-center relative overflow-hidden p-8">
      
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative w-[520px] h-[750px] z-10">
        
        {/* Body/Shoulders - Hoodie */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-[500px] h-64">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 256" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 50 256 Q 80 200, 120 180 L 120 100 Q 150 80, 250 80 Q 350 80, 380 100 L 380 180 Q 420 200, 450 256 Z"
              fill="url(#hoodieGradient)"
              stroke="#2d3748"
              strokeWidth="3"
            />
            <ellipse cx="250" cy="100" rx="100" ry="50" fill="url(#collarGradient)" stroke="#2d3748" strokeWidth="2.5" />
            <ellipse cx="250" cy="120" rx="65" ry="35" fill="#1a202c" stroke="#0f172a" strokeWidth="2" />
            <path d="M 150 150 Q 180 160, 200 180" stroke="#1a202c" strokeWidth="2" fill="none" opacity="0.4" />
            <path d="M 350 150 Q 320 160, 300 180" stroke="#1a202c" strokeWidth="2" fill="none" opacity="0.4" />
            <defs>
              <linearGradient id="hoodieGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4a5568" />
                <stop offset="50%" stopColor="#2d3748" />
                <stop offset="100%" stopColor="#1a202c" />
              </linearGradient>
              <linearGradient id="collarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4a5568" />
                <stop offset="100%" stopColor="#2d3748" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute top-20 left-32 w-24 h-32 bg-gradient-to-br from-slate-400/30 to-transparent rounded-full blur-xl" />
          <div className="absolute top-20 right-32 w-24 h-32 bg-gradient-to-bl from-slate-400/30 to-transparent rounded-full blur-xl" />
        </div>

        {/* Neck */}
        <svg className="absolute bottom-[352px] left-1/2 transform -translate-x-1/2" width="100" height="140" viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 30 0 Q 35 70, 40 140 L 60 140 Q 65 70, 70 0 Z"
            fill="url(#neckGradient)"
            stroke="#a0785a"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="neckGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d4a574" />
              <stop offset="50%" stopColor="#c4956a" />
              <stop offset="100%" stopColor="#b8865f" />
            </linearGradient>
          </defs>
        </svg>

        {/* Head */}
        <motion.div
          className="absolute top-32 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        >
          <svg width="320" height="400" viewBox="0 0 320 400" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="160" cy="200" rx="130" ry="160" fill="url(#faceGradient)" stroke="#a0785a" strokeWidth="3" />
            <ellipse cx="60" cy="200" rx="35" ry="90" fill="url(#shadowLeft)" opacity="0.6" />
            <ellipse cx="260" cy="200" rx="35" ry="90" fill="url(#shadowRight)" opacity="0.6" />
            <ellipse cx="160" cy="140" rx="70" ry="40" fill="url(#highlight)" opacity="0.4" />
            <ellipse cx="95" cy="220" rx="25" ry="15" fill="url(#highlight)" opacity="0.3" />
            <ellipse cx="225" cy="220" rx="25" ry="15" fill="url(#highlight)" opacity="0.3" />
            <defs>
              <linearGradient id="faceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e8b896" />
                <stop offset="40%" stopColor="#d4a574" />
                <stop offset="100%" stopColor="#c4956a" />
              </linearGradient>
              <radialGradient id="shadowLeft">
                <stop offset="30%" stopColor="#b8865f" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <radialGradient id="shadowRight">
                <stop offset="30%" stopColor="#b8865f" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <radialGradient id="highlight">
                <stop offset="0%" stopColor="#f5d5b8" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
          </svg>

          {/* Hair */}
          <svg className="absolute -top-16 left-1/2 transform -translate-x-1/2" width="360" height="180" viewBox="0 0 360 180" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 60 100 Q 40 60, 50 40 Q 80 10, 120 20 Q 160 5, 180 5 Q 200 5, 240 20 Q 280 10, 310 40 Q 320 60, 300 100 Q 280 140, 250 160 L 110 160 Q 80 140, 60 100 Z"
              fill="url(#hairGradient)"
              stroke="#2c1810"
              strokeWidth="3"
            />
            <path d="M 100 40 Q 120 25, 140 35" stroke="#3d2415" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 150 30 Q 170 20, 180 25" stroke="#3d2415" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 190 25 Q 210 18, 230 30" stroke="#3d2415" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 250 35 Q 260 28, 270 40" stroke="#3d2415" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 130 50 Q 150 45, 170 50" stroke="#5a3a25" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M 190 48 Q 210 43, 230 50" stroke="#5a3a25" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M 80 80 Q 90 60, 100 90" fill="#3d2415" stroke="#2c1810" strokeWidth="2" />
            <path d="M 260 80 Q 250 60, 240 90" fill="#3d2415" stroke="#2c1810" strokeWidth="2" />
            <defs>
              <linearGradient id="hairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4a2f1f" />
                <stop offset="50%" stopColor="#3d2415" />
                <stop offset="100%" stopColor="#2c1810" />
              </linearGradient>
            </defs>
          </svg>

          {/* Facial features */}
          <div className="absolute top-0 left-0 w-full h-full">
            
            {/* Animated Eyebrows */}
            <motion.svg 
              className="absolute top-32 left-0 w-full" 
              viewBox="0 0 320 40" 
              xmlns="http://www.w3.org/2000/svg"
              animate={eyebrowControls}
            >
              <motion.path
                d="M 50 25 Q 70 18, 95 20"
                stroke="#2c1810"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              <motion.path
                d="M 225 20 Q 250 18, 270 25"
                stroke="#2c1810"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
            </motion.svg>

            {/* Animated Eyes */}
            <motion.div
              className="absolute top-36 left-12"
              animate={eyeControls}
            >
              <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="35" cy="35" rx="32" ry="30" fill="white" stroke="#c4956a" strokeWidth="2" />
                <g transform={`translate(${mousePos.x * 3}, ${mousePos.y * 3})`}>
                  <circle cx="35" cy="35" r="20" fill="url(#irisGradient)" />
                  <circle cx="35" cy="35" r="20" fill="url(#irisPattern)" opacity="0.4" />
                  <circle cx="35" cy="35" r="10" fill="#1a1a1a" />
                  <circle cx="40" cy="30" r="5" fill="white" opacity="0.9" />
                  <circle cx="30" cy="38" r="3" fill="white" opacity="0.5" />
                </g>
                <ellipse cx="35" cy="25" rx="30" ry="12" fill="url(#eyelidShadow)" opacity="0.3" />
                <defs>
                  <radialGradient id="irisGradient">
                    <stop offset="0%" stopColor="#8b6f47" />
                    <stop offset="60%" stopColor="#6b5335" />
                    <stop offset="100%" stopColor="#4a3620" />
                  </radialGradient>
                  <radialGradient id="irisPattern">
                    <stop offset="0%" stopColor="#a08558" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  <linearGradient id="eyelidShadow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#b8865f" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            <motion.div
              className="absolute top-36 right-12"
              animate={eyeControls}
            >
              <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="35" cy="35" rx="32" ry="30" fill="white" stroke="#c4956a" strokeWidth="2" />
                <g transform={`translate(${mousePos.x * 3}, ${mousePos.y * 3})`}>
                  <circle cx="35" cy="35" r="20" fill="url(#irisGradient2)" />
                  <circle cx="35" cy="35" r="20" fill="url(#irisPattern2)" opacity="0.4" />
                  <circle cx="35" cy="35" r="10" fill="#1a1a1a" />
                  <circle cx="40" cy="30" r="5" fill="white" opacity="0.9" />
                  <circle cx="30" cy="38" r="3" fill="white" opacity="0.5" />
                </g>
                <ellipse cx="35" cy="25" rx="30" ry="12" fill="url(#eyelidShadow2)" opacity="0.3" />
                <defs>
                  <radialGradient id="irisGradient2">
                    <stop offset="0%" stopColor="#8b6f47" />
                    <stop offset="60%" stopColor="#6b5335" />
                    <stop offset="100%" stopColor="#4a3620" />
                  </radialGradient>
                  <radialGradient id="irisPattern2">
                    <stop offset="0%" stopColor="#a08558" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  <linearGradient id="eyelidShadow2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#b8865f" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Nose */}
            <svg className="absolute top-56 left-1/2 transform -translate-x-1/2" width="50" height="80" viewBox="0 0 50 80" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 25 0 Q 20 30, 18 60 Q 20 70, 25 75 Q 30 70, 32 60 Q 30 30, 25 0"
                fill="url(#noseGradient2)"
                opacity="0.5"
              />
              <ellipse cx="18" cy="70" rx="4" ry="5" fill="#b8865f" opacity="0.6" />
              <ellipse cx="32" cy="70" rx="4" ry="5" fill="#b8865f" opacity="0.6" />
              <defs>
                <linearGradient id="noseGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="100%" stopColor="#b8865f" />
                </linearGradient>
              </defs>
            </svg>

            {/* Animated Mouth */}
            <motion.div
              className="absolute top-72 left-1/2 transform -translate-x-1/2"
              animate={mouthControls}
              initial={{ scaleY: 0.2, scaleX: 1 }}
            >
              <svg width="80" height="50" viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="40" cy="25" rx="38" ry="22" fill="url(#mouthGradient)" stroke="#a0785a" strokeWidth="2" />
                <ellipse cx="40" cy="20" rx="35" ry="8" fill="url(#tongueGradient)" opacity="0.6" />
                <defs>
                  <linearGradient id="mouthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#d97272" />
                    <stop offset="50%" stopColor="#c55a5a" />
                    <stop offset="100%" stopColor="#b54545" />
                  </linearGradient>
                  <linearGradient id="tongueGradient">
                    <stop offset="0%" stopColor="#f5a3a3" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Smile lines */}
            <svg className="absolute top-72 left-0 w-full" viewBox="0 0 320 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M 100 8 Q 110 15, 120 20" stroke="#b8865f" strokeWidth="2" fill="none" opacity="0.4" />
              <path d="M 220 8 Q 210 15, 200 20" stroke="#b8865f" strokeWidth="2" fill="none" opacity="0.4" />
            </svg>

            {/* Jawline definition */}
            <svg className="absolute top-80 left-1/2 transform -translate-x-1/2" width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
              <path d="M 40 10 Q 60 30, 100 35 Q 140 30, 160 10" stroke="#b8865f" strokeWidth="2" fill="none" opacity="0.3" />
            </svg>

            {/* Ears */}
            <svg className="absolute top-40 -left-4" width="60" height="100" viewBox="0 0 60 100" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="45" cy="50" rx="22" ry="45" fill="url(#earGradient)" stroke="#a0785a" strokeWidth="2" />
              <ellipse cx="48" cy="50" rx="12" ry="25" fill="#c4956a" opacity="0.6" />
              <path d="M 48 40 Q 52 50, 48 60" stroke="#b8865f" strokeWidth="2" fill="none" />
              <defs>
                <linearGradient id="earGradient" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#d4a574" />
                  <stop offset="100%" stopColor="#c4956a" />
                </linearGradient>
              </defs>
            </svg>

            <svg className="absolute top-40 -right-4" width="60" height="100" viewBox="0 0 60 100" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="15" cy="50" rx="22" ry="45" fill="url(#earGradient2)" stroke="#a0785a" strokeWidth="2" />
              <ellipse cx="12" cy="50" rx="12" ry="25" fill="#c4956a" opacity="0.6" />
              <path d="M 12 40 Q 8 50, 12 60" stroke="#b8865f" strokeWidth="2" fill="none" />
              <defs>
                <linearGradient id="earGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d4a574" />
                  <stop offset="100%" stopColor="#c4956a" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

        {/* Expression Control Panel */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col gap-3">
          <div className="flex gap-2 justify-center flex-wrap">
            <button
              onClick={() => changeExpression('neutral')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                expression === 'neutral' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              😐 Neutral
            </button>
            <button
              onClick={() => changeExpression('happy')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                expression === 'happy' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              😊 Happy
            </button>
            <button
              onClick={() => changeExpression('surprised')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                expression === 'surprised' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              😮 Surprised
            </button>
            <button
              onClick={() => changeExpression('angry')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                expression === 'angry' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              😠 Angry
            </button>
            <button
              onClick={() => changeExpression('sad')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                expression === 'sad' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              😢 Sad
            </button>
            <button
              onClick={() => changeExpression('thinking')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                expression === 'thinking' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              🤔 Thinking
            </button>
          </div>

          <motion.button
            onClick={startTalking}
            disabled={isTalking}
            className="px-12 py-5 bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-green-500/50 border-2 border-green-400 transition-all disabled:opacity-60"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-3 drop-shadow-lg">
              {isTalking ? (
                <>
                  <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse" />
                  Talking...
                </>
              ) : (
                <>
                  <span className="text-2xl">🎙️</span>
                  Make Me Talk!
                </>
              )}
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}