"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";

import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";

import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputMessage,
} from "@/components/ai-elements/prompt-input";

import { FormEvent } from "react";
import { MessageSquare } from "lucide-react";

const ChatbotComponent = () => {
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const handleSubmit = (
    message: PromptInputMessage,
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const text = message.text.trim();
    if (status === "streaming") {
      stop();
    } else if (text) {
      sendMessage({ parts: [{ type: "text", text }] });
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-4 border rounded-lg bg-gray-50 min-w-0">
    
      <Conversation className="grow min-w-0">
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState>
              <div className="flex flex-col gap-2 justify-center items-center">
                <MessageSquare className="size-12 text-blue-500" />
                <h2 className="text-lg">Start a conversation</h2>
              </div>
            </ConversationEmptyState>
          ) : (
            <>
              {messages.map((message) => (
                <Message from={message.role} key={message.id}>
                  <MessageContent className="bg-blue-50 p-4 rounded-lg">
                    {message.parts.map((part, i) => {
                      if (part.type === "text") {
                        return (
                          <MessageResponse key={i}>{part.text}</MessageResponse>
                        );
                      }
                      return null;
                    })}
                  </MessageContent>
                </Message>
              ))}

              {status === "submitted" && (
                <Message from="assistant" key="typing-indicator">
                  <MessageContent className="p-4 rounded-lg bg-gray-200 animate-pulse">
                    <div className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></span>
                      <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-150"></span>
                      <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-300"></span>
                    </div>
                  </MessageContent>
                </Message>
              )}
            </>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <PromptInput
        onSubmit={handleSubmit}
        className="flex gap-2 items-end mt-4 w-full min-w-0"
      >
        <PromptInputTextarea
          placeholder="Type your message..."
          disabled={status === "streaming"}
          className="w-full min-w-0 max-h-25 overflow-y-auto resize-none wrap-break-words"
        />
        <PromptInputSubmit
          status={status}
          disabled={ status == "submitted"}
          className={`m-3 text-white disabled:opacity-50 hover:opacity-90 
            ${
              status === "streaming"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
        />
      </PromptInput>
    </div>
  );
};

export default ChatbotComponent;
