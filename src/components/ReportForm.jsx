import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Star } from 'lucide-react';

const ReportForm = ({ athletes, onSubmit }) => {
  const [selectedAthlete, setSelectedAthlete] = useState('');
  const [rating, setRating] = useState(5);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const report = {
      athleteId: selectedAthlete,
      rating: parseInt(rating),
      notes,
      date: new Date().toISOString(),
    };

    // Save to localStorage (demo)
    const existingReports = JSON.parse(localStorage.getItem('bgr_reports') || '[]');
    existingReports.push(report);
    localStorage.setItem('bgr_reports', JSON.stringify(existingReports));

    setSubmitted(true);
    
    if (onSubmit) {
      onSubmit(report);
    }

    // Reset form after 2 seconds
    setTimeout(() => {
      setSubmitted(false);
      setSelectedAthlete('');
      setRating(5);
      setNotes('');
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Feedback Report</CardTitle>
        <CardDescription>
          Submit feedback for athletes (1-10 rating + notes)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="text-center py-4 text-green-600">
            <p className="font-semibold">Report submitted successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Select Athlete</label>
              <select
                value={selectedAthlete}
                onChange={(e) => setSelectedAthlete(e.target.value)}
                required
                className="flex h-9 w-full rounded-md border border-zinc-300 bg-transparent px-3 py-1 text-sm"
              >
                <option value="">Choose an athlete...</option>
                {athletes.map((athlete) => (
                  <option key={athlete.id} value={athlete.id}>
                    {athlete.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Rating (1-10)
              </label>
              <div className="flex items-center space-x-4">
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                  className="w-20"
                />
                <div className="flex space-x-1">
                  {[...Array(10)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="flex min-h-[120px] w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500"
                placeholder="Add your observations, progress notes, and recommendations..."
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Submit Feedback
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportForm;

