import { TopBar } from '@/app/components/topbar';
import { User, Bell, Shield, Palette } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getSettings, saveSettings } from '@/lib/settings';
import { requestNotificationPermission } from '@/lib/notifications';
import { getAttempts } from '@/lib/quiz-storage';
import { calculateStreak } from '@/lib/streak';
import { getWeakTopics } from '@/lib/weak-topics';
import { getProgressSeries } from '@/lib/progress';

export function SettingsPage() {
  const { onMenuClick } = useOutletContext<{ onMenuClick: () => void }>();
  const [settings, setSettings] = useState(getSettings());

useEffect(() => {
  saveSettings(settings);
}, [settings]);

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
  title="Settings"
  streak={hasData ? stats.streak : 0}
  onMenuClick={onMenuClick}
/>
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Settings</h1>
            <p className="text-sm md:text-base text-muted-foreground">Manage your account and preferences</p>
          </div>

          <div className="space-y-4 md:space-y-6">
            {/* Profile Section */}
            <div className="rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-xl border border-white/10"
              style={{
                background: 'var(--glass-gradient)',
              }}>
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <User className="w-4 h-4 md:w-5 md:h-5 text-indigo-400 flex-shrink-0" />
                <h3 className="font-bold text-sm md:text-base">Profile</h3>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-xs md:text-sm text-muted-foreground mb-2">Display Name</label>
              <input
  type="text"
  value={settings.displayName}
  onChange={(e) =>
    setSettings({ ...settings, displayName: e.target.value })
  }
  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl
             bg-white/5 border border-white/10
             focus:border-indigo-500/50 outline-none
             transition-colors text-sm md:text-base"
/>


                </div>
                <div>
                  <label className="block text-xs md:text-sm text-muted-foreground mb-2">Email</label>
                  <input
  type="email"
  value={settings.email}
  onChange={(e) =>
    setSettings({ ...settings, email: e.target.value })
    
  }
  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl
             bg-white/5 border border-white/10
             focus:border-indigo-500/50 outline-none
             transition-colors text-sm md:text-base"
/>

                </div>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-xl border border-white/10"
              style={{
                background: 'var(--glass-gradient)',
              }}>
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <Bell className="w-4 h-4 md:w-5 md:h-5 text-indigo-400 flex-shrink-0" />
                <h3 className="font-bold text-sm md:text-base">Notifications</h3>
              </div>
              <div className="space-y-4">
  {/* Daily quiz */}
  <label className="flex items-center justify-between cursor-pointer group">
    <span className="text-xs md:text-sm truncate pr-4">
      Daily quiz reminders
    </span>

    <div className="relative flex-shrink-0">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={settings.notifications.dailyQuiz}
        onChange={async (e) => {
          if (e.target.checked) {
            const allowed = await requestNotificationPermission();
            if (!allowed) {
              // hard stop: revert toggle
              e.target.checked = false;
              return;
            }
          }

          setSettings({
            ...settings,
            notifications: {
              ...settings.notifications,
              dailyQuiz: e.target.checked,
            },
          });
        }}
      />
      <div className="w-10 h-5 md:w-11 md:h-6 bg-white/10 rounded-full peer-checked:bg-indigo-600 transition-colors" />
      <div className="absolute left-0.5 top-0.5 md:left-1 md:top-1
                      w-4 h-4 bg-white rounded-full
                      transition-transform peer-checked:translate-x-5" />
    </div>
  </label>

  {/* Weekly progress */}
  <label className="flex items-center justify-between cursor-pointer group">
    <span className="text-xs md:text-sm truncate pr-4">
      Weekly progress reports
    </span>

    <div className="relative flex-shrink-0">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={settings.notifications.weeklyProgress}
        onChange={(e) =>
          setSettings({
            ...settings,
            notifications: {
              ...settings.notifications,
              weeklyProgress: e.target.checked,
            },
          })
        }
      />
      <div className="w-10 h-5 md:w-11 md:h-6 bg-white/10 rounded-full peer-checked:bg-indigo-600 transition-colors" />
      <div className="absolute left-0.5 top-0.5 md:left-1 md:top-1
                      w-4 h-4 bg-white rounded-full
                      transition-transform peer-checked:translate-x-5" />
    </div>
  </label>

  {/* New courses */}
  <label className="flex items-center justify-between cursor-pointer group">
    <span className="text-xs md:text-sm truncate pr-4">
      New course announcements
    </span>

    <div className="relative flex-shrink-0">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={settings.notifications.newCourses}
        onChange={(e) =>
          setSettings({
            ...settings,
            notifications: {
              ...settings.notifications,
              newCourses: e.target.checked,
            },
          })
        }
      />
      <div className="w-10 h-5 md:w-11 md:h-6 bg-white/10 rounded-full peer-checked:bg-indigo-600 transition-colors" />
      <div className="absolute left-0.5 top-0.5 md:left-1 md:top-1
                      w-4 h-4 bg-white rounded-full
                      transition-transform peer-checked:translate-x-5" />
    </div>
  </label>
</div>

            </div>

            {/* Appearance Section */}
            <div className="rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-xl border border-white/10"
              style={{
                background: 'var(--glass-gradient)',
              }}>
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <Palette className="w-4 h-4 md:w-5 md:h-5 text-indigo-400 flex-shrink-0" />
                <h3 className="font-bold text-sm md:text-base">Appearance</h3>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-xs md:text-sm text-muted-foreground mb-2">Theme</label>
                  <div className="grid grid-cols-3 gap-2 md:gap-3">
                    {(['dark', 'light', 'auto'] as const).map(theme => (
  <button
    key={theme}
    onClick={() => setSettings({ ...settings, theme })}
    className={`px-4 py-3 rounded-xl border transition-all ${
      settings.theme === theme
        ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400'
        : 'bg-white/5 border-white/10 hover:border-indigo-500/30'
    }`}
  >
    {theme.charAt(0).toUpperCase() + theme.slice(1)}
  </button>
))}

                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Section */}
            <div className="rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-xl border border-white/10"
              style={{
                background: 'var(--glass-gradient)',
              }}>
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-indigo-400 flex-shrink-0" />
                <h3 className="font-bold text-sm md:text-base">Privacy & Security</h3>
              </div>
              
              <div className="space-y-2 md:space-y-3">
                <button className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors text-xs md:text-sm">
                  Change Password
                </button>
                <button className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors text-xs md:text-sm">
                  Download My Data
                </button>
                <button className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-left text-red-400 transition-colors text-xs md:text-sm">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}