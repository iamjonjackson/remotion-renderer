import { Composition } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { CreativeShowcase } from "./CreativeShowcase";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CreativeShowcase"
        component={CreativeShowcase}
        durationInFrames={454}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
