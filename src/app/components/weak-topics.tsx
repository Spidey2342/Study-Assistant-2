import { AlertCircle } from 'lucide-react';

interface WeakTopic {
  topic: string;
  accuracy: number; // 0–100
  attempts: number;
}

interface WeakTopicsProps {
  topics: WeakTopic[];
}

export function WeakTopics({ topics }: WeakTopicsProps) {
  return (
    <div
      className="rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-xl border border-white/10"
      style={{ background: 'var(--glass-gradient)' }}
    >
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-orange-400 flex-shrink-0" />
        <h3 className="font-bold text-sm md:text-base">
          Topics to Focus On
        </h3>
      </div>

      {topics.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No weak topics yet. Keep practicing 💪
        </p>
      ) : (
        <div className="space-y-3 md:space-y-4">
          {topics.map(topic => {
            const progress = topic.accuracy;

            const color =
              progress < 40
                ? '#ef4444' // red
                : progress < 60
                ? '#f59e0b' // amber
                : '#eab308'; // yellow

            return (
              <div key={topic.topic}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs md:text-sm truncate pr-2">
                    {topic.topic}
                  </span>
                  <span className="text-xs md:text-sm text-muted-foreground flex-shrink-0">
                    {progress}%
                  </span>
                </div>

                <div className="h-1.5 md:h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
