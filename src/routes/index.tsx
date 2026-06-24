import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { EVENT_META, type CelebrationType } from "@/lib/celebration-types";
import { FloatingEmojis } from "@/components/celebration/FloatingHearts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Celebration Hub — Magical wishes, one tap away" },
      { name: "description", content: "Create stunning interactive celebrations for birthdays, proposals, anniversaries, and friendships. Share the link, watch the magic." },
      { property: "og:title", content: "Celebration Hub" },
      { property: "og:description", content: "Create magical celebrations and share them in one tap." },
    ],
  }),
  component: Index,
});

function Index() {
  const events: CelebrationType[] = ["birthday", "proposal", "anniversary", "friendship"];
  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingEmojis emojis={["✨", "💫", "⭐", "🎉", "🎂", "❤️", "💙"]} count={20} />
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-3">Celebration Hub</p>
          <h1
            className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight"
            style={{
              background: "var(--grad-hero)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 6px 30px rgba(255,140,200,0.25))",
            }}
          >
            Make their day<br />unforgettable ✨
          </h1>
          <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Pick an occasion, add a few details, and we'll craft a magical interactive page.
            Send the short link — they open it and the surprise begins.
          </p>
        </motion.header>

        <div className="grid sm:grid-cols-2 gap-6">
          {events.map((e, i) => {
            const meta = EVENT_META[e];
            return (
              <motion.div
                key={e}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              >
                <Link
                  to="/create/$type"
                  params={{ type: e }}
                  className="group block rounded-3xl p-[1.5px] hover:scale-[1.02] transition-transform"
                  style={{ background: meta.gradient }}
                >
                  <div className="rounded-[calc(theme(borderRadius.3xl)-1px)] bg-background/70 backdrop-blur-xl p-8 h-full flex flex-col gap-3">
                    <div className="text-5xl">{meta.emoji}</div>
                    <h2 className="text-2xl font-bold">{meta.label}</h2>
                    <p className="text-muted-foreground">{meta.tagline}</p>
                    <div className="mt-auto pt-4 text-sm font-medium opacity-70 group-hover:opacity-100">
                      Start creating →
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <section className="mt-12 glass p-6 md:p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground mb-3">Beginner friendly steps</p>
          <h2 className="text-2xl md:text-3xl font-black mb-5">How to make and share a celebration</h2>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["1", "Choose event", "Birthday, proposal, anniversary, or friendship."],
              ["2", "Fill details", "Add names, relationship, style, message, emojis, photos and optional music ID."],
              ["3", "Generate link", "The app saves your surprise and creates a short share link."],
              ["4", "Send & open", "Anyone can open the link in Chrome on mobile or laptop."],
            ].map(([n, title, desc]) => (
              <div key={n} className="rounded-2xl border border-white/10 bg-background/35 p-4">
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground font-black">{n}</div>
                <h3 className="font-bold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Project viva: This Celebration Hub demonstrates React components, props, useState, useEffect, forms, event handling, conditional rendering, animation, responsive UI, and theme-ready design.
          </p>
        </section>

        <footer className="text-center mt-16 text-sm text-muted-foreground">
          Built with love · Share works on any phone or laptop browser
        </footer>
      </main>
    </div>
  );
}
