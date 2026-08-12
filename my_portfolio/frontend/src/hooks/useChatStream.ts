import { useState, useCallback, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Message } from '../types';

const INITIAL_WELCOME_MESSAGE: Message = {
  id: 'welcome-msg',
  role: 'assistant',
  content: `Hello! 👋 Welcome to **HireMe AI**, the interactive portfolio assistant for **Abdullah Sheikh**.

I'm here to answer any questions you have about Abdullah's experience as a **Full-Stack AI & Software Engineer**, his technical stack, key projects, or availability.

*You can choose one of the quick starter prompts below or type your own question in the chat!*`,
  timestamp: Date.now(),
};

export function useChatStream() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_WELCOME_MESSAGE]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const clearChat = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setMessages([INITIAL_WELCOME_MESSAGE]);
    setIsStreaming(false);
  }, []);

  const sendMessageMutation = useMutation({
    mutationFn: async (userPrompt: string) => {
      const userMsgId = `user-${Date.now()}`;
      const assistantMsgId = `assistant-${Date.now()}`;

      const userMsg: Message = {
        id: userMsgId,
        role: 'user',
        content: userPrompt,
        timestamp: Date.now(),
      };

      const assistantMsg: Message = {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
        isStreaming: true,
      };

      // Add user message and empty assistant message to state
      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setIsStreaming(true);

      abortControllerRef.current = new AbortController();

      // Gather current message history (excluding welcome message and new pending)
      const currentHistory = messages.filter((m) => m.id !== 'welcome-msg');

      try {
        const backendUrl = 'http://localhost:8000';
        const response = await fetch(`${backendUrl}/chat/stream?message=${encodeURIComponent(userPrompt)}`, {
          method: 'GET',
          headers: {
            'Accept': 'text/event-stream',
          },
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder('utf-8');

        if (!reader) {
          throw new Error('No response body reader available');
        }

        let accumulatedText = '';
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data:')) {
              // Extract everything after 'data:' and remove the leading space if present
              const dataContent = line.slice(5);
              const dataStr = dataContent.startsWith(' ') ? dataContent.slice(1) : dataContent;
              
              if (dataStr.trim() === '[DONE]') {
                break;
              }
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.text !== undefined) {
                  accumulatedText += parsed.text;
                } else {
                  accumulatedText += dataStr;
                }
              } catch (err) {
                accumulatedText += dataStr;
              }
              
              const currentText = accumulatedText;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMsgId
                    ? { ...msg, content: currentText }
                    : msg
                )
              );
            }
          }
        }

        // Finalize streaming flag for this message
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? { ...msg, isStreaming: false }
              : msg
          )
        );
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.log('Stream aborted by user');
        } else {
          console.error('Failed to stream response:', error);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId
                ? {
                    ...msg,
                    content:
                      msg.content ||
                      'Sorry, I encountered an issue generating a response. Please try again or rephrase your query.',
                    isStreaming: false,
                  }
                : msg
            )
          );
        }
      } finally {
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    },
  });

  const cancelStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
    setMessages((prev) =>
      prev.map((msg) => (msg.isStreaming ? { ...msg, isStreaming: false } : msg))
    );
  }, []);

  return {
    messages,
    isStreaming,
    sendMessage: sendMessageMutation.mutate,
    isLoading: sendMessageMutation.isPending,
    clearChat,
    cancelStreaming,
  };
}
