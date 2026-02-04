// src/lib/streak.ts
import { QuizAttempt } from '@/types/quiz';

function normalize(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function calculateStreak(attempts: QuizAttempt[]): number {
  if (attempts.length === 0) return 0;

  const dates = Array.from(
    new Set(
      attempts.map(a =>
        normalize(new Date(a.completedAt)).toISOString()
      )
    )
  )
    .map(d => new Date(d))
    .sort((a, b) => b.getTime() - a.getTime());

  let streak = 1;

  for (let i = 0; i < dates.length - 1; i++) {
    const diff =
      (dates[i].getTime() - dates[i + 1].getTime()) /
      (1000 * 60 * 60 * 24);

    if (diff === 1) streak++;
    else break;
  }

  return streak;
}
