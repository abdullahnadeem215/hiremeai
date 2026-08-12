import React, { useState } from 'react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { Sparkles, User, Copy, Check } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const isAssistant = message.role === 'assistant';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy message:', err);
    }
  };

  // User Message Design
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

  // Assistant Message Design
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="group flex w-full space-x-3 text-slate-200"
      role="log"
      aria-live={message.isStreaming ? 'polite' : 'off'}
    >
      {/* Bot Avatar */}
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-800/90 border border-slate-700/60 text-blue-400 mt-0.5">
        <Sparkles className="h-3.5 w-3.5" />
      </div>

      {/* Message Content */}
      <div className="flex-1 space-y-1 overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-medium text-slate-400">
            HireMe AI
          </span>
          {message.content && (
            <button
              onClick={handleCopy}
              aria-label="Copy response"
              className="opacity-0 group-hover:opacity-100 flex items-center space-x-1 rounded px-1.5 py-0.5 text-[10px] text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"
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

        <div className="text-sm leading-relaxed text-slate-300 prose prose-invert max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-headings:text-slate-100 prose-headings:font-bold prose-a:text-blue-400 prose-a:underline">
          <ReactMarkdown>{message.content}</ReactMarkdown>

          {/* Typing indicator */}
          {message.isStreaming && (
            <span className="inline-flex items-center ml-1 text-blue-400">
              <span className="inline-block w-1.5 h-4 bg-blue-400 rounded-xs animate-pulse" />
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

