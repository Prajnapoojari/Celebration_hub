import { useRef, useState, type ReactNode } from "react";

export function RunawayButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={ref}
      type="button"
      onMouseEnter={() => {
        const w = window.innerWidth - 200;
        const h = window.innerHeight - 100;
        setPos({ x: Math.random() * w, y: Math.random() * h });
      }}
      onTouchStart={() => {
        const w = window.innerWidth - 200;
        const h = window.innerHeight - 100;
        setPos({ x: Math.random() * w, y: Math.random() * h });
      }}
      style={
        pos
          ? { position: "fixed", left: pos.x, top: pos.y, transition: "all 0.2s" }
          : undefined
      }
      className={className}
    >
      {children}
    </button>
  );
}