import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/share/$id")({
  head: () => ({ meta: [{ title: "Your magical link is ready ✨" }] }),
  component: SharePage,
});

function SharePage() {
  const { id } = Route.useParams();
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? `${window.location.origin}/c/${id}` : `/c/${id}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-8 max-w-lg w-full text-center"
      >
        <div className="text-6xl mb-3">🎁</div>
        <h1 className="text-3xl font-bold mb-2">It's ready!</h1>
        <p className="text-muted-foreground mb-6">
          Share this link with them. Works on any phone or laptop — they just open it.
        </p>
        <div className="flex items-center gap-2 p-3 rounded-xl bg-background/40 border border-white/10 mb-4">
          <span className="font-mono text-sm truncate">{url}</span>
          <button
            onClick={copy}
            className="ml-auto p-2 rounded-lg hover:bg-white/10"
            aria-label="Copy link"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
        <div className="flex gap-3 justify-center">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:scale-105 transition"
          >
            Open preview <ExternalLink size={14} />
          </a>
          <Link to="/" className="px-5 py-2.5 rounded-xl glass">New celebration</Link>
        </div>
      </motion.div>
    </div>
  );
}