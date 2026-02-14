import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cards = [
  {
    id: "happy-birthday",
    title: "Happy Birthday!",
    style: {
      background: "linear-gradient(135deg, #fce4ec, #fff)",
      color: "#c2185b",
      fontFamily: "'Georgia', serif",
    },
    className: "col-span-1 row-span-1",
    content: (
      <div className="flex items-center justify-center h-full">
        <span className="text-3xl md:text-4xl font-bold italic" style={{ color: "#c2185b", fontFamily: "'Georgia', serif" }}>
          Happy<br />Birthday!
        </span>
      </div>
    ),
    modalContent: "🎂 Wishing you the happiest birthday, Tissu! May all your dreams come true! 🎉",
  },
  {
    id: "voice-note",
    title: "Voice-Note <3",
    style: {
      background: "linear-gradient(135deg, #5d4037, #795548)",
      color: "#fff",
    },
    className: "col-span-1 row-span-1",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-2">
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#e8a087" }}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 2a5 5 0 0 0-5 5v5a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z" fill="#795548"/></svg>
        </div>
        <span className="text-sm font-semibold">Voice-Note</span>
        <span className="text-xs opacity-70">&lt;3</span>
        <div className="flex gap-2 mt-1 items-center">
          <span>♥</span>
          <span>⏮</span>
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#333" }}>
            <span>▶</span>
          </div>
          <span>⏭</span>
          <span>⊖</span>
        </div>
      </div>
    ),
    modalContent: "🎵 A special voice note will be placed here... Stay tuned! 💕",
  },
  {
    id: "subscription",
    title: "Subscription Plan",
    style: {
      background: "linear-gradient(135deg, #4a0e0e, #7b1a1a)",
      color: "#fff",
    },
    className: "col-span-1 row-span-1",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-2">
        <span className="text-sm uppercase tracking-widest font-bold">Subscription</span>
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#f06292" }}>
          <span className="text-lg font-bold" style={{ color: "#fff" }}>1$</span>
        </div>
        <span className="text-2xl font-bold uppercase">Plan</span>
      </div>
    ),
    modalContent: "💰 The exclusive Tissu subscription plan — only 1$! Details coming soon... 😉",
  },
  {
    id: "sealed-voucher",
    title: "Sealed Voucher",
    style: {
      background: "linear-gradient(135deg, #37474f, #263238)",
      color: "#fff",
    },
    className: "col-span-1 row-span-2",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-3 relative overflow-hidden">
        <span className="text-2xl font-bold">DON'T</span>
        <span className="text-lg font-semibold">OPEN</span>
        <div className="px-3 py-1 rounded text-xs" style={{ background: "#ff8a65", color: "#fff" }}>
          Confidential<br />
          <span className="text-[10px] opacity-70">Authorized only</span>
        </div>
        {/* Repeating SEALED text */}
        <div className="absolute bottom-2 left-0 right-0 text-center">
          <span className="text-xs uppercase tracking-widest opacity-50">SEALED SEALED SEALED SEALED</span>
        </div>
        {/* Rotated FUCKING text */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 rotate-90 origin-center">
          <span className="text-2xl font-bold uppercase" style={{ color: "#7c4dff" }}>FUCKING</span>
        </div>
      </div>
    ),
    modalContent: "🔒 This voucher is SEALED. You'll find out what's inside... eventually! 🤫",
  },
  {
    id: "love-forever",
    title: "I Love You Forever",
    style: {
      background: "linear-gradient(135deg, #81d4fa, #b3e5fc)",
      color: "#1565c0",
    },
    className: "col-span-1 row-span-1",
    content: (
      <div className="flex flex-col items-center justify-center h-full relative">
        {/* Heart sketch */}
        <svg width="80" height="70" viewBox="0 0 80 70" fill="none" className="absolute top-3 opacity-30">
          <path d="M40 65S5 40 5 20C5 8 15 2 25 2c7 0 12 4 15 9C43 6 48 2 55 2c10 0 20 6 20 18C75 40 40 65 40 65z" stroke="#e91e63" strokeWidth="2" fill="none"/>
        </svg>
        <span className="text-xl italic font-semibold mt-6" style={{ fontFamily: "'Georgia', serif", color: "#1565c0" }}>
          i love you
        </span>
        <span className="text-lg italic" style={{ fontFamily: "'Georgia', serif", color: "#e91e63" }}>
          forever
        </span>
      </div>
    ),
    modalContent: "💕 I love you forever and always, Tissu. You mean the world to me. ❤️",
  },
  {
    id: "stats",
    title: "Stats",
    style: {
      background: "linear-gradient(135deg, #f48fb1, #f06292)",
      color: "#fff",
    },
    className: "col-span-1 row-span-1",
    content: (
      <div className="flex items-center justify-center h-full">
        <span className="text-4xl font-black uppercase" style={{ color: "#4a148c" }}>STATS</span>
      </div>
    ),
    modalContent: "📊 Relationship stats will appear here... How many kisses? How many hugs? 💏",
  },
  {
    id: "sparkle",
    title: "Sparkle Of The Year",
    style: {
      background: "linear-gradient(135deg, #ffe0b2, #ffccbc)",
      color: "#5d4037",
    },
    className: "col-span-1 md:col-span-2 row-span-2",
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-2 px-4">
        <span className="text-3xl md:text-5xl italic font-bold" style={{ fontFamily: "'Georgia', serif", color: "#e8a087" }}>
          Sparkle
        </span>
        <span className="text-xl md:text-2xl font-semibold uppercase tracking-wider" style={{ color: "#5d4037" }}>
          Of The Year
        </span>
        <div className="flex items-center gap-6 mt-4 text-sm">
          <div className="text-center">
            <div className="font-bold" style={{ color: "#c2185b" }}>15 FEB</div>
            <div className="text-lg font-bold" style={{ color: "#c2185b" }}>2025</div>
          </div>
          <span className="text-2xl" style={{ color: "#5d4037" }}>—</span>
          <div className="text-center">
            <div className="font-bold" style={{ color: "#c2185b" }}>15 FEB</div>
            <div className="text-lg font-bold" style={{ color: "#c2185b" }}>2026</div>
          </div>
        </div>
      </div>
    ),
    modalContent: "✨ Sparkle of the Year — celebrating 365 days of love from Feb 2025 to Feb 2026! 🌟",
  },
];

