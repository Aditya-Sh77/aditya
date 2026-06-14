import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { AnimatedSection, SectionHeading, fadeInUp } from './AnimationUtils';

export default function EducationSection() {
  return (
    <AnimatedSection id="education" className="py-24">
      <SectionHeading label="Education" title="Academic Background" icon={<GraduationCap size={16} />} />
      <motion.div variants={fadeInUp} className="max-w-2xl">
        <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable glareMaxOpacity={0.06} glareColor="#22d3ee" glarePosition="all" glareBorderRadius="16px" transitionSpeed={400}>
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 transition-all duration-400 hover:border-cyan-400/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]">
            <div className="flex items-start gap-4">
              <motion.div whileHover={{ rotate: 15, scale: 1.1 }} className="bg-cyan-400/10 p-3 rounded-xl text-cyan-400 flex-shrink-0">
                <GraduationCap size={28} />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-slate-100 mb-1">National Institute of Technology, Calicut</h3>
                <p className="text-cyan-400 font-medium text-sm mb-3">B.Tech — Electrical & Electronics Engineering</p>
                <p className="text-slate-400 text-sm mb-2">Minor in Cyber Physical Systems</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['Signal Processing', 'Embedded Systems', 'Control Theory', 'Data Structures', 'Web Development'].map((course, i) => (
                    <motion.span key={course} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 + 0.2 }} className="inline-flex items-center px-3 py-1 text-xs font-medium text-cyan-400 bg-cyan-400/[0.06] border border-cyan-400/[0.12] rounded-full font-mono transition-all duration-300 hover:bg-cyan-400/[0.12] hover:border-cyan-400/25 hover:-translate-y-px">
                      {course}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Tilt>
      </motion.div>
    </AnimatedSection>
  );
}
