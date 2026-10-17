import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { AbsoluteFill } from "remotion";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { flip } from "@remotion/transitions/flip";
import { wipe } from "@remotion/transitions/wipe";
import { IntroScene } from "./scenes/IntroScene";
import { ShapesScene } from "./scenes/ShapesScene";
import { ChartScene } from "./scenes/ChartScene";
import { WordsScene } from "./scenes/WordsScene";
import { TunnelScene } from "./scenes/TunnelScene";

const TRANSITION_FRAMES = 20;
const timing = linearTiming({ durationInFrames: TRANSITION_FRAMES });

export const CreativeShowcase: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={96}>
          <IntroScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={timing}
        />

        <TransitionSeries.Sequence durationInFrames={96}>
          <ShapesScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={flip()}
          timing={timing}
        />

        <TransitionSeries.Sequence durationInFrames={96}>
          <ChartScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe()}
          timing={timing}
        />

        <TransitionSeries.Sequence durationInFrames={96}>
          <WordsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={timing}
        />

        <TransitionSeries.Sequence durationInFrames={150}>
          <TunnelScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
