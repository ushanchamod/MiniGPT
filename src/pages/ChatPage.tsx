import ChatSection from "./components/ChatSection";
// import SideBar from "./components/SideBar";

const ChatPage = () => {
  return (
    <div className="flex w-full h-screen box-border bg-gray-50 dark:bg-gray-900">
      {/* <SideBar /> */}

      <div className="flex-1 p-4 box-border">
        <ChatSection />
      </div>
    </div>
  );
};

export default ChatPage;
