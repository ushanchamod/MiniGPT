import React, { useState, useRef, useEffect } from "react";

const BotAvatar = () => (
  <div className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" />
    </svg>
  </div>
);
const UserAvatar = () => (
  <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" />
    </svg>
  </div>
);
const SendIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 12h14M12 5l7 7-7 7"
    />
  </svg>
);
const Spinner = () => (
  <svg
    className="animate-spin h-6 w-6 text-blue-600 dark:text-blue-400"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

// Helper to parse <think>...</think> and main content
function parseAssistantMessage(content: string) {
  const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>/i);
  let think = "";
  let main = content;
  if (thinkMatch) {
    think = thinkMatch[1].trim();
    main = content.replace(thinkMatch[0], "").trim();
  }
  return { think, main };
}

// Helper to render markdown-like formatting (basic)
function renderFormattedText(text: string) {
  // Headings
  text = text.replace(
    /### (.*)/g,
    '<h3 class="font-semibold text-base mt-3 mb-1 text-gray-900 dark:text-gray-100">$1</h3>'
  );
  text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  // Bullets
  text = text.replace(/^- (.*)$/gm, "<li>$1</li>");
  text = text.replace(
    /<li>([\s\S]*?)<\/li>/g,
    '<ul class="list-disc ml-6">$&</ul>'
  );
  // Horizontal rules
  text = text.replace(
    /---/g,
    '<hr class="my-2 border-gray-200 dark:border-gray-600" />'
  );
  // Paragraphs
  text = text.replace(/\n{2,}/g, "</p><p>");
  text = "<p>" + text + "</p>";
  return text;
}

const ChatSection = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const controller = new AbortController();
    let assistantMessage = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMessage]);
    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-r1:1.5b",
          prompt: input,
          stream: true,
        }),
        signal: controller.signal,
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      if (!reader) throw new Error("No reader found on response body");
      let result = "";
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: true });
        const lines = chunkValue
          .split("\n")
          .filter((line) => line.trim() !== "");
        for (const line of lines) {
          const parsed = JSON.parse(line);
          if (parsed.done) continue;
          result += parsed.response;
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...assistantMessage,
              content: result,
            };
            return updated;
          });
        }
      }
    } catch (err) {
      console.error("Streaming error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong while streaming the response.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 px-8 py-5 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
        <BotAvatar />
        <div>
          <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
            Mini GPT
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            AI Assistant
          </div>
        </div>
      </div>
      {/* Message List */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        {messages.map((msg, idx) => {
          if (msg.role === "assistant") {
            const { think, main } = parseAssistantMessage(msg.content);
            return (
              <div
                key={idx}
                className="flex mb-4 items-end gap-2 transition-all duration-300 justify-start"
              >
                <BotAvatar />
                <div className="rounded-2xl px-4 py-2 max-w-[70%] text-base shadow-sm transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 animate-fade-in">
                  {think && (
                    <details className="mb-2">
                      <summary className="text-xs text-gray-400 dark:text-gray-500 cursor-pointer select-none">
                        AI reasoning (click to expand)
                      </summary>
                      <div className="text-xs text-gray-400 dark:text-gray-500 whitespace-pre-line mt-1">
                        {think}
                      </div>
                    </details>
                  )}
                  <span
                    className="block formatted-assistant-message"
                    dangerouslySetInnerHTML={{
                      __html: renderFormattedText(main),
                    }}
                  />
                </div>
              </div>
            );
          }
          // User message
          return (
            <div
              key={idx}
              className="flex mb-4 items-end gap-2 transition-all duration-300 justify-end"
            >
              <div className="rounded-2xl px-4 py-2 max-w-[70%] text-base shadow-sm transition-all duration-300 bg-blue-600 dark:bg-blue-500 text-white animate-fade-in">
                {msg.content}
              </div>
              <UserAvatar />
            </div>
          );
        })}
        {/* Show spinner only if loading and last message is from user */}
        {loading &&
          messages.length > 0 &&
          messages[messages.length - 1].role === "user" && (
            <div className="flex mb-4 items-end gap-2 justify-start">
              <BotAvatar />
              <div className="rounded-2xl px-4 py-2 max-w-[70%] text-base shadow-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center animate-fade-in">
                <Spinner />
                <span className="ml-2 text-gray-500 dark:text-gray-400">
                  Thinking...
                </span>
              </div>
            </div>
          )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSend}
        className="flex items-center p-4 border-t border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md w-full shadow-lg"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-base outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 shadow-sm"
        />
        <button
          type="submit"
          className="ml-3 px-5 py-3 rounded-lg bg-blue-600 dark:bg-blue-500 text-white text-base font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-200 flex items-center gap-2 shadow-md"
          disabled={loading}
        >
          <span className="hidden sm:inline">Send</span>
          <SendIcon />
        </button>
      </form>
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .formatted-assistant-message ul { margin: 0.5em 0 0.5em 1.5em; }
        .formatted-assistant-message h3 { margin-top: 1em; margin-bottom: 0.5em; }
        .formatted-assistant-message hr { border: none; border-top: 1px solid #e5e7eb; margin: 1em 0; }
        .formatted-assistant-message p { margin: 0.5em 0; }
        .dark .formatted-assistant-message hr { border-top-color: #4b5563; }
      `}</style>
    </div>
  );
};

export default ChatSection;
