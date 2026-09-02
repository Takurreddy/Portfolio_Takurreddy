import React, { useState } from "react";
import {
  usePortfolioStore,
  ProjectItem,
  CertItem,
} from "../hooks/usePortfolioStore";

const COLOR_PRESETS = ["#6366f1", "#06b6d4", "#10b981", "#f43f5e", "#f59e0b", "#8b5cf6", "#0284c7", "#ef4444"];
const ICON_PRESETS = ["🎓", "📊", "⚡", "🗄️", "🧩", "🔷", "🔶", "🏆", "📜", "💻", "🚀", "🤖"];

export default function AdminDashboard({ onExit }: { onExit: () => void }) {
  const store = usePortfolioStore();
  const [activeTab, setActiveTab] = useState<"certs" | "projects" | "cp" | "resume" | "skills" | "backup">("certs");
  const [notification, setNotification] = useState<string | null>(null);

  // Project form state
  const [editingProjId, setEditingProjId] = useState<string | null>(null);
  const [projName, setProjName] = useState("");
  const [projTag, setProjTag] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projDetails, setProjDetails] = useState("");
  const [projStack, setProjStack] = useState("");
  const [projAccent, setProjAccent] = useState("#6366f1");
  const [projImg, setProjImg] = useState("");
  const [projAlt, setProjAlt] = useState("");
  const [projDemo, setProjDemo] = useState("");
  const [projGithub, setProjGithub] = useState("");

  // Cert form state
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [certName, setCertName] = useState("");
  const [certIssuer, setCertIssuer] = useState("");
  const [certYear, setCertYear] = useState("2024");
  const [certIcon, setCertIcon] = useState("🎓");
  const [certColor, setCertColor] = useState("#6366f1");
  const [certBg, setCertBg] = useState("rgba(99, 102, 241, 0.12)");
  const [certUrl, setCertUrl] = useState("");

  // Competitive Stats form state
  const [lcSolved, setLcSolved] = useState(store.competitiveStats.leetcode.solved);
  const [lcRating, setLcRating] = useState(store.competitiveStats.leetcode.rating);
  const [lcRank, setLcRank] = useState(store.competitiveStats.leetcode.ranking);
  const [ccSolved, setCcSolved] = useState(store.competitiveStats.codechef.solved);
  const [ccRating, setCcRating] = useState(store.competitiveStats.codechef.rating);
  const [cfRating, setCfRating] = useState(store.competitiveStats.codeforces.rating);
  const [hrSolved, setHrSolved] = useState(store.competitiveStats.hackerrank.solved);
  const [gfgSolved, setGfgSolved] = useState(store.competitiveStats.geeksforgeeks.solved);
  const [gfgScore, setGfgScore] = useState(store.competitiveStats.geeksforgeeks.score);

  // Skill state
  const [newSkillCategory, setNewSkillCategory] = useState("");
  const [newSkillItem, setNewSkillItem] = useState("");
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>(
    Object.keys(store.skills)[0] || ""
  );

  // JSON import/export state
  const [jsonInput, setJsonInput] = useState("");

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // ── Project Handlers ──
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projName.trim()) return;

    const stackArr = projStack.split(",").map((s) => s.trim()).filter(Boolean);
    const fallbackImg = projImg.trim() || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=340&fit=crop&auto=format";

    if (editingProjId) {
      store.updateProject(editingProjId, {
        name: projName,
        tag: projTag || "Development",
        desc: projDesc,
        details: projDetails,
        stack: stackArr.length ? stackArr : ["Code"],
        accent: projAccent,
        img: fallbackImg,
        alt: projAlt || projName,
        demoUrl: projDemo,
        githubUrl: projGithub,
      });
      showNotice(`Updated project "${projName}"`);
      setEditingProjId(null);
    } else {
      store.addProject({
        name: projName,
        tag: projTag || "Development",
        desc: projDesc,
        details: projDetails,
        stack: stackArr.length ? stackArr : ["Code"],
        accent: projAccent,
        img: fallbackImg,
        alt: projAlt || projName,
        demoUrl: projDemo,
        githubUrl: projGithub,
      });
      showNotice(`Added new project "${projName}"`);
    }

    setProjName("");
    setProjTag("");
    setProjDesc("");
    setProjDetails("");
    setProjStack("");
    setProjImg("");
    setProjAlt("");
    setProjDemo("");
    setProjGithub("");
  };

  const handleEditProject = (p: ProjectItem) => {
    setEditingProjId(p.id);
    setProjName(p.name);
    setProjTag(p.tag);
    setProjDesc(p.desc);
    setProjDetails(p.details || "");
    setProjStack(p.stack.join(", "));
    setProjAccent(p.accent);
    setProjImg(p.img);
    setProjAlt(p.alt);
    setProjDemo(p.demoUrl || "");
    setProjGithub(p.githubUrl || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Cert Handlers ──
  const handleSaveCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certName.trim()) return;

    if (editingCertId) {
      store.updateCert(editingCertId, {
        name: certName,
        issuer: certIssuer,
        year: certYear,
        icon: certIcon,
        color: certColor,
        bg: certBg || `${certColor}1f`,
        credentialUrl: certUrl.trim(),
      });
      showNotice(`Updated certification "${certName}" with Drive link`);
      setEditingCertId(null);
    } else {
      store.addCert({
        name: certName,
        issuer: certIssuer,
        year: certYear,
        icon: certIcon,
        color: certColor,
        bg: certBg || `${certColor}1f`,
        credentialUrl: certUrl.trim(),
      });
      showNotice(`Added certification "${certName}"`);
    }

    setCertName("");
    setCertIssuer("");
    setCertYear("2024");
    setCertUrl("");
  };

  const handleEditCert = (c: CertItem) => {
    setEditingCertId(c.id);
    setCertName(c.name);
    setCertIssuer(c.issuer);
    setCertYear(c.year);
    setCertIcon(c.icon);
    setCertColor(c.color);
    setCertBg(c.bg);
    setCertUrl(c.credentialUrl || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Competitive Stats Save ──
  const handleSaveCPStats = (e: React.FormEvent) => {
    e.preventDefault();
    const total = Number(lcSolved) + Number(ccSolved) + Number(gfgSolved) + Number(hrSolved);
    store.updateCompetitiveStats({
      totalSolved: total,
      leetcode: {
        ...store.competitiveStats.leetcode,
        solved: Number(lcSolved),
        rating: Number(lcRating),
        ranking: Number(lcRank),
      },
      codechef: {
        ...store.competitiveStats.codechef,
        solved: Number(ccSolved),
        rating: Number(ccRating),
      },
      codeforces: {
        ...store.competitiveStats.codeforces,
        rating: Number(cfRating),
        maxRating: Math.max(Number(cfRating), store.competitiveStats.codeforces.maxRating),
      },
      hackerrank: {
        ...store.competitiveStats.hackerrank,
        solved: Number(hrSolved),
      },
      geeksforgeeks: {
        ...store.competitiveStats.geeksforgeeks,
        solved: Number(gfgSolved),
        score: Number(gfgScore),
      },
    });

    store.updatePersonalInfo({
      problemsCount: String(total),
    });

    showNotice("Saved exact competitive programming stats & ratings! ✓");
  };

  // ── Skill Handlers ──
  const handleAddSkillItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSkillCategory || !newSkillItem.trim()) return;
    const current = store.skills[selectedSkillCategory] || [];
    if (!current.includes(newSkillItem.trim())) {
      store.updateSkillCategory(selectedSkillCategory, [...current, newSkillItem.trim()]);
      setNewSkillItem("");
      showNotice(`Added skill to ${selectedSkillCategory}`);
    }
  };

  const handleDeleteSkillItem = (category: string, item: string) => {
    const current = store.skills[category] || [];
    store.updateSkillCategory(
      category,
      current.filter((s) => s !== item)
    );
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillCategory.trim()) return;
    if (!store.skills[newSkillCategory.trim()]) {
      store.updateSkillCategory(newSkillCategory.trim(), []);
      setSelectedSkillCategory(newSkillCategory.trim());
      setNewSkillCategory("");
      showNotice(`Created new skill category "${newSkillCategory.trim()}"`);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#05050a",
        color: "#f1f0f7",
        fontFamily: "'Inter', sans-serif",
        paddingBottom: "5rem",
      }}
    >
      {/* Top Header Bar */}
      <header
        style={{
          background: "rgba(14, 13, 26, 0.95)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          padding: "1rem clamp(1rem, 4vw, 3rem)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1.3rem",
              fontWeight: 800,
              background: "linear-gradient(135deg, #ffffff 0%, #a5b4fc 50%, #6366f1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Portfolio Studio
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              background: "rgba(99, 102, 241, 0.15)",
              color: "#a5b4fc",
              border: "1px solid rgba(99, 102, 241, 0.4)",
              borderRadius: "8px",
              padding: "0.25rem 0.65rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            ⚡ Admin Access (/admin)
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={onExit}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.06em",
              background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              padding: "0.6rem 1.3rem",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontWeight: 700,
              boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
            }}
          >
            <span>←</span> Return to Live Portfolio
          </button>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#10b981",
            color: "#ffffff",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.8rem",
            fontWeight: 600,
            padding: "0.8rem 1.6rem",
            borderRadius: "12px",
            boxShadow: "0 10px 35px rgba(16, 185, 129, 0.5)",
            zIndex: 100,
            animation: "widgetPop 0.2s ease-out",
          }}
        >
          ✓ {notification}
        </div>
      )}

      {/* Navigation Tabs */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "1.5rem auto 0",
          padding: "0 clamp(1rem, 4vw, 2rem)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            paddingBottom: "0.75rem",
            overflowX: "auto",
          }}
        >
          {[
            { id: "certs", label: "🎓 Certifications (Drive Links)", count: store.certs.length },
            { id: "cp", label: "⚡ Exact CP Numbers & Ratings" },
            { id: "projects", label: "📁 Projects", count: store.projects.length },
            { id: "resume", label: "📄 Resume & Profile" },
            { id: "skills", label: "⚡ Skills" },
            { id: "backup", label: "💾 Backup & Data" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.05em",
                background: activeTab === tab.id ? "#6366f1" : "rgba(255, 255, 255, 0.05)",
                color: activeTab === tab.id ? "#ffffff" : "#a1a1aa",
                border: "1px solid",
                borderColor: activeTab === tab.id ? "#6366f1" : "rgba(255, 255, 255, 0.08)",
                borderRadius: "10px",
                padding: "0.65rem 1.2rem",
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontWeight: 600,
              }}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  style={{
                    background: activeTab === tab.id ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.1)",
                    borderRadius: "999px",
                    padding: "0.1rem 0.5rem",
                    fontSize: "0.65rem",
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── TAB: EXACT CP NUMBERS & RATINGS ── */}
        {activeTab === "cp" && (
          <div style={{ marginTop: "2rem", maxWidth: "800px", margin: "2rem auto 0" }}>
            <div
              style={{
                background: "rgba(15, 14, 28, 0.8)",
                border: "1px solid rgba(99, 102, 241, 0.3)",
                borderRadius: "24px",
                padding: "2rem",
              }}
            >
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", marginBottom: "0.5rem" }}>
                Direct Problem Counts & Contest Ratings
              </h2>
              <p style={{ color: "#a1a1aa", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1.75rem" }}>
                Set your exact problem counts and ratings below. These exact figures reflect directly across your portfolio (e.g. 218 LeetCode, 208 CodeChef, 1411 rating) with zero generic estimates.
              </p>

              <form onSubmit={handleSaveCPStats} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {/* LeetCode Section */}
                <div style={{ background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.25)", borderRadius: "14px", padding: "1.25rem" }}>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#fbbf24", margin: "0 0 0.85rem 0" }}>
                    🟠 LeetCode Direct Metrics
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.85rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.3rem" }}>
                        Solved Count
                      </label>
                      <input
                        type="number"
                        value={lcSolved}
                        onChange={(e) => setLcSolved(Number(e.target.value))}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.3rem" }}>
                        Contest Rating
                      </label>
                      <input
                        type="number"
                        value={lcRating}
                        onChange={(e) => setLcRating(Number(e.target.value))}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.3rem" }}>
                        Global Ranking
                      </label>
                      <input
                        type="number"
                        value={lcRank}
                        onChange={(e) => setLcRank(Number(e.target.value))}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                </div>

                {/* CodeChef & Codeforces */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div style={{ background: "rgba(99, 102, 241, 0.08)", border: "1px solid rgba(99, 102, 241, 0.25)", borderRadius: "14px", padding: "1.25rem" }}>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#a5b4fc", margin: "0 0 0.75rem 0" }}>
                      🟤 CodeChef
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.68rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.2rem" }}>
                          Solved Count
                        </label>
                        <input
                          type="number"
                          value={ccSolved}
                          onChange={(e) => setCcSolved(Number(e.target.value))}
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.68rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.2rem" }}>
                          Rating
                        </label>
                        <input
                          type="number"
                          value={ccRating}
                          onChange={(e) => setCcRating(Number(e.target.value))}
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ background: "rgba(6, 182, 212, 0.08)", border: "1px solid rgba(6, 182, 212, 0.25)", borderRadius: "14px", padding: "1.25rem" }}>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#38bdf8", margin: "0 0 0.75rem 0" }}>
                      🔵 Codeforces
                    </p>
                    <div>
                      <label style={{ display: "block", fontSize: "0.68rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.2rem" }}>
                        Current Rating
                      </label>
                      <input
                        type="number"
                        value={cfRating}
                        onChange={(e) => setCfRating(Number(e.target.value))}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                </div>

                {/* HackerRank & GFG */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.25)", borderRadius: "14px", padding: "1.25rem" }}>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#34d399", margin: "0 0 0.75rem 0" }}>
                      🟢 HackerRank
                    </p>
                    <div>
                      <label style={{ display: "block", fontSize: "0.68rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.2rem" }}>
                        Challenges Solved
                      </label>
                      <input
                        type="number"
                        value={hrSolved}
                        onChange={(e) => setHrSolved(Number(e.target.value))}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div style={{ background: "rgba(244, 63, 94, 0.08)", border: "1px solid rgba(244, 63, 94, 0.25)", borderRadius: "14px", padding: "1.25rem" }}>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#fb7185", margin: "0 0 0.75rem 0" }}>
                      🔴 GeeksForGeeks
                    </p>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: "block", fontSize: "0.68rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.2rem" }}>
                          Solved
                        </label>
                        <input
                          type="number"
                          value={gfgSolved}
                          onChange={(e) => setGfgSolved(Number(e.target.value))}
                          style={inputStyle}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: "block", fontSize: "0.68rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.2rem" }}>
                          Score
                        </label>
                        <input
                          type="number"
                          value={gfgScore}
                          onChange={(e) => setGfgScore(Number(e.target.value))}
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: "1rem",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "12px",
                    padding: "1rem",
                    cursor: "pointer",
                    boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
                  }}
                >
                  ✓ Save Direct Numbers & Ratings
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ── TAB: CERTIFICATIONS ── */}
        {activeTab === "certs" && (
          <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", alignItems: "start" }}>
            <div
              style={{
                background: "rgba(18, 17, 30, 0.75)",
                border: "1px solid rgba(99, 102, 241, 0.25)",
                borderRadius: "20px",
                padding: "1.75rem",
              }}
            >
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.5rem" }}>
                {editingCertId ? "Edit Certification & Drive Link" : "Add New Certification"}
              </h2>
              <p style={{ color: "#a1a1aa", fontSize: "0.82rem", lineHeight: 1.5, marginBottom: "1.5rem" }}>
                Paste your Google Drive link or verified credential URL below. It will automatically reflect with a clickable "View Certificate ↗" button on your live portfolio.
              </p>

              <form onSubmit={handleSaveCert} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.3rem", fontWeight: 600 }}>
                    Certification Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Red Hat Certified System Administrator (RHCSA)"
                    value={certName}
                    onChange={(e) => setCertName(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.3rem", fontWeight: 600 }}>
                      Issuing Authority *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Red Hat / Microsoft / Cisco"
                      value={certIssuer}
                      onChange={(e) => setCertIssuer(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.3rem", fontWeight: 600 }}>
                      Year
                    </label>
                    <input
                      type="text"
                      placeholder="2024"
                      value={certYear}
                      onChange={(e) => setCertYear(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Google Drive Link */}
                <div style={{ background: "rgba(99, 102, 241, 0.08)", border: "1px solid rgba(99, 102, 241, 0.3)", borderRadius: "12px", padding: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace", color: "#c084fc", marginBottom: "0.35rem", fontWeight: 700 }}>
                    📄 Certificate Google Drive Link / Credential URL *
                  </label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                    value={certUrl}
                    onChange={(e) => setCertUrl(e.target.value)}
                    style={{ ...inputStyle, background: "rgba(0, 0, 0, 0.4)", border: "1px solid rgba(99, 102, 241, 0.4)" }}
                  />
                  <p style={{ fontSize: "0.68rem", color: "#94a3b8", margin: "6px 0 0 0", lineHeight: 1.4 }}>
                    💡 <strong>Tip:</strong> Ensure your Google Drive file sharing is set to <em>"Anyone with the link can view"</em>.
                  </p>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.3rem", fontWeight: 600 }}>
                    Badge Icon
                  </label>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    {ICON_PRESETS.map((ic) => (
                      <button
                        type="button"
                        key={ic}
                        onClick={() => setCertIcon(ic)}
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: "8px",
                          background: certIcon === ic ? "#6366f1" : "rgba(255, 255, 255, 0.08)",
                          border: "1px solid",
                          borderColor: certIcon === ic ? "#6366f1" : "rgba(255, 255, 255, 0.12)",
                          fontSize: "1.1rem",
                          cursor: "pointer",
                        }}
                      >
                        {ic}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.3rem", fontWeight: 600 }}>
                    Theme Accent Color
                  </label>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    {COLOR_PRESETS.map((col) => (
                      <button
                        type="button"
                        key={col}
                        onClick={() => {
                          setCertColor(col);
                          setCertBg(`${col}18`);
                        }}
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: col,
                          border: certColor === col ? "2px solid #ffffff" : "2px solid transparent",
                          cursor: "pointer",
                          transform: certColor === col ? "scale(1.2)" : "scale(1)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "10px",
                      padding: "0.85rem",
                      cursor: "pointer",
                      boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
                    }}
                  >
                    {editingCertId ? "Save Certificate Changes" : "+ Add Certificate"}
                  </button>
                  {editingCertId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCertId(null);
                        setCertName("");
                        setCertIssuer("");
                        setCertUrl("");
                      }}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.8rem",
                        background: "rgba(255, 255, 255, 0.08)",
                        color: "#d6d0c4",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        borderRadius: "10px",
                        padding: "0.85rem 1.25rem",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Cert List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", color: "#a1a1aa", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>
                Active Credentials & Drive Links ({store.certs.length})
              </h3>
              {store.certs.map((c) => (
                <div
                  key={c.id}
                  style={{
                    background: "rgba(18, 17, 30, 0.75)",
                    border: `1.5px solid ${editingCertId === c.id ? "#6366f1" : "rgba(255, 255, 255, 0.08)"}`,
                    borderRadius: "16px",
                    padding: "1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                      <span style={{ fontSize: "1.6rem" }}>{c.icon}</span>
                      <div>
                        <p style={{ margin: 0, fontWeight: 700, color: "#ffffff", fontSize: "0.95rem", fontFamily: "'Outfit', sans-serif" }}>
                          {c.name}
                        </p>
                        <p style={{ margin: "2px 0 0 0", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: c.color }}>
                          {c.issuer} · {c.year}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "0.35rem" }}>
                      <button
                        onClick={() => handleEditCert(c)}
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.68rem",
                          background: "rgba(99, 102, 241, 0.15)",
                          color: "#a5b4fc",
                          border: "1px solid rgba(99, 102, 241, 0.3)",
                          borderRadius: "6px",
                          padding: "0.35rem 0.7rem",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${c.name}"?`)) {
                            store.deleteCert(c.id);
                            showNotice(`Deleted "${c.name}"`);
                          }
                        }}
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.68rem",
                          background: "rgba(244, 63, 94, 0.12)",
                          color: "#f43f5e",
                          border: "1px solid rgba(244, 63, 94, 0.3)",
                          borderRadius: "6px",
                          padding: "0.35rem 0.7rem",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Drive link status */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255, 255, 255, 0.03)", padding: "0.5rem 0.75rem", borderRadius: "8px" }}>
                    <span style={{ fontSize: "0.65rem", fontFamily: "'JetBrains Mono', monospace", color: c.credentialUrl ? "#10b981" : "#f59e0b" }}>
                      {c.credentialUrl ? "✓ Drive Link Attached" : "⚠️ No Link Attached"}
                    </span>
                    {c.credentialUrl && (
                      <a
                        href={c.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: "0.65rem", fontFamily: "'JetBrains Mono', monospace", color: "#38bdf8", textDecoration: "none" }}
                      >
                        Test Link ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: PROJECTS ── */}
        {activeTab === "projects" && (
          <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", alignItems: "start" }}>
            <div
              style={{
                background: "rgba(18, 17, 30, 0.75)",
                border: "1px solid rgba(99, 102, 241, 0.25)",
                borderRadius: "20px",
                padding: "1.75rem",
              }}
            >
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#ffffff", marginBottom: "1.25rem" }}>
                {editingProjId ? "Edit Project" : "Add New Project"}
              </h2>

              <form onSubmit={handleSaveProject} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.3rem" }}>
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AI Financial Forecaster"
                    value={projName}
                    onChange={(e) => setProjName(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.3rem" }}>
                    Tag / Domain
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AI / ML · Python"
                    value={projTag}
                    onChange={(e) => setProjTag(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.3rem" }}>
                    Short Summary (Hero / Card) *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Concise overview of what was built and impact..."
                    value={projDesc}
                    onChange={(e) => setProjDesc(e.target.value)}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.3rem" }}>
                    Detailed Architecture (Modal)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="In-depth architecture, algorithm details, dataset, etc..."
                    value={projDetails}
                    onChange={(e) => setProjDetails(e.target.value)}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.3rem" }}>
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="React, TypeScript, PyTorch, FastAPI"
                    value={projStack}
                    onChange={(e) => setProjStack(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.3rem" }}>
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/..."
                      value={projGithub}
                      onChange={(e) => setProjGithub(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.3rem" }}>
                      Live Demo URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://my-app.vercel.app"
                      value={projDemo}
                      onChange={(e) => setProjDemo(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.3rem" }}>
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={projImg}
                    onChange={(e) => setProjImg(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.3rem" }}>
                    Accent Color
                  </label>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    {COLOR_PRESETS.map((col) => (
                      <button
                        type="button"
                        key={col}
                        onClick={() => setProjAccent(col)}
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          background: col,
                          border: projAccent === col ? "2px solid #ffffff" : "2px solid transparent",
                          cursor: "pointer",
                          transform: projAccent === col ? "scale(1.2)" : "scale(1)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "10px",
                      padding: "0.85rem",
                      cursor: "pointer",
                    }}
                  >
                    {editingProjId ? "Save Project" : "+ Add Project"}
                  </button>
                  {editingProjId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProjId(null);
                        setProjName("");
                        setProjTag("");
                        setProjDesc("");
                        setProjDetails("");
                        setProjStack("");
                        setProjImg("");
                        setProjDemo("");
                        setProjGithub("");
                      }}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.8rem",
                        background: "rgba(255, 255, 255, 0.08)",
                        color: "#d6d0c4",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        borderRadius: "10px",
                        padding: "0.85rem 1.25rem",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", color: "#a1a1aa", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>
                Current Projects ({store.projects.length})
              </h3>
              {store.projects.map((p) => (
                <div
                  key={p.id}
                  style={{
                    background: "rgba(18, 17, 30, 0.75)",
                    border: `1.5px solid ${editingProjId === p.id ? "#6366f1" : "rgba(255, 255, 255, 0.08)"}`,
                    borderRadius: "16px",
                    padding: "1.25rem",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                  }}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{ width: 70, height: 70, borderRadius: "10px", objectFit: "cover", flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#ffffff" }}>
                        {p.name}
                      </span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: p.accent, background: `${p.accent}1f`, border: `1px solid ${p.accent}44`, borderRadius: "4px", padding: "0.1rem 0.4rem" }}>
                        {p.tag}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "#94a3b8", margin: "0.35rem 0", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                      {p.desc}
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", flexShrink: 0 }}>
                    <button
                      onClick={() => handleEditProject(p)}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.65rem",
                        background: "rgba(99, 102, 241, 0.15)",
                        color: "#a5b4fc",
                        border: "1px solid rgba(99, 102, 241, 0.3)",
                        borderRadius: "6px",
                        padding: "0.35rem 0.65rem",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${p.name}"?`)) {
                          store.deleteProject(p.id);
                          showNotice(`Deleted "${p.name}"`);
                        }
                      }}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.65rem",
                        background: "rgba(244, 63, 94, 0.12)",
                        color: "#f43f5e",
                        border: "1px solid rgba(244, 63, 94, 0.3)",
                        borderRadius: "6px",
                        padding: "0.35rem 0.65rem",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: RESUME & PROFILE ── */}
        {activeTab === "resume" && (
          <div style={{ marginTop: "2rem", maxWidth: "800px", margin: "2rem auto 0" }}>
            <div
              style={{
                background: "rgba(18, 17, 30, 0.75)",
                border: "1px solid rgba(99, 102, 241, 0.25)",
                borderRadius: "20px",
                padding: "2rem",
              }}
            >
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#ffffff", marginBottom: "1.5rem" }}>
                Resume & Profile Information
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ background: "rgba(99, 102, 241, 0.08)", border: "1px solid rgba(99, 102, 241, 0.3)", borderRadius: "12px", padding: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace", color: "#c084fc", marginBottom: "0.35rem", fontWeight: 700 }}>
                    📄 Resume Google Drive / Document Link
                  </label>
                  <input
                    type="url"
                    value={store.personalInfo.resumeUrl}
                    onChange={(e) => store.updatePersonalInfo({ resumeUrl: e.target.value })}
                    placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                    style={{ ...inputStyle, background: "rgba(0, 0, 0, 0.4)", border: "1px solid rgba(99, 102, 241, 0.4)" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.35rem" }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={store.personalInfo.name}
                      onChange={(e) => store.updatePersonalInfo({ name: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.35rem" }}>
                      Title / Role
                    </label>
                    <input
                      type="text"
                      value={store.personalInfo.title}
                      onChange={(e) => store.updatePersonalInfo({ title: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.35rem" }}>
                    Hero Tagline
                  </label>
                  <textarea
                    rows={2}
                    value={store.personalInfo.tagline}
                    onChange={(e) => store.updatePersonalInfo({ tagline: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.35rem" }}>
                      About Bio (Paragraph 1)
                    </label>
                    <textarea
                      rows={3}
                      value={store.personalInfo.bio1}
                      onChange={(e) => store.updatePersonalInfo({ bio1: e.target.value })}
                      style={{ ...inputStyle, resize: "vertical" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.35rem" }}>
                      About Bio (Paragraph 2)
                    </label>
                    <textarea
                      rows={3}
                      value={store.personalInfo.bio2}
                      onChange={(e) => store.updatePersonalInfo({ bio2: e.target.value })}
                      style={{ ...inputStyle, resize: "vertical" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.75rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.3rem" }}>
                      CGPA
                    </label>
                    <input
                      type="text"
                      value={store.personalInfo.cgpa}
                      onChange={(e) => store.updatePersonalInfo({ cgpa: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.3rem" }}>
                      University
                    </label>
                    <input
                      type="text"
                      value={store.personalInfo.university}
                      onChange={(e) => store.updatePersonalInfo({ university: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => showNotice("Personal & Resume settings saved!")}
                  style={{
                    marginTop: "1rem",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    background: "#10b981",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "10px",
                    padding: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  ✓ Save Profile Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: SKILLS ── */}
        {activeTab === "skills" && (
          <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            <div
              style={{
                background: "rgba(18, 17, 30, 0.75)",
                border: "1px solid rgba(99, 102, 241, 0.25)",
                borderRadius: "20px",
                padding: "1.75rem",
              }}
            >
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#ffffff", marginBottom: "1.25rem" }}>
                Add New Skill
              </h2>

              <form onSubmit={handleAddSkillItem} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.3rem" }}>
                    Select Category
                  </label>
                  <select
                    value={selectedSkillCategory}
                    onChange={(e) => setSelectedSkillCategory(e.target.value)}
                    style={inputStyle}
                  >
                    {Object.keys(store.skills).map((cat) => (
                      <option key={cat} value={cat} style={{ background: "#1a1828", color: "#ffffff" }}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.3rem" }}>
                    Skill Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newSkillItem}
                    onChange={(e) => setNewSkillItem(e.target.value)}
                    placeholder="e.g. Docker, PyTorch, GraphQL"
                    style={inputStyle}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    background: "#6366f1",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "10px",
                    padding: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  + Add to {selectedSkillCategory}
                </button>
              </form>

              <hr style={{ border: "none", borderTop: "1px solid rgba(255, 255, 255, 0.1)", margin: "1.75rem 0" }} />

              <form onSubmit={handleAddCategory} style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="text"
                  placeholder="New Category Name"
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                  style={{ ...inputStyle, flex: 1 }}
                />
                <button
                  type="submit"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#ffffff",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                    padding: "0.6rem 1rem",
                    cursor: "pointer",
                  }}
                >
                  Create
                </button>
              </form>
            </div>

            {/* Current Skills Display */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {Object.entries(store.skills).map(([cat, items]) => (
                <div
                  key={cat}
                  style={{
                    background: "rgba(18, 17, 30, 0.75)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "16px",
                    padding: "1.25rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "#a5b4fc", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>
                      {cat} ({items.length})
                    </span>
                    <button
                      onClick={() => {
                        if (confirm(`Delete entire category "${cat}"?`)) {
                          store.deleteSkillCategory(cat);
                          showNotice(`Deleted category ${cat}`);
                        }
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#f43f5e",
                        fontSize: "0.65rem",
                        fontFamily: "'JetBrains Mono', monospace",
                        cursor: "pointer",
                      }}
                    >
                      Delete Category
                    </button>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {items.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.68rem",
                          color: "#ffffff",
                          background: "rgba(255, 255, 255, 0.06)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          borderRadius: "6px",
                          padding: "0.25rem 0.55rem",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                        }}
                      >
                        {skill}
                        <button
                          onClick={() => handleDeleteSkillItem(cat, skill)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#f43f5e",
                            cursor: "pointer",
                            padding: 0,
                            fontSize: "0.65rem",
                          }}
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: BACKUP ── */}
        {activeTab === "backup" && (
          <div style={{ marginTop: "2rem", maxWidth: "800px", margin: "2rem auto 0" }}>
            <div
              style={{
                background: "rgba(18, 17, 30, 0.75)",
                border: "1px solid rgba(99, 102, 241, 0.25)",
                borderRadius: "20px",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                Data Portability & Backup
              </h2>
              <p style={{ color: "#a1a1aa", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>
                All certificates, projects, exact problem solve numbers, and resume links are safely stored in your browser's local storage.
              </p>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => {
                    const dataStr = store.exportAllData();
                    navigator.clipboard.writeText(dataStr);
                    showNotice("Copied backup JSON to clipboard! ✓");
                  }}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    background: "#6366f1",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "10px",
                    padding: "0.8rem 1.5rem",
                    cursor: "pointer",
                  }}
                >
                  Copy JSON to Clipboard
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Reset everything back to defaults?")) {
                      store.resetToDefaults();
                      showNotice("Reset all data to defaults.");
                    }
                  }}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.8rem",
                    background: "rgba(244, 63, 94, 0.15)",
                    color: "#f43f5e",
                    border: "1px solid rgba(244, 63, 94, 0.3)",
                    borderRadius: "10px",
                    padding: "0.8rem 1.5rem",
                    cursor: "pointer",
                  }}
                >
                  Reset to Defaults
                </button>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace", color: "#a1a1aa", marginBottom: "0.5rem" }}>
                  Paste Backup JSON to Restore:
                </label>
                <textarea
                  rows={4}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder='{"personalInfo": { ... }, "competitiveStats": { ... } }'
                  style={{ ...inputStyle, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!jsonInput.trim()) return;
                    const res = store.importAllData(jsonInput);
                    if (res.success) {
                      showNotice("Imported data successfully! ✓");
                      setJsonInput("");
                    } else {
                      alert(`Import failed: ${res.error}`);
                    }
                  }}
                  style={{
                    marginTop: "0.75rem",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    background: "#10b981",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "0.6rem 1.25rem",
                    cursor: "pointer",
                  }}
                >
                  Import JSON
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  borderRadius: "10px",
  padding: "0.7rem 0.9rem",
  color: "#ffffff",
  fontSize: "0.85rem",
  fontFamily: "'Inter', sans-serif",
  outline: "none",
  boxSizing: "border-box",
};
