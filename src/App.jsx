import React, { useState, useEffect } from 'react';
import { Home, Dumbbell, Utensils, MessageSquare } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('oggi');
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    let id = localStorage.getItem('aura_device_id');
    if (!id) {
      id = 'aura_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('aura_device_id', id);
    }
    setDeviceId(id);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans pb-20">
      <header className="p-4 flex justify-between items-center border-b border-gray-800 pt-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center">
            <span className="text-black font-bold font-serif text-lg">A</span>
          </div>
          <span className="font-serif text-xl font-semibold">Aura Fitness</span>
        </div>
      </header>

      <main className="p-4">
        {activeTab === 'oggi' && <Dashboard />}
        {activeTab === 'schede' && <div className="p-4 text-center text-gray-500">Sezione Schede in sviluppo...</div>}
        {activeTab === 'dieta' && <div className="p-4 text-center text-gray-500">Sezione Dieta in sviluppo...</div>}
        {activeTab === 'trainer' && <div className="p-4 text-center text-gray-500">Trainer AI in sviluppo...</div>}
      </main>

      <nav className="fixed bottom-0 w-full bg-[#0a0a0a] border-t border-gray-800 px-6 py-4 flex justify-between items-center z-50 pb-8">
        <NavButton icon={<Home />} label="Oggi" isActive={activeTab === 'oggi'} onClick={() => setActiveTab('oggi')} />
        <NavButton icon={<Dumbbell />} label="Schede" isActive={activeTab === 'schede'} onClick={() => setActiveTab('schede')} />
        <NavButton icon={<Utensils />} label="Dieta" isActive={activeTab === 'dieta'} onClick={() => setActiveTab('dieta')} />
        <NavButton icon={<MessageSquare />} label="Trainer" isActive={activeTab === 'trainer'} onClick={() => setActiveTab('trainer')} />
      </nav>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="animate-fade-in mt-2">
      <h2 className="text-[#10B981] text-sm font-semibold mb-1 uppercase tracking-wider">Oggi</h2>
      <h1 className="text-4xl font-serif mb-8 text-white">La tua panoramica</h1>

      <div className="bg-[#1c1c1e] rounded-3xl p-5 mb-5 shadow-lg border border-gray-800/60">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#0a2e1f] p-2.5 rounded-xl text-[#10B981]">
            <Dumbbell size={22} />
          </div>
          <h3 className="text-xl font-serif text-white">Allenamento</h3>
        </div>
        <div className="text-center py-6">
          <p className="text-gray-400 mb-5">Nessuna scheda attiva</p>
          <button className="bg-[#10B981]/10 text-[#10B981] px-6 py-3 rounded-2xl font-medium hover:bg-[#10B981]/20 transition-colors w-full">
            + Crea scheda
          </button>
        </div>
      </div>

      <div className="bg-[#1c1c1e] rounded-3xl p-5 mb-5 shadow-lg border border-gray-800/60">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#0a2e1f] p-2.5 rounded-xl text-[#10B981]">
            <Utensils size={22} />
          </div>
          <h3 className="text-xl font-serif text-white">Dieta</h3>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold font-serif tracking-tight">2900</span>
            <span className="text-gray-400 text-sm">kcal/giorno</span>
          </div>
          <p className="text-gray-500 text-sm mt-2 mb-5">Piano di 7 giorni</p>
          <button className="text-[#10B981] font-medium flex items-center gap-1 hover:underline">
            Vedi piano <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function NavButton({ icon, label, isActive, onClick }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-colors ${isActive ? 'text-[#10B981]' : 'text-gray-500'}`}>
      {React.cloneElement(icon, { size: 24, strokeWidth: isActive ? 2.5 : 2 })}
      <span className="text-[11px] font-medium tracking-wide">{label}</span>
    </button>
  );
}
