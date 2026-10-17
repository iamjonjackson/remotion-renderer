import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";

const DATA = [82, 45, 96, 61, 74, 88];
const COLORS = ["#fb7185", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa", "#f472b6"];

export const ChartScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(160deg, #f8fafc, #e2e8f0)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", gap: 28, height: 420 }}>
        {DATA.map((value, i) => {
          const height = interpolate(frame, [i * 6, i * 6 + 30], [0, value * 4], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.elastic(1.2),
          });
          const count = Math.floor(
            interpolate(frame, [i * 6, i * 6 + 30], [0, value], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          );
          return (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 26,
                  color: "#0f172a",
                  marginBottom: 8,
                }}
              >
                {count}
              </div>
              <div
                style={{
                  width: 64,
                  height: height,
                  background: COLORS[i],
                  borderRadius: 12,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                }}
              />
            </div>
          );
        })}
      </div>
      <h2
        style={{
          position: "absolute",
          bottom: 50,
          fontFamily: "sans-serif",
          fontSize: 40,
          color: "#1e293b",
          margin: 0,
        }}
      >
        easing.elastic() bars
      </h2>
    </AbsoluteFill>
  );
};
