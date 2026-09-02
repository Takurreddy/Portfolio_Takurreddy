import { useState, useEffect, useCallback } from "react";

export interface ProjectItem {
  id: string;
  name: string;
  tag: string;
  desc: string;
  details?: string;
  stack: string[];
  accent: string;
  img: string;
  alt: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface CertItem {
  id: string;
  name: string;
  issuer: string;
  year: string;
  icon: string;
  color: string;
  bg: string;
  credentialUrl?: string;
}

export interface CompetitiveStats {
  totalSolved: number;
  leetcode: {
    handle: string;
    solved: number;
    rating: number;
    ranking: number;
    easy: number;
    medium: number;
    hard: number;
  };
  codechef: {
    handle: string;
    solved: number;
    rating: number;
    stars: string;
  };
  codeforces: {
    handle: string;
    rating: number;
    maxRating: number;
    rank: string;
  };
  hackerrank: {
    handle: string;
    solved: number;
    badges: string;
  };
  geeksforgeeks: {
    handle: string;
    solved: number;
    score: number;
  };
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio1: string;
  bio2: string;
  cgpa: string;
  problemsCount: string;
  projectsCount: string;
  university: string;
  degree: string;
  class12: string;
  class12Score: string;
  email: string;
  github: string;
  linkedin: string;
  leetcode: string;
  codechef: string;
  codeforces: string;
  hackerrank: string;
  geeksforgeeks: string;
  resumeUrl: string;
}

export const DEFAULT_COMPETITIVE_STATS: CompetitiveStats = {
  totalSolved: 0,
  leetcode: {
    handle: "Takurreddy158",
    solved: 0,
    rating: 0,
    ranking: 0,
    easy: 0,
    medium: 0,
    hard: 0,
  },
  codechef: {
    handle: "dynamyte_takur",
    solved: 0,
    rating: 0,
    stars: "N/A",
  },
  codeforces: {
    handle: "takurthedynamyte",
    rating: 0,
    maxRating: 0,
    rank: "N/A",
  },
  hackerrank: {
    handle: "takurthedynamyte",
    solved: 0,
    badges: "N/A",
  },
  geeksforgeeks: {
    handle: "takurdynamyte",
    solved: 0,
    score: 0,
  },
};

export const DEFAULT_PERSONAL_INFO: PersonalInfo = {
  name: "Mukku Takur",
  title: "AI & Machine Learning Engineer",
  tagline: "Third-Year B.Tech student specializing in Artificial Intelligence & Machine Learning with hands-on experience in Python, Machine Learning, FastAPI, LLMs, RAG, and LangChain.",
  bio1: "I'm Mukku Takur — a Third-Year B.Tech AI & ML student at Aditya University (CGPA: 8.37) passionate about Machine Learning, AI research, optimization, and intelligent systems.",
  bio2: "Experienced in developing AI-driven applications involving AQI prediction, route optimization, multi-agent research, and phishing detection. Strong foundation in Data Structures, Object-Oriented Programming, SQL, Git, and software development practices.",
  cgpa: "8.37",
  problemsCount: "0",
  projectsCount: "3",
  university: "Aditya University",
  degree: "B.Tech · AI & ML · 2024–2028",
  class12: "Intermediate College",
  class12Score: "967 (A Grade)",
  email: "takurmukku158@gmail.com",
  github: "https://github.com/Takurreddy",
  linkedin: "https://www.linkedin.com/",
  leetcode: "https://leetcode.com/u/Takurreddy158/",
  codechef: "https://www.codechef.com/users/dynamyte_takur",
  codeforces: "https://codeforces.com/profile/takurthedynamyte",
  hackerrank: "https://www.hackerrank.com/profile/takurthedynamyte",
  geeksforgeeks: "https://www.geeksforgeeks.org/profile/takurdynamyte",
  resumeUrl: "",
};

export const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    name: "AI-Based Air Quality Prediction & Route Optimization",
    tag: "AI / ML · Python",
    desc: "Built an AI-powered air quality prediction platform in Python using LSTM for AQI forecasting.",
    details: "Created data preprocessing pipelines for pollution and weather datasets. Developed backend APIs for AQI predictions and smart route recommendations. Integrated air-quality forecasting with route optimization in backend services.",
    stack: ["Python", "LSTM", "FastAPI", "Pandas", "Scikit-learn"],
    accent: "#6366f1",
    img: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?w=600&h=340&fit=crop&auto=format",
    alt: "AI Prediction",
    githubUrl: "https://github.com/Takurreddy/Air-prediction-",
    demoUrl: "https://air-prediction.vercel.app/",
  },
  {
    id: "proj-2",
    name: "Multi-Agent AI Research Assistant",
    tag: "AI / ML · Python",
    desc: "Developed a multi-agent AI research assistant using Python, LangChain, and Large Language Models.",
    details: "Integrated web search and document processing to automate research and information-gathering workflows. Built FastAPI-based backend services for AI-powered research operations.",
    stack: ["Python", "LangChain", "LLMs", "FastAPI", "OpenAI"],
    accent: "#06b6d4",
    img: "https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?w=600&h=340&fit=crop&auto=format",
    alt: "Multi-Agent AI",
    githubUrl: "https://github.com/Takurreddy/multi-agent-research-system",
  },
  {
    id: "proj-3",
    name: "Phish Guard AI",
    tag: "AI / ML · Machine Learning",
    desc: "Developed an AI-powered phishing detection platform for malicious URL classification.",
    details: "Built a machine learning pipeline for processing URL-related features and generating real-time predictions. Implemented a responsive web interface to interact with the prediction system.",
    stack: ["Machine Learning", "Python", "Scikit-learn", "Pandas", "NumPy"],
    accent: "#f43f5e",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=340&fit=crop&auto=format",
    alt: "Phishing Detection",
    githubUrl: "https://github.com/Takurreddy/PhishGuard-AI",
    demoUrl: "https://phish-guard-ai-orpin.vercel.app/",
  }
];

