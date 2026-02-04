import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ProgressPoint {
  date: string;
  score: number;
}

interface ProgressChartProps {
  data: ProgressPoint[];
}

export function ProgressChart({ data }: ProgressChartProps) {
  if (!data || data.length === 0) {
    return (
      <div
        className="rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-xl border border-white/10 flex items-center justify-center text-muted-foreground"
        style={{ background: 'var(--glass-gradient)' }}
      >
        No progress yet
      </div>
    );
  }

  return (
    <div
      className="rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-xl border border-white/10"
      style={{ background: 'var(--glass-gradient)' }}
    >
      <h3 className="font-bold mb-4 md:mb-6 text-sm md:text-base">
        Progress Over Time
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(99, 102, 241, 0.1)"
          />

          <XAxis
            dataKey="date"
            stroke="#9ca3af"
            style={{ fontSize: '10px' }}
          />

          <YAxis
            stroke="#9ca3af"
            style={{ fontSize: '10px' }}
            domain={[0, 100]}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(20, 20, 28, 0.95)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: '12px',
              color: '#f5f5f7',
              fontSize: '12px',
            }}
          />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ fill: '#6366f1', strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
