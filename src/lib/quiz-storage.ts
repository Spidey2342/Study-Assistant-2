// src/lib/quiz-storage.ts
import { QuizAttempt } from '@/types/quiz';

const KEY = 'quiz_attempts';

export function getAttempts(): QuizAttempt[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]');

    if (!Array.isArray(raw)) return [];

    return raw.filter(
      (a: any) =>
        a &&
        typeof a.score === 'number' &&
        typeof a.completedAt === 'string' &&
        typeof a.topicBreakdown === 'object'
    );
  } catch {
    return [];
  }
}

export function saveAttempt(attempt: QuizAttempt) {
  const attempts = getAttempts();
  attempts.push(attempt);
  localStorage.setItem(KEY, JSON.stringify(attempts));
}
