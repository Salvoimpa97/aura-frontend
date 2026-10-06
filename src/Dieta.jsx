import { Utensils } from 'lucide-react';

export default function Dieta() {
  return (
    <div className="p-4 min-h-screen text-white fade-in">
      <div className="flex justify-between items-center mb-6 mt-4">
        <h1 className="text-3xl font-bold text-orange-500 font-serif">Alimentazione</h1>
      </div>
      
      <div className="text-center mt-20 bg-[#111111] border border-gray-800 p-8 rounded-3xl shadow-xl">
        <div className="bg-orange-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
           <Utensils className="text-orange-500" size={40} />
        </div>
        <h2 className="text-xl font-bold mb-2">Generatore Diete in arrivo</h2>
        <p className="text-gray-400 text-sm mb-6">Stiamo addestrando Aura a creare i migliori piani alimentari personalizzati.</p>
        <button disabled className="bg-gray-800 text-gray-500 px-6 py-3 rounded-xl font-medium uppercase tracking-wider text-sm cursor-not-allowed">
          Prossimamente
        </button>
      </div>
    </div>
  );
}
