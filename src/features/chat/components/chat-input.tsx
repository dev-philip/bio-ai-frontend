import type React from "react";
import { Interaction } from "@/components/interaction";
import SendIcon from "@/assets/images/svg/send.svg";

type ChatInputProps = {
  onSend: (message: string) => void;
  sending: boolean;
};

export const ChatInput: React.FC<ChatInputProps> = () => {
  return (
    <div className="w-full h-[50px] bg-surface-light dark:bg-surface-dark rounded-[40px]">
      <div className="flex flex-row items-center gap-4 px-4 h-full">
        <input
          type="text"
          className="flex-1 text-sm bg-transparent outline-none placeholder:text-text-light/40 dark:placeholder:text-text-dark/20 text-text-light dark:text-text-dark"
          placeholder="Ask anything"
        />

        <Interaction className="h-[32px] w-[32px] rounded-full bg-white flex items-center justify-center">
          <SendIcon />
        </Interaction>
      </div>
    </div>
  );
};
