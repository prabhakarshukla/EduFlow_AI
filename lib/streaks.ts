import type { SupabaseClient } from "@supabase/supabase-js";

export type Streak = {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_active_date: string | null;
  updated_at: string;
  created_at?: string;
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const getLocalDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const dateKeyToLocalDate = (dateKey: string) => {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const isMissingTableError = (error: { code?: string; message?: string }) =>
  error.code === "42P01" ||
  error.code === "PGRST116" ||
  error.message?.toLowerCase().includes("does not exist") ||
  error.message?.toLowerCase().includes("could not find the table");

export async function getStreak(
  supabase: SupabaseClient,
  userId: string,
): Promise<Streak | null> {
  const { data, error } = await supabase
    .from("streaks")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    if (isMissingTableError(error)) {
      console.warn("[streaks] Table is not available. Run STREAKS_SETUP.md.");
      return null;
    }

    console.error("[streaks] Error fetching streak:", error.message);
    return null;
  }

  return (data as Streak | null) ?? null;
}

export async function getOrCreateStreak(
  supabase: SupabaseClient,
  userId: string,
): Promise<Streak | null> {
  const existing = await getStreak(supabase, userId);
  if (existing) return existing;

  const today = getLocalDateKey();
  const { data, error } = await supabase
    .from("streaks")
    .insert({
      user_id: userId,
      current_streak: 1,
      longest_streak: 1,
      last_active_date: today,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("[streaks] Error creating streak:", error.message);
    return null;
  }

  return (data as Streak) ?? null;
}

export async function updateStreakOnTaskComplete(
  supabase: SupabaseClient,
  userId: string,
): Promise<Streak | null> {
  try {
    const streak = await getStreak(supabase, userId);
    if (!streak) return getOrCreateStreak(supabase, userId);

    const today = getLocalDateKey();
    const lastActive = streak.last_active_date;
    let nextCurrent = streak.current_streak;
    let nextLongest = streak.longest_streak;

    if (lastActive === today) {
      nextCurrent = Math.max(1, streak.current_streak);
    } else if (lastActive) {
      const diffDays = Math.floor(
        (dateKeyToLocalDate(today).getTime() -
          dateKeyToLocalDate(lastActive).getTime()) /
          MS_PER_DAY,
      );

      nextCurrent =
        diffDays === 1 ? Math.max(0, streak.current_streak) + 1 : 1;
    } else {
      nextCurrent = 1;
    }

    nextLongest = Math.max(streak.longest_streak, nextCurrent);

    if (
      lastActive === today &&
      nextCurrent === streak.current_streak &&
      nextLongest === streak.longest_streak
    ) {
      return streak;
    }

    const { data, error } = await supabase
      .from("streaks")
      .update({
        current_streak: nextCurrent,
        longest_streak: nextLongest,
        last_active_date: today,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      console.error("[streaks] Error updating streak:", error.message);
      return null;
    }

    return (data as Streak) ?? null;
  } catch (error) {
    console.error("[streaks] Unexpected error updating streak:", error);
    return null;
  }
}

export function formatStreak(days: number): string {
  if (days <= 0) return "No streak yet";
  if (days === 1) return "1 day";
  return `${days} days`;
}

export function formatLastActiveDate(dateKey: string | null): string {
  if (!dateKey) return "No completed tasks yet";

  const today = getLocalDateKey();
  if (dateKey === today) return "Today";

  const yesterday = getLocalDateKey(
    new Date(new Date().setDate(new Date().getDate() - 1)),
  );
  if (dateKey === yesterday) return "Yesterday";

  const parsed = dateKeyToLocalDate(dateKey);
  if (Number.isNaN(parsed.getTime())) return dateKey;

  return parsed.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export async function ensureStreaksTable(
  supabase: SupabaseClient,
): Promise<boolean> {
  const { error } = await supabase.from("streaks").select("id").limit(1);

  if (!error) return true;
  if (isMissingTableError(error)) {
    console.warn("[streaks] Table is not available. Run STREAKS_SETUP.md.");
    return false;
  }

  console.error("[streaks] Error checking table:", error.message);
  return false;
}
