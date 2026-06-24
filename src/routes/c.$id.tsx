import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchCelebration } from "@/lib/celebrations";
import type { Celebration } from "@/lib/celebration-types";
import { BirthdayExperience } from "@/components/experiences/BirthdayExperience";
import { ProposalExperience } from "@/components/experiences/ProposalExperience";
import { AnniversaryExperience } from "@/components/experiences/AnniversaryExperience";
import { FriendshipExperience } from "@/components/experiences/FriendshipExperience";

export const Route = createFileRoute("/c/$id")({
  head: () => ({ meta: [{ title: "A surprise for you ✨" }] }),
  component: View,
});

function View() {
  const { id } = Route.useParams();
  const [data, setData] = useState<Celebration | null | "loading" | "missing">("loading");

  useEffect(() => {
    fetchCelebration(id)
      .then((c) => setData(c ?? "missing"))
      .catch(() => setData("missing"));
  }, [id]);

  if (data === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        <div className="animate-pulse">Loading something special…</div>
      </div>
    );
  }
  if (data === "missing" || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Celebration not found</h1>
          <p className="text-muted-foreground">The link may have expired or been mistyped.</p>
        </div>
      </div>
    );
  }

  switch (data.type) {
    case "birthday": return <BirthdayExperience payload={data.payload as never} />;
    case "proposal": return <ProposalExperience payload={data.payload as never} />;
    case "anniversary": return <AnniversaryExperience payload={data.payload as never} />;
    case "friendship": return <FriendshipExperience payload={data.payload as never} />;
  }
}