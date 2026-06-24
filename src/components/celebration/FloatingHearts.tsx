import { useMemo } from "react";

const seeded = (seed: number) => {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
};
const fixed = (n: number) => Number(n.toFixed(4));

export function FloatingHearts({ count = 18, color = "#ff5577" }: { count?: number; color?: string }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: fixed(seeded(i + 1) * 100),
        delay: fixed(seeded(i + 11) * 6),
        duration: fixed(6 + seeded(i + 21) * 6),
        size: fixed(14 + seeded(i + 31) * 26),
        opacity: 0.5 + seeded(i + 41) * 0.5,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          suppressHydrationWarning
          className="absolute"
          style={{
            left: `${h.left}%`,
            bottom: "-40px",
            fontSize: h.size,
            color,
            opacity: h.opacity,
            animation: `float-up ${h.duration}s linear ${h.delay}s infinite`,
            filter: "drop-shadow(0 0 8px currentColor)",
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
}

export function FloatingEmojis({ emojis = ["✨", "💫", "⭐"], count = 24 }: { emojis?: string[]; count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: fixed(seeded(i + 101) * 100),
        delay: fixed(seeded(i + 111) * 8),
        duration: fixed(8 + seeded(i + 121) * 8),
        size: fixed(14 + seeded(i + 131) * 22),
        emoji: emojis[i % emojis.length],
      })),
    [count, emojis],
  );
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-0">
      {items.map((h) => (
        <span
          key={h.id}
          suppressHydrationWarning
          className="absolute"
          style={{
            left: `${h.left}%`,
            bottom: "-40px",
            fontSize: h.size,
            animation: `float-up ${h.duration}s linear ${h.delay}s infinite`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}