import React from 'react';
import { Sparkles, Download, Trash2, PanelLeft, FolderKanban } from 'lucide-react';
import { ABDULLAH_PROFILE } from '../data/portfolio';

interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenProjects: () => void;
  onClearChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isSidebarOpen,
  onToggleSidebar,
  onOpenProjects,
  onClearChat,
}) => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-800/80 bg-[#0B0C10]/90 px-4 sm:px-6 backdrop-blur-lg">
      {/* Left Branding & Drawer Trigger */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? "Close Profile Sidebar" : "Open Profile Sidebar"}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/90 text-slate-400 hover:text-white hover:border-slate-700 transition-colors focus:outline-none"
        >
          <PanelLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-900/40">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold tracking-tight text-white font-sans">
              HireMe<span className="text-blue-400">.AI</span>
            </span>
            <span className="flex items-center space-x-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Online</span>
            </span>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onOpenProjects}
          aria-label="View Projects"
          className="hidden sm:flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <FolderKanban className="h-3.5 w-3.5 text-blue-400" />
          <span>Projects</span>
        </button>

        <a
          href="/api/download-resume"
          download="Abdullah_Sheikh_Resume.txt"
          aria-label="Download Resume"
          className="flex items-center space-x-1.5 rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-500 transition-colors shadow-sm"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Resume</span>
        </a>

        <button
          onClick={onClearChat}
          aria-label="Clear chat"
          title="Clear Chat"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
};

