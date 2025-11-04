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
  week: 7,
  weekFocus: 'Dependability & Loyalty',
  date: 'Wednesday, Nov. 5',
  school: 'Discovery Elementary',
  title: 'Week 7: Dependability & Loyalty',
  description: 'Instructor – Lesson is to be there when you say you will be & do the things you promised.',
  goal: '2 ¾ miles',
  workout: [
    {
      name: '3 lap warm up',
      description: '',
      duration: null,
      reps: null
    },
    {
      name: 'Body weight conditioning',
      description: '2 sets of 10 each',
      duration: null,
      reps: '2 sets of 10 each',
      exercises: [
        'Squats',
        'Jumping jacks',
        'Alternating reverse lunges',
        'Single leg squats',
        'Pushups',
        'Sit ups'
      ]
    },
    {
      name: 'Run 8 laps at Tempo',
      description: '',
      duration: null,
      reps: '8 laps'
    }
  ],
  discussion: {
    topic: 'Discuss Loyalty & Dependability',
    example: 'Parents are dependable because they pick you up after school when they say they will and you can depend on parents to feed you and fix things.',
    story: "My best friend asked me to help him practice for the school spelling bee. I promised I'd help him every day after school. Even when I really wanted to go home and play video games, I still showed up to help him practice. That's called being dependable; keeping your promises and showing others they can count on you. And loyalty means standing by your friends and supporting them, even when it's not always easy or fun. My friend didn't win first place, but he said he felt like a winner because I was there for him.",
    definitions: {
      dependability: 'keeping your word and being reliable',
      loyalty: 'being a good friend and sticking with someone through thick and thin'
    },
    notes: 'This helps kids connect their actions (like showing up, helping, supporting friends) to these important character traits.'
  },
  instructorNotes: [
    'Map out the 5K run course which should be 600-800m laps for optimal spectator viewing.',
    "Speak with Extended Day manager to coordinate the Extended day students' spectating and supporting the runners of the final 5K. They will come out to cheer on their peers.",
    'Encourage Extended Day to make signs and bring noise makers to the 5K finish line.'
  ],
  homeAssignment: 'Running assignment of 10 minutes 1 X this week and stretch for 2 minutes each day.'
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

