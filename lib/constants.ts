export const PERSONAL_INFO = {
  name: "Sharif Md. Yousuf",
  nameBn: "শরীফ মো. ইউসুফ",
  username: "SharifdotG",
  title: "Competitive Programmer & Software Developer",
  location: "Dhaka, Bangladesh",
  email: "sharifmdyousuf007@gmail.com",
  phone: "+880 1622-296740",
  university: "University of Asia Pacific",
  degree: "BSc (Eng.) in Computer Science and Engineering",
  cgpa: "3.81 / 4.00",
  graduation: "Expected 2026",
  codeforcesHandle: "SharifdotG",
  leetcodeHandle: "SharifdotG",
  codechefHandle: "sharifdotg",
  githubUrl: "https://github.com/SharifdotG",
  linkedinUrl: "https://linkedin.com/in/sharifdotg",
  twitterUrl: "https://twitter.com/SharifdotG",
  facebookUrl: "https://facebook.com/SharifdotG",
  instagramUrl: "https://instagram.com/sharifdotg",
  discordUrl: "https://discord.com/users/SharifdotG",
  codeforcesUrl: "https://codeforces.com/profile/SharifdotG",
  leetcodeUrl: "https://leetcode.com/SharifdotG",
  codechefUrl: "https://www.codechef.com/users/sharifdotg",
};

export type AboutCardIconKey =
  | "code"
  | "education"
  | "competitive"
  | "location"
  | "current"
  | "interests";

export type AboutCardToneKey =
  | "blue"
  | "green"
  | "yellow"
  | "pink"
  | "mauve"
  | "red";

export type AboutCardLayoutKey = "default" | "feature";

export type AboutCardContent =
  | {
      kind: "paragraph";
      text: string;
    }
  | {
      kind: "list";
      items: string[];
    };

export interface AboutCard {
  id: string;
  eyebrow: string;
  label: string;
  icon: AboutCardIconKey;
  tone: AboutCardToneKey;
  layout: AboutCardLayoutKey;
  content: AboutCardContent;
}

export const ABOUT_CARDS: AboutCard[] = [
  {
    id: "bio",
    eyebrow: "Profile",
    label: "Bio",
    icon: "code",
    tone: "blue",
    layout: "feature",
    content: {
      kind: "paragraph",
      text: "A full-stack developer and a competitive programmer from Bangladesh, focused on turning complex ideas into clean, efficient products, from ICPC problem solving to practical web applications.",
    },
  },
  {
    id: "education",
    eyebrow: "Academic",
    label: "Education",
    icon: "education",
    tone: "green",
    layout: "default",
    content: {
      kind: "list",
      items: [
        PERSONAL_INFO.degree,
        PERSONAL_INFO.university,
        `CGPA ${PERSONAL_INFO.cgpa} - 7th Semester`,
      ],
    },
  },
  {
    id: "competitive",
    eyebrow: "Performance",
    label: "Competitive Programming",
    icon: "competitive",
    tone: "yellow",
    layout: "default",
    content: {
      kind: "list",
      items: [
        "ICPC Dhaka Regionalist 2024",
        "Pariticipated in multiple IUPCs",
        "Codeforces Specialist (1438)",
        "CodeChef 3 Star (1635)",
      ],
    },
  },
  {
    id: "location",
    eyebrow: "Availability",
    label: "Location",
    icon: "location",
    tone: "pink",
    layout: "default",
    content: {
      kind: "list",
      items: [
        PERSONAL_INFO.location,
        "Open to opportunities worldwide",
        "Open to opportunities in Bangladesh",
      ],
    },
  },
  {
    id: "current",
    eyebrow: "Now",
    label: "Currently",
    icon: "current",
    tone: "mauve",
    layout: "feature",
    content: {
      kind: "paragraph",
      text: "Trainee Software Engineer (Intern) at Bangladesh Software Solution, learning and building modern web applications for international clients while refining engineering workflows.",
    },
  },
  {
    id: "interests",
    eyebrow: "Focus",
    label: "Interests",
    icon: "interests",
    tone: "red",
    layout: "default",
    content: {
      kind: "list",
      items: [
        "Agent Assisted Development and Agents",
        "AI/ML and systems design",
        "Open-source and developer tooling",
        "Teaching and problem solving",
      ],
    },
  },
];

