import { useRef, useState } from "react";
import { fileToCompressedDataUrl } from "@/lib/image-resize";
import { X, ImagePlus } from "lucide-react";

export function PhotoUploader({
  value,
  onChange,
  max = 8,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  max?: number;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const onPick = async (files: FileList | null) => {
    if (!files) return;
    setBusy(true);
    try {
      const slots = max - value.length;
      const arr = Array.from(files).slice(0, Math.max(0, slots));
      const data = await Promise.all(arr.map((f) => fileToCompressedDataUrl(f)));
      onChange([...value, ...data]);
    } finally {
      setBusy(false);
      if (ref.current) ref.current.value = "";
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {value.map((url, i) => (
          <div key={i} className="relative aspect-square overflow-hidden rounded-xl glass">
            <img src={url} alt={`upload ${i + 1}`} className="object-cover w-full h-full" />
            <button
              type="button"
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
              aria-label="Remove"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        {value.length < max && (
          <button
            type="button"
            onClick={() => ref.current?.click()}
            disabled={busy}
            className="aspect-square rounded-xl glass flex flex-col items-center justify-center text-sm text-muted-foreground hover:text-foreground hover:scale-[1.03] transition disabled:opacity-50"
          >
            <ImagePlus size={22} />
            <span className="mt-1">{busy ? "Loading…" : "Add photo"}</span>
          </button>
        )}
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => onPick(e.target.files)}
      />
      <p className="text-xs text-muted-foreground mt-2">{value.length}/{max} photos · auto-compressed</p>
    </div>
  );
}