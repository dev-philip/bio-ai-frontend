import { useRef, useState } from "react";
import { motion } from "motion/react";
import { CircleAvatar } from "./circle-avatar";
import { Popover } from "./popover";
import defaultAvatar from "@/assets/images/png/default_avatar.png";
import SearchIcon from "@/assets/images/svg/search.svg";
import { useAuthStore } from "@/store/auth";
import { ProfileMenu } from "./profile-menu";
import { Interaction } from "../interaction";

// Animation variants
const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const DashboardHeader = () => {
  const avatarRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

  return (
    <>
      <motion.div
        className="bg-surface-light dark:bg-surface-dark w-full"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[73px]">
          <motion.div className="flex justify-between items-center h-full">
            {/* Logo/Brand */}
            <motion.div
              className="flex-shrink-0 flex items-center gap-2"
              variants={itemVariants}
            >
              {/** TODO: Replace with logo */}
              <div className="h-[20px] w-[20px] bg-[#D9D9D9] rounded-[4px]" />
              <motion.h1 className="text-base text-gray-800">Tania</motion.h1>
            </motion.div>

            {/** Title? TODO: Clarify what this is from designer or timi */}
            <motion.div className="flex-1" variants={itemVariants}>
              <p className="text-text-light/70 dark:text-text-dark/70 text-sm text-center">
                Judging Creative Onchain Hackathon
              </p>
            </motion.div>

            {/** Actions */}
            <motion.div
              className="flex flex-row items-center gap-6"
              variants={itemVariants}
            >
              {/** TODO: Wrap with Icon Button */}
              <SearchIcon className="text-text-light dark:text-text-dark" />

              <Interaction
                ref={avatarRef}
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="w-fit h-fit bg-transparent outline-none border-none"
                title="Profile"
                type="button"
                disabled={!user}
              >
                <CircleAvatar src={defaultAvatar} size={32} />
              </Interaction>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Popover Menu */}
      <Popover
        anchorEl={avatarRef.current}
        isOpen={isMenuOpen && Boolean(user)}
        onClose={() => setIsMenuOpen(false)}
      >
        <ProfileMenu user={user!} onLogout={logout} />
      </Popover>
    </>
  );
};
