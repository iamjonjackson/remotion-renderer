import React from "react";
import {
  makeCircle,
  makeRect,
  makeStar,
  makeTriangle,
} from "@remotion/shapes";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type ShapeMaker = () => { path: string; width: number; height: number };

const size = 140;

const SHAPES: { color: string; delay: number; make: ShapeMaker }[] = [
  {
    color: "#f472b6",
    delay: 0,
    make: () => makeRect({ width: size, height: size, cornerRadius: 20 }),
  },
  {
    color: "#38bdf8",
    delay: 6,
    make: () => makeCircle({ radius: size / 2 }),
  },
  {
    color: "#4ade80",
    delay: 12,
    make: () => makeTriangle({ length: size, direction: "up" }),
  },
  {
    color: "#facc15",
    delay: 18,
    make: () =>
      makeStar({ points: 5, innerRadius: size / 4, outerRadius: size / 2 }),
  },
];

export const ShapesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rotate = interpolate(frame, [0, 96], [0, 360], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(45deg, #052e16, #0c4a6e, #3b0764)",
      }}
    >
      <svg width={800} height={400} viewBox="-400 -200 800 400">
        {SHAPES.map((s, i) => {
          const enter = spring({
            frame: frame - s.delay,
            fps,
            config: { damping: 8, stiffness: 120 },
          });
          const x = -270 + i * 180;
          const wobble = Math.sin((frame + i * 15) / 7) * 18;
          const shape = s.make();
          return (
            <g
              key={i}
              transform={`translate(${x} ${wobble}) scale(${enter})`}
            >
              <g
                transform={`rotate(${rotate}) translate(${-shape.width / 2} ${-shape.height / 2})`}
              >
                <path d={shape.path} fill={s.color} />
              </g>
            </g>
          );
        })}
      </svg>
      <h2
        style={{
          position: "absolute",
          bottom: 60,
          fontFamily: "sans-serif",
          fontSize: 40,
          color: "#e2e8f0",
          margin: 0,
        }}
      >
        shapes from @remotion/shapes
      </h2>
    </AbsoluteFill>
  );
};
