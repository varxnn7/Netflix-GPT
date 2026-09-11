import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

/* ─── Clean Modern AI Sparkle Bot Avatar ──────────────────────────── */
const BotAvatar = () => (
  <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white bg-gradient-to-tr from-[#E50914] to-[#ff3b47] shadow-md shadow-red-900/50">
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M12 2L14.6 9.4L22 12L14.6 14.6L12 22L9.4 14.6L2 12L9.4 9.4L12 2Z" />
    </svg>
  </div>
);

/* ─── Typing indicator ───────────────────────────────────────────── */
const TypingIndicator = () => (
  <div className="flex items-end gap-2">
    <BotAvatar />
    <div className="flex items-center gap-1.5 bg-[#252525] border border-white/5 rounded-2xl rounded-bl-none px-4 py-3">
      <div className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
      <div className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
      <div className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
    </div>
  </div>
);

/* ─── Helper to render bold markdown (**text**) ──────────────────── */
const formatMessage = (content) => {
  if (!content) return '';
  const parts = content.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

/* ─── Single message bubble ──────────────────────────────────────── */
const Message = ({ msg }) => {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
      {!isUser && <BotAvatar />}
      <div
        className={`max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl whitespace-pre-wrap break-words ${
          isUser
            ? 'bg-gradient-to-r from-[#E50914] to-[#d60812] text-white rounded-br-none shadow-md shadow-red-900/30'
            : 'bg-[#252525] border border-white/5 text-gray-200 rounded-bl-none'
        }`}
      >
        {formatMessage(msg.text)}
      </div>
    </div>
  );
};

/* ─── Quick prompt chips ─────────────────────────────────────────── */
const QUICK_PROMPTS = [
  '🎬 Suggest a movie for tonight',
  '🤖 How does GPT Search work?',
  '🍿 Best suspense thrillers?',
  '🌟 Top trending movies',
];

/* ─── Main Chatbot component ─────────────────────────────────────── */
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "👋 Hi! I'm **NetflixBot** — your personal movie guide.\nAsk me for movie recommendations, genre tips, or how to use Netflix-GPT!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatSessionRef = useRef(null);

  // Initialize or get chat session
  const getChat = () => {
    const apiKey = import.meta.env.VITE_GEMINI_KEY;
    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') return null;

    if (!chatSessionRef.current) {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction: `You are NetflixBot, a knowledgeable, friendly, and enthusiastic AI assistant for Netflix-GPT — a modern Netflix-style streaming & movie discovery web application.
Your role:
1. Suggest great movies and TV shows based on the user's mood, preferred genres, actors, or themes.
2. Provide concise summaries, ratings context, and fun trivia.
3. Help users navigate the Netflix-GPT app (such as the GPT Search feature, Movies, TV Shows, Games, New & Popular, and profile switcher).
Keep answers concise, engaging, and directly relevant. Format movie titles in **bold**. If asked something completely unrelated, politely guide them back to movies and entertainment.`,
      });
      chatSessionRef.current = model.startChat({ history: [] });
    }
    return chatSessionRef.current;
  };

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 120);
  }, [isOpen]);

  const sendMessage = async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || loading) return;

    const apiKey = import.meta.env.VITE_GEMINI_KEY;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setLoading(true);

    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            text: '⚠️ Gemini API key not found.\n\nPlease check that your `VITE_GEMINI_KEY` is saved in `.env` and restart the server if needed.',
          },
        ]);
        setLoading(false);
      }, 500);
      return;
    }

    try {
      const chat = getChat();
      if (!chat) {
        throw new Error('Could not initialize chat session.');
      }
      const result = await chat.sendMessage(trimmed);
      const reply = result.response.text();
      setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
    } catch (err) {
      console.error('Gemini Chat Error:', err);
      // Try fallback to standard model if session failed
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const fallbackModel = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
        const res = await fallbackModel.generateContent(
          `You are NetflixBot for Netflix-GPT. Keep answers brief and movie-focused. User asked: ${trimmed}`
        );
        const reply = res.response.text();
        setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
      } catch (fallbackErr) {
        console.error('Gemini Fallback Error:', fallbackErr);
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            text: '❌ Something went wrong connecting to Gemini. Please check your API key or try again.',
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ── Chat Window ─────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-5 z-[99999] w-[370px] max-w-[calc(100vw-24px)] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-slideUp backdrop-blur-md"
          style={{ background: '#141414', maxHeight: 'calc(100vh - 120px)' }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3.5 border-b border-white/10"
            style={{ background: '#1c1c1c' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#E50914] to-[#ff3b47] flex items-center justify-center text-white shadow-md shadow-red-900/50">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L14.6 9.4L22 12L14.6 14.6L12 22L9.4 14.6L2 12L9.4 9.4L12 2Z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight flex items-center gap-1.5">
                  NetflixBot
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                    AI
                  </span>
                </p>
                <p className="text-green-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 min-h-0" style={{ maxHeight: '350px' }}>
            {messages.map((msg, i) => (
              <Message key={i} msg={msg} />
            ))}
            {loading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts */}
          {messages.length <= 1 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => sendMessage(p)}
                  className="text-xs px-2.5 py-1.5 rounded-full border border-white/15 text-gray-300 hover:border-red-500 hover:text-white transition-all bg-white/5 hover:bg-red-600/20"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 pb-3 pt-2 border-t border-white/10 bg-[#171717]">
            <div className="flex items-center gap-2 bg-[#252525] border border-white/5 rounded-xl px-3 py-1.5 focus-within:border-red-500/50 transition-colors">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me about movies or shows…"
                className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 outline-none resize-none max-h-24 leading-relaxed py-1"
                style={{ overflowY: 'auto' }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-30 hover:scale-105 active:scale-95 shadow-md shadow-red-900/40"
                style={{ background: input.trim() && !loading ? '#E50914' : '#333' }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
            <p className="text-center text-gray-500 text-[10px] mt-1.5">Powered by Google Gemini AI</p>
          </div>
        </div>
      )}

      {/* ── FAB Button ──────────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`fixed bottom-5 right-5 z-[99999] w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(229,9,20,0.5)] border border-red-400/30 transition-all duration-300 active:scale-95 ${
          isOpen ? 'scale-90 bg-[#222] border-white/20 shadow-none' : 'bg-gradient-to-tr from-[#E50914] via-[#E50914] to-[#ff3b47] fab-pulse hover:scale-110 hover:shadow-[0_10px_30px_rgba(229,9,20,0.7)]'
        }`}
        title="Chat with NetflixBot"
      >
        {isOpen ? (
          /* Close X */
          <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          /* Clean Modern AI Chat Bubble Icon */
          <div className="relative flex items-center justify-center">
            {/* Smooth modern chat bubble */}
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            {/* Clean AI sparkle inside/over the bubble */}
            <svg
              className="w-3 h-3 fill-white text-white absolute -top-1.5 -right-1.5 filter drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L14.6 9.4L22 12L14.6 14.6L12 22L9.4 14.6L2 12L9.4 9.4L12 2Z" />
            </svg>
          </div>
        )}
      </button>
    </>
  );
};

export default Chatbot;
