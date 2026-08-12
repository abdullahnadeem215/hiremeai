import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Mail, Github, Linkedin, MapPin, Briefcase, Award, 
  Code, Sparkles, ExternalLink, Download, FileText, CheckCircle2 
} from 'lucide-react';
import { ABDULLAH_PROFILE } from '../data/portfolio';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onPromptSelect: (prompt: string) => void;
  onOpenProjects: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onPromptSelect,
  onOpenProjects,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/80 lg:hidden"
            aria-hidden="true"
          />

          {/* Sidebar Drawer */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 z-50 flex w-80 flex-col border-r border-slate-800/60 bg-[#0F1115] p-5 text-slate-200 overflow-y-auto lg:static lg:z-10 lg:w-80 lg:shrink-0 scrollbar-thin scrollbar-thumb-slate-800"
            aria-label="Abdullah Sheikh Profile Information"
          >
            {/* Header / Close button */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
              <div className="flex items-center space-x-2">
                <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-slate-400 uppercase">
                  Candidate Profile
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close Profile Sidebar"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Profile Avatar & Info Header */}
            <div className="mt-4 p-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 mb-4 shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center text-white text-2xl font-bold">
                AS
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-white">{ABDULLAH_PROFILE.name}</h2>
              <p className="text-slate-400 text-sm font-medium mt-0.5">{ABDULLAH_PROFILE.title}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-slate-800 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  Active Now
                </span>
                <span className="px-2 py-1 rounded bg-blue-500/10 text-[10px] font-mono text-blue-400 uppercase tracking-widest border border-blue-500/20">
                  AI Agent
                </span>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-slate-400">
                {ABDULLAH_PROFILE.bio}
              </p>

              <div className="mt-3 flex items-center space-x-1.5 text-xs text-slate-500">
                <MapPin className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                <span>{ABDULLAH_PROFILE.location}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 space-y-2">
              <a
                href={`mailto:${ABDULLAH_PROFILE.email}`}
                className="flex w-full items-center justify-center space-x-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-blue-500/40 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Mail className="h-4 w-4 text-blue-400" />
                <span>Email Abdullah</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={ABDULLAH_PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 rounded-xl border border-slate-800 bg-slate-900/60 px-2.5 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                >
                  <Github className="h-3.5 w-3.5 text-slate-400" />
                  <span>GitHub</span>
                </a>
                <a
                  href="/api/download-resume"
                  download="Abdullah_Sheikh_Resume.txt"
                  className="flex items-center justify-center space-x-1.5 rounded-xl border border-blue-500/20 bg-blue-500/10 px-2.5 py-2 text-xs font-medium text-blue-300 transition-colors hover:bg-blue-500/20 hover:text-white"
                >
                  <Download className="h-3.5 w-3.5 text-blue-400" />
                  <span>Resume</span>
                </a>
              </div>
            </div>

            {/* Prebuilt Navigation Prompts */}
            <div className="mt-6 pt-4 border-t border-slate-800/60">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">
                Pre-built Prompts
              </h3>
              <nav className="space-y-1" role="navigation" aria-label="Quick navigation prompts">
                <button
                  onClick={() => {
                    onPromptSelect("What is Abdullah's full tech stack for a Senior Full-Stack role?");
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800/50 transition-colors group flex items-center gap-3 border border-transparent hover:border-slate-700/50"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  <span className="text-xs text-slate-300 group-hover:text-white">What is his tech stack?</span>
                </button>

                <button
                  onClick={() => {
                    onPromptSelect("Show me Abdullah's recent full-stack AI projects and achievements.");
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800/50 transition-colors group flex items-center gap-3 border border-transparent hover:border-slate-700/50"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-300 group-hover:text-white">Show me recent projects</span>
                </button>

                <button
                  onClick={() => {
                    onPromptSelect("How can I contact Abdullah Sheikh directly or get his resume?");
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800/50 transition-colors group flex items-center gap-3 border border-transparent hover:border-slate-700/50"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span className="text-xs text-slate-300 group-hover:text-white">How can I contact him?</span>
                </button>

                <button
                  onClick={() => {
                    onPromptSelect("Give me an executive summary of Abdullah's engineering experience and background.");
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800/50 transition-colors group flex items-center gap-3 border border-transparent hover:border-slate-700/50"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  <span className="text-xs text-slate-300 group-hover:text-white">Experience Overview</span>
                </button>
              </nav>
            </div>

            {/* Skill Categories */}
            <div className="mt-6">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">
                Technical Skills
              </h3>
              <div className="space-y-3">
                {ABDULLAH_PROFILE.skills.map((skillGroup, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-300">{skillGroup.category}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {skillGroup.items.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="rounded-md border border-slate-800 bg-slate-900/90 px-2 py-0.5 text-[10px] font-mono text-slate-400 hover:border-blue-500/40 hover:text-blue-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruiter Access Box */}
            <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
              <p className="text-[10px] text-blue-300/60 uppercase tracking-widest font-mono font-bold mb-1">
                Recruiter Access
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ask anything about Abdullah's career, technical skills, or soft skills.
              </p>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-6 text-center text-[10px] font-mono text-slate-600">
              <p>HireMe AI • Immersive UI</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
