import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, X, Minimize, Maximize, Battery, Wifi, Volume2, Skull, Ghost, 
  Flame, AlertTriangle, Save, Cpu, Zap, TrendingUp, Music, Bomb, 
  MessageCircle, DollarSign, Eye, Lock
} from 'lucide-react';

/**
 * SKIBIDI OS - ULTIMATE BRAINROT EDITION v9000
 * JETZT MIT 200% MEHR CHAOS UND FARBEN
 */

// --- ASSETS & CONSTANTS ---
const EMOJIS = ['💀', '🗿', '🤡', '🔥', '🚽', '🧢', '💅', '💩', '👻', '👺', '🅱️', '🥶', '💊', '🦎', '🍔', '🍆', '🍑', '🫡', '🤪', '🫠'];
const PHRASES = [
  "GYATT", "Only in Ohio", "L + Ratio", "Skibidi Dop Dop", "Rizz God", "Cringe", 
  "Let him cook", "SHEESH", "Glazing", "Fanum Tax", "Sussy Baka", "No Cap", 
  "Bet", "Slaps", "Emotional Damage", "Grimace Shake", "Mewing Streak", "Looksmaxxing",
  "It's giving...", "Main Character Energy", "NPC Behavior"
];
const ADS = [
  "DOWNLOAD MORE RAM!!!", "HOT SINGLES IN YOUR AREA", "YOU WON AN IPHONE 16", 
  "DELETE SYSTEM32?", "FREE V-BUCKS GENERATOR", "YOUR PC HAS A VIRUS"
];

// --- HELPER COMPONENTS ---

