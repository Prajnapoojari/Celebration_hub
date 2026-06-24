import { useMemo } from "react";

const COLORS = ["#ff6b9d", "#ffd86b", "#a78bfa", "#60a5fa", "#34d399", "#fb7185"];
const seeded = (seed: number) => {
  const x = Math.sin(seed * 777) * 10000;
  return x - Math.floor(x);
};
const fixed = (n: number) => Number(n.toFixed(4));

export function Balloons({ count = 14 }: { count?: number }) {
  const balloons = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: fixed(seeded(i + 1) * 100),
        delay: fixed(seeded(i + 9) * 4),
        duration: fixed(10 + seeded(i + 19) * 8),
        color: COLORS[i % COLORS.length],
        size: fixed(36 + seeded(i + 29) * 28),
      })),
    [count],
  );
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10">
      {balloons.map((b) => (
        <div
          key={b.id}
          suppressHydrationWarning
          className="absolute"
          style={{
            left: `${b.left}%`,
            bottom: "-120px",
            animation: `float-up ${b.duration}s ease-in ${b.delay}s infinite`,
          }}
        >
          <div
            style={{
              width: b.size,
              height: b.size * 1.2,
              background: `radial-gradient(circle at 30% 30%, white, ${b.color} 55%, color-mix(in oklab, ${b.color} 70%, black))`,
              borderRadius: "50%",
              boxShadow: `0 10px 30px ${b.color}66`,
            }}
          />
          <div
            style={{
              width: 1,
              height: 60,
              background: "rgba(255,255,255,0.5)",
              margin: "0 auto",
            }}
          />
        </div>
      ))}
    </div>
  );
}