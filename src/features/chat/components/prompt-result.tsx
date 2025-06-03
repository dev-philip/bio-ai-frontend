import PlayIcon from "@/assets/images/svg/play.svg";
import DocumentDownloadIcon from "@/assets/images/svg/document-download.svg";
import CopyIcon from "@/assets/images/svg/copy.svg";
import RepeatIcon from "@/assets/images/svg/repeat.svg";
import { Interaction } from "@/components/interaction";
import TypeIt from "typeit-react";
import styles from './prompt-result.module.css';

import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from "react";
import mockResponse from "@/api/data/mock-response.json";
import { useClaimStore } from "@/store/useClaimStore";

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useModelStore } from "@/store/useModelStore";
import axios from "axios";
import { useChatStore } from "@/store/useChatStore";

export const PromptResult: React.FC = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const prevClaim = useClaimStore((state) => state.prevClaim);
    const claim = useClaimStore((state) => state.claim);
    const setClaim = useClaimStore((state) => state.setClaim);
    const setIsClaimLoading = useClaimStore((state) => state.setIsClaimLoading);
    const selectedModel = useModelStore((state) => state.selectedModel);
    const setClaimData =  useClaimStore((state) => state.setClaimData);
    const claimDataForChat = useClaimStore((state) => state.claimDataForChat);
    const setClaimDataForChat =  useClaimStore((state) => state.setClaimDataForChat);
    const { addMessage } = useChatStore();
    


  const claimData = useClaimStore((state) => state.claimData);
  const isClaimLoading = useClaimStore((state) => state.isClaimLoading);
  const [reasonings, setReasonings] = useState<string[]>([]);
  const [animateIndex, setAnimateIndex] = useState<number | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const resetKey = useClaimStore((state) => state.resetKey);

// Clear reasonings when global reset happens
useEffect(() => {
  // alert(resetKey);
  setReasonings([]);
  setAnimateIndex(null);
}, [resetKey]);


  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [reasonings]); // Trigger when a new reasoning is added

  useEffect(() => {
    if (claimData?.reasoning) {
      setReasonings((prev) => [...prev, claimData.reasoning]);
      setAnimateIndex(reasonings.length); // new reasoning will be animated
    }
  }, [claimData]);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

    // Show "scroll to bottom" when not already at bottom
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 10;
    setShowScrollButton(!atBottom);
  };


    // Scroll to bottom
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  };

    useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll when new result comes in
  useEffect(() => {
    scrollToBottom();
  }, [reasonings.length]);

  const handleAudioClick = () => {

    if (reasonings.length > 0) {
        toast.success("Audio Button");
        console.log(claimDataForChat);
          if (reasonings.length > 0) {
            const lastReasoning = reasonings[reasonings.length - 1];
            console.log("Most recent audio:", lastReasoning);
        }
    }else{
       toast.info("No data available to speak.");
    }

};

