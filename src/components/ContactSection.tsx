import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './Icons';
import { AnimatedSection, SectionHeading, fadeInUp } from './AnimationUtils';

export default function ContactSection() {
  return (
    <AnimatedSection id="contact" className="py-24">
      <SectionHeading label="Contact" title="Let's Connect" icon={<Send size={16} />} />
      <motion.div variants={fadeInUp} className="relative max-w-2xl">
        <div className="relative overflow-hidden bg-slate-900/40 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 md:p-10 text-center transition-all duration-400 hover:border-cyan-400/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 pointer-events-none" />
          <div className="relative z-10">
            <p className="text-slate-300 text-lg leading-relaxed mb-8">I'm always open to new opportunities, collaborations, and interesting conversations. Whether you have a project in mind or just want to say hi — feel free to reach out!</p>
            <motion.a href="mailto:aditya.sh775@gmail.com" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold text-white bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl shadow-[0_4px_20px_rgba(34,211,238,0.2)] hover:shadow-[0_8px_30px_rgba(34,211,238,0.3)] transition-shadow">
              <Mail size={18} /> Say Hello
            </motion.a>
            <div className="flex justify-center gap-6 mt-8">
              {[
                { href: 'https://github.com/Aditya-Sh77', icon: <GitHubIcon size={22} /> },
                { href: 'https://linkedin.com/in/aditya-sh74', icon: <LinkedInIcon size={22} /> },
                { href: 'mailto:aditya.sh775@gmail.com', icon: <Mail size={22} /> },
              ].map((link, i) => (
                <motion.a key={i} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noreferrer' : undefined} whileHover={{ scale: 1.2, y: -3 }} className="text-slate-500 hover:text-cyan-400 transition-colors duration-300">
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}
