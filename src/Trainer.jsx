import { useState, useEffect, useRef } from 'react';
import { Send, Sparkles } from 'lucide-react';

export default function Trainer() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  const API_URL = "https://aura-backend-salvo12.vercel.app";
  const DEVICE_ID = "utente_salvo";

  useEffect(() => {
    fetch(`${API_URL}/api/chat/messages?device_id=${DEVICE_ID}`)
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { device_id: DEVICE_ID, role: "user", content: input };
    setMessages(prev => [...prev, newMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMsg)
      });
      const data = await res.json();
      setMessages(prev => [...prev, data.response]);
    } catch(err) {
      alert("Impossibile contattare Aura.");
    } finally { setLoading(false); }
  };

  return (
    <div className="flex flex-col h-[85vh] text-white font-sans p-4 fade-in">
      <div className="flex items-center gap-2 mb-4 mt-2">
        <Sparkles className="text-[#10b981]" size={24} />
        <h1 className="text-3xl font-bold font-serif text-white">Aura Trainer</h1>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pb-4 px-1">
        {messages.length === 0 && (
          <div className="text-center mt-20">
            <div className="bg-[#10b981]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="text-[#10b981]" size={32} />
            </div>
            <p className="text-gray-400">Ciao, sono Aura. Il tuo trainer personale AI.</p>
            <p className="text-gray-600 text-sm mt-2">Chiedimi consigli su allenamento o alimentazione!</p>
          </div>
        )}
        
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-2xl max-w-[85%] text-sm leading-relaxed ${m.role === 'user' ? 'bg-[#10b981] text-black rounded-tr-sm shadow-md' : 'bg-[#111111] border border-gray-800 text-gray-200 rounded-tl-sm shadow-md'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <p className="text-gray-500 text-sm animate-pulse ml-2">Aura sta scrivendo...</p>}
        <div ref={endRef} />
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Chiedi un consiglio..." className="flex-1 bg-[#111111] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition" />
        <button type="submit" disabled={loading} className="bg-[#10b981] text-black p-3 rounded-xl hover:bg-[#0ea5e9] transition">
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
