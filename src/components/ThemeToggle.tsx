interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.5rem",
        background: isDark ? "rgba(15, 14, 28, 0.85)" : "rgba(255, 255, 255, 0.9)",
        border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.4)" : "rgba(99, 102, 241, 0.25)"}`,
        borderRadius: "999px",
        padding: "0.35rem 0.65rem",
        cursor: "pointer",
        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: isDark
          ? "0 4px 15px rgba(0, 0, 0, 0.4), 0 0 10px rgba(99, 102, 241, 0.2)"
          : "0 4px 15px rgba(99, 102, 241, 0.15)",
        backdropFilter: "blur(12px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.borderColor = "#6366f1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.borderColor = isDark ? "rgba(99, 102, 241, 0.4)" : "rgba(99, 102, 241, 0.25)";
      }}
    >
      {/* Icon */}
      <span style={{ fontSize: "0.95rem", lineHeight: 1 }}>
        {isDark ? "🌙" : "☀️"}
      </span>

      {/* Label */}
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: isDark ? "#e2e8f0" : "#0f172a",
        }}
      >
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  );
}
