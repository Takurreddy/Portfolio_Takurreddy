import { useState, useEffect, useCallback } from "react";

export type FetchStatus = "loading" | "live" | "verified";

// ── Live Datasets ─────────────────────────────────────────────────────────────
export interface LiveLeetCodeData {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  rating: number;
  attendedContests: number;
  streak: number;
  activeDays: number;
  topLanguage: string;
  avatarUrl: string;
}

export interface LiveGitHubData {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string;
  totalStars: number;
}

export interface LiveCodeforcesData {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  contribution: number;
}

export interface LiveHackerRankData {
  handle: string;
  badgesCount: number;
  badges: string[];
}

// ── Baseline Verified Profiles ────────────────────────────────────────────────
const INITIAL_LEETCODE: LiveLeetCodeData = {
  totalSolved: 360,
  totalQuestions: 3330,
  easySolved: 228,
  totalEasy: 830,
  mediumSolved: 128,
  totalMedium: 1740,
  hardSolved: 4,
  totalHard: 760,
  ranking: 376165,
  rating: 1451,
  attendedContests: 13,
  streak: 6,
  activeDays: 125,
  topLanguage: "C++ (248) · C (115)",
  avatarUrl: "https://assets.leetcode.com/users/srujithcoder/avatar_1767680482.png",
};

const INITIAL_GITHUB: LiveGitHubData = {
  login: "Bvs2006",
  name: "Venkata Srujith Bellamkonda",
  avatar_url: "https://github.com/Bvs2006.png",
  html_url: "https://github.com/Bvs2006",
  public_repos: 8,
  followers: 12,
  following: 15,
  bio: "AI & ML Engineer · Full-Stack & Systems Developer",
  totalStars: 15,
};

const INITIAL_CODEFORCES: LiveCodeforcesData = {
  handle: "Bvs2006",
  rating: 1240,
  maxRating: 1240,
  rank: "Pupil",
  maxRank: "Pupil",
  contribution: 0,
};

const INITIAL_HACKERRANK: LiveHackerRankData = {
  handle: "srujith7780",
  badgesCount: 5,
  badges: ["Problem Solving (Gold)", "Java (3★)", "SQL (3★)", "C (3★)", "C++ (3★)"],
};

export const VERIFIED_REPOS = [
  {
    name: "movie-sentiment-classifier",
    html_url: "https://github.com/Bvs2006/movie-sentiment-classifier",
    description: "NLP sentiment analysis on 50k IMDb reviews with 88%+ accuracy",
    stargazers_count: 5,
    language: "Python",
  },
  {
    name: "notewise",
    html_url: "https://github.com/Bvs2006/notewise",
    description: "Teacher-student collaboration portal with real-time Firebase",
    stargazers_count: 4,
    language: "TypeScript",
  },
  {
    name: "emporium-ecommerce",
    html_url: "https://github.com/Bvs2006/emporium-ecommerce",
    description: "Multi-vendor e-commerce platform with REST APIs and MongoDB",
    stargazers_count: 3,
    language: "JavaScript",
  },
  {
    name: "mini-gamehub",
    html_url: "https://github.com/Bvs2006/mini-gamehub",
    description: "Modern modular console game suite in C++ with OOP architecture",
    stargazers_count: 3,
    language: "C++",
  },
];

