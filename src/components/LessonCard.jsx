import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Calendar, Clock, MapPin } from 'lucide-react';

const LessonCard = ({ workout }) => {
  if (!workout) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">No workout scheduled for this week</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
      <CardHeader>
        <CardTitle className="text-2xl">{workout.title}</CardTitle>
        <CardDescription className="text-orange-100">
          {workout.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>{workout.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>{workout.duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>{workout.location}</span>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Focus Areas:</h4>
          <div className="flex flex-wrap gap-2">
            {workout.focusAreas.map((area, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/20 rounded-full text-sm"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonCard;

