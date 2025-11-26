import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Terminal, X, Minimize, Maximize, Battery, Wifi, Volume2, Skull, Ghost, Flame, AlertTriangle, Save, Cpu, Zap, TrendingUp, Music } from 'lucide-react';

/**
 * SKIBIDI OS - ULTIMATE BRAINROT EDITION v69.420
 * * Features:
 * - Reactive State Hell
 * - Manual Physics Engine
 * - Fake AWS Logging
 * - Crypto/Stock/Rizz Economy
 * - Subway Surfers & Flappy Bird Clones
 * - Meme Generator
 */

// --- ASSETS & CONSTANTS ---
const EMOJIS = ['💀', '🗿', '🤡', '🔥', '🚽', '🧢', '💅', '💩', '👻', '👺', '🅱️', '🥶', '💊', '🦎', '🍔', '🍆', '🍑', '🫡'];
const PHRASES = [
  "GYATT", "Only in Ohio", "L + Ratio", "Skibidi Dop Dop", "Rizz God", "Cringe", 
  "Let him cook", "SHEESH", "Glazing", "Fanum Tax", "Sussy Baka", "No Cap", 
  "Bet", "Slaps", "Emotional Damage", "Grimace Shake", "Mewing Streak", "Looksmaxxing"
];
const NOTIFS = [
  "Discord Ping!", "Mom calling...", "Low Battery", "Virus Detected", "Free V-Bucks", 
  "IRS Audit", "Hot Singles nearby", "System32 Corrupted", " FBI Open Up", "Credit Score -9999"
];
const STOCKS = ["GME", "DOGE", "RIZZ", "SKBD", "OHIO", "NVDA", "TSLA"];
const CHAT_USERS = ["xQc", "IShowSpeed", "KaiCenat", "AndrewTate_TopG", "SkibidiToilet", "NPC_291", "ElonMusk"];

// --- HELPER COMPONENTS ---

const GlitchText = ({ text, intensity = 1 }) => {
  return (
    <span className="relative inline-block hover:animate-pulse font-bold" style={{
      textShadow: `${Math.random()*2}px ${Math.random()*2}px ${Math.random()*5}px lime`
    }}>
      {text}
    </span>
  );
};

