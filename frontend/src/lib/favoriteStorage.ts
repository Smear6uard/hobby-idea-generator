import type { HobbyCard } from "./hobbyInsights";

const STORAGE_KEY = "hobby-generator-saved-hobbies-v1";

function isHobbyCard(x: unknown): x is HobbyCard {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.title === "string" &&
    Array.isArray(o.materials) &&
    o.materials.every((m) => typeof m === "string") &&
    typeof o.description === "string" &&
    typeof o.difficulty === "string" &&
    typeof o.estimatedCost === "string" &&
    typeof o.timeCommitment === "string" &&
    typeof o.category === "string" &&
    typeof o.whyMatch === "string"
  );
}

export function loadSavedHobbies(): HobbyCard[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(isHobbyCard);
  } catch {
    return [];
  }
}

export function persistSavedHobbies(cards: HobbyCard[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch {
    // Storage full or unavailable
  }
}
