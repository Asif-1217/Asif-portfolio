import axios from 'axios';
import type {
  CodeforcesUser,
  CodeforcesRatingChange,
  CodeforcesSubmission,
} from '../types';

const CF_BASE = 'https://codeforces.com/api';

// Simple in-memory cache
const cache: Record<string, { data: unknown; ts: number }> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached<T>(key: string): T | null {
  const entry = cache[key];
  if (entry && Date.now() - entry.ts < CACHE_TTL) {
    return entry.data as T;
  }
  return null;
}

function setCache(key: string, data: unknown) {
  cache[key] = { data, ts: Date.now() };
}

export async function getCodeforcesUser(handle: string): Promise<CodeforcesUser> {
  const key = `cf_user_${handle}`;
  const cached = getCached<CodeforcesUser>(key);
  if (cached) return cached;

  const { data } = await axios.get(`${CF_BASE}/user.info`, {
    params: { handles: handle },
    timeout: 10000,
  });

  if (data.status !== 'OK') throw new Error(data.comment || 'API error');
  const user = data.result[0] as CodeforcesUser;
  setCache(key, user);
  return user;
}

export async function getCodeforcesRatingHistory(
  handle: string
): Promise<CodeforcesRatingChange[]> {
  const key = `cf_rating_${handle}`;
  const cached = getCached<CodeforcesRatingChange[]>(key);
  if (cached) return cached;

  const { data } = await axios.get(`${CF_BASE}/user.rating`, {
    params: { handle },
    timeout: 10000,
  });

  if (data.status !== 'OK') throw new Error(data.comment || 'API error');
  const ratings = data.result as CodeforcesRatingChange[];
  setCache(key, ratings);
  return ratings;
}

export async function getCodeforcesSubmissions(
  handle: string,
  count = 500
): Promise<CodeforcesSubmission[]> {
  const key = `cf_submissions_${handle}_${count}`;
  const cached = getCached<CodeforcesSubmission[]>(key);
  if (cached) return cached;

  const { data } = await axios.get(`${CF_BASE}/user.status`, {
    params: { handle, count },
    timeout: 15000,
  });

  if (data.status !== 'OK') throw new Error(data.comment || 'API error');
  const submissions = data.result as CodeforcesSubmission[];
  setCache(key, submissions);
  return submissions;
}

export function getUniqueSolvedCount(submissions: CodeforcesSubmission[]): number {
  const solved = new Set<string>();
  submissions.forEach((s) => {
    if (s.verdict === 'OK') {
      solved.add(`${s.problem.contestId}-${s.problem.index}`);
    }
  });
  return solved.size;
}
