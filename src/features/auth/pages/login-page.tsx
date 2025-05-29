import { Interaction } from "@/components/interaction";
import classNames from "classnames";

import GoogleIcon from "@/assets/images/svg/google.svg";

export const LoginPage = () => {
  return (
    <div className="h-screen text-text-dark w-full flex flex-row items-stretch bg-background-dark">
      <div className="flex-1">
        <div className="flex flex-col items-center justify-center h-full px-8">
          <div className="max-w-[510px]">
            <h3 className="text-[40px] font-bold text-start leading-normal">
              Join <span className="text-text-dark/40">the</span> BIOHackathon{" "}
              <span className="text-text-dark/40">Platform</span>
            </h3>

            <p className="text-[20px] text-text-dark/40">
              Explore, build, and contribute to the future of AI + Bio
              innovation. Whether you're a developer, researcher, or curious
              mind — you're welcome here.
            </p>

            <div className="mt-8">
              <Interaction
                className={classNames(
                  "bg-transparent border-[1px] border-white rounded-[50px] py-[8px] px-[40px] w-full",
                  "hover:border-primary hover:bg-primary"
                )}
              >
                <div className="flex flex-row justify-center items-center gap-4">
                  <GoogleIcon />
                  <p>Continue with Google</p>
                </div>
              </Interaction>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">Right</div>
    </div>
  );
};
