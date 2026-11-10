import type { ContestAchievement, Achievement, AchievementPhoto } from '../types';

// ============================================================
// Programming Contest Achievements Configuration
// 1. Spring 2026 — Take Off Programming Contest (Featured)
// 2. Summer 2026 — UNLOCK THE ALGORITHM Programming Contest 2026
// 3. Fall 2025 — Take Off Programming Contest
// ============================================================

export const contestAchievements: ContestAchievement[] = [
  {
    id: 'spring-2026-take-off',
    season: 'Spring 2026',
    year: '2026',
    title: 'Spring 2026 Take Off Programming Contest',
    roles: ['Mock Round Setter', 'Contributor', 'Volunteer'],
    description:
      'Glad to have contributed to the Spring 2026 Take Off Programming Contest as a Mock Round Setter, Contributor, and Volunteer.',
    featured: true,
    galleryFolder: 'spring-2026',
    photos: [
      {
        id: 'spring-2026-photo-1',
        src: '/images/achievements/spring-2026/contest-01.jpg',
        alt: 'Spring 2026 Take Off Programming Contest',
        caption: 'Contest Day Highlights',
        category: 'contest',
      },
      {
        id: 'spring-2026-photo-2',
        src: '/images/achievements/spring-2026/team-photo.jpg',
        alt: 'Spring 2026 Organizing & Setter Team',
        caption: 'Organizing & Problem Setter Team',
        category: 'team',
      },
    ],
  },
  {
    id: 'summer-2026-unlock-algorithm',
    season: 'Summer 2026',
    year: '2026',
    title: 'Summer 2026 — UNLOCK THE ALGORITHM Programming Contest 2026',
    roles: ['Contest Participant'],
    description:
      'Participated in the UNLOCK THE ALGORITHM Programming Contest 2026, gaining valuable competitive programming experience.',
    featured: false,
    galleryFolder: 'summer-2026',
    photos: [
      {
        id: 'summer-2026-photo-1',
        src: '/images/achievements/summer-2026/certificate-01.jpg',
        alt: 'UNLOCK THE ALGORITHM Certificate',
        caption: 'Certificate of Participation',
        category: 'certificate',
      },
    ],
  },
  {
    id: 'fall-2025-take-off',
    season: 'Fall 2025',
    year: '2025',
    title: 'Fall 2025 Take Off Programming Contest',
    roles: ['Contest Participant'],
    description:
      'Participated in the Fall 2025 Take Off Programming Contest and continued developing my competitive programming skills.',
    featured: false,
    galleryFolder: 'fall-2025',
    photos: [
      {
        id: 'fall-2025-photo-1',
        src: '/images/achievements/fall-2025/contest-01.jpg',
        alt: 'Fall 2025 Take Off Programming Contest',
        caption: 'Contest Day Session',
        category: 'contest',
      },
    ],
  },
];

// ============================================================
// Milestones & Problem-Solving Achievements
// ============================================================

export const milestoneAchievements: Achievement[] = [
  {
    id: 'problems-solved-500',
    title: '500+ Problems Solved',
    subtitle: 'Competitive Programming Milestone',
    description:
      'Solved over 500 programming problems across various online judges including Codeforces, VJudge, and others, demonstrating a strong foundation in algorithmic thinking.',
    date: '2025–2026',
    category: 'milestone',
    featured: false,
  },
  {
    id: 'competitive-programming',
    title: 'Competitive Programming Journey',
    subtitle: 'Contest Participation',
    description:
      'Actively participating in competitive programming contests, continuously improving algorithmic skills and problem-solving techniques.',
    date: '2025–Present',
    category: 'programming',
    featured: false,
  },
];

// Backward compatibility export
export const achievements = milestoneAchievements;
export const achievementPhotos: AchievementPhoto[] = contestAchievements[0].photos;
