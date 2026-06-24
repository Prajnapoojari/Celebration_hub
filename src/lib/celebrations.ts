import { supabase } from "@/integrations/supabase/client";
import { customAlphabet } from "nanoid";
import type { AnyPayload, Celebration, CelebrationType } from "./celebration-types";

const nano = customAlphabet("23456789abcdefghjkmnpqrstuvwxyz", 8);

// `celebrations` is created in a migration but not yet reflected in the
// generated Database types — cast to `any` for the table query builder.
const db = supabase as unknown as {
  from: (t: string) => {
    insert: (row: unknown) => Promise<{ error: unknown }>;
    select: (cols: string) => {
      eq: (col: string, v: string) => {
        maybeSingle: () => Promise<{ data: unknown; error: unknown }>;
      };
    };
  };
};

export async function createCelebration(type: CelebrationType, payload: AnyPayload): Promise<string> {
  const id = nano();
  const { error } = await db.from("celebrations").insert({ id, type, payload });
  if (error) throw error;
  return id;
}

export async function fetchCelebration(id: string): Promise<Celebration | null> {
  const { data, error } = await db
    .from("celebrations")
    .select("id, type, payload, created_at")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return data as Celebration;
}