const handleCopyClick = () => {
  if (reasonings.length > 0) {
    const lastReasoning = reasonings[reasonings.length - 1];
    
    navigator.clipboard.writeText(lastReasoning)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
        toast.error("Failed to copy to clipboard.");
      });
  } else {
    toast.info("No reasoning available to copy.");
  }
};

  const handleRegenerateClick = async () => {
 
  if (prevClaim) {

    addMessage({
        content: prevClaim,
        isSystem: false,
    });
    setIsClaimLoading(true);
    console.log(selectedModel);

    try {
      const response = await axios.post(`${API_BASE_URL}/engine/null-verifier`, {
        // claim: prevClaim,
        claim: "Inflammation and protects neuronal cells in Alzheimer's disease",
        model: selectedModel,
        loggedIn: false,
        sessionId: null
      });

      console.log("Cleaned response:", response.data);

      setClaimData(response.data)
      setClaimDataForChat(claim, response.data)
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send the request.");
    }finally {
      // Always executed regardless of success or failure
      setIsClaimLoading(false);
    }
  }else{
      toast.info("There is no data to generate");
  }

  };

  const handleDownloadClick = () => {
  // toast.success("Download Button");
   if (reasonings.length > 0) {
     const { chatThread } = useChatStore.getState();

  const userPrompts = chatThread.messages.filter((msg) => !msg.isSystem);

  if (userPrompts.length === 0 || reasonings.length === 0) {
    toast.info("There is no data to download");
    return;
  }

  const textContent = userPrompts.map((msg, index) => {
    const reasoning = reasonings[index] || "No reasoning available";
    return `Chat ${index + 1}:\n${msg.content}\n\nPrompt ${index + 1}:\n${reasoning}`;
  }).join("\n\n------------------\n\n");

  const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "claim_reasonings.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  }else{
    toast.info("There is no data to download")
  }
  };

  const greetingHTML = `
  <h1 class="${styles.greeting}">
    <span class="${styles.hello}">Hello,</span> 
    <span class="${styles.name}">Philip Awobusuyi</span>
  </h1>
`;

  return (
    <div className="flex flex-col gap-12 w-full h-full max-w-[492px] mx-auto">
<<<<<<< HEAD
      <div className="flex-1 w-full overflow-hidden overflow-y-auto rounded-[12px]">
        <div className="bg-surface-light dark:bg-surface-dark w-full rounded-[12px] py-[10px] px-[12px]">
          <p className="text-sm">
            ​Yes, the StampNet project by Kars07 integrates Arbitrum Stylus into
            its architecture
            <br />
            <br />
            🧩 What the Project Does StampNet is a decentralized time-stamping
            system that enables users to upload various forms of media—such as
            documents, videos, or text—and generates a timestamped hash stored
            on the blockchain. This process provides cryptographic proof of a
            file's existence at a specific time without storing the actual
            content on-chain, thereby preserving privacy.
            <br />
            <br />
            🛠️ Technologies Used
            <br /> Smart Contracts: Developed using Rust and compiled to
            WebAssembly (WASM), deployed on Arbitrum Stylus.
            <br /> Frontend: Built with Next.js and styled using Tailwind CSS.
            <br />
            Authentication: Implements secure login, including Google OAuth, to
            access the StampNet dashboard.​
            <br />
            <br />
            <TypeIt
              options={{
                strings: [`${testMsg}`],
                speed: 10,
                waitUntilVisible: true,
                afterComplete: function (instance: any) {
                  instance.destroy();
                },
              }}
            />
            <br /> <br />
            <TypeIt>
              🔗 Live Demo A live version of StampNet is accessible at
              stampnet.vercel.app, allowing users to experience the
              application's functionalities firsthand.
            </TypeIt>
            <br />
            <br /> 📝 Summary StampNet effectively utilizes Arbitrum Stylus by
            <br /> <br />
          </p>
        </div>
      </div>
=======
          <div ref={scrollRef} className="flex flex-col gap-4 w-full h-full max-w-[492px] mx-auto overflow-y-auto">

              {reasonings.length == 0 && (
                 <div className="w-full flex justify-center">
                  <TypeIt
                    options={{
                      html: true,
                      speed: 50,
                      waitUntilVisible: true,
                      strings: [greetingHTML],
                      cursor: false,
                    }}
                    getBeforeInit={(instance) => {
                      instance.pause(300);
                      return instance;
                    }}
                  />
                </div>
              )}

            {reasonings.map((msg, index) => (
              <div
                key={`reasoning-${index}`}
                className="bg-surface-light dark:bg-surface-dark rounded-[12px] py-[10px] px-[12px]"
              >
                <p className="text-sm whitespace-pre-wrap">
                  {index === animateIndex ? (
                    <TypeIt
                      options={{
                        strings: [msg],
                        speed: 10,
                      }}
                    />
                  ) : (
                    msg
                  )}
                </p>
              </div>
            ))}

             {/* If nothing has been typed yet but request is pending */}
              {isClaimLoading && (
                <div className="bg-surface-light dark:bg-surface-dark rounded-[12px] py-[10px] px-[12px]">
                  <Skeleton count={3} height={16} className="mb-2" />
                </div>
              )}



              {/* Scroll to Bottom Button */}
              {showScrollButton && (
                <button
                  onClick={scrollToBottom}
                  className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-all"
                  title="Scroll to latest"
                >
                  <i className="fa fa-arrow-circle-down"></i>
                </button>
              )}

            {/* Invisible scroll target */}
            {/* <div className={styles.stayAtButtom} ref={bottomRef} /> */}
          </div>
>>>>>>> connect-backend

      <div className="flex flex-roe justify-evenly gap-4 items-center">
        <Interaction onClick={handleAudioClick} className="flex flex-col items-center gap-1">
          <PlayIcon  />
          <span className="text-text-light/70 dark:text-text-dark/40 text-sm text-center">
            Audio
          </span>
        </Interaction>

        <Interaction onClick={handleCopyClick} className="flex flex-col items-center gap-1">
          <CopyIcon  />
          <span className="text-text-light/70 dark:text-text-dark/40 text-sm text-center">
            Copy
          </span>
        </Interaction>

        <Interaction onClick={handleRegenerateClick} className="flex flex-col items-center gap-1">
          <RepeatIcon   />
          <span className="text-text-light/70 dark:text-text-dark/40 text-sm text-center">
            Regenerate
          </span>
        </Interaction>

        <Interaction onClick={handleDownloadClick} className="flex flex-col items-center gap-1">
          <DocumentDownloadIcon  />
          <span className="text-text-light/70 dark:text-text-dark/40 text-sm text-center">
            Download
          </span>
        </Interaction>
      </div>
    </div>
  );
};
