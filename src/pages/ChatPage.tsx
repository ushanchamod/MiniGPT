import ChatSection from "./components/ChatSection";
import SideBar from "./components/SideBar";

const ChatPage = () => {
  return (
    <div className="flex w-full h-screen box-border">
      <SideBar />

      <div className="flex-1 p-4 box-border">
        <ChatSection />
      </div>
    </div>
  );
};

export default ChatPage;
