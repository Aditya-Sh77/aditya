import { motion } from 'framer-motion';
import { User, FolderOpen, Code2 } from 'lucide-react';
import { AnimatedSection, SectionHeading, fadeInUp } from './AnimationUtils';
import { useEffect, useRef, useState } from 'react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const step = Math.max(1, Math.floor(target / 40));
          const interval = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(interval); }
            else { setCount(start); }
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function AboutSection() {
  const stats = [
    { icon: <FolderOpen size={18} />, value: 7, suffix: '+', label: 'Projects' },
    { icon: <Code2 size={18} />, value: 10, suffix: '+', label: 'Technologies' },
    //{ icon: <Zap size={18} />, value: 1, suffix: '', label: 'Internship' },
  ];

  return (
    <AnimatedSection id="about" className="py-24">
      <SectionHeading label="About" title="Who I Am" icon={<User size={16} />} />

      <div className="grid md:grid-cols-5 gap-10">
        <motion.div variants={fadeInUp} className="md:col-span-3 space-y-5">
          <p className="text-slate-300 leading-relaxed text-base">
            I'm a developer and engineering student at{' '}
            <span className="text-cyan-400 font-medium">NIT Calicut</span>, pursuing B.Tech in
            Electrical & Electronics Engineering with a minor in Cyber Physical Systems.
          </p>
          <p className="text-slate-400 leading-relaxed text-base">
            I bridge the gap between hardware systems and modern web applications — from building
            real-time intrusion detection dashboards to implementing matched filters on Arduino.
            I'm passionate about algorithms, data analysis, and creating impactful digital solutions.
          </p>
          <p className="text-slate-400 leading-relaxed text-base">
            When I'm not coding, you'll find me exploring new frameworks, diving into research papers,
            or contributing to developer communities like GDG NIT Calicut.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="md:col-span-2 grid grid-cols-1 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-900/40 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 text-center transition-all duration-400 hover:border-cyan-400/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:-translate-y-1"
            >
              <div className="text-cyan-400 flex justify-center mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-slate-100 mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
