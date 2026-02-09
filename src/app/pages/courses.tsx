import { TopBar } from '@/app/components/topbar';
import { CourseCard } from '@/app/components/course-card';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { getAttempts } from '@/lib/quiz-storage';
import { calculateStreak } from '@/lib/streak';
import { getWeakTopics } from '@/lib/weak-topics';
import { getProgressSeries } from '@/lib/progress';

import programmingConcepts from '../../data/programming-concept.json';
import elementOfProgramming from '../../data/elements-of-programming.json';
import programmingToolsTechniques from '../../data/programming-tools-technique.json';
import fundamentalOfComputerScience from '../../data/fundamentals-of-computer-science.json';
import basicElectronics from '../../data/basic-electronics.json';
import setTheory from '../../data/set-theory.json';
import evolutionOfTourism from '../../data/evolution-of-tourism.json';
import hospitality from '../../data/hospitality-tourism-concepts.json';
import growthTourism from '../../data/growth-of-the-tourism-industry.json';


function getDifficultyStats(questions: any[]) {
  return questions.reduce(
    (acc, q) => {
      acc[q.difficulty]++;
      return acc;
    },
    { easy: 0, medium: 0, hard: 0 }
  );
}


export function CoursesPage() {
  const { onMenuClick } = useOutletContext<{ onMenuClick: () => void }>();
  const navigate = useNavigate();
  const attempts = getAttempts();
const stats = {
    totalQuizzes: attempts.length,
    averageScore:
      attempts.length === 0
        ? 0
        : Math.round(
            attempts.reduce((s, a) => s + a.score, 0) / attempts.length
          ),
    bestScore:
      attempts.length === 0
        ? 0
        : Math.max(...attempts.map(a => a.score)),
    streak: calculateStreak(attempts),
    weakTopics: getWeakTopics(attempts),
    progress: getProgressSeries(attempts),
  };  

  const courses = [
    {
      id: programmingConcepts.courseId,
      title: programmingConcepts.title,
      icon: programmingConcepts.icon,
      questionsCount: programmingConcepts.questions.length,
      difficulty: getDifficultyStats(programmingConcepts.questions),
    },
    {
      id: elementOfProgramming.courseId,
      title: elementOfProgramming.title,
      icon: elementOfProgramming.icon,
      questionsCount: elementOfProgramming.questions.length,
      difficulty: getDifficultyStats(elementOfProgramming.questions),
    },
    {
      id: programmingToolsTechniques.courseId,
      title: programmingToolsTechniques.title,
      icon: programmingToolsTechniques.icon,
      questionsCount: programmingToolsTechniques.questions.length,
      difficulty: getDifficultyStats(programmingToolsTechniques.questions),
    },
     {
      id: fundamentalOfComputerScience.courseId,
      title: fundamentalOfComputerScience.title,
      icon: fundamentalOfComputerScience.icon,
      questionsCount: fundamentalOfComputerScience.questions.length,
      difficulty: getDifficultyStats(fundamentalOfComputerScience.questions),
    },
     {
      id: basicElectronics.courseId,
      title: basicElectronics.title,
      icon: basicElectronics.icon,
      questionsCount: basicElectronics.questions.length,
      difficulty: getDifficultyStats(basicElectronics.questions),
    },
     {
      id: setTheory.courseId,
      title: setTheory.title,
      icon: setTheory.icon,
      questionsCount: setTheory.questions.length,
      difficulty: getDifficultyStats(setTheory.questions),
    },
    {
      id: evolutionOfTourism.courseId,
      title: evolutionOfTourism.title,
      icon: evolutionOfTourism.icon,
      questionsCount: evolutionOfTourism.questions.length,
      difficulty: getDifficultyStats(evolutionOfTourism.questions)
    },
     {
      id: hospitality.courseId,
      title: hospitality.title,
      icon: hospitality.icon,
      questionsCount: hospitality.questions.length,
      difficulty: getDifficultyStats(hospitality.questions)
    },
     {
      id: growthTourism.courseId,
      title: growthTourism.title,
      icon: growthTourism.icon,
      questionsCount: growthTourism.questions.length,
      difficulty: getDifficultyStats(growthTourism.questions)
    }
  ];
    const hasData = stats.totalQuizzes > 0;

  return (
    <div className="h-full flex flex-col">
      <TopBar
  title="Courses"
  streak={hasData ? stats.streak : 0}
  onMenuClick={onMenuClick}
/>

      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              Choose Your Course
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Select a course to start practicing
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                {...course}
                onClick={() => navigate(`/quiz/${course.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