export const SKILLS = {
  languages: [
    { name: "C", level: "Advanced", category: "Programming Language" },
    { name: "C++", level: "Advanced", category: "Programming Language" },
    { name: "Python", level: "Intermediate", category: "Programming Language" },
    { name: "JavaScript", level: "Beginner", category: "Programming Language" },
    { name: "TypeScript", level: "Beginner", category: "Programming Language" },
    { name: "C#", level: "Beginner", category: "Programming Language" },
    { name: "Java", level: "Beginner", category: "Programming Language" },
  ],
  frameworks: [
    { name: "Next.js", level: "Intermediate", category: "Framework" },
    { name: "React", level: "Intermediate", category: "Framework" },
    { name: "Django", level: "Intermediate", category: "Framework" },
    { name: ".NET", level: "Beginner", category: "Framework" },
    { name: "Angular", level: "Beginner", category: "Framework" },
    { name: "Tailwind CSS", level: "Advanced", category: "Framework" },
    { name: "Bootstrap", level: "Intermediate", category: "Framework" },
  ],
  tools: [
    { name: "SQLite", level: "Intermediate", category: "Database" },
    { name: "MySQL", level: "Intermediate", category: "Database" },
    { name: "PostgreSQL", level: "Intermediate", category: "Database" },
    { name: "Convex", level: "Beginner", category: "Database" },
    { name: "Supabase", level: "Intermediate", category: "Database" },
    { name: "Git", level: "Advanced", category: "Tool" },
    { name: "Linux", level: "Intermediate", category: "Tool" },
    { name: "Markdown", level: "Advanced", category: "Tool" },
  ],
  fundamentals: [
    { name: "OOP", level: "Advanced", category: "Fundamental" },
    { name: "Data Structures", level: "Advanced", category: "Fundamental" },
    { name: "Algorithms", level: "Advanced", category: "Fundamental" },
    { name: "System Design", level: "Beginner", category: "Fundamental" },
  ],
};

export interface SkillLogo {
  name: string;
  path?: string;
  darkPath?: string;
  lightPath?: string;
}

export type ProjectStatusKey = "active" | "stable" | "prototype" | "research";

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  githubRepo: string;
  liveUrl: string | null;
  featured: boolean;
  wide?: boolean;
  image: string;
  category: string;
  extensionId?: string;
  status?: ProjectStatusKey;
  tags?: string[];
  highlight?: string;
}

export const SKILL_LOGOS: SkillLogo[] = [
  { name: "C", path: "/tech-logos/c.svg" },
  { name: "C++", path: "/tech-logos/cpp.svg" },
  { name: "Python", path: "/tech-logos/python.svg" },
  { name: "JavaScript", path: "/tech-logos/javascript.svg" },
  { name: "TypeScript", path: "/tech-logos/typescript.svg" },
  { name: "C#", path: "/tech-logos/csharp.svg" },
  { name: "Java", path: "/tech-logos/java.svg" },
  { name: "Next.js", path: "/tech-logos/nextjs.svg" },
  {
    name: "React",
    darkPath: "/tech-logos/react-d.svg",
    lightPath: "/tech-logos/react-l.svg",
  },
  { name: "Django", path: "/tech-logos/django.svg" },
  { name: ".NET", path: "/tech-logos/dotnet.svg" },
  { name: "Angular", path: "/tech-logos/angular.svg" },
  { name: "Tailwind CSS", path: "/tech-logos/tailwindcss.svg" },
  { name: "Bootstrap", path: "/tech-logos/bootstrap.svg" },
  { name: "SQLite", path: "/tech-logos/sqlite.svg" },
  {
    name: "MySQL",
    darkPath: "/tech-logos/mysql-d.svg",
    lightPath: "/tech-logos/mysql-l.svg",
  },
  { name: "PostgreSQL", path: "/tech-logos/postgresql.svg" },
  { name: "Convex", path: "/tech-logos/convex.svg" },
  { name: "Supabase", path: "/tech-logos/supabase.svg" },
  { name: "Git", path: "/tech-logos/git.svg" },
  { name: "Linux", path: "/tech-logos/linux.svg" },
  {
    name: "Markdown",
    darkPath: "/tech-logos/markdown-d.svg",
    lightPath: "/tech-logos/markdown-l.svg",
  },
];

