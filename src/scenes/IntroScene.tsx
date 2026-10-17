import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const TITLE = "CREATIVE SHOWCASE";
const PARTICLES = 40;

const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      {new Array(PARTICLES).fill(0).map((_, i) => {
        const x = random(`x-${i}`) * 100;
        const y = random(`y-${i}`) * 100;
        const size = 2 + random(`s-${i}`) * 5;
        const drift = interpolate(frame, [0, 96], [0, -30 - random(`d-${i}`) * 40]);
        const twinkle = interpolate(
          Math.sin(frame / (4 + random(`t-${i}`) * 8) + i),
          [-1, 1],
          [0.15, 0.9]
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              background: ["#a5f3fc", "#c4b5fd", "#fda4af"][i % 3],
              opacity: twinkle,
              transform: `translateY(${drift}px)`,
            }}
          />
        );
      })}
    </>
  );
};

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chars = Math.floor(
    interpolate(frame, [10, 60], [0, TITLE.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.linear,
    })
  );

  const subtitle = spring({ frame: frame - 55, fps, config: { damping: 10 } });
  const glow = 10 + 8 * Math.sin(frame / 10);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(circle at 50% 40%, #1e1b4b, #020617)",
      }}
    >
      <Particles />
      <h1
        style={{
          fontFamily: "monospace",
          fontSize: 96,
          fontWeight: 800,
          color: "#f0abfc",
          margin: 0,
          textShadow: `0 0 ${glow}px #d946ef`,
          letterSpacing: 6,
        }}
      >
        {TITLE.slice(0, chars)}
        <span style={{ opacity: frame % 20 < 10 ? 1 : 0, color: "#67e8f9" }}>
          |
        </span>
      </h1>
      <p
        style={{
          fontFamily: "sans-serif",
          fontSize: 34,
          color: "#94a3b8",
          margin: 0,
          marginTop: 24,
          opacity: subtitle,
          transform: `translateY(${(1 - subtitle) * 30}px)`,
        }}
      >
        five scenes, one React file
      </p>
    </AbsoluteFill>
  );
};
