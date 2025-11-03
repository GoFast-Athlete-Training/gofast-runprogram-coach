import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { User } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Demo: Simple email-based auth
    // In production, this would call the backend API
    await new Promise(resolve => setTimeout(resolve, 500));

    // Demo: Store coach info
    const isHeadCoach = email.includes('headcoach');
    localStorage.setItem('bgr_coach_auth', JSON.stringify({
      email,
      role: isHeadCoach ? 'headcoach' : 'coach',
      siteId: isHeadCoach ? null : '1' // Head coach sees all sites
    }));

    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="w-20 h-20 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10" />
          </div>
          <CardTitle className="text-3xl">Welcome Coach</CardTitle>
          <CardDescription>
            Sign in to access the Coach's Corner
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="coach@example.com"
              />
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Demo: Use any email. Add "headcoach" in email for Head Coach access.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

