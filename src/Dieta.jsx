import { useState, useEffect } from 'react';
import { Utensils, Sparkles, Flame, Droplet, Wheat } from 'lucide-react';

export default function Dieta() {
  const [diet, setDiet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const API_URL = "https://aura-backend-salvo12.vercel.app";
  const DEVICE_ID = "utente_salvo";

  const fetchDiet = async () => {
    try {
      const res = await fetch(`${API_URL}/api/today?device_id=${DEVICE_ID}`);
      const data = await res.json();
      setDiet(data.diet);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchDiet(); }, []);

  const handleGenerateAI = async () => {
    const prompt = window.prompt("Qual è il tuo obiettivo alimentare? (es. Dimagrimento 1800 kcal, senza glutine, alto contenuto proteico)");
    if (!prompt) return;

    setGenerating(true);
    try {
      const res = await fetch(`${API_URL}/api/ai/generate-diet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ device_id: DEVICE_ID, prompt: prompt })
      });
      await fetchDiet();
    } catch (err) { alert("Errore IA. Controlla la connessione al server."); }
    finally { setGenerating(false); }
  };

  return (
    <div className="p-4 min-h-screen text-white fade-in pb-24">
      <div className="flex justify-between items-center mb-6 mt-4">
        <h1 className="text-3xl font-bold text-orange-500 font-serif">Alimentazione</h1>
      </div>

      <button onClick={handleGenerateAI} disabled={generating} className="w-full mb-6 bg-orange-500 text-black px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 font-sans hover:bg-orange-600 transition">
        <Sparkles size={18} /> {generating ? 'Aura sta creando la dieta...' : 'Genera Dieta con IA'}
      </button>

      {loading && <p className="text-gray-500 text-center mt-10 animate-pulse">Caricamento...</p>}

      {!loading && !diet && (
         <div className="text-center mt-10 bg-[#111111] border border-gray-800 p-6 rounded-2xl shadow-xl">
           <div className="bg-orange-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
             <Utensils className="text-orange-500" size={40} />
           </div>
           <p className="text-gray-300 font-medium mb-1">Nessuna dieta attiva</p>
           <p className="text-gray-500 text-sm">Chiedi ad Aura di crearne una su misura per te.</p>
         </div>
      )}

      {diet && (
        <div className="space-y-6 font-sans">
          <div className="bg-[#111111] p-5 rounded-3xl border border-gray-800 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-1">{diet.name}</h2>
            <div className="flex items-center gap-2 text-orange-500 mb-6 font-semibold">
              <Flame size={20} /> {diet.daily_calories} Kcal giornaliere
            </div>

            {/* Macros */}
            <div className="grid grid-cols-3 gap-4 mb-2">
              <div className="bg-black/50 p-3 rounded-2xl border border-gray-800/50 text-center">
                <p className="text-xs text-gray-500 mb-1 flex justify-center items-center gap-1"><Droplet size={14} className="text-blue-400"/> PRO</p>
                <p className="font-bold text-gray-200">{diet.protein_g}g</p>
              </div>
              <div className="bg-black/50 p-3 rounded-2xl border border-gray-800/50 text-center">
                <p className="text-xs text-gray-500 mb-1 flex justify-center items-center gap-1"><Wheat size={14} className="text-yellow-500"/> CAR</p>
                <p className="font-bold text-gray-200">{diet.carbs_g}g</p>
              </div>
              <div className="bg-black/50 p-3 rounded-2xl border border-gray-800/50 text-center">
                <p className="text-xs text-gray-500 mb-1 flex justify-center items-center gap-1"><Flame size={14} className="text-red-400"/> FAT</p>
                <p className="font-bold text-gray-200">{diet.fat_g}g</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-serif font-bold text-white mt-8 mb-4">I tuoi Pasti</h3>

          <div className="space-y-4">
            {diet.meals?.map((m, i) => (
              <div key={i} className="bg-[#111111] p-5 rounded-3xl border border-gray-800 shadow-lg">
                <div className="flex justify-between items-center mb-3 border-b border-gray-800 pb-3">
                  <h4 className="text-lg font-bold text-orange-500">{m.meal}</h4>
                  <span className="text-sm font-semibold text-gray-400 bg-gray-900 px-3 py-1 rounded-full">{m.calories} Kcal</span>
                </div>
                <p className="text-gray-200 font-medium mb-3">{m.name}</p>
                <ul className="space-y-2">
                  {m.items?.map((item, idx) => (
                    <li key={idx} className="flex justify-between text-sm text-gray-400 bg-black/40 p-3 rounded-xl border border-gray-800/30">
                      <span>{item.name}</span>
                      <span className="text-gray-500">{item.calories} kcal</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