export const PROJECTS: Project[] = [
  {
    title: "BlogsdotG",
    description:
      "A Next.js 16 and React 19 powered personal blog featuring a hidden Convex CMS, Tiptap rich-text management, view tracking, and Framer Motion animations within a shadcn/ui light/dark interface.",
    techStack: [
      "Next.js 16",
      "React 19",
      "Convex",
      "Tiptap",
      "Tailwind CSS",
      "Framer Motion",
    ],
    githubUrl: "https://github.com/SharifdotG/BlogsdotG",
    githubRepo: "SharifdotG/BlogsdotG",
    liveUrl: "https://blogsdotg.vercel.app/",
    featured: true,
    wide: true,
    image: "/projects/blogsdotg.png",
    category: "Web Development",
    status: "prototype",
    tags: ["Blogging", "Real-time", "Rich Text"],
    highlight: "Modern editor with real-time syncing",
  },
  {
    title: "dotG Mono",
    description:
      "A monospaced programming font based on Iosevka, designed for optimal readability and coding experience.",
    techStack: ["Monospaced", "Build Tools", "Iosevka Font"],
    githubUrl: "https://github.com/SharifdotG/dotG-Mono",
    githubRepo: "SharifdotG/dotG-Mono",
    liveUrl: null,
    featured: true,
    image: "/projects/dotg-mono.png",
    category: "Tools & Extensions",
    status: "prototype",
    tags: ["Typography", "Developer Tooling", "Open Source"],
    highlight: "Readability-first coding font",
  },
  {
    title: "TechReform BD 2",
    description:
      "PC-component e-commerce platform featuring a product catalog, CRUD operations, cart functionality, PC builder, and an admin panel.",
    techStack: ["Django", "Python", "Tailwind CSS", "SQLite"],
    githubUrl: "https://github.com/SharifdotG/TechReform-BD-2",
    githubRepo: "SharifdotG/TechReform-BD-2",
    liveUrl: null,
    featured: true,
    image: "/projects/techreform.png",
    category: "Web Development",
    status: "stable",
    tags: ["E-commerce", "Admin", "PC Builder"],
    highlight: "Commerce workflow from catalog to checkout",
  },
  {
    title: "DevStudy AI Suite",
    description:
      "Student-focused web application providing an AI chat assistant, file utilities, PDF summarization, and multiple developer tools.",
    techStack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "OpenRouter",
    ],
    githubUrl: "https://github.com/SharifdotG/DevStudy-AI-Suite-Web",
    githubRepo: "SharifdotG/DevStudy-AI-Suite-Web",
    liveUrl: "http://dev-study-ai-suite-web.vercel.app/",
    featured: true,
    wide: true,
    image: "/projects/devstudy-ai.png",
    category: "Web Development",
    status: "active",
    tags: ["AI Assistant", "Productivity", "Student-first"],
    highlight: "All-in-one AI learning platform",
  },
  {
    title: "Catppuccin Dark Pro",
    description:
      "Developer-focused VSCode theme that combines the aesthetics of the Catppuccin Mocha theme and the syntax highlighting of the One Dark Pro theme. 4,800+ downloads.",
    techStack: ["JSON", "VSCode Extension", "Theme Development"],
    githubUrl: "https://github.com/SharifdotG/catppuccin-dark-pro",
    githubRepo: "SharifdotG/catppuccin-dark-pro",
    liveUrl:
      "https://marketplace.visualstudio.com/items?itemName=SharifdotG.catppuccin-dark-pro",
    extensionId: "SharifdotG.catppuccin-dark-pro",
    featured: true,
    wide: true,
    image: "/projects/catppuccin-dark-pro.png",
    category: "Tools & Extensions",
    status: "stable",
    tags: ["VS Code", "Theme", "Developer Experience"],
    highlight: "4800+ installs on Marketplace",
  },
  {
    title: "SharifdotG's CodeVault",
    description:
      "GitHub repository of 2,000+ competitive programming solutions from Codeforces, LeetCode, and 25+ other online judges.",
    techStack: ["C", "C++", "Python", "Algorithms", "Data Structures"],
    githubUrl: "https://github.com/SharifdotG/SharifdotG-s-CodeVault",
    githubRepo: "SharifdotG/SharifdotG-s-CodeVault",
    liveUrl: null,
    featured: true,
    image: "/projects/codevault.png",
    category: "Competitive Programming",
    status: "active",
    tags: ["2000+ Solutions", "Competitive", "Algorithms"],
    highlight: "Large indexed competitive programming archive",
  },
  {
    title: "Handwritten Digit Recognition",
    description:
      "CNN-based machine learning model for recognizing handwritten digits using the MNIST dataset with high accuracy.",
    techStack: ["Python", "TensorFlow", "Keras", "CNN", "Machine Learning"],
    githubUrl:
      "https://github.com/SharifdotG/Handwritten-Digit-Recognition-Using-CNN",
    githubRepo: "SharifdotG/Handwritten-Digit-Recognition-Using-CNN",
    liveUrl: null,
    featured: false,
    image: "/projects/handwritten-digit-recognition.png",
    category: "Machine Learning",
    status: "research",
    tags: ["Deep Learning", "Computer Vision", "MNIST"],
    highlight: "CNN benchmark on handwritten digits",
  },
  {
    title: "Quantum Tunnels AI Game",
    description:
      "AI-powered TUI game implementing pathfinding algorithms and game theory concepts in a quantum-themed puzzle environment.",
    techStack: ["Python", "Pygame", "AI Algorithms", "TUI", "Game Development"],
    githubUrl: "https://github.com/SharifdotG/Quantum-Tunnels-AI-Game-Project",
    githubRepo: "SharifdotG/Quantum-Tunnels-AI-Game-Project",
    liveUrl: null,
    featured: false,
    image: "/projects/quantum-tunnels-ai-game.png",
    category: "Game Development",
    status: "research",
    tags: ["Pathfinding", "Game AI", "Puzzle"],
    highlight: "Algorithmic gameplay in a TUI setting",
  },
  {
    title: "A* Algorithm Search",
    description:
      "Implementation of A* pathfinding algorithm with visualization for solving search problems efficiently.",
    techStack: ["Python", "Algorithm Visualization", "Data Structures"],
    githubUrl: "https://github.com/SharifdotG/A_Star-Algorithm-Search-Project",
    githubRepo: "SharifdotG/A_Star-Algorithm-Search-Project",
    liveUrl: null,
    featured: false,
    image: "/projects/a-star-algorithm-search.png",
    category: "Algorithms",
    status: "research",
    tags: ["A*", "Visualization", "Pathfinding"],
    highlight: "Interactive shortest-path visualization",
  },
  {
    title: "COD Weapon Knowledgebase",
    description:
      "Prolog-based expert system knowledgebase for Call of Duty weapons with inference engine for weapon recommendations.",
    techStack: ["Prolog", "Expert Systems", "Logic Programming"],
    githubUrl:
      "https://github.com/SharifdotG/Call-of-Duty-Weapon-Knowledgebase-Prolog-Project",
    githubRepo: "SharifdotG/Call-of-Duty-Weapon-Knowledgebase-Prolog-Project",
    liveUrl: null,
    featured: false,
    image: "/projects/cod-weapon-knowledgebase.png",
    category: "AI & Logic",
    status: "research",
    tags: ["Prolog", "Expert System", "Inference"],
    highlight: "Rule-based recommendation engine",
  },
];

