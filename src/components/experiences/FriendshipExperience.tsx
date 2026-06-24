import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FriendshipPayload } from "@/lib/celebration-types";
import { EVENT_META } from "@/lib/celebration-types";
import { Typewriter } from "@/components/celebration/Typewriter";
import { FloatingEmojis } from "@/components/celebration/FloatingHearts";
import { Balloons } from "@/components/celebration/Balloons";
import { ConfettiBurst, ConfettiRain, fireConfetti } from "@/components/celebration/Confetti";
import { Fireworks } from "@/components/celebration/Fireworks";
import { MusicPlayer } from "@/components/celebration/MusicPlayer";

type Step = "landing" | "openbox" | "messages" | "memories" | "quiz" | "final";

const MESSAGES = [
  "Thank you for always being there for me 🤗",
  "Life is better with a friend like you 💙",
  "Every memory with you is priceless ✨",
  "You are my chosen family ❤️",
];

const QUIZ = [
  { q: "Who's the funnier friend?", a: ["You 😎", "Me 😏", "Tie 🤝"] },
  { q: "Who talks more?", a: ["You 🗣️", "Me 🎙️", "Both equally"] },
  { q: "Who gets angry first?", a: ["You 😤", "Me 🙃", "Never 💙"] },
];

export function FriendshipExperience({ payload }: { payload: FriendshipPayload }) {
  const meta = EVENT_META.friendship;
  const [step, setStep] = useState<Step>("landing");
  const [msgIdx, setMsgIdx] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "radial-gradient(800px 600px at 10% 0%, #38bdf866, transparent), radial-gradient(800px 600px at 90% 90%, #facc1555, transparent), #0a1228" }}>
      <FloatingEmojis emojis={["💙", "✨", "🎈", "😄", "🌟"]} count={20} />
      <MusicPlayer youtubeId={payload.musicYoutubeId || meta.youtubeId} title={meta.songTitle} />
      {step === "final" && <Balloons count={16} />}
      {step === "final" && <ConfettiRain active />}
      {step === "final" && <Fireworks active />}

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {step === "landing" && (
            <motion.div key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center max-w-xl">
              <h1 className="text-5xl md:text-6xl font-black text-white text-shadow-glow mb-3">
                Happy Friendship Day 💙
              </h1>
              <p className="text-white/80 text-lg mb-8">A special surprise for my best friend, {payload.toName}.</p>
              <button
                onClick={() => setStep("openbox")}
                className="px-8 py-3.5 rounded-2xl font-semibold text-white hover:scale-105 transition"
                style={{ background: meta.gradient, color: "#0a1228", boxShadow: "0 0 40px #38bdf888" }}
              >
                Open your surprise 🎁
              </button>
            </motion.div>
          )}
          {step === "openbox" && (
            <motion.div key="ob" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
              <ConfettiBurst trigger="ob" />
              <motion.div animate={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 1 }} className="text-9xl">🎁</motion.div>
              <button onClick={() => setStep("messages")} className="mt-8 px-7 py-3 rounded-2xl glass text-white font-semibold hover:scale-105 transition">
                Open it 💙
              </button>
            </motion.div>
          )}
          {step === "messages" && (
            <motion.div key="m" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center max-w-2xl">
              <Typewriter key={msgIdx} text={MESSAGES[msgIdx]} className="text-2xl md:text-3xl text-white text-shadow-glow" />
              <div className="mt-10">
                <button
                  onClick={() => msgIdx + 1 < MESSAGES.length ? setMsgIdx((i) => i + 1) : setStep("memories")}
                  className="px-7 py-3 rounded-2xl glass text-white font-semibold hover:scale-105 transition"
                >
                  {msgIdx + 1 < MESSAGES.length ? "Next →" : "Memories 📸"}
                </button>
              </div>
            </motion.div>
          )}
          {step === "memories" && (
            <motion.div key="g" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">Our friendship in pictures 📸</h2>
              {payload.photos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {payload.photos.map((p, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20, rotate: -3 + (i % 3) }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="bg-white p-2 pb-6 shadow-lg"
                    >
                      <img src={p} alt="" className="object-cover aspect-square w-full" />
                    </motion.div>
                  ))}
                </div>
              ) : <p className="text-center text-white/60">More to come 💙</p>}
              <div className="text-center mt-8">
                <button onClick={() => setStep("quiz")} className="px-7 py-3 rounded-2xl glass text-white font-semibold hover:scale-105 transition">
                  Fun quiz 🎯
                </button>
              </div>
            </motion.div>
          )}
          {step === "quiz" && (
            <motion.div key="q" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center max-w-md w-full">
              <p className="text-sm text-white/60 mb-2">Question {quizIdx + 1} of {QUIZ.length}</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{QUIZ[quizIdx].q}</h2>
              <div className="grid gap-3">
                {QUIZ[quizIdx].a.map((a) => (
                  <button
                    key={a}
                    onClick={() => {
                      fireConfetti({ particleCount: 60, spread: 70 });
                      if (quizIdx + 1 < QUIZ.length) setQuizIdx((i) => i + 1);
                      else setStep("final");
                    }}
                    className="py-3 rounded-xl glass text-white font-medium hover:scale-[1.03] transition"
                  >
                    {a}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
          {step === "final" && (
            <motion.div key="f" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl w-full text-center">
              <h1 className="text-4xl md:text-6xl font-black text-white text-shadow-glow mb-4">
                Happy Friendship Day, Bestie! 🎉💙
              </h1>
              {payload.yearsKnown && (
                <p className="text-white/80 text-lg mb-4">{payload.yearsKnown} years of memories and counting ✨</p>
              )}
              <div className="glass p-6 md:p-8 text-left">
                <p className="whitespace-pre-wrap text-lg leading-relaxed text-white">{payload.message}</p>
                <p className="mt-4 text-sm text-white/60">— always, {payload.fromName}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}