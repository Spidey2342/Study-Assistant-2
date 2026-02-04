import { Flame, User, Menu } from 'lucide-react';

interface TopBarProps {
  title: string;
  streak?: number;
  onMenuClick: () => void;
}

export function TopBar({ title, streak = 7, onMenuClick }: TopBarProps) {
  return (
    <header className="h-16 border-b border-white/10 backdrop-blur-xl bg-background/50 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu - Mobile/Tablet only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-10 h-10 rounded-xl hover:bg-white/5 flex items-center justify-center"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h2 className="font-bold tracking-tight text-base md:text-xl">{title}</h2>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {/* Streak Badge */}
        <div className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
          <Flame className="w-3 md:w-4 h-3 md:h-4 text-orange-500" />
          <span className="text-xs md:text-sm font-semibold hidden xs:inline">{streak} day streak</span>
          <span className="text-xs md:text-sm font-semibold xs:hidden">{streak}d</span>
        </div>

        {/* User Avatar */}
        <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center hover:scale-105 transition-transform">
          <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </button>
      </div>
    </header>
  );
}