export type AchievementType =
  | "competition"
  | "scholarship"
  | "academic"
  | "rating"
  | "certification"
  | "training"
  | "volunteer";

export type AchievementViewType = "link" | "image";

export interface Achievement {
  title: string;
  organization: string;
  date: string;
  description: string;
  link: string | null;
  certificateImage: string | null;
  type: AchievementType;
  viewType: AchievementViewType;
  featured?: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "ICPC Dhaka Regionalist 2024",
    organization: "ICPC",
    date: "November 2024",
    description:
      "Competed in the prestigious ICPC Asia West Continent Dhaka Regional Contest",
    link: null,
    certificateImage: "/certificates/icpc-dhaka-2024.jpg",
    type: "competition",
    viewType: "image",
    featured: true,
  },
  {
    title: "KUET BITFEST 2025",
    organization: "Khulna University of Engineering & Technology",
    date: "January 4, 2024",
    description: "Participated in KUET BITFEST programming contest",
    link: null,
    certificateImage: "/certificates/kuet-bitfest-2025.jpg",
    type: "competition",
    viewType: "image",
  },
  {
    title: "BUBT IUCPC 2025",
    organization: "Bangladesh University of Business & Technology",
    date: "2025",
    description:
      "Participated in BUBT Inter University Collaborative Programming Contest 2025",
    link: null,
    certificateImage: "/certificates/bubt-biucpc-2025.jpg",
    type: "competition",
    viewType: "image",
  },
  {
    title: "UAP Inter University Collaborative Programming Contest 1.0",
    organization: "University of Asia Pacific",
    date: "January 27, 2024",
    description:
      "Participated in the first Inter University Collaborative Programming Contest at UAP",
    link: null,
    certificateImage: "/certificates/uap-contest-2024.jpg",
    type: "competition",
    viewType: "image",
  },
  {
    title: "ICPC Jamilur Reza Chowdhury Scholarship",
    organization: "ICPC Foundation",
    date: "3 Semesters",
    description:
      "Received scholarship for 3 semesters (Spring 2023, Fall 2023, Spring 2024) for Competitive Programming excellence",
    link: null,
    certificateImage: "/certificates/jrc-scholarship.jpg",
    type: "scholarship",
    viewType: "image",
    featured: true,
  },
  {
    title: "Vice Chancellor Awards (2x) & Dean's Awards (4x)",
    organization: "University of Asia Pacific",
    date: "2022-2025",
    description:
      "Received academic excellence awards for maintaining high CGPA across multiple semesters",
    link: null,
    certificateImage: "/certificates/vc-deans-awards.jpg",
    type: "academic",
    viewType: "image",
    featured: true,
  },
  {
    title: "Champion, Ekushey Intra Department Programming Contest 2023",
    organization: "University of Asia Pacific",
    date: "February 2023",
    description: "Won first place in the Intra Department Programming Contest",
    link: null,
    certificateImage: "/certificates/ekushey-2023.jpg",
    type: "competition",
    viewType: "image",
    featured: true,
  },
  {
    title: "Codeforces Specialist (Max Rating: 1438)",
    organization: "Codeforces",
    date: "Ongoing",
    description:
      "Achieved Specialist rank on Codeforces competitive programming platform",
    link: "https://codeforces.com/profile/SharifdotG",
    certificateImage: null,
    type: "rating",
    viewType: "link",
    featured: true,
  },
  {
    title: "CodeChef 3 Stars (Max Rating: 1635)",
    organization: "CodeChef",
    date: "Ongoing",
    description:
      "Achieved 3-star rating on CodeChef competitive programming platform",
    link: "https://www.codechef.com/users/sharifdotg",
    certificateImage: null,
    type: "rating",
    viewType: "link",
  },
  {
    title: "HackerRank Problem Solving (Basic)",
    organization: "HackerRank",
    date: "August 2, 2024",
    description:
      "Completed HackerRank Problem Solving certification at Basic level",
    link: "https://www.hackerrank.com/certificates/0e0b3a6b156d",
    certificateImage: null,
    type: "certification",
    viewType: "link",
  },
  {
    title: "HackerRank Python (Basic)",
    organization: "HackerRank",
    date: "September 25, 2024",
    description: "Completed HackerRank Python certification at Basic level",
    link: "https://www.hackerrank.com/certificates/e69d1f3ead28",
    certificateImage: null,
    type: "certification",
    viewType: "link",
  },
  {
    title: "Foundational C# with Microsoft Certification",
    organization: "freeCodeCamp",
    date: "2024",
    description:
      "Completed the Foundational C# certification program in collaboration with Microsoft",
    link: "https://www.freecodecamp.org/certification/sharifdotg/foundational-c-sharp-with-microsoft",
    certificateImage: null,
    type: "certification",
    viewType: "link",
  },
  {
    title: "Machine Learning Training Program",
    organization: "Department of CSE, University of Asia Pacific",
    date: "June 4 - July 2, 2023",
    description: "Completed comprehensive machine learning training program",
    link: null,
    certificateImage: "/certificates/ml-training-2023.jpg",
    type: "training",
    viewType: "image",
  },
  {
    title: "EEE TECH FEST 2.0 Programming Contest",
    organization: "University of Asia Pacific",
    date: "June 3, 2024",
    description:
      "Participated in EEE TECH FEST 2.0 Intra University Programming Contest",
    link: null,
    certificateImage: "/certificates/eee-fest-2.jpg",
    type: "competition",
    viewType: "image",
  },
  {
    title: "EEE TECH FEST 2023 Intra University Programming Contest",
    organization: "University of Asia Pacific",
    date: "March 29, 2023",
    description:
      "Participated in EEE TECH FEST 2023 Intra University Programming Contest",
    link: null,
    certificateImage: "/certificates/eee-fest-2023.jpg",
    type: "competition",
    viewType: "image",
  },
  {
    title: "5th Place, Inter Department Math Olympiad 3.0 & 4.0",
    organization: "University of Asia Pacific",
    date: "2023, 2024",
    description:
      "Secured 5th position in university math olympiad for two consecutive years",
    link: null,
    certificateImage: "/certificates/math-olympiad.jpg",
    type: "competition",
    viewType: "image",
  },
  {
    title: "Volunteer - 11th Convocation of University of Asia Pacific",
    organization: "University of Asia Pacific",
    date: "July 26, 2025",
    description:
      "Volunteered in organizing and coordinating the university's convocation ceremony",
    link: null,
    certificateImage: "/certificates/convocation-volunteer-2025.jpg",
    type: "volunteer",
    viewType: "image",
  },
  {
    title:
      "Volunteer - National IT Competition for Youth with Disabilities 2025",
    organization: "Government of Bangladesh",
    date: "May 31, 2025",
    description:
      "Supported participants and technical arrangements for inclusive technology competition",
    link: null,
    certificateImage: "/certificates/it-disability-volunteer-2025.png",
    type: "volunteer",
    viewType: "image",
  },
  {
    title: "Volunteer - Prize Giving Ceremony for WMTC Winners",
    organization: "World Mathematics Team Championship",
    date: "February 8, 2025",
    description:
      "Coordinated prize distribution for World Mathematics Team Championship winners",
    link: null,
    certificateImage: "/certificates/wmtc-volunteer-2025.jpg",
    type: "volunteer",
    viewType: "image",
  },
];

