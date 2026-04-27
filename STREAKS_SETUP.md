# Streak System Setup

The Streak System for EduFlow AI requires a new Supabase table to track user streaks.

## Required Supabase Table

Run the following SQL in the Supabase SQL Editor to create the `streaks` table:

```sql
-- Create the streaks table
CREATE TABLE IF NOT EXISTS streaks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INT NOT NULL DEFAULT 0,
  longest_streak INT NOT NULL DEFAULT 0,
  last_active_date DATE,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS on streaks table
ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;

-- Create RLS policy: Users can only view/update their own streaks
CREATE POLICY "Users can view their own streaks"
  ON streaks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own streaks"
  ON streaks FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can create their own streaks"
  ON streaks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create index on user_id for faster lookups
CREATE INDEX idx_streaks_user_id ON streaks(user_id);

-- Create index on last_active_date for streak calculations
CREATE INDEX idx_streaks_last_active_date ON streaks(last_active_date);
```

If you already ran an earlier draft of this setup that made
`last_active_date` `NOT NULL DEFAULT CURRENT_DATE`, run this optional cleanup so
new rows do not look active before a task has been completed:

```sql
ALTER TABLE streaks
  ALTER COLUMN last_active_date DROP NOT NULL,
  ALTER COLUMN last_active_date DROP DEFAULT;
```

## How the Streak System Works

1. **Streak Tracking**: When a user marks a task as "done" in the Study Planner, the streak is automatically updated.

2. **Streak Rules**:
   - If the user completes at least one task on a given day, that day counts as an active day.
   - The current streak increments if they complete a task on consecutive days.
   - If they complete another task on the same day, the streak is not incremented again.
   - If they miss a day, the next completed task resets the current streak to 1.
   - The longest streak only changes when the current streak exceeds the previous best.
   - Last active date tracks when the user last completed a task.

3. **Streak Display**: The Streak card appears on the dashboard showing:
   - Current streak (number of consecutive days with completed tasks)
   - Longest streak (personal best)
   - Delta message showing consistency progress

## Files Modified

- `lib/streaks.ts` - New utility functions for streak management
- `app/dashboard/study-planner/page.tsx` - Calls streak update when task marked as done
- `app/dashboard/page.tsx` - Displays streak card on dashboard

## API Integration Points

**`updateStreakOnTaskComplete(supabase, userId)`**

- Called when a task status changes to "done"
- Updates the current_streak and longest_streak in the database
- Automatically resets current streak if a day was missed

**`getOrCreateStreak(supabase, userId)`**

- Fetches the user's streak data
- Creates a new streak record if one doesn't exist
- Used on dashboard to display streak information

## Testing the Feature

1. Create a task in the Study Planner
2. Mark it as complete (checkbox)
3. Go to the Dashboard
4. The Streak card should show "1" as the current streak
5. Mark another task as complete the next day to see the streak increment
6. Miss a day and complete a task again - the current streak should reset to 1 but longest streak stays the same

## Notes

- Streaks are per-user and isolated by Row Level Security (RLS) policies
- The last_active_date is stored as a DATE (not TIMESTAMP) for easier day-based calculations
- Midnight timezone handling: Currently uses the user's local date. For production, consider using a user timezone preference
