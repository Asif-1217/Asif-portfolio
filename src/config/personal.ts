// ============================================================
// Personal Information Configuration
// ============================================================

export const personalInfo = {
  name: 'Asif Al Masud',
  title: 'CSE Student | Competitive Programmer',
  university: 'Daffodil International University',
  department: 'Computer Science & Engineering',
  graduationYear: '2029',
  location: 'Savar, Dhaka, Bangladesh',
  email: 'asifalmasud17@gmail.com',
  bio: `I am a Computer Science and Engineering student at Daffodil International University, dedicated to problem-solving, algorithms, data structures, and competitive programming.

Through continuous problem-solving across various online judges, I have developed a strong foundation in algorithmic thinking and programming using C, C++, Java, and Python.

I enjoy tackling challenging programming problems, exploring new technologies, and continuously improving my technical skills. My goal is to become a skilled software engineer and build efficient, meaningful, real-world solutions.`,
  profileImage: '/images/profile.jpg', // Place your profile photo here
};

export const educationData = [
  {
    level: 'university' as const,
    degree: 'B.Sc. in Computer Science & Engineering',
    institution: 'Daffodil International University',
    year: '2025 – 2029',
    status: 'Currently Enrolled',
    gpa: undefined,
    icon: 'GraduationCap',
  },
  {
    level: 'college' as const,
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Savar Model College',
    year: 'Completed',
    status: 'Completed',
    gpa: '5.00',
    icon: 'BookOpen',
  },
  {
    level: 'school' as const,
    degree: 'Secondary School Certificate (SSC)',
    institution: 'A.E.R.E School and College',
    year: 'Completed',
    status: 'Completed',
    gpa: '5.00',
    icon: 'Award',
  },
];
