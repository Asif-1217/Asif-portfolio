import type { Project } from '../types';

// ============================================================
// Projects Configuration
// Add your real projects here. Each project supports:
// - title, subtitle, description, technologies, category, githubUrl, liveUrl, imageUrl
// ============================================================

export const projects: Project[] = [
  {
    id: 'landguard',
    title: 'LANDGUARD',
    subtitle: 'Land Conflict Intelligence System',
    description:
      'A web-based prototype that simulates a Land Conflict Intelligence System. Helps users identify potential inconsistencies in land records through transparent, rule-based analysis and clear risk explanations. Built with synthetic demo data for educational purposes.',
    technologies: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'SVG Charts', 'Synthetic Demo Dataset'],
    category: 'Hackathon Project',
    githubUrl: 'https://github.com/Asif-1217/LANDGUARD',
    liveUrl: '',
    imageUrl:
      'https://raw.githubusercontent.com/Asif-1217/LANDGUARD/main/screenshots/dashboard.png',
    imageFit: 'cover',
    featured: true,
    placeholder: false,
  },
  {
    id: 'maze-solver',
    title: 'Maze Solver',
    subtitle: 'BFS & DFS Pathfinding in C++',
    description:
      'A C++ console application that generates and solves mazes using Breadth-First Search (BFS) and Depth-First Search (DFS) algorithms. Supports random maze generation, perfect maze generation (Recursive Backtracker), file-based maze loading, manual input, and a side-by-side algorithm comparison with timing stats. BFS guarantees the shortest path; DFS is faster but non-optimal.',
    technologies: ['C++', 'BFS', 'DFS', 'Recursive Backtracker', 'STL'],
    category: 'Algorithm Lab Project',
    githubUrl: 'https://github.com/Asif-1217/Algo-Lab-project-Maze-Solver',
    liveUrl: '',
    imageUrl: '/images/projects/maze-solver.png',
    imageFit: 'contain',
    featured: false,
    placeholder: false,
  },
  {
    id: 'campus-lost-found',
    title: 'CampusLostFound',
    subtitle: 'OOP Campus Item Recovery System',
    description:
      'A modular Java console application built on Object-Oriented Programming (OOP) principles to streamline reporting, tracking, and claiming lost items on campus. Features dual role-based dashboards for Students and Admins, automated category matching between lost and found entries, claim verification workflows, and file-based persistence.',
    technologies: ['Java', 'OOP', 'Inheritance & Polymorphism', 'File I/O', 'Modular Architecture'],
    category: 'Java OOP Project',
    githubUrl: 'https://github.com/Asif-1217/CampusLostFound',
    liveUrl: '',
    imageUrl: '/images/projects/campus-lost-found.jpg',
    imageFit: 'cover',
    featured: false,
    placeholder: false,
  },
  {
    id: 'coming-soon',
    title: 'More Projects Coming Soon',
    subtitle: 'Currently in development',
    description:
      'I’m working on new ideas and building more projects. Check back soon for updates.',
    technologies: [],
    category: 'Coming Soon',
    featured: false,
    placeholder: true,
  },
];
