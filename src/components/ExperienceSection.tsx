import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import anime from 'animejs';
import { AnimatedSection, SectionHeading, fadeInUp } from './AnimationUtils';

const experiences = [
  {
    role: 'Frontend Developer',
    company: 'Google Developer Group (GDG), NIT Calicut',
    period: 'May 2025 — July 2025',
    bullets: [
      'Built a React-based frontend for an Activity Points Management System to enable structured tracking of student event participation.',
      'Worked in a team environment to implement responsive UI components and integrate backend APIs.',
    ],
  },
];

export default function ExperienceSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!lineRef.current || hasAnimated.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          anime({ targets: lineRef.current, scaleY: [0, 1], duration: 1000, easing: 'easeOutExpo' });
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(lineRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatedSection id="experience" className="py-24">
      <SectionHeading label="Experience" title="Where I've Worked" icon={<Briefcase size={16} />} />
      <div className="relative ml-4 pl-8">
        <div ref={lineRef} className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent origin-top" style={{ transform: 'scaleY(0)' }} />
        {experiences.map((exp, i) => (
          <motion.div key={i} variants={fadeInUp} className="relative mb-12 last:mb-0">
            <div className="absolute -left-[25px] top-1">
              <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.4)]" />
              <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-cyan-400/40 animate-ping" />
            </div>
            <motion.div whileHover={{ scale: 1.01, x: 4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="bg-slate-900/40 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 md:p-8 transition-all duration-400 hover:border-cyan-400/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-100">{exp.role}</h3>
                  <p className="text-cyan-400 font-medium text-sm">{exp.company}</p>
                </div>
                <span className="font-mono text-xs text-slate-500 bg-slate-800/60 px-3 py-1 rounded-full whitespace-nowrap">{exp.period}</span>
              </div>
              <ul className="space-y-3">
                {exp.bullets.map((bullet, j) => (
                  <motion.li key={j} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: j * 0.15 + 0.3 }} className="text-slate-400 text-sm leading-relaxed flex gap-3">
                    <span className="text-cyan-500 mt-1.5 flex-shrink-0">▹</span>{bullet}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
