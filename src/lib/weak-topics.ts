// src/lib/weak-topics.ts
import { QuizAttempt } from '@/types/quiz';

export function getWeakTopics(attempts: QuizAttempt[]) {
  const topics: Record<string, { correct: number; total: number }> = {};

  attempts.forEach(attempt => {
    Object.entries(attempt.topicBreakdown).forEach(([topic, data]) => {
      if (!topics[topic]) {
        topics[topic] = { correct: 0, total: 0 };
      }
      topics[topic].correct += data.correct;
      topics[topic].total += data.total;
    });
  });

  return Object.entries(topics)
    .map(([topic, data]) => ({
      topic,
      accuracy: Math.round((data.correct / data.total) * 100),
      attempts: data.total,
    }))
    .filter(t => t.attempts >= 3 && t.accuracy < 60)
    .sort((a, b) => a.accuracy - b.accuracy);
}
