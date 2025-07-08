import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  return (
    <div className="w-full bg-base-200 px-2 sm:px-4 pt-16">
      {" "}
      {/* pt-16 = navbar height (64px) */}
      <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl mx-auto h-[calc(100vh-4rem)]">
        {" "}
        {/* subtract navbar height */}
        <div className="flex h-full rounded-lg overflow-hidden">
          <Sidebar />
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
