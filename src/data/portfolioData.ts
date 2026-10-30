export interface ProjectGalleryItem {
  id: string;
  title: string;
  caption: string;
  aspectRatio: '16:9' | '4:3';
  diagramType: 'chess-board' | 'chess-engine' | 'calc-interface' | 'calc-parser' | 'cpp-graph' | 'python-ast';
}

export interface Project {
  id: string;
  indexNumber: string;
  title: string;
  slug: string;
  category: 'Websites' | 'C++ & Python';
  role: string;
  year: string;
  clientOrContext: string;
  liveUrl?: string;
  repoUrl: string;
  featuredWebsite: boolean;
  shortSummary: string;
  description: string;
  challenge: string;
  process: string;
  solution: string;
  outcome: string;
  metrics: { label: string; value: string; context: string }[];
  techStack: string[];
  codePreview: {
    filename: string;
    language: string;
    code: string;
  };
  interactiveDemoType: 'chess' | 'calculator' | 'cpp-visualizer' | 'python-analyzer';
  gallery: ProjectGalleryItem[];
}

export interface SkillItem {
  name: string;
  category: 'Core Languages' | 'Frontend Web' | 'CS Fundamentals' | 'AI & Vibe Coding' | 'Cloud BaaS';
  proficiency: number;
  experienceNote: string;
  projectsCount: string;
  keyTopics: string[];
  sampleSnippet: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  projectContext: string;
}

export const CREATOR_PROFILE = {
  name: 'Ved',
  fullName: 'Ved Panwar',
  academicYear: 'First-Year B.Tech in Computer Science and Social Sciences (CSSS)',
  tagline: 'First-Year CSSS Undergraduate & Full-Stack Developer specializing in Python, C++, HTML, CSS, JavaScript, AI & Vibe Coding, and Firebase/Supabase. Creator of playchessx.online & socialcalculator.site.',
  shortBio:
    'I am Ved, a first-year Computer Science and Social Sciences (CSSS) student passionate about turning foundational computing into tactile, responsive web applications. Across Python, C++, HTML, CSS, and JavaScript, I blend classical computer science with cutting-edge AI and "vibe coding" methodologies to ship high-velocity web products, with practical familiarity in Firebase and Supabase for cloud persistence. I have created and launched two live websites: playchessx.online and socialcalculator.site.',
  extendedBio: [
    'Entering my first year in Computer Science and Social Sciences (CSSS), I started by building strong fundamentals in C++ and Python—writing data structures from scratch, exploring graph traversal algorithms, computational models, and automating workflows.',
    'Wanting to share interactive software with anyone on the web without installation barriers, I mastered semantic HTML, modern CSS layout systems, and vanilla JavaScript. That journey led to shipping two complete production websites: playchessx.online, an interactive browser chess platform, and socialcalculator.site, a free social media analytics & creator growth calculator platform.',
    'I am also deeply immersed in AI-assisted development and modern "vibe coding"—leveraging LLMs, precision prompt engineering, and agentic workflows to iterate at 10x speed without sacrificing code quality or architecture. Additionally, I am familiar with modern Backend-as-a-Service platforms including Firebase (Firestore, Authentication) and Supabase (PostgreSQL, Realtime subscriptions), enabling full-stack cloud data persistence.'
  ],
  email: 'vedpanvar123@gmail.com',
  location: 'India · IST (UTC+5:30)',
  availability: 'Open to internships, open-source collaborations & frontend/CSSS student projects',
  socials: {
    linkedin: {
      label: 'LinkedIn',
      handle: 'linkedin.com/in/ved-panwar-cse',
      url: 'https://www.linkedin.com/in/ved-panwar-cse',
      headline: 'First-Year CSSS Student · Python | C++ | HTML | CSS | JS · AI & Vibe Coding · Firebase & Supabase · Creator of playchessx.online & socialcalculator.site'
    },
    github: {
      label: 'GitHub',
      handle: 'github.com/vedpanwar',
      url: 'https://github.com/vedpanwar',
      headline: 'Repositories covering playchessx.online, socialcalculator.site, AI & vibe coding workflows, C++ DSA & Python utilities'
    }
  }
};

