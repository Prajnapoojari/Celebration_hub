import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProposalPayload } from "@/lib/celebration-types";
import { EVENT_META } from "@/lib/celebration-types";
import { Typewriter } from "@/components/celebration/Typewriter";
import { FloatingHearts } from "@/components/celebration/FloatingHearts";
import { RunawayButton } from "@/components/celebration/RunawayButton";
import { ConfettiBurst, ConfettiRain, fireConfetti } from "@/components/celebration/Confetti";
import { Fireworks } from "@/components/celebration/Fireworks";
import { MusicPlayer } from "@/components/celebration/MusicPlayer";

type Step = "landing" | "surprises" | "messages" | "memories" | "proposal" | "yes";

const MESSAGES = [
  "I have been wanting to say this for so long…",
  "You make every ordinary moment feel like magic ✨",
  "You are my favorite notification 💕",
  "You make my whole world brighter 🌙",
];

export function ProposalExperience({ payload }: { payload: ProposalPayload }) {
  const meta = EVENT_META.proposal;
  const [step, setStep] = useState<Step>("landing");
  const [msgIdx, setMsgIdx] = useState(0);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "radial-gradient(800px 600px at 20% 10%, #5b21b6aa, transparent), radial-gradient(800px 600px at 80% 80%, #2563eb88, transparent), #0a0420" }}>
      <FloatingHearts count={20} />
      <MusicPlayer youtubeId={payload.musicYoutubeId || meta.youtubeId} title={meta.songTitle} />
      {step === "yes" && <Fireworks active />}
      {step === "yes" && <ConfettiRain active />}

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {step === "landing" && (
            <motion.div key="l" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center max-w-xl">
              <div className="text-7xl mb-4">❤️</div>
              <h1 className="text-4xl md:text-5xl font-bold text-white text-shadow-glow mb-3">
                For you, {payload.toName}
              </h1>
              <p className="text-white/80 mb-8 italic">
                {payload.loveQuote || "Every love story is beautiful, but ours is my favorite."}
              </p>
              <button
                onClick={() => setStep("surprises")}
                className="px-8 py-3.5 rounded-2xl font-semibold text-white hover:scale-105 transition"
                style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)", boxShadow: "0 0 40px #ec489988" }}
              >
                Start the surprise ❤️
              </button>
            </motion.div>
          )}

          {step === "surprises" && (
            <motion.div key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <div className="text-6xl mb-4">💖</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Do you like surprises?</h2>
              <div className="flex items-center justify-center gap-6 relative h-20">
                <button
                  onClick={() => { setStep("messages"); fireConfetti({ particleCount: 200, spread: 160 }); }}
                  className="px-8 py-3 rounded-2xl text-white font-semibold hover:scale-110 transition"
                  style={{ background: "linear-gradient(135deg, #ec4899, #f43f5e)" }}
                >
                  Yes 💖
                </button>
                <RunawayButton className="px-8 py-3 rounded-2xl glass text-white font-semibold">
                  No 😅
                </RunawayButton>
              </div>
            </motion.div>
          )}

          {step === "messages" && (
            <motion.div key="m" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center max-w-2xl">
              <Typewriter
                key={msgIdx}
                text={MESSAGES[msgIdx]}
                className="text-2xl md:text-3xl text-white text-shadow-glow"
              />
              <div className="mt-10">
                <button
                  onClick={() => {
                    if (msgIdx + 1 < MESSAGES.length) setMsgIdx((i) => i + 1);
                    else setStep("memories");
                  }}
                  className="px-7 py-3 rounded-2xl glass text-white font-semibold hover:scale-105 transition"
                >
                  {msgIdx + 1 < MESSAGES.length ? "Next →" : "Continue ❤️"}
                </button>
              </div>
            </motion.div>
          )}

          {step === "memories" && (
            <motion.div key="g" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">Some of my favorite moments…</h2>
              <p className="text-center text-white/70 mb-8">with you</p>
              {payload.photos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {payload.photos.map((p, i) => (
                    <motion.img
                      key={i}
                      src={p}
                      alt=""
                      className="rounded-2xl object-cover aspect-square border border-white/20"
                      initial={{ opacity: 0, y: 30, rotate: -3 + i }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-white/60">…and many more to come 💞</p>
              )}
              <div className="text-center mt-10">
                <button
                  onClick={() => setStep("proposal")}
                  className="px-8 py-3.5 rounded-2xl text-white font-semibold hover:scale-105 transition"
                  style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)", boxShadow: "0 0 40px #8b5cf688" }}
                >
                  One more thing →
                </button>
              </div>
            </motion.div>
          )}

          {step === "proposal" && (
            <motion.div key="p" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center max-w-xl">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="text-8xl mb-6"
              >
                ❤️
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-black text-white text-shadow-glow mb-8">
                Will you be mine forever? 💍
              </h2>
              <div className="flex items-center justify-center gap-6 relative h-20">
                <button
                  onClick={() => { setStep("yes"); fireConfetti({ particleCount: 300, spread: 180 }); }}
                  className="px-10 py-4 rounded-2xl text-white font-bold text-lg hover:scale-110 transition"
                  style={{ background: "linear-gradient(135deg, #ec4899, #f43f5e)", boxShadow: "0 0 60px #ec4899aa" }}
                >
                  Yes 💍
                </button>
                <RunawayButton className="px-8 py-3 rounded-2xl glass text-white font-semibold">
                  Think again 😏
                </RunawayButton>
              </div>
            </motion.div>
          )}

          {step === "yes" && (
            <motion.div key="y" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-2xl">
              <ConfettiBurst trigger="yes" />
              <div className="text-8xl mb-4">🥹❤️</div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4 text-shadow-glow">
                Yay! You made me the happiest person ❤️
              </h1>
              <div className="glass p-6 md:p-8 mt-6 text-left">
                <p className="whitespace-pre-wrap text-lg leading-relaxed text-white">{payload.message}</p>
                <p className="mt-4 text-sm text-white/60">— forever yours, {payload.fromName}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}