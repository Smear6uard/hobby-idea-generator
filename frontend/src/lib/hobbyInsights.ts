export type HobbyCard = {
  title: string;
  description: string;
  difficulty: "Easy" | "Moderate" | "Intermediate";
  estimatedCost: "Low" | "Medium" | "High";
  timeCommitment: string;
  category: "Creative" | "Mindfulness" | "Fitness" | "Tech" | "Lifestyle";
  whyMatch: string;
};

const categoryHints: Record<HobbyCard["category"], string[]> = {
  Creative: ["draw", "paint", "music", "song", "guitar", "craft", "photo"],
  Mindfulness: ["meditation", "journal", "reading", "yoga", "breath"],
  Fitness: ["run", "climb", "cycling", "swim", "fitness", "dance"],
  Tech: ["coding", "robot", "3d", "game", "design", "electronics"],
  Lifestyle: ["cooking", "gardening", "volunteer", "travel", "language"],
};

function inferCategory(title: string): HobbyCard["category"] {
  const lowered = title.toLowerCase();
  for (const [category, hints] of Object.entries(categoryHints) as Array<
    [HobbyCard["category"], string[]]
  >) {
    if (hints.some((hint) => lowered.includes(hint))) return category;
  }
  return "Lifestyle";
}

const whyByCategory: Record<HobbyCard["category"], string> = {
  Creative: "Matches your curiosity and gives visible progress each week.",
  Mindfulness: "Supports focus and stress recovery with small daily rituals.",
  Fitness: "Builds energy and confidence while fitting into flexible routines.",
  Tech: "Channels problem-solving into practical, portfolio-friendly projects.",
  Lifestyle: "Balances learning and fun with habits you can sustain long term.",
};

const descriptionByCategory: Record<HobbyCard["category"], string> = {
  Creative: "Hands-on creative practice with room for personal style.",
  Mindfulness: "Calming habit that improves consistency and self-awareness.",
  Fitness: "Movement-based activity that scales with your current level.",
  Tech: "Skill-building activity with clear milestones and real outputs.",
  Lifestyle: "Practical hobby that blends naturally into everyday life.",
};

export function enrichHobbies(hobbies: string[], weeklyTime: number, budget: number): HobbyCard[] {
  return hobbies.map((title, index) => {
    const category = inferCategory(title);
    const difficulty: HobbyCard["difficulty"] =
      index % 3 === 0 ? "Easy" : index % 3 === 1 ? "Moderate" : "Intermediate";
    const estimatedCost: HobbyCard["estimatedCost"] =
      budget < 40 ? "Low" : budget < 90 ? "Medium" : "High";
    const timeCommitment = `${Math.max(1, Math.round(weeklyTime / 3))}-${Math.max(
      2,
      Math.round(weeklyTime / 2)
    )} hrs/week`;

    return {
      title,
      description: descriptionByCategory[category],
      difficulty,
      estimatedCost,
      timeCommitment,
      category,
      whyMatch: whyByCategory[category],
    };
  });
}
