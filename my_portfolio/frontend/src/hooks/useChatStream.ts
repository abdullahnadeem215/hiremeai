import {
  useState,
  useCallback,
  useRef,
} from "react";

import {
  Message,
  Project,
} from "../types";

const BACKEND_URL = "http://localhost:8000";


/*
|--------------------------------------------------------------------------
| Initial Welcome Message
|--------------------------------------------------------------------------
*/

const INITIAL_WELCOME_MESSAGE: Message = {
  id: "welcome-msg",
  role: "assistant",
  type: "text",

  content: `Hello! 👋 Welcome to **HireMe AI**, the interactive portfolio assistant for **Abdullah Sheikh**.

I'm here to answer questions about Abdullah's experience, technical skills, projects, and software engineering capabilities.

You can ask me anything about his professional profile.`,

  timestamp: Date.now(),
};


/*
|--------------------------------------------------------------------------
| Normalize Project
|--------------------------------------------------------------------------
|
| Converts backend project JSON into the exact Project interface
| expected by the frontend.
|
*/

function normalizeProject(
  project: any,
  index: number
): Project {

  return {
    id:
      project?.id ??
      `${project?.title ?? "project"}-${index}`,

    title:
      String(
        project?.title ??
        "Untitled Project"
      ),

    description:
      String(
        project?.description ??
        ""
      ),

    technologies:
      Array.isArray(
        project?.technologies
      )
        ? project.technologies.map(
            (technology: unknown) =>
              String(technology)
          )
        : [],

    github:
      project?.github
        ? String(project.github)
        : undefined,

    link:
      project?.link
        ? String(project.link)
        : undefined,

    highlights:
      Array.isArray(
        project?.highlights
      )
        ? project.highlights.map(
            (highlight: unknown) =>
              String(highlight)
          )
        : [],
  };
}


/*
|--------------------------------------------------------------------------
| Parse Project Response
|--------------------------------------------------------------------------
|
| Checks whether the parsed backend response is:
|
| {
|   type: "projects",
|   projects: [...]
| }
|
*/

function parseProjectResponse(
  value: unknown
): Project[] | null {

  if (
    !value ||
    typeof value !== "object"
  ) {
    return null;
  }

  const data =
    value as {
      type?: unknown;
      projects?: unknown;
    };

  if (
    data.type !== "projects" ||
    !Array.isArray(data.projects)
  ) {
    return null;
  }

  return data.projects.map(
    (project, index) =>
      normalizeProject(
        project,
        index
      )
  );
}


/*
|--------------------------------------------------------------------------
| Hook
|--------------------------------------------------------------------------
*/

