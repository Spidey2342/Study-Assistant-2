import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Trophy,
  RefreshCw,
  Home,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { saveAttempt } from '@/lib/quiz-storage';


interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface ResultsState {
  answers: (number | null)[];
  questions: Question[];
  course: {
    courseId: string;
    title: string;
  };
}

export function QuizResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();

  const state = location.state as ResultsState | null;
useEffect(() => {
  const topicBreakdown: Record<
    string,
    { correct: number; total: number }
  > = {};

  questions.forEach((q, index) => {
    if (!topicBreakdown[q.topic]) {
      topicBreakdown[q.topic] = { correct: 0, total: 0 };
    }

    topicBreakdown[q.topic].total += 1;

    if (answers[index] === q.correctAnswer) {
      topicBreakdown[q.topic].correct += 1;
    }
  });

  saveAttempt({
    id: crypto.randomUUID(),
    courseId: state.course.courseId,
    courseTitle: state.course.title,
    score,
    completedAt: new Date().toISOString(),
    topicBreakdown,
  });
}, []);


  // 🚨 Guard: results page accessed without state
  useEffect(() => {
    if (!state || !state.answers || !state.questions) {
      navigate('/courses', { replace: true });
    }
  }, [state, navigate]);

  if (!state) return null;

  const { answers, questions } = state;

  const correctAnswers = answers.filter(
    (answer, index) => answer === questions[index].correctAnswer
  ).length;

  const score = Math.round((correctAnswers / questions.length) * 100);

  const getMessage = () => {
    if (score >= 90) return { text: 'Outstanding! 🎉', color: 'text-green-400' };
    if (score >= 70) return { text: 'Great Job! 👏', color: 'text-indigo-400' };
    if (score >= 50) return { text: 'Good Effort! 💪', color: 'text-yellow-400' };
    return { text: 'Keep Practicing! 📚', color: 'text-orange-400' };
  };

  const message = getMessage();

  return (
    <div className="dark min-h-screen bg-background p-4 md:p-8 overflow-auto">
      <div className="max-w-5xl mx-auto">
        {/* Score Card */}
        <div className="rounded-2xl p-8 md:p-12 backdrop-blur-xl border border-white/10 mb-8 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>

          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${message.color}`}>
            {message.text}
          </h1>

          <div className="flex items-center justify-center gap-8 mb-6 flex-wrap">
            <div>
              <p className="text-5xl font-bold">{score}%</p>
              <p className="text-sm text-muted-foreground mt-2">Your Score</p>
            </div>
            <div>
              <p className="text-4xl font-bold">
                {correctAnswers}/{questions.length}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Correct Answers
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(`/quiz/${courseId}`)}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 flex items-center gap-2 justify-center"
            >
              <RefreshCw className="w-4 h-4 text-white" />
              <span className="text-white font-semibold">Retake Quiz</span>
            </button>

            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center gap-2 justify-center"
            >
              <Home className="w-4 h-4" />
              <span className="font-semibold">Dashboard</span>
            </button>
          </div>
        </div>

        {/* Review */}
        <h2 className="text-2xl font-bold mb-6">Review Answers</h2>

        <div className="space-y-6">
          {questions.map((question, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <div
                key={question.id}
                className="rounded-2xl p-6 backdrop-blur-xl border border-white/10"
              >
                <div className="flex gap-4 mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isCorrect
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Question {index + 1}
                    </p>
                    <h3 className="font-semibold">{question.question}</h3>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {question.options.map((option, optionIndex) => {
                    const isUserAnswer = userAnswer === optionIndex;
                    const isCorrectAnswer =
                      question.correctAnswer === optionIndex;

                    return (
                      <div
                        key={optionIndex}
                        className={`p-4 rounded-xl border ${
                          isCorrectAnswer
                            ? 'bg-green-500/10 border-green-500/30'
                            : isUserAnswer
                            ? 'bg-red-500/10 border-red-500/30'
                            : 'bg-white/5 border-white/10'
                        }`}
                      >
                        {option}
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
                  <p className="text-sm font-semibold text-indigo-400 mb-1">
                    Explanation
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {question.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
