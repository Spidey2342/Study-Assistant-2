import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/app/components/layout';
import { DashboardPage } from '@/app/pages/dashboard';
import { CoursesPage } from '@/app/pages/courses';
import { ReferencesPage } from '@/app/pages/references';
import { SettingsPage } from '@/app/pages/settings';
import { QuizPage } from '@/app/pages/quiz';
import { QuizResultsPage } from '@/app/pages/quiz-results';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="references" element={<ReferencesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="/quiz/:courseId" element={<QuizPage />} />
        <Route path="/quiz/:courseId/results" element={<QuizResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}