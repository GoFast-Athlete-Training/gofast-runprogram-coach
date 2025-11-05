import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Activity, ArrowRight } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <img src="/logo.avif" alt="Boys Gotta Run" className="w-20 h-20" />
          </div>
          <CardTitle className="text-4xl mb-4">Welcome Coach</CardTitle>
          <CardDescription className="text-lg">
            Each coach will get a special login to make a unique profile. You can also set the onboarding flow with videos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button 
            onClick={() => navigate('/login')} 
            size="lg" 
            className="w-full"
          >
            Take a Look Inside
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Welcome;