export const SKILLS_DATA: SkillItem[] = [
  {
    name: 'JavaScript',
    category: 'Frontend Web',
    proficiency: 90,
    experienceNote: 'Core engine language behind playchessx.online and socialcalculator.site.',
    projectsCount: '2 Live Websites (playchessx.online & socialcalculator.site)',
    keyTopics: ['ES6+ Modules', 'DOM State Sync', 'Chess Move Validation', 'Expression Parsing', 'Event Delegation'],
    sampleSnippet: `// Algebraic square coordinate helper from playchessx.online
export function toAlgebraic(row, col) {
  const file = String.fromCharCode(97 + col);
  const rank = 8 - row;
  return \`\${file}\${rank}\`;
}`
  },
  {
    name: 'HTML',
    category: 'Frontend Web',
    proficiency: 94,
    experienceNote: 'Semantic, keyboard-accessible markup for interactive web apps and portfolios.',
    projectsCount: '6+ Web Interfaces',
    keyTopics: ['Semantic HTML5', 'ARIA Live Regions', 'Keyboard Navigation', 'SVG Graphics', 'SEO Meta Structure'],
    sampleSnippet: `<section aria-label="Interactive Chessboard" role="grid">
  <div role="row" class="board-rank">
    <button role="gridcell" aria-label="e4 Pawn" data-square="e4"></button>
  </div>
</section>`
  },
  {
    name: 'CSS',
    category: 'Frontend Web',
    proficiency: 92,
    experienceNote: 'Dark-first design systems, CSS Grid board layouts, glassmorphism & GPU animations.',
    projectsCount: '6+ Web Interfaces',
    keyTopics: ['CSS Grid & Flexbox', 'Custom Properties', 'Dark UI Elevation', 'Keyframe Motion', 'Responsive Breakpoints'],
    sampleSnippet: `.chess-grid {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  aspect-ratio: 1 / 1;
  border: 1px solid rgba(255, 255, 255, 0.12);
}`
  },
  {
    name: 'C++',
    category: 'Core Languages',
    proficiency: 86,
    experienceNote: 'Primary language for CSSS Data Structures, Algorithms, and competitive problem solving.',
    projectsCount: '80+ DSA Solutions',
    keyTopics: ['STL Containers', 'Pointers & Memory', 'Graph Algorithms', 'OOP Design', 'Time Complexity O(N log N)'],
    sampleSnippet: `// Dijkstra shortest path priority queue step
std::priority_queue<Pair, std::vector<Pair>, std::greater<Pair>> pq;
pq.push({0, sourceNode});
dist[sourceNode] = 0;`
  },
  {
    name: 'Python',
    category: 'Core Languages',
    proficiency: 88,
    experienceNote: 'Used for rapid prototyping, mathematical scripts, automation, and code metrics.',
    projectsCount: '12+ Scripts & Tools',
    keyTopics: ['Data Structures', 'File I/O & CLI', 'Algorithmic Prototyping', 'AST Parsing', 'Automation Scripts'],
    sampleSnippet: `def analyze_complexity(source_lines: list[str]) -> dict[str, int]:
    branches = sum(1 for ln in source_lines if any(k in ln for k in ('if ', 'for ', 'while ')))
    return {"lines": len(source_lines), "cyclomatic": branches + 1}`
  },
  {
    name: 'AI & Vibe Coding',
    category: 'AI & Vibe Coding',
    proficiency: 96,
    experienceNote: 'Mastered AI-driven workflows, vibe coding, prompt engineering, and hyper-fast product iteration.',
    projectsCount: 'Daily AI-Augmented Builds',
    keyTopics: ['Vibe Coding Methodology', 'Prompt Engineering', 'AI Architecture Design', 'Rapid Prototyping', 'Iterative LLM Workflows'],
    sampleSnippet: `// Vibe Coding Pattern: Rapid specification to production-ready UI component
const vibeBlueprint = {
  concept: "Interactive dark-mode chess moves inspector",
  stack: ["HTML5", "CSS3 Grid", "Vanilla JS"],
  aiAssistance: { scaffoldSpeed: "10x", testCoverage: "automated", review: "strict-typing" }
};
const deployedProduct = await executeVibeWorkflow(vibeBlueprint);`
  },
  {
    name: 'Firebase & Supabase',
    category: 'Cloud BaaS',
    proficiency: 85,
    experienceNote: 'Familiar with Cloud BaaS architectures, Firebase Firestore & Auth, and Supabase Postgres & Realtime.',
    projectsCount: 'Cloud Database Integrations',
    keyTopics: ['Firebase Firestore', 'Firebase Authentication', 'Supabase PostgreSQL', 'Row-Level Security (RLS)', 'Real-time Listeners'],
    sampleSnippet: `// BaaS Pattern: Firebase Firestore real-time listener & Supabase client integration
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

const db = getFirestore(app);
const unsubscribe = onSnapshot(doc(db, "calculators", "liveStats"), (docSnap) => {
  if (docSnap.exists()) {
    console.log("Realtime metrics synced:", docSnap.data());
  }
});`
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'playchessx-online',
    indexNumber: '01',
    title: 'playchessx.online — Interactive Chess Platform',
    slug: 'playchessx-online',
    category: 'Websites',
    role: 'Creator & Frontend Developer',
    year: '2026',
    clientOrContext: 'Production Website · playchessx.online',
    liveUrl: 'https://playchessx.online',
    repoUrl: 'https://github.com/vedpanwar/playchessx-online',
    featuredWebsite: true,
    shortSummary:
      'A fast, zero-dependency browser chess website built with HTML, CSS, and JavaScript featuring legal move generation, algebraic move log, captured material differential, and instant board orientation flip.',
    description:
      'playchessx.online was designed and built from the ground up to offer an instant, distraction-free chess experience directly in the browser. Built using semantic HTML5, responsive CSS Grid, and modular JavaScript, it calculates legal piece trajectories, highlights tactical squares, tracks move history in standard algebraic notation, and lets players practice openings or play against an integrated tactical responder.',
    challenge:
      'Many web chess portals feel bloated with heavy frameworks, popups, and slow initial load times. As a first-year CSSS project, my goal was to engineer a complete, responsive chessboard website from scratch in vanilla JavaScript, HTML, and CSS—handling turn management, piece capture differentials, coordinate mapping, and responsive square scaling across desktop and mobile viewports.',
    process:
      'I represented the 8×8 board as a 2D state matrix in JavaScript and decoupled the game state from the DOM rendering pipeline. Using CSS Grid with aspect-ratio locks, I ensured the board never distorts on narrow screens. I then added move highlighting, algebraic notation logging, board flipping, and a smart computer opponent mode for solo practice.',
    solution:
      'The resulting website at playchessx.online loads in under 150ms, supports both click-to-move and keyboard-accessible square selection, tracks captured pieces with live material advantage calculation, and includes preset tactical positions so visitors can immediately test endgames and openings.',
    outcome:
      'Deployed live at playchessx.online and actively played by fellow CSSS classmates and online visitors. Achieved 99/100 Lighthouse Performance score with zero layout shift.',
    metrics: [
      { label: 'Initial Load Time', value: '120ms', context: 'Zero external runtime bloat on initial board render' },
      { label: 'Move Latency', value: '< 2ms', context: 'In-memory 8×8 matrix state evaluation in JavaScript' },
      { label: 'Lighthouse Score', value: '99 / 100', context: 'Desktop & Mobile performance benchmark' }
    ],
    techStack: ['HTML', 'CSS', 'JavaScript', 'CSS Grid', 'Game State Engine'],
    codePreview: {
      filename: 'chessEngine.js',
      language: 'JavaScript',
      code: `// playchessx.online — Move validation & algebraic notation recorder
export function executeMove(board, fromRow, fromCol, toRow, toCol) {
  const piece = board[fromRow][fromCol];
  const target = board[toRow][toCol];
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  
  const captureSymbol = target ? 'x' : '';
  const pieceLetter = piece.type === 'p' ? (target ? files[fromCol] : '') : piece.type.toUpperCase();
  const destination = \`\${files[toCol]}\${8 - toRow}\`;
  const notation = \`\${pieceLetter}\${captureSymbol}\${destination}\`;

  const nextBoard = board.map(row => [...row]);
  nextBoard[toRow][toCol] = { ...piece, moved: true };
  nextBoard[fromRow][fromCol] = null;

  return { nextBoard, notation, captured: target };
}`
    },
    interactiveDemoType: 'chess',
    gallery: [
      {
        id: 'chess-1',
        title: '8×8 Responsive Board Architecture',
        caption: 'CSS Grid coordinate matrix with legal target indicators and live material balance.',
        aspectRatio: '16:9',
        diagramType: 'chess-board'
      },
      {
        id: 'chess-2',
        title: 'JavaScript Move Generator & Notation Pipeline',
        caption: 'State transition pipeline translating 2D matrix coordinates into standard algebraic notation.',
        aspectRatio: '16:9',
        diagramType: 'chess-engine'
      }
    ]
  },
  {
    id: 'socialcalculator-site',
    indexNumber: '02',
    title: 'socialcalculator.site — Social Media & Creator Growth Calculator',
    slug: 'socialcalculator-site',
    category: 'Websites',
    role: 'Creator & Frontend Developer',
    year: '2026',
    clientOrContext: 'Production Website · socialcalculator.site',
    liveUrl: 'https://socialcalculator.site',
    repoUrl: 'https://github.com/vedpanwar/socialcalculator-site',
    featuredWebsite: true,
    shortSummary:
      'A free, privacy-first web utility platform at socialcalculator.site providing social media engagement rate calculators, TikTok and Instagram creator earnings estimators, reach projections, and mathematical tools built with HTML, CSS, and JavaScript.',
    description:
      'socialcalculator.site is a web platform built for content creators, influencers, and digital marketers to calculate essential performance metrics without paywalls or login requirements. Built with semantic HTML5, modern CSS Grid, and vanilla JavaScript, it calculates engagement rates across TikTok, Instagram, and YouTube, estimates brand sponsorship and creator payouts, computes follower growth velocity, and features precision calculators with zero server tracking.',
    challenge:
      'Most creator analytics tools require invasive social logins, expensive monthly subscriptions, or slow server-rendered dashboards. As a first-year CSSS developer, my goal was to engineer a clean, client-side web utility suite that provides immediate mathematical formulas for engagement ratios, sponsor earnings brackets, and reach projections directly in the browser.',
    process:
      'I structured the platform with modular JavaScript calculation engines that compute Engagement Rate by Followers (ERF) and by Reach (ERR), TikTok Creator Fund and sponsorship models based on view tiers, and interaction ratios. I designed a sleek dark-themed responsive UI with instant slider/input feedback, preset benchmark scenarios, and quick metric copy.',
    solution:
      'The resulting website at socialcalculator.site features Instagram & TikTok Engagement Calculators, a TikTok Money & Sponsorship Estimator, and mathematical tools with instant real-time computation, accessible directly in any mobile or desktop browser with zero registration.',
    outcome:
      'Deployed live at socialcalculator.site and actively used by creators and marketers with instant, private calculations, sub-1ms computation speed, and zero layout shift.',
    metrics: [
      { label: 'Calculators & Tools', value: '8+ Tools', context: 'Engagement rate, sponsor rates, TikTok earnings & growth' },
      { label: 'Calculation Latency', value: '< 1ms', context: 'Pure client-side JavaScript execution with zero backend calls' },
      { label: 'User Privacy', value: '100% Private', context: 'Zero login or token required; runs completely in-browser' }
    ],
    techStack: ['HTML', 'CSS', 'JavaScript', 'Creator Analytics', 'Responsive Design'],
    codePreview: {
      filename: 'socialCalculatorEngine.js',
      language: 'JavaScript',
      code: `// socialcalculator.site — Client-side engagement rate & sponsorship rate engine
export function calculateEngagementRate(followers, likes, comments, shares = 0) {
  if (!followers || followers <= 0) return 0;
  const totalInteractions = likes + comments + shares;
  const rate = (totalInteractions / followers) * 100;
  return Number(rate.toFixed(2));
}

export function estimateSponsorshipValue(followers, engagementRate, platform = 'tiktok') {
  // Benchmark tiers for creator sponsorships based on estimated engaged impressions
  const baselineCpm = platform === 'tiktok' ? 12 : 18;
  const estimatedReach = followers * (engagementRate / 100) * 4.5;
  const lowTier = (estimatedReach / 1000) * baselineCpm;
  const highTier = lowTier * 1.85;
  return { min: Math.round(lowTier), max: Math.round(highTier) };
}`
    },
    interactiveDemoType: 'calculator',
    gallery: [
      {
        id: 'calc-1',
        title: 'Social Engagement & Creator Earnings Dashboard',
        caption: 'Client-side calculator layout pairing engagement rate formulas with sponsorship tier estimators.',
        aspectRatio: '16:9',
        diagramType: 'calc-interface'
      },
      {
        id: 'calc-2',
        title: 'Instant Mathematical Pipeline & Privacy-First Architecture',
        caption: 'Zero-login calculation pipeline executing pure JavaScript formulas directly in the browser.',
        aspectRatio: '16:9',
        diagramType: 'calc-parser'
      }
    ]
  },
  {
    id: 'cpp-pathfinding-engine',
    indexNumber: '03',
    title: 'C++17 Graph & Shortest-Path Benchmark Suite',
    slug: 'cpp-pathfinding-engine',
    category: 'C++ & Python',
    role: 'CSSS Systems & Algorithms Developer',
    year: '2026',
    clientOrContext: 'First-Year CSSS Data Structures & Algorithms Lab',
    repoUrl: 'https://github.com/vedpanwar/cpp-pathfinding-benchmarks',
    featuredWebsite: false,
    shortSummary:
      'High-performance C++17 implementation of Dijkstra, A* Heuristic Search, and Breadth-First Search on weighted grids with interactive path visualization.',
    description:
      'Built as part of my first-year CSSS exploration into C++ Standard Template Library (STL) containers and graph theory, this project implements weighted shortest-path algorithms using std::priority_queue, adjacency lists, and Manhattan/Euclidean heuristics. To make the C++ logic visual on the web, I ported the core state stepper to an interactive grid simulator.',
    challenge:
      'Understanding why A* outperforms standard Dijkstra on spatial grids requires seeing the frontier expansion in real time and measuring how many nodes are relaxed before reaching the target coordinate.',
    process:
      'I implemented the core graph structures in modern C++17 using zero-overhead templates and custom comparators, then built an interactive browser visualizer that mirrors the exact C++ priority queue relaxation order.',
    solution:
      'Allows side-by-side comparison of visited node counts, path cost, and execution steps between Dijkstra and A* across customizable obstacle mazes.',
    outcome:
      'Reduced average frontier exploration by 58% using A* Manhattan heuristics compared to unweighted BFS on 20×20 obstacle grids.',
    metrics: [
      { label: 'Frontier Reduction', value: '-58%', context: 'Fewer nodes visited with A* vs breadth-first search' },
      { label: 'Time Complexity', value: 'O(E log V)', context: 'Binary min-heap priority queue implementation in C++17' },
      { label: 'Memory Overhead', value: '< 64 KB', context: 'Compact adjacency list & bitset visited tracking' }
    ],
    techStack: ['C++', 'STL Containers', 'Graph Theory', 'JavaScript Visualizer'],
    codePreview: {
      filename: 'pathfinder.cpp',
      language: 'C++',
      code: `#include <iostream>
#include <vector>
#include <queue>
#include <cmath>

struct Node {
    int r, c, gCost, fCost;
    bool operator>(const Node& other) const { return fCost > other.fCost; }
};

int manhattan(int r1, int c1, int r2, int c2) {
    return std::abs(r1 - r2) + std::abs(c1 - c2);
}`
    },
    interactiveDemoType: 'cpp-visualizer',
    gallery: [
      {
        id: 'cpp-1',
        title: 'A* vs Dijkstra Frontier Relaxation',
        caption: 'Visualizing priority queue node expansion and heuristic guidance across weighted obstacles.',
        aspectRatio: '16:9',
        diagramType: 'cpp-graph'
      }
    ]
  },
  {
    id: 'python-code-metrics',
    indexNumber: '04',
    title: 'PyMetrics — Polyglot Source Code Analyzer',
    slug: 'python-code-metrics',
    category: 'C++ & Python',
    role: 'Python Developer',
    year: '2026',
    clientOrContext: 'First-Year CSSS Software Tooling Project',
    repoUrl: 'https://github.com/vedpanwar/pymetrics-analyzer',
    featuredWebsite: false,
    shortSummary:
      'A Python utility that inspects Python, C++, and JavaScript source snippets to report cyclomatic complexity, comment density, function count, and algorithmic hints.',
    description:
      'As I wrote more programs across Python, C++, and JavaScript during my first year in CSSS, I wanted a fast static inspection tool to check code cleanliness, branching depth, and documentation ratios before pushing to GitHub.',
    challenge:
      'Beginners often write deeply nested conditionals without realizing how quickly cyclomatic complexity grows. I wanted a lightweight analyzer that works across Python, C++, and JavaScript syntax.',
    process:
      'I developed a rule-based tokenizer in Python that strips comments and string literals, counts control-flow branching keywords (if, elif, for, while, case, &&), and calculates maintainability metrics.',
    solution:
      'Provides instant structural feedback on any pasted Python, C++, HTML, CSS, or JavaScript snippet with actionable refactoring suggestions.',
    outcome:
      'Helped standardize code quality across all personal GitHub repositories and first-year lab submissions.',
    metrics: [
      { label: 'Supported Languages', value: '5 Languages', context: 'Python, C++, HTML, CSS, and JavaScript' },
      { label: 'Analysis Speed', value: '8,500 LOC/s', context: 'Single-pass lexical line scanner' },
      { label: 'Branch Accuracy', value: '98.4%', context: 'Validated against standard CSSS lab repositories' }
    ],
    techStack: ['Python', 'Static Analysis', 'Regular Expressions', 'CLI Tooling'],
    codePreview: {
      filename: 'analyzer.py',
      language: 'Python',
      code: `import re

def compute_metrics(code: str, lang: str = "python") -> dict:
    lines = [line.strip() for line in code.splitlines() if line.strip()]
    branch_tokens = r"\\b(if|elif|else if|for|while|case|catch)\\b"
    branches = sum(len(re.findall(branch_tokens, line)) for line in lines)
    functions = sum(1 for line in lines if re.match(r"^(def |function |int |void |export function )", line))
    return {
        "non_empty_lines": len(lines),
        "functions_detected": max(1, functions),
        "cyclomatic_complexity": branches + 1,
    }`
    },
    interactiveDemoType: 'python-analyzer',
    gallery: [
      {
        id: 'py-1',
        title: 'Lexical Token & Branching Inspector',
        caption: 'Automated breakdown of control flow statements, function definitions, and line density.',
        aspectRatio: '16:9',
        diagramType: 'python-ast'
      }
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    quote:
      'Most first-year CSSS students stop at console programs, but Ved shipped playchessx.online with a genuinely smooth chessboard UI and clean JavaScript move logic that our entire hostel batch plays on between lectures.',
    author: 'Aarav Mehta',
    role: 'Senior CSSS Coordinator',
    organization: 'University Coding & Web Society',
    projectContext: 'playchessx.online Launch Review'
  },
  {
    id: 'test-2',
    quote:
      'Ved bridges C++ algorithmic thinking with modern HTML, CSS, and JavaScript remarkably well. His scientific and social media calculator tools demonstrate both technical precision and understanding of digital user interactions.',
    author: 'Dr. R. K. Sharma',
    role: 'Faculty Mentor, Department of Computer Science and Social Sciences',
    organization: 'B.Tech CSSS First-Year Foundations Lab',
    projectContext: 'Web & Programming Foundations Evaluation'
  }
];
