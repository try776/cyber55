import { useState, useEffect, useRef } from 'react'
import './App.css'

// --- CONSTANTS ---
const EMOJIS = ['💀', '🗿', '🤡', '🔥', '🚽', '🧢', '💅', '💩', '👻', '👺', '🅱️', '🥶', '💊'];
const PHRASES = ["GYATT", "Only in Ohio", "L + Ratio", "Skibidi Bop", "W Rizz", "Cringe", "Let him cook", "SHEESH", "Glazing", "Fanum Tax", "Sus", "Baka"];
const LOOT_TX = ['💩', '👟', '🧢', '👕', '💍', '👑', '🚗', '🏠', '🏝️', '🪐'];
const NOTIFICATIONS = ["Discord Ping!", "Mom calling...", "Low Battery", "Virus Detected", "Free V-Bucks"];

function App() {
  // --- STATE HELL (Triple Size) ---
  // Core Clicker
  const [count, setCount] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [autoClicker, setAutoClicker] = useState(0);

  // Social & Stats
  const [rizzLevel, setRizzLevel] = useState(50);
  const [mewingStreak, setMewingStreak] = useState(0);
  const [socialCredit, setSocialCredit] = useState(1000); // Feature: Social Credit
  const [susMeter, setSusMeter] = useState(0);
  const [fanumTax, setFanumTax] = useState(0);

  // Modes & Visuals
  const [isOhio, setIsOhio] = useState(false);
  const [isSigma, setIsSigma] = useState(false);
  const [deepFried, setDeepFried] = useState(false); // Feature: Deep Fry Filter
  const [backrooms, setBackrooms] = useState(false); // Feature: Backrooms Mode
  const [grimaceShake, setGrimaceShake] = useState(false);

  // UI Chaos
  const [popups, setPopups] = useState([]);
  const [chatLog, setChatLog] = useState(["NPC: Is this real chat?"]);
  const [notifications, setNotifications] = useState([]); // Feature: Fake Push Notifs
  const [vineBooms, setVineBooms] = useState([]); // Feature: Visual Vine Booms

  // Minigames
  // 1. Subway Surfers
  const [runnerPos, setRunnerPos] = useState(50);
  const [obstaclePos, setObstaclePos] = useState(100);
  const [runnerScore, setRunnerScore] = useState(0);
  
  // 2. DVD Logo
  const [dvdPos, setDvdPos] = useState({ x: 100, y: 100, dx: 3, dy: 3 }); // Feature: DVD Screensaver
  const [dvdColor, setDvdColor] = useState('red');

  // 3. Case Opening (Gamble)
  const [isSpinning, setIsSpinning] = useState(false); // Feature: Gamble Core
  const [spinOffset, setSpinOffset] = useState(0);
  const [lastWin, setLastWin] = useState(null);

  // 4. Attention Span Decay
  const [attentionSpan, setAttentionSpan] = useState(100); // Feature: Attention Span Mechanic
  
  // 5. V-Bucks Generator
  const [vBucks, setVBucks] = useState(0); // Feature: Fake Currency

  const requestRef = useRef();

  // --- LOOPS & EFFECTS ---

  // LOOP 1: Game Physics & Brainrot Updates (60FPS)
  useEffect(() => {
    const loop = () => {
      // Runner Logic
      setObstaclePos(prev => {
        if (prev < -10) {
          setRunnerScore(s => s + 1);
          return 100 + Math.random() * 50;
        }
        return prev - (2 + (runnerScore * 0.1)); // Gets faster
      });

      // DVD Logo Logic
      setDvdPos(pos => {
        let newX = pos.x + pos.dx;
        let newY = pos.y + pos.dy;
        let newDx = pos.dx;
        let newDy = pos.dy;
        let collided = false;

        if (newX <= 0 || newX >= window.innerWidth - 100) { newDx *= -1; collided = true; }
        if (newY <= 0 || newY >= window.innerHeight - 50) { newDy *= -1; collided = true; }

        if (collided) setDvdColor(['red', 'blue', 'green', 'yellow', 'purple'][Math.floor(Math.random() * 5)]);

        return { x: newX, y: newY, dx: newDx, dy: newDy };
      });

      requestRef.current = requestAnimationFrame(loop);
    };
    requestRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [runnerScore]);

  // LOOP 2: Attention Span Decay & Auto Clicker (Interval)
  useEffect(() => {
    const interval = setInterval(() => {
      // Decay Attention
      setAttentionSpan(prev => {
        if (prev <= 0) {
             triggerVineBoom(); // Punishment
             return 50; // Reset
        }
        return prev - 0.5; 
      });

      // Auto Clicker
      if (autoClicker > 0) {
        setCount(c => c + autoClicker);
      }

      // Collision Check for Runner (Unfair)
      if (obstaclePos < runnerPos + 10 && obstaclePos > runnerPos - 10) {
        setChatLog(prev => [...prev.slice(-5), "SYSTEM: SKILL ISSUE 💀"]);
        setSocialCredit(s => s - 50);
      }

    }, 100);
    return () => clearInterval(interval);
  }, [autoClicker, obstaclePos, runnerPos]);

  // LOOP 3: Chaos Events (Random Intervals)
  useEffect(() => {
    const chaos = setInterval(() => {
      // Fanum Tax
      if (Math.random() > 0.85 && count > 100) {
        const tax = Math.floor(count * 0.1);
        setCount(c => c - tax);
        setFanumTax(f => f + tax);
        createPopup(`FANUM TAX -${tax} POINTS 🍔`);
      }

      // Chat Spam
      setChatLog(prev => {
        const msg = PHRASES[Math.floor(Math.random() * PHRASES.length)];
        return [...prev.slice(-8), `User${Math.floor(Math.random()*999)}: ${msg}`];
      });

      // Fake Notification
      if (Math.random() > 0.9) {
        const notif = NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)];
        setNotifications(prev => [...prev, {id: Date.now(), text: notif}]);
        setTimeout(() => setNotifications(p => p.slice(1)), 3000);
      }

    }, 1000);
    return () => clearInterval(chaos);
  }, [count]);

  // --- INTERACTION HANDLERS ---

  const handleBrainrotClick = () => {
    setCount(c => c + clickPower);
    setAttentionSpan(a => Math.min(100, a + 5)); // Clicking restores attention
    setSusMeter(s => Math.min(100, s + 2));
    
    // Metal Pipe Sound Effect Logic (Visual)
    if (Math.random() > 0.95) {
      document.body.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
      setTimeout(() => document.body.style.transform = 'none', 200);
      triggerVineBoom();
    }
  };

  const triggerVineBoom = () => {
    const id = Date.now();
    setVineBooms(prev => [...prev, id]);
    setTimeout(() => setVineBooms(prev => prev.filter(i => i !== id)), 600);
  };

  const createPopup = (text) => {
    const id = Date.now();
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 100);
    setPopups(prev => [...prev, { id, text, x, y }]);
  };

  const spinLootbox = () => {
    if (count < 100) return createPopup("NOT ENOUGH POINTS BRO 💀");
    if (isSpinning) return;
    
    setCount(c => c - 100);
    setIsSpinning(true);
    const winIndex = Math.floor(Math.random() * LOOT_TX.length);
    const extraSpins = 20; // Visual spins
    const targetOffset = (extraSpins * LOOT_TX.length + winIndex) * 100;
    
    setSpinOffset(targetOffset);
    
    setTimeout(() => {
      setIsSpinning(false);
      setSpinOffset(0);
      setLastWin(LOOT_TX[winIndex]);
      createPopup(`UNBOXED: ${LOOT_TX[winIndex]} 🔥`);
      if (winIndex > 7) {
        triggerVineBoom();
        setClickPower(p => p * 2);
      }
    }, 4000);
  };

  const buyUpgrade = (type) => {
    if (type === 'rizz') {
        setRizzLevel(Math.floor(Math.random() * 100));
        setMewingStreak(m => m + 1);
    }
    if (type === 'sigma' && count >= 500) {
        setCount(c => c - 500);
        setIsSigma(true);
        setSocialCredit(s => s + 1000);
    }
    if (type === 'autoclick' && count >= 200) {
        setCount(c => c - 200);
        setAutoClicker(a => a + 5);
    }
  };

  return (
    <div className={`brainrot-container ${isOhio ? 'ohio-mode' : ''} ${deepFried ? 'deep-fried' : ''} ${backrooms ? 'backrooms-mode' : ''}`}
         style={{filter: grimaceShake ? 'hue-rotate(270deg) blur(4px)' : ''}}>

      {/* OVERLAYS */}
      <div className="attention-container">
        <div className="attention-bar" style={{width: `${attentionSpan}%`}}>
            ATTENTION SPAN (CLICK TO SURVIVE)
        </div>
      </div>

      {/* DVD LOGO */}
      <div className="dvd-logo" style={{left: dvdPos.x, top: dvdPos.y, color: dvdColor}}>
        DVD
      </div>

      {/* VINE BOOMS */}
      {vineBooms.map(id => <div key={id} className="vine-boom">💥 BOOM 💥</div>)}

      {/* MAIN CONTENT */}
      <h1 className="rainbow-text shake-constant">ULTIMATE BRAINROT v3.0</h1>

      <div className="card" style={{background: '#444'}}>
        <div style={{display:'flex', justifyContent:'space-between', fontSize: '1.2rem'}}>
            <span>🧠 Points: {count}</span>
            <span>🇨🇳 Social Credit: {socialCredit}</span>
            <span>💵 V-Bucks: {vBucks}</span>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px'}}>
          {/* LEFT COLUMN */}
          <div>
              <button onClick={handleBrainrotClick} style={{fontSize: '2.5rem', width: '100%', height: '150px'}} className="shake-constant">
                  🚽 CLICK ME ({clickPower}x)
              </button>

              {/* LOOTBOX AREA */}
              <div className="card">
                <h3>🎰 GAMBLE CORE (Cost: 100)</h3>
                <div className="lootbox-container">
                    <div className="loot-marker"></div>
                    <div className="lootbox-strip" style={{transform: `translateX(-${spinOffset}px)`}}>
                        {/* Repeat array to simulate infinite strip */}
                        {[...LOOT_TX, ...LOOT_TX, ...LOOT_TX, ...LOOT_TX, ...LOOT_TX, ...LOOT_TX, ...LOOT_TX].map((item, i) => (
                            <div key={i} className="loot-item">{item}</div>
                        ))}
                    </div>
                </div>
                <button onClick={spinLootbox} disabled={isSpinning} style={{marginTop:'10px'}}>OPEN CASE 📦</button>
                {lastWin && <p>Last Pull: {lastWin}</p>}
              </div>

              {/* UPGRADES */}
              <div className="card" style={{display:'flex', flexWrap:'wrap', gap:'5px'}}>
                  <button onClick={() => buyUpgrade('rizz')}>Rizz Check (Free)</button>
                  <button onClick={() => buyUpgrade('autoclick')}>Buy NPC Farmer (200pts)</button>
                  <button onClick={() => buyUpgrade('sigma')}>Become Sigma (500pts)</button>
                  <button onClick={() => setDeepFried(!deepFried)}>Toggle Deep Fry 🍟</button>
                  <button onClick={() => setBackrooms(!backrooms)}>Noclip Backrooms 🟨</button>
                  <button onClick={() => setVBucks(v => v + 1000)}>FREE V-BUCKS GENERATOR (NO SCAM)</button>
              </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
              {/* MINIGAMES */}
              <div className="card">
                  <h4>🏃 Subway Surfers 🏃</h4>
                  <div style={{background:'#555', height:'100px', position:'relative', overflow:'hidden', border:'2px solid yellow'}}>
                      <div style={{position:'absolute', bottom:0, left:`${runnerPos}%`, fontSize:'30px', transition:'left 0.1s'}}>🛹</div>
                      <div style={{position:'absolute', bottom:0, left:`${obstaclePos}%`, fontSize:'30px'}}>🚓</div>
                  </div>
                  <div style={{display:'flex', justifyContent:'center'}}>
                      <button onMouseDown={() => setRunnerPos(20)} onMouseUp={() => setRunnerPos(50)}>L</button>
                      <button onMouseDown={() => setRunnerPos(80)} onMouseUp={() => setRunnerPos(50)}>R</button>
                  </div>
                  <p>Score: {runnerScore}</p>
              </div>

              {/* CHAT LOG */}
              <div className="card" style={{textAlign:'left', height:'200px', overflowY:'hidden', fontFamily:'monospace', fontSize:'0.8rem'}}>
                  <h4 style={{color:'red'}}>🔴 LIVE LEAK CHAT</h4>
                  {chatLog.map((m, i) => <div key={i} style={{borderBottom:'1px solid #555'}}>{m}</div>)}
              </div>

              {/* METERS */}
              <div className="card">
                  <p>Rizz: {rizzLevel}% {rizzLevel > 90 ? "🥵" : "💀"}</p>
                  <p>Mewing Streak: {mewingStreak} days 🤫</p>
                  <p>Sus Meter: {susMeter}% ⛔</p>
                  <button onClick={() => setGrimaceShake(true)}>DRINK GRIMACE SHAKE</button>
              </div>
          </div>
      </div>

      {/* NOTIFICATIONS */}
      <div style={{position: 'fixed', top: '50px', right: '10px', zIndex: 999}}>
          {notifications.map(n => (
              <div key={n.id} style={{background: '#333', border: '1px solid white', padding: '10px', margin: '5px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                  🔔 {n.text}
              </div>
          ))}
      </div>

      {/* POPUPS */}
      {popups.map(p => (
        <div key={p.id} style={{position:'fixed', top:p.y, left:p.x, background:'blue', padding:'20px', border:'4px outset white', zIndex:1000}}>
            <p>{p.text}</p>
            <button onClick={() => setPopups(curr => curr.filter(i => i.id !== p.id))}>OK</button>
        </div>
      ))}

      {/* MINECRAFT PARKOUR OVERLAY */}
      <div className="mc-parkour">
          <div style={{color:'white'}}>
              [Minecraft Parkour Gameplay Footage]
              <br/>
              (Imagine jumping blocks)
          </div>
      </div>
      
      {/* SIGMA OVERLAY */}
      {isSigma && <div style={{position:'fixed', bottom:0, right:0, width:'150px', zIndex:2000}}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/1200px-Smiley.svg.png" style={{width:'100%', filter:'grayscale(100%)'}} alt="sigma"/>
        <div style={{background:'black', color:'white', fontWeight:'bold'}}>SIGMA GRINDSET</div>
      </div>}

    </div>
  )
}

export default App