export const EXPERIENCE = [
  {
    title: "BSc (Eng.) in Computer Science and Engineering",
    organization: "University of Asia Pacific",
    location: "Dhaka, Bangladesh",
    startDate: "July 2022",
    endDate: "July 2026 (Expected)",
    description: [
      "CGPA: 3.81 / 4.00 (after 7 semesters)",
      "Received 2 Vice Chancellor Awards and 4 Dean's Awards",
      "Focus areas: Software Engineering, Web Development, AI/ML, Data Structures & Algorithms",
    ],
    type: "education",
  },
  {
    title: "Trainee Software Engineer (Intern)",
    organization: "Bangladesh Software Solution",
    location: "Dhaka, Bangladesh",
    startDate: "February 2026",
    endDate: "Present",
    description: [
      "Working on full-stack web development projects with an experienced team",
      "Learning industry-standard software engineering practices from experienced mentors",
      "Collaborating with cross-functional teams on international client projects",
    ],
    type: "work",
  },
  {
    title: "Competitive Programming Trainer & Mentor",
    organization: "University of Asia Pacific",
    location: "Dhaka, Bangladesh",
    startDate: "July 2024",
    endDate: "Present",
    description: [
      "Training and mentoring students in competitive programming and problem-solving",
      "Conducting multiple weekly training and practice sessions",
      "Helping students prepare for national and international programming contests",
      "Building a strong competitive programming community at UAP",
    ],
    type: "teaching",
  },
];

