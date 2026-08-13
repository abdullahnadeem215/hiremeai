import React, { useState } from "react";
import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import {
  ExternalLink,
  Github,
  Sparkles,
  MessageCircle,
  Copy,
  Check,
} from "lucide-react";

import type { Message, Project } from "../types";

interface ProjectCardsProps {
  projects: Project[];
  onAskProject: (project: Project) => void;
}

export const ProjectCards: React.FC<ProjectCardsProps> = ({
  projects,
  onAskProject,
}) => {
  if (!projects || projects.length === 0) {
    return <p className="text-sm text-slate-400">No projects found.</p>;
  }

  return (
    <div className="mt-2 grid grid-cols-1 gap-3">
      {projects.map((project, projectIndex) => (
        <div
          key={project.id || `${project.title}-${projectIndex}`}
          className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-4 transition-all duration-200 hover:border-blue-500/40 hover:bg-slate-900 hover:shadow-lg hover:shadow-blue-500/5"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
              <Sparkles className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-slate-100">{project.title}</h3>

              {project.description && (
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  {project.description}
                </p>
              )}
            </div>
          </div>

          {Array.isArray(project.technologies) && project.technologies.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.technologies.map((technology, index) => (
                <span
                  key={`${project.title}-technology-${index}`}
                  className="rounded-md border border-slate-700 bg-slate-800/80 px-2 py-1 text-[10px] font-mono text-slate-400"
                >
                  {technology}
                </span>
              ))}
            </div>
          )}

          {Array.isArray(project.highlights) && project.highlights.length > 0 && (
            <div className="mt-4 space-y-1.5">
              {project.highlights.map((highlight, index) => (
                <div
                  key={`${project.title}-highlight-${index}`}
                  className="flex gap-2 text-xs leading-relaxed text-slate-400"
                >
                  <span className="mt-1 text-blue-400">•</span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onAskProject(project)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-2.5 py-1.5 text-[11px] font-medium text-blue-400 transition-all hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-300"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Ask about this project
            </button>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/70 px-2.5 py-1.5 text-[11px] text-slate-300 transition-colors hover:border-slate-600 hover:text-white"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
            )}

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-1.5 text-[11px] text-blue-400 transition-colors hover:bg-blue-500/20"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View Project
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

interface ChatMessageProps {
  message: Message;
  onAskProject: (project: Project) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onAskProject,
}) => {
  const [copied, setCopied] = useState(false);

  const isAssistant = message.role === "assistant";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  if (!isAssistant) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="flex w-full justify-end"
      >
        <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-blue-600 px-4 py-2.5 text-sm text-white shadow-md leading-relaxed">
          {message.content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="group flex w-full space-x-3 text-slate-200"
    >
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-800/90 text-blue-400">
        <Sparkles className="h-3.5 w-3.5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-medium text-slate-400">
            HireMe AI
          </span>

          {message.content && (
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-slate-400 opacity-0 transition group-hover:opacity-100 hover:text-slate-200"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>

        {message.type === "projects" && Array.isArray(message.projects) ? (
          <ProjectCards projects={message.projects} onAskProject={onAskProject} />
        ) : (
          <div className="mt-1 max-w-none text-sm leading-relaxed text-slate-300 prose prose-invert prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-headings:text-slate-100 prose-headings:font-bold prose-a:text-blue-400 prose-a:underline">
            <ReactMarkdown>{message.content}</ReactMarkdown>

            {message.isStreaming && (
              <span className="ml-1 inline-flex items-center text-blue-400">
                <span className="inline-block h-4 w-1.5 animate-pulse rounded-xs bg-blue-400" />
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};