import { useState } from "react";

const INITIAL_LEARNED = [];

const ALL_LETTERS = [
  { arm: "Աա", small: "ա", rus: "а", eng: "a", fra: "a" },
  { arm: "Բբ", small: "բ", rus: "б", eng: "b", fra: "b" },
  { arm: "Գգ", small: "գ", rus: "г", eng: "g", fra: "g" },
  { arm: "Դդ", small: "դ", rus: "д", eng: "d", fra: "d" },
  { arm: "Եե", small: "ե", rus: "е", eng: "ye", fra: "yé" },
  { arm: "Զզ", small: "զ", rus: "з", eng: "z", fra: "z" },
  { arm: "Էէ", small: "է", rus: "э", eng: "e", fra: "é" },
  { arm: "Ըը", small: "ը", rus: "ы", eng: "uh", fra: "eu" },
  { arm: "Թթ", small: "թ", rus: "т'", eng: "t'", fra: "t'" },
  { arm: "Ժժ", small: "ժ", rus: "ж", eng: "zh", fra: "j" },
  { arm: "Իի", small: "ի", rus: "и", eng: "i", fra: "i" },
  { arm: "Լլ", small: "լ", rus: "л", eng: "l", fra: "l" },
  { arm: "Խխ", small: "խ", rus: "х", eng: "kh", fra: "kh" },
  { arm: "Ծծ", small: "ծ", rus: "ц", eng: "ts", fra: "ts" },
  { arm: "Կկ", small: "կ", rus: "к", eng: "k", fra: "k" },
  { arm: "Հհ", small: "հ", rus: "h", eng: "h", fra: "h" },
  { arm: "Ձձ", small: "ձ", rus: "дз", eng: "dz", fra: "dz" },
  { arm: "Ղղ", small: "ղ", rus: "гх", eng: "gh", fra: "gh" },
  { arm: "Ճճ", small: "ճ", rus: "ч'", eng: "ch'", fra: "tch'" },
  { arm: "Մմ", small: "մ", rus: "м", eng: "m", fra: "m" },
  { arm: "Յյ", small: "յ", rus: "й", eng: "y", fra: "y" },
  { arm: "Նն", small: "ն", rus: "н", eng: "n", fra: "n" },
  { arm: "Շշ", small: "շ", rus: "ш/щ", eng: "sh", fra: "ch" },
  { arm: "Ոոо", small: "ո", rus: "во/о", eng: "vo/o", fra: "vo/o" },
  { arm: "Չչ", small: "չ", rus: "ч", eng: "ch", fra: "tch" },
  { arm: "Պպ", small: "պ", rus: "п", eng: "p", fra: "p" },
  { arm: "Ջջ", small: "ջ", rus: "дж", eng: "j", fra: "dj" },
  { arm: "Ռռ", small: "ռ", rus: "рр", eng: "rr", fra: "rr" },
  { arm: "Սс", small: "ս", rus: "с", eng: "s", fra: "s" },
  { arm: "Վվ", small: "վ", rus: "в", eng: "v", fra: "v" },
  { arm: "Տտ", small: "տ", rus: "т", eng: "t", fra: "t" },
  { arm: "Րр", small: "ր", rus: "р", eng: "r", fra: "r" },
  { arm: "Ցց", small: "ց", rus: "ц'", eng: "ts'", fra: "ts'" },
  { arm: "Ււ", small: "ւ", rus: "в", eng: "v", fra: "v" },
  { arm: "Փփ", small: "փ", rus: "п'", eng: "p'", fra: "p'" },
  { arm: "Քք", small: "ք", rus: "к'", eng: "k'", fra: "k'" },
  { arm: "Օօ", small: "օ", rus: "о", eng: "o", fra: "o" },
  { arm: "Ֆֆ", small: "ֆ", rus: "ф", eng: "f", fra: "f" },
  { arm: "Უუ", small: "ու", rus: "у", eng: "u", fra: "ou" },
];

