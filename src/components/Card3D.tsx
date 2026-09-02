import React, { useRef, useState, useCallback } from "react";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number;
  glare?: boolean;
  accentColor?: string;
  isDark?: boolean;
  onClick?: () => void;
}

export default function Card3D({
  children,
  className = "",
  style = {},
  maxTilt = 15,
  glare = true,
  accentColor = "#6366f1",
  isDark = true,
  onClick,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setTransform(
        `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
      );

      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        setGlarePos({ x: glareX, y: glareY, opacity: isDark ? 0.15 : 0.25 });
      }
    },
    [maxTilt, glare, isDark]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        transformStyle: "preserve-3d",
        transform,
        transition: isHovered
          ? "transform 0.1s ease-out, box-shadow 0.25s ease-out, border-color 0.25s ease-out"
          : "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease, border-color 0.5s ease",
        willChange: "transform",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {/* Dynamic Specular Glare */}
      {glare && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            zIndex: 10,
            background: isDark
              ? `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.45) 0%, transparent 60%)`
              : `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.8) 0%, transparent 60%)`,
            opacity: glarePos.opacity,
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* Subtle border glow on hover */}
      {isHovered && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: -1,
            borderRadius: "inherit",
            pointerEvents: "none",
            zIndex: 0,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, ${accentColor} 0%, transparent 70%)`,
            opacity: isDark ? 0.6 : 0.35,
            filter: "blur(4px)",
          }}
        />
      )}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
}
