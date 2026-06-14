import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowDown } from 'lucide-react';
import anime from 'animejs';
import { GitHubIcon, LinkedInIcon } from './Icons';
import { fadeInUp, staggerContainer } from './AnimationUtils';

const roles = ['Full-Stack Developer', 'Data Science Enthusiast', 'Embedded Systems Engineer', 'Problem Solver'];

function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 50, pauseDuration = 2000) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.slice(0, text.length + 1));
        if (text.length === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        setText(currentWord.slice(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
}

function BlinkingCursor() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);
  return <span className={`text-cyan-400 ml-0.5 ${visible ? 'opacity-100' : 'opacity-0'}`}>|</span>;
}

function AnimatedName({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const letters = containerRef.current.querySelectorAll('.letter');
    anime({
      targets: letters,
      opacity: [0, 1],
      translateY: [50, 0],
      rotateX: [90, 0],
      duration: 1200,
      delay: anime.stagger(60, { start: 400 }),
      easing: 'easeOutExpo',
    });
  }, []);

  return (
    <span ref={containerRef} className={className} style={{ display: 'inline-block' }}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="letter"
          style={{
            display: 'inline-block',
            opacity: 0,
            whiteSpace: char === ' ' ? 'pre' : undefined,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating blobs */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-cyan-500/[0.03] to-blue-500/[0.03] blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -15, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-40 left-0 w-96 h-96 rounded-full bg-gradient-to-br from-violet-500/[0.03] to-purple-500/[0.03] blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -12, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-blue-500/[0.02] to-cyan-500/[0.02] blur-2xl"
      />
    </div>
  );
}

export default function HeroSection() {
  const typedText = useTypewriter(roles);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!statsRef.current) return;
    const items = statsRef.current.querySelectorAll('.hero-stat');
    anime({
      targets: items,
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(150, { start: 1800 }),
      duration: 800,
      easing: 'easeOutCubic',
    });
  }, []);

  return (
    <motion.section
      id="hero"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="min-h-screen flex flex-col justify-center relative pt-20"
    >
      <FloatingShapes />

      <motion.div variants={fadeInUp} className="font-mono text-cyan-400 text-sm font-medium mb-6 tracking-wider">
        {'// Hello, world!'}
      </motion.div>

      <div className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight mb-4 leading-[1.05]">
        <AnimatedName text="Aditya" className="text-slate-100" />
        <br />
        <AnimatedName text="Sharma." className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />
      </div>

      <motion.div variants={fadeInUp} className="h-10 mb-6">
        <span className="text-xl md:text-2xl text-slate-400 font-light">
          {typedText}
          <BlinkingCursor />
        </span>
      </motion.div>

      <motion.p variants={fadeInUp} className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed mb-4">
        B.Tech Electrical & Electronics Engineering
      </motion.p>
      <motion.p variants={fadeInUp} className="text-sm md:text-base text-slate-500 max-w-xl leading-relaxed mb-10">
        Minor in Cyber Physical Systems @ NIT Calicut
      </motion.p>

      <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mb-12">
        <a
          href="mailto:aditya.sh775@gmail.com"
          className="group inline-flex items-center gap-2 px-8 py-3.5 font-semibold text-white bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(34,211,238,0.25)]"
        >
          <Mail size={18} className="group-hover:rotate-12 transition-transform duration-300" /> Get In Touch
        </a>
        <div className="flex items-center gap-3 ml-2">
          <a href="https://github.com/Aditya-Sh77" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 hover:scale-110 transition-all duration-300">
            <GitHubIcon size={22} />
          </a>
          <a href="https://linkedin.com/in/aditya-sh74" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 hover:scale-110 transition-all duration-300">
            <LinkedInIcon size={22} />
          </a>
        </div>
      </motion.div>

      {/* Quick stats strip */}
      <div ref={statsRef} className="flex flex-wrap gap-8 mb-16">
        {[
          { value: '7+', label: 'Projects' },
          { value: '10+', label: 'Technologies' },
          { value: 'NIT', label: 'Calicut' },
        ].map((s) => (
          <div key={s.label} className="hero-stat opacity-0">
            <span className="text-2xl font-bold text-cyan-400">{s.value}</span>
            <span className="text-sm text-slate-500 ml-2">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-slate-600 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono text-slate-600 tracking-wider">SCROLL</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
