import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BirthdayPayload } from "@/lib/celebration-types";
import { EVENT_META } from "@/lib/celebration-types";
import { Typewriter } from "@/components/celebration/Typewriter";
import { Balloons } from "@/components/celebration/Balloons";
import { ConfettiBurst, ConfettiRain, fireConfetti } from "@/components/celebration/Confetti";
import { Fireworks } from "@/components/celebration/Fireworks";
import { MusicPlayer } from "@/components/celebration/MusicPlayer";
import { Cake } from "@/components/celebration/Cake";
import { FloatingEmojis } from "@/components/celebration/FloatingHearts";

type Step =
  | "intro" | "countdown" | "yeyy" | "ask" | "gift" | "ready"
  | "stage" | "cake" | "final";

export function BirthdayExperience({ payload }: { payload: BirthdayPayload }) {
  const meta = EVENT_META.birthday;
  const [step, setStep] = useState<Step>("intro");
  const [count, setCount] = useState(3);
  const [lights, setLights] = useState(false);
  const [music, setMusic] = useState(false);
  const [decorated, setDecorated] = useState(false);
  const [blown, setBlown] = useState(false);
  const [cut, setCut] = useState(false);

  const startCountdown = () => {
    setStep("countdown");
    let n = 3;
    const id = setInterval(() => {
      n -= 1;
      if (n === 0) {
        clearInterval(id);
        fireConfetti({ particleCount: 200, spread: 160 });
        setStep("yeyy");
      } else {
        setCount(n);
      }
    }, 900);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden transition-colors duration-700"
      style={{
        background: lights
          ? "radial-gradient(1200px 800px at 50% 0%, #ffd86b22, transparent), linear-gradient(180deg, #2a1240, #100822)"
          : "#050309",
      }}
    >
      {music && <MusicPlayer youtubeId={payload.musicYoutubeId || meta.youtubeId} title={meta.songTitle} />}
      {decorated && <Balloons count={18} />}
      {step === "final" && <ConfettiRain active />}
      {step === "final" && <Fireworks active />}
      {step === "final" && <FloatingEmojis emojis={["🎂", "🎉", "✨", "🎈"]} count={20} />}

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center max-w-xl">
              <Typewriter
                text={`POV: one night, one laptop, one birthday surprise for ${payload.toName} 🎂`}
                className="text-2xl md:text-3xl font-semibold text-white text-shadow-glow"
              />
              <div className="mt-10">
                <PrimaryButton onClick={startCountdown}>Start Surprise ✨</PrimaryButton>
              </div>
            </motion.div>
          )}
          {step === "countdown" && (
            <motion.div key={`c-${count}`} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 2, opacity: 0 }} className="text-[12rem] font-black text-white text-shadow-glow">
              {count}
            </motion.div>
          )}
          {step === "yeyy" && (
            <motion.div key="yeyy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <ConfettiBurst trigger="yeyy" />
              <div className="text-7xl mb-4">🥳</div>
              <h1 className="text-5xl md:text-6xl font-black" style={{ background: meta.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                It's your special day, yeyyy!!!
              </h1>
              <p className="mt-3 text-xl text-white/90">Hey {payload.toName} 💖</p>
              <div className="mt-8"><PrimaryButton onClick={() => setStep("ask")}>Continue →</PrimaryButton></div>
            </motion.div>
          )}
          {step === "ask" && (
            <motion.div key="ask" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Do you wanna see what I made? 🎁</h2>
              <div className="flex gap-4 justify-center">
                <PrimaryButton onClick={() => setStep("gift")}>Yes 💖</PrimaryButton>
                <PrimaryButton onClick={() => setStep("gift")} variant="ghost">No 😅</PrimaryButton>
              </div>
            </motion.div>
          )}
          {step === "gift" && (
            <motion.div key="gift" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <motion.button
                onClick={() => { fireConfetti({ particleCount: 180, spread: 150 }); setTimeout(() => setStep("ready"), 700); }}
                className="text-9xl drop-shadow-[0_0_40px_rgba(255,216,107,.6)]"
                animate={{ rotate: [0, -8, 8, -8, 0], y: [0, -10, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                aria-label="Open virtual gift box"
              >
                🎁
              </motion.button>
              <h2 className="mt-8 text-3xl md:text-4xl font-bold text-white">Tap the gift box to open your surprise</h2>
            </motion.div>
          )}
          {step === "ready" && (
            <motion.div key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Have a look madam-ji / sir-ji 👀
              </h2>
              <PrimaryButton onClick={() => setStep("stage")}>Let's go ✨</PrimaryButton>
            </motion.div>
          )}
          {step === "stage" && (
            <motion.div key="stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center w-full max-w-md">
              <h2 className="text-2xl font-bold text-white mb-8">Tap each step to set the stage</h2>
              <div className="grid gap-3">
                <StageBtn done={lights} onClick={() => setLights(true)}>💡 Lights on</StageBtn>
                <StageBtn done={music} onClick={() => setMusic(true)}>🎵 Play music</StageBtn>
                <StageBtn done={decorated} onClick={() => { setDecorated(true); fireConfetti(); }}>🎈 Decorate</StageBtn>
                <button
                  type="button"
                  disabled={!(lights && music && decorated)}
                  onClick={() => setStep("cake")}
                  className="mt-4 py-3 rounded-2xl font-semibold disabled:opacity-30"
                  style={{ background: meta.gradient, color: "#1a0a1f", boxShadow: "var(--shadow-glow)" }}
                >
                  🎂 Let's cut the cake →
                </button>
              </div>
            </motion.div>
          )}
          {step === "cake" && (
            <motion.div key="cake" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <h2 className="text-3xl font-bold text-white mb-8">
                {!blown ? "Make a wish & blow the candles ✨" : !cut ? "Now cut the cake! 🔪" : ""}
              </h2>
              <Cake litCandles={5} blown={blown} />
              <div className="mt-8">
                {!blown && <PrimaryButton onClick={() => setBlown(true)}>Blow candles 💨</PrimaryButton>}
                {blown && !cut && (
                  <PrimaryButton onClick={() => { setCut(true); fireConfetti({ particleCount: 250, spread: 180 }); setTimeout(() => setStep("final"), 1200); }}>
                    Cut the cake 🍰
                  </PrimaryButton>
                )}
              </div>
            </motion.div>
          )}
          {step === "final" && (
            <motion.div key="final" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl w-full text-center">
              <h1 className="text-5xl md:text-7xl font-black mb-4" style={{ background: meta.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Happy Birthday {payload.toName} 🎂
              </h1>
              {payload.age && <p className="text-2xl text-white/90 mb-6">{payload.age} and shining ✨</p>}
              <div className="glass p-6 md:p-8 text-left">
                <p className="whitespace-pre-wrap text-lg leading-relaxed">{payload.message}</p>
                <p className="mt-4 text-sm text-muted-foreground">— with love, {payload.fromName}</p>
              </div>
              {payload.photos.length > 0 && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {payload.photos.map((p, i) => (
                    <motion.img
                      key={i}
                      src={p}
                      alt=""
                      className="rounded-xl object-cover aspect-square border border-white/10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.08 }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PrimaryButton({ children, onClick, variant = "solid" }: { children: React.ReactNode; onClick: () => void; variant?: "solid" | "ghost" }) {
  if (variant === "ghost") {
    return (
      <button onClick={onClick} className="px-7 py-3 rounded-2xl glass font-semibold hover:scale-105 transition">
        {children}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className="px-8 py-3.5 rounded-2xl font-semibold hover:scale-105 transition"
      style={{ background: "var(--grad-birthday)", color: "#1a0a1f", boxShadow: "var(--shadow-glow)" }}
    >
      {children}
    </button>
  );
}

function StageBtn({ children, onClick, done }: { children: React.ReactNode; onClick: () => void; done: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={done}
      className={`py-3 rounded-xl text-base font-medium transition ${done ? "bg-white/20 text-white/60" : "glass hover:scale-[1.02]"}`}
    >
      {done ? "✓ Done · " : ""}{children}
    </button>
  );
}