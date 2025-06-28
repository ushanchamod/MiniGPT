import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";

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
const SunIcon = () => (
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
      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
    />
  </svg>
);
const MoonIcon = () => (
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
      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
    />
  </svg>
);

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`h-screen bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 text-white shadow-xl transition-all duration-300 ease-in-out flex flex-col ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col items-center h-full py-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="self-end mb-8 p-2 rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
        <h1 className="text-2xl font-bold font-mono mb-10 tracking-tight transition-all duration-300 ease-in-out">
          {isOpen ? "Mini GPT" : "MG"}
        </h1>
        <nav className="flex flex-col gap-8 items-center w-full">
          <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition w-full justify-center">
            <ChatIcon />
            {isOpen && <span className="text-base font-medium">Chat</span>}
          </button>
          <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition w-full justify-center">
            <InfoIcon />
            {isOpen && <span className="text-base font-medium">Info</span>}
          </button>
          <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition w-full justify-center">
            <SettingsIcon />
            {isOpen && <span className="text-base font-medium">Settings</span>}
          </button>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition w-full justify-center"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            {isOpen && (
              <span className="text-base font-medium">
                {theme === "dark" ? "Light" : "Dark"}
              </span>
            )}
          </button>
        </nav>
        <div className="flex-1" />
        <div className="text-xs text-gray-400 mb-2">v1.0</div>
      </div>
    </div>
  );
};

export default SideBar;