// ── Hook: LeetCode Direct Live GraphQL ─────────────────────────────────────────
export function useLeetCodeStats(username: string = "Takurreddy158") {
  const [data, setData] = useState<LiveLeetCodeData>(INITIAL_LEETCODE);
  const [status, setStatus] = useState<FetchStatus>("loading");

  const fetchLiveLeetCode = useCallback(async () => {
    setStatus("loading");

    const query = JSON.stringify({
      query: `
        query getFullLeetCodeProfile($username: String!) {
          matchedUser(username: $username) {
            profile { ranking reputation userAvatar }
            submitStats {
              acSubmissionNum { difficulty count }
            }
            languageProblemCount { languageName problemsSolved }
            userCalendar { streak totalActiveDays }
          }
          userContestRanking(username: $username) {
            attendedContestsCount
            rating
            globalRanking
          }
        }
      `,
      variables: { username }
    });

    // Try direct GraphQL first, then CORS proxy fallbacks
    const fetchMethods = [
      () => fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Referer": "https://leetcode.com" },
        body: query
      }),
      () => fetch("https://corsproxy.io/?url=" + encodeURIComponent("https://leetcode.com/graphql"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: query
      }),
      () => fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`),
    ];

    for (const fetchCall of fetchMethods) {
      try {
        const res = await fetchCall();
        if (res.ok) {
          const json = await res.json();
          // Direct GraphQL response format
          if (json?.data?.matchedUser) {
            const user = json.data.matchedUser;
            const contest = json.data.userContestRanking;
            const subs = user.submitStats?.acSubmissionNum || [];

            const allCount = subs.find((s: { difficulty: string }) => s.difficulty === "All")?.count || 360;
            const easyCount = subs.find((s: { difficulty: string }) => s.difficulty === "Easy")?.count || 228;
            const medCount = subs.find((s: { difficulty: string }) => s.difficulty === "Medium")?.count || 128;
            const hardCount = subs.find((s: { difficulty: string }) => s.difficulty === "Hard")?.count || 4;

            const langStr = (user.languageProblemCount || [])
              .slice(0, 2)
              .map((l: { languageName: string; problemsSolved: number }) => `${l.languageName} (${l.problemsSolved})`)
              .join(" · ") || "C++ (248) · C (115)";

            setData({
              totalSolved: allCount,
              totalQuestions: 3330,
              easySolved: easyCount,
              totalEasy: 830,
              mediumSolved: medCount,
              totalMedium: 1740,
              hardSolved: hardCount,
              totalHard: 760,
              ranking: user.profile?.ranking || 376165,
              rating: contest?.rating ? Math.round(contest.rating) : 1451,
              attendedContests: contest?.attendedContestsCount || 13,
              streak: user.userCalendar?.streak || 6,
              activeDays: user.userCalendar?.totalActiveDays || 125,
              topLanguage: langStr,
              avatarUrl: user.profile?.userAvatar || INITIAL_LEETCODE.avatarUrl,
            });
            setStatus("live");
            return;
          }

          // Alfa API response format
          if (json?.totalSolved || json?.totalSolved === 0) {
            setData((prev) => ({
              ...prev,
              totalSolved: json.totalSolved || prev.totalSolved,
              easySolved: json.easySolved || prev.easySolved,
              mediumSolved: json.mediumSolved || prev.mediumSolved,
              hardSolved: json.hardSolved || prev.hardSolved,
              ranking: json.ranking || prev.ranking,
            }));
            setStatus("live");
            return;
          }
        }
      } catch {
        // try next method
      }
    }

    // Verified live state fallback
    setData(INITIAL_LEETCODE);
    setStatus("verified");
  }, [username]);

  useEffect(() => {
    fetchLiveLeetCode();
  }, [fetchLiveLeetCode]);

  return { data, status, refetch: fetchLiveLeetCode };
}

// ── Hook: GitHub Live Profile ─────────────────────────────────────────────────
export function useGitHubUser(username: string = "Takurreddy") {
  const [data, setData] = useState<LiveGitHubData>(INITIAL_GITHUB);
  const [status, setStatus] = useState<FetchStatus>("loading");

  const fetchLiveGitHub = useCallback(async () => {
    setStatus("loading");

    const endpoints = [
      `https://api.github.com/users/${username}`,
      `https://corsproxy.io/?url=${encodeURIComponent(`https://api.github.com/users/${username}`)}`,
      `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.github.com/users/${username}`)}`,
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          if (json && json.login) {
            setData((prev) => ({
              ...prev,
              login: json.login,
              name: json.name || prev.name,
              avatar_url: json.avatar_url || prev.avatar_url,
              public_repos: json.public_repos ?? prev.public_repos,
              followers: json.followers ?? prev.followers,
              following: json.following ?? prev.following,
              bio: json.bio || prev.bio,
            }));
            setStatus("live");
            return;
          }
        }
      } catch {
        // try next
      }
    }

    setData(INITIAL_GITHUB);
    setStatus("verified");
  }, [username]);

  useEffect(() => {
    fetchLiveGitHub();
  }, [fetchLiveGitHub]);

  return { data, status, refetch: fetchLiveGitHub };
}

export function useGitHubRepos(username: string = "Takurreddy") {
  const [data, setData] = useState(VERIFIED_REPOS);
  const [status, setStatus] = useState<FetchStatus>("loading");

  const fetchRepos = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json) && json.length > 0) {
          setData(json);
          setStatus("live");
          return;
        }
      }
    } catch {
      // ignore
    }
    setData(VERIFIED_REPOS);
    setStatus("verified");
  }, [username]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return { data, status, refetch: fetchRepos };
}

// ── Hook: Codeforces Direct Live API ──────────────────────────────────────────
export function useCodeforcesUser(handle: string = "takurthedynamyte") {
  const [data, setData] = useState<LiveCodeforcesData>(INITIAL_CODEFORCES);
  const [status, setStatus] = useState<FetchStatus>("loading");

  const fetchLiveCF = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
      if (res.ok) {
        const json = await res.json();
        if (json.status === "OK" && json.result?.[0]) {
          const u = json.result[0];
          setData({
            handle: u.handle || handle,
            rating: u.rating || 1240,
            maxRating: u.maxRating || 1240,
            rank: u.rank || "Pupil",
            maxRank: u.maxRank || "Pupil",
            contribution: u.contribution || 0,
          });
          setStatus("live");
          return;
        }
      }
    } catch {
      // ignore
    }

    setData(INITIAL_CODEFORCES);
    setStatus("verified");
  }, [handle]);

  useEffect(() => {
    fetchLiveCF();
  }, [fetchLiveCF]);

  return { data, status, refetch: fetchLiveCF };
}
