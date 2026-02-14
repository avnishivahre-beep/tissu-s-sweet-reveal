import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cards = [
  {
    id: "happy-birthday",
    title: "Happy Birthday!",
    fallbackBg: "linear-gradient(135deg, #fce4ec, #fff)",
    modalContent: "🎂 Wishing you the happiest birthday, Tissu! May all your dreams come true! 🎉",
  },
  {
    id: "voice-note",
    title: "Voice-Note <3",
    fallbackBg: "linear-gradient(135deg, #5d4037, #795548)",
    modalContent: "🎵 A special voice note will be placed here... Stay tuned! 💕",
  },
  {
    id: "subscription",
    title: "Subscription Plan",
    fallbackBg: "linear-gradient(135deg, #4a0e0e, #7b1a1a)",
    modalContent: "💰 The exclusive Tissu subscription plan — only 1$! Details coming soon... 😉",
  },
  {
    id: "sealed-voucher",
    title: "Sealed Voucher",
    fallbackBg: "linear-gradient(135deg, #37474f, #263238)",
    modalContent: "🔒 This voucher is SEALED. You'll find out what's inside... eventually! 🤫",
  },
  {
    id: "love-forever",
    title: "I Love You Forever",
    fallbackBg: "linear-gradient(135deg, #81d4fa, #b3e5fc)",
    modalContent: "💕 I love you forever and always, Tissu. You mean the world to me. ❤️",
  },
  {
    id: "stats",
    title: "Stats",
    fallbackBg: "linear-gradient(135deg, #f48fb1, #f06292)",
    modalContent: "📊 Relationship stats will appear here... How many kisses? How many hugs? 💏",
  },
  {
    id: "sparkle",
    title: "Sparkle Of The Year",
    fallbackBg: "linear-gradient(135deg, #ffe0b2, #ffccbc)",
    modalContent: "✨ Sparkle of the Year — celebrating 365 days of love from Feb 2025 to Feb 2026! 🌟",
  },
];

// Map card id to an image source — replace null with your imported image
const cardImages: Record<string, string | null> = {
  "happy-birthday": null,
  "voice-note": null,
  "subscription": null,
  "sealed-voucher": null,
  "love-forever": null,
  "stats": null,
  "sparkle": null,
};

const BirthdayDashboard = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = activeCard ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeCard]);

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
      {/* Watercolor overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20" style={{
        background: "radial-gradient(ellipse at 20% 50%, #e91e63 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, #f06292 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, #c2185b 0%, transparent 50%)",
      }} />

      {/* Desktop grid — 4 columns matching reference */}
      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[160px]">
        {/* Row 1 */}
        <CardSlot card={cards[0]} onClick={() => setActiveCard(cards[0].id)} />
        <CardSlot card={cards[1]} onClick={() => setActiveCard(cards[1].id)} />
        <CardSlot card={cards[2]} onClick={() => setActiveCard(cards[2].id)} />

        {/* Sparkle — right col, 2 rows tall (desktop) */}
        <div className="hidden md:block md:row-span-2">
          <CardSlot card={cards[6]} onClick={() => setActiveCard(cards[6].id)} fullHeight />
        </div>

        {/* Row 2 */}
        <div className="md:row-span-2">
          <CardSlot card={cards[3]} onClick={() => setActiveCard(cards[3].id)} fullHeight />
        </div>
        <CardSlot card={cards[4]} onClick={() => setActiveCard(cards[4].id)} />
        <CardSlot card={cards[5]} onClick={() => setActiveCard(cards[5].id)} />

        {/* Mobile sparkle */}
        <div className="md:hidden">
          <CardSlot card={cards[6]} onClick={() => setActiveCard(cards[6].id)} />
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

interface CardSlotProps {
  card: typeof cards[0];
  onClick: () => void;
  fullHeight?: boolean;
}

const CardSlot = ({ card, onClick, fullHeight }: CardSlotProps) => {
  const imageSrc = cardImages[card.id];

  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0 12px 40px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl cursor-pointer overflow-hidden h-full"
      style={{
        background: imageSrc ? undefined : card.fallbackBg,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        minHeight: fullHeight ? "100%" : "160px",
      }}
      onClick={onClick}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={card.title}
          className="w-full h-full object-cover"
          draggable={false}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center p-4">
          <span className="text-sm font-semibold opacity-60 text-center" style={{ color: "#fff" }}>
            {card.title}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default BirthdayDashboard;
