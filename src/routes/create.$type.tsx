import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, WandSparkles, Upload, Link2, Smartphone } from "lucide-react";
import { EVENT_META, type CelebrationType, type AnyPayload } from "@/lib/celebration-types";
import { createCelebration } from "@/lib/celebrations";
import { PhotoUploader } from "@/components/celebration/PhotoUploader";
import { toast } from "sonner";

const VALID = new Set(["birthday", "proposal", "anniversary", "friendship"]);

const QUICK_MESSAGES: Record<CelebrationType, string> = {
  birthday: "Happy Birthday! Today is all about your smile, your dreams, and the beautiful person you are. I made this little surprise to remind you how special you are. Keep shining always 🎂✨",
  proposal: "I don't know the perfect way to say this, but I know one thing clearly: you make my world brighter. Every moment with you feels special, and I want many more moments with you ❤️",
  anniversary: "Happy Anniversary, my love. Every day with you is a memory I want to keep forever. Thank you for being my comfort, my smile, and my favorite person 💞",
  friendship: "Happy Friendship Day! Thank you for being my safe place, my laughter partner, and my chosen family. Life is genuinely better with you in it 💙",
};

const RELATIONSHIPS = ["Mother", "Father", "Friend", "Lover", "Partner", "Bestie", "Sister", "Brother"];
const STYLES = ["Cute + Emotional", "Funny + Sweet", "Short + Premium", "Long + Heart-touching"];

export const Route = createFileRoute("/create/$type")({
  head: ({ params }) => ({
    meta: [{ title: `Create a ${params.type} surprise — Celebration Hub` }],
  }),
  component: CreatePage,
});

