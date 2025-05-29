// import { useEffect } from "react";
import { AppRoutes } from "./routes";
// import { useAuthStore } from "@/store/auth";

function App() {
  // const { login } = useAuthStore();

  // useEffect(() => {
  //   login("user@example.com", "password");
  // }, []);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
