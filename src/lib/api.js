/**
 * API Configuration for GoFast BGR Coach Portal
 * 
 * Backend Base URL: https://api.gofast.com/api/bgr
 * Alternative: https://gofastbackendv2-fall2025.onrender.com/api/bgr
 */

const API_BASE = import.meta.env.VITE_API_BASE || 'https://gofastbackendv2-fall2025.onrender.com/api';
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY || 'bgr';

export const API_CONFIG = {
  base: `${API_BASE}/bgr`,
  projectKey: PROJECT_KEY,
};

/**
 * Helper to build API URLs
 */
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.base}${endpoint}`;
};

/**
 * Helper for fetch requests with error handling
 */
export const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

/**
 * Coach hydration endpoints
 */
export const coachApi = {
  hydrate: (coachId) => buildApiUrl(`/coach/${coachId}/hydrate`),
  getRoster: (coachId, siteId) => buildApiUrl(`/coach/${coachId}/roster?siteId=${siteId}`),
  getCurrentWorkout: (siteId) => buildApiUrl(`/workout/current?siteId=${siteId}`),
  getAttendance: (siteId, week) => buildApiUrl(`/attendance?siteId=${siteId}&week=${week}`),
  submitReport: () => buildApiUrl(`/report`),
  headCoachStats: () => buildApiUrl(`/headcoach/stats`),
  headCoachBroadcast: () => buildApiUrl(`/headcoach/broadcast`),
};

