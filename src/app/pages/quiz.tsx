import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, X } from 'lucide-react';

import programmingConcepts from '../../data/programming-concept.json';
import elementOfProgramming from '../../data/elements-of-programming.json'
import programmingToolsTechniques from '../../data/programming-tools-technique.json'
import fundamentalOfComputerScience from '../../data/fundamentals-of-computer-science.json'
import basicElectronics from '../../data/basic-electronics.json'
import setTheory from '../../data/set-theory.json'



const courseMap = {
  'programming-concepts': programmingConcepts,
  'elements-of-programming-language': elementOfProgramming,
  'programming-tools-techniques': programmingToolsTechniques,
  'bcsc-107-fundamentals-of-computer-science': fundamentalOfComputerScience,
  'beee-103-basic-electronics': basicElectronics,
  'set-theory': setTheory
};

const QUESTION_COUNT = 1;

export function QuizPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  // 1. Resolve course
  const course = courseId
    ? courseMap[courseId as keyof typeof courseMap]
    : null;

  // Guard: invalid course
useEffect(() => {
  if (!course) {
    navigate('/courses', { replace: true });
  }
}, [course, navigate]);

if (!course) return null;



  // 2. Pick random questions ONCE
  const questions = useMemo(() => {
    return [...course.questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, QUESTION_COUNT);
  }, [course.questions]);

  // 3. State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => Array(questions.length).fill(null)
  );
  const [isAnswered, setIsAnswered] = useState(false);

  // 4. Handle answer
  const handleAnswer = useCallback(
    (answerIndex: number | null) => {
      if (isAnswered) return;

      setIsAnswered(true);

      const newAnswers = [...answers];
      newAnswers[currentQuestion] = answerIndex;
      setAnswers(newAnswers);

      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion((q) => q + 1);
          setSelectedAnswer(null);
          setTimeLeft(15);
          setIsAnswered(false);
        } else {
          navigate(`/quiz/${courseId}/results`, {
            state: {
              answers: newAnswers,
              questions,
              course,
            },
          });
        }
      }, 1500);
    },
    [
      answers,
      currentQuestion,
      isAnswered,
      navigate,
      courseId,
      questions,
      course,
    ]
  );

  // 5. Timer
useEffect(() => {
  if (isAnswered) return;

  const timer = setInterval(() => {
    setTimeLeft((t) => {
      if (t <= 1) {
        clearInterval(timer);
        handleAnswer(selectedAnswer);
        return 0;
      }
      return t - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [isAnswered, handleAnswer, selectedAnswer]);

  const question = questions[currentQuestion];

  return (
    <div className="dark min-h-[100svh] min-h-screen bg-background text-foreground flex flex-col p-4 md:p-8 overflow-y-auto touch-pan-y">

      <div className="w-full max-w-4xl mx-auto my-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => navigate('/courses')}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex-1">
              <p className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </p>
              <div className="w-full max-w-md h-1.5 bg-white/5 rounded-full mt-2">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                  style={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Timer */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
              timeLeft <= 5
                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                : 'bg-white/5 border-white/10'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span className="font-mono font-bold">{timeLeft}s</span>
          </div>
        </div>

        {/* Question */}
        <div className="rounded-2xl p-8 bg-white/5 border border-white/10 mb-6">
         <h2 className="text-2xl font-bold mb-8 text-white">

            {question.question}
          </h2>

          <div className="grid gap-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctIndex;

              return (
               <button
  key={index}
  disabled={isAnswered}
  onClick={() => setSelectedAnswer(index)}
  className={`p-6 rounded-xl border-2 text-left transition-all text-white ${
    isAnswered
      ? isCorrect
        ? 'border-green-500/50 bg-green-500/10'
        : isSelected
        ? 'border-red-500/50 bg-red-500/10'
        : 'border-white/10 bg-white/5'
      : isSelected
      ? 'border-indigo-500/50 bg-indigo-500/20'
      : 'border-white/10 bg-white/5 hover:border-indigo-500/30'
  }`}
>
  {option}
</button>

              );
            })}
          </div>
        </div>

        {!isAnswered && selectedAnswer !== null && (
          <button
            onClick={() => handleAnswer(selectedAnswer)}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold"
          >
            Submit Answer
          </button>
        )}
      </div>
    </div>
  );
}
