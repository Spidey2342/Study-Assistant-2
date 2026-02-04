import { TopBar } from '@/app/components/topbar';
import { StatCard } from '@/app/components/stat-card';
import { ProgressChart } from '@/app/components/progress-chart';
import { WeakTopics } from '@/app/components/weak-topics';
import { BookOpen, TrendingUp, Trophy, Play, Flame } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import { getAttempts } from '@/lib/quiz-storage';
import { calculateStreak } from '@/lib/streak';
import { getWeakTopics } from '@/lib/weak-topics';
import { getProgressSeries } from '@/lib/progress';
import { getSettings } from '@/lib/settings';
import { sendNotification } from '@/lib/notifications';


export function DashboardPage() {
  const navigate = useNavigate();
  const { onMenuClick } = useOutletContext<{ onMenuClick: () => void }>();

  useEffect(() => {
  const settings = getSettings();

  if (settings.notifications.dailyQuiz) {
    sendNotification(
      'Daily Quiz Reminder 📚',
      'Keep your streak alive — take a quick quiz!'
    );
  }
}, []);

  /** SOURCE OF TRUTH */
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

  const hasData = stats.totalQuizzes > 0;

  return (
    <div className="h-full flex flex-col">
     <TopBar
  title="Dashboard"
  streak={hasData ? stats.streak : 0}
  onMenuClick={onMenuClick}
/>


      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Greeting */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              Welcome back 👋
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              {hasData
                ? 'Here’s how you’re progressing'
                : 'Start your first quiz to see your progress'}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <StatCard
              title="Total Quizzes"
              value={stats.totalQuizzes}
              icon={BookOpen}
              trend={hasData ? 'Keep going' : 'No quizzes taken yet'}
              trendUp={hasData}
            />

            <StatCard
              title="Average Score"
              value={hasData ? `${stats.averageScore}%` : '--'}
              icon={TrendingUp}
              trend={
                hasData
                  ? 'Based on completed quizzes'
                  : 'Not available yet'
              }
              trendUp={hasData}
            />

            <StatCard
              title="Best Score"
              value={hasData ? `${stats.bestScore}%` : '--'}
              icon={Trophy}
              trend={hasData ? 'Personal best' : 'No data yet'}
              trendUp={hasData}
            />
          </div>

          {/* Progress & Weak Topics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="lg:col-span-2">
              <ProgressChart data={stats.progress} />
            </div>
            <div>
              <WeakTopics topics={stats.weakTopics} />
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/courses')}
              className="w-full md:w-auto group px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105"
            >
              <div className="flex items-center justify-center gap-3">
                <Play className="w-5 h-5 text-white" />
                <span className="font-semibold text-white">
                  Start a Quiz
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
