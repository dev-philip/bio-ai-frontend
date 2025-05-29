import type { ChatThread } from "../../../@types/models";
import type React from "react";
import { ChatBubble } from "./chat-bubble";
import { ChatInput } from "./chat-input";

const thread: ChatThread = {
  files: [],
  id: "thread-1",
  messages: [
    {
      content:
        "Now, I need a newsletter on this topic. The Greatest Human Superpower- Public Speaking",
      createdAt: "2023-10-01T12:00:00Z",
      id: "message-1",
      isSystem: false,
    },

    {
      content:
        "StampNet effectively utilizes Arbitrum Stylus by deploying Rust-based smart contracts compiled to WASM on the Arbitrum platform. \n\nSmart Contracts: Developed using Rust and compiled to WebAssembly (WASM), deployed on Arbitrum Stylus.​\n\nFrontend: Built with Next.js and styled using Tailwind CSS.​\n\nAuthentication: Implements secure login, including Google OAuth, to access the StampNet dashboard.\n\nIf you have further questions or need more details about the project",
      createdAt: "2023-10-01T12:00:00Z",
      id: "message-1",
      isSystem: true,
    },
  ],
  title: "Chat with AI",
  userID: "user-1",
};

export const PromptChat: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col gap-12">
      <div className="flex-1 w-full overflow-hidden overflow-y-auto space-y-4">
        {thread.messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message.content}
            namePosition={message.isSystem ? "left" : "right"}
            senderName={message.isSystem ? "Bio AI" : "You"}
          />
        ))}
      </div>

      <div>
        <ChatInput onSend={() => console.log("Send Message")} sending={false} />
      </div>
    </div>
  );
};
