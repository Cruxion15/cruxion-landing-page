import type { Pose } from "./Crux";

export interface Stop {
  id: string;
  label: string;
  pose: Pose;
  line: string;
}

/** The tour Crux gives, in page order. Section ids match these ids. */
export const STOPS: Stop[] = [
  { id: "learn", label: "How it works", pose: "laptop", line: "First stop: how learning works here. You do the thinking. I just keep score." },
  { id: "dsa", label: "DSA", pose: "pencil", line: "Stop two. Read the constraint first. It's quietly telling you the answer." },
  { id: "ai", label: "AI & LLMs", pose: "laptop", line: "Drag the temperature and hit sample. That's how an LLM picks its next word." },
  { id: "system-design", label: "System design", pose: "mug", line: "Go on, kill the cache. Breaking it is how you learn it." },
  { id: "habits", label: "Habits", pose: "cheer", line: "Miss a day? A banked freeze covers it. No guilt, streak intact." },
  { id: "companies", label: "Companies", pose: "wave", line: "Pick a company. I'll line up what they're known to ask." },
];
