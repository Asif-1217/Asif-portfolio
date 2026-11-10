// ============================================================
// Global TypeScript Types
// ============================================================

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  username: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  technologies: string[];
  category?: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  imageFit?: 'cover' | 'contain';
  featured: boolean;
  placeholder?: boolean;
}

export interface ContestAchievement {
  id: string;
  season: string;
  year: string;
  title: string;
  roles: string[];
  description: string;
  featured?: boolean;
  galleryFolder: string;
  photos: AchievementPhoto[];
}

export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  category: 'contest' | 'milestone' | 'programming';
  featured: boolean;
}

export interface AchievementPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
  status?: string;
  level: 'university' | 'college' | 'school';
}

// ============================================================
// Codeforces API Types
// ============================================================
export interface CodeforcesUser {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  contribution: number;
  friendOfCount: number;
  avatar: string;
  registrationTimeSeconds: number;
}

export interface CodeforcesRatingChange {
  contestId: number;
  contestName: string;
  handle: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
}

export interface CodeforcesSubmission {
  id: number;
  problem: {
    contestId: number;
    index: string;
    name: string;
    rating?: number;
    tags: string[];
  };
  verdict: string;
  programmingLanguage: string;
  creationTimeSeconds: number;
}

// ============================================================
// GitHub API Types
// ============================================================
export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  location: string;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  fork: boolean;
  topics: string[];
}

// ============================================================
// VJudge Types
// ============================================================
export interface VJudgeStats {
  username: string;
  totalSolved: number;
  totalSubmissions: number;
  acceptedSubmissions: number;
  acceptanceRate: number;
  ranking?: number;
  acToday: number;
  acLast7Days: number;
  acLast30Days: number;
}

