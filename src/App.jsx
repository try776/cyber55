import { useState, useEffect, useRef } from 'react'
import './App.css'

const EMOJIS = ['💀', '🗿', '🤡', '🔥', '🚽', '🧢', '💅', '💩', '👻', '👺', '🅱️', '🥶', '💊', '🦎', '🍔'];
const PHRASES = ["GYATT", "Ohio", "L + Ratio", "Skibidi", "Rizz", "Cringe", "Cook", "SHEESH", "Glazing", "Fanum", "Sus", "Baka", "Cap", "Bet", "Slaps"];
const NOTIFS = ["Discord Ping!", "Mom calling...", "Low Battery", "Virus Detected", "Free V-Bucks", "IRS Audit", "Hot Singles nearby"];
const STOCKS = ["GME", "DOGE", "RIZZ", "SKBD", "OHIO"];

function App() {
  // --- STATE HELL: EXPANDED EDITION ---
  
  // Core & Economy
  const [points, setPoints] = useState(0);
  const [cps, setCps] = useState(0);
  const [clickMult, setClickMult] = useState(1);
  const [vBucks, setVBucks] = useState(0);
  const [socialCredit, setSocialCredit] = useState(1000);
  const [crypto, setCrypto] = useState(0.0000); // Feature 41: Crypto Miner

  // Stats & Status
  const [rizz, setRizz] = useState(50);
  const [mewing, setMewing] = useState(0);
  const [sus, setSus] = useState(0);
  const [attention, setAttention] = useState(100);
  const [battery, setBattery] = useState(100); // Feature 42: Battery Drain
  const [brainrotLevel, setBrainrotLevel] = useState(1); // Feature 43: Level System

  // Visual Modes
  const [isOhio, setIsOhio] = useState(false);
  const [isSigma, setIsSigma] = useState(false);
  const [deepFried, setDeepFried] = useState(false);
  const [backrooms, setBackrooms] = useState(false);
  const [fbiRaid, setFbiRaid] = useState(false); // Feature 44: FBI Raid Event
  const [ascended, setAscended] = useState(false); // Feature 45: Ascension Mode
  const [screenCracked, setScreenCracked] = useState(false); // Feature 46: Screen Crack

  // Minigame 1: Subway Surfers
  const [subwayPos, setSubwayPos] = useState(50);
  const [subwayObs, setSubwayObs] = useState(100);
  
  // Minigame 2: Flappy Bird (Feature 47)
  const [birdY, setBirdY] = useState(50);
  const [birdVel, setBirdVel] = useState(0);
  const [pipeX, setPipeX] = useState(100);
  const [pipeH, setPipeH] = useState(50);
  
  // Minigame 3: Skibidi Pet (Tamagotchi) (Feature 48)
  const [petHunger, setPetHunger] = useState(100);
  const [petStatus, setPetStatus] = useState("Alive");

  // Chaos Elements
  const [popups, setPopups] = useState([]);
  const [chat, setChat] = useState(["System: Welcome to Hell"]);
  const [mouseTrail, setMouseTrail] = useState([]); // Feature 49: Mouse Trail
  const [dvd, setDvd] = useState({x:100, y:100, dx:2, dy:2, col:'red'});
  const [ipAddress, setIpAddress] = useState("192.168.0.1"); // Feature 50: Fake IP Leak
  const [stockPrices, setStockPrices] = useState(STOCKS.map(() => 100)); // Feature 51: Stock Market
  const [virusProgress, setVirusProgress] = useState(0); // Feature 52: Fake Virus Download

  const reqRef = useRef();

  // --- GAME LOOPS ---

  // LOOP 1: High Speed Physics (60FPS)
  useEffect(() => {
    const loop = () => {
      // Subway Logic
      setSubwayObs(p => {
        if (p < -10) return 100 + Math.random() * 50;
        return p - 2;
      });

      // Flappy Logic
      setBirdY(y => Math.min(130, Math.max(0, y + birdVel)));
      setBirdVel(v => v + 0.5); // Gravity
      setPipeX(x => {
        if (x < -20) {
            setPipeH(20 + Math.random() * 80);
            return 100;
        }
        return x - 1.5;
      });

      // DVD Logic
      setDvd(p => {
        let nx = p.x + p.dx, ny = p.y + p.dy, ndx = p.dx, ndy = p.dy;
        if (nx<=0 || nx>=window.innerWidth-60) ndx*=-1;
        if (ny<=0 || ny>=window.innerHeight-40) ndy*=-1;
        return {x:nx, y:ny, dx:ndx, dy:ndy, col: p.col};
      });

      reqRef.current = requestAnimationFrame(loop);
    };
    reqRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(reqRef.current);
  }, [birdVel]);

  // LOOP 2: The "1 Second" Logic (Status, Economy, Chaos)
  useEffect(() => {
    const secInterval = setInterval(() => {
      // Economy
      setPoints(p => p + cps);
      setCrypto(c => c + (isSigma ? 0.001 : 0));
      
      // Decay
      setAttention(a => Math.max(0, a - 1));
      setPetHunger(h => Math.max(0, h - 2));
      setBattery(b => Math.max(0, b - 0.1));

      // Random Events (Feature 53: RNG Hell)
      if (Math.random() > 0.9) setFbiRaid(true); // 10% chance FBI
      if (fbiRaid) setTimeout(() => setFbiRaid(false), 2000);
      
      if (Math.random() > 0.8) {
         // Feature 54: Stock Market Crash/Pump
         setStockPrices(prev => prev.map(p => Math.max(1, p + (Math.random() * 20 - 10))));
      }

      if (Math.random() > 0.7) {
         // Feature 55: IP Leak Change
         setIpAddress(`${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`);
      }

      // Pet Death Logic
      if (petHunger <= 0) setPetStatus("DEAD 💀");

      // Virus Logic
      if (virusProgress > 0 && virusProgress < 100) setVirusProgress(v => v + 5);
      else if (virusProgress >= 100) { setVirusProgress(0); createPopup("SYSTEM32 DELETED"); }

      // Chat Spam
      setChat(c => [...c.slice(-5), `${["xQc", "Kai", "Speed", "NPC"][Math.floor(Math.random()*4)]}: ${PHRASES[Math.floor(Math.random()*PHRASES.length)]}`]);

    }, 1000);
    return () => clearInterval(secInterval);
  }, [cps, isSigma, fbiRaid, petHunger, virusProgress]);

  // --- INTERACTIONS ---

  const handleClick = (e) => {
    setPoints(p => p + (1 * clickMult));
    setAttention(a => Math.min(100, a + 5));
    
    // Feature 56: Mouse Trail Logic
    const id = Date.now();
    setMouseTrail(prev => [...prev, {id, x: e.clientX, y: e.clientY, emoji: EMOJIS[Math.floor(Math.random()*EMOJIS.length)]}]);
    setTimeout(() => setMouseTrail(prev => prev.filter(i => i.id !== id)), 1000);

    // Feature 57: Screen Crack Chance
    if (Math.random() > 0.98) setScreenCracked(true);
    
    // Feature 58: Ascend Chance
    if (points > 1000 && Math.random() > 0.99) setAscended(true);
  };

  const jumpBird = () => setBirdVel(-8);

  const feedPet = () => {
      if (points >= 50) {
          setPoints(p => p - 50);
          setPetHunger(h => Math.min(100, h + 30));
          setMewing(m => m + 1);
      }
  };

  const createPopup = (msg) => {
      const id = Date.now() + Math.random();
      setPopups(p => [...p, {id, x: Math.random()*window.innerWidth/2, y: Math.random()*window.innerHeight/2, msg}]);
  };

  const buyUpgrade = (type) => {
      if (type === 'cps' && points >= 100) { setPoints(p=>p-100); setCps(c=>c+5); }
      if (type === 'mult' && points >= 500) { setPoints(p=>p-500); setClickMult(m=>m*2); }
      if (type === 'virus') { setVirusProgress(1); } // Feature 59: Install Virus
      if (type === 'nft' && points >= 1000) { setPoints(p=>p-1000); createPopup(`MINTED APE #${Math.floor(Math.random()*9999)}`); } // Feature 60: NFTs
  };

  return (
    <div className={`brainrot-container ${isOhio ? 'ohio-mode' : ''} ${ascended ? 'ascended' : ''}`} 
         style={{filter: deepFried ? 'contrast(200%) saturate(500%)' : 'none'}}
         onClick={handleClick}>

      {/* --- OVERLAYS LAYER --- */}
      {fbiRaid && <div className="fbi-raid" style={{position:'fixed', inset:0, zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'5rem', color:'white', fontWeight:'bold'}}>FBI OPEN UP 🚨</div>}
      {screenCracked && <div className="screen-crack"></div>}
      <div className="activate-windows">Activate Windows<br/><span style={{fontSize:'1rem'}}>Go to Settings to activate Windows.</span></div>
      <div className="dvd-logo" style={{left:dvd.x, top:dvd.y, color:dvd.col}}>DVD</div>
      
      {/* Feature 61: Mouse Trails */}
      {mouseTrail.map(m => <div key={m.id} className="mouse-trail" style={{left:m.x, top:m.y}}>{m.emoji}</div>)}

      {/* --- HUD LAYER --- */}
      <div style={{position:'fixed', top:0, width:'100%', background:'red', height:'20px', zIndex:900}}>
          <div style={{width:`${attention}%`, background:'lime', height:'100%'}}>ATTENTION SPAN</div>
      </div>
      
      <div className="stock-ticker">
          {STOCKS.map((s, i) => <span key={s} style={{marginRight:'20px'}}>{s}: ${stockPrices[i]?.toFixed(2)} {Math.random()>0.5 ? '📈' : '📉'}</span>)}
      </div>

      {/* --- MAIN GRID --- */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px', marginTop:'40px'}}>
          
          {/* COL 1: STATS & ECONOMY */}
          <div className="card">
              <h2 className="rainbow-text">USER: SKIBIDI_69</h2>
              <p>IP: <span style={{color:'red', fontWeight:'bold'}}>{ipAddress}</span> (LEAKED)</p>
              <p>Points: {points.toFixed(0)} | CPS: {cps}</p>
              <p>V-Bucks: {vBucks} | Crypto: {crypto.toFixed(4)} BTC</p>
              <p>Social Credit: {socialCredit} 🇨🇳</p>
              <p>Battery: {battery.toFixed(0)}% 🔋</p>
              <div style={{background:'#333', border:'1px solid white', marginTop:'10px'}}>
                  {virusProgress > 0 && <div style={{width:`${virusProgress}%`, background:'lime', height:'10px'}}>DOWNLOADING VIRUS...</div>}
              </div>
          </div>

          {/* COL 2: CLICKER & UPGRADES */}
          <div className="card">
               <button style={{fontSize:'2rem', width:'100%'}} onClick={(e)=>{e.stopPropagation(); handleClick(e)}}>
                   🚽 CLICK ME
               </button>
               <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5px', marginTop:'10px'}}>
                   <button onClick={(e)=>{e.stopPropagation(); buyUpgrade('cps')}}>Auto-Clicker (100pts)</button>
                   <button onClick={(e)=>{e.stopPropagation(); buyUpgrade('mult')}}>2x Multiplier (500pts)</button>
                   <button onClick={(e)=>{e.stopPropagation(); buyUpgrade('virus')}}>Download RAM (Free)</button>
                   <button onClick={(e)=>{e.stopPropagation(); buyUpgrade('nft')}}>Mint NFT (1000pts)</button>
                   <button onClick={(e)=>{e.stopPropagation(); setIsOhio(!isOhio)}}>Toggle Ohio</button>
                   <button onClick={(e)=>{e.stopPropagation(); setDeepFried(!deepFried)}}>Deep Fry</button>
                   <button onClick={(e)=>{e.stopPropagation(); setBackrooms(!backrooms)}}>Noclip</button>
               </div>
          </div>

          {/* COL 3: PET & CHAT */}
          <div className="card">
              <h3>🥚 SKIBIDI PET</h3>
              <div style={{fontSize:'3rem'}}>{petStatus === 'Alive' ? (petHunger < 30 ? '🤢' : '👾') : '🪦'}</div>
              <p>Hunger: {petHunger}%</p>
              <button onClick={(e)=>{e.stopPropagation(); feedPet()}} disabled={petStatus!=='Alive'}>FEED (50pts)</button>
              
              <div style={{marginTop:'20px', height:'150px', overflow:'hidden', background:'black', border:'1px solid lime', fontSize:'0.8rem', textAlign:'left', padding:'5px'}}>
                  {chat.map((c,i) => <div key={i}>{c}</div>)}
              </div>
          </div>
      </div>

      {/* --- MINIGAMES ROW --- */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
          {/* SUBWAY SURFERS */}
          <div className="card" style={{height:'200px', position:'relative', overflow:'hidden', background:'#555'}}>
              <h4>🏃 SUBWAY SURFERS 2</h4>
              <div style={{position:'absolute', bottom:10, left:`${subwayPos}%`, fontSize:'2rem', transition:'0.1s'}}>🛹</div>
              <div style={{position:'absolute', bottom:10, left:`${subwayObs}%`, fontSize:'2rem'}}>🚓</div>
              <div style={{position:'absolute', bottom:0, width:'100%', display:'flex', justifyContent:'center', gap:'10px'}}>
                  <button onMouseDown={()=>setSubwayPos(20)} onMouseUp={()=>setSubwayPos(50)}>L</button>
                  <button onMouseDown={()=>setSubwayPos(80)} onMouseUp={()=>setSubwayPos(50)}>R</button>
              </div>
          </div>

          {/* FLAPPY BIRD */}
          <div className="card">
              <h4>🐦 FLAPPY BIRD RTX</h4>
              <div className="flappy-container" onClick={(e)=>{e.stopPropagation(); jumpBird()}}>
                  <div className="flappy-bird" style={{top: birdY}}>🐦</div>
                  <div className="flappy-pipe" style={{left: pipeX, height: pipeH}}></div>
                  <div className="flappy-pipe" style={{left: pipeX, height: 150 - pipeH - 40, bottom: 'auto', top: 0}}></div>
              </div>
              <p style={{fontSize:'0.8rem'}}>Click box to jump</p>
          </div>
      </div>

      {/* --- CHAOS POPUPS --- */}
      {popups.map(p => (
          <div key={p.id} style={{position:'fixed', top:p.y, left:p.x, background:'blue', color:'white', padding:'10px', border:'3px outset white', zIndex:2000}}>
              {p.msg}
              <button onClick={(e)=>{e.stopPropagation(); setPopups(prev=>prev.filter(i=>i.id!==p.id))}}>X</button>
          </div>
      ))}

      {/* Feature 62: Fake Captcha */}
      {Math.random() > 0.99 && (
          <div style={{position:'fixed', top:'50%', left:'50%', transform:'translate(-50%, -50%)', background:'white', color:'black', padding:'20px', zIndex:10000}}>
              <h3>ARE YOU A ROBOT?</h3>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5px'}}>
                  {[1,2,3,4].map(i => <img key={i} src={`https://placehold.co/50x50?text=${i}`} onClick={()=>alert('WRONG!')}/>)}
              </div>
          </div>
      )}

    </div>
  )
}

export default App