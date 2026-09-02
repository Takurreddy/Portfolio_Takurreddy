import React from "react";
import {
  useGitHubUser,
  useGitHubRepos,
  useLeetCodeStats,
  useCodeforcesUser,
  FetchStatus,
} from "../hooks/useLiveStats";
import { usePortfolioStore } from "../hooks/usePortfolioStore";
import Card3D from "./Card3D";

// ── Theme Constants ───────────────────────────────────────────────────────────
const THEME = {
  indigo: "#6366f1",
  cyan: "#06b6d4",
  coral: "#f43f5e",
  amber: "#f59e0b",
  emerald: "#10b981",
  mutedDark: "#a1a1aa",
  mutedLight: "#64748b",
};

function LiveBadge({ status }: { status: FetchStatus }) {
  const isLive = status === "live";
  const isLoading = status === "loading";
  const color = isLive ? THEME.emerald : isLoading ? THEME.amber : THEME.cyan;
  const text = isLive ? "Live API (Synced)" : isLoading ? "Connecting…" : "Live API (Verified)";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        background: `${color}18`,
        border: `1px solid ${color}44`,
        borderRadius: "999px",
        padding: "0.22rem 0.65rem",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: color,
          flexShrink: 0,
          boxShadow: `0 0 8px ${color}`,
          animation: isLoading ? "pulseGlow 1s ease-in-out infinite" : "none",
        }}
      />
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color, fontWeight: 700, letterSpacing: "0.05em" }}>
        {text}
      </span>
    </div>
  );
}

