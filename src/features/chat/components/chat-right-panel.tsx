import type React from "react";
import { useState } from "react";
import classNames from "classnames";
import { Interaction } from "@/components/interaction";
import AddIcon from "@/assets/images/svg/add-circle-filled.svg";

const options = ["Open AI", "Sora", "Deepseek"];

const history = [
  "Judging Creative Onchain Hackathon",
  "Valora vs Traditional Banks",
];

const previous = ["Bacteriology overview"];

export const ChatRightPanel: React.FC = () => {
  const [active] = useState<number>(0);
  const [activePrevious] = useState<number>(0);

  return (
    <div>
      <div className="w-[300px] bg-surface-light dark:bg-surface-dark rounded-[12px] p-4">
        <p className="mb-2 text-text-light/40 dark:text-text-dark/10 text-base">
          LLM Model
        </p>

        <div>
          {options.map((option, index) => (
            <div
              key={`llm-${index}`}
              className={classNames(
                "transition-all duration-200 cursor-pointer w-full px-4 py-3 rounded-[12px]",
                "hover:bg-surface-1-light hover:dark:bg-surface-1-dark",
                {
                  "bg-surface-1-light dark:bg-surface-1-dark": active === index,
                }
              )}
            >
              <p className="text-text-light/70 dark:text-text-dark/40 text-sm">
                {option}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-2 w-full flex justify-between">
          <h5 className="text-text-light/80 text-base">History</h5>

          <Interaction>
            <AddIcon className="text-primary" />
          </Interaction>
        </div>

        <div className="w-[300px] bg-surface-light dark:bg-surface-dark rounded-[12px] p-4">
          <p className="mb-2 text-text-light/40 dark:text-text-dark/10 text-base">
            Yesterday
          </p>

          <div>
            {history.map((option, index) => (
              <div
                key={`history-${index}`}
                className={classNames(
                  "transition-all duration-200 cursor-pointer w-full px-4 py-3 rounded-[12px]",
                  "hover:bg-surface-1-light hover:dark:bg-surface-1-dark",
                  {
                    "bg-surface-1-light dark:bg-surface-1-dark":
                      activePrevious === index,
                  }
                )}
              >
                <p className="truncate text-text-light/70 dark:text-text-dark/40 text-sm">
                  {option}
                </p>
              </div>
            ))}
          </div>

          <p className="mb-2 text-text-light/40 dark:text-text-dark/10 text-base">
            Previous 30 days
          </p>
          <div>
            {previous.map((option, index) => (
              <div
                key={`previous-${index}`}
                className={classNames(
                  "transition-all duration-200 cursor-pointer w-full px-4 py-3 rounded-[12px]",
                  "hover:bg-surface-1-light hover:dark:bg-surface-1-dark",
                  {
                    "bg-surface-1-light dark:bg-surface-1-dark":
                      activePrevious === index + history.length,
                  }
                )}
              >
                <p className="truncate text-text-light/70 dark:text-text-dark/40 text-sm">
                  {option}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