export const DEFAULT_CERTS: CertItem[] = [
  {
    id: "cert-1",
    name: "IBM Python for Data Science, AI & Development",
    issuer: "IBM",
    year: "2024",
    icon: "🎓",
    color: "#ef4444",
    bg: "rgba(239, 68, 68, 0.12)",
  },
  {
    id: "cert-2",
    name: "Power BI for Data Analytics",
    issuer: "Power BI",
    year: "2024",
    icon: "📊",
    color: "#0284c7",
    bg: "rgba(2, 132, 199, 0.12)",
  }
];

export const DEFAULT_SKILLS: Record<string, string[]> = {
  Programming: ["Python", "C++", "SQL"],
  "AI / ML": ["Scikit-learn", "LSTM", "Pandas", "NumPy", "Matplotlib", "Machine Learning"],
  "Generative AI": ["LLMs", "RAG", "LangChain", "Multi-Agent Systems"],
  Backend: ["FastAPI", "Docker"],
  Databases: ["MySQL", "SQLite", "InfluxDB"],
  "Software Engineering": ["Data Structures & Algorithms", "OOP", "SDLC", "Git", "GitHub"],
  Tools: ["Jupyter Notebook", "VS Code", "WEKA"],
};

const STORAGE_KEYS = {
  PERSONAL: "portfolio_personal_info_v4",
  PROJECTS: "portfolio_projects_data_v4",
  CERTS: "portfolio_certs_data_v4",
  SKILLS: "portfolio_skills_data_v4",
  COMPETITIVE: "portfolio_competitive_data_v4",
};

// Global event name for cross-instance sync
const SYNC_EVENT = "portfolio_store_sync_event";

function readLocal<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
    window.dispatchEvent(new CustomEvent(SYNC_EVENT));
  } catch {
    // ignore
  }
}

