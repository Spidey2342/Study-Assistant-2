import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export function StatCard({ title, value, icon: Icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-xl border border-white/10"
      style={{
        background: 'var(--glass-gradient)',
      }}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2 truncate">{title}</p>
          <p className="text-2xl md:text-3xl font-bold tracking-tight">{value}</p>
          {trend && (
            <p className={`text-xs md:text-sm mt-1 md:mt-2 truncate ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
              {trendUp ? '↗' : '↘'} {trend}
            </p>
          )}
        </div>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />
        </div>
      </div>
    </div>
  );
}