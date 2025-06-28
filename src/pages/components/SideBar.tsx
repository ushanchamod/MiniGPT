import { useState } from "react";

const ChatIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 21l1.13-3.39C3.42 16.14 3 14.87 3 13.5c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);
const InfoIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 17v-6m0-4h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"
    />
  </svg>
);
const SettingsIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);
const MenuIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);
const CloseIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl transition-all duration-300 ease-in-out flex flex-col ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col items-center h-full py-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="self-end mb-8 p-2 rounded-full hover:bg-gray-700 transition"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
        <h1 className="text-2xl font-bold font-mono mb-10 tracking-tight transition-all duration-300 ease-in-out">
          {isOpen ? "Mini GPT" : "MG"}
        </h1>
        <nav className="flex flex-col gap-8 items-center w-full">
          <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition w-full justify-center">
            <ChatIcon />
            {isOpen && <span className="text-base font-medium">Chat</span>}
          </button>
          <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition w-full justify-center">
            <InfoIcon />
            {isOpen && <span className="text-base font-medium">Info</span>}
          </button>
          <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition w-full justify-center">
            <SettingsIcon />
            {isOpen && <span className="text-base font-medium">Settings</span>}
          </button>
        </nav>
        <div className="flex-1" />
        <div className="text-xs text-gray-400 mb-2">v1.0</div>
      </div>
    </div>
  );
};

export default SideBar;
