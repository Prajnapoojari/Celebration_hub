import { useEffect } from "react";
import confetti from "canvas-confetti";

export function fireConfetti(opts?: confetti.Options) {
  confetti({
    particleCount: 120,
    spread: 90,
    origin: { y: 0.6 },
    colors: ["#ff8ab8", "#ffd86b", "#a78bfa", "#60a5fa", "#f472b6"],
    ...opts,
  });
}

export function ConfettiBurst({ trigger }: { trigger: unknown }) {
  useEffect(() => {
    fireConfetti();
  }, [trigger]);
  return null;
}

export function ConfettiRain({ active }: { active: boolean }) {
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff8ab8", "#ffd86b", "#a78bfa", "#60a5fa"],
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff8ab8", "#ffd86b", "#a78bfa", "#60a5fa"],
      });
    }, 700);
    return () => clearInterval(id);
  }, [active]);
  return null;
}