export const ORGANIZING_VOLUNTEERING = [
  {
    title:
      "Organizer at the UAP Inter University Collaborative Programming Contest 1.0",
    date: "January 26 & 27, 2024",
    organization: "University of Asia Pacific",
    description:
      "Organized Inter University programming contest bringing together students from multiple private universities",
    category: "organizer",
  },
  {
    title: "Organizer at the Intra University Math Fest 3.0",
    date: "May 6, 2025",
    organization: "University of Asia Pacific",
    description:
      "Organized third edition of math olympiad fostering problem-solving culture",
    category: "organizer",
  },
  {
    title: "Organizer at the Intra University Math Fest 2.0",
    date: "October 28, 2024",
    organization: "University of Asia Pacific",
    description:
      "Organized second edition of university math olympiad with increased participation",
    category: "organizer",
  },
  {
    title: "Organizer at the JRC Memorial 1st Intra University Math Fest 2023",
    date: "March 28, 2023",
    organization: "University of Asia Pacific",
    description:
      "Organized inaugural math olympiad in memory of Professor Jamilur Reza Chowdhury",
    category: "organizer",
  },
  {
    title: "Volunteer at the Prize Giving Ceremony for WMTC Winners",
    date: "February 8, 2025",
    organization: "World Mathematics Team Championship",
    description:
      "Coordinated prize distribution for World Mathematics Team Championship winners",
    category: "volunteer",
  },
  {
    title: "Volunteer at the 11th Convocation of University of Asia Pacific",
    date: "July 26, 2025",
    organization: "University of Asia Pacific",
    description:
      "Assisted in organizing and coordinating the university's convocation ceremony",
    category: "volunteer",
  },
  {
    title:
      "Volunteer at the National IT Competition for Youth with Disabilities 2025",
    date: "May 31, 2025",
    organization: "National Initiative",
    description:
      "Supported participants and technical arrangements for inclusive technology competition",
    category: "volunteer",
  },
];

