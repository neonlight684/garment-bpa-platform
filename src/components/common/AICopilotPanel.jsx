import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, Loader2 } from 'lucide-react';

export default function AICopilotPanel() {
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { sender: 'ai', text: 'Hello! I am your Enterprise Garment ERP AI Co-pilot. Ask me anything about production bottlenecks, tech packs, or inventory status.' }
  ]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;

    const userMessage = inputPrompt;
    setChatHistory((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInputPrompt('');
    setLoading(true);

    try {
      // Calling our backend AI route
      const response = await fetch('http://localhost:5000/api/ai/parse-techpack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ techPackText: userMessage })
      });
      const result = await response.json();

      if (result.success) {
        const aiReply = `AI Analysis: Style "${result.data.styleName}" processed. Suggested Consumption: ${result.data.suggestedFabricConsumption}, Estimated Cost: ${result.data.estimatedCostPerPcs}. Recommendations: ${result.data.aiRecommendations.join(' ')}`;
        setChatHistory((prev) => [...prev, { sender: 'ai', text: aiReply }]);
      } else {
        setChatHistory((prev) => [...prev, { sender: 'ai', text: 'Sorry, I encountered an error processing your request.' }]);
      }
    } catch (err) {
      setChatHistory((prev) => [...prev, { sender: 'ai', text: 'Failed to connect to AI backend server.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col h-[550px] shadow-2xl">
      {/* Header */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 mb-3">
        <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
        <h3 className="font-bold text-white text-sm">Enterprise AI Co-pilot & Assistant</h3>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-700">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`flex items-start space-x-2 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <div className={`p-2 rounded-lg shrink-0 ${msg.sender === 'user' ? 'bg-blue-600' : 'bg-purple-600'}`}>
              {msg.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
            </div>
            <div className={`p-3 rounded-xl text-xs max-w-[80%] leading-relaxed ${msg.sender === 'user' ? 'bg-blue-950/60 text-slate-200 border border-blue-800/50' : 'bg-slate-800 text-slate-300 border border-slate-700/50'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center space-x-2 text-slate-400 text-xs italic">
            <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
            <span>AI is analyzing operational data...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="mt-3 flex items-center space-x-2 border-t border-slate-800 pt-3">
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder="Ask AI about tech pack, cost, or bottlenecks..."
          className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-lg transition-colors flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}