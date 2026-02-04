import { Play, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  id: string;
  title: string;
  questionsCount: number;
  difficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  icon: string;
}

export function CourseCard({ id, title, questionsCount, difficulty, icon }: CourseCardProps) {
  const navigate = useNavigate();

  return (
    <div className="group rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-xl border border-white/10 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer"
      style={{
        background: 'var(--glass-gradient)',
      }}>
      {/* Icon */}
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
        <span className="text-xl md:text-2xl">{icon}</span>
      </div>

      {/* Title */}
      <h3 className="font-bold mb-2 group-hover:text-indigo-400 transition-colors text-sm md:text-base truncate">{title}</h3>
      
      {/* Questions Count */}
      <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
        <BookOpen className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
        <span className="truncate">{questionsCount} questions</span>
      </div>

      {/* Difficulty Mix */}
      <div className="mb-3 md:mb-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Difficulty Mix</span>
        </div>
        <div className="flex gap-1 h-1.5 rounded-full overflow-hidden bg-white/5">
          <div 
            className="bg-green-500" 
            style={{ width: `${(difficulty.easy / questionsCount) * 100}%` }}
          />
          <div 
            className="bg-yellow-500" 
            style={{ width: `${(difficulty.medium / questionsCount) * 100}%` }}
          />
          <div 
            className="bg-red-500" 
            style={{ width: `${(difficulty.hard / questionsCount) * 100}%` }}
          />
        </div>
        <div className="flex items-center gap-2 md:gap-3 text-xs text-muted-foreground mt-1">
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500" />
            <span className="hidden sm:inline">{difficulty.easy} Easy</span>
            <span className="sm:hidden">{difficulty.easy}</span>
          </span>
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-500" />
            <span className="hidden sm:inline">{difficulty.medium} Med</span>
            <span className="sm:hidden">{difficulty.medium}</span>
          </span>
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500" />
            <span className="hidden sm:inline">{difficulty.hard} Hard</span>
            <span className="sm:hidden">{difficulty.hard}</span>
          </span>
        </div>
      </div>

      {/* Start Button */}
      <button 
        onClick={() => navigate(`/quiz/${id}`)}
        className="w-full px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2 group/btn"
      >
        <Play className="w-3 h-3 md:w-4 md:h-4 text-white group-hover/btn:translate-x-0.5 transition-transform" />
        <span className="text-white font-semibold text-xs md:text-sm">Start Quiz</span>
      </button>
    </div>
  );
}