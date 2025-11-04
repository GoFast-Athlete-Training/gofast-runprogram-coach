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
          <div className="w-20 h-20 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-6">
            <Activity className="w-10 h-10" />
          </div>
          <CardTitle className="text-4xl mb-4">Welcome</CardTitle>
          <CardDescription className="text-lg">
            See your coaching experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button 
            onClick={() => navigate('/login')} 
            size="lg" 
            className="w-full"
          >
            Go
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Welcome;

