import React, { useState, useRef, useEffect } from 'react';
import { Send, Square } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isStreaming: boolean;
  onCancelStream: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isStreaming,
  onCancelStream,
}) => {
  const [input, setInput] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-resize textarea according to text height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    onSendMessage(trimmed);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="sticky bottom-0 z-20 w-full border-t border-slate-800/60 bg-[#0B0C10]/95 p-3 sm:p-4 backdrop-blur-lg">
      <div className="mx-auto max-w-2xl space-y-2">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-2 shadow-xl focus-within:border-blue-500/80 focus-within:ring-1 focus-within:ring-blue-500/40 transition-all"
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message HireMe AI assistant..."
            aria-label="Chat query input"
            className="w-full resize-none bg-transparent py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none max-h-36 scrollbar-thin scrollbar-thumb-slate-700"
          />

          <div className="flex items-center ml-2 shrink-0">
            {isStreaming ? (
              <button
                type="button"
                onClick={onCancelStream}
                aria-label="Stop generation"
                title="Stop generation"
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-900/80 text-red-100 hover:bg-red-800 transition-colors"
              >
                <Square className="h-3.5 w-3.5 fill-current" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-30 disabled:hover:bg-blue-600 transition-all"
              >
                <Send className="h-4 w-4" />
              </button>
            )}
          </div>
        </form>

        <p className="text-[10px] text-center text-slate-500 font-mono">
          Press Enter to send message
        </p>
      </div>
    </div>
  );
};


