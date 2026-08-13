import React, { useEffect } from "react";
import {
  motion,
  AnimatePresence,
} from "motion/react";

import {
  X,
  Github,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

import { ABDULLAH_PROFILE } from "../data/portfolio";

interface ProjectShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;

  onAskAboutProject: (
    prompt: string
  ) => void;
}

export const ProjectShowcaseModal: React.FC<
  ProjectShowcaseModalProps
> = ({
  isOpen,
  onClose,
  onAskAboutProject,
}) => {
  useEffect(() => {
    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener(
        "keydown",
        handleKeyDown
      );
    }

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 0.7,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 15,
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 220,
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="
              relative
              z-10
              w-full
              max-w-3xl
              max-h-[85vh]
              overflow-y-auto
              rounded-2xl
              border
              border-slate-800/80
              bg-[#0F1115]
              p-5
              sm:p-6
              text-slate-100
              shadow-2xl
            "
          >
            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div>
                <h2
                  id="modal-title"
                  className="
                    flex
                    items-center
                    gap-2
                    text-lg
                    font-bold
                    text-white
                  "
                >
                  <Sparkles className="h-5 w-5 text-blue-400" />

                  Abdullah Sheikh's Featured Projects
                </h2>

                <p className="mt-0.5 text-xs text-slate-400">
                  Explore full-stack AI and
                  software engineering projects
                </p>
              </div>

              <button
                onClick={onClose}
                aria-label="Close project showcase"
                className="
                  rounded-lg
                  p-1.5
                  text-slate-400
                  hover:bg-slate-800
                  hover:text-white
                  transition-colors
                "
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Projects */}

            <div className="mt-5 space-y-4">
              {ABDULLAH_PROFILE.projects.map(
                (project, index) => (
                  <div
                    key={
                      project.id ??
                      `${project.title}-${index}`
                    }
                    className="
                      rounded-2xl
                      border
                      border-slate-800/80
                      bg-slate-900/60
                      p-4
                      transition-all
                      hover:border-blue-500/40
                      hover:bg-slate-900/90
                    "
                  >
                    {/* Project Header */}

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="flex items-center gap-2 text-base font-bold text-white">
                        <Sparkles className="h-4 w-4 text-blue-400" />

                        {project.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2">
                        {/* Ask AI */}

                        <button
                          type="button"
                          onClick={() => {
                            const prompt =
                              `Tell me about Abdullah's project "${project.title}". Explain what the project does, the technologies used, how it was built, and its key highlights. Only use information available in Abdullah's portfolio.`;

                            onAskAboutProject(
                              prompt
                            );

                            onClose();
                          }}
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-xl
                            border
                            border-blue-500/30
                            bg-blue-500/10
                            px-2.5
                            py-1
                            text-xs
                            font-medium
                            text-blue-300
                            hover:bg-blue-600
                            hover:text-white
                            transition-colors
                          "
                        >
                          <MessageCircle className="h-3.5 w-3.5" />

                          Ask AI
                        </button>

                        {/* GitHub */}

                        {project.github && (
                          <a
                            href={
                              project.github
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              inline-flex
                              items-center
                              gap-1
                              rounded-xl
                              border
                              border-slate-800
                              bg-slate-800/80
                              px-2.5
                              py-1
                              text-xs
                              text-slate-300
                              hover:bg-slate-700
                              hover:text-white
                              transition-colors
                            "
                          >
                            <Github className="h-3.5 w-3.5" />

                            Code
                          </a>
                        )}

                        {/* Live Project */}

                        {project.link && (
                          <a
                            href={
                              project.link
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              inline-flex
                              items-center
                              gap-1
                              rounded-xl
                              border
                              border-blue-500/20
                              bg-blue-500/10
                              px-2.5
                              py-1
                              text-xs
                              text-blue-300
                              hover:bg-blue-500/20
                              transition-colors
                            "
                          >
                            <ExternalLink className="h-3.5 w-3.5" />

                            Live
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Description */}

                    {project.description && (
                      <p className="mt-2 text-xs leading-relaxed text-slate-300">
                        {
                          project.description
                        }
                      </p>
                    )}

                    {/* Highlights */}

                    {Array.isArray(
                      project.highlights
                    ) &&
                      project.highlights.length >
                        0 && (
                        <ul className="mt-3 space-y-1">
                          {project.highlights.map(
                            (
                              highlight,
                              idx
                            ) => (
                              <li
                                key={`${project.title}-highlight-${idx}`}
                                className="
                                  flex
                                  items-start
                                  gap-2
                                  text-xs
                                  text-slate-400
                                "
                              >
                                <CheckCircle2
                                  className="
                                    h-3.5
                                    w-3.5
                                    shrink-0
                                    mt-0.5
                                    text-blue-400
                                  "
                                />

                                <span>
                                  {highlight}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      )}

                    {/* Tech */}

                    {Array.isArray(
                      project.tech
                    ) &&
                      project.tech.length >
                        0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5 border-t border-slate-800/50 pt-3">
                          {project.tech.map(
                            (
                              tech,
                              techIndex
                            ) => (
                              <span
                                key={`${project.title}-tech-${techIndex}`}
                                className="
                                  rounded
                                  border
                                  border-blue-500/20
                                  bg-blue-500/10
                                  px-2
                                  py-0.5
                                  text-[10px]
                                  font-mono
                                  font-medium
                                  text-blue-300
                                "
                              >
                                {tech}
                              </span>
                            )
                          )}
                        </div>
                      )}
                  </div>
                )
              )}
            </div>

            {/* Footer */}

            <div className="mt-6 flex justify-end border-t border-slate-800/80 pt-4">
              <button
                onClick={onClose}
                className="
                  rounded-xl
                  bg-slate-800
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-slate-200
                  hover:bg-slate-700
                  hover:text-white
                  transition-colors
                "
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