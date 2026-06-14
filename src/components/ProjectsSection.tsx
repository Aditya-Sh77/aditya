import { motion } from 'framer-motion';
import { Code2, ExternalLink } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { AnimatedSection, SectionHeading, fadeInUp } from './AnimationUtils';

const projects = [
  {
    title: 'Real-Time IDS System',
    description: 'Built a real-time network intrusion detection system with a React-based SOC dashboard featuring real-time alert streaming via Socket.IO. Implemented Suricata rule management and live threat visualization.',
    tech: ['Suricata', 'Node.js', 'React', 'Socket.IO', 'Tailwind'],
    period: 'Nov 2025 — Jan 2026',
    gradient: 'from-cyan-500/10 to-blue-500/10',
    accent: 'text-cyan-400',
    iconBg: 'bg-cyan-400/10',
  },
  {
    title: 'Stroke Data Prediction Model',
    description: 'Developed an ML model with tuned hyperparameters for better ROC-AUC. Visualized feature relationships with SHAP explanations and deployed an interactive prediction interface via Streamlit.',
    tech: ['Streamlit', 'Scikit-learn', 'Pandas', 'SMOTE'],
    period: 'May 2025 — Jun 2025',
    gradient: 'from-violet-500/10 to-purple-500/10',
    accent: 'text-violet-400',
    iconBg: 'bg-violet-400/10',
  },
  {
    title: 'Matched Filter Signal Detection',
    description: 'Implemented a cross-correlation based matched filter on Arduino UNO for signal detection in noisy data. Designed a first-order active low-pass filter and validated with MATLAB/Simulink simulations.',
    tech: ['Arduino UNO', 'MATLAB', 'Simulink', 'Cross-Correlation'],
    period: 'Mar 2026 — Apr 2026',
    gradient: 'from-blue-500/10 to-indigo-500/10',
    accent: 'text-blue-400',
    iconBg: 'bg-blue-400/10',
  },
  {
    title: 'PMGSY Data Analysis',
    description: 'Analyzed PMGSY scheme data to evaluate roadway development across India. Cleaned 2000+ records and identified budget allocation relationships through statistical analysis and rich visualizations.',
    tech: ['Numpy', 'Pandas', 'Matplotlib', 'Seaborn'],
    period: 'Sept 2024 — Oct 2024',
    gradient: 'from-emerald-500/10 to-teal-500/10',
    accent: 'text-emerald-400',
    iconBg: 'bg-emerald-400/10',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className="group"
    >
      <Tilt
        tiltMaxAngleX={8}
        tiltMaxAngleY={8}
        glareEnable={true}
        glareMaxOpacity={0.08}
        glareColor="#22d3ee"
        glarePosition="all"
        glareBorderRadius="16px"
        scale={1.02}
        transitionSpeed={400}
      >
        <div className={`bg-gradient-to-br ${project.gradient} bg-slate-900/40 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 md:p-7 h-full flex flex-col transition-all duration-400 hover:border-cyan-400/20 hover:shadow-[0_0_25px_rgba(34,211,238,0.12)]`}>
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <motion.div
              className={`${project.accent} ${project.iconBg} p-2.5 rounded-xl`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Code2 size={22} strokeWidth={1.5} />
            </motion.div>
            <span className="font-mono text-xs text-slate-500 bg-slate-800/60 px-2.5 py-1 rounded-full">
              {project.period}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-100 mb-3 group-hover:text-cyan-300 transition-colors duration-300 flex items-center gap-2">
            {project.title}
            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-slate-500" />
          </h3>

          {/* Description */}
          <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{project.description}</p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 + 0.2 }}
                className="inline-flex items-center px-3 py-1 text-xs font-medium text-cyan-400 bg-cyan-400/[0.06] border border-cyan-400/[0.12] rounded-full font-mono transition-all duration-300 hover:bg-cyan-400/[0.12] hover:border-cyan-400/25 hover:-translate-y-px"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <AnimatedSection id="projects" className="py-24">
      <SectionHeading label="Projects" title="Things I've Built" icon={<Code2 size={16} />} />
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </AnimatedSection>
  );
}
