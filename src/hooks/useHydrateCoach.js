import React, { useState, useEffect } from 'react';

// Demo: Mock coach data
const mockCoachData = {
  id: '1',
  name: 'Coach Smith',
  email: 'coach@example.com',
  role: 'coach',
  siteId: '1'
};

const mockHeadCoachData = {
  id: '99',
  name: 'Head Coach Johnson',
  email: 'headcoach@example.com',
  role: 'headcoach',
  siteId: null
};

const mockRoster = [
  { id: '1', name: 'Alex Doe', age: 10, grade: '5th' },
  { id: '2', name: 'Jordan Smith', age: 11, grade: '6th' },
  { id: '3', name: 'Taylor Brown', age: 9, grade: '4th' },
  { id: '4', name: 'Morgan Lee', age: 10, grade: '5th' },
  { id: '5', name: 'Casey Wilson', age: 11, grade: '6th' },
];

const mockCurrentWorkout = {
  id: '1',
  title: 'Speed and Endurance Training',
  description: 'Focus on building speed and maintaining endurance over longer distances',
  date: 'January 15, 2025',
  duration: '45 minutes',
  location: 'Downtown Track',
  workout: [
    {
      name: 'Warm-up Run',
      description: 'Easy jog for 5 minutes',
      duration: '5 min',
      reps: null
    },
    {
      name: 'Sprint Intervals',
      description: '8 x 100m sprints with 1 minute rest',
      duration: '15 min',
      reps: '8 sets'
    },
    {
      name: 'Endurance Run',
      description: 'Moderate pace run for 1 mile',
      duration: '10 min',
      reps: '1 mile'
    },
    {
      name: 'Cool-down',
      description: 'Gentle walk and stretching',
      duration: '5 min',
      reps: null
    }
  ],
  focusAreas: ['Speed', 'Endurance', 'Form'],
  notes: 'Focus on maintaining good running form during sprints. Rest is important between intervals.'
};

const mockStats = {
  totalAthletes: 5,
  reportsSubmitted: 3,
  attendanceRate: 92
};

const mockHeadCoachStats = {
  totalSites: 3,
  totalCoaches: 8,
  totalAthletes: 45,
  attendanceRate: 92,
  reportsSubmitted: 38
};

export const useHydrateCoach = () => {
  const [coachData, setCoachData] = useState(null);
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [roster, setRoster] = useState([]);
  const [stats, setStats] = useState(null);
  const [headCoachStats, setHeadCoachStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hydrate = async () => {
      setLoading(true);

      // Demo: Just use mock data - no real API calls
      // Check localStorage for cached role (for headcoach demo)
      const auth = localStorage.getItem('bgr_coach_auth');
      const isHeadCoach = auth ? JSON.parse(auth).role === 'headcoach' : false;

      // Check localStorage cache first
      const cachedData = localStorage.getItem('bgr_coach_data');
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        setCoachData(parsed.coachData);
        setCurrentWorkout(parsed.currentWorkout);
        setRoster(parsed.roster || []);
        setStats(parsed.stats);
        if (isHeadCoach) {
          setHeadCoachStats(parsed.headCoachStats);
        }
        setLoading(false);
        return;
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Demo: Mock data only - no real API calls
      const data = {
        coachData: isHeadCoach ? mockHeadCoachData : mockCoachData,
        currentWorkout: mockCurrentWorkout,
        roster: isHeadCoach ? [] : mockRoster, // Head coach doesn't have a single roster
        stats: mockStats,
        headCoachStats: isHeadCoach ? mockHeadCoachStats : null
      };

      setCoachData(data.coachData);
      setCurrentWorkout(data.currentWorkout);
      setRoster(data.roster);
      setStats(data.stats);
      if (isHeadCoach) {
        setHeadCoachStats(data.headCoachStats);
      }

      // Cache in localStorage
      localStorage.setItem('bgr_coach_data', JSON.stringify(data));

      setLoading(false);
    };

    hydrate();
  }, []);

  return {
    coachData,
    currentWorkout,
    roster,
    stats,
    headCoachStats,
    loading
  };
};