const WindowFrame = ({ title, children, onClose, x, y, z, active, onActivate }) => {
  return (
    <div 
      onMouseDown={onActivate}
      className={`absolute flex flex-col bg-gray-900 border-2 ${active ? 'border-blue-500 z-50' : 'border-gray-600 z-0'} shadow-[10px_10px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden transition-transform`}
      style={{ left: x, top: y, width: '350px', height: 'auto', minHeight: '200px' }}
    >
      <div className={`flex justify-between items-center px-2 py-1 ${active ? 'bg-blue-700' : 'bg-gray-700'} text-white select-none cursor-move`}>
        <span className="font-bold font-mono text-sm flex items-center gap-2">
           {title}
        </span>
        <div className="flex gap-1">
          <button className="p-0.5 hover:bg-gray-500 rounded"><Minimize size={12}/></button>
          <button className="p-0.5 hover:bg-gray-500 rounded"><Maximize size={12}/></button>
          <button onClick={onClose} className="p-0.5 hover:bg-red-500 rounded"><X size={12}/></button>
        </div>
      </div>
      <div className="flex-1 bg-black/90 text-green-400 p-2 overflow-auto font-mono text-xs relative">
        {children}
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  // --- STATE HELL ---
  // Core
  const [points, setPoints] = useState(0); // Social Credit
  const [cps, setCps] = useState(0);
  const [clickMult, setClickMult] = useState(1);
  const [vBucks, setVBucks] = useState(100);
  const [rizz, setRizz] = useState(50);
  
  // Status
  const [battery, setBattery] = useState(100);
  const [attention, setAttention] = useState(100);
  const [brainrotLevel, setBrainrotLevel] = useState(1);
  const [logs, setLogs] = useState([]); // CloudWatch Logs

  // Modes
  const [isOhio, setIsOhio] = useState(false);
  const [deepFried, setDeepFried] = useState(false);
  const [fbiRaid, setFbiRaid] = useState(false);
  const [screenCrack, setScreenCrack] = useState(false);
  const [bsod, setBsod] = useState(false);

  // Minigame States
  const [subwayPos, setSubwayPos] = useState(50);
  const [birdY, setBirdY] = useState(50);
  const [birdVel, setBirdVel] = useState(0);
  const [pipeX, setPipeX] = useState(100);
  const [petHunger, setPetHunger] = useState(100);
  
  // Chaos Elements
  const [popups, setPopups] = useState([]);
  const [chat, setChat] = useState([]);
  const [mouseTrail, setMouseTrail] = useState([]);
  const [dvd, setDvd] = useState({x: 100, y: 100, dx: 2, dy: 2, color: 'red'});
  const [windows, setWindows] = useState([
    { id: 'stats', title: 'Task Manager (Not Responding)', x: 20, y: 50 },
    { id: 'clicker', title: 'Skibidi Clicker.exe', x: 400, y: 80 },
    { id: 'terminal', title: 'AWS CloudWatch Agent', x: 20, y: 400 }
  ]);
  const [activeWindow, setActiveWindow] = useState('clicker');

  // Refs for loop management
  const reqRef = useRef();
  const audioRef = useRef(null); // Fake audio ref

  // --- LOGGING ---
  const logToCloudWatch = (message) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [AWS-us-east-1] [INFO] ${message}`;
    setLogs(prev => [logEntry, ...prev].slice(0, 20));
  };

  // --- PHYSICS LOOP (60FPS) ---
  useEffect(() => {
    const loop = () => {
      // DVD Logo
      setDvd(p => {
        let nx = p.x + p.dx;
        let ny = p.y + p.dy;
        let ndx = p.dx;
        let ndy = p.dy;
        let nCol = p.color;
        
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

        if (nx <= 0 || nx >= window.innerWidth - 80) {
          ndx *= -1;
          nCol = colors[Math.floor(Math.random() * colors.length)];
        }
        if (ny <= 0 || ny >= window.innerHeight - 40) {
          ndy *= -1;
          nCol = colors[Math.floor(Math.random() * colors.length)];
        }
        return { x: nx, y: ny, dx: ndx, dy: ndy, color: nCol };
      });

      // Flappy Bird Gravity
      setBirdY(y => Math.min(100, Math.max(0, y + birdVel)));
      setBirdVel(v => v + 0.05);
      setPipeX(x => (x < -20 ? 100 : x - 0.5));

      // Subway Surfers (Visual jitter)
      if (Math.random() > 0.95) {
        setSubwayPos(p => Math.max(0, Math.min(100, p + (Math.random() * 10 - 5))));
      }

      reqRef.current = requestAnimationFrame(loop);
    };
    reqRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(reqRef.current);
  }, [birdVel]);

  // --- SECOND LOOP (1Hz) ---
  useEffect(() => {
    const interval = setInterval(() => {
      // Economy
      setPoints(p => p + cps);
      setBattery(b => Math.max(0, b - 0.1));
      setAttention(a => Math.max(0, a - 2));
      setPetHunger(h => Math.max(0, h - 1));

      // Random Chaos
      if (Math.random() > 0.92) {
        setFbiRaid(true);
        setTimeout(() => setFbiRaid(false), 1500);
        logToCloudWatch("Suspicious activity detected. Alerting authorities.");
      }

      if (Math.random() > 0.8) {
        const newPopup = {
          id: Date.now(),
          x: Math.random() * (window.innerWidth - 200),
          y: Math.random() * (window.innerHeight - 100),
          msg: NOTIFS[Math.floor(Math.random() * NOTIFS.length)]
        };
        setPopups(prev => [...prev, newPopup]);
        // Auto close popup after 5s
        setTimeout(() => {
           setPopups(prev => prev.filter(p => p.id !== newPopup.id));
        }, 5000);
      }

      // Chat Gen
      const user = CHAT_USERS[Math.floor(Math.random() * CHAT_USERS.length)];
      const msg = PHRASES[Math.floor(Math.random() * PHRASES.length)];
      setChat(prev => [...prev.slice(-8), { user, msg, color: `hsl(${Math.random()*360}, 100%, 50%)` }]);

      // Random logs
      if (Math.random() > 0.5) {
        logToCloudWatch(`Process ${Math.floor(Math.random() * 9999)} garbage collection failed.`);
      }

    }, 1000);
    return () => clearInterval(interval);
  }, [cps]);

  // --- HANDLERS ---

  const handleGlobalClick = (e) => {
    // Mouse Trail
    const id = Date.now();
    const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    setMouseTrail(prev => [...prev, { id, x: e.clientX, y: e.clientY, emoji }]);
    setTimeout(() => setMouseTrail(prev => prev.filter(p => p.id !== id)), 800);

    // Gameplay
    setPoints(p => p + (1 * clickMult));
    setAttention(a => Math.min(100, a + 5));
    
    // Screen Crack Chance
    if (Math.random() > 0.995 && !screenCrack) {
        setScreenCrack(true);
        logToCloudWatch("HARDWARE FAILURE DETECTED: SCREEN_MATRIX_BREAK");
    }
  };

  const buyUpgrade = (type) => {
    if (type === 'cps' && points >= 100) {
      setPoints(p => p - 100);
      setCps(c => c + 1);
      logToCloudWatch("Transaction: Purchased Auto-Clicker");
    }
    if (type === 'rizz' && points >= 500) {
        setPoints(p => p - 500);
        setRizz(r => Math.min(100, r + 10));
        logToCloudWatch("User Rizz Level increased.");
    }
    if (type === 'ohio' && points >= 1000) {
        setPoints(p => p - 1000);
        setIsOhio(!isOhio);
        logToCloudWatch("WARN: REALITY SHIFT INITIATED (OHIO)");
    }
    if (type === 'bsod') {
        setBsod(true);
        setTimeout(() => setBsod(false), 3000);
    }
  };

  const moveWindow = (id, dx, dy) => {
    // Very basic drag implementation placeholder
    // In a real expanded version, we'd use proper drag events
    // For now, let's just randomize window position on click to annoy user
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, x: Math.max(0, Math.random()*(window.innerWidth-400)), y: Math.max(0, Math.random()*(window.innerHeight-300)) } : w
    ));
    setActiveWindow(id);
  };

  // --- RENDERERS ---

  if (bsod) return (
    <div className="fixed inset-0 bg-blue-700 text-white font-mono p-20 z-[99999] cursor-none flex flex-col justify-center items-start">
      <h1 className="text-9xl mb-10">:(</h1>
      <p className="text-3xl mb-4">Your PC ran into a problem and needs to restart.</p>
      <p className="text-xl">Just kidding, you just got brainrotted.</p>
      <p className="text-xl mt-10">Stop Code: SKIBIDI_TOILET_OVERFLOW</p>
      <div className="mt-10 animate-pulse">Rebooting in {Math.random().toFixed(2)}s...</div>
    </div>
  );

  return (
    <div 
        className={`w-screen h-screen overflow-hidden bg-slate-900 text-white select-none ${isOhio ? 'font-serif' : 'font-sans'}`}
        style={{ 
            filter: deepFried ? 'contrast(200%) saturate(400%) hue-rotate(90deg)' : 'none',
            cursor: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 24 24\"><text y=\"20\" font-size=\"20\">🖕</text></svg>'), auto"
        }}
        onClick={handleGlobalClick}
    >
        {/* GLOBAL OVERLAYS */}
        <div className="fixed inset-0 pointer-events-none z-50 bg-scanlines opacity-20"></div>
        
        {/* DVD LOGO */}
        <div 
            className="fixed font-black text-2xl z-0 pointer-events-none"
            style={{ left: dvd.x, top: dvd.y, color: dvd.color }}
        >
            DVD
        </div>

        {/* ACTIVATE WINDOWS */}
        <div className="fixed bottom-10 right-10 text-gray-500/50 z-[9000] pointer-events-none text-2xl font-sans">
            Activate Windows<br/>
            <span className="text-sm">Go to Settings to activate Windows.</span>
        </div>

        {/* SCREEN CRACK */}
        {screenCrack && (
            <div className="fixed inset-0 pointer-events-none z-[9990] bg-no-repeat bg-center bg-cover opacity-60" 
                 style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/cracked-glass.png')"}}>
            </div>
        )}

        {/* FBI RAID */}
        {fbiRaid && (
            <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-red-600/50 animate-pulse">
                <h1 className="text-9xl font-black text-white outline-4 outline-black drop-shadow-2xl">FBI OPEN UP</h1>
            </div>
        )}

        {/* MOUSE TRAIL */}
        {mouseTrail.map(m => (
            <div key={m.id} className="fixed pointer-events-none text-4xl animate-ping" style={{left: m.x, top: m.y}}>
                {m.emoji}
            </div>
        ))}

        {/* POPUPS */}
        {popups.map(p => (
            <div key={p.id} className="fixed bg-gray-200 border-2 border-white shadow-xl text-black p-1 w-64 z-[2000]" style={{left: p.x, top: p.y}}>
                <div className="bg-blue-800 text-white text-xs px-1 flex justify-between items-center">
                    <span>Message</span>
                    <button onClick={(e) => { e.stopPropagation(); setPopups(prev => prev.filter(i => i.id !== p.id))}}>X</button>
                </div>
                <div className="p-4 flex flex-col items-center">
                    <AlertTriangle className="text-yellow-500 mb-2" />
                    <p className="font-bold text-center">{p.msg}</p>
                    <button className="mt-2 border border-black px-2 shadow bg-gray-300 active:bg-gray-400 text-xs">OK</button>
                </div>
            </div>
        ))}

        {/* TASKBAR */}
        <div className="fixed bottom-0 w-full h-10 bg-gray-800 border-t-2 border-gray-600 flex items-center px-2 z-[5000] gap-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1 font-bold italic text-white rounded skew-x-[-10deg]">Start</div>
            <div className="flex-1"></div>
            <div className="flex items-center gap-4 text-xs font-mono text-gray-300">
                <div className="flex items-center gap-1"><Wifi size={14} className={Math.random() > 0.5 ? 'text-red-500' : 'text-green-500'}/> Connected (5G CAUSES VIRUS)</div>
                <div className="flex items-center gap-1"><Volume2 size={14}/> 100%</div>
                <div className="flex items-center gap-1"><Battery size={14}/> {battery.toFixed(0)}%</div>
                <div>{new Date().toLocaleTimeString()}</div>
            </div>
        </div>

        {/* WINDOW: STATS / ECONOMY */}
        {windows.map(w => w.id === 'stats' && (
            <WindowFrame 
                key={w.id} 
                {...w} 
                active={activeWindow === w.id} 
                onActivate={() => setActiveWindow(w.id)}
                onClose={() => setWindows(prev => prev.filter(i => i.id !== w.id))}
            >
                <div className="space-y-2">
                    <h2 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500 animate-pulse">
                        USER: SKIBIDI_PRIME
                    </h2>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-gray-800 p-1 border border-gray-600">
                            <div className="text-gray-400">Social Credit</div>
                            <div className="text-yellow-400 text-lg font-mono">{points.toFixed(0)}</div>
                        </div>
                        <div className="bg-gray-800 p-1 border border-gray-600">
                            <div className="text-gray-400">Rizz Level</div>
                            <div className="text-purple-400 text-lg font-mono">{rizz}%</div>
                        </div>
                        <div className="bg-gray-800 p-1 border border-gray-600">
                            <div className="text-gray-400">V-Bucks</div>
                            <div className="text-blue-400 text-lg font-mono">{vBucks}</div>
                        </div>
                        <div className="bg-gray-800 p-1 border border-gray-600">
                            <div className="text-gray-400">Brainrot Lvl</div>
                            <div className="text-red-400 text-lg font-mono">{brainrotLevel}</div>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-700 pt-2">
                        <div className="text-xs mb-1">Attention Span:</div>
                        <div className="w-full bg-red-900 h-4 border border-red-500 relative">
                            <div className="absolute top-0 left-0 h-full bg-red-500 transition-all duration-300" style={{width: `${attention}%`}}></div>
                            <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-bold">{attention}%</div>
                        </div>
                    </div>

                    <div className="mt-2 text-xs font-mono text-green-500">
                        &gt; Mining Bitcoin... {(Math.random()).toFixed(8)} BTC/s<br/>
                        &gt; Leaking IP to China... Done.<br/>
                        &gt; Downloading RAM... 128GB
                    </div>
                </div>
            </WindowFrame>
        ))}

        {/* WINDOW: CLICKER GAME */}
        {windows.map(w => w.id === 'clicker' && (
            <WindowFrame 
                key={w.id} 
                {...w} 
                active={activeWindow === w.id} 
                onActivate={() => setActiveWindow(w.id)}
                onClose={() => setWindows(prev => prev.filter(i => i.id !== w.id))}
            >
                <div className="flex flex-col items-center gap-4">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleGlobalClick(e);
                            // Bounce effect handled by CSS active state
                        }}
                        className="text-8xl hover:scale-110 active:scale-90 transition-transform cursor-pointer filter drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]"
                    >
                        🚽
                    </button>
                    
                    <div className="w-full grid grid-cols-2 gap-2">
                        <button onClick={(e) => {e.stopPropagation(); buyUpgrade('cps')}} className="bg-gray-800 hover:bg-gray-700 p-2 text-xs border border-green-500 text-green-400">
                            <div>🤖 Auto-Clicker</div>
                            <div>Cost: 100 SC</div>
                        </button>
                         <button onClick={(e) => {e.stopPropagation(); buyUpgrade('rizz')}} className="bg-gray-800 hover:bg-gray-700 p-2 text-xs border border-purple-500 text-purple-400">
                            <div>🧢 Buy Rizz</div>
                            <div>Cost: 500 SC</div>
                        </button>
                        <button onClick={(e) => {e.stopPropagation(); buyUpgrade('ohio')}} className="bg-gray-800 hover:bg-gray-700 p-2 text-xs border border-red-500 text-red-400">
                            <div>🗺️ Ohio Mode</div>
                            <div>Cost: 1000 SC</div>
                        </button>
                        <button onClick={(e) => {e.stopPropagation(); setDeepFried(!deepFried)}} className="bg-gray-800 hover:bg-gray-700 p-2 text-xs border border-yellow-500 text-yellow-400">
                            <div>🍟 Deep Fry</div>
                            <div>Toggle</div>
                        </button>
                         <button onClick={(e) => {e.stopPropagation(); buyUpgrade('bsod')}} className="col-span-2 bg-blue-800 hover:bg-blue-700 p-2 text-xs border border-white text-white">
                            <div>💻 Delete System32</div>
                            <div>(DO NOT CLICK)</div>
                        </button>
                    </div>

                    {/* MINIGAMES EMBEDDED */}
                    <div className="w-full mt-2 border-t border-gray-600 pt-2">
                        <div className="text-center font-bold mb-1">BRAINROT SURFERS</div>
                        <div className="h-24 bg-gray-700 relative overflow-hidden rounded border border-gray-500">
                            <div className="absolute bottom-0 w-full h-1/2 bg-gray-600 transform perspective-100 rotate-x-12"></div>
                            {/* Player */}
                            <div className="absolute bottom-2 transition-all duration-100 text-2xl" style={{left: `${subwayPos}%`}}>🛹</div>
                            {/* Random Obstacle */}
                            <div className="absolute bottom-2 text-2xl animate-pulse" style={{left: `${(Date.now() / 10) % 100}%`}}>🚧</div>
                            <div className="absolute top-1 right-1 text-[10px] text-white">Score: {Math.floor(Date.now()/1000)}</div>
                        </div>
                        <div className="flex justify-center gap-2 mt-1">
                             <button className="bg-gray-600 px-2 text-xs" onClick={(e)=>{e.stopPropagation(); setSubwayPos(20)}}>Left</button>
                             <button className="bg-gray-600 px-2 text-xs" onClick={(e)=>{e.stopPropagation(); setSubwayPos(80)}}>Right</button>
                        </div>
                    </div>
                </div>
            </WindowFrame>
        ))}

        {/* WINDOW: TERMINAL (AWS LOGS) */}
        {windows.map(w => w.id === 'terminal' && (
             <WindowFrame 
                key={w.id} 
                {...w} 
                active={activeWindow === w.id} 
                onActivate={() => setActiveWindow(w.id)}
                onClose={() => setWindows(prev => prev.filter(i => i.id !== w.id))}
            >
                <div className="font-mono text-[10px] text-green-500 whitespace-pre-wrap h-full flex flex-col-reverse">
                    {logs.map((log, i) => (
                        <div key={i} className="hover:bg-gray-800">{log}</div>
                    ))}
                    <div className="text-gray-500 border-b border-gray-700 mb-2">Connected to AWS CloudWatch [eu-central-1]...</div>
                </div>
            </WindowFrame>
        ))}

        {/* WIDGET: CHAT STREAM */}
        <div className="fixed top-20 right-5 w-64 h-96 bg-black/50 border border-purple-500 backdrop-blur-sm z-30 flex flex-col p-2">
            <div className="text-purple-400 font-bold border-b border-purple-500 mb-2 flex justify-between">
                <span>LIVESTREAM CHAT</span>
                <span className="text-red-500 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span> LIVE</span>
            </div>
            <div className="flex-1 overflow-hidden flex flex-col justify-end text-xs shadow-inner">
                {chat.map((c, i) => (
                    <div key={i} className="mb-1 animate-fade-in-up">
                        <span style={{color: c.color}} className="font-bold">{c.user}: </span>
                        <span className="text-white">{c.msg}</span>
                    </div>
                ))}
            </div>
             <div className="mt-2 flex">
                <input type="text" placeholder="Send message..." className="bg-gray-800 text-white text-xs p-1 flex-1 outline-none"/>
                <button className="bg-purple-600 text-white px-2 text-xs">Send</button>
            </div>
        </div>

        {/* WIDGET: PET */}
        <div className="fixed top-20 left-5 w-32 bg-yellow-100 border-4 border-yellow-600 p-2 text-black z-30 shadow-[5px_5px_0px_rgba(0,0,0,0.5)] transform -rotate-3">
            <div className="text-center font-bold text-xs mb-1">SKIBIDI PET</div>
            <div className="h-20 bg-white border border-black flex items-center justify-center text-4xl relative overflow-hidden">
                {petHunger < 20 ? '💀' : petHunger < 50 ? '🤢' : '👾'}
                {petHunger < 50 && <div className="absolute top-0 right-0 text-xs text-red-500 font-bold animate-bounce">FEED ME</div>}
            </div>
            <div className="w-full bg-gray-300 h-2 mt-1 border border-black">
                <div className="bg-green-500 h-full" style={{width: `${petHunger}%`}}></div>
            </div>
            <button 
                onClick={(e) => { e.stopPropagation(); setPetHunger(h => Math.min(100, h+20)); }}
                className="w-full mt-1 bg-blue-500 text-white text-xs font-bold py-1 border-2 border-blue-800 active:translate-y-1"
            >
                FEED
            </button>
        </div>

        {/* CSS GLOBAL STYLES FOR ANIMATIONS */}
        <style>{`
            @keyframes scanline {
                0% { background-position: 0% 0%; }
                100% { background-position: 0% 100%; }
            }
            .bg-scanlines {
                background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2));
                background-size: 100% 4px;
                animation: scanline 0.2s linear infinite;
            }
            @keyframes fade-in-up {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-up {
                animation: fade-in-up 0.2s ease-out forwards;
            }
        `}</style>
    </div>
  );
}