import { useEffect, useState } from "react";

export function Typewriter({
  text,
  speed = 45,
  className = "",
  onDone,
}: {
  text: string;
  speed?: number;
  className?: string;
  onDone?: () => void;
}) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, onDone]);
  return (
    <span className={className}>
      {shown}
      <span className="inline-block w-[2px] h-[1em] bg-current align-middle ml-1 animate-pulse" />
    </span>
  );
}