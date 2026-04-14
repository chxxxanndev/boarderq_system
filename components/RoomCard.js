// components/RoomCard.js
'use client'; // Add this to ensure event handlers work correctly

import { User, MapPin, ArrowRight, ImageOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function RoomCard({ room }) {
  const [imageError, setImageError] = useState(false);
  
  const isAvailable = room.status?.toLowerCase() === 'available';

  // Standardize the URL: replace spaces with %20 for the browser
  const getDefaultImage = (id) => {
    const imgNumber = (id % 5) + 1;
    return `/images/Image%20(${imgNumber}).jpg`; 
  };

  const imagePath = room.image_url ? room.image_url : getDefaultImage(room.id);

  return (
    <div className="glass-panel overflow-hidden group hover:border-cyan-500/40 transition-all duration-500 flex flex-col h-full border-l-2 border-l-slate-800 hover:border-l-cyan-400">
      
      <div className="h-52 bg-slate-900 relative overflow-hidden flex items-center justify-center">
        {!imageError ? (
          <img 
            src={imagePath} 
            alt={room.name}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale-[30%] group-hover:grayscale-0"
            onError={() => setImageError(true)} // Set state to true once, prevents loop
          />
        ) : (
          <div className="flex flex-col items-center text-slate-600">
            <ImageOff className="w-12 h-12 mb-2" />
            <span className="text-[10px] font-mono uppercase">Image Not Found</span>
          </div>
        )}
        
        <div className={`absolute top-4 right-4 px-4 py-1 border text-[10px] font-black uppercase tracking-widest italic flex items-center gap-2 ${
          isAvailable 
            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.2)]' 
            : 'bg-slate-900 border-slate-700 text-slate-500'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`}></div>
          {room.status}
        </div>

        <div className="absolute bottom-0 left-0 bg-slate-950/80 px-3 py-1 border-t border-r border-slate-800/50 backdrop-blur-sm">
          <span className="text-[9px] font-mono text-cyan-500 uppercase tracking-widest font-bold">
            UNIT-ID: {room.id?.toString().padStart(3, '0')}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 bg-black/20">
        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4 group-hover:text-cyan-400 transition-colors">
          {room.name}
        </h3>

        <div className="space-y-3 mb-8 bg-slate-950/40 p-4 border border-slate-800/40 rounded-sm">
          <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-widest text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-purple-500" />
            {room.location || "Main Branch"}
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-widest text-slate-500">
            <User className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-300">{room.capacity || "1-2"} Person Max</span>
          </div>
          
          <div className="flex items-center gap-3 pt-2 border-t border-slate-800/60 mt-2">
            <div className="text-[10px] font-mono text-slate-600 uppercase">Monthly Rate:</div>
            <div className="text-xl font-black text-cyan-400 flex items-center gap-1">
              <span className="text-xs font-mono">PHP</span> 
              {Number(room.monthly_rate || 0).toLocaleString()}
            </div>
          </div>
        </div>

        <div className="mt-auto">
          {isAvailable ? (
            <Link 
              href={`/public/apply?room=${room.id}`}
              className="w-full flex items-center justify-center gap-2 py-3 bg-cyan-500 text-slate-950 font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_20px_rgba(34,211,238,0.1)]"
            >
              Initiate Application <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <button 
              disabled
              className="w-full flex items-center justify-center gap-2 py-3 border border-slate-800 text-slate-700 font-bold text-[11px] uppercase tracking-[0.2em] cursor-not-allowed italic"
            >
              Unit Occupied
            </button>
          )}
        </div>
      </div>
    </div>
  );
}