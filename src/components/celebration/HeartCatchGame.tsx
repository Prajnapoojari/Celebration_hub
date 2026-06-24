import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Heart { id: number; x: number; y: number; vy: number; }

export function HeartCatchGame({ onWin }: { onWin: () => void }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [caught, setCaught] = useState(0);
  const [id, setId] = useState(0);

  useEffect(() => {
    if (caught >= 4) {
      onWin();
      return;
    }
    const interval = setInterval(() => {
      setId((n) => n + 1);
      setHearts((h) => [
        ...h,
        {
          id,
          x: 20 + Math.random() * 60,
          y: -10,
          vy: 0.4 + Math.random() * 0.5,
        },
      ]);
    }, 900);
    return () => clearInterval(interval);
  }, [caught, id, onWin]);

  useEffect(() => {
    const tick = setInterval(() => {
      setHearts((hs) =>
        hs
          .map((h) => ({ ...h, y: h.y + h.vy }))
          .filter((h) => h.y < 110),
      );
    }, 16);
    return () => clearInterval(tick);
  }, []);

  const catchIt = (hid: number) => {
    setHearts((hs) => hs.filter((h) => h.id !== hid));
    setCaught((c) => c + 1);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-muted-foreground">Tap the flying hearts ❤️ — catch <b>4</b> to continue</p>
      <div className="text-2xl">{"❤️".repeat(caught)}{"🤍".repeat(Math.max(0, 4 - caught))}</div>
      <div
        ref={boxRef}
        className="glass relative overflow-hidden"
        style={{ width: "min(90vw, 360px)", height: 360 }}
      >
        <AnimatePresence>
          {hearts.map((h) => (
            <motion.button
              key={h.id}
              type="button"
              onClick={() => catchIt(h.id)}
              className="absolute text-3xl"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              whileTap={{ scale: 1.4 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.6 }}
            >
              ❤️
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}