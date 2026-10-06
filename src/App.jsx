import { useState } from 'react';
import { Home, Dumbbell, Utensils, MessageSquare } from 'lucide-react';
import Oggi from './Oggi';
import Schede from './Schede';
import Trainer from './Trainer';
import Dieta from './Dieta';

export default function App() {
  const [activeTab, setActiveTab] = useState('oggi');

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-serif selection:bg-[#10b981]/30">
      
      {/* Contenuto Principale */}
      <div className="pb-24">
        {activeTab === 'oggi' && <Oggi />}
        {activeTab === 'schede' && <Schede />}
        {activeTab === 'dieta' && <Dieta />}
        {activeTab === 'trainer' && <Trainer />}
      </div>

      {/* Barra Navigazione Inferiore */}
      <nav className="fixed bottom-0 w-full bg-[#111111] border-t border-gray-800 pb-safe z-50">
        <div className="flex justify-around items-center p-2">
          <NavButton id="oggi" icon={Home} label="Oggi" activeTab={activeTab} setActive={setActiveTab} />
          <NavButton id="schede" icon={Dumbbell} label="Schede" activeTab={activeTab} setActive={setActiveTab} />
          <NavButton id="dieta" icon={Utensils} label="Dieta" activeTab={activeTab} setActive={setActiveTab} />
          <NavButton id="trainer" icon={MessageSquare} label="Trainer" activeTab={activeTab} setActive={setActiveTab} />
        </div>
      </nav>
    </div>
  );
}

function NavButton({ id, icon: Icon, label, activeTab, setActive }) {
  const isActive = activeTab === id;
  return (
    <button onClick={() => setActive(id)} className={`flex flex-col items-center p-2 w-16 transition-colors ${isActive ? 'text-[#10b981]' : 'text-gray-500 hover:text-gray-300'}`}>
      <Icon size={24} className="mb-1" />
      <span className="text-[10px] font-sans font-medium uppercase tracking-wider">{label}</span>
    </button>
  );
}
