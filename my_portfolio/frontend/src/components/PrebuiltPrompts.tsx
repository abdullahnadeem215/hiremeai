import React from 'react';
import { motion } from 'motion/react';
import { Code2, Sparkles, FolderKanban, Briefcase, ArrowUpRight } from 'lucide-react';

interface PrebuiltPromptsProps {
  onSelectPrompt: (promptText: string) => void;
  disabled?: boolean;
}

const STARTER_PROMPTS = [
  {
    title: "Technical Stack",
    icon: Code2,
    prompt: "What is Abdullah Sheikh's core technical stack in React, TypeScript, and AI?",
  },
  {
    title: "Featured Projects",
    icon: FolderKanban,
    prompt: "show me  projects of Abdullah Sheikh and his GitHub repositories.",
  },
  {
    title: "Why Hire Abdullah?",
    icon: Briefcase,
    prompt: "Give me a summary of why Abdullah Sheikh is a great fit for full-stack engineering roles.",
  },
  {
    title: "Contact & Resume",
    icon: Sparkles,
    prompt: "How can I contact Abdullah or download his full resume?",
  },
];

export const PrebuiltPrompts: React.FC<PrebuiltPromptsProps> = ({
  onSelectPrompt,
  disabled = false,
}) => {
  return (
    <div className="w-full my-4">
      <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2.5 text-center sm:text-left">
        Suggested prompts
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {STARTER_PROMPTS.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: index * 0.04 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={disabled}
              onClick={() => onSelectPrompt(item.prompt)}
              className="group flex items-start justify-between rounded-xl border border-slate-800/90 bg-slate-900/60 p-3 text-left transition-all hover:border-blue-500/50 hover:bg-slate-900 disabled:opacity-50"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <IconComponent className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-white">
                    {item.title}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.prompt}
                </p>
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-blue-400 shrink-0 transition-colors ml-2 mt-0.5" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

