import type React from "react";
import axios from "axios";
import { Interaction } from "@/components/interaction";
import SendIcon from "@/assets/images/svg/send.svg";
import TextareaAutosize from "react-textarea-autosize";
import styles from './chat-input.module.css';
import { useState } from "react";
import { useModelStore } from "@/store/useModelStore";

import { toast } from 'react-toastify';
import { useClaimStore } from "@/store/useClaimStore";
import { useChatStore } from "@/store/useChatStore";


type ChatInputProps = {
  onSend: (message: string) => void;
  sending: boolean;
};

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, sending }) => {
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const setPrevClaim = useClaimStore((state) => state.setPrevClaim);
  const claim = useClaimStore((state) => state.claim);
  const setClaim = useClaimStore((state) => state.setClaim);
  const isClaimLoading = useClaimStore((state) => state.isClaimLoading);
  const setIsClaimLoading = useClaimStore((state) => state.setIsClaimLoading);
  const selectedModel = useModelStore((state) => state.selectedModel);
  const setClaimData =  useClaimStore((state) => state.setClaimData);
  const setClaimDataForChat = useClaimStore((state) => state.setClaimDataForChat);
  const { addMessage } = useChatStore();
  
  const handleSend = async () => {
    // toast.success("Ask anything");
    const trimmed_claim = claim.trim();
    if (!trimmed_claim) return false;

    setIsClaimLoading(true);
    setPrevClaim(trimmed_claim);
    addMessage({
        content: trimmed_claim,
        isSystem: false,
    });
      setClaim("");
    console.log(selectedModel);

    // const response = await axios.post(`${API_BASE_URL}/engine/null-verifier`
    try {
      const response = await axios.post(`${API_BASE_URL}/engine/null-verifier`, {
        // claim: trimmed_claim,
        claim: "Inflammation and protects neuronal cells in Alzheimer's disease",
        model: selectedModel,
        loggedIn: false,
        sessionId: null
      });

      console.log("Cleaned response:", response.data);

      // simulate loading
      // setTimeout(() => setIsClaimLoading(false), 3000);

      setClaimData(response.data)
      setClaimDataForChat(claim, response.data)
      onSend?.(trimmed_claim);
    
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send the request.");
    }finally {
      // Always executed regardless of success or failure
      setIsClaimLoading(false);
    }
  };

  return (
    <div className="w-full bg-surface-light dark:bg-surface-dark rounded-[40px]">
      <div className="flex flex-row items-start px-4 py-2">
        <TextareaAutosize
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          className={`${styles.scrollbar} flex-1 text-sm bg-transparent outline-none resize-none placeholder:text-text-light/40 dark:placeholder:text-text-dark/20 text-text-light dark:text-text-dark leading-snug`}
          placeholder="Ask anything"
          minRows={1}
          maxRows={5}
        />

       <Interaction
          onClick={handleSend}
          title="Send Claim"
          disabled={isClaimLoading}
          className={`rounded-full bg-white flex items-center justify-center mt-1 transition-opacity ${
            isClaimLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
          }`}
        >
          <SendIcon />
        </Interaction>
      </div>
    </div>
  );
};
