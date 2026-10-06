import { useState, useEffect } from 'react';
import { Dumbbell, Sparkles } from 'lucide-react';

export default function Schede() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  
  const API_URL = "https://aura-backend-salvo12.vercel.app";
  const DEVICE_ID = "utente_salvo";

  const fetchWorkouts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/workouts?device_id=${DEVICE_ID}`);
      const data = await res.json();
      setWorkouts(data);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchWorkouts(); }, []);

  const handleGenerateAI = async () => {
    const prompt = window.prompt("Cosa vuoi allenare oggi? (es. Petto e Tricipiti massa)");
    if (!prompt) return;
    
    setGenerating(true);
    try {
      const res = await fetch(`${API_URL}/api/ai/generate-workout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ device_id: DEVICE_ID, prompt: prompt })
      });
      await fetchWorkouts();
    } catch (err) { alert("Errore IA. Controlla che la chiave Gemini sia attiva."); }
    finally { setGenerating(false); }
  };

  return (
    <div className="p-4 min-h-screen text-white fade-in">
      <div className="flex justify-between items-center mb-6 mt-4">
        <h1 className="text-3xl font-bold text-[#10b981] font-serif">Le Tue Schede</h1>
      </div>
      
      <button onClick={handleGenerateAI} disabled={generating} className="w-full mb-6 bg-[#10b981] text-black px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 font-sans hover:bg-[#0ea5e9] transition">
        <Sparkles size={18} /> {generating ? 'Aura sta creando la scheda...' : 'Genera Scheda con IA'}
      </button>

      {loading && <p className="text-gray-500 text-center mt-10 animate-pulse">Caricamento schede...</p>}
      
      {!loading && workouts.length === 0 && (
         <div className="text-center mt-10 bg-[#111111] border border-gray-800 p-6 rounded-2xl">
           <Dumbbell className="mx-auto text-gray-700 mb-3" size={40} />
           <p className="text-gray-400">Nessuna scheda. Chiedi ad Aura di crearne una!</p>
         </div>
      )}

      <div className="space-y-4 font-sans">
        {workouts.map(w => (
          <div key={w._id} className="bg-[#111111] p-5 rounded-2xl border border-gray-800 shadow-lg">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold text-white">{w.name}</h2>
              <span className="bg-[#10b981]/20 text-[#10b981] text-xs px-2 py-1 rounded-md uppercase font-bold tracking-wider">{w.source}</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">{w.focus} • {w.exercises?.length || 0} Esercizi</p>
            
            <div className="space-y-3 mt-3 pt-4 border-t border-gray-800/50">
              {w.exercises?.map((ex, i) => (
                <div key={i} className="flex justify-between text-sm bg-black/40 p-3 rounded-lg border border-gray-800/50">
                  <div>
                    <span className="text-gray-200 block font-medium">{ex.name}</span>
                    <span className="text-gray-600 text-xs">{ex.muscle_group}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#10b981] font-bold block">{ex.sets}x{ex.reps}</span>
                    <span className="text-gray-600 text-xs">Rec: {ex.rest}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