function CreatePage() {
  const { type } = Route.useParams();
  const navigate = useNavigate();
  if (!VALID.has(type)) {
    return (
      <div className="p-8">
        <p>Unknown event type.</p>
        <Link to="/" className="underline">Go home</Link>
      </div>
    );
  }
  const ev = type as CelebrationType;
  const meta = EVENT_META[ev];

  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");
  const [relationship, setRelationship] = useState(RELATIONSHIPS[2]);
  const [style, setStyle] = useState(STYLES[0]);
  const [message, setMessage] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [extra, setExtra] = useState("");
  const [emojis, setEmojis] = useState(meta.emoji + " ✨ 💖 🎁");
  const [musicYoutubeId, setMusicYoutubeId] = useState("");
  const [marriageDate, setMarriageDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const generateWish = () => {
    const name = toName.trim() || "you";
    const starter = QUICK_MESSAGES[ev].replace(/!/, ` ${name}!`);
    setMessage(`${starter}\n\nStyle: ${style}. For my ${relationship.toLowerCase()}. ${emojis}`);
    toast.success("Wish generated! You can edit it before creating the link.");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!toName || !fromName || !message) {
      toast.error("Please fill in your name, their name, and a message.");
      return;
    }
    if (ev === "anniversary" && !marriageDate) {
      toast.error("Please pick your marriage date.");
      return;
    }
    setSubmitting(true);
    try {
      const base = { fromName, toName, relationship, style, message, photos, emojis, musicYoutubeId };
      const payload: AnyPayload =
        ev === "anniversary"
          ? { ...base, marriageDate }
          : ev === "birthday"
            ? { ...base, age: extra }
            : ev === "proposal"
              ? { ...base, loveQuote: extra }
              : { ...base, yearsKnown: extra };
      const id = await createCelebration(ev, payload);
      navigate({ to: "/share/$id", params: { id } });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong saving your celebration.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div
        className="absolute inset-x-0 top-0 h-72 opacity-40 pointer-events-none"
        style={{ background: meta.gradient, filter: "blur(60px)" }}
      />
      <div className="relative max-w-4xl mx-auto px-6 py-10">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft size={14} /> Back
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-6 md:p-8"
        >
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_280px] md:items-start mb-6">
            <div className="min-w-0">
              <div className="text-5xl mb-2">{meta.emoji}</div>
              <h1 className="text-3xl md:text-4xl font-black">Create {meta.label} Surprise</h1>
              <p className="text-muted-foreground mt-2">{meta.tagline}. Fill details, generate a short link, then send it to anyone.</p>
            </div>
            <div className="rounded-2xl bg-background/35 border border-white/10 p-4 text-sm text-muted-foreground space-y-3">
              <p className="flex gap-2"><Upload className="shrink-0 text-primary" size={17} /> Admin adds names, message, emojis and photos.</p>
              <p className="flex gap-2"><Link2 className="shrink-0 text-primary" size={17} /> App creates a short link like /c/abc123.</p>
              <p className="flex gap-2"><Smartphone className="shrink-0 text-primary" size={17} /> Receiver opens it on mobile or laptop.</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <Field label="Your name (from)">
              <input
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                placeholder="Your name"
                className="input"
              />
            </Field>
            <Field label={`Recipient's name (to)`}>
              <input
                value={toName}
                onChange={(e) => setToName(e.target.value)}
                placeholder={ev === "birthday" ? "Birthday person" : "Their name"}
                className="input"
              />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Relationship">
                <select value={relationship} onChange={(e) => setRelationship(e.target.value)} className="input">
                  {RELATIONSHIPS.map((r) => <option key={r}>{r}</option>)}
                </select>
              </Field>
              <Field label="Wish style">
                <select value={style} onChange={(e) => setStyle(e.target.value)} className="input">
                  {STYLES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
            </div>
            {ev === "birthday" && (
              <Field label="Age (optional)">
                <input value={extra} onChange={(e) => setExtra(e.target.value)} placeholder="e.g. 21" className="input" />
              </Field>
            )}
            {ev === "proposal" && (
              <Field label="A short love line (optional)">
                <input value={extra} onChange={(e) => setExtra(e.target.value)} placeholder="You are my favorite notification" className="input" />
              </Field>
            )}
            {ev === "friendship" && (
              <Field label="Years you've been friends (optional)">
                <input value={extra} onChange={(e) => setExtra(e.target.value)} placeholder="e.g. 7" className="input" />
              </Field>
            )}
            {ev === "anniversary" && (
              <Field label="Marriage / together-since date">
                <input
                  type="date"
                  value={marriageDate}
                  onChange={(e) => setMarriageDate(e.target.value)}
                  className="input"
                />
              </Field>
            )}
            <Field label="Your message to them">
              <button
                type="button"
                onClick={generateWish}
                className="mb-3 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:scale-[1.02] transition"
              >
                <WandSparkles size={16} /> Generate Wish
              </button>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Pour your heart out…"
                rows={4}
                className="input"
              />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Favorite emojis">
                <input value={emojis} onChange={(e) => setEmojis(e.target.value)} placeholder="🎂 ✨ 💖 🎁" className="input" />
              </Field>
              <Field label="YouTube music video ID (optional)">
                <input value={musicYoutubeId} onChange={(e) => setMusicYoutubeId(e.target.value)} placeholder="Paste only video ID, optional" className="input" />
              </Field>
            </div>
            <Field label={`Photos (up to 8)`}>
              <PhotoUploader value={photos} onChange={setPhotos} max={8} />
            </Field>

            <div className="rounded-3xl border border-white/10 bg-background/30 p-4">
              <p className="text-sm font-semibold mb-3">Live greeting card preview</p>
              <div className="relative overflow-hidden rounded-2xl p-5 min-h-[190px]" style={{ background: meta.gradient }}>
                <div className="absolute inset-0 bg-background/20" />
                <div className="relative rounded-2xl bg-background/45 backdrop-blur-xl border border-white/20 p-5">
                  <p className="text-4xl mb-2">{emojis || meta.emoji}</p>
                  <h3 className="text-2xl font-black">Dear {toName || "Special Person"}</h3>
                  <p className="mt-2 text-sm opacity-85 line-clamp-4 whitespace-pre-wrap">{message || QUICK_MESSAGES[ev]}</p>
                  <p className="mt-4 text-xs opacity-70">— {fromName || "Your name"}</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-2xl font-semibold text-base disabled:opacity-50 transition-transform hover:scale-[1.01]"
              style={{ background: meta.gradient, color: "#1a0a1f", boxShadow: "var(--shadow-glow)" }}
            >
              {submitting ? "Creating magic…" : `Generate ${meta.label} link ✨`}
            </button>
          </form>
        </motion.div>
      </div>
      <style>{`
        .input {
          width: 100%;
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: 14px;
          padding: 12px 14px;
          color: var(--color-foreground);
          font-size: 15px;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary) 30%, transparent);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1.5">{label}</span>
      {children}
    </label>
  );
}