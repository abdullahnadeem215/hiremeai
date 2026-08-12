import { useState, useCallback, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Message } from "../types";


const INITIAL_WELCOME_MESSAGE: Message = {
  id: "welcome-msg",
  role: "assistant",
  content: `Hello! 👋 Welcome to **HireMe AI**, the interactive portfolio assistant for **Abdullah Sheikh**.

I'm here to answer questions about Abdullah's experience, technical skills, projects, and software engineering capabilities.

You can ask me anything about his professional profile.`,
  timestamp: Date.now(),
};


export function useChatStream() {

  const [messages, setMessages] = useState<Message[]>([
    INITIAL_WELCOME_MESSAGE,
  ]);

  const [isStreaming, setIsStreaming] =
    useState<boolean>(false);

  const abortControllerRef =
    useRef<AbortController | null>(null);


  const clearChat = useCallback(() => {

    abortControllerRef.current?.abort();

    abortControllerRef.current = null;

    setMessages([
      {
        ...INITIAL_WELCOME_MESSAGE,
        timestamp: Date.now(),
      },
    ]);

    setIsStreaming(false);

  }, []);


  const sendMessageMutation = useMutation({

    mutationFn: async (userPrompt: string) => {

      const userMsgId =
        `user-${Date.now()}`;

      const assistantMsgId =
        `assistant-${Date.now()}`;


      const userMsg: Message = {
        id: userMsgId,
        role: "user",
        content: userPrompt,
        timestamp: Date.now(),
      };


      const assistantMsg: Message = {
        id: assistantMsgId,
        role: "assistant",
        content: "",
        timestamp: Date.now(),
        isStreaming: true,
      };


      setMessages((prev) => [
        ...prev,
        userMsg,
        assistantMsg,
      ]);

      setIsStreaming(true);


      const controller =
        new AbortController();

      abortControllerRef.current =
        controller;


      try {
        const backendUrl = "http://localhost:8000";


        const response = await fetch(
          `${backendUrl}/chat/stream?message=${encodeURIComponent(userPrompt)}`,
          {
            method: "GET",
            headers: {
              Accept: "text/event-stream",
            },
            signal: abortControllerRef.current.signal,
          }
        );


        if (!response.ok) {

          throw new Error(
            `HTTP ${response.status}`
          );
        }


        if (!response.body) {

          throw new Error(
            "Streaming response body is unavailable."
          );
        }


        const reader =
          response.body.getReader();

        const decoder =
          new TextDecoder("utf-8");


        let buffer = "";

        let accumulatedText = "";


        while (true) {

          const {
            done,
            value,
          } = await reader.read();


          if (done) {
            break;
          }


          buffer += decoder.decode(
            value,
            {
              stream: true,
            }
          );


          const events =
            buffer.split("\n\n");


          buffer =
            events.pop() || "";


          for (const event of events) {

            const lines =
              event.split("\n");


            for (const line of lines) {

              if (
                line.startsWith("event:")
              ) {

                const eventName =
                  line.slice(6).trim();


                if (
                  eventName === "done"
                ) {
                  continue;
                }

                if (
                  eventName === "error"
                ) {
                  continue;
                }
              }


              if (
                !line.startsWith("data:")
              ) {
                continue;
              }


              let data =
                line.slice(5).trim();


              if (
                data === "[DONE]"
              ) {
                continue;
              }


              /*
               * Backend sends:
               *
               * data: "Hello"
               *
               * JSON.parse converts it to:
               *
               * Hello
               */

              try {

                data = JSON.parse(data);

              } catch {

                // Fallback for plain text
                // SSE responses.

              }


              if (
                typeof data !== "string"
              ) {
                continue;
              }


              accumulatedText += data;


              const currentText =
                accumulatedText;


              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMsgId
                    ? {
                        ...msg,
                        content:
                          currentText,
                      }
                    : msg
                )
              );
            }
          }
        }


        // Final response state

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? {
                  ...msg,
                  isStreaming: false,
                }
              : msg
          )
        );

      } catch (error: any) {

        if (
          error?.name ===
          "AbortError"
        ) {

          console.log(
            "Stream cancelled."
          );

        } else {

          console.error(
            "Streaming error:",
            error
          );


          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId
                ? {
                    ...msg,

                    content:
                      msg.content ||
                      "Sorry, I couldn't generate a response. Please try again.",

                    isStreaming: false,
                  }
                : msg
            )
          );
        }

      } finally {

        setIsStreaming(false);

        abortControllerRef.current =
          null;
      }
    },
  });


  const cancelStreaming =
    useCallback(() => {

      abortControllerRef.current?.abort();

      abortControllerRef.current = null;

      setIsStreaming(false);


      setMessages((prev) =>
        prev.map((msg) =>
          msg.isStreaming
            ? {
                ...msg,
                isStreaming: false,
              }
            : msg
        )
      );

    }, []);


  return {

    messages,

    isStreaming,

    sendMessage:
      sendMessageMutation.mutate,

    isLoading:
      sendMessageMutation.isPending,

    clearChat,

    cancelStreaming,
  };
}