import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AnniversaryPayload } from "@/lib/celebration-types";
import { EVENT_META } from "@/lib/celebration-types";
import { FloatingHearts } from "@/components/celebration/FloatingHearts";
import { HeartCatchGame } from "@/components/celebration/HeartCatchGame";
import { ConfettiBurst, ConfettiRain, fireConfetti } from "@/components/celebration/Confetti";
import { MusicPlayer } from "@/components/celebration/MusicPlayer";

type Step = "loading" | "ourday" | "happy" | "game" | "memories" | "wish" | "lovesent";

export function AnniversaryExperience({ payload }: { payload: AnniversaryPayload }) {
  const meta = EVENT_META.anniversary;
  const [step, setStep] = useState<Step>("loading");
  const [hearts, setHearts] = useState<{ id: number; left: number }[]>([]);

  useEffect(() => {
    if (step !== "loading") return;
    const id = setTimeout(() => setStep("ourday"), 2200);
    return () => clearTimeout(id);
  }, [step]);

  const days = (() => {
    if (!payload.marriageDate) return 0;
    const diff = Date.now() - new Date(payload.marriageDate).getTime();
    return Math.max(0, Math.floor(diff / 86400000));
  })();

  const sendLove = () => {
    setStep("lovesent");
    fireConfetti();
    const burst = Array.from({ length: 30 }).map((_, i) => ({ id: Date.now() + i, left: Math.random() * 100 }));
    setHearts(burst);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "radial-gradient(800px 600px at 20% 0%, #ef444466, transparent), radial-gradient(800px 600px at 80% 100%, #a855f766, transparent), #100422" }}>
      <FloatingHearts count={14} color="#fb7185" />
      <MusicPlayer youtubeId={payload.musicYoutubeId || meta.youtubeId} title={meta.songTitle} />
      {step === "lovesent" && <ConfettiRain active />}

      {/* Bonus floating hearts on send love */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="fixed text-3xl pointer-events-none"
          style={{ left: `${h.left}%`, bottom: 0, zIndex: 30 }}
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: -window.innerHeight - 100, opacity: 0 }}
          transition={{ duration: 3 + Math.random() * 2 }}
        >❤️</motion.div>
      ))}

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {step === "loading" && (
            <motion.div key="ld" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <motion.div className="text-7xl mb-4" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>💍</motion.div>
              <p className="text-2xl text-white/90">Loading something special…</p>
            </motion.div>
          )}
          {step === "ourday" && (
            <motion.div key="od" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <h1 className="text-5xl md:text-6xl font-black mb-6" style={{ background: meta.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                It's OUR special day ❤️
              </h1>
              <p className="text-white/80 mb-8">I made something special for you…</p>
              <button
                onClick={() => setStep("happy")}
                className="px-8 py-3.5 rounded-2xl text-white font-semibold hover:scale-105 transition"
                style={{ background: meta.gradient, boxShadow: "0 0 40px #ec489988" }}
              >
                Start our journey ✨
              </button>
            </motion.div>
          )}
          {step === "happy" && (
            <motion.div key="hp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <ConfettiBurst trigger="hp" />
              <h1 className="text-4xl md:text-6xl font-black text-white text-shadow-glow mb-4">
                Happy Anniversary, cutie pie 💞
              </h1>
              <p className="text-xl text-white/90 mb-2">We've been together for</p>
              <p className="text-6xl md:text-7xl font-black my-3" style={{ background: meta.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {days.toLocaleString()}
              </p>
              <p className="text-xl text-white/90 mb-8">days and counting…</p>
              <button onClick={() => setStep("game")} className="px-7 py-3 rounded-2xl glass text-white font-semibold hover:scale-105 transition">
                Continue our story →
              </button>
            </motion.div>
          )}
          {step === "game" && (
            <motion.div key="gm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center max-w-md w-full">
              <h2 className="text-2xl font-bold text-white mb-4">A silly little game 🎮</h2>
              <HeartCatchGame onWin={() => { fireConfetti(); setTimeout(() => setStep("memories"), 600); }} />
            </motion.div>
          )}
          {step === "memories" && (
            <motion.div key="mm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl w-full">
              <div className="text-center mb-6">
                <p className="text-white/80">Perfect! 💯</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Our beautiful memories ✨</h2>
              </div>
              {payload.photos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {payload.photos.map((p, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="rounded-2xl overflow-hidden glass"
                    >
                      <img src={p} alt="" className="object-cover aspect-square w-full" />
                      <p className="text-xs text-center text-white/70 py-2">💗</p>
                    </motion.div>
                  ))}
                </div>
              ) : <p className="text-center text-white/60">More memories to make 💞</p>}
              <div className="text-center mt-8">
                <button onClick={() => setStep("wish")} className="px-8 py-3.5 rounded-2xl text-white font-semibold hover:scale-105 transition" style={{ background: meta.gradient }}>
                  Special message for you →
                </button>
              </div>
            </motion.div>
          )}
          {step === "wish" && (
            <motion.div key="ws" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl w-full">
              <div className="glass p-6 md:p-8 text-left">
                <p className="text-sm text-white/60 mb-2">From {payload.fromName}</p>
                <p className="whitespace-pre-wrap text-lg leading-relaxed text-white">{payload.message}</p>
              </div>
              <div className="text-center mt-6">
                <button onClick={sendLove} className="px-8 py-3.5 rounded-2xl text-white font-semibold hover:scale-105 transition" style={{ background: meta.gradient, boxShadow: "0 0 40px #ec489988" }}>
                  Send love 💖
                </button>
              </div>
            </motion.div>
          )}
          {step === "lovesent" && (
            <motion.div key="ls" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <div className="text-8xl mb-4">💞</div>
              <h1 className="text-4xl md:text-5xl font-black text-white text-shadow-glow">Love sent ❤️</h1>
              <p className="text-white/80 mt-3">Here's to many more years, {payload.toName} ✨</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}