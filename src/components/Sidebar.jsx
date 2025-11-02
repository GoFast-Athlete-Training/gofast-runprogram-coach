import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { LayoutDashboard, Users, Activity, FileText, Crown } from 'lucide-react';
import { cn } from '../lib/utils';

const Sidebar = ({ isHeadCoach }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/roster', label: 'Roster', icon: Users },
    { path: '/workout', label: 'Workout', icon: Activity },
    { path: '/report', label: 'Report', icon: FileText },
  ];

  if (isHeadCoach) {
    menuItems.push({ path: '/headcoach', label: 'Head Coach HQ', icon: Crown });
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.path}
              variant={isActive ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start',
                isActive && 'bg-orange-500 text-white hover:bg-orange-600'
              )}
              onClick={() => navigate(item.path)}
            >
              <Icon className="w-4 h-4 mr-2" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;

