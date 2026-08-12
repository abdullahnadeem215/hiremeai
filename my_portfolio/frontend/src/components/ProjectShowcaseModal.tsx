import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, Sparkles, CheckCircle2 } from 'lucide-react';
import { ABDULLAH_PROFILE } from '../data/portfolio';

interface ProjectShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskAboutProject: (projectTitle: string) => void;
}

export const ProjectShowcaseModal: React.FC<ProjectShowcaseModalProps> = ({
  isOpen,
  onClose,
  onAskAboutProject,
}) => {
  // Esc key close listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800/80 bg-[#0F1115] p-5 sm:p-6 text-slate-100 shadow-2xl scrollbar-thin scrollbar-thumb-slate-700"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div>
                <h2 id="modal-title" className="text-lg font-bold text-white flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-blue-400" />
                  <span>Abdullah Sheikh's Featured Projects</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Explore full-stack AI and high-performance web engineering projects
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close Project Showcase modal"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Projects List Grid */}
            <div className="mt-5 space-y-4">
              {ABDULLAH_PROFILE.projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 transition-all hover:border-blue-500/40 hover:bg-slate-900/90"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h3 className="text-base font-bold text-white flex items-center space-x-2">
                      <span>{project.title}</span>
                    </h3>
                    <div className="flex items-center space-x-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View GitHub repository for ${project.title}`}
                          className="inline-flex items-center space-x-1 rounded-xl border border-slate-800 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                        >
                          <Github className="h-3.5 w-3.5" />
                          <span>Code</span>
                        </a>
                      )}
                      <button
                        onClick={() => {
                          onAskAboutProject(`Tell me more about Abdullah's project: ${project.title}. What architecture did he use and what impact did it achieve?`);
                          onClose();
                        }}
                        className="inline-flex items-center space-x-1 rounded-xl bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-xs font-mono font-semibold text-blue-300 hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                        <span>Ask AI</span>
                      </button>
                    </div>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <ul className="mt-3 space-y-1">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs text-slate-400">
                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack badges */}
                  <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/50">
                    {project.tech.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-mono font-medium text-blue-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end border-t border-slate-800/80 pt-4">
              <button
                onClick={onClose}
                className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Close Showcase
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
