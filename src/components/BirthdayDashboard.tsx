import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, Trophy, Zap, Smile, Pizza, FileText, Lock, Check, Sparkles, Play, Pause, Volume2, Mic, Clock, Shield, Mail, Image } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface Card {
  id: string;
  title: string;
  fallbackBg: string;
  modalContent: string;
  imgClass?: string;
}

const cards: Card[] = [
  {
    id: "happy-birthday",
    title: "Happy Birthday!",
    fallbackBg: "linear-gradient(135deg, #fce4ec, #fff)",
    modalContent: "🎂 Wishing you the happiest birthday, Tissu! May all your dreams come true! 🎉",
    imgClass: "object-fill", // Force fit to card size
  },
  {
    id: "voice-note",
    title: "Voice-Note <3",
    fallbackBg: "linear-gradient(135deg, #5d4037, #795548)",
    modalContent: "🎵 A special voice note will be placed here... Stay tuned! 💕",
  },
  {
    id: "subscription",
    title: "Lifetime Plan ❤️",
    fallbackBg: "linear-gradient(135deg, #4a0e0e, #7b1a1a)",
    modalContent: "💰 The exclusive Tissu subscription plan — only 1$! Details coming soon... 😉",
    imgClass: "object-fill", // Force fit to card size
  },
  {
    id: "sealed-voucher",
    title: "Sealed Voucher",
    fallbackBg: "linear-gradient(135deg, #37474f, #263238)",
    modalContent: "🔒 This voucher is SEALED. You'll find out what's inside... eventually! 🤫",
    imgClass: "object-cover",
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
  "happy-birthday": "/images/happy-birthday.png",
  "voice-note": "/images/voice-note.png",
  "subscription": "/images/subscription.png",
  "sealed-voucher": "/images/sealed-voucher.png",
  "love-forever": "/images/love-forever.png",
  "stats": "/images/stats.png",
  "sparkle": "/images/sparkle.png",
};

// Simple Firework Component using Framer Motion
const Fireworks = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <FireworkBurst key={i} delay={i * 0.5} />
      ))}
    </div>
  );
};

