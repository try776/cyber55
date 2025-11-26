import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, X, Minimize, Maximize, Battery, Wifi, Volume2, Skull, Ghost, 
  Flame, AlertTriangle, Save, Cpu, Zap, TrendingUp, Music, Bomb, 
  MessageCircle, DollarSign, Eye, Lock, ShieldCheck, Trash2, Pizza, ChefHat
} from 'lucide-react';

/**
 * SKIBIDI OS - ITALIAN EDITION v🤌.🤌
 * PATCH NOTES:
 * - Added AUDIO ENGINE (Web Audio API + TTS)
 * - Loud noises included
 * - Nonna is now audible
 */

// --- ASSETS & CONSTANTS ---
const EMOJIS = ['🤌', '🍕', '🍝', '🍷', '🍅', '🇮🇹', '🧀', '🛵', '🥖', '🍨', '🎭', '⚽', '⛪', '🕶️', '👨🏻‍🍳', '🌋'];
const PHRASES = [
  "Mamma Mia!", "It's a me, Mario!", "Porca Miseria!", "Gabagool?", "Fuggedaboutit", 
  "That's Amore", "Spaghet!", "Ravioli Ravioli", "I cooka da pizza", "No Pineapple!",
  "Gorlami", "Bippity Boppity", "Che cazzo fai?", "Una Mattina...", "Bella Ciao"
];
const ADS = [
  "HOT NONNAS IN YOUR AREA", "FREE PIZZA GENERATOR", "YOU WON A FERRARI", 
  "IS YOUR PASTA AL DENTE?", "LUIGI IS CALLING...", "DOWNLOAD FREE PARMESAN"
];

// --- SOUND ENGINE ---
const playSound = (type) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'click') {
      // High pitch beep (Pizza click)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'boom') {
      // Vine Boom style (Low freq drop)
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(10, now + 0.5);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === 'error') {
      // Windows Error style
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'coin') {
      // Mario Coin style
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.setValueAtTime(1200, now + 0.05);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    }
    else {
      // Text to Speech for words
      const utterance = new SpeechSynthesisUtterance(type);
      utterance.rate = 1.1;
      utterance.pitch = Math.random() * 0.4 + 0.8; // Random pitch for funny effect
      utterance.volume = 1;
      
      // Try to find Italian voice, fallback to whatever
      const voices = window.speechSynthesis.getVoices();
      const itVoice = voices.find(v => v.lang.includes('it') || v.lang.includes('IT'));
      if (itVoice) utterance.voice = itVoice;
      
      window.speechSynthesis.speak(utterance);
    }
  } catch (e) {
    console.error("Audio failed:", e);
  }
};

// --- HELPER COMPONENTS ---