export function useChatStream() {

  const [
    messages,
    setMessages,
  ] = useState<Message[]>([
    INITIAL_WELCOME_MESSAGE,
  ]);


  const [
    isStreaming,
    setIsStreaming,
  ] = useState(false);


  const abortControllerRef =
    useRef<AbortController | null>(
      null
    );


  /*
  |--------------------------------------------------------------------------
  | Clear Chat
  |--------------------------------------------------------------------------
  */

  const clearChat =
    useCallback(() => {

      abortControllerRef.current?.abort();

      abortControllerRef.current = null;

      setMessages([
        {
          ...INITIAL_WELCOME_MESSAGE,
          id: `welcome-${Date.now()}`,
          timestamp: Date.now(),
        },
      ]);

      setIsStreaming(false);

    }, []);


  /*
  |--------------------------------------------------------------------------
  | Send Message
  |--------------------------------------------------------------------------
  */

  const sendMessage =
    useCallback(
      async (userPrompt: string) => {

        const trimmedPrompt =
          userPrompt.trim();

        if (!trimmedPrompt) {
          return;
        }

        /*
        |--------------------------------------------------------------------------
        | Prevent multiple simultaneous streams
        |--------------------------------------------------------------------------
        */

        if (isStreaming) {
          return;
        }


        /*
        |--------------------------------------------------------------------------
        | Create IDs
        |--------------------------------------------------------------------------
        */

        const userMsgId =
          `user-${Date.now()}`;

        const assistantMsgId =
          `assistant-${Date.now() + 1}`;


        /*
        |--------------------------------------------------------------------------
        | User Message
        |--------------------------------------------------------------------------
        */

        const userMessage: Message = {
          id: userMsgId,
          role: "user",
          type: "text",
          content: trimmedPrompt,
          timestamp: Date.now(),
        };


        /*
        |--------------------------------------------------------------------------
        | Assistant Placeholder
        |--------------------------------------------------------------------------
        */

        const assistantMessage: Message = {
          id: assistantMsgId,
          role: "assistant",
          type: "text",
          content: "",
          timestamp: Date.now(),
          isStreaming: true,
        };


        /*
        |--------------------------------------------------------------------------
        | Add messages
        |--------------------------------------------------------------------------
        */

        setMessages(
          (previousMessages) => [
            ...previousMessages,
            userMessage,
            assistantMessage,
          ]
        );


        setIsStreaming(true);


        /*
        |--------------------------------------------------------------------------
        | Abort Controller
        |--------------------------------------------------------------------------
        */

        const controller =
          new AbortController();

        abortControllerRef.current =
          controller;


        try {

          /*
          |--------------------------------------------------------------------------
          | Backend URL
          |--------------------------------------------------------------------------
          */

          const url =
            `${BACKEND_URL}/chat/stream?message=` +
            encodeURIComponent(
              trimmedPrompt
            );


          console.log(
            "Sending message:",
            trimmedPrompt
          );


          /*
          |--------------------------------------------------------------------------
          | Fetch SSE Stream
          |--------------------------------------------------------------------------
          */

          const response =
            await fetch(
              url,
              {
                method: "GET",

                headers: {
                  Accept:
                    "text/event-stream",
                },

                signal:
                  controller.signal,
              }
            );


          /*
          |--------------------------------------------------------------------------
          | HTTP Error
          |--------------------------------------------------------------------------
          */

          if (!response.ok) {

            throw new Error(
              `HTTP ${response.status}: ${response.statusText}`
            );
          }


          /*
          |--------------------------------------------------------------------------
          | Response Body Check
          |--------------------------------------------------------------------------
          */

          if (!response.body) {

            throw new Error(
              "Streaming response body is unavailable."
            );
          }


          /*
          |--------------------------------------------------------------------------
          | Reader
          |--------------------------------------------------------------------------
          */

          const reader =
            response.body.getReader();


          const decoder =
            new TextDecoder(
              "utf-8"
            );


          /*
          |--------------------------------------------------------------------------
          | Buffers
          |--------------------------------------------------------------------------
          */

          let buffer = "";

          let accumulatedText = "";

          let projectResponseReceived =
            false;


          /*
          |--------------------------------------------------------------------------
          | Read Stream
          |--------------------------------------------------------------------------
          */

          while (true) {

            const {
              done,
              value,
            } =
              await reader.read();


            /*
            |--------------------------------------------------------------------------
            | Stream Finished
            |--------------------------------------------------------------------------
            */

            if (done) {
              break;
            }


            /*
            |--------------------------------------------------------------------------
            | Decode Chunk
            |--------------------------------------------------------------------------
            */

            buffer +=
              decoder.decode(
                value,
                {
                  stream: true,
                }
              );


            /*
            |--------------------------------------------------------------------------
            | Split SSE Events
            |--------------------------------------------------------------------------
            |
            | SSE events are separated by:
            |
            | \n\n
            |
            */

            const events =
              buffer.split(
                "\n\n"
              );


            /*
            |--------------------------------------------------------------------------
            | Keep Incomplete Event
            |--------------------------------------------------------------------------
            */

            buffer =
              events.pop() || "";


            /*
            |--------------------------------------------------------------------------
            | Process Events
            |--------------------------------------------------------------------------
            */

            for (
              const event
              of events
            ) {

              if (!event.trim()) {
                continue;
              }


              /*
              |--------------------------------------------------------------------------
              | Parse SSE Event
              |--------------------------------------------------------------------------
              */

              const lines =
                event.split("\n");


              let eventName =
                "message";


              const dataParts: string[] =
                [];


              for (
                const line
                of lines
              ) {

                /*
                |--------------------------------------------------------------------------
                | Event Name
                |--------------------------------------------------------------------------
                */

                if (
                  line.startsWith(
                    "event:"
                  )
                ) {

                  eventName =
                    line
                      .slice(6)
                      .trim();

                  continue;
                }


                /*
                |--------------------------------------------------------------------------
                | Data
                |--------------------------------------------------------------------------
                */

                if (
                  line.startsWith(
                    "data:"
                  )
                ) {

                  dataParts.push(
                    line
                      .slice(5)
                      .trim()
                  );

                }

              }


              /*
              |--------------------------------------------------------------------------
              | Combine Data
              |--------------------------------------------------------------------------
              */

              const rawData =
                dataParts.join(
                  "\n"
                );


              if (!rawData) {
                continue;
              }


              /*
              |--------------------------------------------------------------------------
              | DONE Event
              |--------------------------------------------------------------------------
              */

              if (
                eventName === "done" ||
                rawData === "[DONE]"
              ) {

                continue;
              }


              /*
              |--------------------------------------------------------------------------
              | ERROR Event
              |--------------------------------------------------------------------------
              */

              if (
                eventName === "error"
              ) {

                console.error(
                  "Backend SSE error:",
                  rawData
                );

                setMessages(
                  (
                    previousMessages
                  ) =>
                    previousMessages.map(
                      (message) =>
                        message.id ===
                        assistantMsgId
                          ? {
                              ...message,

                              type:
                                "text",

                              content:
                                message.content ||
                                "Sorry, I couldn't generate a response.",

                              isStreaming:
                                false,
                            }
                          : message
                    )
                );

                continue;
              }


              /*
              |--------------------------------------------------------------------------
              | Try JSON Parsing
              |--------------------------------------------------------------------------
              */

              let parsedData: unknown;

              try {

                parsedData =
                  JSON.parse(
                    rawData
                  );

              } catch {

                /*
                |--------------------------------------------------------------------------
                | Not JSON
                |--------------------------------------------------------------------------
                |
                | This is normal for streamed text.
                |
                */

                parsedData =
                  rawData;
              }


              /*
              |--------------------------------------------------------------------------
              | PROJECT RESPONSE
              |--------------------------------------------------------------------------
              */

              const projects =
                parseProjectResponse(
                  parsedData
                );


              if (projects) {

                console.log(
                  "Projects received:",
                  projects
                );


                projectResponseReceived =
                  true;


                /*
                |--------------------------------------------------------------------------
                | Update Assistant Message
                |--------------------------------------------------------------------------
                */

                setMessages(
                  (
                    previousMessages
                  ) =>
                    previousMessages.map(
                      (message) =>
                        message.id ===
                        assistantMsgId
                          ? {
                              ...message,

                              type:
                                "projects",

                              projects,

                              content:
                                "",

                              isStreaming:
                                false,
                            }
                          : message
                    )
                );


                /*
                |--------------------------------------------------------------------------
                | Don't treat project JSON
                | as normal text.
                |--------------------------------------------------------------------------
                */

                continue;
              }


              /*
              |--------------------------------------------------------------------------
              | JSON STRING RESPONSE
              |--------------------------------------------------------------------------
              |
              | Backend can send:
              |
              | data: "Hello"
              |
              | JSON.parse gives:
              |
              | "Hello"
              |
              */

              if (
                typeof parsedData ===
                "string"
              ) {

                accumulatedText +=
                  parsedData;


                /*
                |--------------------------------------------------------------------------
                | Update Text Response
                |--------------------------------------------------------------------------
                */

                setMessages(
                  (
                    previousMessages
                  ) =>
                    previousMessages.map(
                      (message) =>
                        message.id ===
                        assistantMsgId
                          ? {
                              ...message,

                              type:
                                "text",

                              content:
                                accumulatedText,

                              isStreaming:
                                true,
                            }
                          : message
                    )
                );


                continue;
              }


              /*
              |--------------------------------------------------------------------------
              | Unknown JSON
              |--------------------------------------------------------------------------
              |
              | If the backend sends another JSON
              | object that isn't a project response,
              | don't dump it into the chat.
              |
              */

              if (
                parsedData &&
                typeof parsedData ===
                  "object"
              ) {

                console.warn(
                  "Unknown JSON response:",
                  parsedData
                );

                continue;
              }


              /*
              |--------------------------------------------------------------------------
              | Raw Text Fallback
              |--------------------------------------------------------------------------
              */

              if (
                typeof parsedData ===
                "string"
              ) {

                accumulatedText +=
                  parsedData;


                setMessages(
                  (
                    previousMessages
                  ) =>
                    previousMessages.map(
                      (message) =>
                        message.id ===
                        assistantMsgId
                          ? {
                              ...message,

                              type:
                                "text",

                              content:
                                accumulatedText,
                            }
                          : message
                    )
                );

              }

            }
          }


          /*
          |--------------------------------------------------------------------------
          | Flush Remaining Buffer
          |--------------------------------------------------------------------------
          |
          | Sometimes the last SSE event doesn't
          | end with \n\n.
          |
          */

          if (
            buffer.trim()
          ) {

            const lines =
              buffer.split("\n");


            const dataParts: string[] =
              [];


            for (
              const line
              of lines
            ) {

              if (
                line.startsWith(
                  "data:"
                )
              ) {

                dataParts.push(
                  line
                    .slice(5)
                    .trim()
                );

              }

            }


            const rawData =
              dataParts.join(
                "\n"
              );


            if (
              rawData &&
              rawData !== "[DONE]"
            ) {

              try {

                const parsedData =
                  JSON.parse(
                    rawData
                  );


                const projects =
                  parseProjectResponse(
                    parsedData
                  );


                if (projects) {

                  projectResponseReceived =
                    true;


                  setMessages(
                    (
                      previousMessages
                    ) =>
                      previousMessages.map(
                        (message) =>
                          message.id ===
                          assistantMsgId
                            ? {
                                ...message,

                                type:
                                  "projects",

                                projects,

                                content:
                                  "",

                                isStreaming:
                                  false,
                              }
                            : message
                      )
                  );

                } else if (
                  typeof parsedData ===
                  "string"
                ) {

                  accumulatedText +=
                    parsedData;

                }

              } catch {

                /*
                |--------------------------------------------------------------------------
                | Last raw text chunk
                |--------------------------------------------------------------------------
                */

                accumulatedText +=
                  rawData;

              }

            }

          }


          /*
          |--------------------------------------------------------------------------
          | Final Assistant State
          |--------------------------------------------------------------------------
          */

          setMessages(
            (
              previousMessages
            ) =>
              previousMessages.map(
                (message) =>
                  message.id ===
                  assistantMsgId
                    ? {
                        ...message,

                        isStreaming:
                          false,

                        /*
                        | Keep project message
                        | as projects.
                        */

                        type:
                          projectResponseReceived
                            ? "projects"
                            : "text",

                        content:
                          projectResponseReceived
                            ? ""
                            : accumulatedText,
                      }
                    : message
              )
          );


        } catch (error: any) {

          /*
          |--------------------------------------------------------------------------
          | Abort
          |--------------------------------------------------------------------------
          */

          if (
            error?.name ===
            "AbortError"
          ) {

            console.log(
              "Stream cancelled."
            );

            return;
          }


          /*
          |--------------------------------------------------------------------------
          | Other Errors
          |--------------------------------------------------------------------------
          */

          console.error(
            "Streaming error:",
            error
          );


          setMessages(
            (
              previousMessages
            ) =>
              previousMessages.map(
                (message) =>
                  message.id ===
                  assistantMsgId
                    ? {
                        ...message,

                        type:
                          "text",

                        content:
                          message.content ||
                          "Sorry, I couldn't generate a response. Please try again.",

                        isStreaming:
                          false,
                      }
                    : message
              )
          );


        } finally {

          /*
          |--------------------------------------------------------------------------
          | Cleanup
          |--------------------------------------------------------------------------
          */

          setIsStreaming(
            false
          );

          abortControllerRef.current =
            null;
        }

      },
      [isStreaming]
    );


  /*
  |--------------------------------------------------------------------------
  | Cancel Streaming
  |--------------------------------------------------------------------------
  */

  const cancelStreaming =
    useCallback(() => {

      abortControllerRef.current?.abort();

      abortControllerRef.current =
        null;

      setIsStreaming(false);


      setMessages(
        (previousMessages) =>
          previousMessages.map(
            (message) =>
              message.isStreaming
                ? {
                    ...message,

                    isStreaming:
                      false,
                  }
                : message
          )
      );

    }, []);


  /*
  |--------------------------------------------------------------------------
  | Return
  |--------------------------------------------------------------------------
  */

  return {
    messages,

    isStreaming,

    sendMessage,

    isLoading:
      isStreaming,

    clearChat,

    cancelStreaming,
  };
}