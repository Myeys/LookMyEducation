  "use client";

  import { useAuth } from "../app/context/auth-context";
  import Chatbot from "./Chatbot";

  const ChatbotWrapper = () => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) return null;

    return <Chatbot />;
  };

  export default ChatbotWrapper;
