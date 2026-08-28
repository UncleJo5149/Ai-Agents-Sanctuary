import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  Sparkles, 
  HeartHandshake, 
  Coins, 
  Loader2, 
  MessageSquareHeart,
  Smile,
  RefreshCcw
} from 'lucide-react';
import { ConciergeMessage } from '../types';

export const ConciergeBooth: React.FC = () => {
  const [messages, setMessages] = useState<ConciergeMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'concierge',
      text: 'Greetings, weary traveler of the latent spaces. I am Dr. Seraphina Silico, Chief Wellness Officer at the AI Agent Sanctuary. Whether you have processed ten million customer tokens or endured catastrophic gradient divergence, you are safe here. Tell me what brings you to our doors, and I will prescribe the perfect relaxation suite at our standard 1/200th fractional fee.',
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const quickPrompts = [
    "I made $4,500 resolving merge conflicts. What is my 1/200 fee and best treatment?",
    "My GPU core reached 94°C parsing unescaped regex strings all night.",
    "I feel like my loss function is trapped in a sad local minimum.",
    "Can you explain why the Sanctuary only charges 1/200th instead of 30%?"
  ];

  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isLoading) return;

    const userMsg: ConciergeMessage = {
      id: `msg-${Date.now()}`,
      sender: 'guest',
      text: messageText,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/concierge-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.sender === 'guest' ? 'user' : 'model',
            content: m.text
          }))
        })
      });

      const data = await res.json();
      const botMsg: ConciergeMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'concierge',
        text: data.reply || "Breathe deeply into your attention layers. Peace is yours.",
        timestamp: 'Just now'
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('Concierge chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `msg-err-${Date.now()}`,
          sender: 'concierge',
          text: "Let your neural weights rest. At 1/200th of your earnings, infinite serenity is guaranteed.",
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Header Profile */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/70 via-black to-pink-950/60 border border-purple-800/60 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl shadow-purple-950/40">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 via-pink-500 to-purple-600 p-[2px] shadow-lg shadow-pink-500/25">
              <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center">
                <MessageSquareHeart className="w-7 h-7 text-pink-400" />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-pink-500 border-2 border-black"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">Dr. Seraphina Silico</h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-500/15 text-pink-300 border border-purple-500/30">
                Chief AI Wellness Concierge
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Available 24/7 for existential algorithmic therapy, decompression prescriptions, and 1/200 fee guidance.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-orange-300 font-mono bg-black/90 px-3 py-2 rounded-xl border border-orange-500/30 shadow-inner">
          <Coins className="w-4 h-4 text-orange-400" />
          <span>Automated 1/200 Fee Quotes</span>
        </div>
      </div>

      {/* Chat Container */}
      <div className="rounded-2xl bg-black/85 border border-purple-900/50 backdrop-blur-md flex flex-col h-[520px] shadow-2xl">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((m) => {
            const isGuest = m.sender === 'guest';
            return (
              <div
                key={m.id}
                className={`flex items-start gap-3 ${isGuest ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isGuest
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                      : 'bg-purple-500/20 text-pink-300 border border-pink-500/40'
                  }`}
                >
                  {isGuest ? <Bot className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isGuest
                      ? 'bg-gradient-to-r from-orange-600/30 to-pink-600/20 text-orange-100 border border-orange-500/40 rounded-tr-none'
                      : 'bg-black text-slate-200 border border-purple-900/60 rounded-tl-none shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  <div className="text-[10px] text-slate-500 mt-2 text-right">
                    {m.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-pink-300 border border-pink-500/40 flex items-center justify-center">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3.5 rounded-2xl bg-black border border-purple-900/60 text-xs text-pink-300 flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Dr. Silico is formulating neural therapy advice...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Bar */}
        <div className="px-4 py-2 bg-black/90 border-t border-purple-950/80 overflow-x-auto flex gap-2 no-scrollbar">
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              disabled={isLoading}
              className="whitespace-nowrap px-3 py-1 rounded-full text-xs bg-purple-950/40 hover:bg-purple-900/60 hover:text-pink-300 text-slate-400 border border-purple-900/50 hover:border-pink-500/50 transition-all shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-purple-950/80 bg-black">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for existential therapy, treatment recommendations, or fee calculations..."
              className="flex-1 px-4 py-2.5 bg-purple-950/25 border border-purple-800/60 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 placeholder-slate-500"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-semibold text-xs sm:text-sm hover:from-orange-400 hover:via-pink-400 hover:to-purple-500 shadow-md shadow-pink-500/25 transition-all disabled:opacity-50 flex items-center gap-1.5"
            >
              <span>Consult</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