export function usePortfolioStore() {
  const [personalInfo, setPersonalInfoState] = useState<PersonalInfo>(() =>
    readLocal(STORAGE_KEYS.PERSONAL, DEFAULT_PERSONAL_INFO)
  );

  const [projects, setProjectsState] = useState<ProjectItem[]>(() =>
    readLocal(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS)
  );

  const [certs, setCertsState] = useState<CertItem[]>(() =>
    readLocal(STORAGE_KEYS.CERTS, DEFAULT_CERTS)
  );

  const [skills, setSkillsState] = useState<Record<string, string[]>>(() =>
    readLocal(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS)
  );

  const [competitiveStats, setCompetitiveStatsState] = useState<CompetitiveStats>(() =>
    readLocal(STORAGE_KEYS.COMPETITIVE, DEFAULT_COMPETITIVE_STATS)
  );

  // Sync state whenever storage or custom sync event fires
  const reloadFromStorage = useCallback(() => {
    setPersonalInfoState(readLocal(STORAGE_KEYS.PERSONAL, DEFAULT_PERSONAL_INFO));
    setProjectsState(readLocal(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS));
    setCertsState(readLocal(STORAGE_KEYS.CERTS, DEFAULT_CERTS));
    setSkillsState(readLocal(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS));
    setCompetitiveStatsState(readLocal(STORAGE_KEYS.COMPETITIVE, DEFAULT_COMPETITIVE_STATS));
  }, []);

  useEffect(() => {
    const handleSync = () => reloadFromStorage();
    window.addEventListener(SYNC_EVENT, handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener(SYNC_EVENT, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, [reloadFromStorage]);

  // Actions that write to storage and notify all listeners immediately
  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    const next = { ...readLocal(STORAGE_KEYS.PERSONAL, DEFAULT_PERSONAL_INFO), ...info };
    setPersonalInfoState(next);
    writeLocal(STORAGE_KEYS.PERSONAL, next);
  };

  const updateCompetitiveStats = (stats: Partial<CompetitiveStats>) => {
    const current = readLocal(STORAGE_KEYS.COMPETITIVE, DEFAULT_COMPETITIVE_STATS);
    const next = { ...current, ...stats };
    setCompetitiveStatsState(next);
    writeLocal(STORAGE_KEYS.COMPETITIVE, next);
  };

  const addProject = (project: Omit<ProjectItem, "id">) => {
    const current = readLocal(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
    const newProject: ProjectItem = {
      ...project,
      id: `proj-${Date.now()}`,
    };
    const next = [newProject, ...current];
    setProjectsState(next);
    writeLocal(STORAGE_KEYS.PROJECTS, next);
  };

  const updateProject = (id: string, project: Partial<ProjectItem>) => {
    const current = readLocal(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
    const next = current.map((p) => (p.id === id ? { ...p, ...project } : p));
    setProjectsState(next);
    writeLocal(STORAGE_KEYS.PROJECTS, next);
  };

  const deleteProject = (id: string) => {
    const current = readLocal(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
    const next = current.filter((p) => p.id !== id);
    setProjectsState(next);
    writeLocal(STORAGE_KEYS.PROJECTS, next);
  };

  const addCert = (cert: Omit<CertItem, "id">) => {
    const current = readLocal(STORAGE_KEYS.CERTS, DEFAULT_CERTS);
    const newCert: CertItem = {
      ...cert,
      id: `cert-${Date.now()}`,
    };
    const next = [newCert, ...current];
    setCertsState(next);
    writeLocal(STORAGE_KEYS.CERTS, next);
  };

  const updateCert = (id: string, cert: Partial<CertItem>) => {
    const current = readLocal(STORAGE_KEYS.CERTS, DEFAULT_CERTS);
    const next = current.map((c) => (c.id === id ? { ...c, ...cert } : c));
    setCertsState(next);
    writeLocal(STORAGE_KEYS.CERTS, next);
  };

  const deleteCert = (id: string) => {
    const current = readLocal(STORAGE_KEYS.CERTS, DEFAULT_CERTS);
    const next = current.filter((c) => c.id !== id);
    setCertsState(next);
    writeLocal(STORAGE_KEYS.CERTS, next);
  };

  const updateSkillCategory = (category: string, items: string[]) => {
    const current = readLocal(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS);
    const next = { ...current, [category]: items };
    setSkillsState(next);
    writeLocal(STORAGE_KEYS.SKILLS, next);
  };

  const deleteSkillCategory = (category: string) => {
    const current = readLocal(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS);
    const next = { ...current };
    delete next[category];
    setSkillsState(next);
    writeLocal(STORAGE_KEYS.SKILLS, next);
  };

  const resetToDefaults = () => {
    setPersonalInfoState(DEFAULT_PERSONAL_INFO);
    setProjectsState(DEFAULT_PROJECTS);
    setCertsState(DEFAULT_CERTS);
    setSkillsState(DEFAULT_SKILLS);
    setCompetitiveStatsState(DEFAULT_COMPETITIVE_STATS);
    writeLocal(STORAGE_KEYS.PERSONAL, DEFAULT_PERSONAL_INFO);
    writeLocal(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
    writeLocal(STORAGE_KEYS.CERTS, DEFAULT_CERTS);
    writeLocal(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS);
    writeLocal(STORAGE_KEYS.COMPETITIVE, DEFAULT_COMPETITIVE_STATS);
  };

  const exportAllData = () => {
    return JSON.stringify(
      {
        personalInfo,
        projects,
        certs,
        skills,
        competitiveStats,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  };

  const importAllData = (jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.personalInfo) {
        setPersonalInfoState(data.personalInfo);
        writeLocal(STORAGE_KEYS.PERSONAL, data.personalInfo);
      }
      if (data.projects && Array.isArray(data.projects)) {
        setProjectsState(data.projects);
        writeLocal(STORAGE_KEYS.PROJECTS, data.projects);
      }
      if (data.certs && Array.isArray(data.certs)) {
        setCertsState(data.certs);
        writeLocal(STORAGE_KEYS.CERTS, data.certs);
      }
      if (data.skills && typeof data.skills === "object") {
        setSkillsState(data.skills);
        writeLocal(STORAGE_KEYS.SKILLS, data.skills);
      }
      if (data.competitiveStats) {
        setCompetitiveStatsState(data.competitiveStats);
        writeLocal(STORAGE_KEYS.COMPETITIVE, data.competitiveStats);
      }
      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: (err as Error).message };
    }
  };

  return {
    personalInfo,
    projects,
    certs,
    skills,
    competitiveStats,
    updatePersonalInfo,
    updateCompetitiveStats,
    addProject,
    updateProject,
    deleteProject,
    addCert,
    updateCert,
    deleteCert,
    updateSkillCategory,
    deleteSkillCategory,
    resetToDefaults,
    exportAllData,
    importAllData,
  };
}
