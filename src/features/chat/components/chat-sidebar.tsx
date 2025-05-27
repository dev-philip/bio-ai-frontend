import type React from "react";
import { motion } from "motion/react";

import EyeIcon from "@/assets/images/svg/eye.svg";
import AddIcon from "@/assets/images/svg/add-circle.svg";
import AttachIcon from "@/assets/images/svg/attach-circle.svg";
import MicIcon from "@/assets/images/svg/microphone-2.svg";
import { Interaction } from "@/components/interaction";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const buttonGroupVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 200 },
  },
};

export const ChatSideBar: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col justify-between h-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <EyeIcon />
      </motion.div>

      <motion.div
        className="bg-surface-light dark:bg-surface-dark py-4 px-2 rounded-[40px] flex flex-col gap-4 overflow-hidden"
        variants={buttonGroupVariants}
      >
        <motion.div variants={itemVariants}>
          <Interaction>
            <AddIcon className="text-black dark:text-[#292D32]" />
          </Interaction>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Interaction>
            <AttachIcon />
          </Interaction>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Interaction>
            <MicIcon />
          </Interaction>
        </motion.div>
      </motion.div>

      <div></div>
    </motion.div>
  );
};
