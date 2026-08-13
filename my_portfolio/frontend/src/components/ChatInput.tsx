import React, {
  useState,
} from "react";

import { Send, Square } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isStreaming: boolean;
  onCancelStream: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isStreaming,
  onCancelStream,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    const trimmed = inputValue.trim();

    if (!trimmed) {
      return;
    }

    onSendMessage(trimmed);
    setInputValue("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-slate-800/80 bg-[#0B0C10]/95 px-4 py-4 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-2xl">
        <div className="flex items-end gap-3 rounded-2xl border border-slate-700 bg-slate-900/80 p-3 shadow-lg shadow-slate-950/30">
          <textarea
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask about Abdullah's skills, projects, or experience..."
            className="max-h-32 min-h-[44px] flex-1 resize-none border-0 bg-transparent px-2 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />

          {isStreaming ? (
            <button
              type="button"
              onClick={onCancelStream}
              className="inline-flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300 transition hover:bg-red-500/20"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
              Stop
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!inputValue.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            >
              <Send className="h-3.5 w-3.5" />
              Send
            </button>
          )}
        </div>
      </div>
    </div>
  );
};