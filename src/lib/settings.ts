export interface UserSettings {
  displayName: string;
  email: string;
  notifications: {
    dailyQuiz: boolean;
    weeklyProgress: boolean;
    newCourses: boolean;
  };
  theme: 'dark' | 'light' | 'auto';
}

const KEY = 'user_settings';

export function getSettings(): UserSettings {
  return (
    JSON.parse(localStorage.getItem(KEY) || 'null') ?? {
      displayName: 'Student',
      email: '',
      notifications: {
        dailyQuiz: true,
        weeklyProgress: true,
        newCourses: false,
      },
      theme: 'dark',
    }
  );
}

export function saveSettings(settings: UserSettings) {
  localStorage.setItem(KEY, JSON.stringify(settings));
}
