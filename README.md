# Mini GPT

A modern, lightweight AI chat interface built with React, TypeScript, and Tailwind CSS, powered by Ollama for local AI model inference.

## 🚀 Features

- **Local AI Chat**: Connect to Ollama for private, local AI conversations
- **Real-time Streaming**: Experience smooth, real-time message streaming
- **Modern UI**: Beautiful, responsive interface with Tailwind CSS
- **TypeScript**: Full type safety and better development experience
- **Markdown Support**: Basic markdown formatting for AI responses
- **Think Mode**: Visual representation of AI reasoning process
- **System Theme Detection**: Automatically detects your system's theme preference

## 📋 Prerequisites

Before running this project, you need to have the following installed:

- **Node.js** (v18 or higher)
- **Ollama** - [Download and install Ollama](https://ollama.ai/download)
- **AI Model** - Pull a model in Ollama (e.g., `ollama pull deepseek-r1:1.5b`)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ushanchamod/MiniGPT.git
   cd mini-gpt
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start Ollama**

   ```bash
   # Make sure Ollama is running
   ollama serve
   ```

4. **Pull an AI model** (if you haven't already)

   ```bash
   # Example: Pull the deepseek-r1:1.5b model
   ollama pull deepseek-r1:1.5b
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Usage

1. **Start Ollama**: Ensure Ollama is running with `ollama serve`
2. **Launch the app**: Run `npm run dev` and open the browser
3. **Start chatting**: Type your message and press Enter or click Send
4. **Toggle Theme**: Use the theme toggle button in the sidebar (if enabled)
5. **Enjoy**: The AI will respond with real-time streaming

## 🏗️ Project Structure

```
mini-gpt/
├── src/
│   ├── contexts/
│   │   └── ThemeContext.tsx      # Dark/light theme management
│   ├── pages/
│   │   ├── ChatPage.tsx          # Main chat interface
│   │   └── components/
│   │       ├── ChatSection.tsx   # Chat messages and input
│   │       └── SideBar.tsx       # Navigation sidebar (optional)
│   ├── App.tsx                   # Root component with theme provider
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles and Tailwind imports
├── public/                       # Static assets
├── tailwind.config.js            # Tailwind CSS configuration
└── package.json                  # Dependencies and scripts
```

## ⚙️ Configuration

### Changing the AI Model

To use a different Ollama model, edit the model name in `src/pages/components/ChatSection.tsx`:

```typescript
// Line ~120 in ChatSection.tsx
body: JSON.stringify({
  model: "your-model-name", // Change this to your preferred model
  prompt: input,
  stream: true,
}),
```

### Available Models

You can use any model available in Ollama. Some popular options:

- `deepseek-r1:1.5b` (default)
- `llama3.2:3b`
- `mistral:7b`
- `codellama:7b`

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite
- **AI Backend**: Ollama
- **Linting**: ESLint

## 🐛 Troubleshooting

### Common Issues

1. **Ollama not responding**

   - Ensure Ollama is running: `ollama serve`
   - Check if the model is pulled: `ollama list`

2. **Connection refused**

   - Verify Ollama is running on `http://localhost:11434`
   - Check firewall settings

3. **Model not found**

   - Pull the required model: `ollama pull model-name`
   - Verify model name in the code matches exactly

### Getting Help

If you encounter any issues:

1. Check the browser console for errors
2. Verify Ollama is running and accessible
3. Ensure the correct model is installed
4. Check the network tab for API call failures
5. Try clearing browser cache and localStorage

---

**Happy chatting! 🤖💬**