const FireworkBurst = ({ delay }: { delay: number }) => {
  const x = Math.random() * 80 + 10; // Random x position (10% to 90%)
  const y = Math.random() * 50 + 10; // Random y burst height (10% to 60% from top)
  const colors = ["#ff0", "#f0f", "#0ff", "#ff5722", "#4caf50", "#e91e63"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <motion.div
      initial={{ x: `${x}vw`, y: "110vh", scale: 0 }}
      animate={{ y: `${y}vh`, scale: 1 }}
      transition={{ duration: 1, delay: delay, ease: "easeOut" }}
      onAnimationComplete={() => { }}
      className="absolute"
    >
      {/* Explosion Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
          animate={{
            opacity: 0,
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            scale: [1, 0]
          }}
          transition={{ duration: 1.5, delay: delay + 1, ease: "easeOut" }}
          className="absolute rounded-full"
          style={{
            backgroundColor: color,
            width: `${Math.random() * 6 + 4}px`,
            height: `${Math.random() * 6 + 4}px`
          }}
        />
      ))}
    </motion.div>
  );
};

const BirthdayDashboard = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(true);

  // Stop celebration after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowCelebration(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  // Calculate days together (Assumed Start Date: Feb 15, 2025 based on "Sparkle of Year" context)
  const startDate = new Date(2025, 1, 15); // Month is 0-indexed
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const daysTogether = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

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
      {/* Celebration Effect */}
      {showCelebration && <Fireworks />}

      {/* Watercolor overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20" style={{
        background: "radial-gradient(ellipse at 20% 50%, #e91e63 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, #f06292 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, #c2185b 0%, transparent 50%)",
      }} />

      {/* Animated Floating Particles Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110vh", x: Math.random() * 100 - 50, opacity: 0 }}
            animate={{
              y: "-10vh",
              opacity: [0, 0.7, 0.7, 0],
              rotate: [0, 20, -20, 0]
            }}
            transition={{
              duration: 15 + Math.random() * 20, // Even slower for background
              repeat: Infinity,
              delay: Math.random() * 15,
              ease: "linear",
              times: [0, 0.1, 0.9, 1]
            }}
            className="absolute text-white/60 blur-[0.5px]"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 18 + 10}px`
            }}
          >
            {Math.random() > 0.6 ? "✨" : "❤️"}
          </motion.div>
        ))}
      </div>

      {/* Desktop grid — 5 columns matching 2026 reference */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 auto-rows-[220px]">
        {/* Row 1: Happy (1) | Voice (2) | Sub (2) */}
        <div className="md:col-span-1">
          <CardSlot card={cards[0]} onClick={() => setActiveCard(cards[0].id)} />
        </div>
        <div className="md:col-span-2">
          <CardSlot card={cards[1]} onClick={() => setActiveCard(cards[1].id)} />
        </div>
        <div className="md:col-span-2">
          <CardSlot card={cards[2]} onClick={() => setActiveCard(cards[2].id)} />
        </div>

        {/* Row 2: Voucher (1, tall) | Love (2) | Sparkle (2, tall) */}
        <div className="md:col-span-1 md:row-span-2">
          <CardSlot card={cards[3]} onClick={() => setActiveCard(cards[3].id)} fullHeight />
        </div>
        <div className="md:col-span-2">
          <CardSlot card={cards[4]} onClick={() => setActiveCard(cards[4].id)} />
        </div>
        <div className="md:col-span-2 md:row-span-2">
          <CardSlot card={cards[6]} onClick={() => setActiveCard(cards[6].id)} fullHeight />
        </div>

        {/* Row 3: Stats (2) — fits in the middle gap */}
        <div className="md:col-span-2">
          <CardSlot card={cards[5]} onClick={() => setActiveCard(cards[5].id)} />
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
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`rounded-[24px] relative w-full overflow-hidden ${active.id === 'stats' ? 'max-w-2xl h-[85vh]' :
                active.id === 'love-forever' ? 'max-w-3xl h-[85vh]' :
                  active.id === 'subscription' ? 'max-w-md h-[80vh]' :
                    active.id === 'voice-note' ? 'max-w-md min-h-[500px]' :
                      active.id === 'happy-birthday' ? 'max-w-lg min-h-[500px]' :
                        active.id === 'sealed-voucher' ? 'max-w-lg min-h-[600px]' :
                          active.id === 'sparkle' ? 'max-w-lg min-h-[600px]' :
                            'max-w-md p-10'
                }`}
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                border: "1px solid rgba(255,255,255,0.6)"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveCard(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold z-50 transition-transform hover:scale-110 shadow-sm"
                style={{ background: "#fce4ec", color: "#c2185b" }}
              >
                ✕
              </button>

              {active.id === 'stats' ? (
                <StatsContent daysTogether={daysTogether} />
              ) : active.id === 'love-forever' ? (
                <LoveLetterContent />
              ) : active.id === 'subscription' ? (
                <SubscriptionContent />
              ) : active.id === 'voice-note' ? (
                <VoiceNoteContent />
              ) : active.id === 'happy-birthday' ? (
                <BirthdayMessageContent />
              ) : active.id === 'sealed-voucher' ? (
                <VoucherContent />
              ) : active.id === 'sparkle' ? (
                <SparkleContent />
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-4" style={{ color: "#c2185b" }}>{active.title}</h2>
                  <p className="text-lg" style={{ color: "#5d4037" }}>{active.modalContent}</p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SparkleContent = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-2 relative overflow-hidden">
      <div className="max-w-md w-full relative z-10 text-center space-y-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-2">Sparkle Of The Year ✨</h2>
          <p className="text-slate-500 text-sm font-medium tracking-wide uppercase">Our Highlights & Memories Album</p>
        </motion.div>

        {/* Photo Grid Placeholder */}
        <div className="relative h-48 w-full flex items-center justify-center perspective-1000">
          {/* Fake Photos */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: i === 0 ? -10 : i === 1 ? 5 : -5 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="absolute w-32 h-40 bg-white p-2 shadow-lg border border-slate-100 transform"
              style={{
                left: i === 0 ? '15%' : i === 1 ? '50%' : 'auto',
                right: i === 2 ? '15%' : 'auto',
                zIndex: i,
                filter: 'blur(2px)'
              }}
            >
              <div className="w-full h-full bg-slate-200 flex items-center justify-center overflow-hidden">
                <Image className="w-8 h-8 text-slate-300" />
              </div>
            </motion.div>
          ))}

          {/* Construction Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl border border-pink-100 shadow-xl">
              <span className="text-pink-600 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Coming Soon
              </span>
            </div>
          </motion.div>
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-slate-600 font-serif italic text-sm leading-relaxed space-y-4 text-left"
        >
          <p className="font-bold text-slate-800 not-italic">I’m extremely sorry.</p>
          <p>
            This card was meant to be the most special one — a full highlight album of our year together.
            Photos, memories, little moments, inside jokes… everything.
          </p>
          <p>But I ran out of time.</p>
          <p>And I didn’t want to rush something that deserves to be perfect.</p>
          <p>
            This section is still under construction because our memories deserve more than a half-done effort.
            It will be completed properly — with all the sparkles it deserves.
          </p>
          <p className="text-right font-bold text-pink-500 not-italic pt-2">
            Stay tuned. 💖<br />
            <span className="text-slate-400 font-medium text-xs">— Laddu</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const VoucherContent = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'confirmed'>('idle');

  const handleConfirm = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('confirmed');
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-[#fdfbf7] relative overflow-hidden box-border">
      {/* Paper Texture Overlay */}
      <div className="absolute inset-0 opacity-50 pointer-events-none"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}
      />

      {/* Watermark - subtle */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none rotate-[-45deg]">
        <span className="text-8xl font-serif font-black uppercase text-slate-900">Confidential</span>
      </div>

      <div className="relative z-10 max-w-md w-full border border-slate-200 bg-white p-8 shadow-sm rounded-2xl">
        {/* Letter Header */}
        <div className="border-b border-slate-200 pb-4 mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-lg font-bold font-serif text-slate-900 uppercase tracking-widest">Confidential</h2>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Delivery Notice • Priority 1</p>
          </div>
          <Shield className="w-6 h-6 text-slate-800" />
        </div>

        {/* Content */}
        <div className="space-y-4 text-slate-600 font-serif leading-relaxed text-sm">
          <p className="font-bold text-slate-800">You have a sealed parcel waiting for you.</p>
          <p>
            A highly confidential mail containing exclusive attachments will be delivered to your inbox by tomorrow evening.
            The contents are strictly private.
          </p>
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-amber-900 text-xs italic my-4 text-center">
            "Please confirm your readiness to receive these documents."
          </div>
          <p className="text-right font-medium mt-4 text-xs text-slate-400">— Laddu Confidential Services 💌</p>
        </div>

        {/* Action */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
          <motion.button
            disabled={status !== 'idle'}
            whileHover={status === 'idle' ? { scale: 1.02 } : {}}
            whileTap={status === 'idle' ? { scale: 0.98 } : {}}
            onClick={handleConfirm}
            className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${status === 'confirmed'
              ? "bg-green-50 text-green-700 border border-green-200 cursor-default"
              : "bg-slate-900 text-white shadow-lg hover:bg-slate-800"
              }`}
          >
            {status === 'idle' && <>Accept & Confirm 📬</>}
            {status === 'loading' && (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                  <Mail className="w-4 h-4" />
                </motion.div>
                Verifying...
              </>
            )}
            {status === 'confirmed' && <>Confirmed ✔</>}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const BirthdayMessageContent = () => {
  const isBirthday = true;

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center relative overflow-hidden bg-gradient-to-b from-pink-50/50 to-white">

      {/* Subtle Glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 bg-pink-100/30 rounded-full blur-3xl pointer-events-none"
      />

      {/* Main Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 max-w-sm mx-auto space-y-8"
      >
        <div className="inline-block relative">
          <h2 className="text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600 mb-2 leading-tight">
            Happy 20th Birthday, Tissu 🎂💖
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="h-1 w-full bg-pink-200 rounded-full mx-auto"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-4 text-slate-600 font-serif text-lg leading-relaxed italic"
        >
          <p>Today is your day.</p>
          <p>Close your eyes, make a wish,<br />and believe that this year will be yours.</p>
          <p>May every dream you carry in your heart<br />start turning into reality from this moment.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="pt-6 flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-2 text-pink-400 font-medium text-sm">
            <Clock className="w-4 h-4 animate-pulse" />
            <span>It’s 00:00</span>
          </div>
          <p className="text-slate-400 text-sm italic">"Make a wish… ✨"</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

const VoiceNoteContent = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle Play/Pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update progress bar
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  // Set duration on load
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Handle manual seek
  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const newTime = (value[0] / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
  };

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Format time (mm:ss)
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden p-8">
      {/* Floating Hearts Animation when playing - subtle */}
      {isPlaying && (
        <div className="absolute inset-0 pointer-events-none opacity-50">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -100, opacity: [0, 1, 0] }}
              transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
              className="absolute text-pink-300"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${50 + Math.random() * 30}%`,
                fontSize: `${1 + Math.random()}rem`
              }}
            >
              ❤️
            </motion.div>
          ))}
        </div>
      )}

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8 relative z-10"
      >
        <span className="bg-pink-100 text-pink-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
          Exclusive Content
        </span>
        <h2 className="text-3xl font-serif font-bold text-slate-800 mb-1">A Message For You 🎧</h2>
        <p className="text-slate-400 text-sm font-medium">From Laddu</p>
      </motion.div>

      {/* Main Player Circle */}
      <div className="relative mb-8 z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center shadow-xl shadow-pink-200 relative z-10 transition-all"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-white fill-white" />
          ) : (
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          )}
        </motion.button>
        {/* Pulsing Ring */}
        {isPlaying && (
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 bg-pink-400 rounded-full blur-lg -z-10"
          />
        )}
      </div>

      {/* Waveform Visualization (Animated CSS Bars) */}
      <div className="flex items-center justify-center gap-1 h-8 mb-6 w-full max-w-xs opacity-80">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={isPlaying ? { height: [5, 15 + Math.random() * 20, 5] } : { height: 5 }}
            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
            className="w-1 bg-pink-300 rounded-full"
          />
        ))}
      </div>

      {/* Progress & Controls */}
      <div className="w-full max-w-xs space-y-4 relative z-10 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        {/* Time Display */}
        <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
          <span>{audioRef.current ? formatTime(audioRef.current.currentTime) : "00:00"}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Seek Slider */}
        <Slider
          value={[progress]}
          max={100}
          step={1}
          onValueChange={handleSeek}
          className="cursor-pointer"
        />

        {/* Volume Control */}
        <div className="flex items-center gap-3 pt-1">
          <Volume2 className="w-3 h-3 text-slate-400" />
          <Slider
            value={[volume]}
            max={1}
            step={0.1}
            onValueChange={handleVolumeChange}
            className="w-16"
          />
        </div>
      </div>

      {/* Footer Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 text-slate-300 text-xs font-serif italic"
      >
        "Close your eyes and listen 💌"
      </motion.p>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="/audio/voice-note.m4a"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

const SubscriptionContent = () => {
  const [step, setStep] = useState<'details' | 'confirm' | 'loading' | 'active'>('details');
  const [progress, setProgress] = useState(0);
  const [loadingMsg, setLoadingMsg] = useState("Initializing love protocol...");
  const [shake, setShake] = useState(false);

  const features = [
    "24/7 Emotional Support",
    "Unlimited Hugs (Virtual + Real)",
    "Free Motivation Calls",
    "Mood Swing Management",
    "Custom Birthday Celebrations",
    "Premium Care Package",
    "Lifetime Loyalty Guarantee"
  ];

  const loadingMessages = [
    "Verifying feelings...",
    "Checking loyalty status...",
    "Locking in forever...",
    "Finalizing cuddles...",
    "Almost there..."
  ];

  const handleWaitClick = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const startActivation = () => {
    setStep('loading');
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 5;
      if (p > 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setStep('active'), 500);
      }
      setProgress(p);
      setLoadingMsg(loadingMessages[Math.floor((p / 100) * loadingMessages.length)] || "Finishing up...");
    }, 150);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 relative overflow-hidden">
      {/* Confetti Effect on Activation */}
      {step === 'active' && (
        <div className="absolute inset-0 pointer-events-none z-50 flex justify-center overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -50, opacity: 1 }}
              animate={{ y: 800, rotate: 360, opacity: 0 }}
              transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 0.5 }}
              className="absolute text-2xl"
              style={{ left: `${Math.random() * 100}%`, color: ["#ec4899", "#f43f5e", "#fbbf24"][Math.floor(Math.random() * 3)] }}
            >
              {Math.random() > 0.5 ? "❤️" : "✨"}
            </motion.div>
          ))}
        </div>
      )}

      {/* Header (Always Visible unless full screen overlay takes over, but we'll keep it for context) */}
      <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white p-6 text-center relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles className="w-32 h-32" />
        </div>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block shadow-sm">
            Lifetime Plan
          </span>
          <h2 className="text-2xl font-bold font-serif mb-1">Subscribe to Laddu Premium 💘</h2>
          <p className="text-pink-100 font-medium opacity-90 text-sm">Unlimited Love. No Expiry.</p>
        </motion.div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {/* STEP 1: DETAILS */}
          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute inset-0 flex flex-col"
            >
              <ScrollArea className="flex-1 px-6 py-6">
                <div className="max-w-md mx-auto space-y-6">
                  <div className="text-center">
                    <div className="flex items-end justify-center gap-1 text-slate-800">
                      <span className="text-4xl font-bold">₹0</span>
                      <span className="text-lg text-slate-500 mb-1 font-medium">/ forever</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Billed as unlimited love & attention</p>
                  </div>

                  <div className="space-y-3 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                    {features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 + (idx * 0.05) }}
                        className="flex items-center gap-3"
                      >
                        <div className="p-1 bg-green-100 rounded-full shrink-0">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-slate-700 font-medium text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="text-center space-y-1 text-[10px] text-slate-400">
                    <p>Cancellation Policy: Not Allowed 😌</p>
                    <p>Refund Policy: Non-Refundable (Too Late Now)</p>
                  </div>
                </div>
              </ScrollArea>

              <div className="p-6 bg-white border-t border-slate-100">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep('confirm')}
                  className="w-full py-3.5 rounded-xl font-bold text-lg shadow-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-pink-200 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Activate Forever Plan ❤️
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: CONFIRMATION */}
          {step === 'confirm' && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-white/80 backdrop-blur-sm z-10"
            >
              <div className="bg-white p-8 rounded-3xl shadow-2xl border border-pink-100 text-center max-w-sm w-full relative">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-4xl mb-4"
                >
                  🤔
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Are You Sure? 😌</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Subscribing means unlimited love, no escape, and permanent cuddles.
                </p>

                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startActivation}
                    className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg shadow-pink-200"
                  >
                    Yes, I’m Yours Forever 💖
                  </motion.button>

                  <div className="relative">
                    <motion.button
                      animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
                      transition={{ duration: 0.4 }}
                      onClick={handleWaitClick}
                      className="w-full py-3 rounded-xl font-semibold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      Wait… Let Me Think 🤭
                    </motion.button>
                    {shake && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -right-4 -top-8 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap"
                      >
                        Too Late 😏
                        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45" />
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: LOADING */}
          {step === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-white z-20"
            >
              <div className="relative mb-8">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  <Heart className="w-20 h-20 text-pink-500 fill-pink-500" />
                </motion.div>
                {/* Floating particles */}
                <motion.div
                  animate={{ y: -40, opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  className="absolute top-0 right-0 text-pink-400"
                >✨</motion.div>
                <motion.div
                  animate={{ y: -40, opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
                  className="absolute top-0 left-0 text-pink-400"
                >❤️</motion.div>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-2">Activating Lifetime Plan...</h3>
              <p className="text-slate-500 h-6 mb-6 font-medium text-sm">{loadingMsg}</p>

              <div className="w-64 h-3 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-400 to-rose-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          )}

          {/* STEP 4: ACTIVE (SUCCESS) */}
          {step === 'active' && (
            <motion.div
              key="active"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-white z-20"
            >
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-pink-100 rounded-full blur-xl opacity-50 animate-pulse" />
                <Check className="w-24 h-24 text-green-500 relative z-10" />
              </div>

              <h3 className="text-3xl font-bold text-slate-800 mb-2 text-center">Subscription Activated 💘</h3>
              <p className="text-slate-500 text-center text-lg mb-8 max-w-xs">
                You are officially stuck with Laddu Forever.
              </p>

              <div className="py-3 px-8 rounded-xl font-bold text-lg bg-green-500 text-white shadow-lg shadow-green-200 cursor-default flex items-center gap-2">
                Activated ✔
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const LoveLetterContent = () => {
  const paragraphs = [
    "Oyeeeeee bhaiiii ka bdyyyyy haiiiii 🥳😝🤙",
    "Aur meri jaaan, 20 saal ki bohot bohot mubarakaaa tujheeee ❤️ Yaar sach me pata hi nahi chala kab tu itni jaldi 20 ki ho gayi. Matlab maine tujhe dekha tha jab tu 16 ki thi… aur aaj tu 20 me lag rahi hai. Time sach me udd gaya.",
    "I know thoda sa ajeeb lag raha hoga… kaun 19 khatam karke 20 me jana chahta hai 😌 Par tension mat le is baat ka ki 20 aa gaya aur abhi tak tu kuch nahi kar paayi. Haan thoda late hai tu 😝 par tere case me cheezein late hoti hain… par hoti sab sahi hi hain. Isliye is saal teri har birthday wish puri hogi jo tu dil se chahegi.",
    "Last year wali nahi hui? Koi baat nahi. Is saal hogi. Aur is saal tu kuch karke dikha degi. Bas ye exam nikal le… ye hi meri sabse badi wish hai tere liye. College mil jaye tujhe… aur waha jaake duniya asli Trisha ko dekhe.",
    "Wo Trisha jo thodi si khoi hui hai… par jiske andar itna potential hai ki duniya hila de. Tu sab kar legi. Sabse acha karegi. Mujhe pura yakeen hai. Bas uth… focus kar… ye exam nikal le. Fir sab sahi ho jayega.",
    "Mujhe pata hai tu birthday ko leke itni khush isliye nahi hai kyunki tujhe darr lagta hai… family ki baatein… expectations… pressure. Par sun — zyada mat soch. Agar tujhe apna 20 enjoy karna hai, toh apni life ke liye lad. Main hoon na tere saath.",
    "Rona thoda kam kar 😌 Apni habits sudhar. Routine set kar. Goals bana. Productive reh. Health ka dhyan rakh. Bas ye sab chahiye mujhe tere se. Baaki duniya apne aap line me aa jayegi.",
    "Is baar bohot mann tha tera birthday tere saath tension-free celebrate karne ka… last year jaisa nahi. Par conditions aisi ho gayi ki possible nahi ho paya. Par jis din tu Delhi aayegi na… us din tera birthday aise manayenge ki yaad rakh le tu 😌 sabse best.",
    "I love you so much yaar. Sab kuch karna chahta hoon tere liye… kabhi kabhi nahi ho pata toh uske liye udaas mat hua kar. Jo bhi meri baat tujhe hurt kare, mujhe bata diya kar. Par raat me mere sone ke baad akele me mat roya kar… please.",
    "Main hoon na. Museebat me kaise chhod sakta hoon tujhe? Baatein share kiya kar. Hum dono milke sab sahi kar denge.",
    "Apna birthday mast banana. Khush reh. Haste reh. Khub kha pee. Top kar. Naam kama. Aur sabse zaroori — apna 20 enjoy kar.",
    "I love you meri jaan ❤️ I love youuu my butterfly 😘🫂"
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 md:p-12 relative overflow-hidden">
      {/* Background Hearts */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 text-pink-200 pointer-events-none"
      >
        <Heart className="w-16 h-16 fill-current" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 right-10 text-pink-200 pointer-events-none"
      >
        <Heart className="w-24 h-24 fill-current" />
      </motion.div>

      <div className="relative z-10 max-w-2xl text-center w-full h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex-shrink-0"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-pink-600 font-bold mb-2">
            To My Butterfly 💌
          </h2>
          <div className="h-1 w-24 bg-pink-300 mx-auto rounded-full" />
        </motion.div>

        <ScrollArea className="flex-1 pr-4 -mr-4">
          <div className="space-y-6 text-lg md:text-xl text-slate-700 font-serif leading-relaxed italic pb-12">
            {paragraphs.map((para, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (idx * 0.1), duration: 0.8 }}
              >
                {para}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="mt-12 text-right"
            >
              <p className="text-xl font-bold text-pink-500 font-serif">
                — Your ladduuu 🥺💛
              </p>
            </motion.div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

const StatsContent = ({ daysTogether }: { daysTogether: number }) => {
  const sections = [
    {
      title: "Timeline Stats",
      icon: <FileText className="w-5 h-5 text-pink-500" />,
      items: [
        { label: "Days Together", value: daysTogether.toString(), percent: 100, color: "bg-pink-400" },
        { label: "Months of Chaos", value: Math.floor(daysTogether / 30).toString(), percent: 100, color: "bg-pink-300" },
        { label: "Years of Loving Me", value: (daysTogether / 365).toFixed(1), percent: 100, color: "bg-pink-500" },
        { label: 'Total "I miss you" messages', value: "∞", percent: 100, color: "bg-rose-400" },
        { label: "Countdown refreshes", value: "273+", percent: 85, color: "bg-rose-300" }
      ]
    },
    {
      title: "Boyfriend Performance",
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      items: [
        { label: "Good Boyfriend Days", value: "82%", percent: 82, color: "bg-green-400" },
        { label: "Mildly Annoying Days", value: "14%", percent: 14, color: "bg-yellow-400" },
        { label: "Emotionally Clueless", value: "3%", percent: 3, color: "bg-red-400" },
        { label: "Smart & Attractive", value: "100%", percent: 100, color: "bg-blue-400" },
        { label: "Argue Win Rate (Her)", value: "0%", percent: 5, color: "bg-purple-300" },
        { label: "Argue Win Rate (Me)", value: "Classified", percent: 99, color: "bg-gray-400" }
      ]
    },
    {
      title: "Intelligence & Behavior",
      icon: <Smile className="w-5 h-5 text-blue-500" />,
      items: [
        { label: "Sarcasm Level", value: "Expert", percent: 95, color: "bg-indigo-400" },
        { label: "Overthinking", value: "Max", percent: 98, color: "bg-indigo-300" },
        { label: "Mood Swings Handled", value: "97%", percent: 97, color: "bg-blue-400" },
        { label: "Fake Anger Detect", value: "92%", percent: 92, color: "bg-blue-300" },
        { label: "“Are you okay?” Delay", value: "3s", percent: 15, color: "bg-cyan-400" }
      ]
    },
    {
      title: "Emotional Stats",
      icon: <Heart className="w-5 h-5 text-red-500" />,
      items: [
        { label: "Heartbeats Skipped", value: "Too Many", percent: 100, color: "bg-red-400" },
        { label: "Phone Checks", value: "Embarrassing", percent: 90, color: "bg-red-300" },
        { label: "Comfort Rank", value: "Elite Tier", percent: 100, color: "bg-rose-400" },
        { label: "Love Level", value: "Lifetime", percent: 100, color: "bg-pink-500" }
      ]
    },
    {
      title: "Lifestyle Stats",
      icon: <Pizza className="w-5 h-5 text-orange-500" />,
      items: [
        { label: "Food Stealing", value: "14 Confirmed", percent: 65, color: "bg-orange-400" },
        { label: "Late Night Talks", value: "Unlimited", percent: 100, color: "bg-amber-400" },
        { label: "Silly Laughs", value: "500+", percent: 90, color: "bg-yellow-400" },
        { label: "Cuteness Overload", value: "Daily", percent: 100, color: "bg-pink-400" }
      ]
    },
    {
      title: "Awards & Titles",
      icon: <Trophy className="w-5 h-5 text-yellow-600" />,
      items: [
        { label: "Best Girlfriend", value: "🥇 Always", percent: 100, color: "bg-yellow-400" },
        { label: "Drama Queen", value: "Occasional", percent: 40, color: "bg-purple-400" },
        { label: "Mood Swing Champ", value: "Reigning", percent: 100, color: "bg-fuchsia-400" },
        { label: "Love of My Life", value: "Permanent", percent: 100, color: "bg-rose-500" }
      ]
    },
    {
      title: "Sarcastic Fine Print",
      icon: <FileText className="w-5 h-5 text-slate-500" />,
      items: [
        { label: "Complaints Filed", value: "42", percent: 42, color: "bg-slate-400" },
        { label: "Complaints Valid", value: "5", percent: 12, color: "bg-emerald-400" },
        { label: "Complaints Ignored", value: "37", percent: 88, color: "bg-red-400" },
        { label: "Times She Was Right", value: "…Okay fine, most of them.", percent: 100, color: "bg-pink-500" }
      ]
    },
    {
      title: "Lifetime Contract",
      icon: <Lock className="w-5 h-5 text-purple-500" />,
      items: [
        { label: "Subscription", value: "No Refund", percent: 100, color: "bg-purple-500" },
        { label: "Cancellation", value: "Prohibited", percent: 0, color: "bg-gray-300" },
        { label: "Ownership", value: "Mutual", percent: 100, color: "bg-pink-500" }
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-50/50">
      <div className="px-8 pt-8 pb-6 border-b border-pink-100/50 bg-white/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-7 h-7 text-pink-500 fill-pink-500 animate-pulse" />
          <h2 className="text-3xl font-bold font-serif text-gray-800 tracking-tight">
            Relationship Report Card 💖
          </h2>
        </div>
        <p className="text-sm text-pink-400 font-medium pl-10">
          Certified Accurate • 100% Bias Free • Issued with Love
        </p>
      </div>

      <ScrollArea className="flex-1 px-8 py-6">
        <div className="space-y-8 pb-10">
          {sections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-50">
                <div className="p-2 bg-pink-50 rounded-lg">
                  {section.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800">{section.title}</h3>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {section.items.map((item, itemIdx) => (
                  <StatRow key={item.label} item={item} delay={(idx * 0.1) + (itemIdx * 0.05)} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

interface CardSlotProps {
  card: Card;
  onClick: () => void;
  fullHeight?: boolean;
}

const CardSlot = ({ card, onClick, fullHeight }: CardSlotProps) => {
  const imageSrc = cardImages[card.id];
  const [imgError, setImgError] = useState(false);
  const isLoveLetter = card.id === "love-forever";
  const isSubscription = card.id === "subscription";
  const isVoiceNote = card.id === "voice-note";
  const isBirthdayCard = card.id === "happy-birthday";
  const isVoucher = card.id === "sealed-voucher";
  const isSparkle = card.id === "sparkle";

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: isLoveLetter
          ? "0 20px 50px rgba(236, 64, 122, 0.3)"
          : isSubscription
            ? "0 20px 50px rgba(251, 191, 36, 0.3)"
            : isVoiceNote
              ? "0 20px 50px rgba(236, 72, 153, 0.3)"
              : isBirthdayCard
                ? "0 20px 60px rgba(244, 114, 182, 0.5)"
                : isVoucher
                  ? "0 20px 60px rgba(251, 191, 36, 0.4)"
                  : isSparkle
                    ? "0 20px 60px rgba(255, 215, 0, 0.5)"
                    : "0 15px 40px rgba(0,0,0,0.12)"
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="rounded-3xl cursor-pointer overflow-hidden h-full relative group border border-white/40"
      style={{
        background: (imageSrc && !imgError) ? undefined : card.fallbackBg,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        minHeight: fullHeight ? "100%" : "220px",
      }}
      onClick={onClick}
    >
      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-white/5 pointer-events-none z-20 group-hover:bg-white/10 transition-colors duration-500" />

      {/* Soft Highlight Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
      {/* Background Pulse for Love Letter */}
      {isLoveLetter && (
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 z-0 bg-pink-500 mix-blend-overlay"
        />
      )}

      {/* Background Pulse for Subscription */}
      {isSubscription && (
        <motion.div
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 z-0 bg-gradient-to-br from-red-900/20 to-pink-900/20 mix-blend-overlay"
        />
      )}

      {/* Magical Glow for Birthday Card */}
      {isBirthdayCard && (
        <>
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 z-0 bg-gradient-to-br from-pink-400/30 to-purple-400/30 mix-blend-overlay"
          />
          <div className="absolute inset-0 z-0 opacity-30">
            <Sparkles className="absolute top-2 right-2 w-6 h-6 text-yellow-200 animate-pulse" />
            <Sparkles className="absolute bottom-4 left-4 w-4 h-4 text-pink-200 animate-pulse delay-75" />
          </div>
        </>
      )}

      {/* Sealed Voucher Overlay */}
      {isVoucher && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center shadow-lg border-4 border-red-900/50"
            >
              <Lock className="w-8 h-8 text-red-100" />
            </motion.div>
          </div>
          <div className="mt-4 text-center">
            <span className="bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
              Confidential
            </span>
          </div>
        </div>
      )}

      {/* Sparkle Overlay */}
      {isSparkle && (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
              className="absolute text-white/80"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            >
              <Sparkles className="w-3 h-3" />
            </motion.div>
          ))}
          <motion.div
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-tr from-yellow-100/20 to-white/20 mix-blend-overlay"
          />
        </div>
      )}

      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full">
        {isSubscription && (
          <div className="absolute top-0 right-0 z-20">
            <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded-bl-lg shadow-sm uppercase tracking-wider">
              Most Popular
            </span>
          </div>
        )}

        {(imageSrc && !imgError) ? (
          <img
            src={imageSrc}
            alt={card.title}
            className={`w-full h-full ${card.imgClass || "object-cover"}`}
            draggable={false}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
            {isLoveLetter && <Heart className="w-8 h-8 text-white mb-2 animate-bounce" />}
            {isSubscription && <Sparkles className="w-8 h-8 text-yellow-200 mb-2 animate-pulse" />}
            <span className="text-sm font-semibold opacity-90 text-white shadow-sm">
              {card.title}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

interface StatItem {
  label: string;
  value: string;
  percent: number;
  color: string;
}

const StatRow = ({ item, delay }: { item: StatItem; delay: number }) => {
  return (
    <div className="group">
      <div className="flex justify-between items-end mb-1.5">
        <span className="text-sm font-semibold text-slate-600 group-hover:text-pink-600 transition-colors">
          {item.label}
        </span>
        <span className="text-sm font-bold text-slate-800">
          {item.value}
        </span>
      </div>
      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${item.color}`}
          initial={{ width: 0 }}
          animate={{ width: `${item.percent}%` }}
          transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default BirthdayDashboard;
