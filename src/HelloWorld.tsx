import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const TITLE = "Hello, Remotion!";
const SUBTITLE = "Videos as React code";

const Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12 } });

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const exit = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      }}
    >
      <h1
        style={{
          fontFamily: "sans-serif",
          fontSize: 110,
          fontWeight: 800,
          color: "#fff",
          margin: 0,
          transform: `scale(${scale})`,
          opacity: opacity * exit,
        }}
      >
        {TITLE}
      </h1>
      <p
        style={{
          fontFamily: "sans-serif",
          fontSize: 40,
          color: "#a5b4fc",
          margin: 0,
          marginTop: 20,
          opacity: opacity * exit,
          transform: `translateY(${interpolate(frame, [10, 40], [20, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        {SUBTITLE}
      </p>
    </AbsoluteFill>
  );
};

export const HelloWorld: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      <Title />
    </AbsoluteFill>
  );
};
