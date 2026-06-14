import { motion } from 'framer-motion';

// Shared animation variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export const staggerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

// Reusable section wrapper
export function AnimatedSection({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Section heading with accent line
export function SectionHeading({
  label,
  title,
  icon,
}: {
  label: string;
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div variants={fadeInUp} className="mb-14">
      <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-medium mb-3 tracking-wider uppercase">
        {icon}
        <span>{label}</span>
      </div>
      <h2 className="relative inline-block text-3xl md:text-4xl font-bold text-slate-100">
        {title}
        <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 rounded-full" />
      </h2>
    </motion.div>
  );
}