const WindowFrame = ({ title, children, onClose, x, y, z, active, onActivate, onMove }) => {
  const handleDrag = (e) => {
    if(e.buttons !== 1) return;
    onMove(x + e.movementX, y + e.movementY);
  };

  return (
    <div 
      onMouseDown={onActivate}
      className={`absolute flex flex-col border-4 ${active ? 'border-red-600 z-50 shadow-[0_0_30px_rgba(206,43,55,0.8)]' : 'border-green-700 z-10'} overflow-hidden transition-none`}
      style={{ 
        left: x, top: y, width: '380px', height: 'auto', minHeight: '200px',
        backgroundColor: active ? '#1a1a1a' : '#0a0a0a'
      }}
    >
      <div 
        onMouseMove={handleDrag}
        className={`flex justify-between items-center px-2 py-1 ${active ? 'bg-gradient-to-r from-green-600 via-white to-red-600' : 'bg-gray-800'} ${active ? 'text-black' : 'text-white'} select-none cursor-move border-b-2 border-white`}
      >
        <span className="font-bold font-mono text-sm flex items-center gap-2 uppercase tracking-widest drop-shadow-md truncate max-w-[250px]">
           {active && "🤌"} {title}
        </span>
        <div className="flex gap-1 shrink-0">
          <button className="p-0.5 hover:bg-white/20 rounded"><Minimize size={12}/></button>
          <button onClick={(e) => { e.stopPropagation(); onClose(); playSound('error'); }} className="p-0.5 hover:bg-red-500 rounded hover:text-white"><X size={12}/></button>
        </div>
      </div>
      <div className="flex-1 bg-black/90 text-green-400 p-3 overflow-auto font-mono text-xs relative border-t-2 border-white/10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]">
        {children}
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  // --- STATE HELL ---
  const [points, setPoints] = useState(1990); // Lire
  const [cps, setCps] = useState(0);
  const [respect, setRespect] = useState(10); 
  const [kneading, setKneading] = useState(0); 
  const [hasAdBlocker, setHasAdBlocker] = useState(false);
  const [sauceRate, setSauceRate] = useState(0); 
  
  // Status
  const [hunger, setHunger] = useState(100); 
  const [logs, setLogs] = useState([]);

  // Chaos Modes
  const [deepFried, setDeepFried] = useState(false);
  const [mafiaMode, setMafiaMode] = useState(false); 
  const [screenCrack, setScreenCrack] = useState(false);
  const [bsod, setBsod] = useState(false);

  // Floating Elements
  const [popups, setPopups] = useState([]);
  const [chat, setChat] = useState([]);
  const [mouseTrail, setMouseTrail] = useState([]);
  const [clippyMsg, setClippyMsg] = useState("Don't forget the cannoli!");
  
  const [windows, setWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState('clicker');
  
  // Init
  useEffect(() => {
    // Force load voices
    window.speechSynthesis.getVoices();
    
    const maxX = window.innerWidth - 400;
    const maxY = window.innerHeight - 300;
    setWindows([
      { id: 'stats', title: 'Family Business (Legit)', x: Math.random() * maxX, y: Math.random() * maxY },
      { id: 'clicker', title: 'Pizza Clicker.exe', x: Math.random() * maxX, y: Math.random() * maxY },
      { id: 'terminal', title: 'Secret Sauce Recipe', x: Math.random() * maxX, y: Math.random() * maxY },
      { id: 'soundboard', title: 'Italian Soundboard 🤌', x: Math.random() * maxX, y: Math.random() * maxY },
      { id: 'knead', title: 'Dough Kneading Simulator', x: Math.random() * maxX, y: Math.random() * maxY }
    ]);
  }, []);

  const reqRef = useRef();
  const popupsRef = useRef(popups);
  popupsRef.current = popups;

  // --- LOGIC: CHAOS LOOPS ---
  const logToCloudWatch = (message) => {
    const timestamp = new Date().toISOString();
    setLogs(prev => [`[${timestamp}] [MAMMA_MIA] ${message}`, ...prev].slice(0, 15));
  };

  // 2. Game Loop (1Hz)
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(p => p + cps + sauceRate);
      setHunger(b => Math.max(0, b - 0.1));
      setKneading(j => Math.max(0, j - 1));

      // Random Ad Spawner
      if (!hasAdBlocker && popupsRef.current.length < 6 && Math.random() > 0.85) {
        const id = Date.now();
        const maxX = window.innerWidth - 300;
        const maxY = window.innerHeight - 200;
        
        const newPopup = {
          id,
          x: Math.random() * maxX,
          y: Math.random() * maxY,
          msg: ADS[Math.floor(Math.random() * ADS.length)],
          color: ['bg-green-600', 'bg-white', 'bg-red-600'][Math.floor(Math.random()*3)]
        };
        
        setPopups(prev => [...prev, newPopup]);
        setChat(c => [...c.slice(-5), {user: "NONNA", msg: "*aggressive hand gestures*", color: "red"}]);
        playSound('boom'); // Plays Vine Boom sound
      }

      if (Math.random() > 0.9) setClippyMsg(PHRASES[Math.floor(Math.random() * PHRASES.length)]);

      if (Math.random() > 0.7) {
        const user = ["Luigi", "Mario", "Wario", "Peppino"][Math.floor(Math.random()*4)];
        setChat(prev => [...prev.slice(-8), { user, msg: PHRASES[Math.floor(Math.random()*PHRASES.length)], color: `hsl(${Math.random()*360}, 100%, 70%)` }]);
      }

    }, 1000);
    return () => clearInterval(interval);
  }, [cps, hasAdBlocker, sauceRate]);

  // --- HANDLERS ---

  const handleGlobalClick = (e) => {
    const id = Date.now();
    setMouseTrail(prev => [...prev, { id, x: e.clientX, y: e.clientY, emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)] }]);
    setTimeout(() => setMouseTrail(prev => prev.filter(p => p.id !== id)), 1000);
    if (Math.random() > 0.995) {
      setScreenCrack(true);
      playSound('boom');
    }
  };

  const updateWindowPos = (id, x, y) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, x, y } : w));
    setActiveWindow(id);
  };

  const spawnAd = () => {
    const id = Date.now();
    setPopups(prev => [...prev, {
      id, x: Math.random() * (window.innerWidth - 300), y: Math.random() * (window.innerHeight - 200), 
      msg: "WARNING: PASTA OVERCOOKED", color: "bg-red-600"
    }]);
    playSound('error');
  };

  const nukeAds = () => {
    setPopups([]);
    setChat(prev => [...prev, {user: "MAFIA", msg: "Problem taken care of. 🔫", color: "green"}]);
    playSound('coin');
  };

  // --- RENDERERS ---

  if (bsod) return (
    <div className="fixed inset-0 bg-red-700 text-white font-mono p-10 z-[99999] cursor-none flex flex-col justify-center items-center text-center">
      <h1 className="text-9xl mb-4">🤌</h1>
      <p className="text-4xl">YOU BROKE THE SPAGHETTI!</p>
      <p className="text-xl mt-8">Error Code: MAMA_MIA_0xPIZZA</p>
      <button onClick={() => setBsod(false)} className="mt-10 border p-4 hover:bg-white hover:text-red-700 font-bold">COOK AGAIN</button>
    </div>
  );

  return (
    <div 
        className="w-screen h-screen overflow-hidden bg-[#050505] text-white select-none font-mono"
        style={{ 
            filter: deepFried ? 'contrast(200%) saturate(400%) sepia(50%)' : 'none',
            cursor: "none" // Custom cursor in CSS
        }}
        onClick={handleGlobalClick}
    >
        {/* GLOBAL FILTERS */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-10"></div>
        {mafiaMode && <div className="fixed inset-0 pointer-events-none z-[9990] bg-black/80 flex items-center justify-center"><h1 className="text-9xl text-white font-serif italic">THE GODFATHER MODE</h1></div>}
        
        {/* MOUSE TRAIL */}
        {mouseTrail.map(m => (
            <div key={m.id} className="fixed pointer-events-none text-4xl animate-bounce" style={{left: m.x, top: m.y, zIndex: 9999}}>
                {m.emoji}
            </div>
        ))}

        {/* SCREEN CRACK */}
        {screenCrack && (
             <div className="fixed inset-0 pointer-events-none z-[9000] bg-no-repeat bg-center bg-cover opacity-60 mix-blend-multiply" 
                 style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/cracked-glass.png')", backgroundColor: 'red'}}>
            </div>
        )}

        {/* CLIPPY -> MARIO HEAD */}
        <div className="fixed bottom-20 right-5 z-[5000] w-48 animate-bounce-slow">
             <div className="bg-white text-black p-2 rounded-lg text-xs mb-2 border-4 border-green-600 shadow-lg font-bold italic">
                {clippyMsg}
             </div>
             <div className="text-6xl text-center">🍄</div>
        </div>

        {/* ACTIVATE WINDOWS -> ACTIVATE PASTA */}
        <div className="activate-windows">
            Activate Pasta<br/>
            <span className="text-sm">Go to Kitchen to activate Pasta.</span>
        </div>

        {/* AD POPUPS */}
        {popups.map(p => (
            <div key={p.id} className={`fixed ${p.color} border-4 border-black shadow-[10px_10px_0px_#000] text-black p-1 w-64 z-[6000]`} style={{left: p.x, top: p.y}}>
                <div className="bg-red-700 text-white text-xs px-1 flex justify-between items-center font-bold">
                    <span>ATTENZIONE!!!</span>
                    <button onClick={(e) => { e.stopPropagation(); setPopups(prev => prev.filter(i => i.id !== p.id))}} className="hover:text-yellow-300">X</button>
                </div>
                <div className="p-4 flex flex-col items-center animate-pulse">
                    <Pizza className="text-yellow-900 w-12 h-12 mb-2 animate-spin-slow" />
                    <p className="font-black text-center text-lg uppercase">{p.msg}</p>
                    <button onClick={(e)=>{e.stopPropagation(); spawnAd()}} className="mt-2 w-full bg-green-600 text-white hover:bg-green-500 font-bold border-b-4 border-green-900 active:border-0 active:translate-y-1">
                        MANGIA!
                    </button>
                </div>
            </div>
        ))}

        {/* TASKBAR */}
        <div className="fixed bottom-0 w-full h-12 bg-[#1a1a1a] border-t-4 border-red-600 flex items-center px-2 z-[8000] gap-2 shadow-[0_-5px_20px_rgba(255,0,0,0.3)]">
            <button 
                onClick={() => setWindows(prev => [...prev, {id: Date.now(), title: 'Pizza Box', x: Math.random()*500, y: Math.random()*500}])}
                className="bg-gradient-to-r from-green-600 via-white to-red-600 px-4 py-2 font-black italic text-black skew-x-[-10deg] hover:scale-105 transition-transform text-xs md:text-sm border-2 border-black"
            >
                START PIZZA
            </button>
            <button onClick={nukeAds} className="bg-black text-white px-3 py-1 font-bold border border-gray-600 flex items-center gap-1 hover:bg-gray-800">
                <Trash2 size={16}/> CLEANER
            </button>
            <div className="flex-1"></div>
            {/* Tray Icons */}
            <div className="flex gap-4 text-xs font-mono text-gray-400 mr-4">
                {hasAdBlocker && <span className="text-green-500 flex items-center gap-1"><ShieldCheck size={14}/> MAFIA PROTECTION</span>}
                <span className="animate-pulse text-red-500 font-bold hidden md:inline">PINEAPPLE: DETECTED</span>
                <span>SAUCE: {points.toFixed(0)}L</span>
            </div>
        </div>

        {/* --- WINDOWS --- */}

        {/* 1. STATS WINDOW */}
        {windows.map(w => w.id === 'stats' && (
            <WindowFrame key={w.id} {...w} active={activeWindow === w.id} onActivate={() => setActiveWindow(w.id)} onMove={(x,y) => updateWindowPos(w.id, x, y)} onClose={() => setWindows(prev => prev.filter(i => i.id !== w.id))}>
                <div className="grid grid-cols-2 gap-2 text-xs text-white">
                    <div className="bg-gray-900 p-2 border border-gray-700">
                        <div className="text-gray-400">Total Lire</div>
                        <div className="text-yellow-400 text-2xl font-black">{points.toFixed(0)} ₤</div>
                    </div>
                    <div className="bg-gray-900 p-2 border border-gray-700">
                        <div className="text-gray-400">Respect</div>
                        <div className="text-purple-400 text-2xl font-black">{respect}</div>
                    </div>
                </div>
                <div className="mt-2 text-xs text-gray-400">
                    <div>Sauce Flow: {sauceRate} L/s</div>
                    <div>Protection: {hasAdBlocker ? "PAID" : "NONE"}</div>
                </div>
            </WindowFrame>
        ))}

        {/* 2. CLICKER GAME */}
        {windows.map(w => w.id === 'clicker' && (
            <WindowFrame key={w.id} {...w} active={activeWindow === w.id} onActivate={() => setActiveWindow(w.id)} onMove={(x,y) => updateWindowPos(w.id, x, y)} onClose={() => setWindows(prev => prev.filter(i => i.id !== w.id))}>
                 <div className="flex flex-col items-center gap-4">
                    <button 
                        onClick={(e) => { e.stopPropagation(); setPoints(p => p + 1); logToCloudWatch("Cooked a Pizza"); playSound('click'); }}
                        className="text-8xl hover:rotate-45 active:scale-90 transition-all cursor-pointer filter drop-shadow-[0_0_15px_rgba(255,200,0,0.5)]"
                    >
                        🍕
                    </button>
                    <div className="grid grid-cols-2 gap-2 w-full">
                        <button onClick={() => {setCps(c => c + 1); playSound('coin');}} className="btn-retro bg-green-800">🤖 Mama's Helper (+1 CPS)</button>
                        <button onClick={() => {
                            if(points >= 500 && !hasAdBlocker) {
                                setPoints(p => p - 500);
                                setHasAdBlocker(true);
                                logToCloudWatch("PAID PROTECTION MONEY");
                                playSound('coin');
                            }
                        }} className={`btn-retro ${hasAdBlocker ? 'bg-gray-600 line-through' : 'bg-blue-800'}`}>
                            🛡️ Pay Protection (500 ₤)
                        </button>
                        <button onClick={() => {
                            if(points >= 200) {
                                setPoints(p => p - 200);
                                setSauceRate(r => r + 5);
                                playSound('coin');
                            }
                        }} className="btn-retro bg-red-800">🍅 Tomato Farm (200 ₤)</button>
                        <button onClick={() => setMafiaMode(!mafiaMode)} className="btn-retro bg-black border-gray-500">🕶️ Mafia Mode</button>
                        <button onClick={() => setDeepFried(!deepFried)} className="col-span-2 btn-retro bg-yellow-700">🍟 DEEP FRY CALZONE</button>
                        <button onClick={() => setBsod(true)} className="col-span-2 bg-red-600 text-white font-bold p-1 border-2 border-white">☠️ BREAK SPAGHETTI</button>
                    </div>
                </div>
            </WindowFrame>
        ))}

        {/* 3. SOUNDBOARD (Visual) */}
        {windows.map(w => w.id === 'soundboard' && (
            <WindowFrame key={w.id} {...w} active={activeWindow === w.id} onActivate={() => setActiveWindow(w.id)} onMove={(x,y) => updateWindowPos(w.id, x, y)} onClose={() => setWindows(prev => prev.filter(i => i.id !== w.id))}>
                <div className="grid grid-cols-2 gap-2">
                    {["MAMMA MIA", "SPAGHET", "GABAGOOL", "WOW", "PIZZA", "OPERA"].map(sound => (
                        <button 
                            key={sound}
                            onClick={() => {
                                setChat(prev => [...prev, {user: "AUDIO", msg: `*plays ${sound}*`, color: "cyan"}]);
                                const id = Date.now();
                                setWindows(win => win.map(wi => ({...wi, x: wi.x + (Math.random()*10-5), y: wi.y + (Math.random()*10-5)})));
                                playSound(sound);
                            }}
                            className="bg-green-800 hover:bg-white hover:text-red-600 p-4 text-[10px] font-bold border border-white active:bg-red-600 active:text-white"
                        >
                            🔊 {sound}
                        </button>
                    ))}
                </div>
            </WindowFrame>
        ))}

        {/* 4. KNEADING TRACKER (formerly Jelq) */}
        {windows.map(w => w.id === 'knead' && (
            <WindowFrame key={w.id} {...w} active={activeWindow === w.id} onActivate={() => setActiveWindow(w.id)} onMove={(x,y) => updateWindowPos(w.id, x, y)} onClose={() => setWindows(prev => prev.filter(i => i.id !== w.id))}>
                <div className="text-center">
                    <h3 className="text-lg font-bold mb-2 text-white">DOUGH KNEADED: {kneading} kg</h3>
                    <div className="w-full bg-gray-800 h-8 border-2 border-white relative overflow-hidden">
                        <div className="h-full bg-white transition-all duration-200" style={{width: `${Math.min(100, kneading)}%`}}></div>
                        <div className="absolute inset-0 flex items-center justify-center font-black text-black mix-blend-screen">
                            {kneading < 50 ? 'NOT ENOUGH FLOUR' : 'PERFECTO!'}
                        </div>
                    </div>
                    <button 
                        onMouseDown={() => { setKneading(j => j + 5); playSound('click'); }}
                        className="mt-4 w-full bg-yellow-100 text-black font-black text-xl py-4 active:scale-95 transition-transform border-4 border-yellow-600"
                    >
                        👊 KNEAD DOUGH
                    </button>
                </div>
            </WindowFrame>
        ))}

        {/* 5. TERMINAL */}
        {windows.map(w => w.id === 'terminal' && (
            <WindowFrame key={w.id} {...w} active={activeWindow === w.id} onActivate={() => setActiveWindow(w.id)} onMove={(x,y) => updateWindowPos(w.id, x, y)} onClose={() => setWindows(prev => prev.filter(i => i.id !== w.id))}>
                <div className="h-full flex flex-col-reverse font-mono text-[10px] text-green-500 overflow-hidden bg-black">
                    {logs.map((l, i) => <div key={i} className="whitespace-nowrap">{l}</div>)}
                </div>
            </WindowFrame>
        ))}

    </div>
  );
}