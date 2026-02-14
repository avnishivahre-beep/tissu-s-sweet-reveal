import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountdownScreen from "@/components/CountdownScreen";
import BirthdayDashboard from "@/components/BirthdayDashboard";

const BIRTHDAY = new Date(2026, 1, 15, 0, 0, 0); // Feb 15 2026, 00:00 local time

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(() => new Date() >= BIRTHDAY);

  const handleCountdownComplete = useCallback(() => {
    setShowDashboard(true);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!showDashboard ? (
        <motion.div
          key="countdown"
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
        >
          <CountdownScreen targetDate={BIRTHDAY} onComplete={handleCountdownComplete} />
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <BirthdayDashboard />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
