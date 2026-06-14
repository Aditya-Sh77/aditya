import ParticleBackground from './components/ParticleBackground';
import MouseGlow from './components/MouseGlow';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#06080f] text-slate-100" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <ParticleBackground />
      <MouseGlow />
      <Navbar />

      <main className="relative z-10 max-w-6xl mx-auto px-6">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-500 text-sm">
            Designed & Built by <span className="text-cyan-400">Aditya Sharma</span>
          </p>
          <p className="text-slate-600 text-xs mt-2">
            Built with React, Vite & Tailwind · © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}