export const BENGALI_TERM_OVERRIDES: ReadonlyArray<readonly [string, string]> =
  [
    ["Agent Assisted Development", "এজেন্ট অ্যাসিস্টেড ডেভেলপমেন্ট"],
    ["Competitive Programming", "কম্পিটিটিভ প্রোগ্রামিং"],
    ["problem-solving", "প্রবলেম সলভিং"],
    ["problem solving", "প্রবলেম সলভিং"],
    ["Open-source", "ওপেন-সোর্স"],
    ["opportunities", "অপরচুনিটিজ"],
    ["opportunity", "অপরচুনিটি"],
    ["featured", "ফিচার্ড"],
    ["Featured", "ফিচার্ড"],
    ["technologies", "টেকনোলজিস"],
    ["Technologies", "টেকনোলজিস"],
    ["skills", "স্কিলস"],
    ["Skills", "স্কিলস"],
    ["teaching", "টিচিং"],
    ["Teaching", "টিচিং"],
    ["training", "ট্রেনিং"],
    ["Training", "ট্রেনিং"],
    ["modern", "মডার্ন"],
    ["Modern", "মডার্ন"],
    ["real", "রিয়েল"],
    ["Real", "রিয়েল"],
    ["clean", "ক্লিন"],
    ["Clean", "ক্লিন"],
    ["efficient", "এফিশিয়েন্ট"],
    ["Efficient", "এফিশিয়েন্ট"],
    ["reliable", "রিলায়েবল"],
    ["Reliable", "রিলায়েবল"],
    ["complex", "কমপ্লেক্স"],
    ["Complex", "কমপ্লেক্স"],
    ["idea", "আইডিয়া"],
    ["Idea", "আইডিয়া"],
    ["development", "ডেভেলপমেন্ট"],
    ["Development", "ডেভেলপমেন্ট"],
    ["assisted", "অ্যাসিস্টেড"],
    ["Assisted", "অ্যাসিস্টেড"],
    ["resume", "রেজুমে"],
    ["Resume", "রেজুমে"],
    ["competitive", "কম্পিটিটিভ"],
    ["Competitive", "কম্পিটিটিভ"],
    ["open", "অপেন"],
    ["Open", "অপেন"],
    ["hidden", "হিডেন"],
    ["Hidden", "হিডেন"],
    ["experience", "এক্সপেরিয়েন্স"],
    ["Experience", "এক্সপেরিয়েন্স"],
    ["AI/ML", "এআই/এমএল"],
    ["AI", "এআই"],
    ["CGPA", "সিজিপিএ"],
    ["cgpa", "সিজিপিএ"],
    ["7th", "৭ম"],
    ["Semester", "সেমিস্টার"],
    ["semester", "সেমিস্টার"],
    ["Dhaka", "ঢাকা"],
    ["Bangladesh", "বাংলাদেশ"],
    ["University of Asia Pacific", "ইউনিভার্সিটি অব এশিয়া প্যাসিফিক"],
    [
      "World Mathematics Team Championship",
      "ওয়ার্ল্ড ম্যাথেমেটিক্স টিম চ্যাম্পিয়নশিপ",
    ],
    ["National Initiative", "জাতীয় ইনিশিয়েটিভ"],
    ["January", "জানুয়ারি"],
    ["February", "ফেব্রুয়ারি"],
    ["March", "মার্চ"],
    ["April", "এপ্রিল"],
    ["May", "মে"],
    ["June", "জুন"],
    ["July", "জুলাই"],
    ["August", "আগস্ট"],
    ["September", "সেপ্টেম্বর"],
    ["October", "অক্টোবর"],
    ["November", "নভেম্বর"],
    ["December", "ডিসেম্বর"],
    ["Present", "বর্তমান"],
    ["Expected", "প্রত্যাশিত"],
  ];

export const BENGALI_DIGIT_MAP: Readonly<Record<string, string>> = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};
