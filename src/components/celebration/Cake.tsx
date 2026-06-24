import { motion } from "framer-motion";

export function Cake({ litCandles = 5, blown = false }: { litCandles?: number; blown?: boolean }) {
  const candles = Array.from({ length: litCandles });
  return (
    <div className="flex flex-col items-center" style={{ perspective: 800 }}>
      <motion.div
        initial={{ rotateX: -10, scale: 0.6, opacity: 0 }}
        animate={{ rotateX: -10, scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Candles */}
        <div className="flex justify-center gap-3 mb-[-6px]">
          {candles.map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              {!blown && (
                <motion.div
                  animate={{ scaleY: [1, 1.3, 1], opacity: [1, 0.8, 1] }}
                  transition={{ duration: 0.5 + i * 0.07, repeat: Infinity }}
                  style={{
                    width: 10,
                    height: 16,
                    background: "radial-gradient(circle, #fff7c2, #ff8b3d 70%, transparent)",
                    borderRadius: "50% 50% 30% 30%",
                    filter: "blur(0.5px) drop-shadow(0 0 8px #ffb84d)",
                  }}
                />
              )}
              <div style={{ width: 4, height: 28, background: "linear-gradient(#fff, #f3c3c3)" }} />
            </div>
          ))}
        </div>
        {/* Top tier */}
        <Tier width={180} color="#ff9ec7" drip="#ffd6ec" />
        {/* Middle tier */}
        <Tier width={240} color="#ffd86b" drip="#fff3b0" />
        {/* Plate */}
        <div
          className="mt-1"
          style={{
            width: 280,
            height: 14,
            background: "linear-gradient(#e9e9e9, #aaa)",
            borderRadius: "50%",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          }}
        />
      </motion.div>
    </div>
  );
}

function Tier({ width, color, drip }: { width: number; color: string; drip: string }) {
  return (
    <div
      style={{
        width,
        height: 70,
        background: `linear-gradient(${color}, color-mix(in oklab, ${color} 70%, black))`,
        borderRadius: 12,
        position: "relative",
        boxShadow: `inset 0 -10px 20px rgba(0,0,0,0.2), 0 6px 20px ${color}77`,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "0 0 auto 0",
          height: 18,
          background: drip,
          borderRadius: "12px 12px 50% 50% / 12px 12px 30% 30%",
        }}
      />
    </div>
  );
}