const WindowFrame = ({ title, children, onClose, x, y, z, active, onActivate, onMove }) => {
  // Simple drag logic simulating movement
  const handleDrag = (e) => {
    if(e.buttons !== 1) return;
    onMove(x + e.movementX, y + e.movementY);
  };

  return (
    <div 
      onMouseDown={onActivate}
      className={`absolute flex flex-col border-4 ${active ? 'border-neon-pink z-50 shadow-[0_0_30px_#ff00ff]' : 'border-gray-600 z-10'} overflow-hidden transition-none`}
      style={{ 
        left: x, top: y, width: '380px', height: 'auto', minHeight: '200px',
        backgroundColor: active ? '#0a0a0a' : '#000000'
      }}
    >
      <div 
        onMouseMove={handleDrag}
        className={`flex justify-between items-center px-2 py-1 ${active ? 'bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 animate-gradient-x' : 'bg-gray-700'} text-white select-none cursor-move`}
      >
        <span className="font-bold font-mono text-sm flex items-center gap-2 uppercase tracking-widest drop-shadow-md">
           {title}
        </span>
        <div className="flex gap-1">
          <button className="p-0.5 hover:bg-white/20 rounded"><Minimize size={12}/></button>
          <button onClick={onClose} className="p-0.5 hover:bg-red-500 rounded"><X size={12}/></button>
        </div>
      </div>
      <div className="flex-1 bg-black/95 text-neon-green p-3 overflow-auto font-mono text-xs relative border-t-2 border-white/10">
        {children}
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  // --- STATE HELL ---
  // Economy & Stats
  const [points, setPoints] = useState(69); 
  const [cps, setCps] = useState(0);
  const [rizz, setRizz] = useState(50);
  const [jelqing, setJelqing] = useState(0);
  
  // Status
  const [battery, setBattery] = useState(100);
  const [brainrotLevel, setBrainrotLevel] = useState(1);
  const [logs, setLogs] = useState([]);

  // Chaos Modes
  const [isOhio, setIsOhio] = useState(false);
  const [deepFried, setDeepFried] = useState(false);
  const [goonMode, setGoonMode] = useState(false); // Red light filter
  const [screenCrack, setScreenCrack] = useState(false);
  const [bsod, setBsod] = useState(false);
  const [rainbowMode, setRainbowMode] = useState(true);

  // Floating Elements
  const [popups, setPopups] = useState([]);
  const [chat, setChat] = useState([]);
  const [mouseTrail, setMouseTrail] = useState([]);
  const [clippyMsg, setClippyMsg] = useState("It looks like you're trying to contain the cringe.");
  
  // Windows State (Now spread out!)
  const [windows, setWindows] = useState([
    { id: 'stats', title: 'Task Manager (Lying)', x: 50, y: 50 },
    { id: 'clicker', title: 'Skibidi Clicker.exe', x: 500, y: 100 },
    { id: 'terminal', title: 'AWS CloudWatch (Leaking)', x: 50, y: 450 },
    { id: 'soundboard', title: 'Vine Boom Soundboard', x: 900, y: 50 },
    { id: 'jelq', title: 'Jelqing Tracker Pro', x: 500, y: 500 }
  ]);
  const [activeWindow, setActiveWindow] = useState('clicker');

  // Minigame States
  const [subwayPos, setSubwayPos] = useState(50);
  const [petHunger, setPetHunger] = useState(69);

  // Refs
  const reqRef = useRef();

  // --- LOGIC: CHAOS LOOPS ---
  const logToCloudWatch = (message) => {
    const timestamp = new Date().toISOString();
    setLogs(prev => [`[${timestamp}] [CRITICAL_FAIL] ${message}`, ...prev].slice(0, 15));
  };

  // 1. Physics & Fast Loop (60FPS)
  useEffect(() => {
    const loop = () => {
      // Mouse trail cleanup handled in render logic mostly, strictly visual here
      if (Math.random() > 0.98) setSubwayPos(p => Math.max(10, Math.min(90, p + (Math.random() * 20 - 10))));
      reqRef.current = requestAnimationFrame(loop);
    };
    reqRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(reqRef.current);
  }, []);

  // 2. Game Loop (1Hz)
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(p => p + cps);
      setBattery(b => Math.max(0, b - 0.05));
      setPetHunger(h => Math.max(0, h - 2));
      setJelqing(j => Math.max(0, j - 1));

      // Random Ad Spawner
      if (Math.random() > 0.9) {
        const id = Date.now();
        const newPopup = {
          id,
          x: Math.random() * (window.innerWidth - 300),
          y: Math.random() * (window.innerHeight - 200),
          msg: ADS[Math.floor(Math.random() * ADS.length)],
          color: ['bg-red-500', 'bg-blue-500', 'bg-yellow-500'][Math.floor(Math.random()*3)]
        };
        setPopups(prev => [...prev, newPopup]);
        // Sound effect visual
        setChat(c => [...c.slice(-5), {user: "SYSTEM", msg: "*VINE BOOM*", color: "red"}]);
      }

      // Clippy Talks
      if (Math.random() > 0.8) {
        setClippyMsg(PHRASES[Math.floor(Math.random() * PHRASES.length)]);
      }

      // Chat spam
      const user = ["xQc", "KaiCenat", "Speed", "Skibidi"][Math.floor(Math.random()*4)];
      setChat(prev => [...prev.slice(-8), { user, msg: PHRASES[Math.floor(Math.random()*PHRASES.length)], color: `hsl(${Math.random()*360}, 100%, 70%)` }]);

    }, 1000);
    return () => clearInterval(interval);
  }, [cps]);

  // --- HANDLERS ---

  const handleGlobalClick = (e) => {
    const id = Date.now();
    setMouseTrail(prev => [...prev, { id, x: e.clientX, y: e.clientY, emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)] }]);
    setTimeout(() => setMouseTrail(prev => prev.filter(p => p.id !== id)), 1000);
    
    // Crack screen sometimes
    if (Math.random() > 0.99) setScreenCrack(true);
  };

  const updateWindowPos = (id, x, y) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, x, y } : w));
    setActiveWindow(id);
  };

  const spawnAd = () => {
    const id = Date.now();
    setPopups(prev => [...prev, {
      id, x: Math.random() * 500, y: Math.random() * 500, 
      msg: "URGENT: UPDATE JAVA NOW", color: "bg-red-600"
    }]);
  };

  // --- RENDERERS ---

  if (bsod) return (
    <div className="fixed inset-0 bg-blue-700 text-white font-mono p-10 z-[99999] cursor-none flex flex-col justify-center items-center text-center">
      <h1 className="text-9xl mb-4">:(</h1>
      <p className="text-4xl">BRAIN ROT LEVEL CRITICAL</p>
      <p className="text-xl mt-8">Error Code: SKIBIDI_OVERLOAD_0x69420</p>
      <button onClick={() => setBsod(false)} className="mt-10 border p-4 hover:bg-white hover:text-blue-700">REBOOT (IF YOU DARE)</button>
    </div>
  );

  return (
    <div 
        className={`w-screen h-screen overflow-hidden bg-[#050505] text-white select-none font-mono ${rainbowMode ? 'animate-hue-rotate' : ''}`}
        style={{ 
            filter: deepFried ? 'contrast(200%) saturate(400%)' : 'none',
            cursor: "crosshair"
        }}
        onClick={handleGlobalClick}
    >
        {/* GLOBAL FILTERS */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-10"></div>
        {goonMode && <div className="fixed inset-0 pointer-events-none z-[9990] bg-red-900 mix-blend-multiply opacity-80"></div>}
        
        {/* MOUSE TRAIL */}
        {mouseTrail.map(m => (
            <div key={m.id} className="fixed pointer-events-none text-4xl animate-bounce" style={{left: m.x, top: m.y, zIndex: 9999}}>
                {m.emoji}
            </div>
        ))}

        {/* SCREEN CRACK */}
        {screenCrack && (
            <div className="fixed inset-0 pointer-events-none z-[9000] bg-no-repeat bg-center bg-cover opacity-80" 
                 style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/cracked-glass.png')"}}>
            </div>
        )}

        {/* CLIPPY / ASSISTANT */}
        <div className="fixed bottom-20 right-5 z-[5000] w-40 animate-bounce-slow">
             <div className="bg-yellow-200 text-black p-2 rounded-lg text-xs mb-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {clippyMsg}
             </div>
             <img src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Clippy.png/170px-Clippy.png" alt="Clippy" className="w-20 mx-auto" />
        </div>

        {/* AD POPUPS */}
        {popups.map(p => (
            <div key={p.id} className={`fixed ${p.color || 'bg-gray-200'} border-4 border-white shadow-[10px_10px_0px_#000] text-black p-1 w-64 z-[6000]`} style={{left: p.x, top: p.y}}>
                <div className="bg-blue-800 text-white text-xs px-1 flex justify-between items-center font-bold">
                    <span>WINNER!!!</span>
                    <button onClick={(e) => { e.stopPropagation(); setPopups(prev => prev.filter(i => i.id !== p.id))}}>X</button>
                </div>
                <div className="p-4 flex flex-col items-center animate-pulse">
                    <AlertTriangle className="text-yellow-300 w-12 h-12 mb-2" />
                    <p className="font-black text-center text-lg">{p.msg}</p>
                    <button onClick={(e)=>{e.stopPropagation(); spawnAd()}} className="mt-2 w-full bg-green-500 hover:bg-green-400 font-bold border-b-4 border-green-800 active:border-0 active:translate-y-1">
                        CLAIM NOW
                    </button>
                </div>
            </div>
        ))}

        {/* TASKBAR */}
        <div className="fixed bottom-0 w-full h-12 bg-[#1a1a1a] border-t-4 border-neon-blue flex items-center px-2 z-[8000] gap-2 shadow-[0_-5px_20px_rgba(0,0,255,0.3)]">
            <button 
                onClick={() => setWindows(prev => [...prev, {id: Date.now(), title: 'New Folder', x: Math.random()*500, y: Math.random()*500}])}
                className="bg-gradient-to-r from-green-400 to-blue-500 px-6 py-2 font-black italic text-black skew-x-[-10deg] hover:scale-105 transition-transform"
            >
                START BRAINROT
            </button>
            <div className="flex-1"></div>
            {/* Tray Icons */}
            <div className="flex gap-4 text-xs font-mono text-gray-400 mr-4">
                <span className="animate-pulse text-red-500 font-bold">VIRUS: DETECTED</span>
                <span>CPU: 420%</span>
                <span>RAM: DOWNLOADED</span>
            </div>
        </div>

        {/* --- WINDOWS --- */}

        {/* 1. STATS WINDOW */}
        {windows.map(w => w.id === 'stats' && (
            <WindowFrame key={w.id} {...w} active={activeWindow === w.id} onActivate={() => setActiveWindow(w.id)} onMove={(x,y) => updateWindowPos(w.id, x, y)} onClose={() => setWindows(prev => prev.filter(i => i.id !== w.id))}>
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-gray-900 p-2 border border-gray-700">
                        <div className="text-gray-500">Social Credit</div>
                        <div className="text-neon-green text-2xl font-black">{points.toFixed(0)}</div>
                    </div>
                    <div className="bg-gray-900 p-2 border border-gray-700">
                        <div className="text-gray-500">Rizz Level</div>
                        <div className="text-neon-pink text-2xl font-black">{rizz}</div>
                    </div>
                </div>
                <div className="mt-2 border border-red-500 p-1 bg-red-900/20">
                    <div className="flex justify-between text-xs text-red-400">
                        <span>ATTENTION SPAN</span>
                        <span>{battery.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-red-900 h-2 mt-1">
                        <div className="bg-red-500 h-full animate-pulse" style={{width: `${battery}%`}}></div>
                    </div>
                </div>
            </WindowFrame>
        ))}

        {/* 2. CLICKER GAME */}
        {windows.map(w => w.id === 'clicker' && (
            <WindowFrame key={w.id} {...w} active={activeWindow === w.id} onActivate={() => setActiveWindow(w.id)} onMove={(x,y) => updateWindowPos(w.id, x, y)} onClose={() => setWindows(prev => prev.filter(i => i.id !== w.id))}>
                 <div className="flex flex-col items-center gap-4">
                    <button 
                        onClick={(e) => { e.stopPropagation(); setPoints(p => p + 1); logToCloudWatch("Toilet Clicked"); }}
                        className="text-8xl hover:rotate-12 active:scale-90 transition-all cursor-pointer filter drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    >
                        🚽
                    </button>
                    <div className="grid grid-cols-2 gap-2 w-full">
                        <button onClick={() => setCps(c => c + 1)} className="btn-retro bg-blue-900">🤖 Bot Farm (+1 CPS)</button>
                        <button onClick={() => setRizz(r => r + 10)} className="btn-retro bg-purple-900">🧢 Buy Rizz (+10)</button>
                        <button onClick={() => setPoints(p => p - Math.floor(p * 0.2))} className="btn-retro bg-green-900">🍔 Fanum Tax (-20%)</button>
                        <button onClick={() => setGoonMode(!goonMode)} className="btn-retro bg-red-900">👹 Goon Mode</button>
                        <button onClick={() => {setDeepFried(!deepFried); setRainbowMode(!rainbowMode)}} className="col-span-2 btn-retro bg-yellow-700">🍟 DEEP FRY EVERYTHING</button>
                        <button onClick={() => setBsod(true)} className="col-span-2 bg-blue-600 text-white font-bold p-1 border-2 border-white">☠️ DELETE SYSTEM32</button>
                    </div>
                </div>
            </WindowFrame>
        ))}

        {/* 3. SOUNDBOARD (Visual) */}
        {windows.map(w => w.id === 'soundboard' && (
            <WindowFrame key={w.id} {...w} active={activeWindow === w.id} onActivate={() => setActiveWindow(w.id)} onMove={(x,y) => updateWindowPos(w.id, x, y)} onClose={() => setWindows(prev => prev.filter(i => i.id !== w.id))}>
                <div className="grid grid-cols-3 gap-2">
                    {["BOOM", "BRUH", "OMG", "YIPPEE", "WHAT", "METAL PIPE"].map(sound => (
                        <button 
                            key={sound}
                            onClick={() => {
                                setChat(prev => [...prev, {user: "AUDIO", msg: `*plays ${sound}*`, color: "cyan"}]);
                                // Simulate audio vibration
                                const id = Date.now();
                                setWindows(win => win.map(wi => ({...wi, x: wi.x + (Math.random()*10-5), y: wi.y + (Math.random()*10-5)})));
                            }}
                            className="bg-gray-800 hover:bg-neon-pink hover:text-black p-4 text-[10px] font-bold border border-gray-600 active:bg-white"
                        >
                            🔊 {sound}
                        </button>
                    ))}
                </div>
            </WindowFrame>
        ))}

        {/* 4. JELQING TRACKER */}
        {windows.map(w => w.id === 'jelq' && (
            <WindowFrame key={w.id} {...w} active={activeWindow === w.id} onActivate={() => setActiveWindow(w.id)} onMove={(x,y) => updateWindowPos(w.id, x, y)} onClose={() => setWindows(prev => prev.filter(i => i.id !== w.id))}>
                <div className="text-center">
                    <h3 className="text-lg font-bold mb-2">JELQ STREAK: {jelqing} 🔥</h3>
                    <div className="w-full bg-gray-800 h-8 border-2 border-white relative overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-200" style={{width: `${Math.min(100, jelqing)}%`}}></div>
                        <div className="absolute inset-0 flex items-center justify-center font-black mix-blend-difference">
                            {jelqing < 50 ? 'WEAK AURA' : 'SIGMA GRINDSET'}
                        </div>
                    </div>
                    <button 
                        onMouseDown={() => setJelqing(j => j + 5)}
                        className="mt-4 w-full bg-white text-black font-black text-xl py-4 active:scale-95 transition-transform"
                    >
                        MOG NOW
                    </button>
                </div>
            </WindowFrame>
        ))}

        {/* 5. TERMINAL */}
        {windows.map(w => w.id === 'terminal' && (
            <WindowFrame key={w.id} {...w} active={activeWindow === w.id} onActivate={() => setActiveWindow(w.id)} onMove={(x,y) => updateWindowPos(w.id, x, y)} onClose={() => setWindows(prev => prev.filter(i => i.id !== w.id))}>
                <div className="h-full flex flex-col-reverse font-mono text-[10px] text-green-500 overflow-hidden">
                    {logs.map((l, i) => <div key={i} className="whitespace-nowrap">{l}</div>)}
                </div>
            </WindowFrame>
        ))}

    </div>
  );
}