// src/lib/progress.ts
import { QuizAttempt } from '@/types/quiz';

export function getProgressSeries(attempts: QuizAttempt[]) {
  return attempts
    .sort(
      (a, b) =>
        new Date(a.completedAt).getTime() -
        new Date(b.completedAt).getTime()
    )
    .map(a => ({
      date: a.completedAt,
      score: a.score,
    }));
}
