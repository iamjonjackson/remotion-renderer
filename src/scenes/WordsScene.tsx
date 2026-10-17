import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";

const WORDS = ["spring", "interpolate", "random", "transitions", "shapes", "easing"];

export const WordsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: "#fdf4ff",
        overflow: "hidden",
      }}
    >
      {WORDS.map((word, i) => {
        const diag = i - 2.5;
        const enter = spring({
          frame: frame - 5 - i * 7,
          fps,
          config: { damping: 14, stiffness: 90 },
        });
        const drift = (frame - i * 10) * 0.6;
        return (
          <h1
            key={word}
            style={{
              position: "absolute",
              fontFamily: "sans-serif",
              fontSize: 120,
              fontWeight: 900,
              color: ["#d946ef", "#0ea5e9", "#22c55e", "#f97316", "#8b5cf6", "#e11d48"][i],
              margin: 0,
              whiteSpace: "nowrap",
              left: `${38 + diag * 6}%`,
              top: `${12 + i * 14}%`,
              opacity: enter * (0.25 + 0.75 * (i % 2)),
              transform: `translateX(${(1 - enter) * -100 + drift}px) rotate(${diag * 4}deg)`,
            }}
          >
            {word}
          </h1>
        );
      })}
      <h2
        style={{
          position: "absolute",
          bottom: 50,
          fontFamily: "sans-serif",
          fontSize: 40,
          color: "#581c87",
          margin: 0,
        }}
      >
        layered spring typography
      </h2>
    </AbsoluteFill>
  );
};
