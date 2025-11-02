import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Activity, LogOut } from 'lucide-react';

const Header = ({ coachName, isHeadCoach, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <Activity className="w-8 h-8 text-orange-500" />
          <span className="text-xl font-bold text-gray-900">Coach's Corner</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {coachName} {isHeadCoach && <span className="text-orange-600">(Head Coach)</span>}
          </span>
          <Button variant="ghost" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

