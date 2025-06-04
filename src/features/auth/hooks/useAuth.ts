import { useAuthStore } from "@/store/auth";
import {
  googleLogout,
  useGoogleLogin,
  type CodeResponse,
} from "@react-oauth/google";
import { useCallback } from "react";

export const useAuth = () => {
  const { googleLogin, logout } = useAuthStore();

  const handleLoginSuccess = useCallback(
    async (codeResponse: CodeResponse) => {
      console.log("Login Success:", codeResponse);

      googleLogin(codeResponse.code);
    },
    [googleLogin]
  );

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: handleLoginSuccess,
    onError: (error) => console.log("Login Failed:", error),
  });

  const logOut = () => {
    try {
      googleLogout();
    } catch (error) {
      console.error("Google logout Failed:", error);
    }
    logout();
  };

  return { logOut, login };
};
