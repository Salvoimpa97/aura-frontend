import { useState, useEffect } from 'react';
import { Dumbbell, Utensils, Sparkles } from 'lucide-react';

export default function Oggi() {
  const [data, setData] = useState({ workout: null, diet: null });
  const [loading, setLoading] = useState(true);

  const API_URL = "https://aura-backend-salvo12.vercel.app";
  const DEVICE_ID = "utente_salvo";

  useEffect(() => {
    fetch(`${API_URL}/api/today?device_id=${DEVICE_ID}`)
      .then(res => res.json())
      .then(data => { setData(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 fade-in">
      <header className="mb-8 mt-4">
        <h1 className="text-4xl font-bold text-[#10b981] tracking-tight">Aura.</h1>
        <p className="text-gray-400 mt-1 font-sans">Bentornato. Il tuo ecosistema fitness.</p>
      </header>

      {loading ? (
        <div className="text-center text-[#10b981] mt-20 animate-pulse font-sans">Caricamento in corso...</div>
      ) : (
        <div className="space-y-6 font-sans">
          
          <section className="bg-[#111111] p-5 rounded-3xl border border-gray-800 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#10b981]/10 rounded-xl"><Dumbbell className="text-[#10b981]" size={20} /></div>
              <h2 className="text-xl font-semibold text-white">Allenamento del Giorno</h2>
            </div>
            {data.workout ? (
              <div>
                <p className="text-lg text-gray-100 font-medium">{data.workout.name}</p>
                <p className="text-sm text-gray-500 mb-5">{data.workout.focus}</p>
                <button className="w-full bg-[#10b981]/10 text-[#10b981] py-3 rounded-xl border border-[#10b981]/30 font-medium hover:bg-[#10b981]/20 transition">Inizia Sessione</button>
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-2">Nessuna scheda attiva.</p>
            )}
          </section>

          <section className="bg-[#111111] p-5 rounded-3xl border border-gray-800 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-500/10 rounded-xl"><Utensils className="text-orange-500" size={20} /></div>
              <h2 className="text-xl font-semibold text-white">Dieta Attiva</h2>
            </div>
            {data.diet ? (
              <div>
                <p className="text-lg text-gray-100 font-medium">{data.diet.name}</p>
                <p className="text-sm text-gray-500 mb-5">{data.diet.daily_calories} Kcal giornaliere</p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-2">Nessun piano alimentare attivo.</p>
            )}
          </section>

        </div>
      )}
    </div>
  );
}
