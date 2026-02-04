export interface QuizAttempt {
  id: string;
  courseId: string;
  courseTitle: string;
  score: number;
  completedAt: string;

  topicBreakdown: {
    [topic: string]: {
      correct: number;
      total: number;
    };
  };
}
