import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Youtube, Settings, Sparkles, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/courses', icon: BookOpen, label: 'Courses' },
    { to: '/references', icon: Youtube, label: 'References' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile/Tablet Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:sticky top-0 h-screen
          w-64 backdrop-blur-xl border-r border-white/10
          flex flex-col z-50 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{
          background: 'var(--sidebar)',
        }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold tracking-tight">Study-Assistant(V1)</h1>
              <p className="text-xs text-muted-foreground">Exam Prep Pro</p>
            </div>
          </div>
          
          {/* Close button for mobile/tablet */}
          <button 
            onClick={onClose}
            className="lg:hidden w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => onClose()}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-accent text-accent-foreground shadow-lg shadow-indigo-500/20'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-600/10 border border-indigo-500/20">
            <p className="text-xs text-muted-foreground">Need help?</p>
            <p className="text-sm mt-1">View Documentation</p>
          </div>
        </div>
      </aside>
    </>
  );
}
