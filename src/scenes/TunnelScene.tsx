import React from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  useCurrentFrame,
} from "remotion";

const RINGS = 22;

export const TunnelScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: "#000",
        overflow: "hidden",
      }}
    >
      <svg width={1920} height={1080} viewBox="-960 -540 1920 1080">
        {new Array(RINGS).fill(0).map((_, i) => {
          const phase = (frame / 20 + i / RINGS) % 1;
          const scale = 0.05 + phase * 1.8;
          const hue = (frame * 3 + i * 24) % 360;
          const rot = random(`r-${i}`) * 360 + frame * (i % 2 ? 1.2 : -1.2);
          const points = 3 + (i % 4);
          return (
            <g key={i} transform={`rotate(${rot}) scale(${scale})`}>
              <polygon
                points={Array.from({ length: points }, (_, p) => {
                  const a = (p / points) * Math.PI * 2;
                  return `${Math.cos(a) * 250},${Math.sin(a) * 250}`;
                }).join(" ")}
                fill="none"
                stroke={`hsl(${hue}, 85%, 60%)`}
                strokeWidth={3 / scale}
                opacity={1 - phase}
              />
            </g>
          );
        })}
      </svg>
      <h1
        style={{
          position: "absolute",
          fontFamily: "sans-serif",
          fontSize: 150,
          fontWeight: 900,
          color: "#fff",
          margin: 0,
          opacity: interpolate(frame, [60, 85], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `scale(${interpolate(frame, [60, 85], [0.6, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })})`,
          textShadow: "0 0 40px rgba(255,255,255,0.6)",
        }}
      >
        THE END
      </h1>
    </AbsoluteFill>
  );
};
