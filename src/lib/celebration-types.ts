export type CelebrationType = "birthday" | "proposal" | "anniversary" | "friendship";

export interface BasePayload {
  fromName: string;
  toName: string;
  relationship?: string;
  style?: string;
  message: string;
  photos: string[]; // data URLs (compressed)
  captions?: string[];
  emojis?: string;
  musicYoutubeId?: string;
}

export interface BirthdayPayload extends BasePayload {
  age?: string;
}
export interface ProposalPayload extends BasePayload {
  loveQuote?: string;
}
export interface AnniversaryPayload extends BasePayload {
  marriageDate: string; // ISO yyyy-mm-dd
}
export interface FriendshipPayload extends BasePayload {
  yearsKnown?: string;
}

export type AnyPayload =
  | BirthdayPayload
  | ProposalPayload
  | AnniversaryPayload
  | FriendshipPayload;

export interface Celebration {
  id: string;
  type: CelebrationType;
  payload: AnyPayload;
  created_at: string;
}

export const EVENT_META: Record<CelebrationType, {
  label: string; emoji: string; tagline: string; gradient: string; youtubeId: string; songTitle: string;
}> = {
  birthday: {
    label: "Birthday",
    emoji: "🎂",
    tagline: "Make their special day unforgettable",
    gradient: "var(--grad-birthday)",
    youtubeId: "",
    songTitle: "Birthday surprise melody",
  },
  proposal: {
    label: "Love Proposal",
    emoji: "❤️",
    tagline: "Ask the question, the magical way",
    gradient: "var(--grad-proposal)",
    youtubeId: "",
    songTitle: "Romantic proposal melody",
  },
  anniversary: {
    label: "Anniversary",
    emoji: "💍",
    tagline: "Celebrate the years together",
    gradient: "var(--grad-anniversary)",
    youtubeId: "",
    songTitle: "Anniversary love melody",
  },
  friendship: {
    label: "Friendship Day",
    emoji: "💙",
    tagline: "Tell your bestie they matter",
    gradient: "var(--grad-friendship)",
    youtubeId: "",
    songTitle: "Friendship celebration melody",
  },
};