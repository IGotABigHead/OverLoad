'use client';
import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function DynamiqueText() {
  const svgRef = useRef<SVGSVGElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const animate = async () => {
      while (true) {
        // Animation d'apparition
        await controls.start({
          pathLength: 1,
          transition: { duration: 1.5, ease: 'easeInOut' },
        });

        // Attendre 10 secondes
        await new Promise(resolve => setTimeout(resolve, 10000));

        // Animation de disparition
        await controls.start({
          pathLength: 0,
          transition: { duration: 1.5, ease: 'easeInOut' },
        });
      }
    };

    animate();
  }, [controls]);

  return (
    <svg
      ref={svgRef}
      width="700"
      height="125"
      viewBox="0 0 816 200"
      xmlns="http://www.w3.org/2000/svg"
      className="pl-40"
    >
      <rect width="100%" height="100%" fill="#59d6d2" />
      <g transform="translate(0,0) scale(1,0.6667)">
        {/* O */}
        <motion.path
          className="path"
          d="M 60,120 Q 60,60 80,60 Q 100,60 100,120 Q 100,180 80,180 Q 60,180 60,120 Z"
          fill="none"
          stroke="white"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={controls}
          transition={{ delay: 0 }}
        />
        {/* V */}
        <motion.path
          className="path"
          d="M 120,60 L 140,180 L 160,60"
          fill="none"
          stroke="white"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={controls}
          transition={{ delay: 0.2 }}
        />
        {/* E */}
        <motion.path
          className="path"
          d="M 180,60 L 180,180 M 180,60 L 220,60 M 180,120 L 210,120 M 180,180 L 220,180"
          fill="none"
          stroke="white"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={controls}
          transition={{ delay: 0.4 }}
        />
        {/* R */}
        <motion.path
          className="path"
          d="M 240,60 L 240,180 M 240,60 Q 280,60 280,100 Q 280,140 240,140 M 240,140 L 280,180"
          fill="none"
          stroke="white"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={controls}
          transition={{ delay: 0.6 }}
        />
        {/* L */}
        <motion.path
          className="path"
          d="M 300,60 L 300,180 L 340,180"
          fill="none"
          stroke="white"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={controls}
          transition={{ delay: 0.8 }}
        />
        {/* O */}
        <motion.path
          className="path"
          d="M 360,120 Q 360,60 380,60 Q 400,60 400,120 Q 400,180 380,180 Q 360,180 360,120 Z"
          fill="none"
          stroke="white"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={controls}
          transition={{ delay: 1 }}
        />
        {/* A */}
        <motion.path
          className="path"
          d="M 420,180 L 440,60 L 460,180 M 430,120 L 450,120"
          fill="none"
          stroke="white"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={controls}
          transition={{ delay: 1.2 }}
        />
        {/* D */}
        <motion.path
          className="path"
          d="M 480,60 L 480,180 Q 520,180 520,120 Q 520,60 480,60 Z"
          fill="none"
          stroke="white"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={controls}
          transition={{ delay: 1.4 }}
        />
      </g>
    </svg>
  );
}