const BirthdayDashboard = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  // Disable scroll when modal open
  useEffect(() => {
    if (activeCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeCard]);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveCard(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const active = cards.find((c) => c.id === activeCard);

  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{
        background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 30%, #f48fb1 60%, #ec407a 100%)",
      }}
    >
      {/* Watercolor-like overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20" style={{
        background: "radial-gradient(ellipse at 20% 50%, #e91e63 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, #f06292 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, #c2185b 0%, transparent 50%)",
      }} />

      {/* Grid layout matching reference */}
      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[160px]">
        {/* Row 1: Happy Birthday, Voice-Note, Subscription */}
        <DashCard card={cards[0]} onClick={() => setActiveCard(cards[0].id)} />
        <DashCard card={cards[1]} onClick={() => setActiveCard(cards[1].id)} />
        <DashCard card={cards[2]} onClick={() => setActiveCard(cards[2].id)} />
        {/* Sparkle takes right col, spanning 2 rows — placed here for grid flow on desktop */}
        <div className="hidden md:block md:row-span-2">
          <DashCard card={cards[6]} onClick={() => setActiveCard(cards[6].id)} fullHeight />
        </div>

        {/* Row 2: Sealed Voucher (tall), Love Forever, Stats */}
        <div className="md:row-span-2">
          <DashCard card={cards[3]} onClick={() => setActiveCard(cards[3].id)} fullHeight />
        </div>
        <DashCard card={cards[4]} onClick={() => setActiveCard(cards[4].id)} />
        <DashCard card={cards[5]} onClick={() => setActiveCard(cards[5].id)} />

        {/* Mobile-only sparkle */}
        <div className="md:hidden">
          <DashCard card={cards[6]} onClick={() => setActiveCard(cards[6].id)} />
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCard(null)}
            style={{ backdropFilter: "blur(8px)", background: "rgba(0,0,0,0.4)" }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl p-8 max-w-md w-full relative"
              style={{ background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveCard(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold"
                style={{ background: "#fce4ec", color: "#c2185b" }}
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#c2185b" }}>{active.title}</h2>
              <p className="text-lg" style={{ color: "#5d4037" }}>{active.modalContent}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface DashCardProps {
  card: typeof cards[0];
  onClick: () => void;
  fullHeight?: boolean;
}

const DashCard = ({ card, onClick, fullHeight }: DashCardProps) => (
  <motion.div
    whileHover={{ scale: 1.03, boxShadow: "0 12px 40px rgba(0,0,0,0.15)" }}
    transition={{ duration: 0.2 }}
    className={`rounded-2xl cursor-pointer overflow-hidden ${fullHeight ? "h-full" : "h-full"}`}
    style={{
      ...card.style,
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      minHeight: fullHeight ? "100%" : "160px",
    }}
    onClick={onClick}
  >
    <div className="p-4 h-full">{card.content}</div>
  </motion.div>
);

export default BirthdayDashboard;
