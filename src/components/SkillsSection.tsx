import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, Terminal, Layout, Database } from 'lucide-react';
import anime from 'animejs';
import { AnimatedSection, SectionHeading } from './AnimationUtils';

const skillCategories = [
  {
    title: 'Programming',
    icon: <Terminal size={18} />,
    skills: [
      { name: 'Python', level: 85 },
      { name: 'C/C++', level: 75 },
      { name: 'Java', level: 65 },
      { name: 'SQL', level: 70 },
      { name: 'DSA', level: 80 },
    ],
  },
  {
    title: 'Development',
    icon: <Layout size={18} />,
    skills: [
      { name: 'React / TypeScript', level: 80 },
      { name: 'Node.js', level: 75 },
      { name: 'WebSockets', level: 70 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'REST APIs', level: 75 },
    ],
  },
  {
    title: 'Data Science & ML',
    icon: <Database size={18} />,
    skills: [
      { name: 'Scikit-learn', level: 75 },
      { name: 'Pandas', level: 80 },
      { name: 'Matplotlib', level: 70 },
      { name: 'Seaborn', level: 70 },
      { name: 'Streamlit', level: 65 },
    ],
  },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-300 font-medium">{name}</span>
        <motion.span
          className="text-xs font-mono text-cyan-400/70"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: delay * 0.1 + 0.5 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
          style={{ transformOrigin: 'left' }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: level / 100 } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay: delay * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}

function SkillCategory({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!cardRef.current || hasAnimated.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          anime({
            targets: cardRef.current,
            opacity: [0, 1],
            translateY: [60, 0],
            scale: [0.9, 1],
            duration: 900,
            delay: index * 200,
            easing: 'easeOutExpo',
          });
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      style={{ opacity: 0 }}
      className="bg-slate-900/40 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 transition-all duration-400 hover:border-cyan-400/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:-translate-y-1"
    >
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          className="text-cyan-400 bg-cyan-400/10 p-2 rounded-lg"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {category.icon}
        </motion.div>
        <h3 className="text-lg font-semibold text-slate-100">{category.title}</h3>
      </div>
      <div className="space-y-4">
        {category.skills.map((skill, i) => (
          <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i} />
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <AnimatedSection id="skills" className="py-24">
      <SectionHeading label="Skills" title="Technical Arsenal" icon={<Cpu size={16} />} />
      <div className="grid md:grid-cols-3 gap-6">
        {skillCategories.map((cat, i) => (
          <SkillCategory key={cat.title} category={cat} index={i} />
        ))}
      </div>
    </AnimatedSection>
  );
}
