import PlayIcon from "@/assets/images/svg/play.svg";
import DocumentDownloadIcon from "@/assets/images/svg/document-download.svg";
import CopyIcon from "@/assets/images/svg/copy.svg";
import RepeatIcon from "@/assets/images/svg/repeat.svg";
import { Interaction } from "@/components/interaction";

export const PromptResult: React.FC = () => {
  return (
    <div className="flex flex-col gap-12 w-full h-full max-w-[492px] mx-auto">
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
            <br />✅ Stylus Integration The project explicitly states that it is
            "built on Arbitrum with Stylus," indicating the use of Arbitrum
            Stylus for its smart contract development. The contracts are written
            in Rust, compiled to WASM, and deployed on the Arbitrum Stylus
            platform, leveraging its capabilities for efficient and secure
            decentralized applications.
            <br /> <br />
            🔗 Live Demo A live version of StampNet is accessible at
            stampnet.vercel.app, allowing users to experience the application's
            functionalities firsthand.
            <br />
            <br /> 📝 Summary StampNet effectively utilizes Arbitrum Stylus by
            <br /> <br />
          </p>
        </div>
      </div>

      <div className="flex flex-roe justify-evenly gap-4 items-center">
        <Interaction className="flex flex-col items-center gap-1">
          <PlayIcon />
          <span className="text-text-light/70 dark:text-text-dark/40 text-sm text-center">
            Audio
          </span>
        </Interaction>

        <Interaction className="flex flex-col items-center gap-1">
          <CopyIcon />
          <span className="text-text-light/70 dark:text-text-dark/40 text-sm text-center">
            Copy
          </span>
        </Interaction>

        <Interaction className="flex flex-col items-center gap-1">
          <RepeatIcon />
          <span className="text-text-light/70 dark:text-text-dark/40 text-sm text-center">
            Regenerate
          </span>
        </Interaction>

        <Interaction className="flex flex-col items-center gap-1">
          <DocumentDownloadIcon />
          <span className="text-text-light/70 dark:text-text-dark/40 text-sm text-center">
            Download
          </span>
        </Interaction>
      </div>
    </div>
  );
};
