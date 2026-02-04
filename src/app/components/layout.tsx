import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="dark min-h-screen flex bg-background text-foreground">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 overflow-auto">
        <Outlet context={{ onMenuClick: () => setIsSidebarOpen(true) }} />
      </main>
    </div>
  );
}
