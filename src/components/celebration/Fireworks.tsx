import { useEffect } from "react";
import confetti from "canvas-confetti";

export function Fireworks({ active, duration = 6000 }: { active: boolean; duration?: number }) {
  useEffect(() => {
    if (!active) return;
    const end = Date.now() + duration;
    const colors = ["#ff8ab8", "#ffd86b", "#a78bfa", "#60a5fa", "#f472b6"];
    const tick = () => {
      if (Date.now() > end) return;
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      requestAnimationFrame(tick);
    };
    tick();
  }, [active, duration]);
  return null;
}