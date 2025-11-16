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
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const handleSubmit = (
    message: PromptInputMessage,
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const text = message.text.trim();
    if (text) {
      sendMessage({ parts: [{ type: "text", text }] });
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-4 border rounded-lg bg-gray-50 min-w-0">
      <Conversation className="grow min-w-0">
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState className="">
              <div className="flex flex-col gap-2 justify-center items-center">
                <MessageSquare className="size-12 text-blue-500" />
                <h2 className="text-lg italic">Start a conversation</h2>
              </div>
            </ConversationEmptyState>
          ) : (
            messages.map((message) => (
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
            ))
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
          status={status === "streaming" ? "streaming" : "ready"}
          className="bg-blue-500 m-3 text-white hover:bg-blue-600 disabled:opacity-50"
        />
      </PromptInput>
    </div>
  );
};

export default ChatbotComponent;
