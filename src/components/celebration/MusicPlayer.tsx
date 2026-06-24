import { useState } from "react";
import { Music, Pause } from "lucide-react";

function extractYouTubeId(input: string): string {
  const raw = (input || "").trim();
  if (!raw) return "";
  if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) return raw;
  try {
    const url = new URL(raw);
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.slice(1).split("/")[0] ?? "";
    }
    const v = url.searchParams.get("v");
    if (v) return v;
    const m = url.pathname.match(/\/(embed|shorts|live)\/([a-zA-Z0-9_-]{11})/);
    if (m) return m[2];
  } catch {
    // not a URL
  }
  const m = raw.match(/[a-zA-Z0-9_-]{11}/);
  return m ? m[0] : "";
}

export function MusicPlayer({
  youtubeId,
  title,
  autoStart = false,
}: {
  youtubeId: string;
  title: string;
  autoStart?: boolean;
}) {
  const videoId = extractYouTubeId(youtubeId);
  const [playing, setPlaying] = useState(autoStart);
  const hasVideo = videoId.length === 11;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        type="button"
        onClick={() => hasVideo && setPlaying((p) => !p)}
        disabled={!hasVideo}
        className="glass flex items-center gap-2 px-4 py-2 text-sm font-medium hover:scale-105 transition-transform"
        aria-label={
          !hasVideo
            ? "Add a valid YouTube link while creating to enable music"
            : playing
              ? "Pause music"
              : "Play music"
        }
      >
        {playing ? <Pause size={16} /> : <Music size={16} />}
        <span className="hidden sm:inline max-w-[180px] truncate">
          {hasVideo ? title : "Add music link in form"}
        </span>
      </button>
      {playing && hasVideo && (
        <iframe
          title={title}
          width="1"
          height="1"
          style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0`}
          allow="autoplay; encrypted-media"
        />
      )}
    </div>
  );
}