const TRANSLATIONS = {
  rus: {
    title: "Армянский алфавит · 38 букв",
    know: "Знаю",
    left: "Осталось",
    progress: "Прогресс",
    table: "Таблица",
    cards: "Карточки",
    all: "Все",
    learned: "Знаю",
    notLearned: "Не знаю",
    tapHint: "нажми на букву · отметить / снять отметку",
    flipHint: "нажми · перевернуть",
    arrowHint: "← стрелки или нажми на карточку",
    markBtn: "+ Отметить как выученную",
    unmarkBtn: "✓ Знаю · убрать",
    familiar: "✓ Знакомая",
    langLabel: "РУ",
  },
  eng: {
    title: "Armenian Alphabet · 38 letters",
    know: "Known",
    left: "Remaining",
    progress: "Progress",
    table: "Grid",
    cards: "Flashcards",
    all: "All",
    learned: "Known",
    notLearned: "Unknown",
    tapHint: "tap a letter · mark / unmark",
    flipHint: "tap · flip",
    arrowHint: "← arrows or tap the card",
    markBtn: "+ Mark as learned",
    unmarkBtn: "✓ Known · remove",
    familiar: "✓ Familiar",
    langLabel: "EN",
  },
  fra: {
    title: "Alphabet arménien · 38 lettres",
    know: "Sus",
    left: "Restant",
    progress: "Progrès",
    table: "Grille",
    cards: "Cartes",
    all: "Tous",
    learned: "Sus",
    notLearned: "Inconnu",
    tapHint: "appuie sur une lettre · cocher / décocher",
    flipHint: "appuie · retourner",
    arrowHint: "← flèches ou appuie sur la carte",
    markBtn: "+ Marquer comme appris",
    unmarkBtn: "✓ Sus · retirer",
    familiar: "✓ Familière",
    langLabel: "FR",
  },
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&display=swap');
  * { box-sizing: border-box; }
  body { margin: 0; background: #0e0600; }

  .gcard {
    position: relative;
    border-radius: 2px;
    padding: 0.85rem 0.3rem 0.55rem;
    text-align: center;
    cursor: pointer;
    transition: transform 0.18s, box-shadow 0.18s, background 0.25s, border-color 0.25s;
    user-select: none;
  }
  .gcard:hover { transform: translateY(-4px) scale(1.06); z-index: 3; }
  .gcard.learned {
    border: 1px solid rgba(200,134,10,0.6);
    background: linear-gradient(145deg, rgba(80,35,0,0.92), rgba(45,15,0,0.97));
    box-shadow: 0 0 18px rgba(200,134,10,0.12), inset 0 1px 0 rgba(200,134,10,0.15);
  }
  .gcard.learned:hover {
    box-shadow: 0 8px 28px rgba(200,134,10,0.3), inset 0 1px 0 rgba(200,134,10,0.2);
  }
  .gcard.notlearned {
    border: 1px solid rgba(200,134,10,0.13);
    background: rgba(18,6,0,0.85);
  }
  .gcard.notlearned:hover {
    border-color: rgba(200,134,10,0.3);
    background: rgba(30,10,0,0.9);
  }

  .check-hint {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(200,134,10,0.06);
    opacity: 0;
    transition: opacity 0.18s;
    font-size: 1.3rem;
    color: rgba(200,134,10,0.45);
    border-radius: 2px;
  }
  .gcard.notlearned:hover .check-hint { opacity: 1; }

  .navbtn {
    background: transparent;
    border: 1px solid rgba(200,134,10,0.45);
    color: #e8a830;
    width: 48px; height: 48px;
    font-size: 1.3rem;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Cormorant Garamond', serif;
  }
  .navbtn:hover { background: rgba(200,134,10,0.1); border-color: #c8860a; }

  .tab-btn {
    background: transparent;
    border: 1px solid rgba(200,134,10,0.28);
    color: #9a7040;
    padding: 0.42rem 1rem;
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.95rem;
    cursor: pointer;
    letter-spacing: 0.07em;
    transition: all 0.2s;
  }
  .tab-btn:hover { color: #c8a06a; border-color: rgba(200,134,10,0.5); }
  .tab-btn.active {
    border-color: #c8860a;
    color: #e8a830;
    background: rgba(200,134,10,0.1);
    box-shadow: 0 0 14px rgba(200,134,10,0.13);
  }

  .lang-btn {
    background: transparent;
    border: 1px solid rgba(200,134,10,0.28);
    color: #9a7040;
    padding: 0.3rem 0.7rem;
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.85rem;
    cursor: pointer;
    letter-spacing: 0.1em;
    transition: all 0.2s;
    border-radius: 1px;
  }
  .lang-btn:hover { color: #c8a06a; border-color: rgba(200,134,10,0.5); }
  .lang-btn.active {
    border-color: #c8860a;
    color: #e8a830;
    background: rgba(200,134,10,0.1);
  }

  .card-scene { width: min(310px, 84vw); height: 230px; perspective: 1000px; cursor: pointer; }
  .card-inner {
    width: 100%; height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.52s cubic-bezier(.4,0,.2,1);
  }
  .card-inner.flipped { transform: rotateY(180deg); }
  .card-face {
    position: absolute; inset: 0;
    backface-visibility: hidden;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
  }
  .card-back-face { transform: rotateY(180deg); }

  .learn-btn {
    background: transparent;
    border: 1px solid rgba(200,134,10,0.35);
    color: #9a7040;
    padding: 0.38rem 1.2rem;
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.92rem;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: all 0.22s;
    border-radius: 1px;
  }
  .learn-btn:hover {
    color: #e8a830;
    border-color: #c8860a;
    background: rgba(200,134,10,0.08);
  }
  .learn-btn.is-learned {
    color: #c8860a;
    border-color: rgba(200,134,10,0.55);
    background: rgba(200,134,10,0.07);
  }
  .learn-btn.is-learned:hover {
    color: #e05050;
    border-color: rgba(220,80,60,0.45);
    background: rgba(200,60,40,0.06);
  }

  @keyframes pop {
    0% { transform: scale(1); }
    40% { transform: translateY(-4px) scale(1.2); }
    100% { transform: scale(1); }
  }
  .pop { animation: pop 0.28s ease; }
`;

export default function App() {
  const [lang, setLang] = useState("rus");
  const t = TRANSLATIONS[lang];

  const [learnedSet, setLearnedSet] = useState(() => {
    const s = new Set();
    ALL_LETTERS.forEach((l, i) => {
      if (INITIAL_LEARNED.some(r => l.rus.replace(/'/g,"").toLowerCase() === r)) s.add(i);
    });
    return s;
  });

  const [mode, setMode] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [popIdx, setPopIdx] = useState(null);

  const LETTERS = ALL_LETTERS.map((l, i) => ({ ...l, learned: learnedSet.has(i), idx: i }));

  function toggleLearned(idx) {
    setLearnedSet(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
    setPopIdx(idx);
    setTimeout(() => setPopIdx(null), 320);
  }

  const filtered = LETTERS.filter(l =>
    filter === "all" ? true : filter === "learned" ? l.learned : !l.learned
  );

  const learnedCount = learnedSet.size;
  const safeCardIdx = Math.min(cardIdx, Math.max(0, filtered.length - 1));
  const card = filtered[safeCardIdx];
  const pct = Math.round(learnedCount / LETTERS.length * 100);

  function goNext() { setFlipped(false); setTimeout(() => setCardIdx(i => (i+1) % filtered.length), 210); }
  function goPrev() { setFlipped(false); setTimeout(() => setCardIdx(i => (i-1+filtered.length) % filtered.length), 210); }

  const transcription = card ? card[lang] : "";

  return (
    <div style={{
      minHeight:"100vh",
      background:"radial-gradient(ellipse at 18% 18%, rgba(150,60,0,0.22) 0%, transparent 55%), radial-gradient(ellipse at 82% 82%, rgba(90,20,0,0.28) 0%, transparent 55%), #0e0600",
      color:"#f5e6c8",
      fontFamily:"'Cormorant Garamond', serif",
      padding:"2rem 1rem 5rem",
    }}>
      <style>{CSS}</style>

      {/* LANGUAGE SWITCHER */}
      <div style={{display:"flex", justifyContent:"flex-end", maxWidth:780, margin:"0 auto 1rem", gap:"0.4rem"}}>
        {["rus","eng","fra"].map(l => (
          <button key={l} className={`lang-btn ${lang===l?"active":""}`} onClick={() => setLang(l)}>
            {TRANSLATIONS[l].langLabel}
          </button>
        ))}
      </div>

      {/* HEADER */}
      <div style={{textAlign:"center", marginBottom:"2rem"}}>
        <div style={{width:140, height:1, background:"linear-gradient(90deg,transparent,#c8860a,transparent)", margin:"0 auto 0.9rem"}} />
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"0.7rem"}}>
          <span style={{color:"#c8860a", opacity:0.7}}>✦</span>
          <h1 style={{fontFamily:"'Cinzel Decorative',cursive", fontSize:"clamp(1.3rem,4vw,1.9rem)", color:"#e8a830", letterSpacing:"0.1em", textShadow:"0 0 40px rgba(200,140,0,0.5)", margin:0}}>
            Հայոց Գրեր
          </h1>
          <span style={{color:"#c8860a", opacity:0.7}}>✦</span>
        </div>
        <div style={{fontStyle:"italic", color:"#c8a06a", fontSize:"1rem", letterSpacing:"0.06em", marginTop:"0.3rem"}}>
          {t.title}
        </div>
        <div style={{width:140, height:1, background:"linear-gradient(90deg,transparent,#c8860a,transparent)", margin:"0.9rem auto 0"}} />
      </div>

      {/* STATS */}
      <div style={{display:"flex", justifyContent:"center", marginBottom:"1.4rem"}}>
        {[
          [learnedCount, t.know],
          [LETTERS.length - learnedCount, t.left],
          [pct+"%", t.progress]
        ].map(([n,l], i) => (
          <div key={i} style={{
            textAlign:"center", padding:"0 1.6rem",
            borderLeft: i>0 ? "1px solid rgba(200,134,10,0.25)" : "none"
          }}>
            <span style={{display:"block", fontFamily:"'Cinzel Decorative',cursive", fontSize:"1.8rem", color:"#e8a830", lineHeight:1}}>{n}</span>
            <span style={{fontSize:"0.68rem", color:"#9a7040", letterSpacing:"0.12em", textTransform:"uppercase"}}>{l}</span>
          </div>
        ))}
      </div>

      {/* PROGRESS BAR */}
      <div style={{width:"min(340px,80vw)", margin:"0 auto 1.8rem", height:3, background:"rgba(200,134,10,0.1)", borderRadius:2, overflow:"hidden"}}>
        <div style={{height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,#6b3300,#e8a830)", borderRadius:2, transition:"width 0.5s"}} />
      </div>

      {/* MODE TABS */}
      <div style={{display:"flex", justifyContent:"center", gap:"0.5rem", marginBottom:"0.8rem", flexWrap:"wrap"}}>
        {[["grid", t.table],["flashcard", t.cards]].map(([m,label]) => (
          <button key={m} className={`tab-btn ${mode===m?"active":""}`}
            onClick={() => { setMode(m); setCardIdx(0); setFlipped(false); }}>{label}</button>
        ))}
      </div>

      {/* FILTER TABS */}
      <div style={{display:"flex", justifyContent:"center", gap:"0.5rem", marginBottom:"1.6rem", flexWrap:"wrap"}}>
        {[["all", t.all],["learned", t.learned],["new", t.notLearned]].map(([f,label]) => (
          <button key={f} className={`tab-btn ${filter===f?"active":""}`}
            onClick={() => { setFilter(f); setCardIdx(0); setFlipped(false); }}>{label}</button>
        ))}
      </div>

      {/* GRID */}
      {mode === "grid" && (
        <>
          <div style={{textAlign:"center", marginBottom:"1rem", fontSize:"0.78rem", color:"#5a4020", letterSpacing:"0.08em"}}>
            {t.tapHint}
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(78px,1fr))", gap:"0.6rem", maxWidth:780, margin:"0 auto"}}>
            {filtered.map((l) => (
              <div
                key={l.idx}
                className={`gcard ${l.learned ? "learned" : "notlearned"} ${popIdx === l.idx ? "pop" : ""}`}
                onClick={() => toggleLearned(l.idx)}
                title={l.learned ? t.unmarkBtn : t.markBtn}
              >
                {!l.learned && <div className="check-hint">+</div>}
                {l.learned && (
                  <div style={{position:"absolute", top:5, right:7, color:"#c8860a", fontSize:"0.6rem", opacity:0.9}}>✓</div>
                )}
                <div style={{fontSize:"2rem", lineHeight:1.1, marginBottom:"0.2rem", color: l.learned ? "#e8a830" : "#7a5c30"}}>
                  {l.small}
                </div>
                <div style={{fontSize:"0.76rem", color: l.learned ? "#c8a06a" : "#5a4020", letterSpacing:"0.03em"}}>
                  {l[lang]}
                </div>
              </div>
            ))}
          </div>
          <div style={{display:"flex", justifyContent:"center", gap:"1.5rem", marginTop:"1.5rem", fontSize:"0.83rem", color:"#7a6040"}}>
            <span><span style={{color:"#e8a830"}}>●</span> {t.know} ({learnedCount})</span>
            <span><span style={{color:"#3a2810"}}>●</span> {t.notLearned} ({LETTERS.length - learnedCount})</span>
          </div>
        </>
      )}

      {/* FLASHCARD */}
      {mode === "flashcard" && card && (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"1.4rem"}}>
          <div style={{display:"flex", justifyContent:"space-between", width:"min(310px,84vw)", fontSize:"0.83rem"}}>
            <span style={{color:"#9a7040"}}>{safeCardIdx+1} / {filtered.length}</span>
            {card.learned && <span style={{color:"#c8860a"}}>{t.familiar}</span>}
          </div>

          <div className="card-scene" onClick={() => setFlipped(f=>!f)}>
            <div className={`card-inner ${flipped?"flipped":""}`}>
              {/* FRONT */}
              <div className="card-face" style={{
                border: card.learned ? "1px solid rgba(200,134,10,0.65)" : "1px solid rgba(200,134,10,0.3)",
                background: "linear-gradient(140deg,rgba(55,18,0,0.97),rgba(22,7,0,0.99))",
                boxShadow: card.learned
                  ? "0 8px 40px rgba(0,0,0,0.7), 0 0 30px rgba(200,134,10,0.14), inset 0 1px 0 rgba(200,134,10,0.18)"
                  : "0 8px 40px rgba(0,0,0,0.65), inset 0 1px 0 rgba(200,134,10,0.07)"
              }}>
                {["topleft","topright","bottomleft","bottomright"].map(pos => (
                  <span key={pos} style={{
                    position:"absolute",
                    top: pos.includes("top") ? 9 : "auto",
                    bottom: pos.includes("bottom") ? 9 : "auto",
                    left: pos.includes("left") ? 11 : "auto",
                    right: pos.includes("right") ? 11 : "auto",
                    color:"rgba(200,134,10,0.32)", fontSize:"0.55rem"
                  }}>✦</span>
                ))}
                <div style={{
                  fontSize:"6.5rem", lineHeight:1,
                  color: card.learned ? "#e8a830" : "#c8a06a",
                  textShadow: card.learned ? "0 0 60px rgba(200,134,10,0.45)" : "none"
                }}>{card.small}</div>
                <div style={{position:"absolute", bottom:13, fontSize:"0.68rem", color:"rgba(200,160,100,0.25)", letterSpacing:"0.1em"}}>
                  {t.flipHint}
                </div>
              </div>

              {/* BACK */}
              <div className="card-face card-back-face" style={{
                border: card.learned ? "1px solid rgba(200,134,10,0.65)" : "1px solid rgba(200,134,10,0.3)",
                background: "linear-gradient(140deg,rgba(45,14,0,0.98),rgba(20,6,0,0.99))",
                boxShadow: card.learned
                  ? "0 8px 40px rgba(0,0,0,0.7), 0 0 30px rgba(200,134,10,0.14)"
                  : "0 8px 40px rgba(0,0,0,0.65)"
              }}>
                {["topleft","topright","bottomleft","bottomright"].map(pos => (
                  <span key={pos} style={{
                    position:"absolute",
                    top: pos.includes("top") ? 9 : "auto",
                    bottom: pos.includes("bottom") ? 9 : "auto",
                    left: pos.includes("left") ? 11 : "auto",
                    right: pos.includes("right") ? 11 : "auto",
                    color:"rgba(200,134,10,0.32)", fontSize:"0.55rem"
                  }}>✦</span>
                ))}
                <div style={{fontSize:"2.8rem", color:"#e8a830", marginBottom:"0.3rem", textShadow:"0 0 40px rgba(200,134,10,0.4)"}}>{card.arm}</div>
                <div style={{fontSize:"2.4rem", color:"#c8a06a", letterSpacing:"0.08em", fontStyle:"italic"}}>{transcription}</div>
              </div>
            </div>
          </div>

          {/* LEARN TOGGLE */}
          <button
            className={`learn-btn ${card.learned ? "is-learned" : ""} ${popIdx === card.idx ? "pop" : ""}`}
            onClick={() => toggleLearned(card.idx)}
          >
            {card.learned ? t.unmarkBtn : t.markBtn}
          </button>

          <div style={{display:"flex", alignItems:"center", gap:"2rem"}}>
            <button className="navbtn" onClick={goPrev}>←</button>
            <span style={{color:"#7a5c30", fontSize:"0.82rem", letterSpacing:"0.1em", textTransform:"uppercase", minWidth:60, textAlign:"center"}}>
              {transcription}
            </span>
            <button className="navbtn" onClick={goNext}>→</button>
          </div>

          <div style={{color:"#4a3820", fontSize:"0.78rem", letterSpacing:"0.08em"}}>{t.arrowHint}</div>
        </div>
      )}
    </div>
  );
}
