import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownScreenProps {
  targetDate: Date;
  onComplete: () => void;
}

const CountdownScreen = ({ targetDate, onComplete }: CountdownScreenProps) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) {
        onComplete();
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate, onComplete]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #f48fb1 100%)" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl p-10 md:p-16 text-center max-w-lg w-full mx-4"
        style={{
          background: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.4)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#880e4f" }}>
          Counting Every Second...
        </h1>
        <p className="text-lg mb-10" style={{ color: "#ad1457" }}>
          Until Tissu's Special Day 💕
        </p>

        <div className="grid grid-cols-4 gap-3 md:gap-6">
          {units.map((u) => (
            <div key={u.label} className="flex flex-col items-center">
              <motion.span
                key={u.value}
                initial={{ scale: 1.15, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-4xl md:text-6xl font-bold block"
                style={{ color: "#c2185b" }}
              >
                {String(u.value).padStart(2, "0")}
              </motion.span>
              <span className="text-xs md:text-sm mt-1 uppercase tracking-wider" style={{ color: "#ad1457" }}>
                {u.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CountdownScreen;