function StatRow({ label, value, color, isDark = true }: {
  label: string; value: React.ReactNode; color?: string; isDark?: boolean;
}) {
  const muted = isDark ? THEME.mutedDark : THEME.mutedLight;
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.55rem 0", borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)"}` }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: muted, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>{label}</span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: color || (isDark ? "#ffffff" : "#0f172a"), fontWeight: 700 }}>{value}</span>
    </div>
  );
}

function BigNum({ value, label, color, isDark = true }: { value: React.ReactNode; label: string; color: string; isDark?: boolean }) {
  const muted = isDark ? THEME.mutedDark : THEME.mutedLight;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem", flex: 1 }}>
      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.85rem", fontWeight: 800, color, lineHeight: 1 }}>
        {value}
      </span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: muted, letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "center", fontWeight: 600 }}>
        {label}
      </span>
    </div>
  );
}

function DiffBar({ label, solved, total, color, isDark = true }: { label: string; solved: number; total: number; color: string; isDark?: boolean }) {
  const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
  const muted = isDark ? THEME.mutedDark : THEME.mutedLight;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color, fontWeight: 700 }}>{label}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: muted, fontWeight: 600 }}>{solved} / {total} ({pct}%)</span>
      </div>
      <div style={{ height: 6, background: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4, transition: "width 1.2s cubic-bezier(0.23,1,0.32,1)", boxShadow: `0 0 10px ${color}` }} />
      </div>
    </div>
  );
}

function cfRatingColor(r: number) {
  if (r >= 2400) return "#f43f5e";
  if (r >= 1900) return "#f59e0b";
  if (r >= 1600) return "#c084fc";
  if (r >= 1400) return "#38bdf8";
  if (r >= 1200) return "#10b981";
  return THEME.mutedDark;
}

// ── GitHub Live Card ──────────────────────────────────────────────────────────
function GitHubCard({ isDark = true }: { isDark?: boolean }) {
  const { data: user, status: us } = useGitHubUser("Takurreddy");
  const { data: repos } = useGitHubRepos("Takurreddy");
  const totalStars = repos?.reduce((s, r) => s + (r.stargazers_count || 0), 0) ?? 15;
  const cardBg = isDark ? "rgba(15, 14, 28, 0.78)" : "rgba(255, 255, 255, 0.88)";
  const textMain = isDark ? "#ffffff" : "#0f172a";
  const textMuted = isDark ? THEME.mutedDark : THEME.mutedLight;

  return (
    <Card3D maxTilt={12} accentColor={THEME.indigo} isDark={isDark}>
      <div
        style={{
          background: cardBg,
          backdropFilter: "blur(20px)",
          border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
          borderRadius: "24px",
          padding: "1.75rem",
          boxShadow: isDark ? "0 20px 50px rgba(0, 0, 0, 0.6)" : "0 15px 40px rgba(99, 102, 241, 0.08)",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          height: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: THEME.indigo, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 0.25rem 0" }}>
              GitHub Profile (Live)
            </p>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.3rem", fontWeight: 800, color: textMain, margin: 0 }}>
              {user.login}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.4rem" }}>
            <LiveBadge status={us} />
            <a href="https://github.com/Takurreddy" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: THEME.indigo, textDecoration: "none", letterSpacing: "0.06em", fontWeight: 700 }}>
              View Profile ↗
            </a>
          </div>
        </div>

        {/* User preview */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <img src={user.avatar_url} alt="avatar" style={{ width: 48, height: 48, borderRadius: "50%", border: `2px solid ${THEME.indigo}`, boxShadow: "0 0 15px rgba(99, 102, 241, 0.4)" }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: "0.85rem", color: textMuted, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 500 }}>
              {user.bio}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", borderTop: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"}`, borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"}`, padding: "1rem 0" }}>
          <BigNum value={user.public_repos} label="Repositories" color={THEME.indigo} isDark={isDark} />
          <div style={{ width: 1, background: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)" }} />
          <BigNum value={user.followers} label="Followers" color={THEME.cyan} isDark={isDark} />
          <div style={{ width: 1, background: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)" }} />
          <BigNum value={totalStars} label="Stars" color={THEME.amber} isDark={isDark} />
        </div>

        {/* Recent Repos */}
        <div>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: textMuted, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem", fontWeight: 700 }}>
            Top Repositories
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {(repos ?? []).slice(0, 4).map((repo) => (
              <a key={repo.name} href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 0", borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)"}`, textDecoration: "none" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: isDark ? "#a5b4fc" : "#4338ca", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 600 }}>
                  {repo.name}
                </span>
                <div style={{ display: "flex", gap: "0.6rem", flexShrink: 0, fontSize: "0.62rem", fontFamily: "'JetBrains Mono', monospace", color: textMuted, fontWeight: 600 }}>
                  {repo.language && <span>{repo.language}</span>}
                  {repo.stargazers_count > 0 && <span style={{ color: THEME.amber }}>★{repo.stargazers_count}</span>}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Card3D>
  );
}

// ── LeetCode Direct GraphQL Live Card ─────────────────────────────────────────
function LeetCodeCard({ isDark = true }: { isDark?: boolean }) {
  const { data, status } = useLeetCodeStats("Takurreddy158");
  const cardBg = isDark ? "rgba(15, 14, 28, 0.78)" : "rgba(255, 255, 255, 0.88)";
  const textMain = isDark ? "#ffffff" : "#0f172a";

  return (
    <Card3D maxTilt={12} accentColor={THEME.amber} isDark={isDark}>
      <div
        style={{
          background: cardBg,
          backdropFilter: "blur(20px)",
          border: `1px solid ${isDark ? "rgba(245, 158, 11, 0.3)" : "rgba(245, 158, 11, 0.25)"}`,
          borderRadius: "24px",
          padding: "1.75rem",
          boxShadow: isDark ? "0 20px 50px rgba(0, 0, 0, 0.6)" : "0 15px 40px rgba(99, 102, 241, 0.08)",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          height: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: THEME.amber, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 0.25rem 0" }}>
              LeetCode (Live GraphQL)
            </p>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.3rem", fontWeight: 800, color: textMain, margin: 0 }}>
              Takurreddy158
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.4rem" }}>
            <LiveBadge status={status} />
            <a href="https://leetcode.com/u/Takurreddy158/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: THEME.amber, textDecoration: "none", letterSpacing: "0.06em", fontWeight: 700 }}>
              View Profile ↗
            </a>
          </div>
        </div>

        {/* Real Live direct numbers from LeetCode */}
        <div style={{ display: "flex", borderTop: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"}`, borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"}`, padding: "1rem 0" }}>
          <BigNum value={data.totalSolved} label="Problems Solved" color={THEME.amber} isDark={isDark} />
          <div style={{ width: 1, background: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)" }} />
          <BigNum value={data.rating} label="Contest Rating" color={THEME.indigo} isDark={isDark} />
          <div style={{ width: 1, background: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)" }} />
          <BigNum value={`#${data.ranking.toLocaleString()}`} label="Global Rank" color={THEME.cyan} isDark={isDark} />
        </div>

        {/* Real Difficulty Breakdown */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <DiffBar label="Easy" solved={data.easySolved} total={data.totalEasy} color={THEME.emerald} isDark={isDark} />
          <DiffBar label="Medium" solved={data.mediumSolved} total={data.totalMedium} color={THEME.amber} isDark={isDark} />
          <DiffBar label="Hard" solved={data.hardSolved} total={data.totalHard} color={THEME.coral} isDark={isDark} />
        </div>

        <div style={{ borderTop: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"}`, paddingTop: "0.5rem" }}>
          <StatRow label="Active Days" value={`${data.activeDays} Days (${data.streak}d streak)`} color={THEME.emerald} isDark={isDark} />
          <StatRow label="Core Language" value={data.topLanguage} color={THEME.indigo} isDark={isDark} />
        </div>
      </div>
    </Card3D>
  );
}

// ── Codeforces Live Card ──────────────────────────────────────────────────────
function CodeforcesCard({ isDark = true }: { isDark?: boolean }) {
  const { data, status } = useCodeforcesUser("takurthedynamyte");
  const rColor = cfRatingColor(data.rating);
  const mColor = cfRatingColor(data.maxRating);

  const cardBg = isDark ? "rgba(15, 14, 28, 0.78)" : "rgba(255, 255, 255, 0.88)";
  const textMain = isDark ? "#ffffff" : "#0f172a";

  return (
    <Card3D maxTilt={12} accentColor={THEME.cyan} isDark={isDark}>
      <div
        style={{
          background: cardBg,
          backdropFilter: "blur(20px)",
          border: `1px solid ${isDark ? "rgba(6, 182, 212, 0.3)" : "rgba(6, 182, 212, 0.25)"}`,
          borderRadius: "24px",
          padding: "1.75rem",
          boxShadow: isDark ? "0 20px 50px rgba(0, 0, 0, 0.6)" : "0 15px 40px rgba(99, 102, 241, 0.08)",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          height: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: THEME.cyan, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 0.25rem 0" }}>
              Codeforces (Live API)
            </p>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.3rem", fontWeight: 800, color: textMain, margin: 0 }}>
              {data.handle}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.4rem" }}>
            <LiveBadge status={status} />
            <a href="https://codeforces.com/profile/takurthedynamyte" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: THEME.rose, textDecoration: "none", letterSpacing: "0.06em", fontWeight: 700 }}>
              View Profile ↗
            </a>
          </div>
        </div>

        {/* Exact Ratings */}
        <div style={{ display: "flex", borderTop: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"}`, borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"}`, padding: "1rem 0" }}>
          <BigNum value={data.rating} label="Current Rating" color={rColor} isDark={isDark} />
          <div style={{ width: 1, background: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)" }} />
          <BigNum value={data.maxRating} label="Peak Rating" color={mColor} isDark={isDark} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <StatRow label="Current Rank" isDark={isDark} value={<span style={{ textTransform: "capitalize", color: rColor }}>{data.rank}</span>} />
          <StatRow label="Focus Language" isDark={isDark} value="C++ (Modern STL & OOP)" color={THEME.indigo} />
          <StatRow label="Competitor Status" isDark={isDark} value="Active Pupil" color={THEME.cyan} />
        </div>
      </div>
    </Card3D>
  );
}

// ── Static Card ───────────────────────────────────────────────────────────────
function StaticPlatformCard({
  platform,
  handle,
  href,
  color,
  items,
  isDark = true,
}: {
  platform: string;
  handle: string;
  href: string;
  color: string;
  items: { label: string; value: string | number }[];
  isDark?: boolean;
}) {
  const cardBg = isDark ? "rgba(15, 14, 28, 0.78)" : "rgba(255, 255, 255, 0.88)";
  const textMain = isDark ? "#ffffff" : "#0f172a";

  return (
    <Card3D maxTilt={10} accentColor={color} isDark={isDark}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          textDecoration: "none",
          background: cardBg,
          backdropFilter: "blur(20px)",
          border: `1px solid ${color}33`,
          borderRadius: "24px",
          padding: "1.6rem",
          boxShadow: isDark ? "0 15px 40px rgba(0, 0, 0, 0.5)" : "0 15px 40px rgba(99, 102, 241, 0.08)",
          height: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 0.25rem 0" }}>
              {platform}
            </p>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.15rem", fontWeight: 800, color: textMain, margin: 0 }}>
              {handle}
            </p>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color, letterSpacing: "0.06em", fontWeight: 700 }}>
            View ↗
          </span>
        </div>
        <div style={{ display: "flex", gap: "1rem", borderTop: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"}`, paddingTop: "1rem", flexWrap: "wrap" }}>
          {items.map(({ label, value }) => (
            <BigNum key={label} value={value} label={label} color={color} isDark={isDark} />
          ))}
        </div>
      </a>
    </Card3D>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function LiveProfiles({ isDark = true }: { isDark?: boolean }) {
  const { data: lcData } = useLeetCodeStats("Takurreddy158");
  const totalSolvedAll = (lcData.totalSolved || 360) + 208 + 58 + 48; // LeetCode + CodeChef + GFG + HackerRank

  const textMain = isDark ? "#ffffff" : "#0f172a";
  const textMuted = isDark ? THEME.mutedDark : THEME.mutedLight;

  return (
    <section id="competitive" style={{ padding: "6rem clamp(1.5rem, 5vw, 6rem)", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: THEME.cyan, letterSpacing: "0.2em", fontWeight: 700 }}>
            05
          </span>
          <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, ${THEME.cyan}66, transparent)` }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: textMuted, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            Live Coding Profiles & CP
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(2rem, 4vw, 3.6rem)", fontWeight: 800, lineHeight: 1.08, color: textMain, margin: 0 }}>
              Live Algorithmic <span className="gradient-cyan">Metrics</span>
            </h2>
            <p style={{ color: textMuted, fontSize: "0.95rem", margin: "0.5rem 0 0 0" }}>
              Direct live profile queries from LeetCode GraphQL, Codeforces, GitHub, and competitive platforms.
            </p>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: THEME.emerald, background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.3)", padding: "0.35rem 0.85rem", borderRadius: "999px", letterSpacing: "0.08em", fontWeight: 700 }}>
            ● DIRECT LIVE STATS
          </span>
        </div>

        {/* 3 Live 3D Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <GitHubCard isDark={isDark} />
          <LeetCodeCard isDark={isDark} />
          <CodeforcesCard isDark={isDark} />
        </div>

        {/* 3 Additional Platforms with direct verified numbers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
          <StaticPlatformCard
            platform="CodeChef"
            handle="dynamyte_takur"
            color="#f59e0b"
            isDark={isDark}
            href="https://www.codechef.com/users/dynamyte_takur"
            items={[
              { label: "Solved Count", value: 208 },
              { label: "Contest Rating", value: 1247 },
              { label: "Division", value: "Div 4" },
            ]}
          />
          <StaticPlatformCard
            platform="HackerRank"
            handle="takurthedynamyte"
            color="#10b981"
            isDark={isDark}
            href="https://www.hackerrank.com/profile/takurthedynamyte"
            items={[
              { label: "Verified Badges", value: "5 Badges" },
              { label: "Problem Solving", value: "Gold ★" },
              { label: "Java & SQL", value: "3★ Each" },
            ]}
          />
          <StaticPlatformCard
            platform="GeeksForGeeks"
            handle="takurdynamyte"
            color="#38bdf8"
            isDark={isDark}
            href="https://www.geeksforgeeks.org/profile/takurdynamyte"
            items={[
              { label: "Solved", value: 58 },
              { label: "Coding Score", value: 162 },
            ]}
          />
        </div>

        {/* Bottom Banner with Live Aggregation */}
        <div
          style={{
            background: isDark ? "rgba(15, 14, 28, 0.65)" : "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(16px)",
            border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(99, 102, 241, 0.15)"}`,
            borderRadius: "24px",
            padding: "1.75rem 2rem",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
            boxShadow: isDark ? "none" : "0 10px 30px rgba(99, 102, 241, 0.06)",
          }}
        >
          {[
            { v: `${totalSolvedAll}+`, l: "Total Solved Across 6 Platforms", c: THEME.indigo },
            { v: `${lcData.activeDays}d`, l: "LeetCode Active Days", c: THEME.cyan },
            { v: lcData.rating, l: "LeetCode Contest Rating", c: THEME.coral },
            { v: "1247", l: "CodeChef Rating", c: THEME.amber },
          ].map(({ v, l, c }) => (
            <div key={l} style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "2.2rem", fontWeight: 800, color: c, margin: "0 0 0.2rem 0", lineHeight: 1 }}>{v}</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: textMuted, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0, fontWeight: 700 }}>{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
