import type { SkillCategory } from '../types';

// ============================================================
// Skills Configuration
// ============================================================

export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    icon: 'Code2',
    skills: [
      { name: 'C' },
      { name: 'C++' },
      { name: 'Java' },
      { name: 'Python' },
    ],
  },
  {
    title: 'Core Computer Science',
    icon: 'Cpu',
    skills: [
      { name: 'Data Structures' },
      { name: 'Algorithms' },
      { name: 'Problem Solving' },
      { name: 'Object-Oriented Programming' },
    ],
  },
  {
    title: 'Competitive Programming',
    icon: 'Trophy',
    skills: [
      { name: 'Algorithmic Problem Solving' },
      { name: 'Contest Participation' },
      { name: 'Codeforces' },
      { name: 'VJudge' },
    ],
  },
  {
    title: 'Development Tools',
    icon: 'Wrench',
    skills: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Visual Studio Code' },
    ],
  },
];
