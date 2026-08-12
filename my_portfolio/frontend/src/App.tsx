import React, { useState, useRef, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { PrebuiltPrompts } from './components/PrebuiltPrompts';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ProjectShowcaseModal } from './components/ProjectShowcaseModal';
import { useChatStream } from './hooks/useChatStream';
import { ABDULLAH_PROFILE } from './data/portfolio';
import { Sparkles, ArrowDown, Bot, CheckCircle2 } from 'lucide-react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

function MainChatApp() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState<boolean>(false);
  const [showScrollBottom, setShowScrollBottom] = useState<boolean>(false);

  const {
    messages,
    isStreaming,
    sendMessage,
    clearChat,
    cancelStreaming,
  } = useChatStream();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when new messages stream in
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isStreaming]);

  // Track scroll position to show "Scroll to bottom" button if scrolled up
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isUp = scrollHeight - scrollTop - clientHeight > 150;
      setShowScrollBottom(isUp);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0C10] text-slate-200 font-sans antialiased relative">
      {/* Sidebar Profile Drawer */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onPromptSelect={(prompt) => sendMessage(prompt)}
        onOpenProjects={() => setIsProjectsModalOpen(true)}
      />

      {/* Main Chat Layout */}
      <div className="flex flex-1 flex-col h-full overflow-hidden relative z-10">
        {/* Minimal Header */}
        <Header
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          onOpenProjects={() => setIsProjectsModalOpen(true)}
          onClearChat={clearChat}
        />

        {/* Chat Canvas */}
        <div
          ref={chatContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-4 py-6 max-w-2xl w-full mx-auto flex flex-col justify-between scrollbar-thin scrollbar-thumb-slate-800"
        >
          {messages.length <= 1 ? (
            /* Minimal Welcome Landing State */
            <div className="flex flex-col items-center justify-center my-auto py-8 text-center space-y-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-900/40">
                <Bot className="h-6 w-6" />
              </div>

              <div className="space-y-1.5">
                <h1 className="text-lg font-bold text-white">
                  How can I help you learn about Abdullah?
                </h1>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  I'm <strong className="text-slate-200">{ABDULLAH_PROFILE.name}</strong>'s AI assistant. Ask me anything about his technical stack, engineering projects, or background!
                </p>
              </div>

              <div className="w-full pt-2">
                <PrebuiltPrompts
                  onSelectPrompt={(prompt) => sendMessage(prompt)}
                  disabled={isStreaming}
                />
              </div>
            </div>
          ) : (
            /* Active Message Thread */
            <div className="space-y-5 w-full py-2">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Scroll Bottom Floating Button */}
        {showScrollBottom && (
          <button
            onClick={scrollToBottom}
            aria-label="Scroll to bottom"
            className="absolute bottom-20 right-6 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-blue-400 shadow-xl hover:bg-blue-600 hover:text-white transition-colors"
          >
            <ArrowDown className="h-4 w-4" />
          </button>
        )}

        {/* Minimal Chat Input */}
        <ChatInput
          onSendMessage={(text) => sendMessage(text)}
          isStreaming={isStreaming}
          onCancelStream={cancelStreaming}
        />
      </div>

      {/* Project Showcase Modal */}
      <ProjectShowcaseModal
        isOpen={isProjectsModalOpen}
        onClose={() => setIsProjectsModalOpen(false)}
        onAskAboutProject={(prompt) => sendMessage(prompt)}
      />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainChatApp />
    </QueryClientProvider>
  );
}

