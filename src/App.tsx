import ChatPage from "./pages/ChatPage";
import { ThemeProvider } from "./contexts/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <ChatPage />
      </div>
    </ThemeProvider>
  );
};

export default App;
